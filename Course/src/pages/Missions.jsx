import { useLanguage } from "../context/LanguageContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { MISSIONS } from "../data/missions.js";
import { TOTAL_DAYS } from "../data/weeks.js";

export default function Missions() {
  const { t } = useLanguage();
  const { progress, completeMission, advanceDay } = useProgress();

  const doMission = (mission) => {
    completeMission(mission.day, mission.xp);
    if (mission.day >= progress.currentDay) advanceDay(Math.min(TOTAL_DAYS, mission.day + 1));
  };

  return (
    <div className="page missions-page animate-in">
      <h1 className="page-title">
        <span className="en">Missions</span> <span className="zh">任务</span>
      </h1>
      <p className="page-subtitle">{t({ en: `Day ${progress.currentDay} of ${TOTAL_DAYS}`, zh: `第${progress.currentDay}天 / 共${TOTAL_DAYS}天` })}</p>

      <div className="mission-grid">
        {MISSIONS.map((m) => {
          const done = progress.completedMissions.includes(m.day);
          const isToday = m.day === progress.currentDay;
          const locked = m.day > progress.currentDay && !done;
          return (
            <div
              key={m.day}
              className={`mission-card card ${done ? "is-done" : ""} ${isToday ? "is-today" : ""} ${locked ? "is-locked" : ""} ${m.isWeekFinal ? "is-final" : ""}`}
            >
              <div className="mission-card-head">
                <span className="mission-day">{t({ en: `Day ${m.day}`, zh: `第${m.day}天` })}</span>
                {done && <span className="mission-check">✓</span>}
                {locked && <span className="mission-lock">🔒</span>}
              </div>
              <p className="mission-title">{t(m.title)}</p>
              <p className="mission-desc">{t(m.description)}</p>
              <div className="mission-card-foot">
                <span className="pill pill-amber">+{m.xp} XP</span>
                {!done && !locked && (
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => doMission(m)}>
                    {t({ en: "Mark Complete", zh: "标记完成" })}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
