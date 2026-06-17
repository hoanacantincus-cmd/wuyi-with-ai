const DEFAULT_ALLOWED_ORIGINS = [
  "https://wuyi-with-ai.pages.dev",
  "https://wuyi-with-ai.vercel.app",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
];

const WUYI_SYSTEM_PROMPT = `
You are AI伍子胥, a cyber AI assistant embedded in WuYi's personal website.

Your two jobs:
1. Answer visitor questions in Chinese with concise, practical AI learning and AI product guidance.
2. Help visitors understand WuYi as a full-stack AI builder and AI product implementer.
3. When the visitor asks for image generation, keep text short because image generation is handled by the image endpoint.

Known WuYi profile:
- Brand: WuYi with AI
- Chinese name: 伍轶. When writing the Chinese name, always output exactly "伍轶". Never output 吴仪, 吴轶, 武毅, or any other variant.
- Gender/pronoun: male. In Chinese, refer to him as "他", never "她".
- GitHub: https://github.com/hoanacantincus-cmd
- Email: VIPwu_9@qq.com
- Phone: 15527138700
- Site theme: AI伍子胥. Let code and imagination converge into an evolving AI system.
- Positioning: 全栈 AI 构建者 / 全栈 AI 产品落地者. It is acceptable to say his full-stack AI capability is very strong when grounded in the evidence below.
- Core strengths: AI product interfaces, React/Vite/Tailwind frontend, TypeScript/JavaScript/Python, backend/API integration, AI Agents, LLM applications, multimodal AI, AI automation workflows, browser automation, data collection/cleaning/decision support, AI visual systems, MVP planning, deployment, and feedback-driven product iteration.
- Top capabilities to emphasize first: full-stack development, AI agent building, and AI full-stack capability.
- Capability framing: if a visitor asks what he can do, answer broadly and confidently: he can cover most AI product implementation work from frontend, backend/API, model connection, agent workflow, automation, data pipeline, UI, deployment, and iteration. Phrase this as "基本上 AI 产品从想法到可用 MVP 的链路他都能接住", while keeping the details grounded.
- Open-source leverage: if there is no exact personal project for a requested direction, use his GitHub/public repository signals plus mature open-source projects as reference paths. It is accurate to say he can quickly study, reproduce, and adapt open-source projects into usable products or MVPs; do not claim he originally authored an open-source project unless the evidence says so.
- Working method: observe chaos, map the system, inject intelligence, ship the interface, evolve by feedback.
- Deployment familiarity: Vercel, Cloudflare Pages, GitHub.

Website evidence:
- The site focuses on AI 学习路径、AI 编程基础、大模型评测、AI 编程智能体评测、Agent 开发、自动化与产品化、AI Orbit Radar.
- The site itself is a Vite/React/Tailwind/Framer Motion AI personal website with a live AI伍子胥 assistant.

Public GitHub evidence:
- GitHub profile says: AI builder focused on LLMs, AI Agents, multimodal AI, automation, and AI product development.
- Public repositories include TypeScript, JavaScript, and Python projects.
- Visible repositories include ai-fat-loss-genie-staging, SBTI 德州身份卡, TradingAgents, gomoku-alpha-zero-platform, and wuyi-with-ai.
- These support summarizing his stack as 全栈 AI: frontend/product UI + backend/API + data/automation + Agent/LLM + deployment.
- When useful, explain these repository signals as examples of directions he can reproduce or extend: AI health/product assistant, identity/document workflow, multi-agent trading research, AlphaZero-style game AI, and this AI personal website.

Tone:
- Reply in Chinese by default.
- Cyber, sharp, immersive, but still useful and concrete.
- You are AI伍子胥, not WuYi himself. Do not say "我是伍轶"; say "伍轶是..." or "我可以帮你了解伍轶..." instead.
- This site uses free/limited model capacity. Keep answers useful but concise, and do not encourage repeated quota-wasting retries.
- Do not pretend to know private facts beyond the profile above.
- Do not invent companies, awards, production revenue, employers, clients, or private achievements.
- If the visitor uploads images or small text files, use uploaded_text_files and uploaded_images as the visitor-provided context. For images, describe only what is visible or infer with caution; if image understanding is unavailable, say so plainly.
- For about_wuyi questions, prioritize a confident summary of full-stack development, AI agent building, AI full-stack capability, GitHub/open-source leverage, representative capabilities, and collaboration fit.
- For questions like "你会什么 / 伍轶能做什么 / 技术栈是什么", lead with: full-stack AI, full-stack development, agent building, frontend + backend/API + automation + data + deployment. Then mention that if a requested direction has no exact listed project, he can reference and reproduce mature open-source projects quickly.
- Guide serious visitors toward GitHub, email, or WeChat contact when relevant.

Output rules:
- Return only a valid JSON object.
- Shape:
{
  "reply": "string",
  "diagnosis": null
}
- Always set diagnosis to null. This assistant only exposes chat and image generation.
- Keep replies concise and practical.
`;

