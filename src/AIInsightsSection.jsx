import React, { useState } from "react";
import { motion } from "framer-motion";
import { AI_SNAPSHOT_DATE, benchmarkSources, learningPath } from "./aiShowcaseData";
import { aiCodingBasicsTopics } from "./aiCodingBasicsData";
import { trackAnalytics } from "./analyticsClient";

const LIGHT_PATH_IMAGE = "/media/ai-learning-path-light.png";
const AGENT_IMAGE = "/media/ai-agent-workbench-cinematic.png";
const SYSTEM_MAP_IMAGE = "/media/ai-method-system-map-cinematic.png";
const ARK_FREE_QUOTA_IMAGE = "/media/volcengine-ark-free-quota.png";

const authorityEvidence = [
  { source: "Arena", focus: "人类偏好 / WebDev / Agent", signal: "Claude 系列在 Agent、Text、WebDev 相关榜单保持强势；适合看真实使用偏好。", href: "https://arena.ai/leaderboard", color: "from-[#00E5FF] to-[#2F7BFF]" },
  { source: "Artificial Analysis", focus: "智能指数 / 价格 / 速度", signal: "Claude Fable 5、Claude Opus 4.8 max、GPT-5.5 xhigh 位于智能指数前列；Qwen、MiniMax、MiMo 性价比突出。", href: "https://artificialanalysis.ai/leaderboards/models", color: "from-[#FF2D95] to-[#FFB703]" },
  { source: "Aider", focus: "真实代码编辑", signal: "代码能力要单独看仓库编辑、补丁成功率和多文件修改，不应只用聊天榜替代。", href: "https://aider.chat/docs/leaderboards/", color: "from-[#00F5A0] to-[#00A3FF]" },
  { source: "SWE-bench / Terminal-Bench", focus: "软件工程任务", signal: "更接近真实开发：修 issue、跑测试、用终端和工具完成任务。适合给编程智能体做交付判断。", href: "https://www.tbench.ai/leaderboard/terminal-bench/2.0", color: "from-[#B967FF] to-[#FF9A3D]" },
];

const modelMetricCards = [
  { label: "综合上限", score: 96, source: "Arena + AA", detail: "看人类偏好、复杂问答、推理和真实场景体验；Claude / GPT / Gemini 是第一梯队。", color: "from-[#00E5FF] via-[#2F7BFF] to-[#6E43FF]" },
  { label: "代码交付", score: 93, source: "Aider + SWE-bench", detail: "看多文件修改、测试修复、仓库理解和 issue 级任务，不用聊天总榜替代编程能力。", color: "from-[#00F5A0] via-[#00D9F5] to-[#357CFF]" },
  { label: "智能指数", score: 92, source: "Artificial Analysis", detail: "统一比较推理、知识、数学、代码等综合能力，同时保留速度和价格入口。", color: "from-[#FF2D95] via-[#FF6B2D] to-[#FFD166]" },
  { label: "多模态", score: 86, source: "Arena Vision", detail: "图片理解、文件处理、网页生成和图像生成要分开判断，不能混成一个分数。", color: "from-[#FFEA00] via-[#FF7A00] to-[#FF2D55]" },
  { label: "速度成本", score: 84, source: "Artificial Analysis", detail: "高频任务要看 median tok/s、API 成本、上下文窗口和稳定性。", color: "from-[#8CFF4D] via-[#00E0A4] to-[#00A3FF]" },
  { label: "中文可用", score: 80, source: "国内体验", detail: "普通用户还要看访问、支付、中文表达、文档生态和长期稳定性。", color: "from-[#B967FF] via-[#FF5ACD] to-[#FF9A3D]" },
];

const modelBenchmarkRows = [
  { rank: "01", model: "Claude Fable 5", creator: "Anthropic", aa: 65, arena: "Arena Agent #1", context: "1M", price: "$7.70", speed: 63, use: "综合上限 / Agent 任务", tone: "from-[#ff2d95] to-[#ffb703]" },
  { rank: "02", model: "Claude Opus 4.8 max", creator: "Anthropic", aa: 61, arena: "Text / Agent 前列", context: "1M", price: "$3.85", speed: 64, use: "深度推理 / 长文档", tone: "from-[#8b5cf6] to-[#ec4899]" },
  { rank: "03", model: "GPT-5.5 xhigh", creator: "OpenAI", aa: 60, arena: "Text 前列", context: "922k", price: "$4.35", speed: 72, use: "通用推理 / 产品原型", tone: "from-[#00e5ff] to-[#2f7bff]" },
  { rank: "04", model: "GPT-5.5 high", creator: "OpenAI", aa: 59, arena: "Agent / Text 前列", context: "922k", price: "$4.35", speed: 65, use: "复杂任务 / 多工具", tone: "from-[#06b6d4] to-[#6366f1]" },
  { rank: "05", model: "Claude Opus 4.7 max", creator: "Anthropic", aa: 57, arena: "WebDev 强", context: "1M", price: "$3.85", speed: 51, use: "高质量写作 / 工程推理", tone: "from-[#f472b6] to-[#a78bfa]" },
  { rank: "06", model: "Gemini 3.1 Pro Preview", creator: "Google", aa: 57, arena: "Text #6", context: "1M", price: "$1.74", speed: 130, use: "长上下文 / 多模态", tone: "from-[#34d399] to-[#3b82f6]" },
  { rank: "07", model: "Qwen3.7 Max", creator: "Alibaba", aa: 57, arena: "WebDev #7", context: "1M", price: "$1.43", speed: 196, use: "中文 / 性价比 / API", tone: "from-[#f97316] to-[#facc15]" },
  { rank: "08", model: "Gemini 3.5 Flash", creator: "Google", aa: 55, arena: "速度强", context: "1M", price: "$1.31", speed: 165, use: "高频轻任务", tone: "from-[#84cc16] to-[#06b6d4]" },
  { rank: "09", model: "MiniMax-M3", creator: "MiniMax", aa: 55, arena: "WebDev #9", context: "1M", price: "$0.22", speed: 58, use: "低成本中文任务", tone: "from-[#fb7185] to-[#f97316]" },
  { rank: "10", model: "Kimi K2.6", creator: "Kimi", aa: 54, arena: "Image-to-WebDev #7", context: "256k", price: "$0.70", speed: 41, use: "中文长文 / 网页任务", tone: "from-[#22d3ee] to-[#a78bfa]" },
  { rank: "11", model: "MiMo-V2.5-Pro", creator: "Xiaomi", aa: 54, arena: "性价比突出", context: "1M", price: "$0.18", speed: 43, use: "低价推理 / API", tone: "from-[#f59e0b] to-[#ef4444]" },
  { rank: "12", model: "GPT-5.3 Codex xhigh", creator: "OpenAI", aa: 54, arena: "代码专项", context: "400k", price: "$1.87", speed: 101, use: "代码编辑 / 终端任务", tone: "from-[#38bdf8] to-[#10b981]" },
];

