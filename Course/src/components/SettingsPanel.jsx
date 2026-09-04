import { useState } from "react";
import { useLanguage, UI_STRINGS } from "../context/LanguageContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { speechSupported, recognitionSupported } from "../utils/speech.js";

const LANGS = [
  { key: "en", en: "English", zh: "" },
  { key: "zh", en: "", zh: "中文" },
  { key: "bi", en: "English", zh: "+ 中文" },
];

export default function SettingsPanel({ onClose }) {
  const { t, language, setLanguage, profile, updateProfile } = useLanguage();
  const { reset } = useProgress();
  const [confirmReset, setConfirmReset] = useState(false);

  const doReset = () => {
    reset();
    setConfirmReset(false);
    onClose?.();
    window.location.reload();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-panel card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>⚙ {t(UI_STRINGS.settings)}</h2>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="settings-block">
          <h3>{t(UI_STRINGS.language)}</h3>
          <div className="lang-options">
            {LANGS.map((l) => (
              <button
                key={l.key}
                type="button"
                className={`lang-option ${language === l.key ? "is-active" : ""}`}
                onClick={() => setLanguage(l.key)}
              >
                {l.en} {l.zh}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-block">
          <h3>{t(UI_STRINGS.audio)}</h3>
          <p className="settings-note">
            {speechSupported()
              ? t({ en: "✓ Voice narration is available in this browser.", zh: "✓ 此浏览器支持语音朗读。" })
              : t({ en: "Voice narration isn't supported in this browser. Try Chrome or Safari.", zh: "此浏览器不支持语音朗读。请尝试使用Chrome或Safari。" })}
          </p>
          <p className="settings-note">
            {recognitionSupported()
              ? t({ en: "✓ \"Talk to Teacher\" voice input is available.", zh: "✓ \"和老师说话\"语音输入功能可用。" })
              : t({ en: "Voice input isn't supported in this browser.", zh: "此浏览器不支持语音输入。" })}
          </p>
        </div>

        <div className="settings-block">
          <h3>{t({ en: "Profile", zh: "个人资料" })}</h3>
          <input
            className="name-input"
            value={profile.name}
            onChange={(e) => updateProfile({ name: e.target.value })}
            placeholder={t({ en: "Your name", zh: "你的名字" })}
          />
        </div>

        <div className="settings-block">
          <h3 className="danger-title">{t(UI_STRINGS.resetProgress)}</h3>
          {!confirmReset ? (
            <button type="button" className="btn btn-danger btn-sm" onClick={() => setConfirmReset(true)}>
              {t(UI_STRINGS.resetProgress)}
            </button>
          ) : (
            <div className="reset-confirm">
              <p>{t({ en: "This will erase all progress, XP, and badges. Are you sure?", zh: "这将清除所有进度、经验值和徽章。你确定吗？" })}</p>
              <button type="button" className="btn btn-danger btn-sm" onClick={doReset}>
                {t({ en: "Yes, reset everything", zh: "是的，全部重置" })}
              </button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmReset(false)}>
                {t({ en: "Cancel", zh: "取消" })}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
