import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getProgress, saveProgress, resetAll, getSession } from "../utils/storage.js";
import { syncAccount } from "../utils/account.js";
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
const SYNC_DEBOUNCE_MS = 1500;
const AUTO_SAVE_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => touchStreak(getProgress()));
  const [toast, setToast] = useState(null); // { xp, key }
  const [badgeUnlock, setBadgeUnlock] = useState(null); // badge object
  const toastKey = useRef(0);
  const syncTimer = useRef(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // persist on every change, and — if this device is linked to a cloud
  // account — quietly sync it to the server after a short pause so another
  // device can pick up the same progress later.
  useEffect(() => {
    saveProgress(progress);

    const session = getSession();
    if (!session) return;
    window.clearTimeout(syncTimer.current);
    syncTimer.current = window.setTimeout(() => {
      syncAccount({ name: session.name, password: session.password, progress });
    }, SYNC_DEBOUNCE_MS);
    return () => window.clearTimeout(syncTimer.current);
  }, [progress]);

  // Belt-and-suspenders auto-save: syncs to the cloud every 10 minutes
  // regardless of the debounced sync above, so a student's progress is
  // never more than 10 minutes stale on the server even during a long,
  // continuously-active session. A separate effect with an empty
  // dependency array so it runs on a fixed cadence, not restarted on
  // every progress change — it always reads the latest value via
  // progressRef rather than closing over a stale `progress`.
  useEffect(() => {
    const interval = window.setInterval(() => {
      const session = getSession();
      if (!session) return;
      syncAccount({ name: session.name, password: session.password, progress: progressRef.current });
    }, AUTO_SAVE_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, []);

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

  // Replaces local progress with what a cloud account had saved — used
  // right after a successful login so a returning kid resumes instead of
  // starting over.
  const loadProgress = useCallback((next) => {
    if (!next) return;
    const withDefaults = touchStreak({ ...getProgress(), ...next });
    setProgress(withDefaults);
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
      loadProgress,
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
      loadProgress,
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