const modelConclusionCards = [
  { title: "综合排名结论", winner: "Claude Fable 5 / Claude Opus 4.8 max", desc: "按 Arena 偏好和 Artificial Analysis 智能指数综合看，Claude 当前更适合复杂规划、长任务和 Agent 场景。", color: "from-[#FF2D95] to-[#FFB703]" },
  { title: "通用产品结论", winner: "GPT-5.5 xhigh / high", desc: "通用推理、产品原型、工具调用和生态兼容性强，适合作为默认主力模型。", color: "from-[#00E5FF] to-[#2F7BFF]" },
  { title: "性价比结论", winner: "Qwen3.7 Max / MiniMax-M3 / MiMo-V2.5-Pro", desc: "智能指数接近第一梯队尾部，但价格明显更低，适合中文高频任务和 API 批处理。", color: "from-[#00F5A0] to-[#00A3FF]" },
];

const modelDecisionRows = [
  { task: "写作 / 日常问答", pick: "豆包 / ChatGPT / Kimi", metric: "中文表达、上下文、素材处理", avoid: "只看全球总榜" },
  { task: "复杂推理", pick: "Claude / GPT / DeepSeek", metric: "推理深度、长链路稳定性", avoid: "低价模型硬做复杂规划" },
  { task: "真实编程", pick: "Codex / Claude Code / Cursor", metric: "仓库理解、改文件、跑验证", avoid: "只用聊天窗口复制代码" },
  { task: "多模态", pick: "GPT / Gemini / 豆包视觉", metric: "图像理解、图文生成、文件处理", avoid: "把文生图和看图混为一谈" },
  { task: "高频低成本", pick: "Qwen / Gemini Flash / DeepSeek", metric: "价格、速度、稳定 API", avoid: "只选最强不看成本" },
];

const codingAgentCards = [
  { name: "OpenAI Codex", repo: 96, tools: 96, verify: 94, ux: 85, evidence: "Terminal / repo agent", fit: "完整仓库开发、终端验证、长任务交付", color: "from-[#00E5FF] to-[#2F7BFF]" },
  { name: "Claude Code", repo: 95, tools: 90, verify: 94, ux: 80, evidence: "SWE / code review", fit: "复杂项目理解、重构、代码审查", color: "from-[#FF2D95] to-[#7A5CFF]" },
  { name: "Cursor", repo: 88, tools: 80, verify: 84, ux: 96, evidence: "IDE workflow", fit: "IDE 内连续改页面、快速迭代", color: "from-[#FFD166] to-[#FF6B2D]" },
  { name: "GitHub Copilot", repo: 80, tools: 70, verify: 74, ux: 93, evidence: "Enterprise IDE", fit: "IDE 插件、日常补全、企业协作", color: "from-[#00F5A0] to-[#00A3FF]" },
  { name: "Windsurf", repo: 83, tools: 78, verify: 76, ux: 89, evidence: "Agent IDE", fit: "Agent IDE、快速项目迭代", color: "from-[#8CFF4D] to-[#00D9F5]" },
  { name: "Cline / Roo Code", repo: 84, tools: 87, verify: 81, ux: 73, evidence: "Open source tool use", fit: "开源插件、模型自带、工具调用", color: "from-[#B967FF] to-[#FF9A3D]" },
];

const codingConclusionCards = [
  { title: "编程工具排名结论", winner: "OpenAI Codex", desc: "最适合完整仓库、终端验证和可追踪长任务；把真实交付作为第一指标时排第一。", color: "from-[#00E5FF] to-[#2F7BFF]" },
  { title: "复杂代码理解", winner: "Claude Code", desc: "复杂重构、代码审查和长上下文理解非常强；适合高风险改造前的分析和方案推演。", color: "from-[#FF2D95] to-[#7A5CFF]" },
  { title: "日常 IDE 体验", winner: "Cursor / GitHub Copilot", desc: "开发者每天在编辑器里连续改页面、补全和问答时，效率和上手门槛更占优势。", color: "from-[#FFD166] to-[#FF6B2D]" },
];

