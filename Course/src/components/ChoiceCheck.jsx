import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

/**
 * Predict-then-reveal interaction: one question, a few option cards, instant
 * feedback with an explanation (spec §5 "INTERACTION" — predict/choose).
 * Used mid-lesson, separate from the end-of-lesson Quiz component.
 */
export default function ChoiceCheck({ prompt, options, correctIndex, explain, onCorrect }) {
  const { t } = useLanguage();
  const [picked, setPicked] = useState(null);

  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === correctIndex) onCorrect?.();
  };

  return (
    <div className="choice-check card card-pad">
      <p className="choice-prompt">{t(prompt)}</p>
      <div className="choice-grid">
        {options.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = i === correctIndex;
          let state = "";
          if (picked !== null) {
            if (isCorrect) state = "is-correct";
            else if (isPicked) state = "is-wrong";
          }
          return (
            <button key={i} type="button" className={`choice-card ${state}`} onClick={() => pick(i)} disabled={picked !== null}>
              {t(opt)}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className={`choice-feedback ${picked === correctIndex ? "is-correct" : "is-wrong"} animate-in`}>
          <strong>{picked === correctIndex ? t({ en: "Correct! ✓", zh: "答对了！✓" }) : t({ en: "Not quite.", zh: "不太对哦。" })}</strong>
          <p>{t(explain)}</p>
        </div>
      )}
    </div>
  );
}
