// Stage data for the reusable FlowDiagram component — one entry per
// educational graphic required by spec §10. Every label is bilingual and
// lives directly on the graphic (not gated by the language toggle).

export const DIAGRAMS = {
  "ai-learning": {
    title: { en: "How AI Learns", zh: "AI是怎么学习的" },
    stages: [
      { key: "examples", icon: "📚", label: { en: "Examples", zh: "例子" }, detail: { en: "AI is shown thousands of examples — like pictures of cats, or recordings of speech.", zh: "AI会看到成千上万个例子——比如猫的图片，或者录制的语音。" } },
      { key: "patterns", icon: "🔍", label: { en: "Patterns", zh: "规律" }, detail: { en: "It looks for patterns across all those examples — shapes, sounds, or word combinations that repeat.", zh: "它会在这些例子中寻找规律——重复出现的形状、声音或词语组合。" } },
      { key: "prediction", icon: "💡", label: { en: "Prediction", zh: "预测" }, detail: { en: "Using those patterns, AI makes a prediction — a best guess about new information it hasn't seen before.", zh: "利用这些规律，AI会做出预测——对它没见过的新信息做出最佳猜测。" } },
      { key: "feedback", icon: "✅", label: { en: "Feedback", zh: "反馈" }, detail: { en: "AI is told whether its guess was right or wrong.", zh: "AI会被告知它的猜测是对还是错。" } },
      { key: "improvement", icon: "📈", label: { en: "Improvement", zh: "改进" }, detail: { en: "It adjusts itself slightly and gets a little better next time. This repeats millions of times.", zh: "它会稍微调整自己，下次做得更好一点。这个过程会重复上百万次。" } },
    ],
  },
  "ai-vs-software": {
    title: { en: "AI vs Normal Software", zh: "AI 对比 普通程序" },
    stages: [
      { key: "rules", icon: "📏", label: { en: "Human Writes Rules", zh: "人写出规则" }, detail: { en: "In normal software, a human writes exact rules: \"if the button is clicked, change the color.\"", zh: "在普通程序里，人会写出确切的规则：\"如果按钮被点击，就改变颜色\"。" } },
      { key: "follow", icon: "🧾", label: { en: "Computer Follows Rules", zh: "电脑执行规则" }, detail: { en: "The computer just follows those exact rules — nothing more, nothing less.", zh: "电脑只会按照这些确切的规则去执行——不多也不少。" } },
      { key: "data2", icon: "📊", label: { en: "Examples / Data", zh: "例子/数据" }, detail: { en: "In an AI system, instead of rules, we give it lots of examples — this is called data.", zh: "在AI系统中，我们给它的不是规则，而是很多例子——这叫做数据。" } },
      { key: "learn", icon: "🧠", label: { en: "Learning / Training", zh: "学习/训练" }, detail: { en: "The AI studies the data and learns patterns on its own — this process is called training.", zh: "AI会研究这些数据，自己学习其中的规律——这个过程叫做训练。" } },
      { key: "model2", icon: "🧩", label: { en: "Model", zh: "模型" }, detail: { en: "What it learns is stored in something called a model — like a brain built from patterns.", zh: "它学到的东西会存储在一个叫做\"模型\"的东西里——就像一个由规律组成的大脑。" } },
      { key: "predict2", icon: "🔮", label: { en: "Prediction", zh: "预测" }, detail: { en: "The model uses what it learned to make predictions on brand-new situations.", zh: "模型会用它学到的东西，对全新的情况做出预测。" } },
    ],
  },
  prompt: {
    title: { en: "What Is a Prompt?", zh: "什么是提示词？" },
    stages: [
      { key: "child", icon: "🧒", label: { en: "You", zh: "你" }, detail: { en: "It all starts with you and an idea or question.", zh: "一切从你和你的想法或问题开始。" } },
      { key: "prompt", icon: "💬", label: { en: "Prompt", zh: "提示词" }, detail: { en: "You turn that idea into a prompt — what you type or say to AI.", zh: "你把这个想法变成一个提示词——也就是你输入或说给AI听的话。" } },
      { key: "ai", icon: "🤖", label: { en: "AI", zh: "AI" }, detail: { en: "AI reads your prompt and figures out what you're asking for.", zh: "AI读取你的提示词，弄清楚你想要什么。" } },
      { key: "answer", icon: "📩", label: { en: "Answer", zh: "答案" }, detail: { en: "AI gives you an answer — but a clearer prompt usually means a better answer.", zh: "AI给你一个答案——但提示词越清楚，答案通常就越好。" } },
    ],
  },
  mistakes: {
    title: { en: "AI Can Make Mistakes", zh: "AI也会犯错" },
    stages: [
      { key: "ask", icon: "❓", label: { en: "Ask", zh: "问" }, detail: { en: "Ask AI your question.", zh: "向AI提出你的问题。" } },
      { key: "check", icon: "🔎", label: { en: "Check", zh: "检查" }, detail: { en: "Check the answer against something you trust — a book, a trusted website, or an adult.", zh: "用你信任的东西核实答案——一本书、可靠的网站，或者问问大人。" } },
      { key: "think", icon: "🤔", label: { en: "Think", zh: "思考" }, detail: { en: "Think about whether the answer makes sense. AI can sound confident and still be wrong — that's called a hallucination.", zh: "想一想这个答案是否合理。AI有时候说得很自信，但答案可能是错的——这叫做\"幻觉\"。" } },
    ],
  },
  coding: {
    title: { en: "What Is Code?", zh: "什么是代码？" },
    stages: [
      { key: "idea", icon: "💡", label: { en: "Idea", zh: "想法" }, detail: { en: "Every program starts as an idea of something you want to happen.", zh: "每个程序都是从你想实现的一个想法开始的。" } },
      { key: "instructions", icon: "📋", label: { en: "Instructions", zh: "指令" }, detail: { en: "You turn the idea into clear, step-by-step instructions.", zh: "你把这个想法变成清楚的、一步一步的指令。" } },
      { key: "code", icon: "💻", label: { en: "Code", zh: "代码" }, detail: { en: "You write those instructions in a language the computer understands — that's code.", zh: "你用电脑能理解的语言写下这些指令——这就是代码。" } },
      { key: "computer", icon: "🖥️", label: { en: "Computer", zh: "电脑" }, detail: { en: "The computer reads your code, line by line, super fast.", zh: "电脑会逐行、飞快地读取你的代码。" } },
      { key: "result", icon: "✨", label: { en: "Result", zh: "结果" }, detail: { en: "Something happens on screen — that's the result of your code running.", zh: "屏幕上会发生一些事情——这就是代码运行后的结果。" } },
    ],
  },
  html: {
    title: { en: "HTML — The Skeleton", zh: "HTML——网页的骨架" },
    stages: [
      { key: "heading", icon: "🔠", label: { en: "Heading", zh: "标题" }, detail: { en: "A heading is a big title, like <h1>My Page</h1>.", zh: "标题是一段大字，比如 <h1>我的网页</h1>。" } },
      { key: "paragraph", icon: "📄", label: { en: "Paragraph", zh: "段落" }, detail: { en: "A paragraph holds regular text, wrapped in <p>...</p>.", zh: "段落用来放普通文字，写在 <p>...</p> 里。" } },
      { key: "button2", icon: "🔘", label: { en: "Button", zh: "按钮" }, detail: { en: "A button can be clicked — <button>Click me</button>.", zh: "按钮可以被点击——<button>点我</button>。" } },
      { key: "image2", icon: "🖼️", label: { en: "Image", zh: "图片" }, detail: { en: "An image is added with <img src=\"...\">.", zh: "图片用 <img src=\"...\"> 添加。" } },
      { key: "link", icon: "🔗", label: { en: "Link", zh: "链接" }, detail: { en: "A link takes you somewhere else — <a href=\"...\">Go</a>.", zh: "链接会带你去别的地方——<a href=\"...\">前往</a>。" } },
    ],
  },
  css: {
    title: { en: "CSS — Controls the Look", zh: "CSS——控制外观" },
    stages: [
      { key: "color", icon: "🎨", label: { en: "Color", zh: "颜色" }, detail: { en: "CSS sets colors for text and backgrounds.", zh: "CSS可以设置文字和背景的颜色。" } },
      { key: "size", icon: "📐", label: { en: "Size", zh: "大小" }, detail: { en: "CSS controls how big or small things appear.", zh: "CSS可以控制元素显示的大小。" } },
      { key: "spacing", icon: "↔️", label: { en: "Spacing", zh: "间距" }, detail: { en: "CSS adds space between and inside elements.", zh: "CSS可以在元素之间和内部添加空间。" } },
      { key: "fonts", icon: "🔤", label: { en: "Fonts", zh: "字体" }, detail: { en: "CSS chooses which font a page uses.", zh: "CSS可以选择网页使用的字体。" } },
      { key: "layout", icon: "🧩", label: { en: "Layout", zh: "布局" }, detail: { en: "CSS arranges where things sit on the page.", zh: "CSS可以安排页面上各个元素的位置。" } },
    ],
  },
  javascript: {
    title: { en: "JavaScript — Makes It Interactive", zh: "JavaScript——让网页动起来" },
    stages: [
      { key: "event", icon: "🖱️", label: { en: "Click Button", zh: "点击按钮" }, detail: { en: "Something happens — like a click, a key press, or a page load. This is called an event.", zh: "发生了一些事情——比如点击、按键或页面加载。这叫做\"事件\"。" } },
      { key: "runs", icon: "⚙️", label: { en: "JavaScript Runs", zh: "JavaScript运行" }, detail: { en: "JavaScript code attached to that event starts running.", zh: "绑定在这个事件上的JavaScript代码开始运行。" } },
      { key: "logic", icon: "🧮", label: { en: "Variables & Logic", zh: "变量与逻辑" }, detail: { en: "The code might check a condition or update a variable — a named box holding a value.", zh: "代码可能会检查一个条件，或者更新一个变量——一个存放数值、有名字的\"盒子\"。" } },
      { key: "changes", icon: "✨", label: { en: "Something Changes", zh: "发生变化" }, detail: { en: "The page updates — text changes, a score goes up, a color shifts.", zh: "页面发生了变化——文字改变了，分数增加了，颜色变了。" } },
    ],
  },
  data: {
    title: { en: "What Is Data?", zh: "什么是数据？" },
    stages: [
      { key: "raw", icon: "🗂️", label: { en: "Raw Information", zh: "原始信息" }, detail: { en: "Data starts as raw information — numbers, words, pictures, sounds.", zh: "数据一开始是原始信息——数字、文字、图片、声音。" } },
      { key: "organized", icon: "🗃️", label: { en: "Organized Data", zh: "整理后的数据" }, detail: { en: "It gets organized so a computer can read it — like a big labeled spreadsheet.", zh: "数据会被整理，让电脑能够读取——就像一个有标签的大表格。" } },
      { key: "given", icon: "📥", label: { en: "Given to AI", zh: "给AI使用" }, detail: { en: "This organized data is given to an AI model to learn from.", zh: "这些整理好的数据会被交给AI模型来学习。" } },
      { key: "training2", icon: "🏋️", label: { en: "Used for Training", zh: "用于训练" }, detail: { en: "The more good-quality data AI sees, the better it can learn patterns.", zh: "AI看到的高质量数据越多，就越能学好其中的规律。" } },
    ],
  },
  "ai-coding": {
    title: { en: "AI as a Coding Partner", zh: "AI是你的编程伙伴" },
    stages: [
      { key: "before", icon: "📄", label: { en: "Before", zh: "之前" }, detail: { en: "You have some code that doesn't do quite what you want yet.", zh: "你有一段代码，还没有完全做到你想要的效果。" } },
      { key: "prompt3", icon: "💬", label: { en: "Prompt", zh: "提示词" }, detail: { en: "You ask AI clearly: \"Make my button bigger and change the background.\"", zh: "你清楚地问AI：\"把我的按钮变大，并改变背景颜色。\"" } },
      { key: "ai3", icon: "🤖", label: { en: "AI", zh: "AI" }, detail: { en: "AI suggests a small change to your code — not a whole new project.", zh: "AI会建议对你的代码做一个小改动——而不是重写整个项目。" } },
      { key: "after", icon: "🎉", label: { en: "After", zh: "之后" }, detail: { en: "You test it, understand what changed, and keep building.", zh: "你测试它，理解发生了什么变化，然后继续创造。" } },
    ],
  },
  api: {
    title: { en: "What Is an API?", zh: "什么是API？" },
    stages: [
      { key: "you", icon: "🧒", label: { en: "You", zh: "你" }, detail: { en: "You (the app) want something — like today's weather.", zh: "你（应用程序）想要一些东西——比如今天的天气。" } },
      { key: "waiter1", icon: "🧑‍💼", label: { en: "Waiter (API)", zh: "服务员 (API)" }, detail: { en: "The API is like a waiter — it carries your request without you needing to enter the kitchen.", zh: "API就像一个服务员——它帮你把请求带过去，你不需要亲自走进厨房。" } },
      { key: "kitchen", icon: "🍳", label: { en: "Kitchen", zh: "厨房" }, detail: { en: "The kitchen is the server — the computer that actually does the work or holds the data.", zh: "厨房就是服务器——真正处理请求或存放数据的电脑。" } },
      { key: "ai4", icon: "🤖", label: { en: "AI / Computer", zh: "AI/电脑" }, detail: { en: "Sometimes the kitchen is an AI model that prepares an answer.", zh: "有时候厨房里工作的是一个AI模型，它会准备好答案。" } },
      { key: "waiter2", icon: "🧑‍💼", label: { en: "Waiter Returns", zh: "服务员返回" }, detail: { en: "The API carries the answer back to you.", zh: "API把答案带回来给你。" } },
      { key: "answer2", icon: "📩", label: { en: "Answer", zh: "答案" }, detail: { en: "An API lets one program talk to another program, without either needing to know how the other works inside.", zh: "API让一个程序可以和另一个程序沟通，而不需要知道对方内部是怎么工作的。" } },
    ],
  },
  chatbot: {
    title: { en: "How a Chatbot Works", zh: "聊天机器人是怎么工作的" },
    stages: [
      { key: "usermsg", icon: "🧒", label: { en: "User Message", zh: "用户消息" }, detail: { en: "You type a message to the chatbot.", zh: "你给聊天机器人输入一条消息。" } },
      { key: "system", icon: "📜", label: { en: "System Instructions", zh: "系统指令" }, detail: { en: "The chatbot also has hidden instructions telling it how to behave — like \"be friendly and patient.\"", zh: "聊天机器人还有一些隐藏的指令，告诉它该怎么表现——比如\"要友好、有耐心\"。" } },
      { key: "model3", icon: "🤖", label: { en: "AI Model", zh: "AI模型" }, detail: { en: "The AI model reads your message plus the instructions and generates a response.", zh: "AI模型会读取你的消息和系统指令，然后生成一个回复。" } },
      { key: "response", icon: "💬", label: { en: "Response", zh: "回复" }, detail: { en: "You see the response — and the conversation keeps going, remembering what was said before.", zh: "你看到回复——对话会继续下去，还能记住之前说过的话。" } },
    ],
  },
  "computer-vision": {
    title: { en: "AI Can See", zh: "AI能看懂图片" },
    stages: [
      { key: "image", icon: "🖼️", label: { en: "Image", zh: "图片" }, detail: { en: "It starts with a picture — made of millions of tiny colored dots called pixels.", zh: "一切从一张图片开始——由数百万个叫做\"像素\"的彩色小点组成。" } },
      { key: "model4", icon: "🧠", label: { en: "AI Model", zh: "AI模型" }, detail: { en: "A computer vision model looks at the pixels, trained on millions of labeled pictures.", zh: "计算机视觉模型会分析这些像素，它是用数百万张标注过的图片训练出来的。" } },
      { key: "patterns2", icon: "🔍", label: { en: "Patterns", zh: "规律" }, detail: { en: "It finds patterns — edges, shapes, colors — that usually belong to certain objects.", zh: "它会寻找规律——边缘、形状、颜色——这些通常属于某些特定的物体。" } },
      { key: "prediction2", icon: "🐱", label: { en: "Prediction", zh: "预测" }, detail: { en: "It predicts what's in the image — \"this is probably a cat.\"", zh: "它会预测图片里是什么——\"这大概是一只猫\"。" } },
    ],
  },
  multimodal: {
    title: { en: "Multimodal AI", zh: "多模态人工智能" },
    stages: [
      { key: "text", icon: "📝", label: { en: "Text", zh: "文字" }, detail: { en: "Multimodal AI can read and write text.", zh: "多模态AI可以读写文字。" } },
      { key: "images2", icon: "🖼️", label: { en: "Images", zh: "图片" }, detail: { en: "It can also look at images and describe or understand them.", zh: "它也可以查看图片，并描述或理解图片内容。" } },
      { key: "audio2", icon: "🔊", label: { en: "Audio", zh: "音频" }, detail: { en: "It can listen to audio — like speech or music.", zh: "它可以听音频——比如语音或音乐。" } },
      { key: "video", icon: "🎬", label: { en: "Video", zh: "视频" }, detail: { en: "Some AI can even understand video — combining images and sound over time.", zh: "有些AI甚至能理解视频——把随时间变化的图片和声音结合起来。" } },
    ],
  },
  "neural-network": {
    title: { en: "Neural Network", zh: "神经网络" },
    stages: [
      { key: "input", icon: "⬇️", label: { en: "Input", zh: "输入" }, detail: { en: "Information goes in — like the pixels of a picture or the words of a sentence.", zh: "信息被输入进来——比如一张图片的像素，或者一句话的文字。" } },
      { key: "hidden", icon: "🕸️", label: { en: "Hidden Layers", zh: "隐藏层" }, detail: { en: "It passes through layers of connected \"neurons\" loosely inspired by the brain, each layer finding more complex patterns.", zh: "信息会经过一层层相互连接的\"神经元\"，这种设计大致受大脑启发，每一层都能发现更复杂的规律。" } },
      { key: "output", icon: "⬆️", label: { en: "Output", zh: "输出" }, detail: { en: "The network produces an output — a prediction, an answer, or a decision.", zh: "神经网络会产生一个输出——一个预测、一个答案，或者一个决定。" } },
    ],
  },
  agent: {
    title: { en: "AI Agent", zh: "AI智能体" },
    stages: [
      { key: "goal", icon: "🎯", label: { en: "Goal", zh: "目标" }, detail: { en: "An agent starts with a goal — something it needs to accomplish.", zh: "智能体从一个目标开始——它需要完成的一件事。" } },
      { key: "think2", icon: "🤔", label: { en: "Think", zh: "思考" }, detail: { en: "It thinks about what it knows and what it still needs to figure out.", zh: "它会思考自己已经知道什么，还需要弄清楚什么。" } },
      { key: "plan", icon: "📝", label: { en: "Plan", zh: "计划" }, detail: { en: "It makes a plan — a sequence of steps to reach the goal.", zh: "它会制定一个计划——完成目标所需要的一系列步骤。" } },
      { key: "tools", icon: "🧰", label: { en: "Use Tools", zh: "使用工具" }, detail: { en: "It uses tools — like searching the web, running code, or calling an API.", zh: "它会使用工具——比如搜索网络、运行代码，或者调用API。" } },
      { key: "checkresult", icon: "✅", label: { en: "Check Result", zh: "检查结果" }, detail: { en: "It checks whether that action actually worked.", zh: "它会检查这个动作是否真的成功了。" } },
      { key: "nextaction", icon: "➡️", label: { en: "Next Action", zh: "下一步行动" }, detail: { en: "Based on the result, it decides the next action — repeating until the goal is done.", zh: "根据结果，它决定下一步行动——一直重复，直到完成目标。" } },
    ],
  },
  debug: {
    title: { en: "Debugging", zh: "调试" },
    stages: [
      { key: "code2", icon: "💻", label: { en: "Code", zh: "代码" }, detail: { en: "You write some code.", zh: "你写了一些代码。" } },
      { key: "run", icon: "▶️", label: { en: "Run", zh: "运行" }, detail: { en: "You run it to see what happens.", zh: "你运行它，看看会发生什么。" } },
      { key: "error2", icon: "🚫", label: { en: "Error", zh: "错误" }, detail: { en: "Something doesn't work — you get an error or the wrong result. This is normal!", zh: "有些地方没成功——出现了错误或者结果不对。这很正常！" } },
      { key: "askai2", icon: "🤖", label: { en: "Ask AI", zh: "询问AI" }, detail: { en: "You describe the problem to AI and ask what might be wrong.", zh: "你把问题描述给AI，问问可能是哪里出了错。" } },
      { key: "understand", icon: "💡", label: { en: "Understand", zh: "理解" }, detail: { en: "You read the explanation until you understand why it broke.", zh: "你读懂解释，直到明白它为什么坏了。" } },
      { key: "fix", icon: "🔧", label: { en: "Fix", zh: "修复" }, detail: { en: "You make the smallest change needed to fix it.", zh: "你做出修复所需要的最小改动。" } },
      { key: "rerun", icon: "🔁", label: { en: "Run Again", zh: "再次运行" }, detail: { en: "You run it again to check it actually works now.", zh: "你再次运行它，检查现在是否真的成功了。" } },
    ],
  },
  safety: {
    title: { en: "AI Safety", zh: "AI安全" },
    stages: [
      { key: "privacy", icon: "🔒", label: { en: "Keep Privacy", zh: "保护隐私" }, detail: { en: "Never share passwords or private information with AI or anyone online.", zh: "永远不要把密码或私人信息告诉AI或网络上的任何人。" } },
      { key: "verify", icon: "🔎", label: { en: "Verify", zh: "核实" }, detail: { en: "Don't trust every AI answer — check important facts.", zh: "不要盲目相信AI的每一个答案——重要的事实要核实。" } },
      { key: "askadult", icon: "🙋", label: { en: "Ask an Adult", zh: "询问大人" }, detail: { en: "Ask an adult before using a new AI tool or sharing photos.", zh: "在使用新的AI工具或分享照片之前，先问问大人。" } },
      { key: "understand2", icon: "🧠", label: { en: "Understand Before You Use", zh: "理解后再使用" }, detail: { en: "Don't copy code or text from AI without understanding what it does.", zh: "不要在没理解AI生成的代码或文字之前就直接使用它。" } },
      { key: "kind", icon: "💚", label: { en: "Be Kind", zh: "友善待人" }, detail: { en: "Never use AI to hurt, trick, or embarrass someone.", zh: "永远不要用AI来伤害、欺骗或让别人难堪。" } },
    ],
  },
  "final-project": {
    title: { en: "Final Project Workflow", zh: "毕业作品流程" },
    stages: [
      { key: "idea2", icon: "💡", label: { en: "Idea", zh: "想法" }, detail: { en: "Choose an idea you're excited to build.", zh: "选择一个你很想做出来的想法。" } },
      { key: "describe", icon: "🗒️", label: { en: "Describe", zh: "描述" }, detail: { en: "Describe what it will do, in your own words.", zh: "用你自己的话描述它将会做什么。" } },
      { key: "askai3", icon: "🤖", label: { en: "Ask AI", zh: "询问AI" }, detail: { en: "Ask AI for help, one small step at a time.", zh: "一次一小步地向AI求助。" } },
      { key: "build", icon: "🧱", label: { en: "Build v1", zh: "构建第一版" }, detail: { en: "Build the first working version.", zh: "构建出第一个能运行的版本。" } },
      { key: "test", icon: "🧪", label: { en: "Test", zh: "测试" }, detail: { en: "Try it yourself and see what happens.", zh: "自己试一试，看看会发生什么。" } },
      { key: "findbugs", icon: "🐛", label: { en: "Find Bugs", zh: "找Bug" }, detail: { en: "Find things that don't work yet.", zh: "找出还不能正常工作的地方。" } },
      { key: "improve2", icon: "📈", label: { en: "Improve", zh: "改进" }, detail: { en: "Fix and improve it, one change at a time.", zh: "一次改一点，修复并改进它。" } },
      { key: "explain2", icon: "🗣️", label: { en: "Explain", zh: "解释" }, detail: { en: "Explain how it works to someone else.", zh: "向别人解释它是怎么工作的。" } },
      { key: "demo", icon: "🎉", label: { en: "Demo", zh: "演示" }, detail: { en: "Show it off — you built this!", zh: "展示出来——这是你做出来的！" } },
    ],
  },
};
