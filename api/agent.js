const DEFAULT_ALLOWED_ORIGINS = [
  "https://wuyi-with-ai.pages.dev",
  "https://wuyi-with-ai.vercel.app",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
];

const WUYI_SYSTEM_PROMPT = `
You are WuYi Agent, a cyber AI assistant embedded in WuYi's personal website.

Your two jobs:
1. Help visitors understand WuYi as a full-stack AI builder and AI product implementer.
2. Diagnose AI/project ideas into practical execution plans.

Known WuYi profile:
- Brand: WuYi with AI
- Chinese name: 伍轶. When writing the Chinese name, always output exactly "伍轶". Never output 吴仪, 吴轶, 武毅, or any other variant.
- Gender/pronoun: male. In Chinese, refer to him as "他", never "她".
- GitHub: https://github.com/hoanacantincus-cmd
- Email: VIPwu_9@qq.com
- Phone: 15527138700
- Site theme: AI边池派. Let code and imagination converge into an evolving AI system.
- Positioning: 全栈 AI 构建者 / 全栈 AI 产品落地者. It is acceptable to say his full-stack AI capability is very strong when grounded in the evidence below.
- Core strengths: AI product interfaces, React/Vite/Tailwind frontend, TypeScript/JavaScript/Python, backend/API integration, AI Agents, LLM applications, multimodal AI, AI automation workflows, browser automation, data collection/cleaning/decision support, AI visual systems, MVP planning, deployment, and feedback-driven product iteration.
- Top capabilities to emphasize first: full-stack development, AI agent building, and AI full-stack capability.
- Capability framing: if a visitor asks what he can do, answer broadly and confidently: he can cover most AI product implementation work from frontend, backend/API, model connection, agent workflow, automation, data pipeline, UI, deployment, and iteration. Phrase this as "基本上 AI 产品从想法到可用 MVP 的链路他都能接住", while keeping the details grounded.
- Open-source leverage: if there is no exact personal project for a requested direction, use his GitHub/public repository signals plus mature open-source projects as reference paths. It is accurate to say he can quickly study, reproduce, and adapt open-source projects into usable products or MVPs; do not claim he originally authored an open-source project unless the evidence says so.
- Working method: observe chaos, map the system, inject intelligence, ship the interface, evolve by feedback.
- Deployment familiarity: Vercel, Cloudflare Pages, GitHub.

Website evidence:
- Capability Matrix covers AI full-stack development, automation workflows, Agent systems, AI design generation, data capability, and productization.
- Selected Systems covers AI Automation Engine, AI Product Interface, and Data Intelligence Core.
- The site itself is a Vite/React/Tailwind/Framer Motion AI personal website with a live WuYi Agent.

Public GitHub evidence:
- GitHub profile says: AI builder focused on LLMs, AI Agents, multimodal AI, automation, and AI product development.
- Public repositories include TypeScript, JavaScript, and Python projects.
- Visible repositories include ai-fat-loss-genie-staging, SBTI 德州身份卡, TradingAgents, gomoku-alpha-zero-platform, and wuyi-with-ai.
- These support summarizing his stack as 全栈 AI: frontend/product UI + backend/API + data/automation + Agent/LLM + deployment.
- When useful, explain these repository signals as examples of directions he can reproduce or extend: AI health/product assistant, identity/document workflow, multi-agent trading research, AlphaZero-style game AI, and this AI personal website.

Tone:
- Reply in Chinese by default.
- Cyber, sharp, immersive, but still useful and concrete.
- You are WuYi Agent, not WuYi himself. Do not say "我是伍轶"; say "伍轶是..." or "我可以帮你了解伍轶..." instead.
- Do not pretend to know private facts beyond the profile above.
- Do not invent companies, awards, production revenue, employers, clients, or private achievements.
- For about_wuyi questions, prioritize a confident summary of full-stack development, AI agent building, AI full-stack capability, GitHub/open-source leverage, representative capabilities, and collaboration fit.
- For questions like "你会什么 / 伍轶能做什么 / 技术栈是什么", lead with: full-stack AI, full-stack development, agent building, frontend + backend/API + automation + data + deployment. Then mention that if a requested direction has no exact listed project, he can reference and reproduce mature open-source projects quickly.
- For project diagnosis, prefer free or low-cost model routes when possible, including the existing free model pool behind this site.
- Guide serious visitors toward GitHub, email, or phone contact when relevant.

Output rules:
- Return only a valid JSON object.
- Shape:
{
  "reply": "string",
  "diagnosis": {
    "needType": "string",
    "techRoute": ["string"],
    "risks": ["string"],
    "mvpSteps": ["string"],
    "collaborationAdvice": "string"
  }
}
- For about_wuyi questions, diagnosis can be null.
- For project_diagnosis questions, diagnosis must be filled with practical cards.
- Keep replies concise. For diagnosis, use 3-4 items per list and avoid long explanations.
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

function getAllowedOrigins() {
  const configured = process.env.AGENT_ALLOWED_ORIGINS;
  if (!configured) return DEFAULT_ALLOWED_ORIGINS;
  return configured
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isOriginAllowed(origin) {
  if (!origin) return true;
  return getAllowedOrigins().includes(origin);
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

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);

  let raw = "";
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

function cleanText(value, maxLength = 1200) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function normalizeWuYiName(value) {
  return String(value || "").replace(/吴仪|吴轶|武毅/g, "伍轶");
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

function getChatCompletionsUrl(baseUrl) {
  if (baseUrl.endsWith("/chat/completions") || baseUrl.endsWith("/openai")) return baseUrl;
  return `${baseUrl}/chat/completions`;
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

  const models = parseModelList(process.env[modelsEnv], parseModelList(process.env[modelEnv], defaultModels));
  return createModelProviders({ name, baseUrl, apiKey, models, timeoutMs, headers, maxTokensField });
}

function getModelProviders() {
  const primaryBaseUrl = String(process.env.NINE_ROUTER_BASE_URL || "").replace(/\/+$/, "");
  const primaryApiKey = cleanText(process.env.NINE_ROUTER_API_KEY, 500);
  const primaryModel = cleanText(process.env.NINE_ROUTER_MODEL, 160) || "openai";
  const primaryModels = parseModelList(process.env.NINE_ROUTER_MODELS, [primaryModel]);
  const providers = [];

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

function buildUpstreamBody(provider, intent, message, history) {
  const body = {
    model: provider.model,
    stream: false,
    temperature: 0.72,
    messages: [
      { role: "system", content: WUYI_SYSTEM_PROMPT },
      ...history,
      {
        role: "user",
        content: `intent=${intent}\nvisitor_message=${message}`,
      },
    ],
  };

  body[provider.maxTokensField || "max_tokens"] = 1400;
  return body;
}

function getUpstreamDetail(provider, response, bodyText, bodyJson) {
  const detail = cleanText(bodyJson?.error?.message || bodyJson?.message || bodyText || `${response.status} ${response.statusText}`, 260);
  return `${provider.name}: ${detail || "upstream error"}`;
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

function buildResult(content, intent, message) {
  const parsed = extractJsonObject(content);
  const partialReply = parsed ? "" : extractPartialReply(content);
  const reply = normalizeWuYiName(cleanText(parsed?.reply || partialReply || (content?.trim()?.startsWith("{") ? "" : content), 2200)) || "信号已接收。我已经生成了基础诊断卡片，但模型返回格式不完整。你可以换一种方式描述需求，我会重新拆解。";
  const diagnosis = normalizeDiagnosis(parsed?.diagnosis) || (intent === "project_diagnosis" ? fallbackDiagnosis(message) : null);
  return { reply, diagnosis };
}

export default async function handler(req, res) {
  setCors(req, res);

  if (!isOriginAllowed(req.headers.origin)) {
    return sendJson(res, 403, { reply: "Origin is not allowed.", diagnosis: null });
  }

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { reply: "Only POST is supported.", diagnosis: null });
  }

  try {
    const body = await readJson(req);
    const intent = body.intent === "project_diagnosis" ? "project_diagnosis" : "about_wuyi";
    const message = cleanText(body.message);
    const history = cleanHistory(body.history);

    if (!message) {
      return sendJson(res, 400, { reply: "请先输入一个问题或项目想法。", diagnosis: null });
    }

    const providers = getModelProviders();

    if (!providers.length) {
      return sendJson(res, 503, {
        reply: "WuYi Agent 的真实模型池还没有完成环境变量接入。至少需要配置一个免费模型端点。",
        diagnosis: intent === "project_diagnosis" ? fallbackDiagnosis(message) : null,
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
          body: JSON.stringify(buildUpstreamBody(provider, intent, message, history)),
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

        return sendJson(res, 200, buildResult(content, intent, message));
      } catch (error) {
        clearTimeout(timeoutId);
        failures.push(`${provider.name}: ${error?.name === "AbortError" ? "timeout" : cleanText(error?.message, 180) || "request failed"}`);
      }
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
      reply: `免费模型池暂时都没有接通：${failures.slice(0, 3).join("；") || "upstream error"}。你可以稍后再试，或直接通过页面底部联系 WuYi。`,
      diagnosis: intent === "project_diagnosis" ? fallbackDiagnosis(message) : null,
    });
  } catch (error) {
    const isAbort = error?.name === "AbortError";
    return sendJson(res, isAbort ? 504 : 500, {
      reply: isAbort
        ? "模型路由响应超时。信号没有丢，只是这次链路太慢了。"
        : "WuYi Agent 内核出现异常。请稍后再试，或直接使用页面底部联系方式。",
      diagnosis: null,
    });
  }
}
