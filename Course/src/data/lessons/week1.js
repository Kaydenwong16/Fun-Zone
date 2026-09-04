export const WEEK1_LESSONS = [
  {
    id: "w1-l1",
    week: 1,
    index: 1,
    title: { en: "What Is Artificial Intelligence?", zh: "什么是人工智能？" },
    hook: { en: "How does your phone know what you're saying?", zh: "你的手机为什么知道你在说什么？" },
    vocabulary: ["AI", "Data", "Model"],
    visual: "ai-learning",
    explanation: {
      en: "AI stands for Artificial Intelligence. It's software — a computer program — that looks at lots of examples and finds patterns in them. Once it knows the patterns, it can make predictions about new things it hasn't seen before. You already use AI every day: when your phone recognizes your face, when a video app recommends what to watch next, or when a speaker understands your voice.",
      zh: "AI的意思是人工智能。它是一种软件——一种电脑程序——会观察大量例子，并从中找到规律。一旦它掌握了这些规律，就能对从未见过的新事物做出预测。你其实每天都在使用AI：手机认出你的脸、视频软件推荐你可能喜欢看的内容、音箱听懂你说的话——这些都是AI。",
    },
    interaction: {
      type: "choice",
      prompt: { en: "Which of these is an example of AI finding a pattern?", zh: "下面哪一个是AI发现规律的例子？" },
      options: [
        { en: "A calculator adding 2 + 2", zh: "计算器计算 2 + 2" },
        { en: "A photo app recognizing your friend's face after seeing many photos of them", zh: "相册软件在看过很多你朋友的照片后，认出了他/她" },
        { en: "A light switch turning a lamp on", zh: "电灯开关打开一盏灯" },
      ],
      correctIndex: 1,
      explain: {
        en: "A calculator and a light switch just follow fixed rules. Recognizing a face after learning from many examples is AI finding a pattern.",
        zh: "计算器和电灯开关只是按照固定规则工作。而在看过很多例子后认出一张脸，这才是AI在发现规律。",
      },
    },
    quiz: [
      {
        question: { en: "What does AI use to learn patterns?", zh: "AI用什么来学习规律？" },
        options: [
          { en: "Magic", zh: "魔法" },
          { en: "Examples / data", zh: "例子/数据" },
          { en: "Electricity only", zh: "只靠电力" },
        ],
        correctIndex: 1,
        explain: { en: "AI learns by looking at lots of examples — that's called data.", zh: "AI通过观察大量例子来学习——这些例子叫做数据。" },
      },
      {
        question: { en: "Which is an everyday example of AI?", zh: "下面哪个是日常生活中AI的例子？" },
        options: [
          { en: "Speech recognition on your phone", zh: "手机上的语音识别" },
          { en: "A pencil", zh: "一支铅笔" },
          { en: "A wooden chair", zh: "一把木椅子" },
        ],
        correctIndex: 0,
        explain: { en: "Speech recognition looks at sound patterns to understand words — that's AI at work.", zh: "语音识别通过分析声音规律来理解词语——这就是AI在工作。" },
      },
      {
        question: { en: "AI is...", zh: "AI是……" },
        options: [
          { en: "A living creature", zh: "一种有生命的生物" },
          { en: "Software that finds patterns in data", zh: "一种能从数据中找规律的软件" },
          { en: "A type of computer chip only", zh: "只是一种电脑芯片" },
        ],
        correctIndex: 1,
        explain: { en: "AI is software — a program — even though it can feel surprisingly smart!", zh: "AI是软件——是一个程序——尽管它有时看起来出奇地聪明！" },
      },
    ],
    challenge: {
      en: "Find three things in your house or school that might be using AI. Write down what each one does.",
      zh: "在家里或学校找出三样可能用到AI的东西，写下它们各自的功能。",
    },
    xp: 50,
  },
  {
    id: "w1-l2",
    week: 1,
    index: 2,
    title: { en: "AI vs Normal Software", zh: "AI 对比 普通程序" },
    hook: { en: "Why can't a calculator recognize your dog in a photo?", zh: "为什么计算器认不出照片里的小狗？" },
    vocabulary: ["Algorithm", "Training"],
    visual: "ai-vs-software",
    explanation: {
      en: "Normal software follows exact rules that a human wrote — a calculator always adds numbers the same way. AI systems are different: instead of exact rules, they're given lots of examples (data) and they learn (train) their own patterns, which get stored in something called a model. That model can then handle new situations the programmer never explicitly planned for.",
      zh: "普通程序会按照人写好的确切规则工作——计算器每次加法的方式都一样。AI系统不同：它不是靠确切的规则，而是通过大量例子（数据）自己学习（训练）出规律，并把这些规律存放在一个叫\"模型\"的东西里。这个模型之后就能处理程序员从未特意设计过的新情况。",
    },
    interaction: {
      type: "flow",
      visual: "ai-vs-software",
    },
    quiz: [
      {
        question: { en: "In normal software, who writes the exact rules?", zh: "在普通程序里，确切的规则是谁写的？" },
        options: [
          { en: "A human programmer", zh: "人类程序员" },
          { en: "The data", zh: "数据" },
          { en: "Nobody — it appears by itself", zh: "没有人——它自己出现的" },
        ],
        correctIndex: 0,
        explain: { en: "A human writes exact instructions for normal software to follow.", zh: "人类程序员写下确切的指令，让普通程序去执行。" },
      },
      {
        question: { en: "What does an AI system learn from?", zh: "AI系统靠什么来学习？" },
        options: [
          { en: "Exact rules only", zh: "只靠确切规则" },
          { en: "Data and training", zh: "数据和训练" },
          { en: "Guessing randomly forever", zh: "永远随机乱猜" },
        ],
        correctIndex: 1,
        explain: { en: "AI learns patterns from data through a process called training.", zh: "AI通过一个叫\"训练\"的过程，从数据中学习规律。" },
      },
    ],
    challenge: {
      en: "Pick an app on a phone or tablet. Decide: does it feel more like \"normal software\" (fixed rules) or \"AI\" (learns patterns)? Explain why.",
      zh: "选一个手机或平板上的应用。判断它更像\"普通程序\"（固定规则）还是\"AI\"（自己学规律）？说说你的理由。",
    },
    xp: 50,
  },
  {
    id: "w1-l3",
    week: 1,
    index: 3,
    title: { en: "What Is a Prompt?", zh: "什么是提示词？" },
    hook: { en: "If you could ask an AI anything, what would you ask — and how would you ask it?", zh: "如果你能问AI任何问题，你会问什么，又会怎么问？" },
    vocabulary: ["Prompt"],
    visual: "prompt",
    explanation: {
      en: "A prompt is what you type or say to ask AI for something. A vague prompt like \"tell me about space\" gets a vague answer. A clear prompt gives AI a role, a goal, and a format — for example: \"Explain three interesting facts about Mars to a 10-year-old, in a short list.\" Try it below in the Prompt Lab!",
      zh: "提示词就是你输入或说出的话，用来向AI提出请求。像\"讲讲太空\"这样模糊的提示词，只会得到模糊的答案。清楚的提示词会给AI一个角色、一个目标和一种格式——比如：\"给10岁小朋友讲三个关于火星的有趣事实，用简短的列表列出来。\" 在下面的提示词实验室试试看吧！",
    },
    interaction: { type: "promptlab" },
    quiz: [
      {
        question: { en: "What is a prompt?", zh: "什么是提示词？" },
        options: [
          { en: "What you type or say to ask AI for something", zh: "你输入或说出的话，用来向AI提出请求" },
          { en: "A type of computer chip", zh: "一种电脑芯片" },
          { en: "A robot's arm", zh: "机器人的手臂" },
        ],
        correctIndex: 0,
        explain: { en: "A prompt is your instruction or question to AI.", zh: "提示词就是你给AI的指令或问题。" },
      },
      {
        question: { en: "Which prompt is likely to get the best answer?", zh: "哪个提示词最可能得到好的答案？" },
        options: [
          { en: "\"space\"", zh: "\"太空\"" },
          { en: "\"Tell me three fun facts about Mars for a 10-year-old, as a short list.\"", zh: "\"给10岁小朋友讲三个关于火星的有趣事实，用简短列表列出来。\"" },
          { en: "\"???\"", zh: "\"???\"" },
        ],
        correctIndex: 1,
        explain: { en: "It gives AI a topic, an audience, a count, and a format — much clearer!", zh: "它给了AI主题、听众、数量和格式——清楚多了！" },
      },
      {
        question: { en: "A vague prompt usually gets...", zh: "模糊的提示词通常会得到……" },
        options: [
          { en: "A vague answer", zh: "模糊的答案" },
          { en: "Always the perfect answer", zh: "永远完美的答案" },
          { en: "No answer at all", zh: "完全没有答案" },
        ],
        correctIndex: 0,
        explain: { en: "Clearer prompts lead to clearer, more useful answers.", zh: "越清楚的提示词，答案通常也越清楚、越有用。" },
      },
    ],
    challenge: {
      en: "Write a prompt that asks AI to explain something you find interesting to a 10-year-old.",
      zh: "写一个提示词，让AI给10岁小朋友讲讲一件你觉得有趣的事情。",
    },
    xp: 50,
  },
  {
    id: "w1-l4",
    week: 1,
    index: 4,
    title: { en: "AI Can Make Mistakes", zh: "AI也会犯错" },
    hook: { en: "Can AI ever be wrong — even when it sounds very sure?", zh: "AI会不会犯错——就算它听起来非常肯定？" },
    vocabulary: [],
    visual: "mistakes",
    explanation: {
      en: "AI can sound completely confident and still be wrong. Sometimes it makes up information that isn't true — this is called a hallucination. Sometimes its information is just outdated. AI is a powerful helper, not an automatic truth machine. The habit to build is: ASK → CHECK → THINK. Always double-check important facts.",
      zh: "AI有时候听起来非常自信，但答案却是错的。有时它会编造出不真实的信息——这叫做\"幻觉\"。有时它的信息只是过时了。AI是一个强大的帮手，但不是一台自动说真话的机器。要养成的习惯是：问 → 检查 → 思考。重要的事实一定要再三核实。",
    },
    interaction: {
      type: "choice",
      prompt: { en: "AI gives you a very confident-sounding answer. What should you do?", zh: "AI给了你一个听起来非常肯定的答案。你应该怎么做？" },
      options: [
        { en: "Believe it immediately because it sounds sure", zh: "因为它听起来很肯定，就立刻相信" },
        { en: "Check it against a trusted source before believing it", zh: "在相信之前，用可靠的来源核实一下" },
        { en: "Ignore AI completely, forever", zh: "从此完全不再理会AI" },
      ],
      correctIndex: 1,
      explain: {
        en: "Confidence doesn't equal correctness. ASK → CHECK → THINK is the safe habit.",
        zh: "听起来肯定，不代表就是对的。\"问 → 检查 → 思考\"才是安全的习惯。",
      },
    },
    quiz: [
      {
        question: { en: "What is it called when AI confidently makes up false information?", zh: "AI自信地编造虚假信息，这叫做什么？" },
        options: [
          { en: "A hallucination", zh: "幻觉" },
          { en: "A firmware update", zh: "固件更新" },
          { en: "A password", zh: "密码" },
        ],
        correctIndex: 0,
        explain: { en: "This is called a hallucination — AI states something false as if it were true.", zh: "这叫做\"幻觉\"——AI把错误的信息说得像真的一样。" },
      },
      {
        question: { en: "What's the safe habit to build when using AI?", zh: "使用AI时应该养成什么安全习惯？" },
        options: [
          { en: "Ask → Check → Think", zh: "问 → 检查 → 思考" },
          { en: "Believe everything instantly", zh: "立刻相信一切" },
          { en: "Never ask AI anything", zh: "永远不问AI任何问题" },
        ],
        correctIndex: 0,
        explain: { en: "Ask your question, check the answer, then think about whether it makes sense.", zh: "提出问题，核实答案，然后思考它是否合理。" },
      },
    ],
    challenge: {
      en: "Ask AI (or use the Prompt Lab) a factual question. Pick one fact from the answer and think about how you would check if it's true.",
      zh: "向AI提一个事实性问题（或使用提示词实验室）。从答案中挑一个事实，想一想你会怎么核实它是否真实。",
    },
    xp: 50,
  },
];
