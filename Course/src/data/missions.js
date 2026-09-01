// ---------------------------------------------------------------------------
// Daily Mission System (spec §19). Days 1–5 are the exact missions from the
// spec. Every week then has a handful of themed daily missions plus one
// bigger end-of-week Mission or Project (spec §6: mission +100 XP, weekly
// project +250 XP). Week 12 (days 78–90) follows the Final Project's 9-step
// process instead of a themed pool.
// ---------------------------------------------------------------------------

const FIXED_DAYS = {
  1: {
    title: { en: "AI All Around You", zh: "身边的AI" },
    description: { en: "Find three examples of AI you used today.", zh: "找出今天你用到的三个AI例子。" },
    xp: 100,
  },
  2: {
    title: { en: "Improve a Prompt", zh: "改进一个提示词" },
    description: { en: "Ask AI a question, then improve your prompt and compare the two answers.", zh: "向AI提一个问题，然后改进你的提示词，比较两次的答案。" },
    xp: 100,
  },
  3: {
    title: { en: "Fact Check", zh: "事实核查" },
    description: { en: "Find one AI answer that might be wrong, and explain how you'd check it.", zh: "找出一个可能是错的AI答案，说说你会怎么核实它。" },
    xp: 100,
  },
  4: {
    title: { en: "AI-Generated Story", zh: "AI生成的故事" },
    description: { en: "Use the Prompt Lab to create an AI-generated story about a topic you love.", zh: "用提示词实验室，创作一个关于你喜欢的主题的AI故事。" },
    xp: 100,
  },
  5: {
    title: { en: "Your First Web Page", zh: "你的第一个网页" },
    description: { en: "Build your first HTML page in the Coding Lab.", zh: "在编程实验室里做出你的第一个HTML网页。" },
    xp: 100,
  },
};

