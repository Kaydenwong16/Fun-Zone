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
