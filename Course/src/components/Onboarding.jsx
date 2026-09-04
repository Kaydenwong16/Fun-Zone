import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { authAccount } from "../utils/account.js";
import { getProgress, saveSession, markDeviceKnown } from "../utils/storage.js";

const AVATARS = ["🤖", "🦊", "🐼", "🦄", "🐯", "🐸", "🐙", "🦁"];
const MIN_PASSWORD_LEN = 4;

export default function Onboarding({ onFinish }) {
  const { t, setLanguage, updateProfile } = useLanguage();
  const { loadProgress } = useProgress();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [lang, setLang] = useState("bi");
  const [authError, setAuthError] = useState("");
  const [busy, setBusy] = useState(false);

  const finish = async () => {
    const cleanName = name.trim() || "Builder";
    setLanguage(lang);
    setAuthError("");

    if (password.length < MIN_PASSWORD_LEN) {
      setAuthError(
        t({
          en: `Password needs at least ${MIN_PASSWORD_LEN} characters.`,
          zh: `密码至少需要${MIN_PASSWORD_LEN}个字符。`,
        })
      );
      return;
    }

    setBusy(true);
    const result = await authAccount({
      name: cleanName,
      password,
      profile: { name: cleanName, avatar, language: lang },
      progress: getProgress(),
    });
    setBusy(false);

    if (!result.ok) {
      if (result.error === "wrong-password") {
        setAuthError(
          t({
            en: "That password doesn't match this name. Try again, or use a different name.",
            zh: "密码与这个名字不匹配。请重试，或换一个名字。",
          })
        );
        return;
      }
      // Backend unreachable/not configured — don't block play, just keep
      // this device local-only (matches the old, pre-account behavior).
      updateProfile({ name: cleanName, avatar, language: lang, onboarded: true });
      markDeviceKnown();
      onFinish();
      return;
    }

    saveSession(cleanName, password, result.data.sessionId);
    if (!result.data.isNewAccount && result.data.progress) {
      loadProgress(result.data.progress);
    }
    const serverProfile = result.data.profile;
    updateProfile({
      ...(serverProfile || { name: cleanName, avatar, language: lang }),
      onboarded: true,
    });
    markDeviceKnown();
    onFinish();
  };

  return (
    <div className="onboarding">
      <div className="onboarding-card card card-pad animate-in">
        {step === 0 && (
          <>
            <div className="onboarding-hero">🤖✨</div>
            <h1 className="onboarding-title">
              <span className="en">Welcome, Builder!</span>
              <span className="zh">欢迎，小小建造者！</span>
            </h1>
            <p className="onboarding-text">
              Over the next 12 weeks, you'll learn how to use AI and build things with it — one lesson day per week.
              <br />
              <span className="zh">接下来的12周，你将学习如何使用AI，并用AI创造真正的作品——每周一个学习日。</span>
            </p>
            <button type="button" className="btn btn-primary" onClick={() => setStep(1)}>
              START BUILDING · 开始创造
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="onboarding-q">
              <span className="en">What's your name?</span>
              <span className="zh">你的名字是什么？</span>
            </h2>
            <input
              className="name-input onboarding-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Kayden"
              autoFocus
            />
            <h3 className="onboarding-subq">
              <span className="en">Create a password — you'll use it to log back in and keep your progress</span>{" "}
              <span className="zh">创建一个密码——用它登录，保留你的进度</span>
            </h3>
            <input
              className="name-input onboarding-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t({ en: "Password", zh: "密码" })}
              minLength={MIN_PASSWORD_LEN}
            />
            <h3 className="onboarding-subq">
              <span className="en">Pick an avatar</span> <span className="zh">选择一个头像</span>
            </h3>
            <div className="avatar-grid">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`avatar-option ${avatar === a ? "is-active" : ""}`}
                  onClick={() => setAvatar(a)}
                >
                  {a}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!name.trim() || password.length < MIN_PASSWORD_LEN}
              onClick={() => setStep(2)}
            >
              Next · 下一步
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="onboarding-q">
              <span className="en">Choose your language</span>
              <span className="zh">选择语言</span>
            </h2>
            <div className="lang-options onboarding-lang">
              <button type="button" className={`lang-option ${lang === "en" ? "is-active" : ""}`} onClick={() => setLang("en")}>
                English
              </button>
              <button type="button" className={`lang-option ${lang === "zh" ? "is-active" : ""}`} onClick={() => setLang("zh")}>
                中文
              </button>
              <button type="button" className={`lang-option ${lang === "bi" ? "is-active" : ""}`} onClick={() => setLang("bi")}>
                English + 中文
              </button>
            </div>
            {authError && <p className="auth-error">{authError}</p>}
            <button type="button" className="btn btn-primary" disabled={busy} onClick={finish}>
              {busy
                ? t({ en: "Checking…", zh: "登录中…" })
                : `${t({ en: "Start Chapter 1", zh: "开始第1章" })} →`}
            </button>
          </>
        )}

        <div className="onboarding-dots">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`onboarding-dot ${step === i ? "is-active" : ""}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
