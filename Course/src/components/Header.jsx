import { useLayoutEffect, useRef, useState } from "react";
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
  // A standalone static page (course-outline.html), not a client-side
  // route — opens in a new tab so a parent can browse it without losing
  // whatever the student was doing in the app.
  { key: "courseOutline", icon: "📋", label: "navCourseOutline", href: "course-outline.html" },
  { key: "parent", icon: "👪", label: "navParent" },
];

const LANG_OPTIONS = [
  { key: "en", label: "EN" },
  { key: "zh", label: "中文" },
  { key: "bi", label: "EN+中" },
];

function NavItemContent({ item, field, language }) {
  return (
    <>
      <span className="main-nav-icon" aria-hidden="true">
        {item.icon}
      </span>
      <span className="main-nav-label">
        {language !== "zh" && <span className="en">{field.en}</span>}
        {language !== "en" && <span className="zh">{field.zh}</span>}
      </span>
    </>
  );
}

export default function Header({ route, onNavigate, onOpenSettings }) {
  const { profile } = useLanguage();
  const { progress, level } = useProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const innerRef = useRef(null);
  const brandRef = useRef(null);
  const rightRef = useRef(null);
  const measureRef = useRef(null);

  const go = (key) => {
    onNavigate(key);
    setMenuOpen(false);
  };

  // Whether the nav row actually fits is measured directly, rather than
  // guessed at a fixed viewport-width breakpoint — a pixel breakpoint has
  // to be re-tuned by hand every time a nav item, translation, or font
  // changes (this has already broken twice as the nav grew). measureRef
  // points at an invisible (but always laid-out — position: fixed +
  // visibility: hidden, never display: none) duplicate of the nav items
  // in a plain, unwrapped row, so its natural width is a reliable "how
  // much room would the full nav need" figure regardless of whether the
  // real nav is currently shown as a row or collapsed into the dropdown —
  // measuring the real nav directly doesn't work, since collapsing it
  // (display: none) zeroes out its children's widths too, which would
  // make it flicker between the two states.
  useLayoutEffect(() => {
    const measure = () => {
      const inner = innerRef.current;
      const measureEl = measureRef.current;
      if (!inner || !measureEl || !brandRef.current || !rightRef.current) return;
      const gap = parseFloat(window.getComputedStyle(inner).gap) || 0;
      const available = inner.clientWidth - brandRef.current.offsetWidth - rightRef.current.offsetWidth - gap * 2;
      setIsCompact(measureEl.scrollWidth > available);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(innerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [profile.language]);

  return (
    <header className="app-header">
      <div className="app-header-inner container" ref={innerRef}>
        <button type="button" className="brand" ref={brandRef} onClick={() => go("home")} aria-label="AI Builder Kids — Home">
          <span className="brand-mark">🤖</span>
          <span className="brand-text">
            <span className="en">AI Builder Kids</span>
          </span>
        </button>

        {/* Invisible measurement-only copy — see the effect above. */}
        <div className="main-nav-measure" ref={measureRef} aria-hidden="true">
          {NAV_ITEMS.map((item) => (
            <span key={item.key} className="main-nav-item">
              <NavItemContent item={item} field={UI_STRINGS[item.label]} language={profile.language} />
            </span>
          ))}
        </div>

        <nav className={`main-nav ${isCompact ? "is-compact" : ""} ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const field = UI_STRINGS[item.label];
            const content = <NavItemContent item={item} field={field} language={profile.language} />;
            if (item.href) {
              return (
                <a key={item.key} href={item.href} target="_blank" rel="noopener noreferrer" className="main-nav-item">
                  {content}
                </a>
              );
            }
            return (
              <button
                key={item.key}
                type="button"
                className={`main-nav-item ${route === item.key ? "is-active" : ""}`}
                onClick={() => go(item.key)}
              >
                {content}
              </button>
            );
          })}
        </nav>

        <div className="header-right" ref={rightRef}>
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
            <span className="main-nav-label">
              {profile.language !== "zh" && <span className="en">Log out</span>}
              {profile.language !== "en" && <span className="zh">退出登录</span>}
            </span>
          </button>
          {isCompact && (
            <button
              type="button"
              className="btn btn-ghost btn-sm nav-toggle"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              ☰
            </button>
          )}
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