const WEEK_POOLS = {
  1: [{ title: { en: "One More Example", zh: "再找一个例子" }, description: { en: "Find one more everyday AI example and explain how it might find patterns.", zh: "再找一个日常生活中的AI例子，说说它可能是怎么发现规律的。" } }],
  2: [
    { title: { en: "Try a Heading", zh: "试试标题标签" }, description: { en: "Add a new heading to your web page and change its text.", zh: "给你的网页加一个新标题，改改它的文字。" } },
    { title: { en: "Add an Image", zh: "加一张图片" }, description: { en: "Add an <img> and a <p> paragraph to your page.", zh: "给网页加一个 <img> 和一段 <p>。" } },
    { title: { en: "Three Color Changes", zh: "三处颜色改动" }, description: { en: "Use CSS to change 3 colors on your page.", zh: "用CSS改变网页上的3处颜色。" } },
    { title: { en: "Bigger and Bolder", zh: "更大更粗" }, description: { en: "Make a heading bigger and a button bolder with CSS.", zh: "用CSS把标题变大，把按钮加粗。" } },
    { title: { en: "Ask AI for One Change", zh: "请AI改一处" }, description: { en: "Ask AI to change one specific thing about your page's style.", zh: "请AI改动你网页样式中的一个具体地方。" } },
    { title: { en: "Add a Button", zh: "加一个按钮" }, description: { en: "Add a button to your page and style it with CSS.", zh: "给网页加一个按钮，用CSS给它设计样式。" } },
  ],
  3: [
    { title: { en: "Store a Score", zh: "存储一个分数" }, description: { en: "Create a variable that stores a score and displays it.", zh: "创建一个存放分数的变量，并把它显示出来。" } },
    { title: { en: "Write a Function", zh: "写一个函数" }, description: { en: "Write a function that changes text on the page when called.", zh: "写一个函数，调用时能改变页面上的文字。" } },
    { title: { en: "Add a Condition", zh: "加一个条件判断" }, description: { en: "Add an if/else that responds differently to two situations.", zh: "加一个if/else，对两种情况做出不同反应。" } },
    { title: { en: "Respond to a Click", zh: "响应点击" }, description: { en: "Make a button click trigger a function that changes the page.", zh: "让点击按钮触发一个能改变页面的函数。" } },
    { title: { en: "Guess a Number", zh: "猜一个数字" }, description: { en: "Build a simple number-guessing check using if/else.", zh: "用if/else做一个简单的猜数字判断。" } },
  ],
  4: [
    { title: { en: "Add Randomness", zh: "加入随机性" }, description: { en: "Use Math.random() in a small experiment.", zh: "在一个小实验里用上Math.random()。" } },
    { title: { en: "Track a Score", zh: "记录分数" }, description: { en: "Add a score that goes up when something happens.", zh: "加一个分数，某件事发生时分数就增加。" } },
    { title: { en: "Win or Lose", zh: "输或赢" }, description: { en: "Add a condition that decides a win or lose state.", zh: "加一个能判断输赢的条件。" } },
    { title: { en: "Pick Your Game", zh: "选择你的游戏" }, description: { en: "Choose which game you'll build: guessing, RPS, reaction, or quiz.", zh: "选择你要做的游戏：猜数字、石头剪刀布、反应游戏或问答游戏。" } },
    { title: { en: "Ask AI, One Step", zh: "一次向AI求助一步" }, description: { en: "Ask AI for help with just one part of your game.", zh: "只针对游戏的一个部分向AI求助。" } },
    { title: { en: "Playtest It", zh: "试玩测试" }, description: { en: "Play your game 3 times and note anything that feels wrong.", zh: "玩你的游戏3次，记下任何感觉不对的地方。" } },
  ],
  5: [
    { title: { en: "Print Something", zh: "打印点什么" }, description: { en: "Write a line of Python-style code using print().", zh: "写一行用到print()的Python风格代码。" } },
    { title: { en: "Store a String", zh: "存储一个字符串" }, description: { en: "Create a variable holding your name as a string.", zh: "创建一个存放你名字的字符串变量。" } },
    { title: { en: "Write a Condition", zh: "写一个条件" }, description: { en: "Write an if-statement that checks if a number is bigger than 10.", zh: "写一个if语句，判断一个数字是否大于10。" } },
    { title: { en: "Imagine a Loop", zh: "想象一个循环" }, description: { en: "Describe a loop that would print numbers 1 to 5.", zh: "描述一个能打印1到5的循环。" } },
    { title: { en: "Define a Function", zh: "定义一个函数" }, description: { en: "Write a function (def) that greets a person by name.", zh: "写一个用def定义的函数，能按名字问候一个人。" } },
  ],
  6: [
    { title: { en: "List Your Data", zh: "列出你的数据" }, description: { en: "List 5 pieces of data an app you use might collect.", zh: "列出你常用的App可能会收集的5种数据。" } },
    { title: { en: "Spot an API", zh: "找出一个API" }, description: { en: "Guess which app you use calls an API to show live information.", zh: "猜猜你用的哪个App会调用API来显示实时信息。" } },
    { title: { en: "Explain the Waiter", zh: "解释服务员" }, description: { en: "Explain the restaurant/API analogy to someone in your family.", zh: "向家人解释餐厅/API的比喻。" } },
    { title: { en: "Data or Database?", zh: "数据还是数据库？" }, description: { en: "Explain the difference between \"data\" and a \"database\" in your own words.", zh: "用你自己的话解释\"数据\"和\"数据库\"的区别。" } },
    { title: { en: "Draw the Flow", zh: "画出流程" }, description: { en: "Draw the User → API → Server → API → User flow on paper.", zh: "在纸上画出用户 → API → 服务器 → API → 用户的流程。" } },
  ],
  7: [
    { title: { en: "Write System Instructions", zh: "写系统指令" }, description: { en: "Write instructions for how your chatbot should behave.", zh: "写下你的聊天机器人应该怎么表现的指令。" } },
    { title: { en: "Chat with the AI Teacher", zh: "和AI老师聊天" }, description: { en: "Have a short conversation with the AI Teacher.", zh: "和AI老师进行一段简短的对话。" } },
    { title: { en: "Explain Why Keys Are Secret", zh: "解释为什么密钥要保密" }, description: { en: "Explain in your own words why an API key must stay on a backend.", zh: "用你自己的话解释为什么API密钥必须保存在后端。" } },
    { title: { en: "Design a Personality", zh: "设计一种性格" }, description: { en: "Describe the personality of the chatbot you want to build.", zh: "描述你想做的聊天机器人的性格。" } },
    { title: { en: "Test Tricky Questions", zh: "测试刁钻问题" }, description: { en: "Ask the AI Teacher three different kinds of questions and compare its replies.", zh: "向AI老师提三种不同类型的问题，比较它的回答。" } },
  ],
  8: [
    { title: { en: "Spot Computer Vision", zh: "找出计算机视觉" }, description: { en: "Name 3 apps or devices that use computer vision.", zh: "说出3个使用计算机视觉的App或设备。" } },
    { title: { en: "Explain Pixels", zh: "解释像素" }, description: { en: "Explain what a pixel is, in your own words.", zh: "用你自己的话解释什么是像素。" } },
    { title: { en: "Describe Multimodal", zh: "描述多模态" }, description: { en: "Describe a situation where AI needs both an image and text.", zh: "描述一个AI需要同时用到图片和文字的场景。" } },
    { title: { en: "Compare Modes", zh: "比较模态" }, description: { en: "List the 4 kinds of information multimodal AI can use.", zh: "列出多模态AI能使用的4种信息类型。" } },
    { title: { en: "Vision Mistakes", zh: "视觉的失误" }, description: { en: "Think of a time a photo app might misidentify something, and why.", zh: "想一想相册软件可能认错东西的情况，以及原因。" } },
  ],
  9: [
    { title: { en: "Agent Tools", zh: "智能体的工具" }, description: { en: "List 3 tools an agent planning a birthday party might use.", zh: "列出智能体在筹备生日派对时可能用到的3种工具。" } },
    { title: { en: "Chatbot or Agent?", zh: "聊天机器人还是智能体？" }, description: { en: "Sort 5 tasks into \"chatbot\" or \"agent\" territory.", zh: "把5个任务分类成\"适合聊天机器人\"或\"适合智能体\"。" } },
    { title: { en: "Plan a Goal", zh: "为目标制定计划" }, description: { en: "Write a goal for an agent and list the steps it would take.", zh: "为一个智能体写一个目标，并列出它需要采取的步骤。" } },
    { title: { en: "Check the Result", zh: "检查结果" }, description: { en: "Explain why \"check result\" matters before an agent's next action.", zh: "解释为什么智能体在采取下一步行动前要先\"检查结果\"。" } },
  ],
  10: [
    { title: { en: "Draw the Layers", zh: "画出层级" }, description: { en: "Draw the User → Website → Backend → AI API → AI Model → Response path.", zh: "画出用户 → 网站 → 后端 → AI接口 → AI模型 → 回答的路径。" } },
    { title: { en: "Describe Your App", zh: "描述你的应用" }, description: { en: "Write one paragraph describing your chosen AI app project.", zh: "写一段话描述你选择的AI应用项目。" } },
    { title: { en: "Build the Interface", zh: "搭建界面" }, description: { en: "Build the HTML/CSS interface for your AI app.", zh: "为你的AI应用搭建HTML/CSS界面。" } },
    { title: { en: "Add Interaction", zh: "加入互动" }, description: { en: "Add JavaScript so your app responds to a button click.", zh: "加入JavaScript，让你的应用能响应按钮点击。" } },
    { title: { en: "Simulate a Response", zh: "模拟一个回答" }, description: { en: "Make your app show a simulated AI-style response.", zh: "让你的应用显示一个模拟的AI风格回答。" } },
    { title: { en: "Test with a Friend", zh: "和朋友一起测试" }, description: { en: "Have someone else try your app and tell you what's confusing.", zh: "让别人试试你的应用，告诉你哪里让人困惑。" } },
  ],
  11: [
    { title: { en: "Break It on Purpose", zh: "故意弄坏它" }, description: { en: "Add a small mistake to working code, then fix it again.", zh: "给能正常运行的代码加一个小错误，然后再修好它。" } },
    { title: { en: "Read an Error Slowly", zh: "慢慢读错误信息" }, description: { en: "Find an error message and explain what it's telling you.", zh: "找一条错误信息，解释它想告诉你什么。" } },
    { title: { en: "Password Check", zh: "密码检查" }, description: { en: "Explain why passwords should never be typed into an AI chat.", zh: "解释为什么永远不应该把密码输入到AI聊天框里。" } },
    { title: { en: "Ask Before Sharing", zh: "分享前先询问" }, description: { en: "List 2 situations where you should ask an adult before using AI.", zh: "列出两种在使用AI之前应该先问问大人的情况。" } },
    { title: { en: "Explain a Fix", zh: "解释一个修复" }, description: { en: "Explain a bug you fixed this week to someone else.", zh: "向别人解释你这周修好的一个bug。" } },
  ],
};

