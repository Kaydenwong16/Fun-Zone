import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { askTeacher } from "../utils/simulateAI.js";
import { listenOnce, recognitionSupported } from "../utils/speech.js";
import AudioButton from "../components/AudioButton.jsx";

const GREETING = {
  en: "Hi! I'm your AI Teacher. I'm friendly, patient, and I love good questions. Ask me about prompts, HTML, CSS, JavaScript, debugging, APIs, agents — anything you're building!",
  zh: "你好！我是你的AI老师。我很友善、有耐心，也很喜欢有意思的问题。可以问我提示词、HTML、CSS、JavaScript、调试、API、智能体——任何你正在做的东西！",
};

export default function AITeacher() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([{ from: "ai", text: GREETING }]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text) => {
    const value = (text ?? input).trim();
    if (!value) return;
    const reply = askTeacher(value);
    setMessages((prev) => [...prev, { from: "child", text: value, raw: true }, { from: "ai", text: reply }]);
    setInput("");
  };

  const talk = () => {
    if (!recognitionSupported()) {
      setVoiceError("not-supported");
      return;
    }
    setVoiceError(null);
    setListening(true);
    listenOnce({
      lang: "en-US",
      onResult: (transcript) => {
        setListening(false);
        send(transcript);
      },
      onError: (err) => {
        setListening(false);
        setVoiceError(err);
      },
      onEnd: () => setListening(false),
    });
  };

  return (
    <div className="page teacher-page animate-in">
      <h1 className="page-title">
        <span className="en">AI Teacher</span> <span className="zh">AI老师</span>
      </h1>
      <p className="page-subtitle">
        {t({ en: "A rule-based practice teacher — friendly and local, no internet AI needed for Version 1.", zh: "一个基于规则的练习老师——友善、本地运行，第一版无需联网AI。" })}
      </p>

      <div className="teacher-chat card">
        <div className="teacher-messages">
          {messages.map((m, i) => (
            <div key={i} className={`teacher-msg ${m.from === "ai" ? "is-ai" : "is-child"}`}>
              {m.from === "ai" && <span className="teacher-avatar">🤖</span>}
              <div className="teacher-bubble">
                <p>{m.raw ? m.text : t(m.text)}</p>
                {m.from === "ai" && <AudioButton text={m.text} size="sm" label="" />}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="teacher-input-row">
          <input
            className="teacher-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={t({ en: "Ask about prompts, code, debugging...", zh: "问问提示词、代码、调试……" })}
          />
          <button type="button" className="btn btn-secondary btn-sm" onClick={talk} disabled={listening}>
            🎤 {listening ? t({ en: "Listening...", zh: "正在听……" }) : t({ en: "Talk to Teacher", zh: "和老师说话" })}
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => send()}>
            {t({ en: "Send", zh: "发送" })}
          </button>
        </div>
        {voiceError === "not-supported" && (
          <p className="settings-note">
            {t({ en: "Voice input isn't supported in this browser. Try Chrome or Safari with microphone permission.", zh: "此浏览器不支持语音输入。请尝试使用已获得麦克风权限的Chrome或Safari。" })}
          </p>
        )}
      </div>
    </div>
  );
}
