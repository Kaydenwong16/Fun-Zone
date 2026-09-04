// ---------------------------------------------------------------------------
// Cloud account client: talks to /api/course-account so a kid's name +
// password can restore their profile/progress on any device. Every call is
// designed to fail soft — if the network or backend is unavailable, callers
// treat that as "carry on locally" rather than blocking play.
// ---------------------------------------------------------------------------

const ENDPOINT = "/api/course-account";

async function call(payload) {
  try {
    const r = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      return { ok: false, error: data.error || `http-${r.status}`, data };
    }
    return { ok: true, data };
  } catch {
    return { ok: false, error: "network" };
  }
}

/**
 * Creates the account on first use, or logs in (verifying the password) on
 * every return visit — the server decides which happened.
 */
export function authAccount({ name, password, profile, progress }) {
  return call({ action: "auth", name, password, profile, progress });
}

/** Best-effort background sync of the latest profile/progress. */
export function syncAccount({ name, password, profile, progress }) {
  return call({ action: "save", name, password, profile, progress });
}

/** Teacher-only: fetches a progress summary for every enrolled student. */
export function fetchClassProgress(teacherPassword) {
  return call({ action: "teacherList", teacherPassword });
}

/** Teacher-only: fetches one page of the login history log (newest
 * first). Returns { logins, hasMore } so the caller's "More" button
 * knows whether there's anything left to load. */
export function fetchLoginLog(teacherPassword, { limit, offset } = {}) {
  return call({ action: "teacherLoginLog", teacherPassword, limit, offset });
}

/** Records a session's actual end — an explicit logout, or (best-effort,
 * via sendBeacon on pagehide) becoming inactive by closing the tab or
 * navigating away without logging out. The session id alone is the
 * credential; no password needed for this one. */
export function endSession(sessionId, reason) {
  return call({ action: "endSession", sessionId, reason });
}

/** Same as endSession, but fires via navigator.sendBeacon instead of
 * fetch — the only reliable way to get a request out during pagehide,
 * since the page may already be gone before a fetch's promise settles.
 * No response to read (sendBeacon is fire-and-forget), so this doesn't
 * go through call(). */
export function endSessionBeacon(sessionId, reason) {
  if (typeof navigator === "undefined" || !navigator.sendBeacon) return false;
  const blob = new Blob([JSON.stringify({ action: "endSession", sessionId, reason })], {
    type: "application/json",
  });
  return navigator.sendBeacon(ENDPOINT, blob);
}