const FINAL_PROJECT_STEPS = [
  { title: { en: "Step 1 — Choose an Idea", zh: "第1步——选择想法" }, description: { en: "Choose the final project idea you're most excited about.", zh: "选择你最感兴趣的毕业作品想法。" } },
  { title: { en: "Step 2 — Describe It", zh: "第2步——描述它" }, description: { en: "Describe what your project does, in your own words.", zh: "用你自己的话描述你的项目会做什么。" } },
  { title: { en: "Step 3 — Ask AI for Help", zh: "第3步——向AI求助" }, description: { en: "Ask AI for help planning the first step of your build.", zh: "请AI帮你规划构建的第一步。" } },
  { title: { en: "Step 4 — Build v1", zh: "第4步——构建第一版" }, description: { en: "Build the first working version of your project.", zh: "构建出你项目的第一个可运行版本。" } },
  { title: { en: "Step 5 — Test It", zh: "第5步——测试它" }, description: { en: "Test your project yourself and take notes.", zh: "自己测试你的项目，做好记录。" } },
  { title: { en: "Step 6 — Find Bugs", zh: "第6步——找出Bug" }, description: { en: "Find at least one thing that doesn't work yet.", zh: "至少找出一个还不能正常工作的地方。" } },
  { title: { en: "Step 7 — Improve It", zh: "第7步——改进它" }, description: { en: "Fix your bug and add one more improvement.", zh: "修好bug，再加一个改进。" } },
  { title: { en: "Step 8 — Explain It", zh: "第8步——解释它" }, description: { en: "Prepare your explanation: what, how, why, and what AI helped with.", zh: "准备好你的解释：是什么、怎么运作、为什么、AI帮了什么忙。" } },
  { title: { en: "Step 9 — Demo It", zh: "第9步——演示它" }, description: { en: "Rehearse your demo out loud, once, before the big day.", zh: "在正式展示前，把演示大声排练一遍。" } },
];

