// ---------------------------------------------------------------------------
// A small rule-based "AI" used by the Prompt Lab, the AI Teacher and the
// Coding Lab's "Ask AI" button. It is NOT a real model — it's a local
// simulation so Version 1 works fully offline with no API key (spec §14,
// §30, §43). The call sites are written so a real backend/AI API can be
// swapped in later without changing how components use them.
// ---------------------------------------------------------------------------

const TOPIC_FACTS = {
  mars: {
    en: [
      "Mars is called the Red Planet because iron rust colors its soil.",
      "A day on Mars is about 24 hours and 37 minutes — very close to Earth's.",
      "Mars has the tallest volcano in the solar system, Olympus Mons.",
    ],
    zh: ["火星被称为红色星球，因为它的土壤含有铁锈。", "火星上的一天大约是24小时37分钟，和地球很接近。", "火星上有太阳系最高的火山——奥林帕斯山。"],
  },
  ocean: {
    en: [
      "The ocean covers about 70% of Earth's surface.",
      "More than 80% of the ocean has never been explored.",
      "The deepest point, the Mariana Trench, is deeper than Mount Everest is tall.",
    ],
    zh: ["海洋覆盖了地球表面大约70%的面积。", "超过80%的海洋从未被探索过。", "最深的地方——马里亚纳海沟——比珠穆朗玛峰还要深。"],
  },
  space: {
    en: [
      "There are more stars in the universe than grains of sand on every beach on Earth.",
      "Space is completely silent because sound needs air to travel.",
      "One day on Venus is longer than one year on Venus.",
    ],
    zh: ["宇宙中的星星比地球上所有沙滩上的沙粒还要多。", "太空是完全寂静的，因为声音需要空气才能传播。", "金星上的一天比金星上的一年还要长。"],
  },
  dinosaur: {
    en: [
      "Some dinosaurs had feathers, just like birds today.",
      "The word 'dinosaur' means 'terrible lizard' in Greek.",
      "Not all dinosaurs went extinct — scientists say birds are their living relatives.",
    ],
    zh: ["有些恐龙身上长着羽毛，就像今天的鸟类一样。", "\"恐龙\"这个词在希腊语里意思是\"可怕的蜥蜴\"。", "并不是所有恐龙都灭绝了——科学家认为鸟类是它们的后代。"],
  },
  robot: {
    en: [
      "The word 'robot' comes from a Czech word meaning 'forced labor'.",
      "Some robots today can walk, balance, and even do backflips.",
      "A robot is a machine, but it needs a program (code) to know what to do.",
    ],
    zh: ["\"机器人\"这个词来自捷克语，意思是\"强迫劳动\"。", "现在有些机器人可以走路、保持平衡，甚至能后空翻。", "机器人是一台机器，但它需要程序（代码）才知道该做什么。"],
  },
  volcano: {
    en: [
      "Volcanoes can form new islands when they erupt underwater.",
      "There are volcanoes on other planets and moons too, like Mars and Io.",
      "Some volcanoes have been erupting on and off for thousands of years.",
    ],
    zh: ["火山在水下喷发时可以形成新的岛屿。", "其他星球和卫星上也有火山，比如火星和木卫一。", "有些火山已经断断续续喷发了几千年。"],
  },
  "black hole": {
    en: [
      "A black hole's gravity is so strong that not even light can escape it.",
      "Black holes are not empty space — they pack a huge amount of matter into a tiny area.",
      "Our galaxy has a giant black hole at its center, but Earth is safely far away.",
    ],
    zh: ["黑洞的引力非常强，连光都逃不出来。", "黑洞不是空的——它把巨大的质量压缩在很小的空间里。", "我们的银河系中心有一个巨大的黑洞，但地球离它很远，很安全。"],
  },
};

const TOPIC_KEYS = Object.keys(TOPIC_FACTS);

function detectTopic(prompt) {
  const lower = prompt.toLowerCase();
  return TOPIC_KEYS.find((key) => lower.includes(key));
}

/**
 * Heuristic prompt-quality check used by the Prompt Lab (spec §3 Lesson 3).
 * Returns a 0–3 score and short bilingual tips.
 */
export function analyzePrompt(promptText) {
  const text = (promptText || "").trim();
  const tips = [];
  let score = 0;

  if (text.length < 6) {
    return {
      score: 0,
      tips: [{ en: "Try writing a full sentence — what do you want AI to do?", zh: "试着写一个完整的句子——你想让AI做什么？" }],
    };
  }

  if (text.length >= 15) score += 1;
  else tips.push({ en: "Add a bit more detail to your prompt.", zh: "给提示词加一点更多的细节。" });

  const hasTopic = Boolean(detectTopic(text)) || /[a-zA-Z一-龥]{4,}/.test(text);
  if (hasTopic) score += 1;

  const hasAudience = /10.year.old|kid|child|simple|孩子|简单|小朋友/i.test(text);
  if (hasAudience) score += 1;
  else tips.push({ en: "Tell AI who it's for, e.g. \"explain it to a 10-year-old.\"", zh: "告诉AI是给谁看的，比如\"讲给10岁小朋友听\"。" });

  const hasFormat = /list|three|steps|facts|short|列表|三个|步骤|简短/i.test(text);
  if (hasFormat) score += 1;
  else tips.push({ en: "Ask for a format, e.g. \"three facts\" or \"a short list.\"", zh: "可以要求一种格式，比如\"三个事实\"或\"一个简短列表\"。" });

  return { score: Math.min(score, 3), tips };
}

