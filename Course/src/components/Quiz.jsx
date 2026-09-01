import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

/**
 * End-of-lesson quiz (spec §5 QUIZ / §42 quality bar: "correct/incorrect
 * answers work"). 2–5 questions, immediate feedback with explanation,
 * reports the final score via onComplete(score, total).
 */
export default function Quiz({ questions, onComplete }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[index];
  const isLast = index === questions.length - 1;

  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (isLast) {
      setDone(true);
      onComplete?.(score, questions.length);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz card card-pad quiz-done animate-in">
        <div className="quiz-score-ring" style={{ "--pct": `${pct}%` }}>
          <span>{score}/{questions.length}</span>
        </div>
        <p className="quiz-done-text">
          {pct >= 80
            ? t({ en: "Great work! You really understand this.", zh: "太棒了！你真的理解了这些内容。" })
            : t({ en: "Nice try! Re-read the lesson if any of this felt tricky.", zh: "不错的尝试！如果有些内容觉得难，可以再读一遍课程内容。" })}
        </p>
      </div>
    );
  }

  return (
    <div className="quiz card card-pad">
      <div className="quiz-meta">
        <span>{t({ en: "Question", zh: "问题" })} {index + 1} / {questions.length}</span>
      </div>
      <p className="quiz-question">{t(q.question)}</p>
      <div className="quiz-options">
        {q.options.map((opt, i) => {
          let state = "";
          if (picked !== null) {
            if (i === q.correctIndex) state = "is-correct";
            else if (i === picked) state = "is-wrong";
          }
          return (
            <button key={i} type="button" className={`quiz-option ${state}`} disabled={picked !== null} onClick={() => pick(i)}>
              {t(opt)}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className={`quiz-feedback ${picked === q.correctIndex ? "is-correct" : "is-wrong"} animate-in`}>
          <strong>{picked === q.correctIndex ? t({ en: "Correct! ✓", zh: "答对了！✓" }) : t({ en: "Not quite — here's why:", zh: "不太对——原因是：" })}</strong>
          <p>{t(q.explain)}</p>
          <button type="button" className="btn btn-primary btn-sm" onClick={next}>
            {isLast ? t({ en: "See Results", zh: "查看结果" }) : t({ en: "Next Question", zh: "下一题" })}
          </button>
        </div>
      )}
    </div>
  );
}
