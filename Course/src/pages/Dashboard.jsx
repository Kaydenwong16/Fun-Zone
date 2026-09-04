import { useLanguage } from "../context/LanguageContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { TOTAL_LESSONS, nextIncompleteLesson, weekMeta } from "../data/curriculum.js";
import { missionForDay } from "../data/missions.js";
import { levelForXP, levelProgressPct, overallCompletionPct } from "../utils/progress.js";
import { weekForDay, LEVELS } from "../data/weeks.js";
import { BADGES } from "../data/badges.js";

export default function Dashboard({ onNavigate, onOpenLesson }) {
  const { t, profile } = useLanguage();
  const { progress } = useProgress();

  const level = levelForXP(progress.xp);
  const pct = overallCompletionPct(progress, TOTAL_LESSONS);
  const currentWeek = weekForDay(progress.currentDay);
  const week = weekMeta(currentWeek);
  const todayMission = missionForDay(progress.currentDay);
  const nextLesson = nextIncompleteLesson(progress.completedLessons);
  const levelInfo = LEVELS.find((l) => l.weeks.includes(currentWeek));

  return (
    <div className="page dashboard animate-in">
      <div className="dash-hero card card-pad">
        <div className="dash-hero-left">
          <div className="dash-avatar">{profile.avatar}</div>
          <div>
            <p className="dash-greeting">{t({ en: `Welcome back, ${profile.name || "Builder"}!`, zh: `欢迎回来，${profile.name || "建造者"}！` })}</p>
            <h1 className="dash-week-title">{t(week?.title)}</h1>
          </div>
        </div>
        <div className="dash-stats">
          <div className="dash-stat">
            <span className="dash-stat-num">L{level}</span>
            <span className="dash-stat-label">{t({ en: "Level", zh: "等级" })}</span>
          </div>
          <div className="dash-stat">
            <span className="dash-stat-num">{progress.xp}</span>
            <span className="dash-stat-label">XP</span>
          </div>
          <div className="dash-stat">
            <span className="dash-stat-num">🔥 {progress.streak}</span>
            <span className="dash-stat-label">{t({ en: "Day Streak", zh: "天连续打卡" })}</span>
          </div>
          <div className="dash-stat">
            <span className="dash-stat-num">
              {t({ en: `Week ${currentWeek}`, zh: `第${currentWeek}周` })} / 12
            </span>
            <span className="dash-stat-label">{t({ en: "Progress", zh: "进度" })}</span>
          </div>
        </div>
      </div>

      <div className="dash-progress-row card card-pad">
        <div className="dash-progress-info">
          <span>{t({ en: `Level ${level} progress`, zh: `等级 ${level} 进度` })}</span>
          <span>{levelProgressPct(progress.xp)}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${levelProgressPct(progress.xp)}%` }} />
        </div>
        <div className="dash-progress-info">
          <span>{t({ en: "Curriculum completion", zh: "课程完成度" })}</span>
          <span>{pct}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="dash-grid">
        <div className="card card-pad dash-mission">
          <h3>🎯 {t({ en: "Today's Mission", zh: "今日任务" })} — {t({ en: `Day ${progress.currentDay}`, zh: `第${progress.currentDay}天` })}</h3>
          {todayMission ? (
            <>
              <p className="dash-mission-title">{t(todayMission.title)}</p>
              <p className="dash-mission-desc">{t(todayMission.description)}</p>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => onNavigate("missions")}>
                {t({ en: "Go to Missions", zh: "前往任务页" })}
              </button>
            </>
          ) : (
            <p>{t({ en: "All missions complete — amazing work!", zh: "所有任务都完成了——太棒了！" })}</p>
          )}
        </div>

        <div className="card card-pad dash-continue">
          <h3>📘 {t({ en: "Continue Learning", zh: "继续学习" })}</h3>
          {nextLesson ? (
            <>
              <p className="dash-mission-title">{t(nextLesson.title)}</p>
              <p className="dash-mission-desc">{t({ en: `Week ${nextLesson.week}`, zh: `第${nextLesson.week}周` })}</p>
              <button type="button" className="btn btn-primary" onClick={() => onOpenLesson(nextLesson.id)}>
                {t({ en: "CONTINUE MISSION", zh: "继续任务" })} →
              </button>
            </>
          ) : (
            <p>{t({ en: "You've completed every lesson! 🎉", zh: "你已经完成了所有课程！🎉" })}</p>
          )}
        </div>
      </div>

      <div className="dash-badges-preview card card-pad">
        <div className="dash-badges-head">
          <h3>🏅 {t({ en: "Badges", zh: "徽章" })}</h3>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => onNavigate("badges")}>
            {t({ en: "See all", zh: "查看全部" })} →
          </button>
        </div>
        <div className="badge-row">
          {BADGES.slice(0, 6).map((b) => {
            const earned = progress.badges.includes(b.id);
            return (
              <div key={b.id} className={`badge-chip ${earned ? "is-earned" : "is-locked"}`} title={t(b.name)}>
                <span className="badge-icon">{earned ? b.icon : "🔒"}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="dash-roadmap-teaser card card-pad">
        <h3>🗺️ {t({ en: "90-Day Roadmap", zh: "90天学习路线" })}</h3>
        <p className="dash-mission-desc">
          {t({ en: `Level ${levelInfo?.number}: `, zh: `等级 ${levelInfo?.number}：` })}
          {t(levelInfo?.name)}
        </p>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => onNavigate("roadmap")}>
          {t({ en: "View Roadmap", zh: "查看路线图" })} →
        </button>
      </div>
    </div>
  );
}
