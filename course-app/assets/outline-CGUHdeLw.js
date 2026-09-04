import{i as e,l as t,n,r,t as i,u as a}from"./missions-rpzq9KDC.js";function o(e){return e?`<span class="en">${e.en}</span><span class="zh">${e.zh}</span>`:``}function s(e){let t=a.find(t=>t.number===e),i=r[e]||[],s=n(e);return`
    <div class="outline-week card card-pad">
      <div class="outline-week-head">
        <span class="pill pill-blue">${o({en:`Week ${e} · Day ${e}`,zh:`第${e}周 · 第${e}天`})}</span>
        <h3>${o(t.title)}</h3>
      </div>

      <h4 class="outline-subhead">${o({en:`Lessons`,zh:`课程`})}</h4>
      <ol class="outline-lesson-list">
        ${i.map(e=>`
          <li>
            <p class="outline-lesson-title">${o(e.title)}</p>
            <p class="outline-lesson-hook">${o(e.hook)}</p>
          </li>`).join(``)}
      </ol>

      ${s?`
      <h4 class="outline-subhead">${o({en:`Mission`,zh:`任务`})}</h4>
      <div class="outline-mission">
        <p class="outline-mission-title">${o(s.title)} <span class="pill pill-amber">+${s.xp} XP</span></p>
        <p class="outline-mission-desc">${o(s.description)}</p>
      </div>`:``}
    </div>`}function c(e){return`
    <section class="outline-level">
      <div class="roadmap-level-head">
        <span class="pill pill-purple">${o({en:`LEVEL ${e.number}`,zh:`等级 ${e.number}`})}</span>
        <h2>${o(e.name)}</h2>
      </div>
      <div class="outline-weeks">
        ${e.weeks.map(s).join(``)}
      </div>
    </section>`}function l(){let n=document.getElementById(`outline-root`);n.innerHTML=`
    <div class="outline-page">
      <header class="outline-header">
        <div class="outline-header-inner container">
          <a href="./" class="brand" aria-label="Back to AI Builder Kids">
            <span class="brand-mark">🤖</span>
            <span class="brand-text"><span class="en">AI Builder Kids</span></span>
          </a>
          <button type="button" class="btn btn-secondary btn-sm no-print" onclick="window.print()">
            🖨️ <span class="en">Print</span><span class="zh">打印</span>
          </button>
        </div>
      </header>

      <main class="container outline-main">
        <h1 class="page-title">
          <span class="en">Course Outline</span> <span class="zh">课程大纲</span>
        </h1>
        <p class="page-subtitle">
          ${o({en:`12 weeks, one lesson day each · ${e} lessons · ${i.length} missions`,zh:`共12周，每周一个学习日 · ${e}节课 · ${i.length}个任务`})}
        </p>

        ${t.map(c).join(``)}

        <p class="outline-footer-note">
          ${o({en:`This is a read-only overview for parents — no login needed. Your child's own progress lives in the app.`,zh:`这是给家长查看的只读概览——无需登录。孩子的实际进度保存在应用内。`})}
        </p>
      </main>
    </div>`}l();