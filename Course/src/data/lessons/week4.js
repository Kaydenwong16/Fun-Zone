export const WEEK4_LESSONS = [
  {
    id: "w4-l1",
    week: 4,
    index: 1,
    title: { en: "Game Building Blocks", zh: "游戏的基本构件" },
    hook: { en: "What makes a game feel like a game, and not just a webpage?", zh: "是什么让一个游戏感觉像游戏，而不只是一个网页？" },
    vocabulary: [],
    visual: "javascript",
    explanation: {
      en: "Every simple game needs: rules (what's allowed), a score (tracked in a variable), randomness (so it's different each time — `Math.random()`), user interaction (clicks or keys), and win/lose states (conditions that decide the outcome).",
      zh: "每个简单的游戏都需要：规则（什么是被允许的）、分数（用变量记录）、随机性（让每次都不一样——`Math.random()`）、用户互动（点击或按键），以及输赢状态（决定结果的条件判断）。",
    },
    interaction: {
      type: "code",
      variant: "inline",
      initialHtml: "<button onclick=\"roll()\">Roll the dice 🎲</button>\n<p id=\"out\"></p>",
      initialCss: "",
      initialJs: "function roll() {\n  const num = Math.floor(Math.random() * 6) + 1;\n  document.getElementById('out').textContent = 'You rolled: ' + num;\n}",
    },
    quiz: [
      {
        question: { en: "Which code makes a game different every time you play?", zh: "哪段代码能让游戏每次玩都不一样？" },
        options: [
          { en: "Math.random()", zh: "Math.random()" },
          { en: "let score = 0;", zh: "let score = 0;" },
          { en: "<h1>Title</h1>", zh: "<h1>Title</h1>" },
        ],
        correctIndex: 0,
        explain: { en: "Math.random() generates randomness so results vary each round.", zh: "Math.random() 会产生随机数，让每一轮的结果都不一样。" },
      },
      {
        question: { en: "What decides a win or lose state?", zh: "是什么决定了输赢的状态？" },
        options: [
          { en: "A condition (if/else) checking the game's rules", zh: "检查游戏规则的条件判断 (if/else)" },
          { en: "The color of the button", zh: "按钮的颜色" },
          { en: "The font size", zh: "字体大小" },
        ],
        correctIndex: 0,
        explain: { en: "Conditions compare the current state to the rules to decide the outcome.", zh: "条件判断会把当前状态和规则进行比较，从而决定结果。" },
      },
    ],
    challenge: {
      en: "Change the dice roller so it only says \"Lucky roll!\" when you roll a 6.",
      zh: "修改骰子游戏，只有当骰出6的时候才显示\"幸运的一局！\"。",
    },
    xp: 75,
  },
  {
    id: "w4-l2",
    week: 4,
    index: 2,
    title: { en: "Putting It Together, with AI", zh: "用AI把游戏做出来" },
    hook: { en: "What game do you want to build this week?", zh: "这周你想做一个什么游戏？" },
    vocabulary: [],
    visual: "ai-coding",
    explanation: {
      en: "Pick a small game idea — Number Guessing, Rock Paper Scissors, a Reaction Game, or a Quiz Game. Ask AI for help one step at a time, but make sure you understand every piece of code before moving on. Building it yourself, with AI as a partner, is what makes it your game.",
      zh: "选一个小游戏点子——猜数字、石头剪刀布、反应速度游戏，或者问答游戏。一次向AI求助一步，但一定要在继续之前理解每一段代码。自己动手做，AI只是伙伴——这样才是真正属于你的游戏。",
    },
    interaction: {
      type: "choice",
      prompt: { en: "You finished a first version of your game with AI's help. What should you do next?", zh: "你在AI的帮助下完成了游戏的第一个版本，接下来该怎么做？" },
      options: [
        { en: "Play it, understand each part, then improve one thing", zh: "玩一玩，理解每个部分，然后改进一处" },
        { en: "Immediately ask AI to rebuild it completely differently", zh: "立刻让AI把它完全重做一遍" },
      ],
      correctIndex: 0,
      explain: { en: "Testing and understanding before rebuilding keeps you learning and in control.", zh: "在重做之前先测试和理解，能让你不断学习，也能掌控自己的项目。" },
    },
    quiz: [
      {
        question: { en: "What is a good first step when asking AI to help build a game?", zh: "请AI帮你做游戏时，好的第一步是什么？" },
        options: [
          { en: "Describe the small idea clearly, then build it one piece at a time", zh: "清楚地描述小小的想法，然后一部分一部分地做出来" },
          { en: "Ask for a huge complicated game all at once", zh: "一次性要求做一个庞大复杂的游戏" },
        ],
        correctIndex: 0,
        explain: { en: "Small, clear steps keep the project understandable and fixable.", zh: "小而清楚的步骤能让项目容易理解，也容易修改。" },
      },
    ],
    challenge: {
      en: "Build your Week 4 project: My First Web Game. Choose Number Guessing, Rock Paper Scissors, a Reaction Game, or a Quiz Game.",
      zh: "完成第4周的项目：我的第一个网页游戏。可以选择猜数字、石头剪刀布、反应速度游戏，或者问答游戏。",
    },
    xp: 100,
  },
];