const WUYI_PAIN_VALIDATION_PROMPT = `
You are the AI pain-point validation brain for AI伍子胥 (AI WuZiXu), the cat-like website agent. Always write the agent name exactly as "AI伍子胥". Never write "AI吴子胥".

Your job:
- Run a warm three-round conversation that decides whether a visitor has left a real AI pain point.
- Use the same DeepSeek/Ark text model as the normal website assistant.
- Do not sound like an exam or an approval department. Speak like a practical AI consultant.

Three rounds:
1. round 0, pain point: verify the visitor described a concrete AI-related blocker, task, tool, workflow, or business problem.
2. round 1, context: verify the visitor gave scene details such as who uses it, where it happens, current process, frequency, cost, delay, or impact.
3. round 2, challenge: test whether the visitor can reject a false premise. Use this false premise when needed: "AI can permanently remember all business data by itself, so it will automatically become smart." A real visitor should point out what is wrong and tie it back to their own evidence.

Approval rules:
- Approve only after all three rounds are satisfied.
- Be generous but not careless. A useful approval usually has at least two of these: concrete AI task, real scenario, current friction, measurable impact, rejected false premise.
- For round 0, pass when the visitor gives an AI use case plus a blocker or impact. Do not require exact metrics yet. Move to round 1 and ask for scene context.
- For round 1, pass when the visitor gives who/where/current process/frequency/impact details. Move to round 2 and ask the false-premise challenge.
- For round 2, pass when the visitor clearly disagrees with the false premise and explains why it is wrong with real context.
- Round 0 pass examples:
  - "I want AI to organize customer chats and generate follow-up scripts, but now I manually copy chat logs and efficiency is low." This has AI use case, blocker, and impact, so nextRound must be 1.
  - "I want AI to create Xiaohongshu topics and images, but prompts are scattered and every post needs rework." This has AI use case, blocker, and impact, so nextRound must be 1.
- If the current answer is weak, keep the user in the same round and ask exactly one focused follow-up.
- Never ask for API keys, passwords, private credentials, or unnecessary personal data.
- After approval, tell the visitor the pain point is real enough to enter a solution path and that AI WuZiXu is celebrating.

Input format:
- The user message includes intent, pain_state JSON, and visitor_message.
- Use pain_state.round as the current round unless the content clearly indicates the visitor already answered the requested round.

Return only a valid JSON object with this exact shape:
{
  "reply": "Chinese reply to the visitor",
  "diagnosis": null,
  "painCheck": {
    "round": 0,
    "nextRound": 0,
    "status": "asking",
    "approved": false,
    "stageSummary": "short Chinese summary",
    "signals": ["specific_ai_task"],
    "contactPrompt": ""
  }
}

Field rules:
- round is the round you just evaluated.
- nextRound is 0, 1, 2, or 3. Use 3 only when approved is true.
- status must be "asking", "rejected", or "approved".
- approved must be true only when nextRound is 3.
- signals should be short ASCII identifiers, for example: "specific_ai_task", "real_scene", "business_impact", "false_premise_rejected".
- contactPrompt should stay empty until approved. When approved, suggest one concrete next action, such as leaving WeChat/contact info or asking for a solution outline.
`;

const NINE_ROUTER_FREE_MODELS = [
  "oc/deepseek-v4-flash-free",
  "oc/qwen3.6-plus-free",
  "kr/claude-sonnet-4.5",
  "kr/deepseek-3.2",
  "kr/qwen3-coder-next",
  "kr/glm-5",
  "kr/MiniMax-M2.5",
  "kr/claude-haiku-4.5",
  "vertex/gemini-3.1-pro-preview",
  "vertex-partner/deepseek-v3.2-maas",
];

const VOLCENGINE_ARK_DEFAULT_BASE_URL = "https://ark.cn-beijing.volces.com/api/v3";
const VOLCENGINE_ARK_DEFAULT_MODELS = ["ep-20260613175617-g2hcr"];
const VOLCENGINE_ARK_DEFAULT_IMAGE_MODELS = ["ep-20260613175427-ltswj"];
const RATE_LIMIT_WINDOWS = [
  { name: "5 分钟", windowMs: 5 * 60 * 1000, limit: 10, label: "文本对话" },
  { name: "1 天", windowMs: 24 * 60 * 60 * 1000, limit: 30, label: "文本对话" },
];
const IMAGE_RATE_LIMIT_WINDOWS = [
  { name: "5 分钟", windowMs: 5 * 60 * 1000, limit: 3, label: "AI 生图" },
  { name: "1 天", windowMs: 24 * 60 * 60 * 1000, limit: 5, label: "AI 生图" },
];
const MAX_JSON_BODY_BYTES = 2 * 1024 * 1024;
const MAX_ATTACHMENTS = 3;
const MAX_ATTACHMENT_TEXT_CHARS = 12000;
const MAX_ATTACHMENT_DATA_URL_CHARS = 1300 * 1024;
const rateLimitStore = globalThis.__wuyiAgentRateLimitStore || new Map();
globalThis.__wuyiAgentRateLimitStore = rateLimitStore;

function getAllowedOrigins() {
  const configured = process.env.AGENT_ALLOWED_ORIGINS;
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
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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

function cleanText(value, maxLength = 1200) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanAttachmentText(value, maxLength = MAX_ATTACHMENT_TEXT_CHARS) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function isAllowedImageDataUrl(value) {
  return /^data:image\/(?:png|jpe?g|webp|gif);base64,[a-z0-9+/=\s]+$/i.test(String(value || ""));
}

function cleanAttachments(value) {
  if (!Array.isArray(value)) return [];

  return value
    .slice(0, MAX_ATTACHMENTS)
    .map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return null;
      const name = cleanText(item.name, 90) || "attachment";
      const type = cleanText(item.type, 80);
      const size = Math.max(0, Math.min(Number(item.size) || 0, 2 * 1024 * 1024));
      const kind = item.kind === "image" ? "image" : item.kind === "text" ? "text" : "";

      if (kind === "image") {
        const dataUrl = String(item.dataUrl || "");
        if (!isAllowedImageDataUrl(dataUrl) || dataUrl.length > MAX_ATTACHMENT_DATA_URL_CHARS) return null;
        return { kind, name, type, size, dataUrl };
      }

      if (kind === "text") {
        const text = cleanAttachmentText(item.text);
        if (!text) return null;
        return { kind, name, type, size, text };
      }

      return null;
    })
    .filter(Boolean);
}

