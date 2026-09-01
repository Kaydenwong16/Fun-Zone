import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

const AVATARS = ["🤖", "🦊", "🐼", "🦄", "🐯", "🐸", "🐙", "🦁"];

export default function Onboarding({ onFinish }) {
  const { t, setLanguage, updateProfile } = useLanguage();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [lang, setLang] = useState("bi");

  const finish = () => {
    setLanguage(lang);
    updateProfile({ name: name.trim() || "Builder", avatar, language: lang, onboarded: true });
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
              You're about to spend 90 days learning how to use AI and build things with it.
              <br />
              <span className="zh">接下来的90天，你将学习如何使用AI，并用AI创造真正的作品。</span>
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
            <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>
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
            <button type="button" className="btn btn-primary" onClick={finish}>
              {t({ en: "Start Day 1", zh: "开始第1天" })} →
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
