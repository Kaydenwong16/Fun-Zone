// Badge definitions (spec §6). Each condition receives the live `progress`
// object and returns true once the badge should unlock.

export const BADGES = [
  {
    id: "first-prompt",
    name: { en: "First Prompt", zh: "第一次提示词" },
    icon: "💬",
    description: { en: "You wrote your very first AI prompt.", zh: "你写下了第一个AI提示词。" },
    condition: (p) => p.completedLessons.includes("w1-l3"),
  },
  {
    id: "ai-explorer",
    name: { en: "AI Explorer", zh: "人工智能探索者" },
    icon: "🧭",
    description: { en: "You finished Week 1 and learned what AI really is.", zh: "你完成了第1周，了解了什么是AI。" },
    condition: (p) => ["w1-l1", "w1-l2", "w1-l3", "w1-l4"].every((id) => p.completedLessons.includes(id)),
  },
  {
    id: "prompt-master",
    name: { en: "Prompt Master", zh: "提示词高手" },
    icon: "🎯",
    description: { en: "You improved a prompt and got a better answer.", zh: "你改进了提示词，得到了更好的答案。" },
    condition: (p) => p.completedMissions.includes(1),
  },
  {
    id: "code-starter",
    name: { en: "Code Starter", zh: "编程小达人" },
    icon: "🧱",
    description: { en: "You wrote your first lines of HTML.", zh: "你写下了第一段HTML代码。" },
    condition: (p) => p.completedLessons.includes("w2-l2"),
  },
  {
    id: "web-builder",
    name: { en: "Web Builder", zh: "网页建造者" },
    icon: "🌐",
    description: { en: "You built your first interactive website.", zh: "你建造了第一个互动网站。" },
    condition: (p) => p.completedMissions.includes(2),
  },
  {
    id: "bug-hunter",
    name: { en: "Bug Hunter", zh: "Bug猎人" },
    icon: "🐛",
    description: { en: "You found and fixed a bug in your code.", zh: "你找到并修好了代码里的Bug。" },
    condition: (p) => p.completedLessons.includes("w11-l1"),
  },
  {
    id: "ai-vision-explorer",
    name: { en: "AI Explorer", zh: "AI探索家" },
    icon: "👁️",
    description: { en: "You learned how AI understands pictures.", zh: "你了解了AI是怎么看懂图片的。" },
    condition: (p) => p.completedLessons.includes("w8-l1"),
  },
  {
    id: "ai-builder",
    name: { en: "AI Builder", zh: "AI应用建造者" },
    icon: "🤖",
    description: { en: "You built your own AI-powered app.", zh: "你做出了自己的AI应用。" },
    condition: (p) => p.completedMissions.includes(10),
  },
  {
    id: "debug-master",
    name: { en: "Debug Master", zh: "调试大师" },
    icon: "🛠️",
    description: { en: "You debugged like a real builder — calmly and step by step.", zh: "你像真正的建造者一样冷静地一步步调试。" },
    condition: (p) => p.completedMissions.includes(11),
  },
  {
    id: "final-builder",
    name: { en: "Final Builder", zh: "终极建造者" },
    icon: "🏆",
    description: { en: "You completed the 12-week AI Builder program!", zh: "你完成了12周AI建造者计划！" },
    condition: (p) => p.completedMissions.includes(12),
  },
];

export function badgeById(id) {
  return BADGES.find((b) => b.id === id);
}
