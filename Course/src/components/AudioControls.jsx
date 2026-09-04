import { useState } from "react";
import { speak, stopSpeaking, speechSupported } from "../utils/speech.js";

/**
 * The ▶ Listen in English / ▶ 中文朗读 / ▶ English + 中文 control trio
 * used at the top of every lesson (spec §12).
 */
export default function AudioControls({ text }) {
  const [active, setActive] = useState(null);
  const supported = speechSupported();

  if (!supported) {
    return (
      <p className="audio-unsupported">
        🔇 Audio isn't supported in this browser. · 此浏览器不支持语音朗读。
      </p>
    );
  }

  const play = (mode) => {
    if (active === mode) {
      stopSpeaking();
      setActive(null);
      return;
    }
    setActive(mode);
    speak(text, mode, { onEnd: () => setActive(null) });
  };

  const modes = [
    { key: "en", label: "Listen in English" },
    { key: "zh", label: "中文朗读" },
    { key: "bi", label: "English + 中文" },
  ];

  return (
    <div className="audio-controls" role="group" aria-label="Audio narration">
      {modes.map((m) => (
        <button
          key={m.key}
          type="button"
          className={`audio-chip ${active === m.key ? "is-playing" : ""}`}
          onClick={() => play(m.key)}
        >
          {active === m.key ? "⏸" : "▶"} {m.label}
        </button>
      ))}
    </div>
  );
}
