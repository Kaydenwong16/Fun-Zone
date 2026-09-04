export const WEEK2_LESSONS = [
  {
    id: "w2-l1",
    week: 2,
    index: 1,
    title: { en: "What Is Code?", zh: "什么是代码？" },
    hook: { en: "How does an idea in your head end up as something on a screen?", zh: "你脑子里的想法，是怎么变成屏幕上的东西的？" },
    vocabulary: ["Code", "Program", "Algorithm"],
    visual: "coding",
    explanation: {
      en: "Code is a set of instructions written for a computer. You start with an idea, turn it into clear step-by-step instructions, write those instructions as code, and the computer reads that code super fast to produce a result on screen. This week you'll write real HTML, CSS and JavaScript — the three languages every website is built from.",
      zh: "代码是写给电脑的一组指令。你从一个想法开始，把它变成清楚的、一步一步的指令，把这些指令写成代码，电脑会飞快地读取这些代码，在屏幕上产生结果。这一周你将写真正的HTML、CSS和JavaScript——这是每个网站都用到的三种语言。",
    },
    interaction: { type: "flow", visual: "coding" },
    quiz: [
      {
        question: { en: "What is code?", zh: "什么是代码？" },
        options: [
          { en: "Instructions written for a computer", zh: "写给电脑的指令" },
          { en: "A type of keyboard", zh: "一种键盘" },
          { en: "A picture format", zh: "一种图片格式" },
        ],
        correctIndex: 0,
        explain: { en: "Code is instructions, written in a language the computer can understand.", zh: "代码是指令，用电脑能理解的语言写成。" },
      },
      {
        question: { en: "What are the three core languages of a website?", zh: "网站的三种核心语言是什么？" },
        options: [
          { en: "HTML, CSS, JavaScript", zh: "HTML、CSS、JavaScript" },
          { en: "Red, Green, Blue", zh: "红、绿、蓝" },
          { en: "Word, Excel, PowerPoint", zh: "Word、Excel、PowerPoint" },
        ],
        correctIndex: 0,
        explain: { en: "HTML builds structure, CSS controls looks, JavaScript adds behavior.", zh: "HTML搭建结构，CSS控制外观，JavaScript添加互动行为。" },
      },
    ],
    challenge: {
      en: "Describe, step by step in plain words, the instructions you'd give a robot to make a peanut butter sandwich. That's what writing code feels like!",
      zh: "用你自己的话，一步一步描述你会给机器人下达什么指令来做一个花生酱三明治。这就是写代码的感觉！",
    },
    xp: 50,
  },
  {
    id: "w2-l2",
    week: 2,
    index: 2,
    title: { en: "HTML — Building the Page", zh: "HTML——搭建网页" },
    hook: { en: "What are websites actually made of?", zh: "网站到底是用什么做成的？" },
    vocabulary: [],
    visual: "html",
    explanation: {
      en: "HTML (HyperText Markup Language) is the skeleton of every webpage. Headings, paragraphs, buttons, images and links are all HTML elements. Try it yourself below — edit the HTML on the left and press Run to see your page appear on the right.",
      zh: "HTML（超文本标记语言）是每个网页的骨架。标题、段落、按钮、图片和链接都是HTML元素。在下面自己试试看——编辑左边的HTML，然后点\"运行\"，看看你的网页出现在右边。",
    },
    interaction: {
      type: "code",
      variant: "inline",
      initialHtml: "<h1>My First Web Page</h1>\n<p>This is my page. I'm learning HTML!</p>\n<button>Click me</button>",
      initialCss: "",
      initialJs: "",
      instructions: {
        en: "Try changing the heading text, or add a new <p>paragraph</p> of your own.",
        zh: "试着改一改标题的文字，或者自己加一个新的 <p>段落</p>。",
      },
    },
    quiz: [
      {
        question: { en: "Which tag creates a big heading?", zh: "哪个标签用来创建大标题？" },
        options: [
          { en: "<h1>", zh: "<h1>" },
          { en: "<p>", zh: "<p>" },
          { en: "<img>", zh: "<img>" },
        ],
        correctIndex: 0,
        explain: { en: "<h1> creates the biggest, most important heading on a page.", zh: "<h1> 用来创建网页上最大、最重要的标题。" },
      },
      {
        question: { en: "Which tag is clickable, like a button?", zh: "哪个标签是可以点击的，比如按钮？" },
        options: [
          { en: "<button>", zh: "<button>" },
          { en: "<p>", zh: "<p>" },
          { en: "<h1>", zh: "<h1>" },
        ],
        correctIndex: 0,
        explain: { en: "<button> creates a clickable button.", zh: "<button> 用来创建一个可以点击的按钮。" },
      },
    ],
    challenge: {
      en: "Build a page called \"My First Web Page\" with a heading, an image, a paragraph, and a button.",
      zh: "做一个叫\"我的第一个网页\"的页面，里面有标题、图片、段落和按钮。",
    },
    xp: 75,
  },
  {
    id: "w2-l3",
    week: 2,
    index: 3,
    title: { en: "CSS — Styling the Page", zh: "CSS——美化网页" },
    hook: { en: "How do websites get their colors, fonts, and layout?", zh: "网站的颜色、字体和排版是怎么来的？" },
    vocabulary: [],
    visual: "css",
    explanation: {
      en: "CSS (Cascading Style Sheets) controls how a page looks — color, size, spacing, fonts, layout, borders. HTML builds the page; CSS makes it beautiful. Try changing the CSS below and watch the before/after happen instantly.",
      zh: "CSS（层叠样式表）控制网页的外观——颜色、大小、间距、字体、布局、边框。HTML搭建网页，CSS让它变得好看。试着改改下面的CSS，马上就能看到\"之前\"和\"之后\"的变化。",
    },
    interaction: {
      type: "code",
      variant: "inline",
      initialHtml: "<h1 class=\"title\">Style Me!</h1>\n<button class=\"go\">Go</button>",
      initialCss: ".title {\n  color: royalblue;\n}\n\n.go {\n  background: royalblue;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 8px;\n}",
      initialJs: "",
      instructions: {
        en: "Try changing 'royalblue' to another color, or make the button bigger with a larger padding.",
        zh: "试着把 'royalblue' 换成别的颜色，或者调大 padding 让按钮变大。",
      },
    },
    quiz: [
      {
        question: { en: "What does CSS control?", zh: "CSS控制什么？" },
        options: [
          { en: "How the page looks", zh: "网页的外观" },
          { en: "What the page is about", zh: "网页的主题内容" },
          { en: "The computer's battery", zh: "电脑的电池" },
        ],
        correctIndex: 0,
        explain: { en: "CSS is all about appearance: color, size, spacing, fonts and layout.", zh: "CSS专门负责外观：颜色、大小、间距、字体和布局。" },
      },
      {
        question: { en: "Which property changes background color?", zh: "哪个属性用来改变背景颜色？" },
        options: [
          { en: "background", zh: "background" },
          { en: "heading", zh: "heading" },
          { en: "click", zh: "click" },
        ],
        correctIndex: 0,
        explain: { en: "The background property sets an element's background color.", zh: "background 属性用来设置元素的背景颜色。" },
      },
    ],
    challenge: {
      en: "Take the page from your HTML lesson and give it at least 3 CSS style changes.",
      zh: "拿出你在HTML课上做的网页，给它至少加3个CSS样式改动。",
    },
    xp: 75,
  },
  {
    id: "w2-l4",
    week: 2,
    index: 4,
    title: { en: "AI as a Coding Partner", zh: "AI是你的编程伙伴" },
    hook: { en: "What's the smart way to ask AI to help with your code?", zh: "该怎么聪明地请AI帮你改代码？" },
    vocabulary: [],
    visual: "ai-coding",
    explanation: {
      en: "You can ask AI to help change your code — like \"make my button bigger and change the background.\" The smart way to work with AI: ask for one step at a time, ask AI to explain the code, and ask \"what's the smallest change needed?\" instead of \"rewrite everything.\" This builds real understanding, not just copy-pasting.",
      zh: "你可以请AI帮你修改代码——比如\"把我的按钮变大，改一下背景颜色\"。和AI合作的聪明方式是：一次只请求一步，请AI解释代码，问\"需要改动的最小部分是什么\"，而不是\"把所有东西都重写一遍\"。这样才能真正理解，而不只是复制粘贴。",
    },
    interaction: {
      type: "choice",
      prompt: { en: "Which is the smarter way to ask AI for coding help?", zh: "哪种方式更聪明地请AI帮你写代码？" },
      options: [
        { en: "\"Build my whole game for me.\"", zh: "\"帮我做整个游戏。\"" },
        { en: "\"Explain why my button isn't showing, and show me the smallest fix.\"", zh: "\"解释一下为什么我的按钮没显示，告诉我最小的修复方法。\"" },
      ],
      correctIndex: 1,
      explain: {
        en: "Asking for an explanation and the smallest change keeps you in control and helps you actually learn.",
        zh: "请求解释和最小的改动，能让你保持主动权，也能真正学到东西。" ,
      },
    },
    quiz: [
      {
        question: { en: "What should you avoid asking AI to do?", zh: "你应该避免让AI做什么？" },
        options: [
          { en: "\"Build everything for me.\"", zh: "\"帮我把所有东西都做出来。\"" },
          { en: "\"Explain this code.\"", zh: "\"解释一下这段代码。\"" },
          { en: "\"Why isn't this working?\"", zh: "\"为什么这个不能用？\"" },
        ],
        correctIndex: 0,
        explain: { en: "Letting AI build everything means you don't learn how it works.", zh: "让AI把所有东西都做完，你就学不到它是怎么工作的了。" },
      },
    ],
    challenge: {
      en: "Take your HTML/CSS page and write a prompt asking AI to change one specific thing about it.",
      zh: "拿出你的HTML/CSS网页，写一个提示词，请AI改动其中一个具体的地方。",
    },
    xp: 50,
  },
];
