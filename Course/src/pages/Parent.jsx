import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { TOTAL_LESSONS } from "../data/curriculum.js";
import { TOTAL_DAYS } from "../data/weeks.js";
import { BADGES } from "../data/badges.js";
import { overallCompletionPct } from "../utils/progress.js";
import { fetchClassProgress, fetchLoginLog } from "../utils/account.js";

const TEACHER_SESSION_KEY = "abk_teacher_pw";
const LOGIN_LOG_PAGE_SIZE = 8;

function ClassProgress({ t }) {
  const [teacherPassword, setTeacherPassword] = useState(() => {
    try {
      return window.sessionStorage.getItem(TEACHER_SESSION_KEY) || "";
    } catch {
      return "";
    }
  });
  const [unlocked, setUnlocked] = useState(false);
  const [students, setStudents] = useState(null);
  const [logins, setLogins] = useState(null);
  const [hasMoreLogins, setHasMoreLogins] = useState(false);
  const [loginsBusy, setLoginsBusy] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = async (pw) => {
    setBusy(true);
    setError("");
    const [progressResult, loginResult] = await Promise.all([
      fetchClassProgress(pw),
      fetchLoginLog(pw, { limit: LOGIN_LOG_PAGE_SIZE, offset: 0 }),
    ]);
    setBusy(false);
    if (!progressResult.ok) {
      setUnlocked(false);
      setError(
        progressResult.error === "wrong-teacher-password"
          ? t({ en: "Wrong teacher passcode.", zh: "教师密码错误。" })
          : progressResult.error === "teacher-not-configured"
          ? t({
              en: "Teacher view isn't set up yet — add a TEACHER_PASSWORD environment variable in Vercel.",
              zh: "教师视图尚未设置——请在Vercel中添加TEACHER_PASSWORD环境变量。",
            })
          : t({ en: "Couldn't reach the server. Try again in a moment.", zh: "无法连接服务器，请稍后再试。" })
      );
      return;
    }
    setUnlocked(true);
    setStudents(progressResult.data.students || []);
    setLogins(loginResult.ok ? loginResult.data.logins || [] : []);
    setHasMoreLogins(loginResult.ok ? !!loginResult.data.hasMore : false);
    try {
      window.sessionStorage.setItem(TEACHER_SESSION_KEY, pw);
    } catch {
      /* ignore */
    }
  };

  const loadMoreLogins = async () => {
    setLoginsBusy(true);
    const result = await fetchLoginLog(teacherPassword, { limit: LOGIN_LOG_PAGE_SIZE, offset: (logins || []).length });
    setLoginsBusy(false);
    if (!result.ok) return;
    setLogins((prev) => [...(prev || []), ...(result.data.logins || [])]);
    setHasMoreLogins(!!result.data.hasMore);
  };

  // Auto-unlock if this tab already has the passcode from earlier.
  useEffect(() => {
    if (teacherPassword) load(teacherPassword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!unlocked) {
    return (
      <div className="card card-pad parent-block">
        <h3>{t({ en: "Teacher View 🔒", zh: "教师视图 🔒" })}</h3>
        <p className="settings-note">
          {t({
            en: "See every enrolled student's progress at a glance. Ask your administrator for the class passcode.",
            zh: "一览所有学生的学习进度。请向管理员索取班级密码。",
          })}
        </p>
        <input
          className="name-input"
          type="password"
          value={teacherPassword}
          onChange={(e) => setTeacherPassword(e.target.value)}
          placeholder={t({ en: "Teacher passcode", zh: "教师密码" })}
          style={{ marginBottom: 8, maxWidth: 260 }}
        />
        {error && <p className="auth-error">{error}</p>}
        <div>
          <button type="button" className="btn btn-primary btn-sm" disabled={busy} onClick={() => load(teacherPassword)}>
            {busy ? t({ en: "Loading…", zh: "加载中…" }) : t({ en: "View Class Progress", zh: "查看班级进度" })}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card card-pad parent-block">
        <h3>{t({ en: `Class Progress (${students.length} students)`, zh: `班级进度（${students.length}名学生）` })}</h3>
        {students.length === 0 ? (
          <p>{t({ en: "No students have created an account yet.", zh: "还没有学生创建账户。" })}</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="class-progress-table">
              <thead>
                <tr>
                  <th>{t({ en: "Name", zh: "姓名" })}</th>
                  <th>{t({ en: "Chapter", zh: "章节" })}</th>
                  <th>{t({ en: "Lessons", zh: "课程" })}</th>
                  <th>XP</th>
                  <th>{t({ en: "Streak", zh: "连续" })}</th>
                  <th>{t({ en: "Badges", zh: "徽章" })}</th>
                  <th>{t({ en: "Last Active", zh: "最近活跃" })}</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.displayName}>
                    <td>{s.displayName}</td>
                    <td>{s.currentDay}/{TOTAL_DAYS}</td>
                    <td>{s.completedLessons}/{TOTAL_LESSONS}</td>
                    <td>{s.xp}</td>
                    <td>🔥 {s.streak}</td>
                    <td>{s.badges}/{BADGES.length}</td>
                    <td>{s.lastActiveDate || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card card-pad parent-block">
        <h3>{t({ en: "Login Log", zh: "登录记录" })}</h3>
        <p className="settings-note">
          {t({
            en: "Every time a student logs in, with when — most recent first.",
            zh: "每次学生登录的记录，附带时间——最新的排在最前面。",
          })}
        </p>
        {!logins || logins.length === 0 ? (
          <p>{t({ en: "No logins recorded yet.", zh: "还没有登录记录。" })}</p>
        ) : (
          <>
            <div style={{ overflowX: "auto" }}>
              <table className="class-progress-table">
                <thead>
                  <tr>
                    <th>{t({ en: "Name", zh: "姓名" })}</th>
                    <th>{t({ en: "Logged In At", zh: "登录时间" })}</th>
                    <th>{t({ en: "Type", zh: "类型" })}</th>
                    <th>{t({ en: "Ended At", zh: "结束时间" })}</th>
                  </tr>
                </thead>
                <tbody>
                  {logins.map((entry, i) => (
                    <tr key={i}>
                      <td>{entry.name}</td>
                      <td>{new Date(entry.loginAt).toLocaleString()}</td>
                      <td>
                        {entry.isNewAccount
                          ? t({ en: "New account", zh: "新账户" })
                          : t({ en: "Returning", zh: "返回登录" })}
                      </td>
                      <td>
                        {!entry.endedAt ? (
                          t({ en: "Still active", zh: "仍在使用" })
                        ) : (
                          <>
                            {new Date(entry.endedAt).toLocaleString()}
                            {" · "}
                            {entry.endReason === "logout"
                              ? t({ en: "logged out", zh: "已退出登录" })
                              : t({ en: "became inactive", zh: "已无操作" })}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {hasMoreLogins && (
              <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: 10 }} onClick={loadMoreLogins} disabled={loginsBusy}>
                {loginsBusy ? t({ en: "Loading…", zh: "加载中…" }) : t({ en: "More", zh: "更多" })}
              </button>
            )}
          </>
        )}
      </div>

      <button type="button" className="btn btn-ghost btn-sm" style={{ marginBottom: 16 }} onClick={() => load(teacherPassword)} disabled={busy}>
        {t({ en: "Refresh", zh: "刷新" })}
      </button>
    </>
  );
}

export default function Parent() {
  const { t, profile } = useLanguage();
  const { progress, level } = useProgress();

  const skillsLearned = [
    { en: "What AI is and how it learns", zh: "什么是AI，以及它是怎么学习的" },
    { en: "Writing clear prompts", zh: "写出清楚的提示词" },
    { en: "Checking AI answers for mistakes", zh: "核实AI答案中的错误" },
    { en: "HTML, CSS and JavaScript basics", zh: "HTML、CSS和JavaScript基础" },
    { en: "Reading and fixing (debugging) code", zh: "阅读并修复（调试）代码" },
    { en: "What APIs and data are", zh: "什么是API和数据" },
  ].filter((_, i) => progress.completedLessons.length > i * 3);

  return (
    <div className="page parent-page animate-in">
      <h1 className="page-title">
        <span className="en">Parent &amp; Teacher Dashboard</span> <span className="zh">家长与教师面板</span>
      </h1>
      <p className="page-subtitle">
        {t({ en: "Progress summaries — for this device, or the whole class.", zh: "进度总览——本设备，或整个班级。" })}
      </p>

      <ClassProgress t={t} />

      <h2 className="parent-section-title">
        {t({ en: `This device: ${profile.name || "your builder"}`, zh: `本设备：${profile.name || "小建造者"}` })}
      </h2>

      <div className="parent-stats-grid">
        <div className="card card-pad parent-stat">
          <span className="dash-stat-num">{progress.currentDay}/{TOTAL_DAYS}</span>
          <span className="dash-stat-label">{t({ en: "Chapters Completed", zh: "已完成章节" })}</span>
        </div>
        <div className="card card-pad parent-stat">
          <span className="dash-stat-num">{progress.completedLessons.length}/{TOTAL_LESSONS}</span>
          <span className="dash-stat-label">{t({ en: "Lessons Completed", zh: "已完成课程" })}</span>
        </div>
        <div className="card card-pad parent-stat">
          <span className="dash-stat-num">{progress.xp}</span>
          <span className="dash-stat-label">XP</span>
        </div>
        <div className="card card-pad parent-stat">
          <span className="dash-stat-num">L{level}</span>
          <span className="dash-stat-label">{t({ en: "Level", zh: "等级" })}</span>
        </div>
        <div className="card card-pad parent-stat">
          <span className="dash-stat-num">🔥 {progress.streak}</span>
          <span className="dash-stat-label">{t({ en: "Streak", zh: "连续打卡" })}</span>
        </div>
        <div className="card card-pad parent-stat">
          <span className="dash-stat-num">{progress.badges.length}/{BADGES.length}</span>
          <span className="dash-stat-label">{t({ en: "Badges", zh: "徽章" })}</span>
        </div>
      </div>

      <div className="card card-pad parent-block">
        <h3>{t({ en: "Overall completion", zh: "总体完成度" })}</h3>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${overallCompletionPct(progress, TOTAL_LESSONS)}%` }} />
        </div>
      </div>

      <div className="card card-pad parent-block">
        <h3>{t({ en: "Skills so far", zh: "目前掌握的技能" })}</h3>
        {skillsLearned.length === 0 ? (
          <p>{t({ en: "Just getting started!", zh: "刚刚开始！" })}</p>
        ) : (
          <ul className="parent-skill-list">
            {skillsLearned.map((s, i) => (
              <li key={i}>✓ {t(s)}</li>
            ))}
          </ul>
        )}
      </div>

      <p className="parent-privacy-note">
        {t({ en: "This summary shows progress only — no private conversations are shown here.", zh: "这里只显示进度总览——不会展示任何私人对话内容。" })}
      </p>
    </div>
  );
}