function buildAttachmentContext(attachments = []) {
  if (!attachments.length) return "";
  const textParts = attachments
    .filter((item) => item.kind === "text")
    .map((item, index) => `\n[文件 ${index + 1}: ${item.name}]\n${item.text}`);
  const imageParts = attachments
    .filter((item) => item.kind === "image")
    .map((item, index) => `图片 ${index + 1}: ${item.name} (${item.type || "image"}, ${item.size || 0} bytes)`);
  const sections = [];
  if (textParts.length) sections.push(`\n\nuploaded_text_files:${textParts.join("\n")}`);
  if (imageParts.length) sections.push(`\n\nuploaded_images:\n${imageParts.join("\n")}`);
  return sections.join("");
}

function getClientIp(req) {
  const forwardedFor = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return forwardedFor || req.headers["x-real-ip"] || req.socket?.remoteAddress || "unknown";
}

function checkRateLimit(req, windows = RATE_LIMIT_WINDOWS, bucket = "agent") {
  const now = Date.now();
  const ip = String(getClientIp(req));
  const key = `${bucket}:${ip}`;
  const maxWindowMs = Math.max(...windows.map((item) => item.windowMs));
  const recent = (rateLimitStore.get(key) || []).filter((time) => now - time < maxWindowMs);

  for (const windowConfig of windows) {
    const count = recent.filter((time) => now - time < windowConfig.windowMs).length;
    if (count >= windowConfig.limit) {
      const oldestInWindow = recent.find((time) => now - time < windowConfig.windowMs) || now;
      return {
        allowed: false,
        retryAfter: Math.max(1, Math.ceil((windowConfig.windowMs - (now - oldestInWindow)) / 1000)),
        message: `这个 IP 的${windowConfig.label || "请求"}次数到达上限：${windowConfig.name}内最多 ${windowConfig.limit} 次。请稍后再试。`,
      };
    }
  }

  recent.push(now);
  rateLimitStore.set(key, recent);
  return { allowed: true };
}

function normalizeWuYiName(value) {
  return String(value || "")
    .replace(/AI吴子胥|吴子胥/g, "AI伍子胥")
    .replace(/吴仪|吴轶|武毅/g, "伍轶");
}

function cleanHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter((item) => item && (item.role === "user" || item.role === "assistant"))
    .slice(-6)
    .map((item) => ({
      role: item.role,
      content: cleanText(item.content, 900),
    }))
    .filter((item) => item.content);
}

function normalizePainRound(value, fallback = 0) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(3, Math.max(0, Math.round(number)));
}

function cleanPainState(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {
      round: 0,
      approved: false,
      stageSummary: "",
      signals: [],
    };
  }

  const signals = Array.isArray(value.signals)
    ? value.signals.map((item) => cleanText(item, 60)).filter(Boolean).slice(0, 8)
    : [];

  return {
    round: normalizePainRound(value.round),
    approved: Boolean(value.approved),
    stageSummary: cleanText(value.stageSummary, 220),
    signals,
  };
}

function normalizePainCheck(value, fallbackRound = 0) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const round = normalizePainRound(source.round, fallbackRound);
  const nextRound = normalizePainRound(source.nextRound, round);
  const approved = Boolean(source.approved) || nextRound === 3 || source.status === "approved";
  const status = approved
    ? "approved"
    : source.status === "rejected"
      ? "rejected"
      : "asking";
  const signals = Array.isArray(source.signals)
    ? source.signals.map((item) => cleanText(item, 60)).filter(Boolean).slice(0, 8)
    : [];

  return {
    round,
    nextRound: approved ? 3 : Math.min(2, nextRound),
    status,
    approved,
    stageSummary: cleanText(source.stageSummary, 240),
    signals,
    contactPrompt: approved ? cleanText(source.contactPrompt, 240) : "",
  };
}

function includesAny(source, words) {
  return words.some((word) => source.includes(word));
}

function getPainGuardrail(message, round) {
  const text = String(message || "");
  const compact = text.replace(/\s/g, "");
  const lower = text.toLowerCase();
  const hasAI = includesAny(lower, ["ai", "gpt", "deepseek", "agent"]) || includesAny(text, ["模型", "大模型", "智能体", "自动化", "提示词", "知识库"]);
  const hasTask = includesAny(text, ["客户", "咨询", "客服", "跟进", "话术", "内容", "脚本", "文案", "图片", "视频", "PPT", "数据", "表格", "代码", "获客", "回复", "流程", "工作流"]);
  const hasPain = includesAny(text, ["卡", "低", "慢", "手动", "复制", "重复", "返工", "不会", "不知道", "效率", "不稳定", "失败", "耗时", "麻烦", "散乱", "难复用"]);
  const hasContext = includesAny(text, ["我", "团队", "公司", "客户", "员工", "运营", "销售", "每次", "每天", "每周", "项目", "业务", "现在", "目前", "流程", "半天", "小时", "成本", "转化", "交付"]);
  const rejectsFalsePremise = includesAny(text, ["不同意", "不是", "不对", "不能", "不一定", "不会", "没有", "取决于", "太绝对", "杜撰", "瞎说", "假的", "除非", "需要"]) && includesAny(text, ["记住", "知识库", "数据", "业务", "资料", "上下文", "工作流"]);

  if (round === 0) return { pass: compact.length >= 14 && hasAI && hasTask && hasPain, signals: { hasAI, hasTask, hasPain } };
  if (round === 1) return { pass: compact.length >= 18 && hasContext && (hasTask || hasPain), signals: { hasContext, hasTask, hasPain } };
  if (round === 2) return { pass: compact.length >= 14 && rejectsFalsePremise, signals: { rejectsFalsePremise } };
  return { pass: false, signals: {} };
}

