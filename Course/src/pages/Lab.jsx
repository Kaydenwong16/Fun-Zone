import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { getProjects, saveProject } from "../utils/storage.js";
import CodePlayground from "../components/CodePlayground.jsx";

const STARTER = {
  html: "<h1>Hello, Builder!</h1>\n<p>Start typing to change this page.</p>\n<button onclick=\"sayHi()\">Click me</button>",
  css: "h1 {\n  color: #4c6fff;\n}\n\nbutton {\n  padding: 10px 18px;\n  border-radius: 10px;\n  border: none;\n  background: #4c6fff;\n  color: white;\n  font-weight: 700;\n  cursor: pointer;\n}",
  js: "function sayHi() {\n  alert('Hi from your code!');\n}",
};

export default function Lab() {
  const { t } = useLanguage();
  const saved = getProjects()["coding-lab-freeplay"];
  const [key, setKey] = useState(0);

  const startFresh = () => {
    // clearing is handled by CodePlayground's own Reset button using initial values;
    // this just forces a full remount back to the starter snippet.
    setKey((k) => k + 1);
  };

  return (
    <div className="page lab-page animate-in">
      <h1 className="page-title">
        <span className="en">Coding Lab</span> <span className="zh">编程实验室</span>
      </h1>
      <p className="page-subtitle">
        {t({ en: "Write HTML, CSS and JavaScript and see it come to life instantly.", zh: "写下HTML、CSS和JavaScript，立刻看到它变成现实。" })}
      </p>
      <div className="lab-toolbar">
        <button type="button" className="btn btn-secondary btn-sm" onClick={startFresh}>
          🆕 {t({ en: "New Blank Project", zh: "新建空白项目" })}
        </button>
      </div>
      <CodePlayground
        key={key}
        initialHtml={saved?.html ?? STARTER.html}
        initialCss={saved?.css ?? STARTER.css}
        initialJs={saved?.js ?? STARTER.js}
        variant="full"
        height={420}
        onChange={(state) => saveProject("coding-lab-freeplay", state)}
      />
    </div>
  );
}
