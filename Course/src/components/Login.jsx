import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { authAccount } from "../utils/account.js";
import { getProgress, saveSession, markDeviceKnown } from "../utils/storage.js";

const MIN_PASSWORD_LEN = 4;

// Shown instead of the full Onboarding wizard once this device has hosted
// a student before (see storage.isDeviceKnown) — e.g. right after a
// student logs out. Quick name+password login so another student can
// switch in without re-picking an avatar/language, with an escape hatch
// for a student who's genuinely new to this device.
export default function Login({ onFinish, onNewStudent }) {
  const { t, updateProfile } = useLanguage();
  const { loadProgress } = useProgress();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [busy, setBusy] = useState(false);

  const login = async () => {
    setAuthError("");
    const cleanName = name.trim();
    if (!cleanName || password.length < MIN_PASSWORD_LEN) {
      setAuthError(t({ en: "Enter your name and password.", zh: "请输入你的名字和密码。" }));
      return;
    }

    setBusy(true);
    const result = await authAccount({ name: cleanName, password, progress: getProgress() });
    setBusy(false);

    if (!result.ok) {
      setAuthError(
        result.error === "wrong-password"
          ? t({ en: "That password doesn't match this name. Try again.", zh: "密码与这个名字不匹配。请重试。" })
          : t({ en: "Couldn't reach the server. Try again in a moment.", zh: "无法连接服务器，请稍后再试。" })
      );
      return;
    }

    saveSession(cleanName, password);
    if (result.data.progress) loadProgress(result.data.progress);
    updateProfile({
      ...(result.data.profile || { name: cleanName }),
      onboarded: true,
    });
    markDeviceKnown();
    onFinish();
  };

  return (
    <div className="onboarding">
      <div className="onboarding-card card card-pad animate-in">
        <div className="onboarding-hero">👋</div>
        <h1 className="onboarding-title">
          <span className="en">Who's playing?</span>
          <span className="zh">是谁在玩？</span>
        </h1>
        <p className="onboarding-text">
          <span className="en">Log in with your name and password to see your own progress.</span>
          <br />
          <span className="zh">输入你的名字和密码，查看你自己的进度。</span>
        </p>
        <input
          className="name-input onboarding-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t({ en: "Your name", zh: "你的名字" })}
          autoFocus
        />
        <input
          className="name-input onboarding-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t({ en: "Password", zh: "密码" })}
          minLength={MIN_PASSWORD_LEN}
          onKeyDown={(e) => e.key === "Enter" && login()}
        />
        {authError && <p className="auth-error">{authError}</p>}
        <button type="button" className="btn btn-primary" disabled={busy} onClick={login}>
          {busy ? t({ en: "Checking…", zh: "登录中…" }) : t({ en: "Log In", zh: "登录" })}
        </button>
        <button type="button" className="btn btn-ghost" style={{ marginTop: 10 }} onClick={onNewStudent}>
          {t({ en: "New student? Create an account", zh: "新学生？创建账户" })}
        </button>
      </div>
    </div>
  );
}
