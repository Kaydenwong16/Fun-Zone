# AI Builder Kids 🤖✨

A 90-day, bilingual (English / 简体中文) interactive web app that teaches a kid
to think like a builder who uses AI as a tool: **Learn → Try → Break → Ask AI
→ Fix → Build → Explain.**

Version 1 ran entirely client-side with `localStorage` for progress. It now
also supports real per-student accounts (name + password) so progress
follows a student to any device — see "Accounts & the teacher view" below.

## What's built

- **Onboarding** — name, avatar, language (EN / 中文 / bilingual)
- **Dashboard** — XP, level, streak, today's mission, continue-learning card, badge preview
- **Learn** — Weeks 1–2 fully interactive (4 lessons each: hook, bilingual
  diagram, explanation, audio, hands-on interaction, quiz, challenge); Weeks
  3–12 have real (not placeholder) lesson content drawn from the spec's
  per-week curriculum, each with its own diagram, quiz and challenge
- **Missions** — a themed daily mission for all 90 days, grouped by week, with
  a bigger Mission/Project on each week's final day
- **Coding Lab** — live HTML/CSS/JS editor with a sandboxed preview iframe,
  Run/Reset, and a rule-based "Ask AI for Help" button
- **Roadmap** — the 90-day path across 3 levels (AI Explorer → Code Builder →
  AI Builder), lesson-by-lesson progress dots
- **Badges** — 10 unlockable badges tied to real progress milestones
- **AI Teacher** — a local, rule-based practice chatbot (keyword-matched
  answers about prompts, HTML/CSS/JS, debugging, APIs, agents) plus optional
  browser speech-to-text ("Talk to Teacher")
- **Parent & Teacher Dashboard** — a read-only progress summary for this
  device (no private conversations shown), plus a passcode-gated table of
  every enrolled student's progress for the teacher
- Bilingual audio narration via `window.speechSynthesis`, sequential lesson
  unlocking, XP/level/streak/badge logic, and full `localStorage` persistence
  (still the source of truth for the device you're on; a cloud account, once
  linked, is what lets that progress follow you elsewhere)

Everything simulated for Version 1 (the AI Teacher, the Prompt Lab's "AI
answers", the chatbot lesson) is implemented as a real local rule-based
system rather than a dead button — see `src/utils/simulateAI.js`. The
architecture is intentionally set up so those can be swapped for a real
backend + AI API later without changing how components call them (see spec
§30: never put a real API key in frontend code — route it through a
serverless/backend endpoint instead).

## Project structure

```
src/
  components/       Reusable UI: LessonView, Quiz, ChoiceCheck, PromptLab,
                     CodePlayground, AudioControls, diagrams/FlowDiagram, ...
  context/           LanguageContext, ProgressContext (React context + localStorage)
  data/              curriculum.js, lessons/week1..12.js, missions.js,
                     badges.js, vocabulary.js, diagrams.js, weeks.js
  pages/             Dashboard, Learn, Missions, Lab, Roadmap, Badges,
                     AITeacher, Parent
  utils/             storage.js, progress.js (XP/levels/streaks/badges),
                     speech.js (TTS/STT), simulateAI.js
  styles/global.css  Design tokens + all component styles
```

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build to dist/
npm run lint        # oxlint
```

## Accounts & the teacher view

Onboarding now asks each student to create a password after their name.
That pair is checked against `/api/course-account.js` (a serverless
function at the repo root, sharing the same Upstash Redis database the
Fighter Jet leaderboard already uses — no separate setup needed there):

- First time a name is used, the password is set and the account is
  created. Every return visit — same name, same password — logs back in
  and restores that student's saved profile/progress instead of starting
  over. Name matching is case-insensitive; passwords are hashed
  (SHA-256 + per-account salt), never stored in plain text.
- Each name is its own isolated record — one student's progress never
  merges with another's.
- While playing, progress is synced to the server in the background
  (debounced ~1.5s after each change) whenever a device is linked to an
  account. If the backend is unreachable, the app falls back to
  `localStorage`-only and never blocks play.
- A student already using the app before this feature shipped can link
  their existing local progress from **Settings → Cloud Account** instead
  of losing it.

**Teacher view** (Parent & Teacher Dashboard page): a passcode-gated table
listing every enrolled student's day/lessons/XP/streak/badges/last-active,
for monitoring the whole class at a glance. Requires one more environment
variable in the Vercel project settings:

```
TEACHER_PASSWORD=<a passcode you choose and share with the teacher only>
```

Without it, the teacher view shows a clear "not set up yet" message instead
of failing silently.

## Deploying

This is a static Vite/React app, built with `npm run build` (output to
`dist/`) and committed as static files into the repo root's `course-app/`
directory, which the top-level Vercel project (the same one serving
`Website/` and `game/`) deploys as-is at `/course-app/`. `vite.config.js`
sets `base: '/course-app/'` for the production build only — `npm run dev`
still runs at plain `/`. See `Website/index.html`'s CTA section for the
link into it.

## Next steps (see spec §40 "Future Version")

- A real AI Teacher / coding assistant behind a serverless backend
- Project sharing, real-time voice conversation
