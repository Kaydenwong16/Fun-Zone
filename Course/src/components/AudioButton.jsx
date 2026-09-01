import { useEffect, useState } from "react";
import { speak, stopSpeaking, speechSupported } from "../utils/speech.js";

/**
 * A single "listen" button for one bilingual { en, zh } text, speaking it in
 * the given mode ('en' | 'zh' | 'bi'). Used inline next to short snippets
 * (an AI answer, a quiz explanation) — see AudioControls for the full
 * English / 中文 / Bilingual trio used at lesson level.
 */
export default function AudioButton({ text, mode = "en", label, size = "md" }) {
  const [playing, setPlaying] = useState(false);
  const supported = speechSupported();

  useEffect(() => () => stopSpeaking(), []);

  if (!supported) return null;

  const toggle = () => {
    if (playing) {
      stopSpeaking();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    speak(text, mode, { onEnd: () => setPlaying(false) });
  };

  return (
    <button
      type="button"
      className={`audio-btn ${size === "sm" ? "audio-btn-sm" : ""} ${playing ? "is-playing" : ""}`}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={label || (playing ? "Stop audio" : "Play audio")}
    >
      {playing ? "⏸" : "🔊"} {label}
    </button>
  );
}
