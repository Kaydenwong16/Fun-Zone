import { useLanguage } from "../context/LanguageContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { BADGES } from "../data/badges.js";

export default function Badges() {
  const { t } = useLanguage();
  const { progress } = useProgress();

  return (
    <div className="page badges-page animate-in">
      <h1 className="page-title">
        <span className="en">Badges</span> <span className="zh">徽章</span>
      </h1>
      <p className="page-subtitle">
        {t({ en: `${progress.badges.length} / ${BADGES.length} earned`, zh: `已获得 ${progress.badges.length} / ${BADGES.length}` })}
      </p>
      <div className="badges-grid">
        {BADGES.map((b) => {
          const earned = progress.badges.includes(b.id);
          return (
            <div key={b.id} className={`badge-card card card-pad ${earned ? "is-earned" : "is-locked"}`}>
              <div className="badge-card-icon">{earned ? b.icon : "🔒"}</div>
              <h3 className="badge-card-name">{t(b.name)}</h3>
              <p className="badge-card-desc">{earned ? t(b.description) : t({ en: "Keep going to unlock this badge.", zh: "继续努力，解锁这个徽章。" })}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
