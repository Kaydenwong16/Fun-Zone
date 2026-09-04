// Standalone "Course Outline" page for parents — a plain, printable
// document, not a client-side route in the app. Deliberately vanilla JS
// (no React) since it's read-only: it renders straight from the same
// curriculum data the app uses, so it can never drift out of sync with
// what a student actually sees.
import "./styles/global.css";
import "./styles/outline.css";
import { LEVELS, WEEKS } from "./data/weeks.js";
import { LESSONS_BY_WEEK, TOTAL_LESSONS } from "./data/curriculum.js";
import { MISSIONS, missionForDay } from "./data/missions.js";

function bi(field) {
  if (!field) return "";
  return `<span class="en">${field.en}</span><span class="zh">${field.zh}</span>`;
}

// Purely a display label on this page: a week of curriculum content is
// paced as 7 calendar days (Week 1 = Days 1–7, ... Week 12 = Days 78–90,
// its Final Project week running long). This is independent of how the
// app itself tracks progress (one active lesson-day per week) — it's
// just how the outline presents the pacing to a parent.
function calendarDayRange(weekNumber) {
  if (weekNumber === 12) return { start: 78, end: 90 };
  const start = (weekNumber - 1) * 7 + 1;
  return { start, end: start + 6 };
}

function weekBlock(weekNumber) {
  const week = WEEKS.find((w) => w.number === weekNumber);
  const lessons = LESSONS_BY_WEEK[weekNumber] || [];
  const mission = missionForDay(weekNumber);
  const { start, end } = calendarDayRange(weekNumber);

  return `
    <div class="outline-week card card-pad">
      <div class="outline-week-head">
        <span class="pill pill-blue">${bi({ en: `Week ${weekNumber} · Days ${start}–${end}`, zh: `第${weekNumber}周 · 第${start}–${end}天` })}</span>
        <h3>${bi(week.title)}</h3>
      </div>

      <h4 class="outline-subhead">${bi({ en: "Lessons", zh: "课程" })}</h4>
      <ol class="outline-lesson-list">
        ${lessons
          .map(
            (l) => `
          <li>
            <p class="outline-lesson-title">${bi(l.title)}</p>
            <p class="outline-lesson-hook">${bi(l.hook)}</p>
          </li>`
          )
          .join("")}
      </ol>

      ${
        mission
          ? `
      <h4 class="outline-subhead">${bi({ en: "Mission", zh: "任务" })}</h4>
      <div class="outline-mission">
        <p class="outline-mission-title">${bi(mission.title)} <span class="pill pill-amber">+${mission.xp} XP</span></p>
        <p class="outline-mission-desc">${bi(mission.description)}</p>
      </div>`
          : ""
      }
    </div>`;
}

function levelBlock(level) {
  return `
    <section class="outline-level">
      <div class="roadmap-level-head">
        <span class="pill pill-purple">${bi({ en: `LEVEL ${level.number}`, zh: `等级 ${level.number}` })}</span>
        <h2>${bi(level.name)}</h2>
      </div>
      <div class="outline-weeks">
        ${level.weeks.map(weekBlock).join("")}
      </div>
    </section>`;
}

function render() {
  const root = document.getElementById("outline-root");
  root.innerHTML = `
    <div class="outline-page">
      <header class="outline-header">
        <div class="outline-header-inner container">
          <a href="./" class="brand" aria-label="Back to AI Builder Kids">
            <span class="brand-mark">🤖</span>
            <span class="brand-text"><span class="en">AI Builder Kids</span></span>
          </a>
          <button type="button" class="btn btn-secondary btn-sm no-print" onclick="window.print()">
            🖨️ <span class="en">Print</span><span class="zh">打印</span>
          </button>
        </div>
      </header>

      <main class="container outline-main">
        <h1 class="page-title">
          <span class="en">Course Outline</span> <span class="zh">课程大纲</span>
        </h1>
        <p class="page-subtitle">
          ${bi({
            en: `A 90-day journey, 12 weeks of 7 days each · ${TOTAL_LESSONS} lessons · ${MISSIONS.length} missions`,
            zh: `90天的学习旅程，共12周，每周7天 · ${TOTAL_LESSONS}节课 · ${MISSIONS.length}个任务`,
          })}
        </p>

        ${LEVELS.map(levelBlock).join("")}

        <p class="outline-footer-note">
          ${bi({
            en: "This is a read-only overview for parents — no login needed. Your child's own progress lives in the app.",
            zh: "这是给家长查看的只读概览——无需登录。孩子的实际进度保存在应用内。",
          })}
        </p>
      </main>
    </div>`;
}

render();
