import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { saveProject, getProjects } from "../utils/storage.js";

/**
 * Non-graded "pick one" chooser — used where the spec wants the child to
 * choose their own project (Week 10 AI app, Week 12 final project) rather
 * than answer a right/wrong question. Persists the choice via storage.js
 * under `projectId` so it survives a refresh.
 */
export default function PickOne({ prompt, options, projectId }) {
  const { t } = useLanguage();
  const [picked, setPicked] = useState(() => getProjects()[projectId]?.choice ?? null);

  const pick = (key) => {
    setPicked(key);
    saveProject(projectId, { choice: key });
  };

  return (
    <div className="pick-one card card-pad">
      <p className="choice-prompt">{t(prompt)}</p>
      <div className="pick-grid">
        {options.map((opt) => (
          <button
            key={opt.key}
            type="button"
            className={`pick-card ${picked === opt.key ? "is-picked" : ""}`}
            onClick={() => pick(opt.key)}
          >
            <span className="pick-icon">{opt.icon}</span>
            <span className="pick-title">{t(opt.title)}</span>
            <span className="pick-desc">{t(opt.description)}</span>
          </button>
        ))}
      </div>
      {picked && (
        <p className="pick-confirm">
          ✓ {t({ en: "Great choice! You picked:", zh: "很棒的选择！你选的是：" })}{" "}
          <strong>{t(options.find((o) => o.key === picked)?.title)}</strong>
        </p>
      )}
    </div>
  );
}
