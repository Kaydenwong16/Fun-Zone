import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { getProfile, saveProfile } from "../utils/storage.js";

const LanguageContext = createContext(null);

export const UI_STRINGS = {
  navHome: { en: "Home", zh: "首页" },
  navLearn: { en: "Learn", zh: "学习" },
  navMissions: { en: "Missions", zh: "任务" },
  navLab: { en: "Lab", zh: "实验室" },
  navRoadmap: { en: "Roadmap", zh: "学习路线" },
  navBadges: { en: "Badges", zh: "徽章" },
  navTeacher: { en: "AI Teacher", zh: "AI老师" },
  navParent: { en: "Parents", zh: "家长" },
  settings: { en: "Settings", zh: "设置" },
  language: { en: "Language", zh: "语言" },
  audio: { en: "Audio", zh: "音频" },
  resetProgress: { en: "Reset Progress", zh: "重置进度" },
};

export function LanguageProvider({ children }) {
  const [profile, setProfile] = useState(() => getProfile());

  const setLanguage = useCallback((language) => {
    setProfile((prev) => {
      const next = { ...prev, language };
      saveProfile(next);
      return next;
    });
  }, []);

  const updateProfile = useCallback((patch) => {
    setProfile((prev) => {
      const next = { ...prev, ...patch };
      saveProfile(next);
      return next;
    });
  }, []);

  /**
   * t(field, opts) — resolve a bilingual { en, zh } object to display text
   * for the current language mode. In 'bi' mode returns both, joined.
   */
  const t = useCallback(
    (field, opts = {}) => {
      if (!field) return "";
      const { joiner = " · " } = opts;
      const mode = profile.language;
      if (mode === "en") return field.en ?? field.zh ?? "";
      if (mode === "zh") return field.zh ?? field.en ?? "";
      // bilingual
      if (field.en && field.zh) return `${field.en}${joiner}${field.zh}`;
      return field.en ?? field.zh ?? "";
    },
    [profile.language]
  );

  const value = useMemo(
    () => ({ profile, language: profile.language, setLanguage, updateProfile, t }),
    [profile, setLanguage, updateProfile, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
