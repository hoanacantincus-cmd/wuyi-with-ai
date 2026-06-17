import crypto from "node:crypto";

const DEFAULT_ALLOWED_ORIGINS = [
  "https://wuyi-with-ai.pages.dev",
  "https://wuyi-with-ai.vercel.app",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
];

const MAX_JSON_BODY_BYTES = 4 * 1024;
const EVENT_ALLOWLIST = new Set(["page_view", "hero_progress", "section_view", "cta_click"]);
const DEVICE_ALLOWLIST = new Set(["desktop", "tablet", "mobile", "unknown"]);
const DAY_MS = 24 * 60 * 60 * 1000;
const DATA_TTL_SECONDS = 180 * 24 * 60 * 60;

function getAllowedOrigins() {
  const configured = process.env.ANALYTICS_ALLOWED_ORIGINS || process.env.AGENT_ALLOWED_ORIGINS;
  if (!configured) return DEFAULT_ALLOWED_ORIGINS;
  return configured
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isOriginAllowed(origin) {
  if (!origin) return process.env.NODE_ENV !== "production";
  return getAllowedOrigins().includes(origin);
}

function setSecurityHeaders(res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
}

function setCors(req, res) {
  const origin = req.headers.origin;
  if (origin && isOriginAllowed(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

function sendJson(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function isJsonRequest(req) {
  const contentType = String(req.headers["content-type"] || "").toLowerCase();
  return contentType.startsWith("application/json");
}

async function readJson(req) {
  const contentLength = Number(req.headers["content-length"] || 0);
  if (contentLength > MAX_JSON_BODY_BYTES) {
    const error = new Error("Request body is too large.");
    error.statusCode = 413;
    throw error;
  }

  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);

  let raw = "";
  let bytes = 0;
  for await (const chunk of req) {
    bytes += Buffer.byteLength(chunk);
    if (bytes > MAX_JSON_BODY_BYTES) {
      const error = new Error("Request body is too large.");
      error.statusCode = 413;
      throw error;
    }
    raw += chunk;
  }
  return raw ? JSON.parse(raw) : {};
}

function cleanValue(value, maxLength = 90) {
  return String(value || "")
    .replace(/[^\w\u4e00-\u9fa5:./#-]+/g, " ")
    .trim()
    .slice(0, maxLength) || "unknown";
}

function cleanPath(value) {
  const path = cleanValue(value || "/", 120);
  return path.startsWith("/") ? path : "/";
}

function cleanProgress(value) {
  const progress = Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
  if (progress >= 100) return "100";
  if (progress >= 75) return "75";
  if (progress >= 50) return "50";
  if (progress >= 25) return "25";
  return "0";
}

function getClientIp(req) {
  const forwardedFor = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return forwardedFor || req.headers["x-real-ip"] || req.socket?.remoteAddress || "unknown";
}

function shanghaiDate(offsetDays = 0) {
  return new Date(Date.now() + 8 * 60 * 60 * 1000 + offsetDays * DAY_MS).toISOString().slice(0, 10);
}

function getDateRange(days) {
  return Array.from({ length: days }, (_, index) => shanghaiDate(index - days + 1));
}

function getVisitorHash(req, day) {
  const salt = process.env.ANALYTICS_SALT || "";
  const input = `${salt}:${day}:${getClientIp(req)}:${req.headers["user-agent"] || ""}`;
  return crypto.createHash("sha256").update(input).digest("hex").slice(0, 24);
}

function isAnalyticsConfigured() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN &&
    process.env.ANALYTICS_ADMIN_PASSWORD &&
    process.env.ANALYTICS_SALT,
  );
}

async function redisPipeline(commands) {
  if (!isAnalyticsConfigured()) return null;
  const baseUrl = process.env.UPSTASH_REDIS_REST_URL.replace(/\/+$/, "");
  const response = await fetch(`${baseUrl}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok || !Array.isArray(payload)) {
    const error = new Error("Redis request failed.");
    error.statusCode = 502;
    throw error;
  }
  return payload;
}

function normalizeMap(value) {
  if (!value) return {};
  if (Array.isArray(value)) {
    const entries = {};
    for (let index = 0; index < value.length; index += 2) {
      entries[String(value[index] || "unknown")] = Number(value[index + 1] || 0);
    }
    return entries;
  }
  if (typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, count]) => [key, Number(count || 0)]));
  }
  return {};
}

function addMap(target, source) {
  Object.entries(source || {}).forEach(([key, value]) => {
    target[key] = (target[key] || 0) + Number(value || 0);
  });
}

function sumEventCounts(events) {
  return Object.values(events || {}).reduce((sum, count) => sum + Number(count || 0), 0);
}

function buildSummaryFromPipeline(days, rows) {
  const summary = {
    pageViews: 0,
    visitors: 0,
    events: {},
    pages: {},
    referrers: {},
    devices: {},
    progress: {},
    clicks: {},
  };

  let cursor = 0;
  days.forEach((day) => {
    const events = normalizeMap(rows[cursor++]?.result);
    const pages = normalizeMap(rows[cursor++]?.result);
    const referrers = normalizeMap(rows[cursor++]?.result);
    const devices = normalizeMap(rows[cursor++]?.result);
    const progress = normalizeMap(rows[cursor++]?.result);
    const clicks = normalizeMap(rows[cursor++]?.result);
    const visitors = Number(rows[cursor++]?.result || 0);

    addMap(summary.events, events);
    addMap(summary.pages, pages);
    addMap(summary.referrers, referrers);
    addMap(summary.devices, devices);
    addMap(summary.progress, progress);
    addMap(summary.clicks, clicks);
    summary.pageViews += Number(events.page_view || 0);
    summary.visitors += visitors;
    summary[day] = { pageViews: Number(events.page_view || 0), visitors };
  });

  return summary;
}

async function recordEvent(req, body) {
  const event = cleanValue(body.event, 40);
  if (!EVENT_ALLOWLIST.has(event)) {
    const error = new Error("Unknown analytics event.");
    error.statusCode = 400;
    throw error;
  }

  if (!isAnalyticsConfigured()) return;

  const day = shanghaiDate();
  const path = cleanPath(body.path);
  const device = DEVICE_ALLOWLIST.has(body.device) ? body.device : "unknown";
  const referrer = cleanValue(body.referrer || "direct", 90);
  const section = cleanValue(body.section, 70);
  const target = cleanValue(body.target, 70);
  const progress = cleanProgress(body.progress);
  const visitorHash = getVisitorHash(req, day);
  const prefix = `analytics:${day}`;

  const commands = [
    ["SADD", "analytics:days", day],
    ["INCR", "analytics:total"],
    ["HINCRBY", `${prefix}:events`, event, 1],
    ["HINCRBY", `${prefix}:pages`, path, 1],
    ["HINCRBY", `${prefix}:referrers`, referrer, 1],
    ["HINCRBY", `${prefix}:devices`, device, 1],
    ["SADD", `${prefix}:visitors`, visitorHash],
    ["EXPIRE", `${prefix}:events`, DATA_TTL_SECONDS],
    ["EXPIRE", `${prefix}:pages`, DATA_TTL_SECONDS],
    ["EXPIRE", `${prefix}:referrers`, DATA_TTL_SECONDS],
    ["EXPIRE", `${prefix}:devices`, DATA_TTL_SECONDS],
    ["EXPIRE", `${prefix}:visitors`, DATA_TTL_SECONDS],
  ];

  if (section !== "unknown") commands.push(["HINCRBY", `${prefix}:sections`, section, 1], ["EXPIRE", `${prefix}:sections`, DATA_TTL_SECONDS]);
  if (event === "hero_progress") commands.push(["HINCRBY", `${prefix}:progress`, progress, 1], ["EXPIRE", `${prefix}:progress`, DATA_TTL_SECONDS]);
  if (event === "cta_click") commands.push(["HINCRBY", `${prefix}:clicks`, target, 1], ["EXPIRE", `${prefix}:clicks`, DATA_TTL_SECONDS]);

  await redisPipeline(commands);
}

async function loadSummary() {
  if (!isAnalyticsConfigured()) {
    return {
      configured: false,
      totals: { events: 0 },
      last7: { pageViews: 0, visitors: 0 },
      last30: { pageViews: 0, visitors: 0 },
    };
  }

  const days30 = getDateRange(30);
  const commands = days30.flatMap((day) => {
    const prefix = `analytics:${day}`;
    return [
      ["HGETALL", `${prefix}:events`],
      ["HGETALL", `${prefix}:pages`],
      ["HGETALL", `${prefix}:referrers`],
      ["HGETALL", `${prefix}:devices`],
      ["HGETALL", `${prefix}:progress`],
      ["HGETALL", `${prefix}:clicks`],
      ["SCARD", `${prefix}:visitors`],
    ];
  });
  commands.push(["GET", "analytics:total"]);

  const rows = await redisPipeline(commands);
  const totalEvents = Number(rows.at(-1)?.result || 0);
  const rangeRows = rows.slice(0, -1);
  const last30 = buildSummaryFromPipeline(days30, rangeRows);
  const last7 = buildSummaryFromPipeline(days30.slice(-7), rangeRows.slice(-7 * 7));

  return {
    configured: true,
    generatedAt: new Date().toISOString(),
    totals: { events: totalEvents || sumEventCounts(last30.events) },
    last7,
    last30,
  };
}

function isAuthorized(req) {
  const password = process.env.ANALYTICS_ADMIN_PASSWORD || "";
  const header = String(req.headers.authorization || "");
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!password || !token) return false;
  const tokenBuffer = Buffer.from(token);
  const passwordBuffer = Buffer.from(password);
  return tokenBuffer.length === passwordBuffer.length && crypto.timingSafeEqual(tokenBuffer, passwordBuffer);
}

export default async function handler(req, res) {
  setSecurityHeaders(res);
  setCors(req, res);

  if (!isOriginAllowed(req.headers.origin)) {
    return sendJson(res, 403, { error: "Request origin is not allowed." });
  }

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  try {
    if (req.method === "POST") {
      if (!isJsonRequest(req)) return sendJson(res, 415, { error: "Only application/json requests are supported." });
      const body = await readJson(req);
      if (!body || typeof body !== "object" || Array.isArray(body)) return sendJson(res, 400, { error: "Invalid JSON body." });
      await recordEvent(req, body);
      res.statusCode = 204;
      return res.end();
    }

    if (req.method === "GET") {
      if (!isAuthorized(req)) return sendJson(res, 401, { error: "Analytics password is required." });
      return sendJson(res, 200, await loadSummary());
    }

    return sendJson(res, 405, { error: "Method not allowed." });
  } catch (error) {
    if (error?.statusCode === 413) return sendJson(res, 413, { error: "Request body is too large." });
    if (error?.statusCode === 400 || error instanceof SyntaxError) return sendJson(res, 400, { error: "Invalid analytics request." });
    if (error?.statusCode === 502) return sendJson(res, 502, { error: "Analytics storage is temporarily unavailable." });
    return sendJson(res, 500, { error: "Analytics request failed." });
  }
}
