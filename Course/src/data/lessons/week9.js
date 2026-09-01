export const WEEK9_LESSONS = [
  {
    id: "w9-l1",
    week: 9,
    index: 1,
    title: { en: "What Is an AI Agent?", zh: "什么是AI智能体？" },
    hook: { en: "What's the difference between an AI that answers a question and one that gets things done?", zh: "只会回答问题的AI，和真正能把事情做完的AI，区别在哪？" },
    vocabulary: ["Agent"],
    visual: "agent",
    explanation: {
      en: "An AI agent is a system that receives a goal, decides what to do, uses tools, checks the results, and decides the next action — repeating until the goal is reached. A chatbot goes Question → Answer. An agent goes Goal → Plan → Actions → Result.",
      zh: "AI智能体是一个系统，它会接收一个目标，决定该做什么，使用工具，检查结果，并决定下一步行动——不断重复，直到完成目标。聊天机器人是\"问题 → 答案\"。而智能体是\"目标 → 计划 → 行动 → 结果\"。",
    },
    interaction: { type: "flow", visual: "agent" },
    quiz: [
      {
        question: { en: "What does a chatbot do?", zh: "聊天机器人做什么？" },
        options: [
          { en: "Question → Answer", zh: "问题 → 答案" },
          { en: "Goal → Plan → Actions → Result", zh: "目标 → 计划 → 行动 → 结果" },
        ],
        correctIndex: 0,
        explain: { en: "A chatbot responds to one message at a time.", zh: "聊天机器人一次回应一条消息。" },
      },
      {
        question: { en: "What does an AI agent do?", zh: "AI智能体做什么？" },
        options: [
          { en: "Goal → Plan → Actions → Result", zh: "目标 → 计划 → 行动 → 结果" },
          { en: "Question → Answer, and nothing more", zh: "问题 → 答案，仅此而已" },
        ],
        correctIndex: 0,
        explain: { en: "An agent plans and takes multiple actions toward a goal.", zh: "智能体会制定计划，并采取多个行动来达成目标。" },
      },
    ],
    challenge: {
      en: "Imagine an AI agent whose goal is \"plan a birthday party.\" List 3 tools it might need to use.",
      zh: "想象一个AI智能体，它的目标是\"筹备一场生日派对\"。列出它可能需要用到的3种工具。",
    },
    xp: 100,
  },
  {
    id: "w9-l2",
    week: 9,
    index: 2,
    title: { en: "Chatbot vs Agent", zh: "聊天机器人 对比 智能体" },
    hook: { en: "If you asked an agent to 'find the weather and write me a poem about it,' what would it need to do?", zh: "如果你让一个智能体\"查一下天气，然后写一首关于天气的诗给我\"，它需要做些什么？" },
    vocabulary: [],
    visual: "agent",
    explanation: {
      en: "To handle a multi-step goal like that, an agent would plan: (1) use a weather tool, (2) read the result, (3) write a poem based on it, (4) check the poem mentions the weather correctly. Each step uses the result of the last one — that's what makes it an agent instead of a single answer.",
      zh: "要完成这样一个多步骤的目标，智能体会这样计划：(1) 使用天气工具查询，(2) 读取结果，(3) 根据结果写一首诗，(4) 检查诗里是否正确提到了天气。每一步都用到了上一步的结果——这正是它区别于单次回答的地方。",
    },
    interaction: {
      type: "choice",
      prompt: { en: "Which task is a better fit for an AI agent rather than a simple chatbot?", zh: "下面哪个任务更适合用AI智能体，而不是简单的聊天机器人？" },
      options: [
        { en: "\"What's the capital of France?\"", zh: "\"法国的首都是哪里？\"" },
        { en: "\"Research three vacation spots, compare their prices, and suggest the best one.\"", zh: "\"研究三个度假地点，比较它们的价格，然后推荐最好的一个。\"" },
      ],
      correctIndex: 1,
      explain: { en: "That task needs multiple steps and tools — planning, comparing, deciding — which is agent territory.", zh: "这个任务需要多个步骤和工具——计划、比较、决定——这正是智能体擅长的。" },
    },
    quiz: [
      {
        question: { en: "Why does a multi-step task suit an agent better than a chatbot?", zh: "为什么多步骤的任务更适合智能体，而不是聊天机器人？" },
        options: [
          { en: "An agent can plan, act, check results, and decide next steps", zh: "智能体能计划、行动、检查结果，并决定下一步" },
          { en: "Chatbots are always smarter", zh: "聊天机器人总是更聪明" },
        ],
        correctIndex: 0,
        explain: { en: "Agents are built to handle sequences of actions toward a goal.", zh: "智能体天生就是为了处理一系列朝着目标推进的行动而设计的。" },
      },
    ],
    challenge: {
      en: "Write a goal for an AI agent (like \"plan my week of homework\") and list the steps it would need to take.",
      zh: "写一个给AI智能体的目标（比如\"帮我规划这周的作业安排\"），并列出它需要采取的步骤。",
    },
    xp: 100,
  },
];
