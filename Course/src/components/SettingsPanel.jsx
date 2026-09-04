import { useState } from "react";
import { useLanguage, UI_STRINGS } from "../context/LanguageContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { speechSupported, recognitionSupported } from "../utils/speech.js";
import { authAccount } from "../utils/account.js";
import { getSession, saveSession, logoutDevice, markDeviceKnown } from "../utils/storage.js";

const MIN_PASSWORD_LEN = 4;

const LANGS = [
  { key: "en", en: "English", zh: "" },
  { key: "zh", en: "", zh: "中文" },
  { key: "bi", en: "English", zh: "+ 中文" },
];

export default function SettingsPanel({ onClose }) {
  const { t, language, setLanguage, profile, updateProfile } = useLanguage();
  const { progress, reset } = useProgress();
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetBusy, setResetBusy] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [session, setSession] = useState(() => getSession());
  const [linkPassword, setLinkPassword] = useState("");
  const [linkBusy, setLinkBusy] = useState(false);
  const [linkError, setLinkError] = useState("");

  const doReset = async () => {
    setResetBusy(true);
    await reset(); // also clears the cloud copy, if this profile is linked
    setResetBusy(false);
    setConfirmReset(false);
    onClose?.();
    window.location.reload();
  };

  const doLink = async () => {
    setLinkError("");
    if (linkPassword.length < MIN_PASSWORD_LEN) {
      setLinkError(t({ en: `Password needs at least ${MIN_PASSWORD_LEN} characters.`, zh: `密码至少需要${MIN_PASSWORD_LEN}个字符。` }));
      return;
    }
    setLinkBusy(true);
    const result = await authAccount({
      name: profile.name,
      password: linkPassword,
      profile,
      progress,
    });
    setLinkBusy(false);
    if (!result.ok) {
      setLinkError(
        result.error === "wrong-password"
          ? t({
              en: "That name already has a different password. Try that password, or change your name above first.",
              zh: "这个名字已经用了另一个密码。请尝试那个密码，或先在上面修改你的名字。",
            })
          : t({ en: "Couldn't reach the server. Try again in a moment.", zh: "无法连接服务器，请稍后再试。" })
      );
      return;
    }
    saveSession(profile.name, linkPassword);
    markDeviceKnown();
    setSession({ name: profile.name, password: linkPassword });
    setLinkPassword("");
  };

  const doLogout = () => {
    // Clears this student's local profile/progress/session so the next
    // person to open the app is prompted to log in — lets a different
    // student switch into their own account on the same device. Safe to
    // do immediately when synced to a cloud account (progress lives on
    // the server too); otherwise doLogout is only reached after the
    // confirm step below, since this device is the only copy.
    logoutDevice();
    onClose?.();
    window.location.reload();
  };

  const handleLogoutClick = () => {
    if (session) {
      doLogout();
    } else {
      setConfirmLogout(true);
    }
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
          <h3>{t({ en: "Cloud Account", zh: "云账户" })}</h3>
          {session ? (
            <p className="settings-note">
              {t({
                en: `✓ Signed in as "${session.name}". Progress syncs automatically and follows you to any device.`,
                zh: `✓ 已使用"${session.name}"登录。进度会自动同步，可在任何设备上继续。`,
              })}
            </p>
          ) : (
            <>
              <p className="settings-note">
                {t({
                  en: "Not linked to a cloud account yet — progress only lives on this device. Set a password to back it up and log in elsewhere.",
                  zh: "还没有关联云账户——进度只保存在这台设备上。设置密码即可备份，并在其他设备登录。",
                })}
              </p>
              <input
                className="name-input"
                type="password"
                value={linkPassword}
                onChange={(e) => setLinkPassword(e.target.value)}
                placeholder={t({ en: "Create a password", zh: "创建密码" })}
                style={{ marginBottom: 8 }}
              />
              {linkError && <p className="auth-error">{linkError}</p>}
              <button type="button" className="btn btn-primary btn-sm" disabled={linkBusy} onClick={doLink}>
                {linkBusy
                  ? t({ en: "Saving…", zh: "保存中…" })
                  : t({ en: "Save progress to the cloud", zh: "将进度保存到云端" })}
              </button>
            </>
          )}
        </div>

        <div className="settings-block">
          <h3>{t({ en: "Switch Student", zh: "切换学生" })}</h3>
          <p className="settings-note">
            {t({
              en: "Log out so another student can log in with their own name and password.",
              zh: "退出登录，让另一位学生用自己的名字和密码登录。",
            })}
          </p>
          {!confirmLogout ? (
            <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogoutClick}>
              {t({ en: "Log out", zh: "退出登录" })}
            </button>
          ) : (
            <div className="reset-confirm">
              <p className="auth-error">
                {t({
                  en: "This profile isn't linked to a cloud account (above), so logging out erases its progress from this device for good. Link it first, or continue to log out anyway?",
                  zh: "此资料尚未关联云账户（见上方），退出登录将永久清除本机上的进度。请先关联账户，或仍要退出登录？",
                })}
              </p>
              <button type="button" className="btn btn-danger btn-sm" onClick={doLogout}>
                {t({ en: "Log out anyway", zh: "仍要退出登录" })}
              </button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmLogout(false)}>
                {t({ en: "Cancel", zh: "取消" })}
              </button>
            </div>
          )}
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
              <button type="button" className="btn btn-danger btn-sm" disabled={resetBusy} onClick={doReset}>
                {resetBusy
                  ? t({ en: "Resetting…", zh: "重置中…" })
                  : t({ en: "Yes, reset everything", zh: "是的，全部重置" })}
              </button>
              <button type="button" className="btn btn-ghost btn-sm" disabled={resetBusy} onClick={() => setConfirmReset(false)}>
                {t({ en: "Cancel", zh: "取消" })}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
