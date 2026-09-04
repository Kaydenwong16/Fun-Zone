import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { analyzePrompt, simulateAnswer } from "../utils/simulateAI.js";
import AudioButton from "./AudioButton.jsx";

const SCORE_LABEL = [
  { en: "Vague prompt", zh: "模糊的提示词" },
  { en: "Getting there", zh: "有点样子了" },
  { en: "Good prompt", zh: "不错的提示词" },
  { en: "Great prompt!", zh: "很棒的提示词！" },
];

/**
 * Type-a-prompt / see-a-simulated-answer widget (spec §11 "PROMPT" diagram,
 * §3 Lesson 3). Not a real model call — see utils/simulateAI.js.
 */
export default function PromptLab({ placeholder }) {
  const { t } = useLanguage();
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const run = () => {
    if (!value.trim()) return;
    setAnalysis(analyzePrompt(value));
    setAnswer(simulateAnswer(value));
  };

  return (
    <div className="prompt-lab card card-pad">
      <div className="prompt-lab-flow">
        <span className="pill pill-blue">{t({ en: "You", zh: "你" })}</span>
        <span aria-hidden="true">→</span>
        <span className="pill pill-purple">{t({ en: "Prompt", zh: "提示词" })}</span>
        <span aria-hidden="true">→</span>
        <span className="pill pill-teal">{t({ en: "AI", zh: "AI" })}</span>
        <span aria-hidden="true">→</span>
        <span className="pill pill-amber">{t({ en: "Answer", zh: "答案" })}</span>
      </div>
      <textarea
        className="prompt-input"
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder || t({ en: "Type a prompt, e.g. Tell me three facts about Mars for a 10-year-old.", zh: "输入一个提示词，比如：告诉我三个关于火星的事实，讲给10岁小朋友听。" })}
      />
      <div className="prompt-lab-actions">
        <button type="button" className="btn btn-primary btn-sm" onClick={run}>
          {t({ en: "Send to AI", zh: "发送给AI" })}
        </button>
        {value && <span className="prompt-count">{value.length}</span>}
      </div>

      {analysis && (
        <div className="prompt-analysis">
          <div className="quality-track">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`quality-dot ${i <= analysis.score ? "is-on" : ""}`} />
            ))}
          </div>
          <p className="quality-label">{t(SCORE_LABEL[analysis.score])}</p>
          {analysis.tips.length > 0 && (
            <ul className="quality-tips">
              {analysis.tips.map((tip, i) => (
                <li key={i}>{t(tip)}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {answer && (
        <div className="ai-answer animate-in">
          <div className="ai-answer-head">
            <span className="ai-avatar">🤖</span>
            <strong>{t({ en: "AI says:", zh: "AI说：" })}</strong>
            <AudioButton text={answer} size="sm" />
          </div>
          <p className="ai-answer-text">{t(answer, { joiner: "\n\n" })}</p>
        </div>
      )}
    </div>
  );
}
