import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { LESSONS_BY_WEEK, isLessonUnlocked, lessonById } from "../data/curriculum.js";
import { WEEKS } from "../data/weeks.js";
import LessonView from "../components/LessonView.jsx";

export default function Learn({ openLessonId, onOpenLesson, onCloseLesson }) {
  const { t } = useLanguage();
  const { progress } = useProgress();
  const [expandedWeek, setExpandedWeek] = useState(
    () => WEEKS.find((w) => LESSONS_BY_WEEK[w.number].some((l) => !progress.completedLessons.includes(l.id)))?.number || 1
  );

  if (openLessonId) {
    const lesson = lessonById(openLessonId);
    if (lesson) {
      return (
        <div className="page">
          <LessonView
            key={lesson.id}
            lesson={lesson}
            onBack={onCloseLesson}
            onDone={() => {
              const list = LESSONS_BY_WEEK[lesson.week];
              const idx = list.findIndex((l) => l.id === lesson.id);
              const next = list[idx + 1];
              if (next) onOpenLesson(next.id);
              else onCloseLesson();
            }}
          />
        </div>
      );
    }
  }

  return (
    <div className="page learn-page animate-in">
      <h1 className="page-title">
        <span className="en">Learn</span> <span className="zh">学习</span>
      </h1>
      <div className="week-accordion">
        {WEEKS.map((week) => {
          const lessons = LESSONS_BY_WEEK[week.number];
          const doneCount = lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
          const isOpen = expandedWeek === week.number;
          return (
            <div key={week.number} className={`week-block card ${isOpen ? "is-open" : ""}`}>
              <button type="button" className="week-block-head" onClick={() => setExpandedWeek(isOpen ? null : week.number)}>
                <span className="week-block-num">{t({ en: `Week ${week.number}`, zh: `第${week.number}周` })}</span>
                <span className="week-block-title">{t(week.title)}</span>
                <span className="week-block-progress">
                  {doneCount}/{lessons.length}
                </span>
                <span className="week-block-chevron">{isOpen ? "▾" : "▸"}</span>
              </button>
              {isOpen && (
                <div className="week-block-body">
                  {lessons.map((lesson) => {
                    const done = progress.completedLessons.includes(lesson.id);
                    const unlocked = isLessonUnlocked(lesson.id, progress.completedLessons);
                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        className={`lesson-row ${done ? "is-done" : ""} ${!unlocked ? "is-locked" : ""}`}
                        onClick={() => unlocked && onOpenLesson(lesson.id)}
                        disabled={!unlocked}
                      >
                        <span className="lesson-row-status">{done ? "✓" : unlocked ? "▶" : "🔒"}</span>
                        <span className="lesson-row-title">{t(lesson.title)}</span>
                        <span className="lesson-row-xp">+{lesson.xp} XP</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
