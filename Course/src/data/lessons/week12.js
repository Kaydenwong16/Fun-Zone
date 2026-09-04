export const WEEK12_LESSONS = [
  {
    id: "w12-l1",
    week: 12,
    index: 1,
    title: { en: "Plan Your Final Project", zh: "规划你的毕业作品" },
    hook: { en: "Ninety days of learning — what will you build to show it all off?", zh: "九十天的学习——你想做出什么来展示这一切？" },
    vocabulary: [],
    visual: "final-project",
    explanation: {
      en: "This is it — your Final Project. Choose an idea you're genuinely excited about, using anything you've learned: HTML/CSS/JS, Python logic, data, an API concept, a chatbot, or an AI agent idea. Start by describing what it does, in your own words, before writing any code.",
      zh: "终于到了——你的毕业作品。选一个你真正感兴趣的想法，用上你学过的任何东西：HTML/CSS/JS、Python逻辑、数据、API的概念、聊天机器人，或者AI智能体的想法。在写任何代码之前，先用你自己的话描述它会做什么。",
    },
    interaction: {
      type: "pickone",
      projectId: "final-project",
      prompt: { en: "What kind of final project excites you most?", zh: "哪种类型的毕业作品最让你兴奋？" },
      options: [
        { key: "game", icon: "🎮", title: { en: "A Game", zh: "一个游戏" }, description: { en: "Combine everything from Weeks 3–4.", zh: "结合第3-4周学到的一切。" } },
        { key: "chatbot2", icon: "💬", title: { en: "A Chatbot", zh: "一个聊天机器人" }, description: { en: "Build on Week 7's chatbot ideas.", zh: "在第7周的聊天机器人想法上继续发展。" } },
        { key: "aiapp", icon: "🤖", title: { en: "An AI App", zh: "一个AI应用" }, description: { en: "Extend your Week 10 project.", zh: "扩展你第10周做的项目。" } },
        { key: "website2", icon: "🌐", title: { en: "An Interactive Website", zh: "一个互动网站" }, description: { en: "A polished version of your Week 2 site.", zh: "第2周网站的升级版。" } },
      ],
    },
    quiz: [
      {
        question: { en: "What should you do before writing any code for your final project?", zh: "在给毕业作品写代码之前，你应该先做什么？" },
        options: [
          { en: "Describe what it does, in your own words", zh: "用你自己的话描述它的功能" },
          { en: "Start typing code immediately with no plan", zh: "没有任何计划，立刻开始打字写代码" },
        ],
        correctIndex: 0,
        explain: { en: "A clear description is your plan — it guides both you and AI.", zh: "清楚的描述就是你的计划——它会指引你和AI接下来的方向。" },
      },
    ],
    challenge: {
      en: "Write a one-paragraph description of your final project idea: what it does and why you picked it.",
      zh: "用一段话描述你的毕业作品想法：它是做什么的，你为什么选择它。",
    },
    xp: 100,
  },
  {
    id: "w12-l2",
    week: 12,
    index: 2,
    title: { en: "Build, Test, Improve", zh: "构建、测试、改进" },
    hook: { en: "Version 1 is never perfect — and that's exactly the point.", zh: "第一版从来都不完美——这正是它的意义所在。" },
    vocabulary: [],
    visual: "final-project",
    explanation: {
      en: "Build your first version with AI's help, one small step at a time. Test it yourself. Find at least one bug. Fix it using the debugging loop from Week 11. Then add one more improvement. Real builders repeat build → test → debug → improve many times — you're doing exactly what professionals do.",
      zh: "在AI的帮助下构建你的第一个版本，一次一小步。自己测试它。至少找出一个bug。用第11周学的调试流程修好它。然后再加一个改进。真正的建造者会不断重复\"构建 → 测试 → 调试 → 改进\"——你现在做的，正是专业人士也在做的事。",
    },
    interaction: { type: "code", variant: "inline", initialHtml: "<h1>My Final Project</h1>\n<p>Start building here!</p>", initialCss: "", initialJs: "" },
    quiz: [
      {
        question: { en: "Is it normal for Version 1 of a project to have bugs?", zh: "第一版项目有bug正常吗？" },
        options: [
          { en: "Yes — completely normal, that's what testing is for", zh: "正常——完全正常，这正是测试的意义" },
          { en: "No — real builders never make mistakes", zh: "不正常——真正的建造者从不犯错" },
        ],
        correctIndex: 0,
        explain: { en: "Every real project goes through rounds of testing and fixing.", zh: "每个真正的项目都要经历一轮又一轮的测试和修复。" },
      },
    ],
    challenge: {
      en: "Build v1 of your final project, test it, find one bug, fix it, then add one improvement.",
      zh: "构建你毕业作品的第一版，测试它，找出一个bug，修好它，然后再加一个改进。",
    },
    xp: 150,
  },
  {
    id: "w12-l3",
    week: 12,
    index: 3,
    title: { en: "Explain & Demo", zh: "解释与展示" },
    hook: { en: "You built it. Now — can you explain it?", zh: "你把它做出来了。现在——你能把它讲清楚吗？" },
    vocabulary: [],
    visual: "final-project",
    explanation: {
      en: "Being able to explain your work is as important as building it. Prepare answers to: What did I build? How does it work? What problem does it solve? What did AI help me with? What did I learn? Then demo it to someone — a parent, a friend, anyone!",
      zh: "能把自己做的东西讲清楚，和做出来同样重要。准备好回答：我做了什么？它是怎么工作的？它解决了什么问题？AI帮助了我什么？我学到了什么？然后向别人展示它——家长、朋友，任何人都可以！",
    },
    interaction: { type: "flow", visual: "final-project" },
    quiz: [
      {
        question: { en: "Why does explaining your project matter?", zh: "为什么解释你的项目很重要？" },
        options: [
          { en: "It proves you actually understand what you built, not just copied it", zh: "它证明你真正理解自己做的东西，而不只是照抄的" },
          { en: "It doesn't matter at all", zh: "一点都不重要" },
        ],
        correctIndex: 0,
        explain: { en: "Explaining shows real understanding — the true goal of the whole program.", zh: "能解释清楚，说明你真正理解了——这正是整个课程最终的目标。" },
      },
    ],
    challenge: {
      en: "Demo your final project to a family member or friend, answering all 5 explanation questions.",
      zh: "向家人或朋友展示你的毕业作品，回答全部5个解释问题。",
    },
    xp: 250,
  },
];
