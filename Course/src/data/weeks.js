// Week/day scaffolding shared across curriculum, missions, roadmap and badges.
// Weeks 1–11 run 7 days each (days 1–77). Week 12 — the Final Project — runs
// longer (days 78–90) to give room for its 9-step build/test/explain process.

export const WEEKS = [
  { number: 1, level: 1, title: { en: "What Is AI?", zh: "什么是人工智能？" } },
  { number: 2, level: 1, title: { en: "AI as Your Coding Partner", zh: "AI是你的编程伙伴" } },
  { number: 3, level: 1, title: { en: "JavaScript", zh: "JavaScript编程" } },
  { number: 4, level: 1, title: { en: "Build a Game", zh: "制作一个游戏" } },
  { number: 5, level: 2, title: { en: "Python", zh: "Python编程" } },
  { number: 6, level: 2, title: { en: "Data + APIs", zh: "数据与接口" } },
  { number: 7, level: 2, title: { en: "Build a Chatbot", zh: "制作一个聊天机器人" } },
  { number: 8, level: 2, title: { en: "AI Can See", zh: "AI能看懂图片" } },
  { number: 9, level: 3, title: { en: "AI Agents", zh: "AI智能体" } },
  { number: 10, level: 3, title: { en: "Build an AI App", zh: "制作一个AI应用" } },
  { number: 11, level: 3, title: { en: "Debugging + AI Safety", zh: "调试与AI安全" } },
  { number: 12, level: 3, title: { en: "Final Project", zh: "毕业作品" } },
];

export const LEVELS = [
  { number: 1, name: { en: "AI Explorer", zh: "AI探索家" }, weeks: [1, 2, 3, 4] },
  { number: 2, name: { en: "Code Builder", zh: "编程小建造者" }, weeks: [5, 6, 7, 8] },
  { number: 3, name: { en: "AI Builder", zh: "AI建造者" }, weeks: [9, 10, 11, 12] },
];

export function dayRangeForWeek(weekNumber) {
  if (weekNumber === 12) return { start: 78, end: 90 };
  const start = (weekNumber - 1) * 7 + 1;
  return { start, end: start + 6 };
}

export function weekForDay(day) {
  if (day >= 78) return 12;
  return Math.min(11, Math.ceil(day / 7));
}

export function levelForWeek(weekNumber) {
  return LEVELS.find((l) => l.weeks.includes(weekNumber))?.number ?? 1;
}

export const TOTAL_DAYS = 90;