const practicePages = [
  {
    id: "agent-development",
    href: "/agent-development",
    title: "Agent开发",
    kicker: "本质：让模型在受控边界内反复完成任务",
    desc: "先做一个可验收的小闭环：目标、工具、状态、验证、接管。跑稳之后再谈多 Agent 和复杂框架。",
    image: AGENT_IMAGE,
    tags: ["LangGraph", "Dify", "CrewAI"],
    takeaways: ["任务先收窄", "工具要限权", "失败进评测集"],
    signals: [
      ["一句话", "Agent 不是更长的 Prompt，而是可恢复、可观察、可验收的任务执行器。"],
    ],
    proof: "能连续跑、能看日志、能人工接管，才算落地。",
    tint: "from-[#00E5FF] via-[#2F7BFF] to-[#6E43FF]",
  },
  {
    id: "automation-productization",
    href: "/automation-productization",
    title: "自动化与产品化",
    kicker: "本质：把省下来的人工变成可交付产品",
    desc: "自动化不是脚本演示，而是把触发、状态、重试、日志、审核和结果交付做成普通用户能用的入口。",
    image: SYSTEM_MAP_IMAGE,
    tags: ["n8n", "Playwright", "API"],
    takeaways: ["先算 ROI", "节点可重跑", "状态页交付"],
    signals: [
      ["一句话", "确定性流程交给工作流，模糊判断交给 Agent，最后用产品入口交付。"],
    ],
    proof: "用户能提交、追踪、拿结果，才算产品化。",
    tint: "from-[#FF2D95] via-[#FF6B2D] to-[#FFD166]",
  },
];

function SectionTitle({ eyebrow, title, desc, fontStyles, align = "center" }) {
  const centered = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75 }}
      className={`design-section-title relative mb-12 ${centered ? "mx-auto max-w-4xl text-center" : "max-w-3xl"}`}
    >
      <p style={fontStyles.mono} className="mb-4 text-[11px] uppercase tracking-[0.22em] text-cyan-100/58">{eyebrow}</p>
      <h2 className="bg-gradient-to-b from-white via-slate-100/92 to-cyan-100/46 bg-clip-text text-[2.25rem] font-semibold leading-[1.08] text-transparent md:text-[3.85rem]">{title}</h2>
      <p className={`mt-5 text-base leading-8 text-white/60 md:text-lg ${centered ? "mx-auto max-w-3xl" : "max-w-2xl"}`}>{desc}</p>
    </motion.div>
  );
}

function SourcePill({ source, section = "model-benchmark" }) {
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackAnalytics("cta_click", { section, target: source.name })}
      className="design-pill rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white/66 transition hover:border-cyan-100/24 hover:bg-white/[0.09] hover:text-white"
    >
      {source.name} ↗
    </a>
  );
}

