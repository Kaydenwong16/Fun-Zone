export const WEEK8_LESSONS = [
  {
    id: "w8-l1",
    week: 8,
    index: 1,
    title: { en: "Computer Vision — AI Can See", zh: "计算机视觉——AI能看懂图片" },
    hook: { en: "How does your phone know which photo has your dog in it?", zh: "你的手机是怎么知道哪张照片里有你家的狗的？" },
    vocabulary: ["Computer Vision"],
    visual: "computer-vision",
    explanation: {
      en: "Computer vision is AI that understands what's inside a picture. A model is trained on millions of labeled images, learns visual patterns (edges, shapes, colors), and can then predict what's in a brand-new picture — recognizing objects, faces, or even handwriting.",
      zh: "计算机视觉是能看懂图片内容的AI。模型会用数百万张标注过的图片进行训练，学会视觉规律（边缘、形状、颜色），然后就能预测全新图片里有什么——识别物体、人脸，甚至手写字。",
    },
    interaction: { type: "flow", visual: "computer-vision" },
    quiz: [
      {
        question: { en: "What is computer vision?", zh: "什么是计算机视觉？" },
        options: [
          { en: "AI that understands what's inside images", zh: "能看懂图片内容的AI" },
          { en: "A pair of glasses for computers", zh: "给电脑戴的眼镜" },
          { en: "A type of monitor screen", zh: "一种显示器" },
        ],
        correctIndex: 0,
        explain: { en: "Computer vision models are trained specifically to understand images.", zh: "计算机视觉模型专门被训练用来理解图片。" },
      },
      {
        question: { en: "What does a computer vision model learn from?", zh: "计算机视觉模型是从什么中学习的？" },
        options: [
          { en: "Millions of labeled images", zh: "数百万张标注过的图片" },
          { en: "Nothing — it just guesses randomly", zh: "什么都没有——只是随机猜测" },
        ],
        correctIndex: 0,
        explain: { en: "Just like other AI, it learns patterns from lots of examples — in this case, images.", zh: "和其他AI一样，它是从大量例子中学习规律的——这里的例子是图片。" },
      },
    ],
    challenge: {
      en: "Name three apps or devices that use computer vision (hint: think cameras, photo apps, and security).",
      zh: "说出三个使用计算机视觉的App或设备（提示：想想相机、相册软件和安防设备）。",
    },
    xp: 75,
  },
  {
    id: "w8-l2",
    week: 8,
    index: 2,
    title: { en: "Multimodal AI", zh: "多模态人工智能" },
    hook: { en: "Can one AI understand pictures, sound, and text all at once?", zh: "一个AI能不能同时理解图片、声音和文字？" },
    vocabulary: ["Multimodal AI"],
    visual: "multimodal",
    explanation: {
      en: "Multimodal AI can work with more than one kind of information at once — text, images, audio, and video. This means you could show it a photo and ask a question about it in text, or describe a sound and ask what it might be.",
      zh: "多模态人工智能能同时处理不止一种信息——文字、图片、音频和视频。这意味着你可以给它看一张照片，然后用文字问它问题，或者描述一种声音，问问它可能是什么。",
    },
    interaction: { type: "flow", visual: "multimodal" },
    quiz: [
      {
        question: { en: "What makes AI \"multimodal\"?", zh: "是什么让AI变得\"多模态\"？" },
        options: [
          { en: "It can work with more than one type of information (text, image, audio, video)", zh: "它能处理不止一种类型的信息（文字、图片、音频、视频）" },
          { en: "It runs on more than one computer", zh: "它运行在不止一台电脑上" },
        ],
        correctIndex: 0,
        explain: { en: "\"Modal\" refers to a type/mode of information — multimodal means many modes.", zh: "\"模态\"指的是信息的一种类型/方式——多模态就是多种方式。" },
      },
    ],
    challenge: {
      en: "Describe a situation where an AI would need both an image and text together to answer well.",
      zh: "描述一个AI需要同时用到图片和文字才能好好回答的场景。",
    },
    xp: 75,
  },
];
