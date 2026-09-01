export const WEEK11_LESSONS = [
  {
    id: "w11-l1",
    week: 11,
    index: 1,
    title: { en: "Debugging Like a Builder", zh: "像建造者一样调试" },
    hook: { en: "Your code just broke. Now what?", zh: "你的代码突然坏了。接下来该怎么办？" },
    vocabulary: ["Debug", "Bug"],
    visual: "debug",
    explanation: {
      en: "Errors are not failure — errors are information. The debugging loop is: Code → Run → Error → Ask AI → Understand → Fix → Run Again. A bug is just a mistake in code that makes it behave unexpectedly. Every real programmer debugs constantly — it's a normal, healthy part of building.",
      zh: "错误不是失败——错误是有用的信息。调试的流程是：代码 → 运行 → 错误 → 询问AI → 理解 → 修复 → 再次运行。Bug只是代码里的一个小毛病，会让程序表现得和预期不一样。每个真正的程序员都在不断地调试——这是构建过程中正常又健康的一部分。",
    },
    interaction: { type: "flow", visual: "debug" },
    quiz: [
      {
        question: { en: "What should you think when your code shows an error?", zh: "当你的代码出现错误时，你该怎么想？" },
        options: [
          { en: "\"This is information that will help me fix it.\"", zh: "\"这是能帮我修好它的有用信息。\"" },
          { en: "\"I'm terrible at this, I should give up.\"", zh: "\"我太差劲了，应该放弃。\"" },
        ],
        correctIndex: 0,
        explain: { en: "Treating errors as information — not failure — is the mindset every builder needs.", zh: "把错误当作信息而不是失败，这是每个建造者都需要的心态。" },
      },
      {
        question: { en: "What comes right after \"Ask AI\" in the debugging loop?", zh: "在调试流程中，\"询问AI\"之后是什么？" },
        options: [
          { en: "Understand why it broke", zh: "理解它为什么坏了" },
          { en: "Delete the whole project", zh: "删除整个项目" },
        ],
        correctIndex: 0,
        explain: { en: "Understanding comes before fixing — otherwise you might fix the wrong thing.", zh: "先理解再修复——不然你可能会改错地方。" },
      },
    ],
    challenge: {
      en: "Open the Coding Lab, write JavaScript with a small mistake on purpose (like a typo in a variable name), run it, read the error, then fix it.",
      zh: "打开编程实验室，故意写一段有小错误的JavaScript代码（比如变量名打错字），运行它，读懂错误信息，然后修好它。",
    },
    xp: 100,
  },
  {
    id: "w11-l2",
    week: 11,
    index: 2,
    title: { en: "AI Safety", zh: "AI安全" },
    hook: { en: "What should you never share with an AI, or anyone online?", zh: "有什么东西是你永远不应该告诉AI或网上任何人的？" },
    vocabulary: [],
    visual: "safety",
    explanation: {
      en: "Never share passwords or private information. Don't trust every AI answer — check important facts. Ask an adult before using a new AI service or sharing photos. Don't copy code or text from AI without understanding it. And never use AI to hurt, trick, or embarrass someone. Being a good builder means being a responsible one.",
      zh: "永远不要分享密码或私人信息。不要盲目相信AI的每个答案——重要事实要核实。使用新的AI服务或分享照片前要先问问大人。没理解AI生成的代码或文字之前，不要直接复制使用。永远不要用AI去伤害、欺骗或让别人难堪。做一个好的建造者，也意味着做一个负责任的人。",
    },
    interaction: { type: "flow", visual: "safety" },
    quiz: [
      {
        question: { en: "Should you share your password with an AI chatbot?", zh: "你应该把密码告诉AI聊天机器人吗？" },
        options: [
          { en: "No, never", zh: "不，永远不要" },
          { en: "Yes, if it asks nicely", zh: "如果它问得客气，就可以" },
        ],
        correctIndex: 0,
        explain: { en: "Passwords and private information should never be shared with AI or online.", zh: "密码和私人信息永远不应该分享给AI或网络上的人。" },
      },
      {
        question: { en: "What should you do before using code AI wrote for you?", zh: "在使用AI帮你写的代码之前，你该做什么？" },
        options: [
          { en: "Understand what it does first", zh: "先理解它的作用" },
          { en: "Nothing — just copy and paste it blindly", zh: "什么都不用做——直接盲目复制粘贴" },
        ],
        correctIndex: 0,
        explain: { en: "Understanding before using keeps you in control of your own project.", zh: "先理解再使用，能让你真正掌控自己的项目。" },
      },
    ],
    challenge: {
      en: "Write down 3 AI safety rules in your own words and share them with a family member.",
      zh: "用你自己的话写下3条AI安全规则，分享给家人听。",
    },
    xp: 100,
  },
];
