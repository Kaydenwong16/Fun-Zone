// Week/day scaffolding shared across curriculum, missions, roadmap and badges.
// Each week IS one day-lesson: a family sits down once a week and works
// through that week's whole lesson set + its one mission in a single
// sitting, so "day" and "week" are the same number (1–12) everywhere in
// the app — dayRangeForWeek/weekForDay just keep that mapping in one place
// so callers don't need to know it's 1:1.

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
  return { start: weekNumber, end: weekNumber };
}

export function weekForDay(day) {
  return Math.min(12, Math.max(1, day));
}

export function levelForWeek(weekNumber) {
  return LEVELS.find((l) => l.weeks.includes(weekNumber))?.number ?? 1;
}

export const TOTAL_DAYS = 12;
