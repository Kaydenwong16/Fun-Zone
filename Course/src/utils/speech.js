// ---------------------------------------------------------------------------
// Browser-native speech: window.speechSynthesis for narration (EN/ZH/bilingual)
// and the Web Speech Recognition API for "Talk to Teacher" voice input.
// No external audio service required for Version 1; a recorded-audio service
// can later slot in behind speak() without changing call sites.
// ---------------------------------------------------------------------------

let voicesCache = [];

function loadVoices() {
  if (!("speechSynthesis" in window)) return [];
  const voices = window.speechSynthesis.getVoices();
  if (voices.length) voicesCache = voices;
  return voicesCache;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

export function speechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function pickVoice(lang) {
  const voices = voicesCache.length ? voicesCache : loadVoices();
  if (lang === "zh") {
    return (
      voices.find((v) => v.lang?.toLowerCase().startsWith("zh")) ||
      voices.find((v) => /chinese|mandarin/i.test(v.name)) ||
      null
    );
  }
  return (
    voices.find((v) => v.lang?.toLowerCase().startsWith("en")) ||
    voices.find((v) => /english/i.test(v.name)) ||
    null
  );
}

/**
 * Speak a piece of bilingual text.
 * mode: 'en' | 'zh' | 'bi'
 * text: { en, zh }
 */
export function speak(text, mode = "en", { onEnd } = {}) {
  if (!speechSupported() || !text) return () => {};
  window.speechSynthesis.cancel();

  const utterances = [];
  if (mode === "en" || mode === "bi") {
    if (text.en) {
      const u = new SpeechSynthesisUtterance(text.en);
      u.lang = "en-US";
      u.rate = 0.98;
      const v = pickVoice("en");
      if (v) u.voice = v;
      utterances.push(u);
    }
  }
  if (mode === "zh" || mode === "bi") {
    if (text.zh) {
      const u = new SpeechSynthesisUtterance(text.zh);
      u.lang = "zh-CN";
      u.rate = 0.95;
      const v = pickVoice("zh");
      if (v) u.voice = v;
      utterances.push(u);
    }
  }

  utterances.forEach((u, i) => {
    if (i === utterances.length - 1 && onEnd) u.onend = onEnd;
  });
  utterances.forEach((u) => window.speechSynthesis.speak(u));

  return () => window.speechSynthesis.cancel();
}

export function stopSpeaking() {
  if (speechSupported()) window.speechSynthesis.cancel();
}

export function isSpeaking() {
  return speechSupported() && window.speechSynthesis.speaking;
}

// ---- speech recognition (voice input) ---------------------------------

export function recognitionSupported() {
  return typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
}

/**
 * Start listening once. Calls onResult(transcript) or onError(message).
 * Returns a stop() function.
 */
export function listenOnce({ lang = "en-US", onResult, onError, onEnd } = {}) {
  const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Ctor) {
    onError?.("not-supported");
    return () => {};
  }
  const recognition = new Ctor();
  recognition.lang = lang;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results?.[0]?.[0]?.transcript ?? "";
    onResult?.(transcript);
  };
  recognition.onerror = (event) => {
    onError?.(event.error || "unknown");
  };
  recognition.onend = () => {
    onEnd?.();
  };

  try {
    recognition.start();
  } catch {
    onError?.("start-failed");
  }

  return () => {
    try {
      recognition.stop();
    } catch {
      /* noop */
    }
  };
}
