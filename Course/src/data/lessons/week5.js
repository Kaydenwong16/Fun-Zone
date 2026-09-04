export const WEEK5_LESSONS = [
  {
    id: "w5-l1",
    week: 5,
    index: 1,
    title: { en: "Python Basics", zh: "Python基础" },
    hook: { en: "Programmers use lots of different languages — what does another one look like?", zh: "程序员会用很多不同的语言写代码——另一种语言长什么样？" },
    vocabulary: [],
    visual: "coding",
    explanation: {
      en: "Python is another popular programming language — used for AI, data, and much more. `print(...)` shows text. Variables store values just like in JavaScript: `name = \"Kayden\"`. Strings are text in quotes, numbers are just numbers. The goal isn't to master Python — it's to see that programming logic works the same way across languages.",
      zh: "Python是另一种流行的编程语言——用于AI、数据处理等等。`print(...)` 用来显示文字。变量存放数值，和JavaScript一样：`name = \"Kayden\"`。字符串是加了引号的文字，数字就是数字。目标不是精通Python，而是发现编程的逻辑在不同语言之间是相通的。",
    },
    interaction: {
      type: "code-predict",
      code: 'name = "Kayden"\nage = 10\nprint("Hello, " + name)\nprint(age + 5)',
      question: { en: "What will this Python code print?", zh: "这段Python代码会打印出什么？" },
      options: [
        { en: "Hello, Kayden  and  15", zh: "Hello, Kayden  和  15" },
        { en: "name  and  age", zh: "name  和  age" },
        { en: "An error, because Python can't do math", zh: "报错，因为Python不能做数学运算" },
      ],
      correctIndex: 0,
      explain: {
        en: "print() shows \"Hello, \" joined with the name variable, then it prints age + 5 = 15.",
        zh: "print() 会显示 \"Hello, \" 和 name 变量拼接后的结果，然后打印 age + 5 = 15。",
      },
    },
    quiz: [
      {
        question: { en: "What does print() do in Python?", zh: "Python中的print()有什么作用？" },
        options: [
          { en: "Shows text or values on the screen", zh: "在屏幕上显示文字或数值" },
          { en: "Prints on paper", zh: "打印在纸上" },
          { en: "Deletes a variable", zh: "删除一个变量" },
        ],
        correctIndex: 0,
        explain: { en: "print() outputs text to the screen (in a real Python program, to the console).", zh: "print() 会把文字输出到屏幕上（在真正的Python程序中，是输出到控制台）。" },
      },
    ],
    challenge: {
      en: "Write (on paper or in the Prompt Lab) three lines of Python-style code that print your name, your age, and your favorite animal.",
      zh: "写出（在纸上或提示词实验室里）三行Python风格的代码，打印你的名字、年龄和最喜欢的动物。",
    },
    xp: 75,
  },
  {
    id: "w5-l2",
    week: 5,
    index: 2,
    title: { en: "Python Logic — if, loops, functions", zh: "Python逻辑——条件、循环与函数" },
    hook: { en: "How do you make a computer repeat something 10 times without writing it 10 times?", zh: "怎么才能让电脑重复做10次某件事，而不用写10遍代码？" },
    vocabulary: [],
    visual: "coding",
    explanation: {
      en: "`if` statements let Python make decisions, just like in JavaScript. A loop repeats instructions — `for i in range(5):` runs code 5 times. A function groups instructions under a name with `def`. These same ideas — conditions, loops, functions — appear in almost every programming language.",
      zh: "`if` 语句让Python做出判断，和JavaScript一样。循环会重复执行指令——`for i in range(5):` 会把代码运行5次。函数用 `def` 把一组指令归到一个名字下。条件、循环、函数——这些概念几乎出现在所有编程语言中。",
    },
    interaction: {
      type: "code-predict",
      code: "for i in range(3):\n    print(\"Hi!\")",
      question: { en: "How many times will \"Hi!\" be printed?", zh: "\"Hi!\" 会被打印几次？" },
      options: [
        { en: "3 times", zh: "3次" },
        { en: "1 time", zh: "1次" },
        { en: "Forever", zh: "无限次" },
      ],
      correctIndex: 0,
      explain: { en: "range(3) means the loop runs for i = 0, 1, 2 — three times total.", zh: "range(3) 意味着循环会对 i = 0, 1, 2 各运行一次——总共三次。" },
    },
    quiz: [
      {
        question: { en: "What does a loop do?", zh: "循环的作用是什么？" },
        options: [
          { en: "Repeats instructions", zh: "重复执行指令" },
          { en: "Deletes instructions", zh: "删除指令" },
          { en: "Colors the screen", zh: "给屏幕上色" },
        ],
        correctIndex: 0,
        explain: { en: "Loops save you from writing the same code over and over.", zh: "循环能让你不用把同样的代码写很多遍。" },
      },
    ],
    challenge: {
      en: "Describe in words a loop that would print your name 5 times, and an if-statement that checks if a number is even.",
      zh: "用文字描述一个能打印你的名字5次的循环，以及一个能判断数字是否为偶数的if语句。",
    },
    xp: 75,
  },
];
