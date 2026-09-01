# AI Builder Kids 🤖✨

A 90-day, bilingual (English / 简体中文) interactive web app that teaches a kid
to think like a builder who uses AI as a tool: **Learn → Try → Break → Ask AI
→ Fix → Build → Explain.**

Version 1 is fully functional and requires **no backend, no API key, and no
login** — everything runs client-side with `localStorage` for progress.

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
- **Parent Dashboard** — a read-only progress summary (no private
  conversations shown)
- Bilingual audio narration via `window.speechSynthesis`, sequential lesson
  unlocking, XP/level/streak/badge logic, and full `localStorage` persistence

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

## Deploying

This is a static Vite/React app — deploy `Course/` as its own project on
Vercel (or any static host): build command `npm run build`, output directory
`dist`. It's independent of the sibling `Website/` project in this repo.

## Next steps (see spec §40 "Future Version")

- A real AI Teacher / coding assistant behind a serverless backend
- Cloud account + database (replacing `localStorage`)
- Project sharing, parent accounts, real-time voice conversation
