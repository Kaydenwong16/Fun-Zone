import { useLanguage } from "../context/LanguageContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { TOTAL_LESSONS } from "../data/curriculum.js";
import { TOTAL_DAYS } from "../data/weeks.js";
import { BADGES } from "../data/badges.js";
import { overallCompletionPct } from "../utils/progress.js";

export default function Parent() {
  const { t, profile } = useLanguage();
  const { progress, level } = useProgress();

  const skillsLearned = [
    { en: "What AI is and how it learns", zh: "什么是AI，以及它是怎么学习的" },
    { en: "Writing clear prompts", zh: "写出清楚的提示词" },
    { en: "Checking AI answers for mistakes", zh: "核实AI答案中的错误" },
    { en: "HTML, CSS and JavaScript basics", zh: "HTML、CSS和JavaScript基础" },
    { en: "Reading and fixing (debugging) code", zh: "阅读并修复（调试）代码" },
    { en: "What APIs and data are", zh: "什么是API和数据" },
  ].filter((_, i) => progress.completedLessons.length > i * 3);

  return (
    <div className="page parent-page animate-in">
      <h1 className="page-title">
        <span className="en">Parent Dashboard</span> <span className="zh">家长面板</span>
      </h1>
      <p className="page-subtitle">
        {t({ en: `A progress summary for ${profile.name || "your builder"}.`, zh: `${profile.name || "你家的小建造者"}的进度总览。` })}
      </p>

      <div className="parent-stats-grid">
        <div className="card card-pad parent-stat">
          <span className="dash-stat-num">{progress.currentDay}/{TOTAL_DAYS}</span>
          <span className="dash-stat-label">{t({ en: "Days Completed", zh: "已完成天数" })}</span>
        </div>
        <div className="card card-pad parent-stat">
          <span className="dash-stat-num">{progress.completedLessons.length}/{TOTAL_LESSONS}</span>
          <span className="dash-stat-label">{t({ en: "Lessons Completed", zh: "已完成课程" })}</span>
        </div>
        <div className="card card-pad parent-stat">
          <span className="dash-stat-num">{progress.xp}</span>
          <span className="dash-stat-label">XP</span>
        </div>
        <div className="card card-pad parent-stat">
          <span className="dash-stat-num">L{level}</span>
          <span className="dash-stat-label">{t({ en: "Level", zh: "等级" })}</span>
        </div>
        <div className="card card-pad parent-stat">
          <span className="dash-stat-num">🔥 {progress.streak}</span>
          <span className="dash-stat-label">{t({ en: "Streak", zh: "连续打卡" })}</span>
        </div>
        <div className="card card-pad parent-stat">
          <span className="dash-stat-num">{progress.badges.length}/{BADGES.length}</span>
          <span className="dash-stat-label">{t({ en: "Badges", zh: "徽章" })}</span>
        </div>
      </div>

      <div className="card card-pad parent-block">
        <h3>{t({ en: "Overall completion", zh: "总体完成度" })}</h3>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${overallCompletionPct(progress, TOTAL_LESSONS)}%` }} />
        </div>
      </div>

      <div className="card card-pad parent-block">
        <h3>{t({ en: "Skills so far", zh: "目前掌握的技能" })}</h3>
        {skillsLearned.length === 0 ? (
          <p>{t({ en: "Just getting started!", zh: "刚刚开始！" })}</p>
        ) : (
          <ul className="parent-skill-list">
            {skillsLearned.map((s, i) => (
              <li key={i}>✓ {t(s)}</li>
            ))}
          </ul>
        )}
      </div>

      <p className="parent-privacy-note">
        {t({ en: "This summary shows progress only — no private conversations are shown here.", zh: "这里只显示进度总览——不会展示任何私人对话内容。" })}
      </p>
    </div>
  );
}
