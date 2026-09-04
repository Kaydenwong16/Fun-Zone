export const WEEK3_LESSONS = [
  {
    id: "w3-l1",
    week: 3,
    index: 1,
    title: { en: "Variables & Functions", zh: "变量与函数" },
    hook: { en: "How does a program remember your score?", zh: "程序是怎么记住你的分数的？" },
    vocabulary: ["Variable", "Function"],
    visual: "javascript",
    explanation: {
      en: "A variable is a named box that stores a value — like `let score = 0;`. A function is a reusable block of instructions with a name, like `function sayHello() { ... }`. Together, variables and functions are the building blocks of everything interactive you'll build.",
      zh: "变量是一个有名字的\"盒子\"，用来存放数值——比如 `let score = 0;`。函数是一段有名字、可以重复使用的指令，比如 `function sayHello() { ... }`。变量和函数是你接下来要做的所有互动效果的基本构件。",
    },
    interaction: {
      type: "code",
      variant: "inline",
      initialHtml: "<button onclick=\"addPoint()\">+1 Point</button>\n<p id=\"score\">Score: 0</p>",
      initialCss: "",
      initialJs: "let score = 0;\nfunction addPoint() {\n  score = score + 1;\n  document.getElementById('score').textContent = 'Score: ' + score;\n}",
    },
    quiz: [
      {
        question: { en: "What does a variable do?", zh: "变量的作用是什么？" },
        options: [
          { en: "Stores a value under a name", zh: "用一个名字存放数值" },
          { en: "Deletes the webpage", zh: "删除网页" },
          { en: "Changes the WiFi password", zh: "修改WiFi密码" },
        ],
        correctIndex: 0,
        explain: { en: "A variable is like a labeled box holding a value that can change.", zh: "变量就像一个贴了标签的盒子，里面存放着可以变化的数值。" },
      },
      {
        question: { en: "What is a function?", zh: "什么是函数？" },
        options: [
          { en: "A named, reusable block of instructions", zh: "一段有名字、可以重复使用的指令" },
          { en: "A picture file", zh: "一种图片文件" },
          { en: "A color code", zh: "一种颜色代码" },
        ],
        correctIndex: 0,
        explain: { en: "Functions let you write instructions once and reuse them anywhere.", zh: "函数让你只写一次指令，就能在任何地方重复使用。" },
      },
    ],
    challenge: {
      en: "In the playground above, change addPoint() so it adds 2 points instead of 1.",
      zh: "在上面的实验区里，把 addPoint() 改成每次加2分而不是1分。",
    },
    xp: 75,
  },
  {
    id: "w3-l2",
    week: 3,
    index: 2,
    title: { en: "Conditions & Events", zh: "条件与事件" },
    hook: { en: "How does a game know if you guessed too high or too low?", zh: "游戏是怎么知道你猜的数字是太大还是太小的？" },
    vocabulary: [],
    visual: "javascript",
    explanation: {
      en: "A condition lets code make a decision: `if (guess > answer) { ... } else { ... }`. An event is something that happens — like a click — that triggers code to run. Combine variables, functions, conditions and events, and you can build a real guessing game.",
      zh: "条件让代码可以做出判断：`if (guess > answer) { ... } else { ... }`。事件是发生的一件事——比如点击——它会触发代码运行。把变量、函数、条件和事件结合起来，你就能做出一个真正的猜数字游戏。",
    },
    interaction: {
      type: "code",
      variant: "inline",
      initialHtml: "<input id=\"guess\" type=\"number\" placeholder=\"Guess 1-10\" />\n<button onclick=\"check()\">Check</button>\n<p id=\"result\"></p>",
      initialCss: "",
      initialJs: "const answer = 7;\nfunction check() {\n  const guess = Number(document.getElementById('guess').value);\n  const el = document.getElementById('result');\n  if (guess === answer) {\n    el.textContent = 'You got it! 🎉';\n  } else if (guess > answer) {\n    el.textContent = 'Too high!';\n  } else {\n    el.textContent = 'Too low!';\n  }\n}",
    },
    quiz: [
      {
        question: { en: "What does an `if` statement do?", zh: "`if` 语句的作用是什么？" },
        options: [
          { en: "Makes code decide between options", zh: "让代码在不同选项中做出判断" },
          { en: "Deletes a variable", zh: "删除一个变量" },
          { en: "Changes the font", zh: "改变字体" },
        ],
        correctIndex: 0,
        explain: { en: "`if` checks a condition and runs different code depending on the answer.", zh: "`if` 会检查一个条件，并根据结果运行不同的代码。" },
      },
      {
        question: { en: "What is an event?", zh: "什么是事件？" },
        options: [
          { en: "Something that happens and can trigger code, like a click", zh: "发生的一件事，能触发代码运行，比如点击" },
          { en: "A type of variable", zh: "一种变量" },
          { en: "A CSS color", zh: "一种CSS颜色" },
        ],
        correctIndex: 0,
        explain: { en: "Clicks, key presses, and page loads are all events.", zh: "点击、按键和页面加载都是事件。" },
      },
    ],
    challenge: {
      en: "Change the guessing game's answer to a different number, then try it yourself.",
      zh: "把猜数字游戏的答案改成另一个数字，然后自己试一试。",
    },
    xp: 75,
  },
];
