# Fun-Zone

Kayden's Fun Zone — a kids' landing page (`Website/index.html`, served at `/`) with a rotating
hero video, linking to two things: Kayden's Jet Battle, a browser-based fighter jet shooter game
(`game/index.html`, served at `/game/`), and AI Builder Kids, a 90-day course app (built from
`Course/`, its static output committed at `course-app/`, served at `/course-app/` — see
`Course/README.md`).

The root `vercel.json` rewrites `/` to `Website/index.html`; `/game/` and `/course-app/` are
served automatically as static folders.

Live at **https://fun-zone-theta.vercel.app**. This repo (`Kaydenwong16/Fun-Zone`) is the
primary one — it started as a copy of the original `Kaydenwong16/Fighter-Jet` repo (same
history, same code), which still exists but is no longer the one being deployed to.

## Play

Open `Website/index.html` for the landing page, or `game/index.html` to jump straight into the game.

## Controls

- **Arrow Keys / WASD** — move
- **Space** — shoot

## Global leaderboard setup

> **Status on the live Fun-Zone deployment:** not done yet — Vercel env vars don't carry over
> when a repo is freshly imported into a new project, so this still needs doing here even
> though it was already set up on the old Fighter-Jet project.

Players enter their name before playing, get 3 minutes on the clock, and the top 3 scores
are shown to every visitor via `/api/leaderboard` (`api/leaderboard.js`), backed by Upstash
Redis. This needs a one-time setup in the Vercel dashboard before it'll work:

1. Open the project on vercel.com → **Storage** tab → **Create Database** → **Upstash** →
   **Redis** (the free tier is enough). This automatically adds the `UPSTASH_REDIS_REST_URL`
   and `UPSTASH_REDIS_REST_TOKEN` environment variables to the project.
2. Redeploy (or just push again) so the new environment variables take effect.

Until this is done, `/api/leaderboard` returns an error and the game quietly falls back to
showing "No scores yet" instead of breaking.

## Course student accounts & teacher view setup

> **Status on the live Fun-Zone deployment:** also not done yet, same reason as above.

AI Builder Kids (`/course-app/`) uses the *same* Upstash Redis database above (via
`api/course-account.js`) to give each student their own name+password account, synced across
devices. That part needs no extra setup once step 1 above is done.

The teacher view (a passcode-gated table of every student's progress, on the course app's
Parent & Teacher Dashboard page) needs one more env var:

1. Vercel dashboard → project → **Settings** → **Environment Variables** → add
   `TEACHER_PASSWORD` with a passcode you choose (share it only with the teacher).
2. Redeploy so it takes effect.

Until set, the teacher view shows a clear "not set up yet" message rather than failing silently.
