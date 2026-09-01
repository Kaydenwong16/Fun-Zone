import { useLanguage } from "../context/LanguageContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { LEVELS, WEEKS, dayRangeForWeek } from "../data/weeks.js";
import { LESSONS_BY_WEEK } from "../data/curriculum.js";

export default function Roadmap({ onOpenLesson }) {
  const { t } = useLanguage();
  const { progress } = useProgress();

  return (
    <div className="page roadmap-page animate-in">
      <h1 className="page-title">
        <span className="en">90-Day Roadmap</span> <span className="zh">90天学习路线</span>
      </h1>

      {LEVELS.map((level) => (
        <div key={level.number} className="roadmap-level">
          <div className="roadmap-level-head">
            <span className="pill pill-purple">{t({ en: `LEVEL ${level.number}`, zh: `等级 ${level.number}` })}</span>
            <h2>{t(level.name)}</h2>
          </div>
          <div className="roadmap-weeks">
            {level.weeks.map((weekNum) => {
              const week = WEEKS.find((w) => w.number === weekNum);
              const lessons = LESSONS_BY_WEEK[weekNum];
              const range = dayRangeForWeek(weekNum);
              const doneCount = lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
              const allDone = doneCount === lessons.length;
              const started = doneCount > 0;
              return (
                <div key={weekNum} className={`roadmap-week-card card ${allDone ? "is-done" : started ? "is-active" : ""}`}>
                  <div className="roadmap-week-days">
                    {t({ en: `Day ${range.start}`, zh: `第${range.start}天` })} – {t({ en: `Day ${range.end}`, zh: `第${range.end}天` })}
                  </div>
                  <h3>{t({ en: `Week ${weekNum}`, zh: `第${weekNum}周` })}</h3>
                  <p className="roadmap-week-title">{t(week.title)}</p>
                  <div className="roadmap-week-lessons">
                    {lessons.map((l) => {
                      const done = progress.completedLessons.includes(l.id);
                      return (
                        <button
                          key={l.id}
                          type="button"
                          className={`roadmap-dot ${done ? "is-done" : ""}`}
                          onClick={() => onOpenLesson(l.id)}
                          title={t(l.title)}
                        >
                          {done ? "✓" : "○"}
                        </button>
                      );
                    })}
                  </div>
                  <div className="progress-track roadmap-track">
                    <div className="progress-fill" style={{ width: `${Math.round((doneCount / lessons.length) * 100)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
