// AI Builder Kids account storage: lets each student enter their name once,
// set their own password, and have their profile + progress follow them to
// any device — kept fully separate per student, never mixed. Also gives the
// teacher a passcode-gated view across every enrolled student's progress.
// Backed by the same Redis REST API as the Fighter Jet leaderboard — see
// api/leaderboard.js for the credential convention this mirrors.

const crypto = require('crypto');

const KEY_PREFIX = 'courseAccount:';
const INDEX_KEY = 'courseAccountIndex';
const MIN_PASSWORD_LEN = 4;
const MAX_NAME_LEN = 24;

const CREDENTIAL_CANDIDATES = [
  ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
  ['KV_REST_API_URL', 'KV_REST_API_TOKEN']
];

function resolveCredentials() {
  for (const [urlKey, tokenKey] of CREDENTIAL_CANDIDATES) {
    const url = process.env[urlKey];
    const token = process.env[tokenKey];
    if (url && token) return { url, token };
  }
  return null;
}

async function upstash(url, token, command) {
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(command)
  });
  const data = await r.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

// Batches multiple Redis commands into one round trip via Upstash's
// pipeline endpoint (POST to <url>/pipeline with an array of commands).
async function upstashPipeline(url, token, commands) {
  if (!commands.length) return [];
  const r = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commands)
  });
  const data = await r.json();
  return data.map((d) => d.result);
}

function hashPassword(password, salt) {
  return crypto.createHash('sha256').update(`${salt}:${password}`).digest('hex');
}

function accountKey(name) {
  return KEY_PREFIX + name.trim().toLowerCase();
}

function timingSafeStringEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Small, presentation-ready slice of a student's record — never includes
// the password hash/salt.
function summarize(record) {
  const p = record.progress || {};
  return {
    displayName: record.displayName,
    xp: p.xp || 0,
    streak: p.streak || 0,
    currentDay: p.currentDay || 1,
    completedLessons: (p.completedLessons || []).length,
    completedMissions: (p.completedMissions || []).length,
    badges: (p.badges || []).length,
    lastActiveDate: p.lastActiveDate || null,
    updatedAt: record.updatedAt || null
  };
}

module.exports = async (req, res) => {
  const creds = resolveCredentials();
  if (!creds) {
    const checkedNames = CREDENTIAL_CANDIDATES.flat();
    res.status(500).json({
      error: 'Account storage is not configured yet.',
      checkedEnvVars: checkedNames,
      foundEnvVars: checkedNames.filter((k) => process.env[k] !== undefined)
    });
    return;
  }
  const { url, token } = creds;

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  } catch {
    res.status(400).json({ error: 'Invalid request body.' });
    return;
  }

  const { action } = body;

  try {
    if (action === 'teacherList') {
      const teacherPassword = process.env.TEACHER_PASSWORD;
      if (!teacherPassword) {
        res.status(500).json({ error: 'teacher-not-configured' });
        return;
      }
      if (!timingSafeStringEqual(String(body.teacherPassword || ''), teacherPassword)) {
        res.status(401).json({ error: 'wrong-teacher-password' });
        return;
      }
      const names = (await upstash(url, token, ['SMEMBERS', INDEX_KEY])) || [];
      const raws = await upstashPipeline(url, token, names.map((n) => ['GET', KEY_PREFIX + n]));
      const students = raws
        .map((raw) => {
          try {
            return raw ? summarize(JSON.parse(raw)) : null;
          } catch {
            return null;
          }
        })
        .filter(Boolean)
        .sort((a, b) => a.displayName.localeCompare(b.displayName));
      res.status(200).json({ success: true, students });
      return;
    }

    const name = String(body.name || '').trim().slice(0, MAX_NAME_LEN);
    const password = String(body.password || '');
    if (!name) {
      res.status(400).json({ error: 'missing-name' });
      return;
    }

    if (action === 'auth') {
      // One combined step: creates the account on first use, logs in on
      // every return visit. Ask the student to "create a password" the
      // first time — that same string is what verifies them from then on.
      if (!password || password.length < MIN_PASSWORD_LEN) {
        res.status(400).json({ error: 'password-too-short', minLength: MIN_PASSWORD_LEN });
        return;
      }

      const key = accountKey(name);
      const raw = await upstash(url, token, ['GET', key]);
      const now = new Date().toISOString();

      if (!raw) {
        // New account — name is free (case-insensitively), claim it now.
        // Each student's record lives at its own key, so progress is never
        // shared or merged across names.
        const salt = crypto.randomBytes(16).toString('hex');
        const record = {
          displayName: name,
          salt,
          passwordHash: hashPassword(password, salt),
          profile: body.profile || null,
          progress: body.progress || null,
          createdAt: now,
          updatedAt: now
        };
        await upstash(url, token, ['SET', key, JSON.stringify(record)]);
        await upstash(url, token, ['SADD', INDEX_KEY, name.toLowerCase()]);
        res.status(200).json({ success: true, isNewAccount: true, displayName: record.displayName });
        return;
      }

      const record = JSON.parse(raw);
      if (hashPassword(password, record.salt) !== record.passwordHash) {
        res.status(401).json({ error: 'wrong-password' });
        return;
      }
      res.status(200).json({
        success: true,
        isNewAccount: false,
        displayName: record.displayName,
        profile: record.profile || null,
        progress: record.progress || null
      });
      return;
    }

    if (action === 'save') {
      // Periodic background sync while a student plays, so another device
      // can pick up the same account later. Re-checks the password every
      // time rather than issuing session tokens — simplest thing that works.
      if (!password) {
        res.status(400).json({ error: 'missing-password' });
        return;
      }
      const key = accountKey(name);
      const raw = await upstash(url, token, ['GET', key]);
      if (!raw) {
        res.status(404).json({ error: 'not-found' });
        return;
      }
      const record = JSON.parse(raw);
      if (hashPassword(password, record.salt) !== record.passwordHash) {
        res.status(401).json({ error: 'wrong-password' });
        return;
      }
      record.profile = body.profile || record.profile;
      record.progress = body.progress || record.progress;
      record.updatedAt = new Date().toISOString();
      await upstash(url, token, ['SET', key, JSON.stringify(record)]);
      await upstash(url, token, ['SADD', INDEX_KEY, name.toLowerCase()]);
      res.status(200).json({ success: true });
      return;
    }

    res.status(400).json({ error: 'unknown-action' });
  } catch (e) {
    res.status(500).json({ error: 'Account request failed.', detail: e.message });
  }
};
