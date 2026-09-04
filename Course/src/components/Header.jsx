import { useState } from "react";
import { useLanguage, UI_STRINGS } from "../context/LanguageContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { levelProgressPct } from "../utils/progress.js";

const NAV_ITEMS = [
  { key: "home", icon: "🏠", label: "navHome" },
  { key: "learn", icon: "📘", label: "navLearn" },
  { key: "missions", icon: "🎯", label: "navMissions" },
  { key: "lab", icon: "🧪", label: "navLab" },
  { key: "roadmap", icon: "🗺️", label: "navRoadmap" },
  { key: "badges", icon: "🏅", label: "navBadges" },
  { key: "teacher", icon: "🤖", label: "navTeacher" },
  { key: "parent", icon: "👪", label: "navParent" },
];

const LANG_OPTIONS = [
  { key: "en", label: "EN" },
  { key: "zh", label: "中文" },
  { key: "bi", label: "EN+中" },
];

export default function Header({ route, onNavigate, onOpenSettings }) {
  const { profile } = useLanguage();
  const { progress, level } = useProgress();
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (key) => {
    onNavigate(key);
    setMenuOpen(false);
  };

  return (
    <header className="app-header">
      <div className="app-header-inner container">
        <button type="button" className="brand" onClick={() => go("home")} aria-label="AI Builder Kids — Home">
          <span className="brand-mark">🤖</span>
          <span className="brand-text">
            <span className="en">AI Builder Kids</span>
          </span>
        </button>

        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const field = UI_STRINGS[item.label];
            return (
              <button
                key={item.key}
                type="button"
                className={`main-nav-item ${route === item.key ? "is-active" : ""}`}
                onClick={() => go(item.key)}
              >
                <span className="main-nav-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="main-nav-label">
                  {profile.language !== "zh" && <span className="en">{field.en}</span>}
                  {profile.language !== "en" && <span className="zh">{field.zh}</span>}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="header-right">
          <div className="header-stat" title="XP">
            ⭐ <strong>{progress.xp}</strong>
          </div>
          <div className="header-stat" title="Level">
            🧬 L{level}
          </div>
          <div className="header-stat header-stat-streak" title="Streak">
            🔥 {progress.streak}
          </div>
          <button type="button" className="btn btn-ghost btn-sm header-avatar" onClick={onOpenSettings} aria-label="Settings">
            {profile.language !== "zh" && <span className="en">Log out</span>}
            {profile.language !== "en" && <span className="zh">退出登录</span>}
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm nav-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            ☰
          </button>
        </div>
      </div>
      <div className="header-progress">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${levelProgressPct(progress.xp)}%` }} />
        </div>
      </div>
    </header>
  );
}

export { LANG_OPTIONS };
