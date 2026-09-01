import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { askTeacher } from "../utils/simulateAI.js";

function buildSrcDoc(html, css, js) {
  return `<!doctype html><html><head><meta charset="utf-8"/><style>
  body{font-family:-apple-system,Segoe UI,Manrope,sans-serif;margin:16px;color:#10182b;}
  ${css}
  </style></head><body>${html}
  <script>
  window.onerror = function (msg) {
    parent.postMessage({ abkPreviewError: String(msg) }, "*");
    return true;
  };
  try { ${js} } catch (e) { parent.postMessage({ abkPreviewError: String(e.message || e) }, "*"); }
  </script>
  </body></html>`;
}

const TABS = [
  { key: "html", label: "HTML" },
  { key: "css", label: "CSS" },
  { key: "js", label: "JavaScript" },
];

/**
 * Shared HTML/CSS/JS editor + live preview. Used both as the full Coding
 * Lab (spec §15, variant="full") and as small inline before/after demos
 * embedded in lessons (variant="inline"). The preview iframe is sandboxed
 * (scripts only, no same-origin) so child-written code can't touch the app.
 */
export default function CodePlayground({
  initialHtml = "",
  initialCss = "",
  initialJs = "",
  variant = "full",
  height = 220,
  onChange,
  showAIHelp = true,
}) {
  const { t } = useLanguage();
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [tab, setTab] = useState("html");
  const [runKey, setRunKey] = useState(0);
  const [runtimeError, setRuntimeError] = useState(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpText, setHelpText] = useState(null);
  const iframeRef = useRef(null);

  const srcDoc = useMemo(() => buildSrcDoc(html, css, js), [html, css, js]);

  useEffect(() => {
    onChange?.({ html, css, js });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, css, js]);

  useEffect(() => {
    function onMessage(e) {
      if (e.data && typeof e.data.abkPreviewError === "string") {
        setRuntimeError(e.data.abkPreviewError);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const run = () => {
    setRuntimeError(null);
    setRunKey((k) => k + 1);
  };

  const reset = () => {
    setHtml(initialHtml);
    setCss(initialCss);
    setJs(initialJs);
    setRuntimeError(null);
    setRunKey((k) => k + 1);
  };

  const askAI = () => {
    const context = runtimeError
      ? `error: ${runtimeError}`
      : `${tab} not working`;
    setHelpText(askTeacher(context));
    setHelpOpen(true);
  };

  const setForTab = (val) => {
    if (tab === "html") setHtml(val);
    else if (tab === "css") setCss(val);
    else setJs(val);
  };
  const valueForTab = tab === "html" ? html : tab === "css" ? css : js;

  return (
    <div className={`code-playground ${variant === "inline" ? "is-inline" : "is-full"}`}>
      <div className="code-playground-grid">
        <div className="code-editor-pane">
          {variant === "full" && (
            <div className="code-tabs" role="tablist">
              {TABS.map((tb) => (
                <button
                  key={tb.key}
                  role="tab"
                  aria-selected={tab === tb.key}
                  className={`code-tab ${tab === tb.key ? "is-active" : ""}`}
                  onClick={() => setTab(tb.key)}
                  type="button"
                >
                  {tb.label}
                </button>
              ))}
            </div>
          )}
          {variant === "inline" ? (
            <>
              <div className="code-tabs code-tabs-inline">
                {TABS.map((tb) => (
                  <button
                    key={tb.key}
                    className={`code-tab ${tab === tb.key ? "is-active" : ""}`}
                    onClick={() => setTab(tb.key)}
                    type="button"
                  >
                    {tb.label}
                  </button>
                ))}
              </div>
              <textarea
                className="code-textarea"
                style={{ height }}
                value={valueForTab}
                spellCheck={false}
                onChange={(e) => setForTab(e.target.value)}
              />
            </>
          ) : (
            <textarea
              className="code-textarea"
              style={{ height }}
              value={valueForTab}
              spellCheck={false}
              onChange={(e) => setForTab(e.target.value)}
            />
          )}
          <div className="code-actions">
            <button type="button" className="btn btn-primary btn-sm" onClick={run}>
              ▶ {t({ en: "Run", zh: "运行" })}
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={reset}>
              ↺ {t({ en: "Reset", zh: "重置" })}
            </button>
            {showAIHelp && (
              <button type="button" className="btn btn-ghost btn-sm" onClick={askAI}>
                🤖 {t({ en: "Ask AI for Help", zh: "向AI求助" })}
              </button>
            )}
          </div>
          {helpOpen && helpText && (
            <div className="ai-help-note animate-in">
              <button className="ai-help-close" onClick={() => setHelpOpen(false)} aria-label="Close">
                ×
              </button>
              <strong>🤖 {t({ en: "AI Teacher", zh: "AI老师" })}</strong>
              <p>{t(helpText)}</p>
            </div>
          )}
        </div>
        <div className="code-preview-pane">
          <div className="code-preview-label">{t({ en: "Live Preview", zh: "实时预览" })}</div>
          <iframe
            key={runKey}
            ref={iframeRef}
            title="preview"
            className="code-preview-frame"
            style={{ height }}
            sandbox="allow-scripts"
            srcDoc={srcDoc}
          />
          {runtimeError && (
            <div className="code-error">
              {t({ en: "Something went wrong. Let's debug it together:", zh: "出了点问题，我们一起来调试吧：" })}
              <code>{runtimeError}</code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
