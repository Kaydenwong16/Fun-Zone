// AI Builder Kids account storage: lets each student enter their name once,
// set their own password, and have their profile + progress follow them to
// any device — kept fully separate per student, never mixed. Also gives the
// teacher a passcode-gated view across every enrolled student's progress.
// Backed by the same Redis REST API as the Fighter Jet leaderboard — see
// api/leaderboard.js for the credential convention this mirrors.

const crypto = require('crypto');

const KEY_PREFIX = 'courseAccount:';
const INDEX_KEY = 'courseAccountIndex';
// LOGIN_LOG_KEY holds session IDs (newest first), not the sessions
// themselves — each session is its own key (SESSION_KEY_PREFIX + id) so a
// session can be found again and updated with its end time. A new key
// name (not the old 'courseLoginLog' plain-JSON-entries list from before
// session tracking existed) — those old entries aren't session IDs and
// would just resolve to nothing, which is fine, but a distinct name keeps
// that obvious rather than silently mixing formats.
const LOGIN_LOG_KEY = 'courseLoginLogV2';
const SESSION_KEY_PREFIX = 'courseLoginSession:';
const MAX_LOGIN_LOG_ENTRIES = 1000;
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

// Starts one login session — a running history the teacher can review,
// distinct from each student's own record (which only ever holds their
// *current* progress, not a log of when they logged in or for how long).
// Returns the session id, which the client holds onto and sends back
// later to close the session out (endSession) with either an explicit
// logout time or a "became inactive" time (tab closed/navigated away
// without logging out) — see endSession and Course/src/context/
// ProgressContext.jsx's pagehide handler.
async function startSession(url, token, displayName, isNewAccount) {
  const sessionId = crypto.randomBytes(12).toString('hex');
  const session = {
    name: displayName,
    loginAt: new Date().toISOString(),
    endedAt: null,
    endReason: null, // 'logout' | 'inactive', once ended
    isNewAccount
  };
  await upstash(url, token, ['SET', SESSION_KEY_PREFIX + sessionId, JSON.stringify(session)]);
  await upstash(url, token, ['LPUSH', LOGIN_LOG_KEY, sessionId]);
  await upstash(url, token, ['LTRIM', LOGIN_LOG_KEY, 0, MAX_LOGIN_LOG_ENTRIES - 1]);
  return sessionId;
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

    if (action === 'teacherLoginLog') {
      const teacherPassword = process.env.TEACHER_PASSWORD;
      if (!teacherPassword) {
        res.status(500).json({ error: 'teacher-not-configured' });
        return;
      }
      if (!timingSafeStringEqual(String(body.teacherPassword || ''), teacherPassword)) {
        res.status(401).json({ error: 'wrong-teacher-password' });
        return;
      }
      // Paginated (default page size 8, matching the "More" button in the
      // teacher view) rather than returning everything at once.
      const limit = Math.min(100, Math.max(1, Number(body.limit) || 8));
      const offset = Math.max(0, Number(body.offset) || 0);
      const [ids, total] = await Promise.all([
        upstash(url, token, ['LRANGE', LOGIN_LOG_KEY, offset, offset + limit - 1]),
        upstash(url, token, ['LLEN', LOGIN_LOG_KEY])
      ]);
      const raws = await upstashPipeline(url, token, (ids || []).map((id) => ['GET', SESSION_KEY_PREFIX + id]));
      const logins = raws
        .map((raw) => {
          try {
            return raw ? JSON.parse(raw) : null;
          } catch {
            return null;
          }
        })
        .filter(Boolean);
      res.status(200).json({ success: true, logins, hasMore: offset + (ids || []).length < (total || 0) });
      return;
    }

    if (action === 'endSession') {
      // Records when a session actually ended — an explicit logout, or
      // (via a pagehide/sendBeacon best-effort signal, so not guaranteed
      // for a crash/force-quit) simply becoming inactive by closing the
      // tab or navigating away without logging out. The session id itself
      // is the credential here — it's a random, unguessable 24-hex-char
      // value only the browser that started the session ever received, so
      // this deliberately doesn't also require the account password (a
      // logout/unload is not a sensitive action worth another round trip).
      const sessionId = String(body.sessionId || '');
      const reason = body.reason === 'logout' ? 'logout' : 'inactive';
      if (!sessionId) {
        res.status(400).json({ error: 'missing-session-id' });
        return;
      }
      const raw = await upstash(url, token, ['GET', SESSION_KEY_PREFIX + sessionId]);
      if (raw) {
        const session = JSON.parse(raw);
        if (!session.endedAt) {
          session.endedAt = new Date().toISOString();
          session.endReason = reason;
          await upstash(url, token, ['SET', SESSION_KEY_PREFIX + sessionId, JSON.stringify(session)]);
        }
      }
      // Fails soft either way — an unknown/already-ended session id is
      // not an error the caller (often a best-effort sendBeacon with
      // nothing listening for the response) needs to know about.
      res.status(200).json({ success: true });
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
        const sessionId = await startSession(url, token, record.displayName, true);
        res.status(200).json({ success: true, isNewAccount: true, displayName: record.displayName, sessionId });
        return;
      }

      const record = JSON.parse(raw);
      if (hashPassword(password, record.salt) !== record.passwordHash) {
        res.status(401).json({ error: 'wrong-password' });
        return;
      }
      const sessionId = await startSession(url, token, record.displayName, false);
      res.status(200).json({
        success: true,
        isNewAccount: false,
        displayName: record.displayName,
        profile: record.profile || null,
        progress: record.progress || null,
        sessionId
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

    if (action === 'delete') {
      // Lets a student abandon a mistaken/test account. Requires the
      // correct password, same as any other action here.
      if (!password) {
        res.status(400).json({ error: 'missing-password' });
        return;
      }
      const key = accountKey(name);
      const raw = await upstash(url, token, ['GET', key]);
      if (!raw) {
        res.status(200).json({ success: true }); // already gone
        return;
      }
      const record = JSON.parse(raw);
      if (hashPassword(password, record.salt) !== record.passwordHash) {
        res.status(401).json({ error: 'wrong-password' });
        return;
      }
      await upstash(url, token, ['DEL', key]);
      await upstash(url, token, ['SREM', INDEX_KEY, name.toLowerCase()]);
      res.status(200).json({ success: true });
      return;
    }

    res.status(400).json({ error: 'unknown-action' });
  } catch (e) {
    res.status(500).json({ error: 'Account request failed.', detail: e.message });
  }
};
