// Core technical vocabulary taught throughout the program (spec §4).
// Each entry can carry an optional child-friendly example shown the first
// time a term is introduced in a lesson.

export const VOCABULARY = [
  { en: "AI", zh: "人工智能", example: { en: "A computer program that learns from examples.", zh: "一种能从例子中学习的电脑程序。" } },
  { en: "Artificial Intelligence", zh: "人工智能" },
  { en: "Prompt", zh: "提示词", example: { en: "What you type or say to ask AI for something.", zh: "你输入或说出的话，用来向AI提出请求。" } },
  { en: "Data", zh: "数据", example: { en: "Examples and information a computer can learn from.", zh: "电脑可以用来学习的例子和信息。" } },
  { en: "Model", zh: "模型", example: { en: "What AI builds after learning from lots of data.", zh: "AI从大量数据中学习后建立的东西。" } },
  { en: "Training", zh: "训练", example: { en: "Showing an AI model many examples so it learns.", zh: "给AI模型看很多例子，让它学会。" } },
  { en: "Algorithm", zh: "算法", example: { en: "A step-by-step set of instructions.", zh: "一步一步的指令。" } },
  { en: "Code", zh: "代码", example: { en: "Instructions written for a computer.", zh: "写给电脑的指令。" } },
  { en: "Program", zh: "程序" },
  { en: "Variable", zh: "变量", example: { en: "A named box that stores a value.", zh: "一个用来存放数值的\"盒子\"，有自己的名字。" } },
  { en: "Function", zh: "函数", example: { en: "A reusable block of instructions with a name.", zh: "一段有名字、可以重复使用的指令。" } },
  { en: "API", zh: "应用程序接口", example: { en: "A way for two programs to talk to each other.", zh: "两个程序互相沟通的方式。" } },
  { en: "Machine Learning", zh: "机器学习", example: { en: "Teaching computers to find patterns instead of writing every rule by hand.", zh: "让电脑自己找规律，而不是把每条规则都写出来。" } },
  { en: "Neural Network", zh: "神经网络", example: { en: "A model design inspired loosely by how brains connect ideas.", zh: "一种模仿大脑连接方式设计的模型。" } },
  { en: "Computer Vision", zh: "计算机视觉", example: { en: "AI that understands what's inside a picture.", zh: "能看懂图片内容的AI。" } },
  { en: "Multimodal AI", zh: "多模态人工智能", example: { en: "AI that can work with text, images, audio and video together.", zh: "能同时处理文字、图片、声音和视频的AI。" } },
  { en: "Agent", zh: "AI智能体", example: { en: "An AI that plans and takes actions to reach a goal.", zh: "能自己制定计划并采取行动来完成目标的AI。" } },
  { en: "Debug", zh: "调试", example: { en: "Finding and fixing a problem in code.", zh: "找到并修好代码里的问题。" } },
  { en: "Bug", zh: "程序错误", example: { en: "A mistake in code that makes it behave wrong.", zh: "代码中让程序出错的小毛病。" } },
  { en: "Website", zh: "网站" },
  { en: "App", zh: "应用程序" },
  { en: "Database", zh: "数据库", example: { en: "A place where a program stores information.", zh: "程序用来存放信息的地方。" } },
];

export function findVocab(en) {
  return VOCABULARY.find((v) => v.en.toLowerCase() === en.toLowerCase());
}
