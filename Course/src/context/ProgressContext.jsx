import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getProgress, saveProgress, resetAll } from "../utils/storage.js";
import {
  addXP,
  completeLesson as completeLessonFn,
  completeMission as completeMissionFn,
  recordQuiz as recordQuizFn,
  evaluateBadges,
  touchStreak,
  levelForXP,
} from "../utils/progress.js";
import { BADGES } from "../data/badges.js";

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => touchStreak(getProgress()));
  const [toast, setToast] = useState(null); // { xp, key }
  const [badgeUnlock, setBadgeUnlock] = useState(null); // badge object
  const toastKey = useRef(0);

  // persist on every change
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const showXP = useCallback((amount) => {
    if (!amount) return;
    toastKey.current += 1;
    setToast({ xp: amount, key: toastKey.current });
    window.setTimeout(() => setToast((t) => (t?.key === toastKey.current ? null : t)), 1700);
  }, []);

  const applyBadges = useCallback((next) => {
    const { progress: withBadges, newlyUnlocked } = evaluateBadges(next);
    if (newlyUnlocked.length) {
      setBadgeUnlock(newlyUnlocked[0]);
    }
    return withBadges;
  }, []);

  const completeLesson = useCallback(
    (lessonId, xp) => {
      setProgress((prev) => {
        const { progress: next, xpAwarded } = completeLessonFn(prev, lessonId, xp);
        showXP(xpAwarded);
        return applyBadges(next);
      });
    },
    [applyBadges, showXP]
  );

  const recordQuiz = useCallback(
    (lessonId, score, total, xp) => {
      setProgress((prev) => {
        const { progress: next, xpAwarded } = recordQuizFn(prev, lessonId, score, total, xp);
        showXP(xpAwarded);
        return applyBadges(next);
      });
    },
    [applyBadges, showXP]
  );

  const completeMission = useCallback(
    (day, xp) => {
      setProgress((prev) => {
        const { progress: next, xpAwarded } = completeMissionFn(prev, day, xp);
        showXP(xpAwarded);
        return applyBadges(next);
      });
    },
    [applyBadges, showXP]
  );

  const grantXP = useCallback(
    (amount) => {
      setProgress((prev) => {
        const { progress: next } = addXP(prev, amount);
        showXP(amount);
        return applyBadges(next);
      });
    },
    [applyBadges, showXP]
  );

  const setCurrentLesson = useCallback((lessonId) => {
    setProgress((prev) => ({ ...prev, currentLessonId: lessonId }));
  }, []);

  const advanceDay = useCallback((day) => {
    setProgress((prev) => ({ ...prev, currentDay: Math.max(prev.currentDay, day) }));
  }, []);

  const reset = useCallback(() => {
    resetAll();
    setProgress(getProgress());
  }, []);

  const dismissBadge = useCallback(() => setBadgeUnlock(null), []);

  const level = levelForXP(progress.xp);
  const earnedBadges = useMemo(() => BADGES.filter((b) => progress.badges.includes(b.id)), [progress.badges]);

  const value = useMemo(
    () => ({
      progress,
      level,
      toast,
      badgeUnlock,
      earnedBadges,
      completeLesson,
      recordQuiz,
      completeMission,
      grantXP,
      setCurrentLesson,
      advanceDay,
      reset,
      dismissBadge,
    }),
    [
      progress,
      level,
      toast,
      badgeUnlock,
      earnedBadges,
      completeLesson,
      recordQuiz,
      completeMission,
      grantXP,
      setCurrentLesson,
      advanceDay,
      reset,
      dismissBadge,
    ]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
