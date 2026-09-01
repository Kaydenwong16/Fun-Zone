export const WEEK6_LESSONS = [
  {
    id: "w6-l1",
    week: 6,
    index: 1,
    title: { en: "What Is Data?", zh: "什么是数据？" },
    hook: { en: "Where does AI actually get all the knowledge it seems to have?", zh: "AI看起来懂得很多，这些\"知识\"到底是从哪来的？" },
    vocabulary: ["Data", "Database"],
    visual: "data",
    explanation: {
      en: "Data is raw information — numbers, words, pictures, sounds — that gets organized so a computer can use it. A database is a place a program stores information. AI models are trained on huge amounts of data; the quality and amount of that data is a big part of why some AI is better than others.",
      zh: "数据是原始信息——数字、文字、图片、声音——经过整理后可以被电脑使用。数据库是程序用来存放信息的地方。AI模型是用大量数据训练出来的；数据的质量和数量，正是有些AI比其他AI更厉害的重要原因之一。",
    },
    interaction: { type: "flow", visual: "data" },
    quiz: [
      {
        question: { en: "What is data?", zh: "什么是数据？" },
        options: [
          { en: "Raw information a computer can learn from or store", zh: "电脑可以学习或存储的原始信息" },
          { en: "A type of AI robot", zh: "一种AI机器人" },
          { en: "A programming error", zh: "一种编程错误" },
        ],
        correctIndex: 0,
        explain: { en: "Data is information — numbers, text, images, sounds — organized for a computer.", zh: "数据是信息——数字、文字、图片、声音——经过整理后供电脑使用。" },
      },
    ],
    challenge: {
      en: "List 5 pieces of data your favorite app might collect (like a game's score, or a photo app's picture count).",
      zh: "列出你最喜欢的App可能会收集的5种数据（比如游戏的分数，或相册软件里的照片数量）。",
    },
    xp: 75,
  },
  {
    id: "w6-l2",
    week: 6,
    index: 2,
    title: { en: "What Is an API?", zh: "什么是API？" },
    hook: { en: "How does an app on your phone get information from somewhere else on the internet?", zh: "你手机上的App是怎么从网上别的地方获取信息的？" },
    vocabulary: ["API"],
    visual: "api",
    explanation: {
      en: "An API (Application Programming Interface) lets one program talk to another. Think of a restaurant: you (the app) tell the waiter (the API) what you want, the waiter carries your order to the kitchen (the server), and brings your food (the answer) back. You never have to know how the kitchen actually works.",
      zh: "API（应用程序接口）让一个程序可以和另一个程序沟通。想象一家餐厅：你（应用程序）告诉服务员（API）你想要什么，服务员把订单带到厨房（服务器），然后把食物（答案）端回来给你。你完全不需要知道厨房内部是怎么运作的。",
    },
    interaction: { type: "flow", visual: "api" },
    quiz: [
      {
        question: { en: "In the restaurant analogy, what is the API?", zh: "在餐厅的比喻里，谁扮演API的角色？" },
        options: [
          { en: "The waiter", zh: "服务员" },
          { en: "The food", zh: "食物" },
          { en: "You, the customer", zh: "你，顾客" },
        ],
        correctIndex: 0,
        explain: { en: "The waiter carries requests and answers back and forth — just like an API.", zh: "服务员来回传递请求和答案——就像API一样。" },
      },
      {
        question: { en: "Why are APIs useful?", zh: "API为什么有用？" },
        options: [
          { en: "They let programs talk to each other without knowing each other's inner workings", zh: "它们让程序之间可以沟通，而不需要了解对方内部的运作方式" },
          { en: "They make computers faster at math", zh: "它们能让电脑算数更快" },
          { en: "They change screen colors", zh: "它们能改变屏幕颜色" },
        ],
        correctIndex: 0,
        explain: { en: "APIs are a clean way for separate programs to cooperate.", zh: "API是让不同程序互相配合的一种简洁方式。" },
      },
    ],
    challenge: {
      en: "Think of an app you use that shows you live information (weather, scores, maps). Guess what API it might be calling behind the scenes.",
      zh: "想一个你用过的、能显示实时信息的App（天气、比分、地图）。猜猜它背后可能调用了什么API。",
    },
    xp: 75,
  },
];