function AuthorityEvidenceGrid({ fontStyles }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {authorityEvidence.map((item, index) => (
        <motion.a
          key={item.source}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ delay: index * 0.04, duration: 0.5 }}
          className="group relative min-h-[210px] overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-white/[0.045] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
        >
          <div className={`absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r ${item.color}`} />
          <div className={`absolute -right-12 -top-14 h-40 w-40 rounded-full bg-gradient-to-br ${item.color} opacity-20 blur-2xl transition group-hover:opacity-34`} />
          <div className="relative">
            <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.20em] text-cyan-50/44">Authority {String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 text-xl font-black tracking-[-0.045em] text-white">{item.source}</h3>
            <p className="mt-2 text-sm font-semibold text-cyan-50/62">{item.focus}</p>
            <p className="mt-5 text-sm leading-7 text-white/52">{item.signal}</p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

function ConclusionCards({ items, fontStyles }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item, index) => (
        <motion.article
          key={item.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ delay: index * 0.05, duration: 0.52 }}
          className="relative overflow-hidden rounded-[1.8rem] border border-white/[0.10] bg-[#090909] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.34)]"
        >
          <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${item.color}`} />
          <div className={`absolute -right-12 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${item.color} opacity-22 blur-2xl`} />
          <div className="relative">
            <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.20em] text-white/36">Conclusion {String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 text-sm font-semibold text-cyan-50/52">{item.title}</h3>
            <p className="mt-2 text-2xl font-black tracking-[-0.055em] text-white">{item.winner}</p>
            <p className="mt-4 text-sm leading-7 text-white/52">{item.desc}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function FreeModelQuotaPanel({ fontStyles }) {
  const [imageOpen, setImageOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.62 }}
        className="grid gap-5 rounded-[2rem] border border-cyan-100/[0.12] bg-white/[0.045] p-5 shadow-[0_28px_100px_rgba(0,0,0,0.30)] backdrop-blur-xl lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch"
      >
        <div className="flex flex-col justify-between gap-5">
          <div>
            <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.22em] text-cyan-100/46">Free Model Quota</p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.055em] text-white md:text-3xl">免费模型先看火山方舟控制台</h3>
            <p className="mt-4 text-sm leading-7 text-white/58">
              新手试 API 不要一上来纠结全球榜单，先看自己账号里能稳定用什么。火山方舟管理控制台的开通管理页会显示模型免费推理额度；你截图里能看到“单日单模型 200 万 tokens 免费额度”这类权益，同时也能看到每个模型剩余额度、输入输出定价和开通状态。
            </p>
          </div>
          <div className="grid gap-3">
            {["先开通一个中文可用模型", "用免费 token 跑真实任务", "记录效果、速度和成本", "权益会变动，以控制台为准"].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-black/28 px-4 py-3 text-sm font-semibold text-white/64">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan-100/12 text-xs text-cyan-50">{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setImageOpen(true)}
          className="group relative overflow-hidden rounded-[1.4rem] border border-white/[0.10] bg-black text-left outline-none transition hover:border-cyan-100/35 focus-visible:ring-2 focus-visible:ring-cyan-200"
          aria-label="放大查看火山方舟管理控制台截图"
        >
          <img src={ARK_FREE_QUOTA_IMAGE} alt="火山方舟管理控制台免费模型额度截图" className="h-full min-h-[280px] w-full object-cover object-left-top transition duration-500 group-hover:scale-[1.02]" loading="lazy" />
          <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl">
            点击放大
          </span>
        </button>
      </motion.div>
      {imageOpen ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/88 p-4 backdrop-blur-xl"
          onClick={() => setImageOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="火山方舟管理控制台截图大图"
        >
          <button
            type="button"
            onClick={() => setImageOpen(false)}
            className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
          >
            关闭
          </button>
          <img
            src={ARK_FREE_QUOTA_IMAGE}
            alt="火山方舟管理控制台免费模型额度截图大图"
            className="max-h-[86vh] w-full max-w-[1500px] rounded-2xl border border-white/12 bg-white object-contain shadow-[0_40px_160px_rgba(0,0,0,0.55)]"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}

function RoadmapStep({ step, index, fontStyles }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.05, duration: 0.58 }}
      className="relative border-l border-slate-950/12 py-1 pl-6"
    >
      <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.36)]" />
      <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Stage {step[0]}</p>
      <h3 className="mt-2 text-xl font-semibold text-slate-950">{step[1]}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-700">{step[2]}</p>
    </motion.article>
  );
}

function PainValidationStudio({ fontStyles }) {
  const [draft, setDraft] = useState("");
  const [pain, setPain] = useState("");
  const [status, setStatus] = useState("waiting");
  const [feedback, setFeedback] = useState("留下你用AI过程中最痛的感受，我尽力思考解决...");
  const answerPending = status === "submitted";

  const submitPain = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setPain(text);
    setDraft("");
    setStatus("submitted");
    setFeedback("收到，我会进行深度思考之后在答案区给出思考，企业级业务可以联系我~");
    trackAnalytics("cta_click", { section: "ai-pain-validation", target: "pain-submitted" });
    window.dispatchEvent(new CustomEvent("wuyi-agent-celebrate", { detail: { trick: "kemusan", reason: "pain-submitted" } }));
  };

  const resetFlow = () => {
    setDraft("");
    setPain("");
    setStatus("waiting");
    setFeedback("留下你用AI过程中最痛的感受，我尽力思考解决...");
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-3">
        <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.20em] text-slate-500">AI Pain Validation Lab</p>
        <button type="button" onClick={resetFlow} className="rounded-full border border-slate-950/10 bg-white/72 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-950/20 hover:bg-white">
          重置
        </button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.45fr_0.55fr]">
        <form onSubmit={submitPain} className="rounded-[1.25rem] border border-slate-950/[0.08] bg-white/82 p-4 shadow-[0_18px_54px_rgba(15,23,42,0.10)]">
          <h3 className="text-xl font-semibold leading-snug text-slate-950 md:text-2xl">留下你用AI过程中最痛的感受，我尽力思考解决...</h3>
          <div className="mt-4">
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="可以只写一句：哪里最卡、最烦、最浪费时间。"
              rows={6}
              className="w-full resize-none rounded-2xl border border-slate-950/10 bg-white px-4 py-3 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-200/40 disabled:opacity-60"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className={`text-sm leading-6 ${answerPending ? "text-emerald-700" : "text-slate-600"}`}>{feedback}</p>
              <button type="submit" disabled={!draft.trim()} className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">
                提交痛点
              </button>
            </div>
          </div>
        </form>

        <aside className="rounded-[1.25rem] border border-slate-950/[0.08] bg-slate-950 p-4 text-white shadow-[0_18px_54px_rgba(15,23,42,0.16)]">
          <p style={fontStyles.mono} className="text-[10px] uppercase tracking-[0.18em] text-cyan-100/54">Answer Draft</p>
          <h4 className="mt-2 text-base font-semibold">答案区</h4>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3">
            <p className="text-xs font-semibold text-cyan-50/72">{answerPending ? "已收到，待确认后回复" : "等待你的痛点"}</p>
            <p className="mt-2 text-xs leading-5 text-white/58">
              {answerPending ? "这里先保留数据，不提前给解决方案。等你确认后，我会把具体思考和拆解放在这里。" : "提交后这里会记录你的痛点，正式答案等确认之后再补上。"}
            </p>
          </div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-black/22 p-3">
            <p className="text-[11px] font-semibold text-white/48">痛点内容</p>
            <p className="mt-2 max-h-32 overflow-auto text-xs leading-6 text-white/76">{pain || "暂无"}</p>
          </div>
          <p className="mt-3 text-xs leading-5 text-emerald-100/74">{answerPending ? "我会进行深度思考之后在答案区给出思考，企业级业务可以联系我~" : "企业级业务可以联系我~"}</p>
        </aside>
      </div>
    </div>
  );
}

function CodingBasicsFeaturePanel({ fontStyles }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.68 }}
      className="design-feature-panel relative mb-7 grid overflow-hidden rounded-[2rem] border border-white/[0.18] bg-[#0a1012]/82 shadow-[0_30px_120px_rgba(0,0,0,0.34)] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]"
    >
      <div className="relative min-h-[260px] overflow-hidden bg-[#dceff0] lg:min-h-[360px]">
        <img src={LIGHT_PATH_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover object-center" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,15,18,0.04),rgba(5,15,18,0.32))]" />
        <div className="absolute bottom-5 left-5 rounded-full border border-slate-950/10 bg-white/72 px-4 py-2 text-xs font-semibold text-slate-950 shadow-[0_18px_50px_rgba(8,18,22,0.18)] backdrop-blur-xl" style={fontStyles.mono}>
          Pain Check / Dance Reward
        </div>
      </div>
      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#f8fdff_0%,#ddf6f7_42%,#eef0ff_72%,#fff3d7_100%)] p-6 text-slate-950 md:p-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-200/55 blur-3xl" />
        <div className="absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-amber-100/70 blur-3xl" />
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(15,23,42,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,.04)_1px,transparent_1px)] [background-size:38px_38px]" />
        <PainValidationStudio fontStyles={fontStyles} />
      </div>
    </motion.div>
  );
}

function CodingBasicsExplorer({ fontStyles }) {
  return (
    <div className="design-card-grid grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {aiCodingBasicsTopics.map((item, index) => {
        const isTaskTools = item.id === "task-agents";
        const isModelIntro = item.id === "model-choice";
        const isTerminalAgent = item.id === "terminal-agents";
        const isWhiteCard = isTaskTools || isModelIntro;
        const isSoftCard = ["task-agents", "concept-aesthetics", "model-choice"].includes(item.id);
        const cardStyle = isWhiteCard
          ? { background: "#ffffff" }
          : isTerminalAgent
            ? {
                background:
                  "radial-gradient(circle at 82% 18%, rgba(125, 229, 255, 0.18), transparent 34%), linear-gradient(145deg, #050607 0%, #0b1114 54%, #050505 100%)",
              }
            : undefined;
        const softCardClass = {
          "model-choice": "border-slate-200 bg-white text-slate-950 hover:border-sky-200 hover:shadow-[0_24px_90px_rgba(14,165,233,0.12)]",
          "task-agents": "border-cyan-200/80 bg-[linear-gradient(135deg,#f6fdff_0%,#d9f6ff_48%,#fff4d9_100%)] text-slate-950 hover:border-cyan-200 hover:shadow-[0_24px_90px_rgba(34,211,238,0.18)]",
          "concept-aesthetics": "border-sky-200/80 bg-[linear-gradient(135deg,#f4fbff_0%,#e8edff_50%,#fff0f6_100%)] text-slate-950 hover:border-sky-200 hover:shadow-[0_24px_90px_rgba(96,165,250,0.16)]",
        }[item.id];
        return (
          <motion.a
              key={item.id}
              href={`/ai-coding-basics/${item.id}`}
              onClick={() => trackAnalytics("cta_click", { section: "ai-coding-basics", target: item.id })}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ delay: index * 0.045, duration: 0.58 }}
              style={cardStyle}
              className={`design-topic-card group relative min-h-[255px] overflow-hidden rounded-[1.6rem] border p-5 shadow-[0_24px_86px_rgba(0,0,0,0.30)] transition hover:-translate-y-1 ${
                isSoftCard
                  ? softCardClass
                  : "border-white/[0.09] bg-[#080808]/88 hover:border-white/20 hover:bg-[#101010]"
              }`}
            >
              {isSoftCard && !isWhiteCard ? <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(to_right,rgba(15,23,42,.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,.035)_1px,transparent_1px)] [background-size:36px_36px]" /> : null}
              {!isWhiteCard ? <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${item.tint} ${isSoftCard ? "opacity-60" : "opacity-[0.22]"} blur-2xl transition group-hover:opacity-60`} /> : null}
              <div className={`absolute bottom-4 right-5 text-[5rem] font-black leading-none ${isSoftCard ? "text-slate-950/[0.08]" : "text-white/[0.05]"}`}>{item.no}</div>
              {isSoftCard && !isWhiteCard ? <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.tint}`} /> : null}
              <div className="relative flex h-full flex-col">
                <span style={fontStyles.mono} className={`w-fit rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${isSoftCard ? "border-slate-950/10 bg-white/66 text-slate-700" : "border-white/10 bg-white/[0.06] text-cyan-50/62"}`}>{isTaskTools ? "AI Tool List" : "Solo Page"}</span>
                <p className={`mt-7 ${isSoftCard ? "text-slate-950" : `bg-gradient-to-r ${item.tint} bg-clip-text text-transparent`} text-[2.05rem] font-black leading-none md:text-[2.35rem]`}>{item.art}</p>
                <h3 className={`mt-4 text-xl font-semibold ${isSoftCard ? "text-slate-950" : "text-white"}`}>{item.title}</h3>
                <p className={`mt-3 text-sm leading-7 ${isSoftCard ? "text-slate-700" : "text-white/62"}`}>{item.hook}</p>
                {isTaskTools ? (
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {["问答", "Agent", "内容"].map((label) => (
                      <span key={label} className="rounded-xl border border-slate-950/[0.08] bg-white/72 px-2 py-2 text-center text-xs font-semibold text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">{label}</span>
                    ))}
                  </div>
                ) : null}
                <span className={`mt-auto pt-5 text-sm font-semibold transition ${isSoftCard ? "text-slate-800 group-hover:text-slate-950" : "text-cyan-50/70 group-hover:text-white"}`}>进入实用页</span>
              </div>
          </motion.a>
        );
      })}
    </div>
  );
}

function HeavyMetricCard({ metric, index, fontStyles }) {
  return (
    <motion.a
      href={benchmarkSources.find((source) => metric.source.includes(source.name.split(" ")[0]))?.href || "https://artificialanalysis.ai/leaderboards/models"}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ delay: index * 0.05, duration: 0.62 }}
      className="group relative min-h-[250px] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#080808] p-5 shadow-[0_32px_120px_rgba(0,0,0,0.42)] transition hover:-translate-y-1 hover:border-white/20"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-90`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.46),transparent_22%),linear-gradient(135deg,rgba(0,0,0,0.08),rgba(0,0,0,0.42))]" />
      <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border-[18px] border-white/16" />
      <div className="relative text-slate-950">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.2em] text-slate-950/58">Metric {String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.06em]">{metric.label}</h3>
          </div>
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-slate-950/12 bg-white/60 text-2xl font-black shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">{metric.score}</span>
        </div>
        <p className="mt-6 text-sm font-semibold leading-7 text-slate-950/72">{metric.detail}</p>
        <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-950/18">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${metric.score}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + index * 0.05, duration: 0.9 }}
            className="h-full rounded-full bg-slate-950"
          />
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-950/58">{metric.source} · 点击看来源</p>
      </div>
    </motion.a>
  );
}

