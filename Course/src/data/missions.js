// ---------------------------------------------------------------------------
// Mission system. Each week is one day-lesson (see data/weeks.js), so there's
// exactly one mission per week/day — the week's biggest hands-on mission or
// project, the thing that mattered most from what used to be several smaller
// daily missions across that week.
// ---------------------------------------------------------------------------

// Every mission below is its week's single, substantial project/mission —
// there's no smaller sibling mission to distinguish it from anymore, so
// each one gets the "big mission" card treatment (see isWeekFinal below).
const RAW_MISSIONS = [
  {
    day: 1,
    week: 1,
    title: { en: "Week 1 Mission — Better Prompts", zh: "第1周任务——更好的提示词" },
    description: {
      en: "Ask AI a question, read the answer, find one fact, verify it, then improve your prompt and compare the two answers.",
      zh: "向AI提一个问题，读一读答案，找出其中一个事实，核实它，然后改进你的提示词，比较两次的答案。",
    },
    xp: 100,
  },
  {
    day: 2,
    week: 2,
    title: { en: "Week 2 Project — My First Interactive Website", zh: "第2周项目——我的第一个互动网站" },
    description: {
      en: "Build a website with a title, an image, a description, and an interactive button.",
      zh: "做一个有标题、图片、描述和互动按钮的网站。",
    },
    xp: 250,
  },
  {
    day: 3,
    week: 3,
    title: { en: "Week 3 Mission — Guessing Game Logic", zh: "第3周任务——猜数字游戏逻辑" },
    description: {
      en: "Build the logic for an interactive guessing game using variables, functions and conditions.",
      zh: "用变量、函数和条件，搭建一个互动猜数字游戏的逻辑。",
    },
    xp: 150,
  },
  {
    day: 4,
    week: 4,
    title: { en: "Week 4 Project — My First Web Game", zh: "第4周项目——我的第一个网页游戏" },
    description: {
      en: "Finish your web game: Number Guessing, Rock Paper Scissors, Reaction, or a Quiz Game.",
      zh: "完成你的网页游戏：猜数字、石头剪刀布、反应游戏，或问答游戏。",
    },
    xp: 250,
  },
  {
    day: 5,
    week: 5,
    title: { en: "Week 5 Mission — Python Logic", zh: "第5周任务——Python逻辑" },
    description: {
      en: "Explain, in plain words, a Python program using a variable, an if, and a loop.",
      zh: "用简单的话解释一个用到变量、if和循环的Python程序。",
    },
    xp: 150,
  },
  {
    day: 6,
    week: 6,
    title: { en: "Week 6 Mission — Explain an API", zh: "第6周任务——解释API" },
    description: {
      en: "Explain the restaurant/API analogy to someone, using your own example.",
      zh: "用你自己举的例子，向别人解释餐厅/API的比喻。",
    },
    xp: 150,
  },
  {
    day: 7,
    week: 7,
    title: { en: "Week 7 Project — My First AI Chatbot", zh: "第7周项目——我的第一个AI聊天机器人" },
    description: {
      en: "Design and test your chatbot's personality using the AI Teacher.",
      zh: "用AI老师设计并测试你聊天机器人的性格。",
    },
    xp: 250,
  },
  {
    day: 8,
    week: 8,
    title: { en: "Week 8 Mission — Vision & Multimodal", zh: "第8周任务——视觉与多模态" },
    description: {
      en: "Explain computer vision and multimodal AI to someone using your own examples.",
      zh: "用你自己的例子，向别人解释计算机视觉和多模态AI。",
    },
    xp: 150,
  },
  {
    day: 9,
    week: 9,
    title: { en: "Week 9 Mission — Design an Agent", zh: "第9周任务——设计一个智能体" },
    description: {
      en: "Design an AI agent's goal, plan, and tools for a task you choose.",
      zh: "为你选择的一个任务，设计AI智能体的目标、计划和工具。",
    },
    xp: 150,
  },
  {
    day: 10,
    week: 10,
    title: { en: "Week 10 Project — My AI App", zh: "第10周项目——我的AI应用" },
    description: {
      en: "Finish and test the first version of your chosen AI app.",
      zh: "完成并测试你选择的AI应用的第一个版本。",
    },
    xp: 250,
  },
  {
    day: 11,
    week: 11,
    title: { en: "Week 11 Mission — Debug & Stay Safe", zh: "第11周任务——调试与安全" },
    description: {
      en: "Debug a real problem in your project and write down 3 AI safety rules.",
      zh: "在你的项目里调试一个真正的问题，并写下3条AI安全规则。",
    },
    xp: 150,
  },
  {
    day: 12,
    week: 12,
    title: { en: "🏆 Week 12 — Final Project & Demo Day", zh: "🏆 第12周——毕业作品与演示日" },
    description: {
      en: "Build your final project from start to finish: pick an idea, ask AI for help planning it, build it, test it, fix one bug, then demo it and explain what it does, how it works, why you built it, and what AI helped with.",
      zh: "从头到尾完成你的毕业作品：选一个想法，请AI帮你规划，动手搭建，测试它，修好一个bug，然后演示它，并解释它是什么、怎么运作、为什么做它，以及AI帮了什么忙。",
    },
    xp: 300,
  },
];

const MISSIONS = RAW_MISSIONS.map((m) => ({ ...m, isWeekFinal: true }));

export function missionForDay(day) {
  return MISSIONS.find((m) => m.day === day);
}

export function missionsForWeek(weekNumber) {
  return MISSIONS.filter((m) => m.week === weekNumber);
}

export { MISSIONS };
export const TOTAL_MISSIONS = MISSIONS.length;