/**
 * A canned "AI answer" for the Prompt Lab. Purely local — no network call.
 */
export function simulateAnswer(promptText) {
  const topic = detectTopic(promptText || "");
  if (!topic) {
    return {
      en: "I'm a simulated AI for practice! Try asking about something specific — like Mars, the ocean, dinosaurs, robots, volcanoes, or black holes — so I can share a few facts.",
      zh: "我是用来练习的模拟AI！试着问一些具体的东西——比如火星、海洋、恐龙、机器人、火山或黑洞——这样我就能分享一些事实了。",
    };
  }
  const wantsThree = /three|3|三个/i.test(promptText);
  const count = wantsThree ? 3 : 2;
  const facts = TOPIC_FACTS[topic];
  const en = facts.en.slice(0, count).map((f, i) => `${i + 1}. ${f}`).join("\n");
  const zh = facts.zh.slice(0, count).map((f, i) => `${i + 1}. ${f}`).join("\n");
  return { en, zh };
}

// ---- AI Teacher knowledge base -----------------------------------------

const TEACHER_RULES = [
  {
    match: /prompt/i,
    reply: {
      en: "A prompt is what you type or say to ask AI for something. The clearer your prompt, the better the answer! Try adding: who it's for, what format you want, and how much detail.",
      zh: "提示词就是你输入或说出的话，用来向AI提出请求。提示词越清楚，答案就越好！试着加上：这是给谁看的、你想要什么格式、需要多少细节。",
    },
  },
  {
    match: /button.*(work|click)|(work|click).*button/i,
    reply: {
      en: "Let's debug it together. First — what did you expect the button to do when clicked? Then check: does your JavaScript code use the exact same id as your HTML button?",
      zh: "我们一起来调试吧。首先——你希望点击按钮后发生什么？然后检查一下：你的JavaScript代码用的id和HTML按钮的id是不是完全一样？",
    },
  },
  {
    match: /error|bug|not work|doesn.?t work|broken/i,
    reply: {
      en: "Errors are not failure — they're information! Read the error message slowly. What word or line number does it mention? That's usually exactly where to look.",
      zh: "错误不是失败——它是有用的信息！慢慢读一读错误信息。它提到了哪个词或哪一行？那通常正是你该检查的地方。",
    },
  },
  {
    match: /html/i,
    reply: {
      en: "HTML is the skeleton of a webpage — headings, paragraphs, buttons, images and links. Try starting with one heading and one paragraph, then Run to see it appear.",
      zh: "HTML是网页的骨架——标题、段落、按钮、图片和链接。试着先写一个标题和一段文字，然后点\"运行\"看看效果。",
    },
  },
  {
    match: /css/i,
    reply: {
      en: "CSS controls how things look — color, size, spacing, fonts. Pick one element and change one property at a time so you can see exactly what changed.",
      zh: "CSS控制外观——颜色、大小、间距、字体。先选一个元素，一次只改一个属性，这样你就能清楚地看到发生了什么变化。",
    },
  },
  {
    match: /javascript|variable|function/i,
    reply: {
      en: "JavaScript makes a page interactive. A variable stores a value, and a function is a named block of instructions you can reuse. What are you trying to make happen?",
      zh: "JavaScript让网页可以互动。变量用来存放数值，函数是一段可以重复使用、有名字的指令。你想让网页发生什么变化？",
    },
  },
  {
    match: /api/i,
    reply: {
      en: "Think of an API like a waiter: you (the app) ask for something, the waiter (API) carries your request to the kitchen (the server), and brings back your answer.",
      zh: "可以把API想成服务员：你（应用程序）提出请求，服务员（API）把请求带到厨房（服务器），然后把答案带回来给你。",
    },
  },
  {
    match: /agent/i,
    reply: {
      en: "A chatbot answers one question at a time. An agent gets a goal, makes a plan, uses tools, checks the result, and decides the next action — more like a mini project manager.",
      zh: "聊天机器人一次回答一个问题。而智能体会接收一个目标，制定计划，使用工具，检查结果，并决定下一步行动——更像一个小小的项目经理。",
    },
  },
  {
    match: /wrong|mistake|hallucina|sure.*true|is.*true/i,
    reply: {
      en: "Great question to ask! AI can sound confident and still be wrong. Always: ASK → CHECK → THINK. Check important facts with another source before trusting them.",
      zh: "这是个很好的问题！AI有时候说得很自信，但答案可能是错的。记住：问 → 检查 → 思考。重要的事实要用别的来源再确认一下。",
    },
  },
];

const TEACHER_FALLBACKS = [
  {
    en: "Good question! Let's think it through together — what have you tried so far?",
    zh: "问得好！我们一起来想一想——你已经试过什么方法了？",
  },
  {
    en: "I love that you're experimenting. What do you think will happen if you try it?",
    zh: "很喜欢你在尝试新东西。你觉得如果你试一试会发生什么？",
  },
  {
    en: "Tell me more about what you're building — what's the goal?",
    zh: "多跟我说说你在做什么——你的目标是什么？",
  },
];

export function askTeacher(question) {
  const rule = TEACHER_RULES.find((r) => r.match.test(question));
  if (rule) return rule.reply;
  return TEACHER_FALLBACKS[Math.floor(Math.random() * TEACHER_FALLBACKS.length)];
}