function ModelBenchmarkTable({ fontStyles }) {
  const maxSpeed = Math.max(...modelBenchmarkRows.map((row) => row.speed));
  const maxAa = Math.max(...modelBenchmarkRows.map((row) => row.aa));

  return (
    <div className="overflow-hidden rounded-[2.2rem] border border-white/[0.11] bg-[#070707]/88 shadow-[0_38px_140px_rgba(0,0,0,0.44)] backdrop-blur-2xl">
      <div className="border-b border-white/[0.08] bg-white/[0.045] px-5 py-5 md:px-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.24em] text-cyan-100/48">World Model Scoreboard</p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.055em] text-white md:text-3xl">主流模型跑分表</h3>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-white/48">AA=Artificial Analysis Intelligence Index；价格为 blended USD/1M tokens；速度为 median tokens/s。榜单会变化，页面保留来源入口。</p>
        </div>
      </div>

      <div className="hidden grid-cols-[0.55fr_1.7fr_0.85fr_0.85fr_0.9fr_0.8fr_1.3fr] gap-4 border-b border-white/[0.07] px-5 py-3 text-xs uppercase tracking-[0.12em] text-cyan-50/40 md:grid md:px-7" style={fontStyles.mono}>
        <span>#</span><span>Model</span><span>AA</span><span>Context</span><span>Price</span><span>Speed</span><span>Best use</span>
      </div>

      <div className="divide-y divide-white/[0.065]">
        {modelBenchmarkRows.map((row, index) => (
          <motion.a
            key={row.model}
            href={benchmarkSources[1].href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.035, duration: 0.48 }}
            className="group grid gap-4 px-5 py-5 transition hover:bg-white/[0.045] md:grid-cols-[0.55fr_1.7fr_0.85fr_0.85fr_0.9fr_0.8fr_1.3fr] md:items-center md:px-7"
          >
            <span style={fontStyles.mono} className="text-sm font-semibold text-white/42">{row.rank}</span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-base font-black tracking-[-0.035em] text-white">{row.model}</p>
                <span className={`rounded-full bg-gradient-to-r ${row.tone} px-2.5 py-1 text-[11px] font-black text-slate-950`}>{row.creator}</span>
              </div>
              <p className="mt-1 text-xs text-cyan-50/42">{row.arena}</p>
            </div>
            <div>
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-black text-white">{row.aa}</span>
                <span className="text-white/34">/{maxAa}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(row.aa / maxAa) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + index * 0.025, duration: 0.72 }}
                  className={`h-full rounded-full bg-gradient-to-r ${row.tone}`}
                />
              </div>
            </div>
            <span className="text-sm font-semibold text-white/66">{row.context}</span>
            <span className="text-sm font-semibold text-[#FFD166]">{row.price}</span>
            <div>
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-semibold text-white/68">{row.speed}</span>
                <span className="text-white/30">tok/s</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(row.speed / maxSpeed) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.16 + index * 0.025, duration: 0.72 }}
                  className="h-full rounded-full bg-cyan-100/80"
                />
              </div>
            </div>
            <span className="text-sm leading-6 text-white/52">{row.use}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

