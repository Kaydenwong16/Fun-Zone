// ---------------------------------------------------------------------------
// localStorage persistence layer.
// All app state lives behind this module so a real backend/DB can replace it
// later without touching the components that call it.
// ---------------------------------------------------------------------------

const KEYS = {
  profile: "abk_profile_v1",
  progress: "abk_progress_v1",
  projects: "abk_projects_v1",
  session: "abk_session_v1",
};

function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

// ---- profile ---------------------------------------------------------

export const DEFAULT_PROFILE = {
  onboarded: false,
  name: "",
  avatar: "🤖",
  language: "bi", // 'en' | 'zh' | 'bi'
};

export function getProfile() {
  return readJSON(KEYS.profile, DEFAULT_PROFILE);
}

export function saveProfile(profile) {
  return writeJSON(KEYS.profile, profile);
}

// ---- progress ---------------------------------------------------------

export const DEFAULT_PROGRESS = {
  xp: 0,
  streak: 0,
  lastActiveDate: null, // ISO date string, for streak calc
  completedLessons: [], // lesson ids
  completedMissions: [], // day numbers (1-90)
  quizResults: {}, // { [lessonId]: { score, total, at } }
  badges: [], // badge ids
  currentDay: 1,
  currentLessonId: null,
};

export function getProgress() {
  return readJSON(KEYS.progress, DEFAULT_PROGRESS);
}

export function saveProgress(progress) {
  return writeJSON(KEYS.progress, progress);
}

export function resetAll() {
  try {
    window.localStorage.removeItem(KEYS.profile);
    window.localStorage.removeItem(KEYS.progress);
    window.localStorage.removeItem(KEYS.projects);
    window.localStorage.removeItem(KEYS.session);
    return true;
  } catch {
    return false;
  }
}

// ---- cloud account session --------------------------------------------
// Remembers the name + password used to log in, so this device can quietly
// sync progress to the server without asking again. Kept separate from
// `profile` so it's never accidentally rendered anywhere. This is a kids'
// app with no sensitive data behind it — plaintext is an acceptable
// trade-off for "don't make a kid retype a password every visit".

export function getSession() {
  return readJSON(KEYS.session, null);
}

export function saveSession(name, password) {
  return writeJSON(KEYS.session, { name, password });
}

export function clearSession() {
  try {
    window.localStorage.removeItem(KEYS.session);
    return true;
  } catch {
    return false;
  }
}

// ---- project states (Coding Lab / Week projects) ----------------------

export function getProjects() {
  return readJSON(KEYS.projects, {});
}

export function saveProject(projectId, state) {
  const all = getProjects();
  all[projectId] = { ...state, updatedAt: new Date().toISOString() };
  writeJSON(KEYS.projects, all);
  return all;
}
