import { WEEK1_LESSONS } from "./lessons/week1.js";
import { WEEK2_LESSONS } from "./lessons/week2.js";
import { WEEK3_LESSONS } from "./lessons/week3.js";
import { WEEK4_LESSONS } from "./lessons/week4.js";
import { WEEK5_LESSONS } from "./lessons/week5.js";
import { WEEK6_LESSONS } from "./lessons/week6.js";
import { WEEK7_LESSONS } from "./lessons/week7.js";
import { WEEK8_LESSONS } from "./lessons/week8.js";
import { WEEK9_LESSONS } from "./lessons/week9.js";
import { WEEK10_LESSONS } from "./lessons/week10.js";
import { WEEK11_LESSONS } from "./lessons/week11.js";
import { WEEK12_LESSONS } from "./lessons/week12.js";
import { WEEKS, dayRangeForWeek } from "./weeks.js";

export const LESSONS_BY_WEEK = {
  1: WEEK1_LESSONS,
  2: WEEK2_LESSONS,
  3: WEEK3_LESSONS,
  4: WEEK4_LESSONS,
  5: WEEK5_LESSONS,
  6: WEEK6_LESSONS,
  7: WEEK7_LESSONS,
  8: WEEK8_LESSONS,
  9: WEEK9_LESSONS,
  10: WEEK10_LESSONS,
  11: WEEK11_LESSONS,
  12: WEEK12_LESSONS,
};

export const ALL_LESSONS = WEEKS.flatMap((w) => LESSONS_BY_WEEK[w.number]);

export const TOTAL_LESSONS = ALL_LESSONS.length;

export function lessonById(id) {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function lessonsForWeek(weekNumber) {
  return LESSONS_BY_WEEK[weekNumber] || [];
}

export function weekMeta(weekNumber) {
  return WEEKS.find((w) => w.number === weekNumber);
}

/** Is this lesson unlocked given completed lesson ids? Sequential unlock. */
export function isLessonUnlocked(lessonId, completedLessons) {
  const idx = ALL_LESSONS.findIndex((l) => l.id === lessonId);
  if (idx <= 0) return true;
  const prev = ALL_LESSONS[idx - 1];
  return completedLessons.includes(prev.id);
}

export function nextIncompleteLesson(completedLessons) {
  return ALL_LESSONS.find((l) => !completedLessons.includes(l.id)) || ALL_LESSONS[ALL_LESSONS.length - 1];
}

export function weekProject(weekNumber) {
  const range = dayRangeForWeek(weekNumber);
  return { endDay: range.end };
}