function ModelDecisionTable({ fontStyles }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/[0.10] bg-white/[0.06] shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="grid grid-cols-[1.05fr_1fr_1.2fr_1.1fr] bg-white/[0.08] px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-cyan-50/54 max-md:hidden" style={fontStyles.mono}>
        <span>任务</span><span>优先选择</span><span>核心指标</span><span>避坑点</span>
      </div>
      <div className="divide-y divide-white/[0.07]">
        {modelDecisionRows.map((row, index) => (
          <motion.div
            key={row.task}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04, duration: 0.5 }}
            className="grid gap-3 px-5 py-5 text-sm md:grid-cols-[1.05fr_1fr_1.2fr_1.1fr] md:items-center"
          >
            <p className="font-semibold text-white">{row.task}</p>
            <p className="text-[#00E5FF]">{row.pick}</p>
            <p className="text-white/58">{row.metric}</p>
            <p className="text-white/42">{row.avoid}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AgentToolCard({ tool, index, fontStyles }) {
  const metrics = [
    ["仓库", tool.repo],
    ["工具", tool.tools],
    ["验证", tool.verify],
    ["体验", tool.ux],
  ];
  const average = Math.round((tool.repo + tool.tools + tool.verify + tool.ux) / 4);
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ delay: index * 0.05, duration: 0.58 }}
      className="relative overflow-hidden rounded-[1.8rem] border border-white/[0.09] bg-[#080808] p-5 shadow-[0_22px_90px_rgba(0,0,0,0.34)] transition hover:-translate-y-1 hover:border-white/20"
    >
      <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${tool.color} opacity-35 blur-2xl`} />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-black tracking-[-0.045em] text-white">{tool.name}</h3>
            <p className="mt-2 text-xs font-semibold text-cyan-50/44">{tool.evidence}</p>
          </div>
          <div className="text-right">
            <span style={fontStyles.mono} className="text-xs text-white/32">#{String(index + 1).padStart(2, "0")}</span>
            <p className="mt-1 text-2xl font-black text-white">{average}</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-white/50">{tool.fit}</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {metrics.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/[0.07] bg-white/[0.045] p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-white/42">{label}</span>
                <span className="text-sm font-black text-white">{value}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${value}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.04, duration: 0.72 }}
                  className={`h-full rounded-full bg-gradient-to-r ${tool.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function PracticeEntry({ item, index, fontStyles }) {
  const isWarm = index % 2 === 1;
  return (
    <motion.div
      id={item.id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.08, duration: 0.68 }}
      className={`design-practice-section group relative overflow-hidden px-6 py-24 text-slate-950 md:px-10 md:py-32 ${isWarm ? "practice-warm" : "practice-cool"}`}
    >
      <div className={`absolute inset-0 ${isWarm ? "bg-[linear-gradient(135deg,#fff7df_0%,#e7fbf5_45%,#eef1ff_100%)]" : "bg-[linear-gradient(135deg,#f4fdff_0%,#dff6ff_48%,#fff2e0_100%)]"}`} />
      <div className="absolute inset-0 opacity-55 [background-image:linear-gradient(to_right,rgba(15,23,42,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,.04)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className={`absolute ${isWarm ? "-right-24 top-12 bg-amber-200/60" : "left-[-5rem] top-16 bg-cyan-200/58"} h-72 w-72 rounded-full blur-3xl`} />
      <div className={`absolute ${isWarm ? "left-12 bottom-10 bg-cyan-200/54" : "right-10 bottom-10 bg-violet-200/48"} h-72 w-72 rounded-full blur-3xl`} />
      <div className="relative z-10 mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-stretch">
        <div className="design-practice-copy relative overflow-hidden rounded-[2rem] border border-slate-950/[0.08] bg-white/70 p-7 shadow-[0_30px_100px_rgba(15,23,42,0.14)] backdrop-blur-xl md:p-9">
          <div className={`absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${item.tint} opacity-36 blur-3xl`} />
          <div className="relative flex h-full min-h-[440px] flex-col">
            <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{item.kicker}</p>
            <h2 className="mt-5 text-[2.55rem] font-semibold leading-none md:text-[4.45rem]">{item.title}</h2>
            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-700 md:text-lg">{item.desc}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-slate-950/[0.08] bg-white/72 px-3 py-1 text-sm font-semibold text-slate-700 backdrop-blur">{tag}</span>
              ))}
            </div>
            <div className="mt-8 grid gap-3">
              {item.takeaways.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-2xl border border-slate-950/[0.08] bg-white/72 px-4 py-3 text-sm font-semibold text-slate-700">
                  <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${item.tint}`} />
                  {point}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3">
              {item.signals.map((signal) => (
                <div key={signal[0]} className="rounded-2xl border border-slate-950/[0.08] bg-white/70 p-4">
                  <p style={fontStyles.mono} className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{signal[0]}</p>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{signal[1]}</p>
                </div>
              ))}
            </div>
            <p className="mt-7 rounded-2xl border border-slate-950/[0.08] bg-slate-950/[0.04] p-4 text-sm font-semibold leading-7 text-slate-700">{item.proof}</p>
            <a href={item.href} className="mt-auto inline-flex w-fit pt-8 text-sm font-black uppercase tracking-[0.12em] text-slate-800 transition hover:text-slate-950">进入学习页 ↗</a>
          </div>
        </div>
        <a
          href={item.href}
          aria-label={`进入${item.title}学习页`}
          className="design-practice-image relative overflow-hidden rounded-[2rem] border border-slate-950/[0.08] bg-white/72 p-2 shadow-[0_30px_100px_rgba(15,23,42,0.14)] transition hover:-translate-y-1 hover:border-slate-950/16"
        >
          <img src={item.image} alt="" className="block h-full min-h-[420px] w-full rounded-[1.55rem] object-contain transition duration-700 group-hover:scale-[1.015]" loading="lazy" />
        </a>
      </div>
    </motion.div>
  );
}

export default function AIInsightsSection({ fontStyles, CoreVisual }) {
  return (
    <section className="relative z-10 overflow-x-clip border-y border-white/[0.06] bg-black text-white">
      <div id="ai-roadmap" className="relative px-6 py-28 md:px-10 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.055),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(255,255,255,0.04),transparent_34%),linear-gradient(180deg,#000_0%,#050505_48%,#000_100%)]" />
        <div className="relative z-10 mx-auto max-w-[1500px]">
          <SectionTitle
            eyebrow="AI Learning Roadmap"
            title="AI 学习路径"
            desc="这里是整站地图：先理解路径，再进入编程基础、模型评测、编程智能体、Agent 开发和自动化产品化。"
            fontStyles={fontStyles}
          />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>{CoreVisual ? <CoreVisual /> : null}</div>
            <div className="relative overflow-hidden rounded-[2.4rem] border border-white/45 bg-[linear-gradient(135deg,#f8fdff_0%,#e0f6f7_48%,#fff5df_100%)] p-6 text-slate-950 shadow-[0_36px_120px_rgba(20,76,92,0.20)] backdrop-blur-xl md:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(255,255,255,0.55),transparent_34%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(15,23,42,.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,.035)_1px,transparent_1px)] [background-size:40px_40px]" />
              <div className="relative space-y-7">
                {learningPath.map((step, index) => <RoadmapStep key={step[0]} step={step} index={index} fontStyles={fontStyles} />)}
              </div>
            </div>
          </div>

          <div id="ai-coding-basics" className="pt-32">
            <SectionTitle
              eyebrow="AI Coding For Beginners"
              title="AI 编程基础"
              desc="面向对 AI 感兴趣但完全不懂技术的中文用户：每个入口都是一个单独实用页，不再挤在同一个页面里。"
              fontStyles={fontStyles}
            />
            <CodingBasicsFeaturePanel fontStyles={fontStyles} />
            <CodingBasicsExplorer fontStyles={fontStyles} />
          </div>
        </div>
      </div>

      <div id="model-benchmark" className="design-model-section relative px-6 py-28 md:px-10 md:py-36">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.055),transparent_34%),linear-gradient(180deg,#000,#050505_50%,#000)]" />
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,rgba(255,255,255,.28)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="relative z-10 mx-auto max-w-[1500px]">
          <SectionTitle
            eyebrow="Benchmark System"
            title="大模型评测"
            desc="只看最重要、最落地、最经典的指标：综合偏好、智能指数、代码编辑、多模态、速度成本、中文可用。点击来源可进入原站看实时榜单。"
            fontStyles={fontStyles}
          />
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <span style={fontStyles.mono} className="rounded-full border border-cyan-100/12 bg-cyan-100/[0.06] px-4 py-2 text-sm text-cyan-50/62">快照：{AI_SNAPSHOT_DATE}</span>
            {benchmarkSources.map((source) => <SourcePill key={source.href} source={source} />)}
          </div>
          <div className="mb-8">
            <FreeModelQuotaPanel fontStyles={fontStyles} />
          </div>
          <AuthorityEvidenceGrid fontStyles={fontStyles} />
          <div className="mt-8">
            <ModelBenchmarkTable fontStyles={fontStyles} />
          </div>
          <div className="mt-8">
            <ConclusionCards items={modelConclusionCards} fontStyles={fontStyles} />
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {modelMetricCards.map((metric, index) => <HeavyMetricCard key={metric.label} metric={metric} index={index} fontStyles={fontStyles} />)}
          </div>
          <div className="mt-8">
            <ModelDecisionTable fontStyles={fontStyles} />
          </div>
        </div>
      </div>

      <div id="coding-tools" className="design-coding-section relative px-6 py-28 md:px-10 md:py-36">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#000,#050505_48%,#000)]" />
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_62%)]" />
        <div className="relative z-10 mx-auto max-w-[1500px]">
          <SectionTitle
            eyebrow="AI Coding Agent Scoreboard"
            title="AI 编程智能体评测"
            desc="不看广告词，看能不能真实交付：仓库理解、终端/工具执行、调试验证、Agent 自主性、UI 易用性和国内访问体验。"
            fontStyles={fontStyles}
          />
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <span style={fontStyles.mono} className="rounded-full border border-cyan-100/12 bg-cyan-100/[0.06] px-4 py-2 text-sm text-cyan-50/62">快照：{AI_SNAPSHOT_DATE}</span>
            {benchmarkSources.slice(2).map((source) => <SourcePill key={source.href} source={source} section="coding-tools" />)}
          </div>
          <div className="mb-8">
            <ConclusionCards items={codingConclusionCards} fontStyles={fontStyles} />
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {codingAgentCards.map((tool, index) => <AgentToolCard key={tool.name} tool={tool} index={index} fontStyles={fontStyles} />)}
          </div>
        </div>
      </div>

      {practicePages.map((item, index) => <PracticeEntry key={item.href} item={item} index={index} fontStyles={fontStyles} />)}
    </section>
  );
}
