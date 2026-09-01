import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import BilingualLabel from "../BilingualLabel.jsx";

/**
 * Generic reusable interactive pipeline diagram: Concept → Process → Result.
 * Powers AIFlow / PromptFlow / DebugFlow / APIFlow / AgentFlow / CodeFlow /
 * the neural-network diagram — anywhere the spec wants a clickable stage
 * sequence with bilingual labels (spec §11, §25).
 *
 * stages: [{ key, label:{en,zh}, detail:{en,zh}, icon }]
 */
export default function FlowDiagram({ stages, title, onAllRevealed, compact = false }) {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState(() => new Set([0]));

  useEffect(() => {
    if (seen.size === stages.length) onAllRevealed?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen.size]);

  const select = (i) => {
    setActive(i);
    setSeen((prev) => new Set(prev).add(i));
  };

  return (
    <div className={`flow-diagram ${compact ? "is-compact" : ""}`}>
      {title && (
        <div className="flow-title">
          <BilingualLabel field={title} />
        </div>
      )}
      <div className="flow-row" role="list">
        {stages.map((stage, i) => (
          <div className="flow-item" key={stage.key}>
            <button
              type="button"
              role="listitem"
              className={`flow-node ${active === i ? "is-active" : ""} ${seen.has(i) ? "is-seen" : ""}`}
              onClick={() => select(i)}
              aria-pressed={active === i}
            >
              <span className="flow-icon" aria-hidden="true">
                {stage.icon}
              </span>
              <span className="flow-label">
                <span className="en">{stage.label.en}</span>
                <span className="zh">{stage.label.zh}</span>
              </span>
            </button>
            {i < stages.length - 1 && (
              <span className="flow-arrow" aria-hidden="true">
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flow-detail card animate-in" key={active}>
        <p className="flow-detail-text">{t(stages[active].detail)}</p>
      </div>
      <p className="flow-hint">{t({ en: "Tap each step to explore it.", zh: "点击每一步来了解更多。" })}</p>
    </div>
  );
}
