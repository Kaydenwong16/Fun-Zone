import { useLanguage } from "../context/LanguageContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";

export default function BadgeUnlockModal() {
  const { t } = useLanguage();
  const { badgeUnlock, dismissBadge } = useProgress();
  if (!badgeUnlock) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={dismissBadge}>
      <div className="badge-unlock-card animate-in" onClick={(e) => e.stopPropagation()}>
        <p className="badge-unlock-label">{t({ en: "Badge Unlocked!", zh: "解锁新徽章！" })}</p>
        <div className="badge-unlock-icon">{badgeUnlock.icon}</div>
        <h2 className="badge-unlock-name">{t(badgeUnlock.name)}</h2>
        <p className="badge-unlock-desc">{t(badgeUnlock.description)}</p>
        <button type="button" className="btn btn-primary" onClick={dismissBadge}>
          {t({ en: "Awesome!", zh: "太棒了！" })}
        </button>
      </div>
    </div>
  );
}