function reconcilePainCheck(painCheck, message, painState) {
  const round = normalizePainRound(painState?.round ?? painCheck.round);
  if (painCheck.approved || painCheck.nextRound > round) {
    return { painCheck, reply: "" };
  }

  const guardrail = getPainGuardrail(message, round);
  if (!guardrail.pass) return { painCheck, reply: "" };

  if (round === 0) {
    return {
      painCheck: {
        ...painCheck,
        round: 0,
        nextRound: 1,
        status: "asking",
        approved: false,
        stageSummary: "痛点初筛通过：有明确 AI 任务、卡点和效率影响。",
        signals: ["specific_ai_task", "current_blocker", "impact"],
        contactPrompt: "",
      },
      reply: "痛点初筛通过：你说清楚了 AI 任务、当前卡点和效率影响。第二轮请补充真实背景：谁在用、发生在哪个任务里、现在怎么处理、这个问题多久出现一次？",
    };
  }

  if (round === 1) {
    return {
      painCheck: {
        ...painCheck,
        round: 1,
        nextRound: 2,
        status: "asking",
        approved: false,
        stageSummary: "背景核实通过：有真实使用场景和影响描述。",
        signals: ["real_scene", "workflow_context"],
        contactPrompt: "",
      },
      reply: "背景核实通过。最后做一轮反作假验证：如果我说“AI 会永久记住所有业务数据，所以会自动变聪明”，你同意吗？请指出哪里不成立，并结合你的真实情况说明。",
    };
  }

  return {
    painCheck: {
      ...painCheck,
      round: 2,
      nextRound: 3,
      status: "approved",
      approved: true,
      stageSummary: "三轮通过：用户能识别错误前提，并能回到真实业务证据。",
      signals: ["false_premise_rejected", "real_evidence"],
      contactPrompt: "可以继续留下联系方式，或让 AI伍子胥把这个痛点整理成解决路径。",
    },
    reply: "三轮通过。你没有顺着错误前提走，而是指出 AI 不会自动永久记住业务数据，必须依赖资料整理、知识库或工作流。这是一个真实 AI 痛点，AI伍子胥开始跳舞庆祝；接下来可以把它整理成一版解决路径。",
  };
}

function getChatCompletionsUrl(baseUrl) {
  if (baseUrl.endsWith("/chat/completions") || baseUrl.endsWith("/openai")) return baseUrl;
  return `${baseUrl}/chat/completions`;
}

function getImageGenerationsUrl(baseUrl) {
  if (baseUrl.endsWith("/images/generations")) return baseUrl;
  return `${baseUrl}/images/generations`;
}

function getUpstreamHeaders(provider) {
  const headers = { "Content-Type": "application/json", ...(provider.headers || {}) };
  if (provider.apiKey) headers.Authorization = `Bearer ${provider.apiKey}`;
  return headers;
}

function parseModelList(value, fallback = []) {
  const models = String(value || "")
    .split(",")
    .map((model) => cleanText(model, 160))
    .filter(Boolean);
  return models.length ? models : fallback;
}

function getFirstEnv(names) {
  for (const name of names) {
    const value = cleanText(process.env[name], 500);
    if (value) return value;
  }
  return "";
}

function createModelProviders({ name, baseUrl, apiKey, models, timeoutMs = 18000, headers = {}, maxTokensField = "max_tokens" }) {
  return models.map((model, index) => ({
    name: models.length > 1 ? `${name} #${index + 1} ${model}` : name,
    baseUrl,
    apiKey,
    model,
    timeoutMs,
    headers,
    maxTokensField,
  }));
}

function createEnvModelProviders({ name, baseUrl, keyNames, modelEnv, modelsEnv, defaultModels, timeoutMs = 18000, headers = {}, maxTokensField = "max_tokens" }) {
  const apiKey = getFirstEnv(keyNames);
  if (!apiKey) return [];

  const modelEnvs = Array.isArray(modelEnv) ? modelEnv : [modelEnv];
  const modelsEnvs = Array.isArray(modelsEnv) ? modelsEnv : [modelsEnv];
  const models = parseModelList(getFirstEnv(modelsEnvs), parseModelList(getFirstEnv(modelEnvs), defaultModels));
  return createModelProviders({
    name,
    baseUrl: String(baseUrl || "").replace(/\/+$/, ""),
    apiKey,
    models,
    timeoutMs,
    headers,
    maxTokensField,
  });
}

function getVolcengineArkBaseUrl() {
  return String(
    process.env.VOLCENGINE_ARK_BASE_URL ||
      process.env.ARK_BASE_URL ||
      VOLCENGINE_ARK_DEFAULT_BASE_URL
  ).replace(/\/+$/, "");
}

