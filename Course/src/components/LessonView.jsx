import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { DIAGRAMS } from "../data/diagrams.js";
import { findVocab } from "../data/vocabulary.js";
import FlowDiagram from "./diagrams/FlowDiagram.jsx";
import BilingualLabel from "./BilingualLabel.jsx";
import AudioControls from "./AudioControls.jsx";
import ChoiceCheck from "./ChoiceCheck.jsx";
import PromptLab from "./PromptLab.jsx";
import PickOne from "./PickOne.jsx";
import CodePlayground from "./CodePlayground.jsx";
import Quiz from "./Quiz.jsx";

function Interaction({ interaction }) {
  const { t } = useLanguage();
  if (!interaction) return null;

  if (interaction.type === "flow") {
    const stages = interaction.customStages || DIAGRAMS[interaction.visual]?.stages || [];
    return <FlowDiagram stages={stages} compact />;
  }
  if (interaction.type === "choice") {
    return (
      <ChoiceCheck
        prompt={interaction.prompt}
        options={interaction.options}
        correctIndex={interaction.correctIndex}
        explain={interaction.explain}
      />
    );
  }
  if (interaction.type === "promptlab") {
    return <PromptLab />;
  }
  if (interaction.type === "pickone") {
    return <PickOne prompt={interaction.prompt} options={interaction.options} projectId={interaction.projectId} />;
  }
  if (interaction.type === "code") {
    return (
      <div>
        {interaction.instructions && <p className="code-instructions">{t(interaction.instructions)}</p>}
        <CodePlayground
          initialHtml={interaction.initialHtml}
          initialCss={interaction.initialCss}
          initialJs={interaction.initialJs}
          variant={interaction.variant || "inline"}
        />
      </div>
    );
  }
  if (interaction.type === "code-predict") {
    return (
      <div>
        <pre className="code-block">
          <code>{interaction.code}</code>
        </pre>
        <ChoiceCheck
          prompt={interaction.question}
          options={interaction.options}
          correctIndex={interaction.correctIndex}
          explain={interaction.explain}
        />
      </div>
    );
  }
  return null;
}

export default function LessonView({ lesson, onDone, onBack }) {
  const { t } = useLanguage();
  const { progress, completeLesson, recordQuiz } = useProgress();
  const [quizDone, setQuizDone] = useState(false);
  const alreadyDone = progress.completedLessons.includes(lesson.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [lesson.id]);

  const stages = useMemo(() => DIAGRAMS[lesson.visual]?.stages || [], [lesson.visual]);
  const vocab = useMemo(() => lesson.vocabulary?.map(findVocab).filter(Boolean) || [], [lesson.vocabulary]);

  const finishQuiz = (score, total) => {
    setQuizDone(true);
    if (!alreadyDone) {
      recordQuiz(lesson.id, score, total, 20);
    }
  };

  const complete = () => {
    if (!alreadyDone) completeLesson(lesson.id, lesson.xp);
    onDone?.(lesson);
  };

  return (
    <div className="lesson-view animate-in">
      <button type="button" className="btn btn-ghost btn-sm lesson-back" onClick={onBack}>
        ← {t({ en: "Back to Learn", zh: "返回学习页" })}
      </button>

      <div className="lesson-head">
        <span className="pill pill-blue">
          {t({ en: `Week ${lesson.week}`, zh: `第${lesson.week}周` })}
        </span>
        <h1 className="lesson-title">
          <BilingualLabel field={lesson.title} size="lg" />
        </h1>
        <p className="lesson-hook">{t(lesson.hook)}</p>
      </div>

      {vocab.length > 0 && (
        <div className="vocab-row">
          {vocab.map((v) => (
            <span className="vocab-chip" key={v.en} title={v.example ? t(v.example) : undefined}>
              <strong>{v.en}</strong> — {v.zh}
            </span>
          ))}
        </div>
      )}

      <div className="lesson-grid">
        <div className="lesson-visual">
          <FlowDiagram stages={stages} title={DIAGRAMS[lesson.visual]?.title} />
        </div>
        <div className="lesson-explain card card-pad">
          <AudioControls text={lesson.explanation} />
          <p className="lesson-explanation-text">{t(lesson.explanation)}</p>
        </div>
      </div>

      <section className="lesson-section">
        <h2 className="lesson-section-title">🧪 {t({ en: "Try It", zh: "动手试试" })}</h2>
        <Interaction interaction={lesson.interaction} />
      </section>

      <section className="lesson-section">
        <h2 className="lesson-section-title">📝 {t({ en: "Quiz", zh: "小测验" })}</h2>
        <Quiz questions={lesson.quiz} onComplete={finishQuiz} />
      </section>

      <section className="lesson-section">
        <h2 className="lesson-section-title">🚀 {t({ en: "Your Challenge", zh: "你的挑战" })}</h2>
        <div className="card card-pad challenge-card">
          <p>{t(lesson.challenge)}</p>
        </div>
      </section>

      <div className="lesson-complete-bar">
        {alreadyDone ? (
          <p className="lesson-done-note">✓ {t({ en: "Lesson completed", zh: "课程已完成" })}</p>
        ) : (
          <p className="lesson-done-note">{t({ en: "Finish the quiz, then complete the lesson.", zh: "完成小测验后，即可完成本课。" })}</p>
        )}
        <button type="button" className="btn btn-primary" onClick={complete} disabled={!quizDone && !alreadyDone}>
          {alreadyDone ? t({ en: "Continue", zh: "继续" }) : t({ en: "Complete Lesson", zh: "完成课程" })} · +{lesson.xp} XP
        </button>
      </div>
    </div>
  );
}
