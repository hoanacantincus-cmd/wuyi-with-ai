const ANALYTICS_API_URL =
  import.meta.env.VITE_ANALYTICS_API_URL ||
  (typeof window !== "undefined" && window.location.hostname.endsWith("pages.dev")
    ? "https://wuyi-with-ai.vercel.app/api/analytics"
    : "/api/analytics");

const EVENT_ALLOWLIST = new Set(["page_view", "hero_progress", "section_view", "cta_click"]);

function getDeviceType() {
  if (typeof window === "undefined") return "unknown";
  const width = window.innerWidth || 0;
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function getReferrerHost() {
  if (typeof document === "undefined" || !document.referrer) return "direct";
  try {
    return new URL(document.referrer).hostname || "direct";
  } catch {
    return "direct";
  }
}

function compactValue(value, maxLength = 80) {
  return String(value || "")
    .replace(/[^\w\u4e00-\u9fa5:./#-]+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function trackAnalytics(eventName, details = {}) {
  if (!EVENT_ALLOWLIST.has(eventName) || typeof window === "undefined") return;

  const payload = {
    event: eventName,
    path: window.location.pathname || "/",
    referrer: getReferrerHost(),
    device: getDeviceType(),
    target: compactValue(details.target),
    section: compactValue(details.section),
    progress: Number.isFinite(details.progress) ? Math.max(0, Math.min(100, Math.round(details.progress))) : undefined,
  };

  fetch(ANALYTICS_API_URL, {
    method: "POST",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

export async function fetchAnalyticsSummary(password) {
  const response = await fetch(ANALYTICS_API_URL, {
    method: "GET",
    headers: { Authorization: `Bearer ${password}` },
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.error || "Analytics request failed.");
  }
  return payload;
}