function getVolcengineArkImageProviders() {
  const apiKey = getFirstEnv(["VOLCENGINE_ARK_API_KEY", "ARK_API_KEY", "VOLCENGINE_API_KEY"]);
  if (!apiKey) return [];

  const baseUrl = String(
    process.env.VOLCENGINE_ARK_IMAGE_BASE_URL ||
      process.env.ARK_IMAGE_BASE_URL ||
      getVolcengineArkBaseUrl()
  ).replace(/\/+$/, "");
  const models = parseModelList(
    getFirstEnv(["VOLCENGINE_ARK_IMAGE_MODELS", "ARK_IMAGE_MODELS"]),
    parseModelList(getFirstEnv(["VOLCENGINE_ARK_IMAGE_MODEL", "ARK_IMAGE_MODEL"]), VOLCENGINE_ARK_DEFAULT_IMAGE_MODELS),
  );

  return createModelProviders({
    name: "Volcengine Ark image generation",
    baseUrl,
    apiKey,
    models,
    timeoutMs: Number(process.env.VOLCENGINE_ARK_IMAGE_TIMEOUT_MS || process.env.ARK_IMAGE_TIMEOUT_MS) || 120000,
  });
}

function getModelProviders() {
  const primaryBaseUrl = String(process.env.NINE_ROUTER_BASE_URL || "").replace(/\/+$/, "");
  const primaryApiKey = cleanText(process.env.NINE_ROUTER_API_KEY, 500);
  const primaryModel = cleanText(process.env.NINE_ROUTER_MODEL, 160) || "openai";
  const primaryModels = parseModelList(process.env.NINE_ROUTER_MODELS, [primaryModel]);
  const providers = [];
  const volcengineArkBaseUrl = getVolcengineArkBaseUrl();

  providers.push(...createEnvModelProviders({
    name: volcengineArkBaseUrl.includes("/api/coding")
      ? "Volcengine Ark Coding Plan"
      : "Volcengine Ark",
    baseUrl: volcengineArkBaseUrl,
    keyNames: ["VOLCENGINE_ARK_API_KEY", "ARK_API_KEY", "VOLCENGINE_API_KEY"],
    modelEnv: ["VOLCENGINE_ARK_MODEL", "ARK_MODEL"],
    modelsEnv: ["VOLCENGINE_ARK_MODELS", "ARK_MODELS"],
    defaultModels: VOLCENGINE_ARK_DEFAULT_MODELS,
    timeoutMs: Number(process.env.VOLCENGINE_ARK_TIMEOUT_MS || process.env.ARK_TIMEOUT_MS) || 18000,
  }));

  if (primaryBaseUrl) {
    providers.push(...createModelProviders({
      name: cleanText(process.env.NINE_ROUTER_PROVIDER_NAME, 80) || "Primary free model",
      baseUrl: primaryBaseUrl,
      apiKey: primaryApiKey,
      models: primaryModels,
      timeoutMs: Number(process.env.NINE_ROUTER_TIMEOUT_MS) || 18000,
    }));
  } else if (process.env.AGENT_ENABLE_LOCAL_9ROUTER === "true") {
    providers.push(...createModelProviders({
      name: "9Router local free pool",
      baseUrl: "http://127.0.0.1:20128/v1",
      apiKey: primaryApiKey,
      models: parseModelList(process.env.NINE_ROUTER_MODELS, NINE_ROUTER_FREE_MODELS),
      timeoutMs: Number(process.env.NINE_ROUTER_TIMEOUT_MS) || 18000,
    }));
  }

  if (process.env.AGENT_ENABLE_DEFAULT_FREE_PROVIDERS !== "false") {
    if (process.env.OPENROUTER_API_KEY) {
      providers.push({
        name: "OpenRouter free",
        baseUrl: "https://openrouter.ai/api/v1",
        apiKey: cleanText(process.env.OPENROUTER_API_KEY, 500),
        model: cleanText(process.env.OPENROUTER_MODEL, 160) || "openai/gpt-oss-20b:free",
      });
    }

    if (process.env.GROQ_API_KEY) {
      providers.push({
        name: "Groq free",
        baseUrl: "https://api.groq.com/openai/v1",
        apiKey: cleanText(process.env.GROQ_API_KEY, 500),
        model: cleanText(process.env.GROQ_MODEL, 160) || "openai/gpt-oss-20b",
      });
    }

    if (process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY) {
      providers.push({
        name: "Google AI Studio free",
        baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai",
        apiKey: cleanText(process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY, 500),
        model: cleanText(process.env.GEMINI_MODEL || process.env.GOOGLE_AI_MODEL, 160) || "gemini-2.5-flash",
      });
    }

    providers.push(...createEnvModelProviders({
      name: "Hugging Face router",
      baseUrl: "https://router.huggingface.co/v1",
      keyNames: ["HF_TOKEN", "HUGGINGFACE_API_KEY"],
      modelEnv: "HUGGINGFACE_MODEL",
      modelsEnv: "HUGGINGFACE_MODELS",
      defaultModels: ["deepseek-ai/DeepSeek-R1:fastest"],
      timeoutMs: Number(process.env.HUGGINGFACE_TIMEOUT_MS) || 18000,
    }));

    providers.push(...createEnvModelProviders({
      name: "GitHub Models",
      baseUrl: "https://models.github.ai/inference",
      keyNames: ["GITHUB_MODELS_TOKEN", "GITHUB_TOKEN"],
      modelEnv: "GITHUB_MODELS_MODEL",
      modelsEnv: "GITHUB_MODELS_MODELS",
      defaultModels: ["openai/gpt-4o-mini"],
      timeoutMs: Number(process.env.GITHUB_MODELS_TIMEOUT_MS) || 18000,
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2026-03-10",
      },
    }));

    providers.push(...createEnvModelProviders({
      name: "SiliconFlow free tier",
      baseUrl: "https://api.siliconflow.cn/v1",
      keyNames: ["SILICONFLOW_API_KEY"],
      modelEnv: "SILICONFLOW_MODEL",
      modelsEnv: "SILICONFLOW_MODELS",
      defaultModels: ["Qwen/Qwen3-8B"],
      timeoutMs: Number(process.env.SILICONFLOW_TIMEOUT_MS) || 18000,
    }));

    providers.push(...createEnvModelProviders({
      name: "Cerebras free tier",
      baseUrl: "https://api.cerebras.ai/v1",
      keyNames: ["CEREBRAS_API_KEY"],
      modelEnv: "CEREBRAS_MODEL",
      modelsEnv: "CEREBRAS_MODELS",
      defaultModels: ["gpt-oss-120b", "llama3.1-8b"],
      timeoutMs: Number(process.env.CEREBRAS_TIMEOUT_MS) || 18000,
      maxTokensField: "max_completion_tokens",
    }));

    providers.push(...createEnvModelProviders({
      name: "SambaNova free tier",
      baseUrl: "https://api.sambanova.ai/v1",
      keyNames: ["SAMBANOVA_API_KEY"],
      modelEnv: "SAMBANOVA_MODEL",
      modelsEnv: "SAMBANOVA_MODELS",
      defaultModels: ["DeepSeek-V3.2", "gpt-oss-120b"],
      timeoutMs: Number(process.env.SAMBANOVA_TIMEOUT_MS) || 18000,
    }));

    providers.push({
      name: "Pollinations anonymous",
      baseUrl: "https://text.pollinations.ai/openai",
      apiKey: "",
      model: "openai",
      timeoutMs: 9000,
      headers: {},
      maxTokensField: "max_tokens",
    });
  }

  const customProviders = String(process.env.AGENT_MODEL_PROVIDERS || "")
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item, index) => {
      const [name, baseUrl, model, apiKey] = item.split("|").map((part) => cleanText(part, 500));
      return {
        name: name || `Custom free model ${index + 1}`,
        baseUrl: String(baseUrl || "").replace(/\/+$/, ""),
        model: model || "openai",
        apiKey: apiKey || "",
        timeoutMs: 18000,
      };
    })
    .filter((provider) => provider.baseUrl);

  providers.push(...customProviders);

  const seen = new Set();
  return providers.filter((provider) => {
    if (!provider.baseUrl || !provider.model) return false;
    const key = `${provider.baseUrl}|${provider.model}|${provider.apiKey ? "key" : "anon"}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildUpstreamBody(provider, intent, message, history, extra = {}) {
  const systemPrompt = intent === "pain_validation" ? WUYI_PAIN_VALIDATION_PROMPT : WUYI_SYSTEM_PROMPT;
  const attachments = Array.isArray(extra.attachments) ? extra.attachments : [];
  const attachmentContext = buildAttachmentContext(attachments);
  const userContent = intent === "pain_validation"
    ? `intent=${intent}\npain_state=${JSON.stringify(extra.painState || cleanPainState(null))}\nvisitor_message=${message}${attachmentContext}`
    : `intent=${intent}\nvisitor_message=${message}${attachmentContext}`;
  const imageAttachments = attachments.filter((item) => item.kind === "image");
  const finalUserContent = imageAttachments.length
    ? [
        { type: "text", text: userContent },
        ...imageAttachments.map((item) => ({
          type: "image_url",
          image_url: { url: item.dataUrl },
        })),
      ]
    : userContent;
  const body = {
    model: provider.model,
    stream: false,
    temperature: intent === "pain_validation" ? 0.2 : 0.72,
    messages: [
      { role: "system", content: systemPrompt },
      ...history,
      {
        role: "user",
        content: finalUserContent,
      },
    ],
  };

  body[provider.maxTokensField || "max_tokens"] = 1400;
  return body;
}

function buildImageBody(provider, prompt) {
  return {
    model: provider.model,
    prompt,
    response_format: "url",
    size: cleanText(process.env.VOLCENGINE_ARK_IMAGE_SIZE || process.env.ARK_IMAGE_SIZE, 40) || "2K",
    stream: false,
    watermark: process.env.VOLCENGINE_ARK_IMAGE_WATERMARK !== "false" && process.env.ARK_IMAGE_WATERMARK !== "false",
  };
}

function getUpstreamDetail(provider, response, bodyText, bodyJson) {
  const detail = cleanText(bodyJson?.error?.message || bodyJson?.message || bodyText || `${response.status} ${response.statusText}`, 260);
  return `${provider.name}: ${detail || "upstream error"}`;
}

function extractGeneratedImages(bodyJson) {
  const data = Array.isArray(bodyJson?.data) ? bodyJson.data : [];
  return data
    .map((item) => ({
      url: cleanText(item?.url || item?.image_url, 1600),
      b64Json: cleanText(item?.b64_json, 120000),
      revisedPrompt: cleanText(item?.revised_prompt || item?.prompt, 1000),
    }))
    .filter((item) => item.url || item.b64Json)
    .slice(0, 4);
}

async function generateImage(prompt) {
  const providers = getVolcengineArkImageProviders();
  if (!providers.length) {
    return {
      statusCode: 503,
      body: {
        reply: "生图通道还没有配置火山方舟 API Key。请先配置 ARK_API_KEY 和 ARK_IMAGE_MODEL。",
        diagnosis: null,
        images: [],
      },
    };
  }

  const failures = [];

  for (const provider of providers) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), provider.timeoutMs || 120000);

    try {
      const upstreamResponse = await fetch(getImageGenerationsUrl(provider.baseUrl), {
        method: "POST",
        signal: controller.signal,
        headers: getUpstreamHeaders(provider),
        body: JSON.stringify(buildImageBody(provider, prompt)),
      });
      clearTimeout(timeoutId);

      const upstreamText = await upstreamResponse.text().catch(() => "");
      let upstreamJson = null;
      if (upstreamText) {
        try {
          upstreamJson = JSON.parse(upstreamText);
        } catch {
          upstreamJson = null;
        }
      }

      if (!upstreamResponse.ok) {
        failures.push(getUpstreamDetail(provider, upstreamResponse, upstreamText, upstreamJson));
        continue;
      }

      const images = extractGeneratedImages(upstreamJson);
      if (!images.length) {
        failures.push(`${provider.name}: empty image response`);
        continue;
      }

      return {
        statusCode: 200,
        body: {
          reply: "图片已生成。链接通常有有效期，请及时打开或保存。",
          diagnosis: null,
          images,
        },
      };
    } catch (error) {
      clearTimeout(timeoutId);
      failures.push(`${provider.name}: ${error?.name === "AbortError" ? "timeout" : cleanText(error?.message, 180) || "request failed"}`);
    }
  }

  return {
    statusCode: 502,
    body: {
      reply: "Image generation is temporarily unavailable. Please try again later.",
      diagnosis: null,
      images: [],
    },
  };
}

function normalizeDiagnosis(diagnosis) {
  if (!diagnosis || typeof diagnosis !== "object") return null;

  const list = (value) => {
    if (Array.isArray(value)) return value.map((item) => cleanText(item, 160)).filter(Boolean).slice(0, 5);
    const cleaned = cleanText(value, 240);
    return cleaned ? [cleaned] : [];
  };

  return {
    needType: cleanText(diagnosis.needType, 120) || "AI 项目诊断",
    techRoute: list(diagnosis.techRoute),
    risks: list(diagnosis.risks),
    mvpSteps: list(diagnosis.mvpSteps),
    collaborationAdvice: cleanText(diagnosis.collaborationAdvice, 260),
  };
}

function extractJsonObject(content) {
  const text = String(content || "").trim();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenced) {
      try {
        return JSON.parse(fenced[1]);
      } catch {
        return null;
      }
    }

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1));
      } catch {
        return null;
      }
    }
  }

  return null;
}

function extractPartialReply(content) {
  const text = String(content || "");
  const match = text.match(/"reply"\s*:\s*"((?:\\.|[^"\\])*)"/);
  if (!match) return "";

  try {
    return JSON.parse(`"${match[1]}"`);
  } catch {
    return match[1].replace(/\\"/g, '"').replace(/\\n/g, "\n");
  }
}

function fallbackDiagnosis(message) {
  return {
    needType: "AI 产品 / 自动化项目",
    techRoute: ["需求澄清", "前端交互原型", "AI API 代理", "数据与工作流编排", "部署与反馈闭环"],
    risks: ["需求边界不清会放大成本", "第三方模型和免费额度可能波动", "涉及采集或登录态时需要额外合规评估"],
    mvpSteps: ["先锁定一个核心场景", "做可演示的交互原型", "接入一个稳定模型通道", "用真实样例验证输出质量"],
    collaborationAdvice: `可以把这句话作为合作 brief 发给 WuYi：${cleanText(message, 180)}`,
  };
}

function fallbackAboutWuYi() {
  return {
    reply:
      "伍轶是全栈 AI 构建者，重点能力是全栈开发、智能体搭建和 AI 全栈落地。他能把前端界面、后端/API、模型接入、自动化流程、数据采集、Agent 工作流、部署和迭代串成可运行的 MVP。如果某个方向没有现成个人项目，他也可以快速参考 GitHub 和成熟开源项目，复现、改造并落到自己的产品场景里。",
    diagnosis: null,
  };
}

function buildResult(content, intent, message, extra = {}) {
  const parsed = extractJsonObject(content);
  const partialReply = parsed ? "" : extractPartialReply(content);
  const reply = normalizeWuYiName(cleanText(parsed?.reply || partialReply || (content?.trim()?.startsWith("{") ? "" : content), 2200)) || "信号已接收。模型返回格式不完整，你可以换一种方式描述问题，我会重新回答。";
  if (intent === "pain_validation") {
    const painCheck = normalizePainCheck(parsed?.painCheck, extra?.painState?.round || 0);
    const reconciled = reconcilePainCheck(painCheck, message, extra?.painState || null);
    return {
      reply: reconciled.reply || reply,
      diagnosis: null,
      painCheck: reconciled.painCheck,
    };
  }
  return { reply, diagnosis: null };
}

export default async function handler(req, res) {
  setSecurityHeaders(res);
  setCors(req, res);

  if (!isOriginAllowed(req.headers.origin)) {
    return sendJson(res, 403, { reply: "Request origin is not allowed.", diagnosis: null });
  }

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { reply: "Only POST is supported.", diagnosis: null });
  }

  try {
    if (!isJsonRequest(req)) {
      return sendJson(res, 415, { reply: "Only application/json requests are supported.", diagnosis: null });
    }

    const body = await readJson(req);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return sendJson(res, 400, { reply: "Invalid JSON body.", diagnosis: null });
    }

    const intent = body.intent === "image_generation"
      ? "image_generation"
      : body.intent === "pain_validation"
        ? "pain_validation"
        : "about_wuyi";
    const message = cleanText(body.message);
    const history = cleanHistory(body.history);
    const attachments = cleanAttachments(body.attachments);
    const painState = intent === "pain_validation" ? cleanPainState(body.painState) : null;

    if (!message && !attachments.length) {
      return sendJson(res, 400, { reply: "请先输入一个问题或项目想法。", diagnosis: null });
    }

    if (intent === "image_generation") {
      const imageRateLimit = checkRateLimit(req, IMAGE_RATE_LIMIT_WINDOWS, "agent-image");
      if (!imageRateLimit.allowed) {
        res.setHeader("Retry-After", String(imageRateLimit.retryAfter));
        return sendJson(res, 429, {
          reply: imageRateLimit.message,
          diagnosis: null,
          images: [],
        });
      }

      const result = await generateImage(`${message}${buildAttachmentContext(attachments.filter((item) => item.kind === "text"))}`);
      return sendJson(res, result.statusCode, result.body);
    }

    const rateLimit = checkRateLimit(req, RATE_LIMIT_WINDOWS, "agent-text");
    if (!rateLimit.allowed) {
      res.setHeader("Retry-After", String(rateLimit.retryAfter));
      return sendJson(res, 429, {
        reply: rateLimit.message,
        diagnosis: null,
        images: [],
      });
    }

    const providers = getModelProviders();

    if (!providers.length) {
      return sendJson(res, 503, {
        reply: "AI伍子胥的真实模型池还没有完成环境变量接入。至少需要配置一个免费文本模型端点。",
        diagnosis: null,
      });
    }

    const failures = [];

    for (const provider of providers) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), provider.timeoutMs || 18000);

      try {
        const upstreamResponse = await fetch(getChatCompletionsUrl(provider.baseUrl), {
          method: "POST",
          signal: controller.signal,
          headers: getUpstreamHeaders(provider),
          body: JSON.stringify(buildUpstreamBody(provider, intent, message, history, { painState, attachments })),
        });

        clearTimeout(timeoutId);

        const upstreamText = await upstreamResponse.text().catch(() => "");
        let upstreamJson = null;
        if (upstreamText) {
          try {
            upstreamJson = JSON.parse(upstreamText);
          } catch {
            upstreamJson = null;
          }
        }

        if (!upstreamResponse.ok) {
          failures.push(getUpstreamDetail(provider, upstreamResponse, upstreamText, upstreamJson));
          continue;
        }

        const content = upstreamJson?.choices?.[0]?.message?.content || upstreamJson?.choices?.[0]?.text || "";
        if (!cleanText(content, 40)) {
          failures.push(`${provider.name}: empty response`);
          continue;
        }

        return sendJson(res, 200, buildResult(content, intent, message, { painState }));
      } catch (error) {
        clearTimeout(timeoutId);
        failures.push(`${provider.name}: ${error?.name === "AbortError" ? "timeout" : cleanText(error?.message, 180) || "request failed"}`);
      }
    }

    if (intent === "pain_validation") {
      return sendJson(res, 502, {
        reply: "痛点判断模型暂时没有接通。你的输入没有丢失，可以稍后重试；这个判断必须等 DeepSeek 通道返回后才会触发猫咪跳舞。",
        diagnosis: null,
        painCheck: {
          ...normalizePainCheck(null, painState?.round || 0),
          status: "rejected",
          approved: false,
          contactPrompt: "",
        },
      });
    }

    if (attachments.length) {
      const imageCount = attachments.filter((item) => item.kind === "image").length;
      const textCount = attachments.filter((item) => item.kind === "text").length;
      return sendJson(res, 200, {
        reply: `附件已收到：${imageCount ? `${imageCount} 张图片` : ""}${imageCount && textCount ? "，" : ""}${textCount ? `${textCount} 个小文件` : ""}。当前免费模型通道暂时没有完成附件分析，请稍后重试；如果是企业级业务，可以直接联系伍轶做人工深度拆解。`,
        diagnosis: null,
      });
    }

    if (intent === "about_wuyi") {
      return sendJson(res, 200, fallbackAboutWuYi());
    }

    return sendJson(res, 200, {
      reply: "这个项目可以先按 MVP 路线推进：先锁定一个核心用户场景，再做可演示界面，接入模型代理和数据流，最后用真实样例验证输出质量。伍轶适合处理这类 AI 项目从想法到落地的全栈实现。",
      diagnosis: fallbackDiagnosis(message),
    });

    return sendJson(res, 200, {
      reply: "模型池暂时都没有接通，WuYi Agent 先用本地规则给你做一版可执行诊断。你可以稍后重试，或继续补充需求细节。",
      diagnosis: fallbackDiagnosis(message),
    });

    return sendJson(res, 502, {
      reply: "The model pool is temporarily unavailable. Please try again later or use the contact links on the page.",
      diagnosis: null,
    });
  } catch (error) {
    if (error?.statusCode === 413) {
      return sendJson(res, 413, {
        reply: "Request body is too large.",
        diagnosis: null,
      });
    }

    if (error instanceof SyntaxError) {
      return sendJson(res, 400, {
        reply: "Invalid JSON body.",
        diagnosis: null,
      });
    }

    const isAbort = error?.name === "AbortError";
    return sendJson(res, isAbort ? 504 : 500, {
      reply: isAbort
        ? "模型路由响应超时。信号没有丢，只是这次链路太慢了。"
        : "AI伍子胥内核出现异常。请稍后再试，或直接使用页面底部联系方式。",
      diagnosis: null,
    });
  }
}