function buildWeekMissions(weekNumber, days, isFinalDayProject, finalTitle, finalDescription) {
  const pool = WEEK_POOLS[weekNumber] || [];
  const regularDays = days.slice(0, -1);
  const finalDay = days[days.length - 1];
  const missions = regularDays.map((day, i) => {
    const item = pool[i % Math.max(pool.length, 1)] || { title: { en: `Day ${day}`, zh: `第${day}天` }, description: { en: "Keep practicing what you learned this week.", zh: "继续练习这周学到的内容。" } };
    return { day, week: weekNumber, ...item, xp: 100 };
  });
  missions.push({
    day: finalDay,
    week: weekNumber,
    title: finalTitle,
    description: finalDescription,
    xp: isFinalDayProject ? 250 : 150,
    isWeekFinal: true,
  });
  return missions;
}

function daysForWeek(weekNumber) {
  const start = (weekNumber - 1) * 7 + 1;
  return [1, 2, 3, 4, 5, 6, 7].map((n) => start + n - 1);
}

const MISSIONS = [];

// Week 1 — days 1-7, days 1-5 fixed from spec, day 6 from pool, day 7 = mission
for (const day of daysForWeek(1)) {
  if (FIXED_DAYS[day]) {
    MISSIONS.push({ day, week: 1, ...FIXED_DAYS[day] });
  } else if (day === 7) {
    MISSIONS.push({
      day: 7,
      week: 1,
      title: { en: "Week 1 Mission — Better Prompts", zh: "第1周任务——更好的提示词" },
      description: { en: "Ask AI, read the answer, find one fact, verify it, improve your prompt, and compare the answers.", zh: "问AI，读答案，找一个事实，核实它，改进提示词，比较两次答案。" },
      xp: 100,
      isWeekFinal: true,
    });
  } else {
    MISSIONS.push({ day, week: 1, ...WEEK_POOLS[1][0], xp: 100 });
  }
}

