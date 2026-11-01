import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";

/**
 * Link back to the Fun Zone home page (this app is served at /course-app/
 * inside the Fun Zone site, whose home is "/"). Sits at the right end of the
 * header; `floating` pins it to the top-right corner on screens without the
 * header (login / onboarding). Saves the student's progress — including the
 * cloud copy for a logged-in student — before leaving, so nothing is lost.
 */
export default function FunZoneLink({ floating = false }) {
  const { profile } = useLanguage();
  const { saveNow } = useProgress();
  const [saving, setSaving] = useState(false);

  const leave = async (e) => {
    // Let modified clicks (new tab / window) through untouched.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    await saveNow();
    window.location.href = "/";
  };

  const label = (en, zh) => (
    <>
      {profile.language !== "zh" && <span className="en">{en}</span>}
      {profile.language !== "en" && <span className="zh">{zh}</span>}
    </>
  );

  return (
    <a
      href="/"
      onClick={leave}
      className={`btn btn-sm funzone-link ${floating ? "is-floating" : ""}`}
      aria-label="Return to Fun Zone · 返回Fun Zone主页"
      title="Return to Fun Zone · 返回Fun Zone主页"
      aria-busy={saving}
    >
      <span aria-hidden="true">{saving ? "💾" : "🏠"}</span>
      {saving ? (
        <span className="main-nav-label">{label("Saving…", "保存中…")}</span>
      ) : (
        <>
          <span className="main-nav-label fz-full">{label("Return to Fun Zone", "返回Fun Zone主页")}</span>
          <span className="main-nav-label fz-short">Fun Zone</span>
        </>
      )}
    </a>
  );
}
