export const WEEK7_LESSONS = [
  {
    id: "w7-l1",
    week: 7,
    index: 1,
    title: { en: "How a Chatbot Works", zh: "聊天机器人是怎么工作的" },
    hook: { en: "When you chat with an AI, what's actually happening behind the message box?", zh: "当你和AI聊天时，消息框背后到底发生了什么？" },
    vocabulary: [],
    visual: "chatbot",
    explanation: {
      en: "A chatbot takes your message, combines it with hidden system instructions (how it should behave), sends both to an AI model, and the model generates a response. A real conversation remembers earlier messages too. Important safety rule: never put a real AI API key directly in a website's frontend code — that key must stay on a private server.",
      zh: "聊天机器人会接收你的消息，把它和隐藏的系统指令（它该怎么表现）结合起来，一起发送给AI模型，模型会生成一个回复。真正的对话还会记住之前说过的话。重要的安全规则：永远不要把真正的AI API密钥直接放进网站的前端代码里——密钥必须保存在私有的服务器上。",
    },
    interaction: { type: "flow", visual: "chatbot" },
    quiz: [
      {
        question: { en: "Besides your message, what else does a chatbot use to respond?", zh: "除了你的消息，聊天机器人回复时还会用到什么？" },
        options: [
          { en: "Hidden system instructions telling it how to behave", zh: "隐藏的系统指令，告诉它该怎么表现" },
          { en: "Nothing else at all", zh: "什么都不用" },
          { en: "Your phone's battery level", zh: "你手机的电量" },
        ],
        correctIndex: 0,
        explain: { en: "System instructions shape the chatbot's personality and rules.", zh: "系统指令决定了聊天机器人的性格和规则。" },
      },
      {
        question: { en: "Where should a real AI API key be kept?", zh: "真正的AI API密钥应该保存在哪里？" },
        options: [
          { en: "On a private backend server, never in frontend code", zh: "保存在私有的后端服务器上，绝不放在前端代码里" },
          { en: "Directly visible in the website's JavaScript", zh: "直接放在网站的JavaScript里，让大家都能看到" },
        ],
        correctIndex: 0,
        explain: { en: "Frontend code is visible to anyone — API keys must stay server-side.", zh: "前端代码任何人都能看到——API密钥必须保存在服务器端。" },
      },
    ],
    challenge: {
      en: "Write system instructions (in your own words) for a chatbot that helps kids with homework kindly and patiently.",
      zh: "用你自己的话，为一个能耐心、友善地帮小朋友做作业的聊天机器人写一份系统指令。",
    },
    xp: 75,
  },
  {
    id: "w7-l2",
    week: 7,
    index: 2,
    title: { en: "Build Your First AI Chatbot", zh: "打造你的第一个AI聊天机器人" },
    hook: { en: "Ready to build something that actually talks back?", zh: "准备好做一个真的会回话的东西了吗？" },
    vocabulary: [],
    visual: "chatbot",
    explanation: {
      en: "This week's project is My First AI Chatbot. Since a real AI connection needs a secure backend, you'll build and test it using a simulated chatbot — try it out in the AI Teacher section! Design its personality, write a few things it should say, and test how it responds.",
      zh: "这一周的项目是\"我的第一个AI聊天机器人\"。因为真正连接AI需要一个安全的后端服务器，你将使用一个模拟聊天机器人来构建和测试——去\"AI老师\"板块试试看吧！设计它的性格，写一些它应该说的话，测试它的反应。",
    },
    interaction: { type: "promptlab", placeholderKey: "chatbot" },
    quiz: [
      {
        question: { en: "Why does this Version 1 chatbot use a simulation instead of a real AI API?", zh: "为什么这个第一版的聊天机器人使用模拟，而不是真的AI API？" },
        options: [
          { en: "Real API keys must stay safely on a backend server", zh: "真正的API密钥必须安全地保存在后端服务器上" },
          { en: "Simulations are always better than real AI", zh: "模拟永远比真AI更好" },
        ],
        correctIndex: 0,
        explain: { en: "It's a security choice — protecting the API key — not a quality judgment.", zh: "这是出于安全考虑——保护API密钥——而不是说模拟更好。" },
      },
    ],
    challenge: {
      en: "Visit the AI Teacher and have a 5-message conversation. Notice what it does well and what a real AI chatbot might do differently.",
      zh: "去\"AI老师\"聊5条消息。注意它哪些地方做得不错，真正的AI聊天机器人可能会有什么不同。",
    },
    xp: 100,
  },
];