MISSIONS.push(...buildWeekMissions(2, daysForWeek(2), true, { en: "Week 2 Project — My First Interactive Website", zh: "第2周项目——我的第一个互动网站" }, { en: "Build a website with a title, image, description, and an interactive button.", zh: "做一个有标题、图片、描述和互动按钮的网站。" }));
MISSIONS.push(...buildWeekMissions(3, daysForWeek(3), false, { en: "Week 3 Mission — Guessing Game Logic", zh: "第3周任务——猜数字游戏逻辑" }, { en: "Build the logic for an interactive guessing game using variables, functions and conditions.", zh: "用变量、函数和条件，搭建一个互动猜数字游戏的逻辑。" }));
MISSIONS.push(...buildWeekMissions(4, daysForWeek(4), true, { en: "Week 4 Project — My First Web Game", zh: "第4周项目——我的第一个网页游戏" }, { en: "Finish your web game: Number Guessing, Rock Paper Scissors, Reaction, or a Quiz Game.", zh: "完成你的网页游戏：猜数字、石头剪刀布、反应游戏，或问答游戏。" }));
MISSIONS.push(...buildWeekMissions(5, daysForWeek(5), false, { en: "Week 5 Mission — Python Logic", zh: "第5周任务——Python逻辑" }, { en: "Explain, in plain words, a Python program using a variable, an if, and a loop.", zh: "用简单的话解释一个用到变量、if和循环的Python程序。" }));
MISSIONS.push(...buildWeekMissions(6, daysForWeek(6), false, { en: "Week 6 Mission — Explain an API", zh: "第6周任务——解释API" }, { en: "Explain the restaurant/API analogy to someone, using your own example.", zh: "用你自己举的例子，向别人解释餐厅/API的比喻。" }));
MISSIONS.push(...buildWeekMissions(7, daysForWeek(7), true, { en: "Week 7 Project — My First AI Chatbot", zh: "第7周项目——我的第一个AI聊天机器人" }, { en: "Design and test your chatbot's personality using the AI Teacher.", zh: "用AI老师设计并测试你聊天机器人的性格。" }));
MISSIONS.push(...buildWeekMissions(8, daysForWeek(8), false, { en: "Week 8 Mission — Vision & Multimodal", zh: "第8周任务——视觉与多模态" }, { en: "Explain computer vision and multimodal AI to someone using your own examples.", zh: "用你自己的例子，向别人解释计算机视觉和多模态AI。" }));
MISSIONS.push(...buildWeekMissions(9, daysForWeek(9), false, { en: "Week 9 Mission — Design an Agent", zh: "第9周任务——设计一个智能体" }, { en: "Design an AI agent's goal, plan, and tools for a task you choose.", zh: "为你选择的一个任务，设计AI智能体的目标、计划和工具。" }));
MISSIONS.push(...buildWeekMissions(10, daysForWeek(10), true, { en: "Week 10 Project — My AI App", zh: "第10周项目——我的AI应用" }, { en: "Finish and test the first version of your chosen AI app.", zh: "完成并测试你选择的AI应用的第一个版本。" }));
MISSIONS.push(...buildWeekMissions(11, daysForWeek(11), false, { en: "Week 11 Mission — Debug & Stay Safe", zh: "第11周任务——调试与安全" }, { en: "Debug a real problem in your project and write down 3 AI safety rules.", zh: "在你的项目里调试一个真正的问题，并写下3条AI安全规则。" }));

// Week 12 — days 78-90, the Final Project's 9-step process + wrap-up
const week12Days = Array.from({ length: 13 }, (_, i) => 78 + i);
week12Days.forEach((day, i) => {
  if (i < FINAL_PROJECT_STEPS.length) {
    MISSIONS.push({ day, week: 12, ...FINAL_PROJECT_STEPS[i], xp: 150 });
  } else if (day === 90) {
    MISSIONS.push({
      day: 90,
      week: 12,
      title: { en: "🏆 Final Demo Day", zh: "🏆 毕业演示日" },
      description: { en: "Demo your final project and answer: what, how, why, what AI helped with, and what you learned.", zh: "展示你的毕业作品，回答：是什么、怎么运作、为什么、AI帮了什么忙、你学到了什么。" },
      xp: 300,
      isWeekFinal: true,
    });
  } else {
    MISSIONS.push({
      day,
      week: 12,
      title: { en: "Polish & Rehearse", zh: "打磨与排练" },
      description: { en: "Keep improving your final project and rehearse your explanation.", zh: "继续改进你的毕业作品，并排练你的讲解。" },
      xp: 150,
    });
  }
});

MISSIONS.sort((a, b) => a.day - b.day);

export function missionForDay(day) {
  return MISSIONS.find((m) => m.day === day);
}

export function missionsForWeek(weekNumber) {
  return MISSIONS.filter((m) => m.week === weekNumber);
}

export { MISSIONS };
export const TOTAL_MISSIONS = MISSIONS.length;
