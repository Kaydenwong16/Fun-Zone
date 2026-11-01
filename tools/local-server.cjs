// Local preview of the whole Fun Zone site — started by "Start Fun Zone.command"
// (or `node tools/local-server.cjs`). Serves the repo's static files with the
// same "/" -> Website/index.html rewrite as vercel.json, plus the real
// api/*.js handlers running against an in-memory fake Redis, so AI Builder
// logins/saving and the leaderboards work locally without touching the live
// database. Test data lasts until the server stops.
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), PORT = +process.argv[2] || 8800;
process.env.UPSTASH_REDIS_REST_URL = 'http://fake-redis'; process.env.UPSTASH_REDIS_REST_TOKEN = 't';
process.env.TEACHER_PASSWORD = process.env.TEACHER_PASSWORD || 'teacher'; // teacher view passcode, locally only
const db = new Map();
function run([cmd, key, ...a]) {
  const L = () => { if (!db.has(key)) db.set(key, []); return db.get(key); };
  const S = () => { if (!db.has(key)) db.set(key, new Set()); return db.get(key); };
  switch (cmd) {
    case 'GET': return db.has(key) ? db.get(key) : null;
    case 'SET': db.set(key, a[0]); return 'OK';
    case 'DEL': return db.delete(key) ? 1 : 0;
    case 'LPUSH': L().unshift(...a.reverse()); return L().length;
    case 'LTRIM': db.set(key, L().slice(+a[0], +a[1] + 1)); return 'OK';
    case 'LRANGE': return L().slice(+a[0], +a[1] === -1 ? undefined : +a[1] + 1);
    case 'LLEN': return L().length;
    case 'SADD': { const s = S(); let n = 0; for (const m of a) if (!s.has(m)) { s.add(m); n++; } return n; }
    case 'SREM': { const s = S(); let n = 0; for (const m of a) if (s.delete(m)) n++; return n; }
    case 'SMEMBERS': return [...S()];
    default: throw new Error('fake redis: unsupported ' + cmd);
  }
}
const realFetch = global.fetch;
global.fetch = async (url, opts) => {
  url = String(url);
  if (!url.startsWith('http://fake-redis')) return realFetch(url, opts);
  const body = JSON.parse(opts.body);
  const result = url.endsWith('/pipeline') ? body.map(c => ({ result: run(c) })) : { result: run(body) };
  return { ok: true, json: async () => result };
};
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.json': 'application/json', '.ico': 'image/x-icon' };
http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  const api = u.pathname.match(/^\/api\/([\w-]+)$/);
  if (api) {
    const file = path.join(ROOT, 'api', api[1] + '.js');
    if (!fs.existsSync(file)) { res.statusCode = 404; return res.end(); }
    let body = ''; req.on('data', c => body += c); req.on('end', async () => {
      req.query = Object.fromEntries(u.searchParams);
      try { req.body = body ? JSON.parse(body) : {}; } catch { req.body = body; }
      res.status = c => { res.statusCode = c; return res; };
      res.json = o => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(o)); };
      try { await require(file)(req, res); } catch (e) { res.statusCode = 500; res.end(String(e)); }
    });
    return;
  }
  let p = decodeURIComponent(u.pathname);
  if (p === '/') p = '/Website/index.html';
  let f = path.join(ROOT, p);
  if (!f.startsWith(ROOT)) { res.statusCode = 403; return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  fs.readFile(f, (e, d) => {
    if (e) { res.statusCode = 404; return res.end('Not found'); }
    res.setHeader('Content-Type', TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-store');
    res.end(d);
  });
}).listen(PORT, '127.0.0.1', () => console.log(`Fun Zone is running at http://localhost:${PORT}/  (close this window to stop)`));
