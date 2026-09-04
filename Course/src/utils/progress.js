// ---------------------------------------------------------------------------
// XP, levels, streaks and badge-unlock logic.
// Pure functions over the progress object from utils/storage.js.
// ---------------------------------------------------------------------------

import { BADGES } from "../data/badges.js";

// Level N requires N*250 total XP (Level 1 = 0-249, Level 2 = 250-499, ...)
const XP_PER_LEVEL = 250;

export function levelForXP(xp) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function xpIntoLevel(xp) {
  return xp % XP_PER_LEVEL;
}

export function xpForNextLevel() {
  return XP_PER_LEVEL;
}

export function levelProgressPct(xp) {
  return Math.round((xpIntoLevel(xp) / xpForNextLevel()) * 100);
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(aISO, bISO) {
  const a = new Date(aISO + "T00:00:00");
  const b = new Date(bISO + "T00:00:00");
  return Math.round((b - a) / 86400000);
}

/** Call once per session (on app load) to keep the streak honest. */
export function touchStreak(progress) {
  const today = todayISO();
  if (!progress.lastActiveDate) {
    return { ...progress, streak: 1, lastActiveDate: today };
  }
  const gap = daysBetween(progress.lastActiveDate, today);
  if (gap === 0) return progress;
  if (gap === 1) return { ...progress, streak: progress.streak + 1, lastActiveDate: today };
  return { ...progress, streak: 1, lastActiveDate: today };
}

/** Add XP, returns { progress, leveledUp, from, to } */
export function addXP(progress, amount) {
  const from = levelForXP(progress.xp);
  const xp = progress.xp + amount;
  const to = levelForXP(xp);
  return { progress: { ...progress, xp }, leveledUp: to > from, from, to };
}

export function completeLesson(progress, lessonId, xp) {
  if (progress.completedLessons.includes(lessonId)) return { progress, leveledUp: false, xpAwarded: 0 };
  const withLesson = { ...progress, completedLessons: [...progress.completedLessons, lessonId] };
  const { progress: next, leveledUp } = addXP(withLesson, xp);
  return { progress: next, leveledUp, xpAwarded: xp };
}

export function recordQuiz(progress, lessonId, score, total, xp) {
  const quizResults = { ...progress.quizResults, [lessonId]: { score, total, at: new Date().toISOString() } };
  const withQuiz = { ...progress, quizResults };
  const { progress: next, leveledUp } = addXP(withQuiz, xp);
  return { progress: next, leveledUp, xpAwarded: xp };
}

export function completeMission(progress, day, xp) {
  if (progress.completedMissions.includes(day)) return { progress, leveledUp: false, xpAwarded: 0 };
  const withMission = { ...progress, completedMissions: [...progress.completedMissions, day] };
  const { progress: next, leveledUp } = addXP(withMission, xp);
  return { progress: next, leveledUp, xpAwarded: xp };
}

/** Re-evaluate all badge conditions against the current progress. Returns { progress, newlyUnlocked } */
export function evaluateBadges(progress) {
  const newlyUnlocked = [];
  let badges = [...progress.badges];
  for (const badge of BADGES) {
    if (badges.includes(badge.id)) continue;
    if (badge.condition(progress)) {
      badges.push(badge.id);
      newlyUnlocked.push(badge);
    }
  }
  if (newlyUnlocked.length === 0) return { progress, newlyUnlocked };
  return { progress: { ...progress, badges }, newlyUnlocked };
}

export function overallCompletionPct(progress, totalLessons) {
  if (!totalLessons) return 0;
  return Math.min(100, Math.round((progress.completedLessons.length / totalLessons) * 100));
}
