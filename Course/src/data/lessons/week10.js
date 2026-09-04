export const WEEK10_LESSONS = [
  {
    id: "w10-l1",
    week: 10,
    index: 1,
    title: { en: "How an AI App Is Built", zh: "一个AI应用是怎么搭建的" },
    hook: { en: "What actually happens between you tapping 'send' and an AI app replying?", zh: "从你点\"发送\"到AI应用回复，中间到底发生了什么？" },
    vocabulary: [],
    visual: "api",
    explanation: {
      en: "A real AI app has layers: You use a Website (what you see), which talks to a Backend (a private server), which calls an AI API, which reaches an AI Model, which sends back a Response. The backend keeps the API key safe — it's the part users never see directly.",
      zh: "一个真正的AI应用有好几层：你使用网站（你能看到的部分），网站会和后端（一个私有服务器）沟通，后端调用AI接口，接口连接到AI模型，模型再把回答发送回来。后端负责保护API密钥的安全——这是用户永远不会直接看到的部分。",
    },
    interaction: {
      type: "flow",
      customStages: [
        { key: "user", icon: "🧒", label: { en: "User", zh: "用户" }, detail: { en: "You interact with the app.", zh: "你在使用这个应用。" } },
        { key: "website", icon: "🌐", label: { en: "Website", zh: "网站" }, detail: { en: "The website shows the interface and sends your request onward.", zh: "网站显示界面，并把你的请求发送出去。" } },
        { key: "backend", icon: "🗄️", label: { en: "Backend", zh: "后端" }, detail: { en: "A private server that safely holds the API key and forwards requests.", zh: "一个私有服务器，安全地保存API密钥，并转发请求。" } },
        { key: "aiapi", icon: "🔌", label: { en: "AI API", zh: "AI接口" }, detail: { en: "The connection point to the AI service.", zh: "连接AI服务的接口。" } },
        { key: "aimodel", icon: "🤖", label: { en: "AI Model", zh: "AI模型" }, detail: { en: "The model that actually generates the answer.", zh: "真正生成答案的模型。" } },
        { key: "response3", icon: "📩", label: { en: "Response", zh: "回答" }, detail: { en: "The answer travels back through the same layers to you.", zh: "答案会沿着同样的层级传回给你。" } },
      ],
    },
    quiz: [
      {
        question: { en: "Why does an AI app need a backend?", zh: "为什么AI应用需要一个后端？" },
        options: [
          { en: "To safely hold the API key away from users", zh: "为了把API密钥安全地保存在用户看不到的地方" },
          { en: "To make the website look prettier", zh: "为了让网站看起来更漂亮" },
        ],
        correctIndex: 0,
        explain: { en: "Keeping secrets server-side is the core reason for a backend in an AI app.", zh: "把密钥保存在服务器端，正是AI应用需要后端的核心原因。" },
      },
    ],
    challenge: {
      en: "Draw (on paper) the path a message takes from you to the AI model and back, labeling each layer.",
      zh: "在纸上画出一条消息从你到AI模型、再返回的路径，标出每一层的名字。",
    },
    xp: 100,
  },
  {
    id: "w10-l2",
    week: 10,
    index: 2,
    title: { en: "Choose Your AI App Project", zh: "选择你的AI应用项目" },
    hook: { en: "What will you build this week?", zh: "这一周你想做出什么？" },
    vocabulary: [],
    visual: "ai-coding",
    explanation: {
      en: "It's time to choose your own AI project. Pick something you're genuinely excited about — you'll design it, build a first version with AI's help, test it, and improve it.",
      zh: "现在轮到你选择自己的AI项目了。挑一个你真正感兴趣的想法——你将设计它、在AI的帮助下做出第一个版本、测试它，并不断改进它。",
    },
    interaction: {
      type: "pickone",
      projectId: "week10-project",
      prompt: { en: "Which AI app do you want to build?", zh: "你想做哪种AI应用？" },
      options: [
        { key: "story", icon: "📖", title: { en: "AI Story Generator", zh: "AI故事生成器" }, description: { en: "Type a topic, get a short story.", zh: "输入一个主题，生成一个短故事。" } },
        { key: "homework", icon: "📚", title: { en: "AI Homework Helper", zh: "AI作业小助手" }, description: { en: "Ask a question, get a simple explanation.", zh: "提出问题，得到简单的解释。" } },
        { key: "quiz", icon: "❓", title: { en: "AI Quiz Maker", zh: "AI问答制作器" }, description: { en: "Give a topic, get quiz questions.", zh: "输入主题，生成问答题。" } },
        { key: "character", icon: "🧝", title: { en: "AI Character Creator", zh: "AI角色创造器" }, description: { en: "Describe a character, get a description back.", zh: "描述一个角色，得到详细的介绍。" } },
        { key: "travel", icon: "✈️", title: { en: "AI Travel Planner", zh: "AI旅行规划师" }, description: { en: "Pick a place, get a simple day plan.", zh: "选一个地点，生成简单的行程安排。" } },
        { key: "science", icon: "🔬", title: { en: "AI Science Explorer", zh: "AI科学探索家" }, description: { en: "Ask about science, get a kid-friendly answer.", zh: "提出科学问题，得到适合小朋友的答案。" } },
      ],
    },
    quiz: [
      {
        question: { en: "What's the first thing to do after choosing a project idea?", zh: "选好项目想法之后，第一步该做什么？" },
        options: [
          { en: "Describe what it should do, in your own words", zh: "用你自己的话描述它应该做什么" },
          { en: "Immediately publish it to the whole internet", zh: "立刻把它发布到整个互联网上" },
        ],
        correctIndex: 0,
        explain: { en: "A clear description is the plan you and AI will build from.", zh: "清楚的描述是你和AI接下来构建的基础计划。" },
      },
    ],
    challenge: {
      en: "Build the first version of your chosen AI app in the Coding Lab. It's OK if it's simple!",
      zh: "在编程实验室里做出你选择的AI应用的第一个版本。简单一点也没关系！",
    },
    xp: 100,
  },
];
