import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AIInsightsSection from "./AIInsightsSection";
import AICodingBasicsPage from "./AICodingBasicsPage";
import AnalyticsDashboard from "./AnalyticsDashboard";
import PracticeDetailPage from "./PracticeDetailPage";
import ScrollVideoHero from "./ScrollVideoHero";
import { trackAnalytics } from "./analyticsClient";

const profile = {
  name: "不可言",
  title: "AI 先行者",
  heroTitle: "AI伍子胥",
  heroTitleSecond: "",
  heroSubtitle: "Where AI, Code and Imagination Converge",
  logoText: "WuYi with AI — Imagination Becomes Execution.",
  line: "让代码和想象力汇聚成持续进化的AI系统。",
  github: "https://github.com/hoanacantincus-cmd",
  githubName: "hoanacantincus-cmd",
  email: "VIPwu_9@qq.com",
  phone: "15527138700",
  location: "湖北武汉",
};

const shareUrl = "https://wuyi-with-ai.pages.dev/";

const sharePayload = {
  title: "AI伍子胥——让代码和想象力汇聚成持续进化的AI系统。",
  text: "伍轶的 AI 系统能力主页：全栈开发、Agent 系统、自动化流程与数据智能。",
};

const evolutionBackgrounds = {
  hero: {
    label: "细胞起源",
    tint: "radial-gradient(circle at 20% 22%, rgba(43, 226, 255, 0.22), transparent 30%), radial-gradient(circle at 78% 18%, rgba(165, 96, 255, 0.22), transparent 34%), linear-gradient(90deg, rgba(2, 4, 12, 0.92), rgba(2, 4, 12, 0.50) 48%, rgba(2, 4, 12, 0.88))",
    aura: "radial-gradient(ellipse at 48% 42%, rgba(80, 170, 255, 0.12), transparent 58%)",
  },
  capability: {
    label: "海洋生命",
    tint: "radial-gradient(circle at 18% 18%, rgba(32, 210, 190, 0.18), transparent 32%), radial-gradient(circle at 82% 30%, rgba(63, 128, 255, 0.18), transparent 36%), linear-gradient(180deg, rgba(1, 7, 14, 0.76), rgba(2, 8, 18, 0.54) 45%, rgba(2, 4, 12, 0.84))",
    aura: "radial-gradient(ellipse at 52% 48%, rgba(38, 218, 201, 0.11), transparent 60%)",
  },
  story: {
    label: "陆地植物",
    tint: "radial-gradient(circle at 22% 24%, rgba(134, 255, 168, 0.16), transparent 30%), radial-gradient(circle at 82% 18%, rgba(255, 211, 118, 0.15), transparent 34%), linear-gradient(180deg, rgba(2, 5, 12, 0.78), rgba(4, 13, 10, 0.52) 48%, rgba(2, 4, 10, 0.86))",
    aura: "radial-gradient(ellipse at 46% 44%, rgba(144, 255, 176, 0.10), transparent 58%)",
  },
  systems: {
    label: "动物生态",
    tint: "radial-gradient(circle at 18% 24%, rgba(154, 255, 194, 0.12), transparent 34%), radial-gradient(circle at 86% 18%, rgba(255, 196, 120, 0.16), transparent 34%), linear-gradient(180deg, rgba(2, 5, 10, 0.82), rgba(5, 10, 10, 0.58) 42%, rgba(3, 4, 10, 0.88))",
    aura: "radial-gradient(ellipse at 52% 50%, rgba(255, 202, 126, 0.10), transparent 62%)",
  },
  radar: {
    label: "银河网络",
    tint: "radial-gradient(circle at 18% 22%, rgba(125, 249, 255, 0.15), transparent 30%), radial-gradient(circle at 76% 20%, rgba(178, 126, 255, 0.22), transparent 38%), linear-gradient(180deg, rgba(1, 2, 9, 0.80), rgba(6, 8, 22, 0.48) 44%, rgba(4, 2, 12, 0.88))",
    aura: "radial-gradient(ellipse at 56% 42%, rgba(165, 120, 255, 0.14), transparent 62%)",
  },
  contact: {
    label: "太空地球",
    tint: "radial-gradient(circle at 46% 0%, rgba(96, 190, 255, 0.18), transparent 34%), radial-gradient(circle at 82% 32%, rgba(148, 118, 255, 0.20), transparent 42%), linear-gradient(180deg, rgba(1, 2, 9, 0.84), rgba(4, 8, 20, 0.50) 45%, rgba(1, 1, 7, 0.91))",
    aura: "radial-gradient(ellipse at 50% 38%, rgba(96, 190, 255, 0.12), transparent 60%)",
  },
};

function EvolutionLightBackground({ background }) {
  if (!background) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
      <div className="evolution-light-drift absolute -inset-[18%]" style={{ background: background.tint }} />
      <div className="evolution-light-pulse absolute -inset-[12%]" style={{ background: background.aura }} />
      <div className="evolution-light-grain absolute inset-0" />
      <div className="absolute inset-0 opacity-[0.075] [background-image:linear-gradient(to_right,rgba(255,255,255,.30)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.20)_1px,transparent_1px)] [background-size:84px_84px]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.64),rgba(0,0,0,0.28)_44%,rgba(0,0,0,0.66))]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/68 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/68 to-transparent" />
    </div>
  );
}

const capabilityItems = [
  {
    tag: "01",
    label: "BUILD",
    icon: "stack",
    visual: "build",
    title: "AI 全栈开发",
    desc: "把前端界面、后端接口、数据库、模型调用与部署串成完整的 AI 产品链路。",
    meta: "Frontend · Backend · Deploy",
  },
  {
    tag: "02",
    label: "FLOW",
    icon: "flow",
    visual: "flow",
    title: "AI 自动化流程",
    desc: "把重复任务拆成节点、状态、日志和兜底机制，让流程真正可执行、可追踪、可复用。",
    meta: "Workflow · State · Recovery",
  },
  {
    tag: "03",
    label: "AGENT",
    icon: "agent",
    visual: "agent",
    title: "AI Agent 系统",
    desc: "设计任务规划、工具调用、记忆、验证与人工接管机制，让 AI 不只是回答问题。",
    meta: "Plan · Tool · Verify",
  },
  {
    tag: "04",
    label: "DESIGN",
    icon: "manga",
    visual: "manga",
    title: "AI 设计生成",
    desc: "融合审美判断、提示词、图像生成与商业视觉，产出真正可用、可交付的视觉资产。",
    meta: "Prompt · Image · Visual",
  },
  {
    tag: "05",
    label: "DATA",
    icon: "eye",
    visual: "eye",
    title: "数据能力",
    desc: "完成采集、清洗、结构化、分析与筛选，让数据不只是信息，而是进入决策系统。",
    meta: "Collect · Clean · Decide",
  },
  {
    tag: "06",
    label: "PRODUCT",
    icon: "product",
    visual: "product",
    title: "产品化思维",
    desc: "不止做 Demo，而是把 AI 能力包装成有入口、有反馈、有边界、有迭代闭环的真实产品。",
    meta: "MVP · UX · Iteration",
  },
];

const storyFrames = [
  {
    no: "01",
    title: "发现问题",
    english: "Detect Chaos",
    signal: "发现混乱",
    desc: "识别低效、重复、不可追踪的工作节点，找到真正需要被系统化的入口。",
    meta: "Observe / Locate / Define",
    visual: "chaos",
  },
  {
    no: "02",
    title: "拆解系统",
    english: "Map the System",
    signal: "建模结构",
    desc: "把问题拆成数据、界面、逻辑、状态与自动化节点，形成可执行结构。",
    meta: "Data / UI / Logic / Nodes",
    visual: "map",
  },
  {
    no: "03",
    title: "接入 AI",
    english: "Inject Intelligence",
    signal: "接入智能",
    desc: "让 AI 参与分析、生成、判断、调用工具与验证结果，而不是只停留在回答。",
    meta: "LLM / Agent / Tool Call",
    visual: "inject",
  },
  {
    no: "04",
    title: "构建产品",
    english: "Ship the Interface",
    signal: "产品化交付",
    desc: "把系统能力包装成清晰入口、可操作界面、反馈机制与真实交付流程。",
    meta: "Prototype / Build / Deploy",
    visual: "ship",
  },
  {
    no: "05",
    title: "持续进化",
    english: "Evolve by Feedback",
    signal: "反馈进化",
    desc: "通过真实使用、数据回流、错误记录和迭代，让系统不断增强。",
    meta: "Feedback / Data / Iterate",
    visual: "evolve",
  },
];

const practicePanels = [
  {
    no: "01",
    title: "AI 编程基础",
    desc: "把 AI 当成工程协作者，而不是代码补全插件：先读懂项目，再明确目标、生成补丁、运行验证、复盘问题。",
    points: ["读懂目录与依赖", "拆需求与改动范围", "生成补丁并验证"],
    meta: "Read / Patch / Verify",
  },
  {
    no: "02",
    title: "Agent开发",
    desc: "把一次对话升级成可执行系统：让 Agent 会规划、会调用工具、会保留上下文、会验证结果，也知道什么时候交还给人。",
    points: ["规划器与任务状态", "工具调用与记忆", "验证、回滚与人工接管"],
    meta: "Plan / Tools / Handoff",
  },
];

const systems = [
  {
    no: "01",
    title: "AI Automation Engine",
    cnTitle: "AI 自动化引擎",
    desc: "把重复工作转化为可监控、可恢复、可复用的自动化流程。",
    flow: "Input → Process → Verify → Output",
    status: "Building",
    stack: ["Next.js", "Python", "Playwright", "LLM", "Database"],
    visual: "automation",
  },
  {
    no: "02",
    title: "AI Product Interface",
    cnTitle: "AI 产品界面系统",
    desc: "把模型能力包装成用户真正能理解、能操作、能反馈的产品界面。",
    flow: "UX · Interaction · Feedback · Delivery",
    status: "Testing",
    stack: ["UI System", "AI UX", "API", "Feedback"],
    visual: "interface",
  },
  {
    no: "03",
    title: "Data Intelligence Core",
    cnTitle: "数据智能核心",
    desc: "把分散数据变成可筛选、可解释、可进入决策的智能资产。",
    flow: "Collect · Clean · Analyze · Decide",
    status: "Building",
    stack: ["Data Cleaning", "Database", "Analysis", "Decision"],
    visual: "data",
  },
];

const orbitGroups = [
  {
    id: "foundation",
    label: "Foundation Model Orbit",
    items: ["LLM", "Transformer", "Attention", "Tokenization", "Embedding", "MoE", "Multimodal"],
    radius: 50,
    ellipse: 0.74,
    tilt: -10,
    duration: 38,
    direction: "cw",
    accent: "rgba(245,248,255,0.88)",
    priority: ["LLM", "Transformer", "Multimodal"],
  },
  {
    id: "agent",
    label: "Agentic System Orbit",
    items: ["AI Agent", "Tool Calling", "Memory", "Planner", "Reflection", "MCP", "Human-in-loop"],
    radius: 60,
    ellipse: 0.70,
    tilt: 20,
    duration: 46,
    direction: "ccw",
    accent: "rgba(160,232,255,0.78)",
    priority: ["AI Agent", "Tool Calling", "MCP"],
  },
  {
    id: "rag",
    label: "RAG & Knowledge Orbit",
    items: ["RAG", "Vector DB", "Semantic Search", "Chunking", "Re-ranking", "Knowledge Graph", "Retrieval"],
    radius: 70,
    ellipse: 0.66,
    tilt: -25,
    duration: 52,
    direction: "cw",
    accent: "rgba(180,238,255,0.70)",
    priority: ["RAG", "Vector DB", "Knowledge Graph"],
  },
  {
    id: "training",
    label: "Training Orbit",
    items: ["Fine-tuning", "LoRA", "QLoRA", "SFT", "Distillation", "Quantization", "Evaluation"],
    radius: 80,
    ellipse: 0.62,
    tilt: 13,
    duration: 58,
    direction: "ccw",
    accent: "rgba(210,230,255,0.64)",
    priority: ["Fine-tuning", "LoRA", "Evaluation"],
  },
  {
    id: "rl",
    label: "RL & Optimization Orbit",
    items: ["RLHF", "PPO", "DPO", "Reward Model", "Policy", "Bandit", "Heuristics"],
    radius: 90,
    ellipse: 0.58,
    tilt: -17,
    duration: 64,
    direction: "cw",
    accent: "rgba(168,138,255,0.68)",
    priority: ["RLHF", "DPO", "Reward Model"],
  },
  {
    id: "language",
    label: "Language Orbit",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "HTML/CSS", "Bash", "JSON/YAML"],
    radius: 100,
    ellipse: 0.54,
    tilt: 27,
    duration: 70,
    direction: "ccw",
    accent: "rgba(220,236,255,0.62)",
    priority: ["Python", "TypeScript", "SQL"],
  },
  {
    id: "app",
    label: "Application Orbit",
    items: ["React", "Next.js", "Tailwind", "Framer", "Mini Program", "App", "PWA"],
    radius: 110,
    ellipse: 0.50,
    tilt: -7,
    duration: 76,
    direction: "cw",
    accent: "rgba(125,249,255,0.70)",
    priority: ["React", "Next.js", "App"],
  },
  {
    id: "backend",
    label: "Backend & Infra Orbit",
    items: ["Node.js", "FastAPI", "NestJS", "PostgreSQL", "Redis", "Docker", "API Gateway"],
    radius: 120,
    ellipse: 0.47,
    tilt: 31,
    duration: 82,
    direction: "ccw",
    accent: "rgba(190,220,255,0.60)",
    priority: ["FastAPI", "PostgreSQL", "Docker"],
  },
  {
    id: "automation",
    label: "Automation Orbit",
    items: ["Playwright", "Crawler", "Browser", "RPA", "Workflow", "Scheduler", "Webhook"],
    radius: 130,
    ellipse: 0.44,
    tilt: -29,
    duration: 50,
    direction: "cw",
    accent: "rgba(125,249,255,0.76)",
    priority: ["Playwright", "Crawler", "Workflow"],
  },
  {
    id: "data-visual",
    label: "Data & Visual Orbit",
    items: ["Pandas", "ETL", "Analytics", "AI Image", "UI Design", "Motion", "Visual System"],
    radius: 140,
    ellipse: 0.42,
    tilt: 18,
    duration: 88,
    direction: "ccw",
    accent: "rgba(174,145,255,0.70)",
    priority: ["Pandas", "AI Image", "UI Design"],
  },
];

const fontStyles = {
  serif: { fontFamily: '"Songti SC", "Noto Serif SC", "STSong", "SimSun", serif' },
  ui: { fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Helvetica Neue", Arial, sans-serif' },
  mono: { fontFamily: '"SF Mono", "JetBrains Mono", "Cascadia Code", Consolas, monospace' },
};

function Icon({ name, className = "h-4 w-4" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    arrow: <path d="M7 17 17 7M9 7h8v8" />,
    github: (
      <>
        <path d="M9 19c-4 1.2-4-2-5.5-2.5" />
        <path d="M15 22v-3.9c0-1 .3-1.7.8-2.2 2.8-.3 5.7-1.4 5.7-6.2 0-1.4-.5-2.6-1.3-3.6.1-.3.6-1.8-.1-3.6 0 0-1-.3-3.6 1.4a12.4 12.4 0 0 0-6.5 0C7.4 2.2 6.4 2.5 6.4 2.5c-.7 1.8-.2 3.3-.1 3.6A5.2 5.2 0 0 0 5 9.7c0 4.8 2.9 5.8 5.7 6.2.4.4.7 1 .8 1.8V22" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M5 20h14" />
      </>
    ),
    file: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
        <path d="M14 3v5h5" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <circle cx="8.5" cy="10.5" r="1.5" />
        <path d="m21 15-4.5-4.5L9 18" />
      </>
    ),
    share: (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="m8.6 10.6 6.8-4.2" />
        <path d="m8.6 13.4 6.8 4.2" />
      </>
    ),
    close: (
      <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </>
    ),
    spark: (
      <>
        <path d="M12 2v5" />
        <path d="M12 17v5" />
        <path d="M4.22 4.22 7.76 7.76" />
        <path d="m16.24 16.24 3.54 3.54" />
        <path d="M2 12h5" />
        <path d="M17 12h5" />
        <path d="m4.22 19.78 3.54-3.54" />
        <path d="m16.24 7.76 3.54-3.54" />
      </>
    ),
    core: (
      <>
        <path d="M12 3.5 19.5 8v8L12 20.5 4.5 16V8L12 3.5Z" />
        <path d="M12 8.2 15.5 10.2v3.6L12 15.8l-3.5-2v-3.6L12 8.2Z" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] || paths.core}</svg>;
}

function CTAButton({ href, children, variant = "primary", icon, onClick }) {
  const base = "group inline-flex min-w-0 items-center justify-center gap-2 rounded-full px-3 py-3 text-sm font-medium transition duration-300 sm:gap-3 sm:px-6 sm:py-3.5 sm:text-base";
  const styles = variant === "primary"
    ? "border border-white/10 bg-white/[0.035] text-white/74 shadow-none hover:border-cyan-100/34 hover:bg-white/[0.105] hover:text-white hover:shadow-[0_18px_54px_rgba(77,163,255,0.14)]"
    : "border border-white/10 bg-white/[0.035] text-white/74 hover:border-white/22 hover:bg-white/[0.065] hover:text-white";

  return (
    <motion.a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noreferrer" : undefined} onClick={onClick} whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.985 }} className={`${base} ${styles}`}>
      {icon ? <Icon name={icon} className="h-4 w-4 shrink-0 text-white/82" /> : null}
      <span className="whitespace-nowrap">{children}</span>
      {variant === "primary" ? <Icon name="arrow" className="h-4 w-4 opacity-55 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> : null}
    </motion.a>
  );
}

function ShareButton({ status, onShare }) {
  return (
    <div className="relative min-w-0">
      <motion.button
        type="button"
        onClick={onShare}
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.985 }}
        className="group inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-3 text-sm font-medium text-white/78 transition duration-300 hover:border-cyan-100/34 hover:bg-white/[0.105] hover:text-white sm:gap-3 sm:px-6 sm:py-3.5 sm:text-base"
      >
        <Icon name="share" className="h-4 w-4 shrink-0 text-white/82" />
        <span className="whitespace-nowrap">{status || "分享主页"}</span>
      </motion.button>
    </div>
  );
}

function AICoreCanvas({ pointer, booting }) {
  const canvasRef = useRef(null);
  const pointerRef = useRef(pointer || { x: 0, y: 0, px: 50, py: 50, active: false });
  const bootRef = useRef(booting);

  useEffect(() => {
    pointerRef.current = pointer || { x: 0, y: 0, px: 50, py: 50, active: false };
  }, [pointer]);

  useEffect(() => {
    bootRef.current = booting;
  }, [booting]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let rafId = 0;
    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastRenderTime = 0;
    const frameInterval = 1000 / 30;
    let running = true;
    let inView = true;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mono = '"SF Mono", "JetBrains Mono", Consolas, monospace';
    const ui = 'Inter, "SF Pro Display", system-ui, sans-serif';
    const lerp = (a, b, t) => a + (b - a) * t;

    const nodes = [
      [0, 0, 0.15, 4.8], [-0.66, -0.6, -0.16, 1.35], [-0.38, -0.74, 0.2, 1.05], [-0.02, -0.7, -0.08, 1.15], [0.34, -0.6, 0.14, 1.25], [0.64, -0.4, -0.14, 1.12],
      [-0.74, -0.18, 0.1, 1], [-0.48, -0.32, -0.18, 0.9], [-0.16, -0.3, 0.16, 0.86], [0.18, -0.28, -0.16, 0.92], [0.54, -0.08, 0.18, 1.02],
      [-0.72, 0.18, -0.08, 1], [-0.4, 0.08, 0.18, 0.88], [-0.04, 0.08, -0.18, 0.96], [0.3, 0.14, 0.18, 0.9], [0.62, 0.26, -0.12, 1.02],
      [-0.48, 0.52, 0.14, 0.92], [-0.14, 0.44, -0.06, 0.94], [0.22, 0.5, 0.14, 0.9], [0.52, 0.58, -0.16, 0.88], [0.02, 0.7, 0.08, 0.86],
    ];
    for (let i = 0; i < 18; i += 1) {
      const a = i * 2.399;
      const r = 0.18 + ((i * 37) % 55) / 100;
      nodes.push([Math.cos(a) * r, Math.sin(a * 0.8) * r * 0.85, Math.sin(a) * r, 0.46 + (i % 4) * 0.1]);
    }

    const edges = [[0, 1], [0, 3], [0, 5], [0, 6], [0, 10], [0, 11], [0, 15], [0, 17], [0, 20], [1, 2], [2, 3], [3, 4], [4, 5], [1, 7], [7, 8], [8, 9], [9, 10], [6, 7], [6, 11], [7, 12], [8, 13], [9, 14], [10, 15], [11, 12], [12, 13], [13, 14], [14, 15], [11, 16], [12, 16], [13, 17], [14, 18], [15, 19], [16, 17], [17, 20], [18, 20], [18, 19]];
    for (let i = 21; i < nodes.length; i += 1) edges.push([i, i % 20], [i, 0]);

    const columns = [
      { x: -86, alpha: 0.18, speed: 0.145, words: ["embed", "decode", "logits", "verify"] },
      { x: -42, alpha: 0.36, speed: 0.19, words: ["encode(input)", "softmax", "LayerNorm", "FFN"] },
      { x: 0, alpha: 0.88, speed: 0.25, words: ["const tokens = ...", "Q · K · V", "softmax(QKᵀ/√dₖ)", "agent.plan()", "return output"] },
      { x: 42, alpha: 0.36, speed: 0.19, words: ["vector.search()", "memory.sync", "tool.call()", "reason()"] },
      { x: 86, alpha: 0.18, speed: 0.145, words: ["ctx += V", "z = norm(x)", "attn(...)", "decode"] },
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const clear = () => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ellipse = (cx, cy, rx, ry, rot, color, alpha, lineWidth = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };

    const render = (time = 0) => {
      if (!running || !inView || prefersReducedMotion) return;
      if (time - lastRenderTime < frameInterval) {
        rafId = requestAnimationFrame(render);
        return;
      }
      lastRenderTime = time;
      frame += 1;
      const t = frame / 30;
      const p = pointerRef.current || { x: 0, y: 0, active: false };
      const boost = bootRef.current ? 1.42 : 1;
      clear();

      const cx = width * 0.51 + p.x * 0.16;
      const cy = height * 0.47 + p.y * 0.1;
      const radius = Math.min(width, height) * 0.232;

      const bg = ctx.createRadialGradient(cx, cy, radius * 0.18, cx, cy, radius * 3.2);
      bg.addColorStop(0, "rgba(85,160,255,0.14)");
      bg.addColorStop(0.45, "rgba(18,26,50,0.12)");
      bg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 4; i += 1) {
        ellipse(cx, cy, radius * (2.28 + i * 0.34), radius * (1.56 + i * 0.2), -0.12 + i * 0.14 + t * (i % 2 ? -0.012 : 0.01), i === 1 ? "rgba(140,110,255,0.16)" : "rgba(125,249,255,0.12)", 0.46 - i * 0.08);
      }

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `500 ${Math.max(9, Math.min(12, width * 0.0105))}px ${mono}`;
      columns.forEach((col, ci) => {
        for (let si = 0; si < 4; si += 1) {
          const progress = (t * col.speed + ci * 0.08 + si * 0.245) % 1;
          const y = height * 0.07 + progress * (cy - radius * 0.72 - height * 0.07);
          const x = cx + col.x * (1 - Math.pow(progress, 1.55) * 0.58) + Math.sin(t * 0.42 + si + ci) * 1.2;
          const a = Math.min(1, progress / 0.16) * Math.min(1, (1 - progress) / 0.22) * col.alpha;
          ctx.save();
          ctx.globalAlpha = a;
          ctx.fillStyle = ci === 2 ? "rgba(235,245,255,0.88)" : "rgba(150,215,245,0.58)";
          ctx.shadowBlur = ci === 2 ? 10 : 6;
          ctx.shadowColor = "rgba(125,249,255,0.25)";
          ctx.fillText(col.words[(si + ci) % col.words.length], x, y);
          ctx.restore();
          for (let tail = 1; tail <= 4; tail += 1) {
            ctx.save();
            ctx.globalAlpha = a * (0.18 / tail);
            ctx.fillStyle = tail % 2 ? "rgba(125,249,255,0.8)" : "rgba(235,245,255,0.65)";
            ctx.beginPath();
            ctx.arc(x + Math.sin(t + tail + ci) * 2, y - tail * 10, 0.9, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      });
      ctx.restore();

      [[1.78, 0.42, -0.3, 1.06, "rgba(125,249,255,0.60)"], [1.56, 0.35, 0.22, 0.82, "rgba(148,118,255,0.58)"], [1.44, 0.28, 0.72, 0.6, "rgba(235,245,255,0.52)"], [1.3, 0.24, -0.84, 0.5, "rgba(90,170,255,0.56)"]].forEach(([rxm, rym, rot, speed, color], oi) => {
        const rx = radius * rxm;
        const ry = radius * rym;
        ellipse(cx, cy + radius * 0.04, rx, ry, rot, color, 0.3, oi === 0 ? 1.35 : 1);
        for (let i = 0; i < 16; i += 1) {
          const a = t * speed + i * 0.4 + oi * 0.8;
          const x = cx + Math.cos(a) * rx * Math.cos(rot) - Math.sin(a) * ry * Math.sin(rot);
          const y = cy + radius * 0.04 + Math.cos(a) * rx * Math.sin(rot) + Math.sin(a) * ry * Math.cos(rot);
          ctx.save();
          ctx.globalAlpha = 0.1 + ((Math.sin(a + t) + 1) / 2) * 0.26;
          ctx.fillStyle = color;
          ctx.shadowBlur = 12;
          ctx.shadowColor = color;
          ctx.beginPath();
          ctx.arc(x, y, 0.9 + (i % 4) * 0.22, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      const echoY = cy + radius * 1.3;
      const echo = ctx.createRadialGradient(cx, echoY, radius * 0.08, cx, echoY, radius * 1.45);
      echo.addColorStop(0, "rgba(160,232,255,0.16)");
      echo.addColorStop(0.4, "rgba(120,210,255,0.08)");
      echo.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = echo;
      ctx.beginPath();
      ctx.ellipse(cx, echoY, radius * 1.18, radius * 0.18, 0, 0, Math.PI * 2);
      ctx.fill();

      const shellGlow = ctx.createRadialGradient(cx, cy, radius * 0.12, cx, cy, radius * 1.9);
      shellGlow.addColorStop(0, `rgba(242,247,255,${0.42 * boost})`);
      shellGlow.addColorStop(0.24, "rgba(160,232,255,0.24)");
      shellGlow.addColorStop(0.52, "rgba(90,170,255,0.16)");
      shellGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = shellGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.85, 0, Math.PI * 2);
      ctx.fill();

      const sphere = ctx.createRadialGradient(cx - radius * 0.28, cy - radius * 0.32, radius * 0.16, cx, cy, radius);
      sphere.addColorStop(0, "rgba(160,232,255,0.24)");
      sphere.addColorStop(0.18, "rgba(125,220,255,0.22)");
      sphere.addColorStop(0.38, "rgba(120,210,255,0.20)");
      sphere.addColorStop(0.6, "rgba(90,170,255,0.14)");
      sphere.addColorStop(0.82, "rgba(148,118,255,0.12)");
      sphere.addColorStop(1, "rgba(8,12,24,0.36)");
      ctx.fillStyle = sphere;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(235,245,255,0.70)";
      ctx.lineWidth = 1.15;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(120,210,255,0.18)";
      ctx.lineWidth = 4.2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.01, 0, Math.PI * 2);
      ctx.stroke();

      const rotY = t * 0.22 + p.x * 0.0032;
      const rotX = p.y * 0.0015 + Math.sin(t * 0.25) * 0.05;
      const projected = nodes.map(([nx, ny, nz, size]) => {
        const x1 = nx * Math.cos(rotY) - nz * Math.sin(rotY);
        const z1 = nx * Math.sin(rotY) + nz * Math.cos(rotY);
        const y2 = ny * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = ny * Math.sin(rotX) + z1 * Math.cos(rotX);
        const depth = (z2 + 1) / 2;
        const scale = 0.78 + depth * 0.42;
        return { x: cx + x1 * radius * 0.86 * scale, y: cy + y2 * radius * 0.86 * scale, depth, size: size * scale };
      });

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.965, 0, Math.PI * 2);
      ctx.clip();
      edges.forEach(([a, b], i) => {
        const n1 = projected[a];
        const n2 = projected[b];
        const depth = (n1.depth + n2.depth) / 2;
        ctx.strokeStyle = `rgba(125,249,255,${0.1 + depth * 0.26 + ((Math.sin(t * 1.4 + i) + 1) / 2) * 0.06})`;
        ctx.lineWidth = a === 0 || b === 0 ? 0.9 : 0.48;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
        const pr = (t * (a === 0 || b === 0 ? 0.56 : 0.32) + i * 0.047) % 1;
        const px = lerp(n1.x, n2.x, pr);
        const py = lerp(n1.y, n2.y, pr);
        ctx.fillStyle = "rgba(242,247,255,0.96)";
        ctx.shadowBlur = 14;
        ctx.shadowColor = "rgba(125,249,255,0.76)";
        ctx.beginPath();
        ctx.arc(px, py, a === 0 || b === 0 ? 1.45 : 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      projected.forEach((n, i) => {
        const pulse = (Math.sin(t * 2.3 + i * 0.65) + 1) / 2;
        ctx.fillStyle = i === 0 ? "rgba(242,247,255,0.98)" : `rgba(125,249,255,${0.24 + n.depth * 0.48 + pulse * 0.18})`;
        ctx.shadowBlur = i === 0 ? 26 : 10;
        ctx.shadowColor = i === 0 ? "rgba(242,247,255,0.85)" : "rgba(125,249,255,0.72)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, i === 0 ? n.size * 1.08 : n.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      ctx.restore();

      const ai = ctx.createLinearGradient(cx - radius * 0.22, cy - radius * 0.24, cx + radius * 0.24, cy + radius * 0.3);
      ai.addColorStop(0, "rgba(245,248,255,0.98)");
      ai.addColorStop(0.48, "rgba(255,255,255,0.96)");
      ai.addColorStop(1, "rgba(180,230,255,0.90)");
      ctx.save();
      ctx.font = `600 ${Math.max(62, radius * 0.36)}px ${ui}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = ai;
      ctx.shadowBlur = 28;
      ctx.shadowColor = "rgba(235,245,255,0.45)";
      ctx.fillText("AI", cx, cy + radius * 0.03);
      ctx.restore();

      for (let i = 0; i < 14; i += 1) {
        const x = ((i * 97 + t * (12 + (i % 4) * 2.2) * 18) % (width + 40)) - 20;
        const y = height * (0.16 + ((i * 37) % 60) / 100) + Math.sin(t * 0.5 + i) * 8;
        ctx.save();
        ctx.globalAlpha = 0.02 + ((Math.sin(t + i) + 1) / 2) * 0.05;
        ctx.fillStyle = "rgba(245,248,255,0.96)";
        ctx.beginPath();
        ctx.arc(x, y, 1 + (i % 3) * 0.22, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      rafId = requestAnimationFrame(render);
    };

    resize();
    const observer = new IntersectionObserver(([entry]) => {
      inView = Boolean(entry?.isIntersecting);
      if (inView && !prefersReducedMotion) {
        window.cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(render);
      }
    }, { rootMargin: "220px 0px" });
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    if (!prefersReducedMotion) rafId = requestAnimationFrame(render);
    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

function AILabel({ title, subtitle, className = "", align = "left", tier = "secondary", pointer, children }) {
  const styles = {
    primary: { move: 0.045, opacity: [0.84, 1, 0.84], wrapper: "max-w-[270px]", title: "text-[13px] font-semibold tracking-[0.13em] text-cyan-50/95", subtitle: "text-[12px] leading-5 text-cyan-50/78", dot: "bg-cyan-100/90 shadow-[0_0_20px_rgba(180,240,255,0.9)]", line: "via-cyan-100/42", visual: "opacity-95" },
    secondary: { move: 0.032, opacity: [0.62, 0.82, 0.62], wrapper: "max-w-[235px]", title: "text-[13px] font-medium tracking-[0.1em] text-cyan-50/82", subtitle: "text-[12px] leading-5 text-cyan-50/66", dot: "bg-cyan-200/64 shadow-[0_0_14px_rgba(125,249,255,0.45)]", line: "via-cyan-100/22", visual: "opacity-70" },
  };
  const tone = styles[tier] || styles.secondary;

  return (
    <motion.div animate={{ x: pointer?.active ? pointer.x * tone.move : 0, y: pointer?.active ? pointer.y * tone.move : 0, opacity: tone.opacity }} transition={{ x: { type: "spring", stiffness: 58, damping: 19 }, y: { type: "spring", stiffness: 58, damping: 19 }, opacity: { duration: 3.4, repeat: Infinity, ease: "easeInOut" } }} className={`pointer-events-none absolute z-[32] hidden ${tone.wrapper} text-white lg:block ${className}`}>
      <div className={`mb-2 flex items-center gap-3 ${align === "right" ? "justify-end" : "justify-start"}`}>
        <span className={`h-2.5 w-2.5 rounded-full border border-cyan-100/34 ${tone.dot}`} />
        <p className={`uppercase ${tone.title}`}>{title}</p>
      </div>
      <p style={fontStyles.mono} className={`${tone.subtitle} ${align === "right" ? "text-right" : "text-left"}`}>{subtitle}</p>
      <div className={`mt-3 h-px w-full bg-gradient-to-r from-transparent ${tone.line} to-transparent ${align === "right" ? "ml-auto" : ""}`} />
      <div className={`mt-3 ${tone.visual}`}>{children}</div>
    </motion.div>
  );
}

function MiniNetwork({ align = "left" }) {
  const points = [[12, 42], [18, 20], [35, 28], [52, 12], [58, 36], [84, 20], [106, 34]];
  return (
    <svg viewBox="0 0 128 58" className={`h-[58px] w-[128px] ${align === "right" ? "ml-auto" : ""}`}>
      {points.map(([x, y], index) => (
        <g key={index}>
          {index < points.length - 1 ? <line x1={x} y1={y} x2={points[index + 1][0]} y2={points[index + 1][1]} stroke="rgba(170,230,255,0.34)" strokeWidth="0.9" /> : null}
          <motion.circle cx={x} cy={y} r="3" fill="rgba(232,246,255,0.96)" animate={{ opacity: [0.38, 1, 0.38] }} transition={{ duration: 2.2 + index * 0.08, repeat: Infinity, ease: "easeInOut" }} />
        </g>
      ))}
    </svg>
  );
}

function MiniTransformer() {
  return (
    <svg viewBox="0 0 136 82" className="ml-auto h-[72px] w-[136px]">
      {Array.from({ length: 14 }).map((_, index) => {
        const angle = (index / 14) * Math.PI * 2;
        const x = 68 + Math.cos(angle) * 31;
        const y = 41 + Math.sin(angle) * 31;
        return (
          <g key={index}>
            <line x1="68" y1="41" x2={x} y2={y} stroke="rgba(170,230,255,0.32)" strokeWidth="0.9" />
            <motion.circle cx={x} cy={y} r="3" fill={index % 3 === 0 ? "rgba(174,145,255,0.92)" : "rgba(232,246,255,0.96)"} animate={{ opacity: [0.36, 1, 0.36] }} transition={{ duration: 2 + index * 0.05, repeat: Infinity, ease: "easeInOut" }} />
          </g>
        );
      })}
      <circle cx="68" cy="41" r="5" fill="rgba(255,255,255,0.98)" />
    </svg>
  );
}

function MiniWave({ align = "left", weak = false }) {
  const xs = [4, 28, 52, 76, 100, 124];
  const ys = [26, 13, 18, 12, 15, 22];
  return (
    <svg viewBox="0 0 128 38" className={`h-[38px] w-[128px] ${align === "right" ? "ml-auto" : ""}`}>
      <path d="M4,26 C20,7 36,31 52,18 C68,5 82,32 100,15 C110,7 118,11 124,22" fill="none" stroke={weak ? "rgba(125,249,255,0.24)" : "rgba(170,230,255,0.40)"} strokeWidth={weak ? "1" : "1.3"} />
      {xs.map((x, index) => <motion.circle key={index} cx={x} cy={ys[index]} r={weak ? "1.8" : "2.2"} fill="rgba(232,246,255,0.92)" animate={{ opacity: weak ? [0.25, 0.65, 0.25] : [0.35, 0.9, 0.35] }} transition={{ duration: 2.4 + index * 0.08, repeat: Infinity, ease: "easeInOut" }} />)}
    </svg>
  );
}

function AICoreScene({ booting = false }) {
  const [pointer, setPointer] = useState({ x: 0, y: 0, px: 50, py: 50, active: false });
  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const rx = (event.clientX - rect.left) / rect.width;
    const ry = (event.clientY - rect.top) / rect.height;
    setPointer({ x: (rx - 0.5) * 28, y: (ry - 0.5) * 28, px: rx * 100, py: ry * 100, active: true });
  };

  return (
    <motion.div onMouseMove={handleMouseMove} onMouseLeave={() => setPointer({ x: 0, y: 0, px: 50, py: 50, active: false })} className="relative mx-auto aspect-[1.16/1] w-full max-w-[1080px] overflow-clip rounded-[2.7rem] border border-cyan-100/18 bg-[#01030a] shadow-[inset_0_0_34px_rgba(120,180,255,0.07),0_0_64px_rgba(20,80,255,0.11),0_72px_180px_rgba(0,0,0,0.62)] backdrop-blur-md md:rounded-[4rem]">
      <div className="absolute inset-[2%] rounded-[2.35rem] border border-white/[0.12] md:rounded-[3.45rem]" />
      <div className="absolute inset-[2.8%] rounded-[2.15rem] border border-white/[0.04] md:rounded-[3.2rem]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(77,163,255,0.14),transparent_28%),radial-gradient(circle_at_77%_19%,rgba(118,88,220,0.12),transparent_24%),radial-gradient(circle_at_18%_74%,rgba(170,230,255,0.06),transparent_22%)]" />
      <motion.div className="absolute inset-0" animate={{ opacity: pointer.active ? 1 : 0.55 }} style={{ background: `radial-gradient(480px circle at ${pointer.px}% ${pointer.py}%, rgba(160,232,255,0.13), transparent 44%)` }} />
      <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.15)_1px,transparent_1px)] [background-size:48px_48px]" />
      <AICoreCanvas pointer={pointer} booting={booting} />

      <AILabel title="ATTENTION" subtitle="softmax(QKᵀ / √dₖ)V" className="left-[7.2%] top-[16.5%]" tier="primary" pointer={pointer}><MiniNetwork /></AILabel>
      <AILabel title="TRANSFORMER" subtitle="Attention Is All You Need" className="right-[6.8%] top-[17%] text-right" align="right" tier="primary" pointer={pointer}><MiniTransformer /></AILabel>
      <AILabel title="MoE" subtitle="Mixture of Experts" className="left-[6%] top-[42.5%]" pointer={pointer}><MiniWave weak /></AILabel>
      <AILabel title="MULTIMODAL" subtitle="Text · Image · Audio · Code" className="right-[5.8%] top-[43.5%] text-right" align="right" pointer={pointer}><MiniWave align="right" weak /></AILabel>
      <AILabel title="RAG" subtitle="Retrieval Augmented Generation" className="left-[8%] bottom-[18%]" pointer={pointer}><MiniWave weak /></AILabel>
      <AILabel title="RLHF" subtitle="Human Feedback Loop" className="right-[8.5%] bottom-[21%] text-right" align="right" pointer={pointer}><MiniWave align="right" weak /></AILabel>
    </motion.div>
  );
}

function CapabilityGlyph({ type, className = "h-5 w-5" }) {
  const common = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.65, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (type === "stack") return <svg {...common}><rect x="4" y="5" width="16" height="12" rx="2.5" /><path d="M7.5 9h3.5M7.5 12h6.5M15.5 9h1M8 20h8M12 17v3" /></svg>;
  if (type === "flow") return <svg {...common}><path d="M5 6.5h4.5a3 3 0 0 1 3 3v5a3 3 0 0 0 3 3H19" /><path d="M5 17.5h4.5a3 3 0 0 0 3-3v-5a3 3 0 0 1 3-3H19" /><circle cx="5" cy="6.5" r="1.5" /><circle cx="19" cy="6.5" r="1.5" /><circle cx="5" cy="17.5" r="1.5" /><circle cx="19" cy="17.5" r="1.5" /></svg>;
  if (type === "agent") return <svg {...common}><rect x="6" y="8" width="12" height="9" rx="3" /><path d="M12 8V5" /><circle cx="12" cy="4" r="1" /><path d="M9.5 12h.01M14.5 12h.01M10 15h4M4.5 13H6M18 13h1.5" /></svg>;
  if (type === "manga") return <svg {...common}><path d="M7 9.5c.9-2.5 2.7-4 5-4s4.1 1.5 5 4" /><path d="M6.5 10.5c.2 4.5 2.3 7 5.5 7s5.3-2.5 5.5-7" /><path d="M8 9c2.6-1.4 5.5-1.4 8 0M9.5 12h.01M14.5 12h.01M10.5 15c1 .6 2 .6 3 0M4.5 7.5 7 8.8M19.5 7.5 17 8.8" /></svg>;
  if (type === "eye") return <svg {...common}><path d="M3.5 12s3-5.5 8.5-5.5S20.5 12 20.5 12s-3 5.5-8.5 5.5S3.5 12 3.5 12Z" /><circle cx="12" cy="12" r="2.7" /><path d="M5.5 12h13" opacity="0.45" /></svg>;
  if (type === "product") return <svg {...common}><path d="M12 3.8 19 7.7v8.1l-7 4.4-7-4.4V7.7l7-3.9Z" /><path d="m5 7.7 7 4.1 7-4.1M12 11.8v8.4M8.2 5.6 15.2 9.7" /></svg>;
  return <Icon name="core" className={className} />;
}

function CapabilityHoverVisual({ type }) {
  if (type === "flow") {
    return (
      <svg className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" viewBox="0 0 360 230" preserveAspectRatio="none">
        <path d="M42 154 C96 86 146 185 196 112 C230 62 270 82 322 40" fill="none" stroke="rgba(160,232,255,0.16)" strokeWidth="1.2" />
        {[0, 1, 2].map((i) => <motion.circle key={i} r="3" fill="rgba(220,246,255,0.85)" animate={{ cx: [42, 96, 196, 322], cy: [154, 86, 112, 40], opacity: [0, 1, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.55 }} />)}
      </svg>
    );
  }
  if (type === "manga") {
    return (
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute right-6 top-8 h-28 w-28 rounded-[2rem] border border-fuchsia-100/12 bg-[radial-gradient(circle_at_50%_36%,rgba(245,230,255,0.16),transparent_55%)]" />
        <svg className="absolute right-10 top-12 h-20 w-20 text-fuchsia-50/55" viewBox="0 0 100 100" fill="none"><path d="M28 42c5-16 17-24 32-19 11 4 18 15 15 30-3 17-13 27-29 25-16-3-25-17-18-36Z" stroke="currentColor" strokeWidth="2" /><path d="M34 42c12-9 27-9 39 0M40 53h.1M61 53h.1M44 65c5 4 11 4 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </div>
    );
  }
  if (type === "eye") {
    return (
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <svg className="absolute right-8 top-11 h-28 w-36 text-cyan-50/34" viewBox="0 0 160 110" fill="none"><path d="M18 55s23-34 62-34 62 34 62 34-23 34-62 34-62-34-62-34Z" stroke="currentColor" strokeWidth="2" /><circle cx="80" cy="55" r="16" stroke="currentColor" strokeWidth="2" /><circle cx="80" cy="55" r="5" fill="currentColor" /><motion.line x1="22" x2="138" y1="20" y2="20" stroke="rgba(160,232,255,0.82)" strokeWidth="2" animate={{ y1: [24, 86, 24], y2: [24, 86, 24], opacity: [0.1, 0.85, 0.1] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} /></svg>
      </div>
    );
  }
  if (type === "product") {
    return <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"><div className="absolute right-7 top-10 grid grid-cols-3 gap-2">{[0, 1, 2, 3, 4, 5].map((i) => <motion.div key={i} animate={{ y: [0, -4, 0], opacity: [0.24, 0.66, 0.24] }} transition={{ duration: 2.8 + i * 0.12, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }} className="h-7 w-7 rounded-lg border border-cyan-100/14 bg-white/[0.045]" />)}</div></div>;
  }
  if (type === "agent") {
    return <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">{[0, 1, 2, 3, 4].map((i) => <motion.span key={i} animate={{ scale: [0.8, 1.18, 0.8], opacity: [0.18, 0.62, 0.18] }} transition={{ duration: 2.2 + i * 0.18, repeat: Infinity, ease: "easeInOut", delay: i * 0.16 }} className="absolute h-2 w-2 rounded-full bg-cyan-100 shadow-[0_0_14px_rgba(160,232,255,0.66)]" style={{ right: `${42 + (i % 2) * 45}px`, top: `${42 + i * 24}px` }} />)}</div>;
  }
  return <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"><motion.div animate={{ x: [0, 10, 0], opacity: [0.22, 0.56, 0.22] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} className="absolute right-8 top-20 h-20 w-32 rounded-2xl border border-cyan-100/14 bg-black/20 p-3"><div className="mb-2 h-1 w-10 rounded-full bg-cyan-100/34" /><div className="mb-1 h-1 w-20 rounded-full bg-white/16" /><div className="mb-1 h-1 w-14 rounded-full bg-white/12" /><div className="h-1 w-24 rounded-full bg-cyan-100/18" /></motion.div></div>;
}

function CapabilityChip({ item, index }) {
  const accentMap = ["from-cyan-200/22 via-blue-300/10 to-transparent", "from-sky-200/20 via-cyan-300/10 to-transparent", "from-violet-200/20 via-blue-300/10 to-transparent", "from-fuchsia-200/16 via-cyan-200/10 to-transparent", "from-blue-100/18 via-slate-100/8 to-transparent", "from-white/16 via-cyan-100/8 to-transparent"];
  return (
    <motion.article initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }} className="group relative min-h-[250px] overflow-clip rounded-[2rem] border border-white/[0.095] bg-[linear-gradient(145deg,rgba(255,255,255,0.078),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_76px_rgba(0,0,0,0.24)] backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-cyan-100/24 hover:bg-white/[0.072]">
      <div className={`absolute inset-0 bg-gradient-to-br ${accentMap[index % accentMap.length]} opacity-60 transition duration-500 group-hover:opacity-100`} />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/26 to-transparent opacity-70" />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 18 + index * 2, repeat: Infinity, ease: "linear" }} className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-cyan-100/[0.055] transition duration-500 group-hover:border-cyan-100/[0.12]" />
      <CapabilityHoverVisual type={item.visual} />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-10 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.08, rotate: index % 2 ? -3 : 3 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} className="relative grid h-12 w-12 place-items-center rounded-2xl border border-cyan-100/14 bg-black/26 text-cyan-50/82 shadow-[inset_0_0_18px_rgba(160,232,255,0.045)] transition duration-500 group-hover:border-cyan-100/28 group-hover:text-white group-hover:shadow-[inset_0_0_22px_rgba(160,232,255,0.08),0_0_28px_rgba(125,249,255,0.12)]">
              <CapabilityGlyph type={item.icon} className="h-5 w-5" />
            </motion.div>
            <div><p style={fontStyles.mono} className="text-[12px] uppercase tracking-[0.18em] text-cyan-50/48 transition duration-500 group-hover:text-cyan-50/68">{item.label}</p><p style={fontStyles.mono} className="mt-1 text-[12px] text-white/40 transition duration-500 group-hover:text-white/52">MODULE {item.tag}</p></div>
          </div>
          <span style={fontStyles.mono} className="text-[12px] text-white/36 transition duration-500 group-hover:text-white/52">{item.tag}</span>
        </div>
        <h3 className="text-[1.28rem] font-semibold tracking-[-0.025em] text-white/96 transition duration-500 group-hover:text-white">{item.title}</h3>
        <p className="mt-4 max-w-[92%] text-base leading-7 text-white/62 transition duration-500 group-hover:text-white/72">{item.desc}</p>
        <div className="mt-auto pt-6"><div className="flex items-center justify-between border-t border-white/[0.07] pt-4 transition duration-500 group-hover:border-cyan-100/12"><p style={fontStyles.mono} className="text-[12px] uppercase tracking-[0.1em] text-cyan-50/50 transition duration-500 group-hover:text-cyan-50/62">{item.meta}</p><span className="h-1.5 w-10 rounded-full bg-gradient-to-r from-transparent via-cyan-100/42 to-transparent transition duration-500 group-hover:w-16 group-hover:via-cyan-100/70" /></div></div>
      </div>
    </motion.article>
  );
}

function SectionHeader({ eyebrow, title, desc, dark = false }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="mx-auto mb-16 max-w-4xl text-center">
      <p style={fontStyles.mono} className={`mb-4 text-[11px] uppercase tracking-[0.32em] ${dark ? "text-cyan-50/45" : "text-neutral-500"}`}>{eyebrow}</p>
      <h2 className={`text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.055em] md:text-[4rem] ${dark ? "bg-gradient-to-b from-white via-slate-100/88 to-white/38 bg-clip-text text-transparent" : "text-neutral-950"}`}>{title}</h2>
      {desc ? <p className={`mx-auto mt-5 max-w-2xl text-base leading-8 ${dark ? "text-white/44" : "text-neutral-600"}`}>{desc}</p> : null}
    </motion.div>
  );
}

function StoryVisual({ type, index }) {
  if (type === "chaos") {
    return (
      <svg viewBox="0 0 220 120" className="h-28 w-full text-cyan-50/50">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.path
            key={`chaos-${i}`}
            d={`M${18 + i * 11} ${30 + (i % 3) * 13} C ${54 + i * 10} ${6 + i * 7}, ${82 + i * 13} ${116 - i * 9}, ${194 - i * 7} ${34 + (i % 2) * 30}`}
            fill="none"
            stroke={i % 2 ? "rgba(160,232,255,0.34)" : "rgba(160,140,255,0.28)"}
            strokeWidth="1.2"
            animate={{ pathLength: [0.18, 1, 0.18], opacity: [0.22, 0.72, 0.22] }}
            transition={{ duration: 3.2 + i * 0.22, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
          />
        ))}
        <circle cx="42" cy="30" r="3" fill="rgba(232,246,255,0.86)" />
        <circle cx="172" cy="82" r="2.5" fill="rgba(125,249,255,0.72)" />
      </svg>
    );
  }

  if (type === "map") {
    const nodes = [[36, 28], [86, 22], [146, 34], [58, 78], [116, 72], [176, 82]];
    return (
      <svg viewBox="0 0 220 120" className="h-28 w-full text-cyan-50/50">
        {nodes.map(([x, y], i) => (
          <g key={`map-${i}`}>
            {i < nodes.length - 1 ? <line x1={x} y1={y} x2={nodes[i + 1][0]} y2={nodes[i + 1][1]} stroke="rgba(160,232,255,0.22)" strokeWidth="1" /> : null}
            {i + 2 < nodes.length ? <line x1={x} y1={y} x2={nodes[i + 2][0]} y2={nodes[i + 2][1]} stroke="rgba(160,140,255,0.14)" strokeWidth="1" /> : null}
            <motion.circle
              cx={x}
              cy={y}
              r="4"
              fill="rgba(232,246,255,0.86)"
              animate={{ opacity: [0.35, 1, 0.35], r: [3, 4.6, 3] }}
              transition={{ duration: 2.4 + i * 0.12, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        ))}
        <rect x="28" y="18" width="164" height="78" rx="16" stroke="rgba(255,255,255,0.08)" fill="none" />
      </svg>
    );
  }

  if (type === "inject") {
    return (
      <svg viewBox="0 0 220 120" className="h-28 w-full">
        <defs>
          <radialGradient id={`inject-core-${index}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
            <stop offset="45%" stopColor="rgba(125,249,255,0.34)" />
            <stop offset="100%" stopColor="rgba(125,249,255,0)" />
          </radialGradient>
        </defs>
        <circle cx="110" cy="62" r="34" fill={`url(#inject-core-${index})`} />
        {[0, 1, 2, 3].map((i) => {
          const y = 24 + i * 23;
          return (
            <motion.path
              key={`inject-${i}`}
              d={`M22 ${y} C 62 ${y - 16}, 78 ${62}, 110 62 C 144 62, 156 ${y + 12}, 198 ${y}`}
              fill="none"
              stroke={i % 2 ? "rgba(150,135,255,0.36)" : "rgba(125,249,255,0.42)"}
              strokeWidth="1.3"
              animate={{ pathLength: [0.1, 1, 0.1], opacity: [0.2, 0.85, 0.2] }}
              transition={{ duration: 2.6 + i * 0.18, repeat: Infinity, ease: "easeInOut", delay: i * 0.16 }}
            />
          );
        })}
        <text x="110" y="66" textAnchor="middle" fontSize="15" fill="rgba(255,255,255,0.86)" style={fontStyles.mono}>AI</text>
      </svg>
    );
  }

  if (type === "ship") {
    return (
      <svg viewBox="0 0 220 120" className="h-28 w-full">
        <rect x="34" y="24" width="152" height="78" rx="18" fill="rgba(255,255,255,0.035)" stroke="rgba(180,230,255,0.18)" />
        <rect x="48" y="42" width="70" height="8" rx="4" fill="rgba(235,245,255,0.44)" />
        <rect x="48" y="60" width="124" height="6" rx="3" fill="rgba(125,249,255,0.18)" />
        <rect x="48" y="74" width="94" height="6" rx="3" fill="rgba(255,255,255,0.12)" />
        <motion.rect
          x="146"
          y="40"
          width="26"
          height="26"
          rx="8"
          fill="rgba(125,249,255,0.22)"
          animate={{ opacity: [0.28, 0.72, 0.28], scale: [0.96, 1.06, 0.96] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <path d="M58 96 C 88 108, 132 108, 162 96" fill="none" stroke="rgba(125,249,255,0.20)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 120" className="h-28 w-full">
      <circle cx="110" cy="60" r="38" fill="none" stroke="rgba(125,249,255,0.18)" />
      <motion.path
        d="M110 22 A38 38 0 1 1 79 82"
        fill="none"
        stroke="rgba(125,249,255,0.62)"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={{ pathLength: [0.2, 1, 0.2], rotate: [0, 360] }}
        transition={{ pathLength: { duration: 3, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 12, repeat: Infinity, ease: "linear" } }}
        style={{ transformOrigin: "110px 60px" }}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle
          key={`evolve-${i}`}
          cx={78 + i * 16}
          cy={88 - Math.sin(i) * 12}
          r="2.5"
          fill={i % 2 ? "rgba(150,135,255,0.78)" : "rgba(232,246,255,0.86)"}
          animate={{ opacity: [0.25, 0.95, 0.25], y: [0, -8, 0] }}
          transition={{ duration: 2.2 + i * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
        />
      ))}
    </svg>
  );
}

function StoryFrame({ frame, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative min-h-[360px] overflow-clip rounded-[2rem] border border-cyan-100/[0.12] bg-[linear-gradient(145deg,rgba(255,255,255,0.078),rgba(255,255,255,0.025))] p-5 shadow-[0_26px_82px_rgba(0,0,0,0.30)] backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-cyan-100/26 hover:bg-white/[0.07] lg:min-h-[390px]"
    >
      <div className="absolute inset-0 opacity-[0.045] [background-image:radial-gradient(rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:9px_9px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(125,249,255,0.13),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(148,118,255,0.12),transparent_36%)] opacity-75" />
      <div className="absolute -right-12 top-8 h-28 w-28 rounded-full border border-cyan-100/[0.055] transition duration-500 group-hover:scale-110 group-hover:border-cyan-100/[0.16]" />
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-100/32 to-transparent" />
      <div className="absolute -left-8 bottom-10 h-px w-40 -rotate-12 bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      <div className="absolute -left-10 bottom-16 h-px w-32 -rotate-12 bg-gradient-to-r from-transparent via-cyan-100/14 to-transparent" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p style={fontStyles.mono} className="text-[12px] font-medium uppercase tracking-[0.18em] text-cyan-50/56">FRAME {frame.no}</p>
            <p style={fontStyles.mono} className="mt-2 text-[12px] uppercase tracking-[0.1em] text-white/46">{frame.signal}</p>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-100/14 bg-black/24 text-[12px] text-cyan-50/72 shadow-[inset_0_0_18px_rgba(160,232,255,0.035)]" style={fontStyles.mono}>{frame.no}</span>
        </div>

        <div className="relative mb-4 rounded-[1.35rem] border border-white/[0.07] bg-black/18 p-2 shadow-[inset_0_0_28px_rgba(125,249,255,0.035)]">
          <StoryVisual type={frame.visual} index={index} />
          <div className="absolute right-3 top-3 rounded-full border border-cyan-100/14 bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-cyan-50/56" style={fontStyles.mono}>HUD</div>
        </div>

        <h3 className="text-[1.34rem] font-semibold tracking-[-0.025em] text-white/96">{frame.title}</h3>
        <p className="mt-2 text-[0.9rem] uppercase tracking-[0.1em] text-cyan-50/66" style={fontStyles.mono}>{frame.english}</p>
        <p className="mt-4 text-base leading-7 text-white/62">{frame.desc}</p>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between border-t border-white/[0.07] pt-4">
            <p style={fontStyles.mono} className="text-[12px] uppercase tracking-[0.08em] text-cyan-50/52">{frame.meta}</p>
            <motion.span
              className="h-1.5 w-10 rounded-full bg-gradient-to-r from-transparent via-cyan-100/52 to-transparent"
              animate={{ opacity: [0.28, 0.88, 0.28] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function SystemVisual({ type, index }) {
  if (type === "automation") {
    const nodes = ["Input", "Process", "Verify", "Output"];
    return (
      <div className="relative h-44 overflow-clip rounded-[1.6rem] border border-white/[0.07] bg-black/22 p-5 shadow-[inset_0_0_36px_rgba(125,249,255,0.035)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(125,249,255,0.10),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(148,118,255,0.10),transparent_32%)]" />
        <div className="relative z-10 flex h-full items-center justify-between gap-3">
          {nodes.map((node, nodeIndex) => (
            <div key={node} className="relative flex flex-1 flex-col items-center">
              {nodeIndex < nodes.length - 1 ? (
                <div className="absolute left-1/2 top-6 h-px w-full bg-gradient-to-r from-cyan-100/24 via-cyan-100/12 to-transparent" />
              ) : null}
              <motion.div
                animate={{ opacity: [0.42, 1, 0.42], scale: [0.96, 1.08, 0.96] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: nodeIndex * 0.32 }}
                className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl border border-cyan-100/18 bg-white/[0.045] shadow-[0_0_24px_rgba(125,249,255,0.10)]"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-100/78 shadow-[0_0_18px_rgba(160,232,255,0.72)]" />
              </motion.div>
              <p style={fontStyles.mono} className="mt-4 text-[11px] uppercase tracking-[0.12em] text-cyan-50/54">{node}</p>
            </div>
          ))}
        </div>
        <motion.span
          className="absolute left-10 top-[5.7rem] z-20 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_18px_rgba(160,232,255,0.9)]"
          animate={{ x: [0, 300, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    );
  }

  if (type === "interface") {
    return (
      <div className="relative h-44 overflow-clip rounded-[1.6rem] border border-white/[0.07] bg-black/22 p-4 shadow-[inset_0_0_36px_rgba(125,249,255,0.035)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.07),transparent_34%)]" />
        <div className="relative z-10 h-full rounded-[1.2rem] border border-white/[0.08] bg-white/[0.035] p-3">
          <div className="mb-3 flex items-center justify-between border-b border-white/[0.06] pb-2">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/28" />
              <span className="h-2 w-2 rounded-full bg-cyan-100/46" />
              <span className="h-2 w-2 rounded-full bg-violet-200/36" />
            </div>
            <p style={fontStyles.mono} className="text-[10px] uppercase tracking-[0.14em] text-cyan-50/48">AI UX Console</p>
          </div>
          <div className="grid h-[108px] grid-cols-[0.32fr_0.68fr] gap-3">
            <div className="space-y-2">
              {[0, 1, 2, 3].map((bar) => (
                <motion.div
                  key={`ui-nav-${bar}`}
                  animate={{ opacity: [0.18, 0.56, 0.18] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: bar * 0.18 }}
                  className="h-5 rounded-lg border border-white/[0.055] bg-white/[0.035]"
                />
              ))}
            </div>
            <div className="relative overflow-clip rounded-xl border border-cyan-100/10 bg-black/22 p-3">
              <motion.div
                className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-cyan-100/16 to-transparent"
                animate={{ x: [-80, 230] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative z-10 mb-3 h-2 w-24 rounded-full bg-white/28" />
              <div className="relative z-10 mb-2 h-2 w-36 rounded-full bg-cyan-100/16" />
              <div className="relative z-10 h-12 rounded-xl border border-white/[0.055] bg-white/[0.035]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-44 overflow-clip rounded-[1.6rem] border border-white/[0.07] bg-black/22 p-5 shadow-[inset_0_0_36px_rgba(125,249,255,0.035)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(125,249,255,0.12),transparent_34%),radial-gradient(circle_at_80%_22%,rgba(148,118,255,0.09),transparent_28%)]" />
      <svg viewBox="0 0 360 160" className="relative z-10 h-full w-full">
        <defs>
          <radialGradient id={`data-core-${index}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
            <stop offset="44%" stopColor="rgba(125,249,255,0.34)" />
            <stop offset="100%" stopColor="rgba(125,249,255,0)" />
          </radialGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.path
            key={`data-in-${i}`}
            d={`M24 ${36 + i * 20} C 92 ${28 + i * 14}, 118 ${80}, 180 80`}
            fill="none"
            stroke="rgba(125,249,255,0.30)"
            strokeWidth="1.1"
            animate={{ pathLength: [0.1, 1, 0.1], opacity: [0.12, 0.64, 0.12] }}
            transition={{ duration: 2.6 + i * 0.18, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
          />
        ))}
        <circle cx="180" cy="80" r="38" fill={`url(#data-core-${index})`} />
        <circle cx="180" cy="80" r="15" fill="rgba(255,255,255,0.74)" />
        {[0, 1, 2].map((i) => (
          <motion.path
            key={`data-out-${i}`}
            d={`M198 80 C 238 ${48 + i * 22}, 280 ${44 + i * 24}, 336 ${42 + i * 30}`}
            fill="none"
            stroke={i === 1 ? "rgba(235,245,255,0.46)" : "rgba(148,118,255,0.32)"}
            strokeWidth="1.2"
            animate={{ opacity: [0.18, 0.82, 0.18] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.circle
            key={`data-dot-${i}`}
            cx={30 + i * 12}
            cy={36 + i * 20}
            r="3"
            fill="rgba(235,245,255,0.76)"
            animate={{ opacity: [0.26, 0.9, 0.26] }}
            transition={{ duration: 1.8 + i * 0.12, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}

function SystemCard({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.76, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-clip rounded-[2.45rem] border border-white/[0.10] bg-[linear-gradient(145deg,rgba(255,255,255,0.082),rgba(255,255,255,0.028))] p-6 shadow-[0_28px_86px_rgba(0,0,0,0.34)] backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-cyan-100/24 hover:bg-white/[0.072]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(160,232,255,0.12),transparent_34%),radial-gradient(circle_at_90%_12%,rgba(148,118,255,0.12),transparent_30%)] opacity-80 transition duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/30 to-transparent" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 22 + index * 3, repeat: Infinity, ease: "linear" }}
        className="absolute -right-20 -top-20 h-52 w-52 rounded-full border border-cyan-100/[0.055] transition duration-500 group-hover:border-cyan-100/[0.12]"
      />

      <div className="relative z-10">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <p style={fontStyles.mono} className="text-[12px] uppercase tracking-[0.18em] text-cyan-50/56">SYSTEM {item.no}</p>
            <h3 className="mt-4 text-[1.85rem] font-semibold leading-none tracking-[-0.055em] text-white md:text-[2.1rem]">{item.title}</h3>
            <p className="mt-2 text-[0.95rem] font-medium text-cyan-50/58">{item.cnTitle}</p>
          </div>
          <div className="rounded-full border border-cyan-100/14 bg-black/24 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-cyan-50/66" style={fontStyles.mono}>
            Status: {item.status}
          </div>
        </div>

        <SystemVisual type={item.visual} index={index} />

        <p className="mt-7 min-h-[58px] text-base leading-7 text-white/64 transition duration-500 group-hover:text-white/74">{item.desc}</p>
        <div className="mt-6 rounded-2xl border border-white/[0.07] bg-black/16 px-4 py-3">
          <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.12em] text-cyan-50/56">{item.flow}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {item.stack.map((chip) => (
            <span key={chip} className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-[12px] text-white/56 transition duration-300 group-hover:border-cyan-100/14 group-hover:text-cyan-50/68">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function CinematicOrbitPlanet() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const colors = [
      [34, 217, 255],
      [124, 236, 255],
      [245, 194, 91],
      [255, 155, 56],
      [255, 93, 63],
      [255, 229, 163],
      [125, 92, 255],
    ];
    const rgba = (color, alpha) => `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
    let seed = 9817;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const clusters = [
      { theta: -0.18, y: 0.52, spreadTheta: 0.72, spreadY: 0.32, colors: [5, 2, 3] },
      { theta: 0.18, y: -0.2, spreadTheta: 0.84, spreadY: 0.54, colors: [0, 1, 6] },
      { theta: 0.46, y: -0.48, spreadTheta: 0.7, spreadY: 0.38, colors: [0, 1, 0] },
      { theta: Math.PI - 0.22, y: 0.1, spreadTheta: 0.58, spreadY: 0.42, colors: [4, 3, 2] },
      { theta: Math.PI + 0.18, y: -0.62, spreadTheta: 0.68, spreadY: 0.28, colors: [2, 5, 3] },
    ];
    const surfaceDots = Array.from({ length: prefersReducedMotion ? 320 : 980 }, (_, index) => {
      const cluster = clusters[index % clusters.length];
      const y = Math.max(-0.94, Math.min(0.94, cluster.y + (random() - 0.5) * cluster.spreadY));
      const theta = cluster.theta + (random() - 0.5) * cluster.spreadTheta;
      const color = colors[cluster.colors[index % cluster.colors.length]];
      return { theta, y, color, size: 0.55 + random() * 1.3, pulse: random() * Math.PI * 2 };
    });
    const mistDots = Array.from({ length: prefersReducedMotion ? 360 : 1300 }, () => {
      const cluster = clusters[Math.floor(random() * clusters.length)];
      const y = Math.max(-0.94, Math.min(0.94, cluster.y + (random() - 0.5) * cluster.spreadY * 1.2));
      const theta = cluster.theta + (random() - 0.5) * cluster.spreadTheta * 1.12;
      const color = colors[cluster.colors[Math.floor(random() * cluster.colors.length)]];
      return { theta, y, color, size: 0.8 + random() * 2.2, pulse: random() * Math.PI * 2 };
    });
    const haloDots = Array.from({ length: prefersReducedMotion ? 520 : 1800 }, (_, index) => {
      const arm = [
        { angle: -0.18, spread: 0.72, lift: 0.08, colors: [5, 2, 3] },
        { angle: 1.34, spread: 0.58, lift: 0.02, colors: [0, 1, 5] },
        { angle: 2.92, spread: 0.82, lift: -0.02, colors: [0, 1, 6] },
        { angle: 4.42, spread: 0.68, lift: -0.08, colors: [2, 3, 4] },
      ][index % 4];
      const color = colors[arm.colors[Math.floor(random() * arm.colors.length)]];
      return {
        angle: arm.angle + (random() - 0.5) * arm.spread + (index / (prefersReducedMotion ? 520 : 1800)) * Math.PI * 1.36,
        radius: 1.05 + Math.pow(random(), 0.62) * 0.72,
        speed: 0.12 + random() * 0.12,
        lift: arm.lift + (random() - 0.5) * 0.18,
        wobble: 0.01 + random() * 0.05,
        color,
        size: 0.5 + random() * 1.05,
      };
    });

    let frameId = 0;
    let running = true;
    let inView = true;
    let lastRenderTime = 0;
    const frameInterval = 1000 / 24;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.8);
      const width = Math.max(1, Math.round(rect.width * ratio));
      const height = Math.max(1, Math.round(rect.height * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const drawSurfaceDot = (dot, cx, cy, radius, time, scale, alphaScale = 1) => {
      const theta = dot.theta + time * scale;
      const y = dot.y + Math.sin(time * 0.7 + dot.pulse) * 0.018;
      const latitude = Math.sqrt(Math.max(0.02, 1 - y * y));
      const x3 = Math.cos(theta) * latitude;
      const z3 = Math.sin(theta) * latitude;
      if (z3 < -0.4) return;
      const edgeFade = Math.max(0, Math.min(1, (z3 + 0.42) / 1.42));
      const x = cx + x3 * radius * 0.76;
      const yy = cy + y * radius * 0.82;
      const alpha = (0.08 + edgeFade * 0.72) * alphaScale;
      ctx.fillStyle = rgba(dot.color, alpha);
      ctx.fillRect(x, yy, dot.size, dot.size);
    };

    const render = (now) => {
      if (!running || !inView) return;
      if (!prefersReducedMotion && now - lastRenderTime < frameInterval) {
        frameId = window.requestAnimationFrame(render);
        return;
      }
      lastRenderTime = now;
      resize();
      const width = canvas.width;
      const height = canvas.height;
      const time = now * 0.001;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.27;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      const aura = ctx.createRadialGradient(cx, cy, radius * 0.08, cx, cy, radius * 2.25);
      aura.addColorStop(0, "rgba(255, 229, 163, 0.18)");
      aura.addColorStop(0.28, "rgba(34, 217, 255, 0.16)");
      aura.addColorStop(0.54, "rgba(125, 92, 255, 0.08)");
      aura.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.26);
      ctx.globalCompositeOperation = "lighter";
      haloDots.forEach((dot) => {
        const angle = dot.angle + time * dot.speed;
        const orbitRadius = radius * dot.radius + Math.sin(time * 0.8 + dot.angle) * radius * dot.wobble;
        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius * 0.36 + dot.lift * radius;
        ctx.fillStyle = rgba(dot.color, 0.12 + Math.sin(time * 1.4 + dot.angle) * 0.035);
        ctx.fillRect(x, y, dot.size, dot.size);
      });
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      const base = ctx.createRadialGradient(cx - radius * 0.34, cy - radius * 0.32, radius * 0.04, cx, cy, radius * 1.08);
      base.addColorStop(0, "rgba(255, 244, 216, 0.96)");
      base.addColorStop(0.1, "rgba(124, 236, 255, 0.78)");
      base.addColorStop(0.32, "rgba(16, 51, 83, 0.98)");
      base.addColorStop(0.58, "rgba(8, 17, 37, 1)");
      base.addColorStop(1, "rgba(1, 2, 8, 1)");
      ctx.fillStyle = base;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      ctx.globalCompositeOperation = "screen";
      for (let band = 0; band < 18; band += 1) {
        const phase = time * (0.16 + band * 0.006) + band * 0.61;
        const color = colors[band % colors.length];
        ctx.beginPath();
        const yBase = cy + Math.sin(phase * 0.8) * radius * 0.52 + (band - 9) * radius * 0.075;
        ctx.moveTo(cx - radius * 1.05, yBase);
        ctx.bezierCurveTo(
          cx - radius * 0.46,
          yBase - Math.sin(phase) * radius * 0.28,
          cx + radius * 0.18,
          yBase + Math.cos(phase * 0.72) * radius * 0.24,
          cx + radius * 1.08,
          yBase + Math.sin(phase * 1.2) * radius * 0.14
        );
        ctx.strokeStyle = rgba(color, 0.045 + (band % 3) * 0.026);
        ctx.lineWidth = radius * (0.006 + (band % 4) * 0.003);
        ctx.shadowBlur = radius * 0.16;
        ctx.shadowColor = rgba(color, 0.34);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      mistDots.forEach((dot) => drawSurfaceDot(dot, cx, cy, radius, time, -0.5, 0.36));
      surfaceDots.forEach((dot) => drawSurfaceDot(dot, cx, cy, radius, time, 0.7, 0.86));

      ctx.globalCompositeOperation = "source-over";
      const terminator = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
      terminator.addColorStop(0, "rgba(255, 255, 255, 0.08)");
      terminator.addColorStop(0.42, "rgba(0, 0, 0, 0)");
      terminator.addColorStop(0.72, "rgba(0, 0, 0, 0.42)");
      terminator.addColorStop(1, "rgba(0, 0, 0, 0.82)");
      ctx.fillStyle = terminator;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      const vignette = ctx.createRadialGradient(cx - radius * 0.22, cy - radius * 0.28, radius * 0.2, cx, cy, radius * 1.08);
      vignette.addColorStop(0, "rgba(255, 255, 255, 0.18)");
      vignette.addColorStop(0.48, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(0.84, "rgba(0, 0, 0, 0.46)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.82)");
      ctx.fillStyle = vignette;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      ctx.restore();

      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = Math.max(1, radius * 0.025);
      const rim = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
      rim.addColorStop(0, "rgba(255, 229, 163, 0.52)");
      rim.addColorStop(0.4, "rgba(124, 236, 255, 0.38)");
      rim.addColorStop(1, "rgba(125, 92, 255, 0.08)");
      ctx.strokeStyle = rim;
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 1, 0, Math.PI * 2);
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.34 + Math.sin(time * 0.2) * 0.04);
      ctx.strokeStyle = "rgba(255, 229, 163, 0.11)";
      ctx.lineWidth = Math.max(0.8, radius * 0.012);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.44, radius * 0.36, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      if (!prefersReducedMotion && running && inView) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = Boolean(entry?.isIntersecting);
      if (inView) {
        window.cancelAnimationFrame(frameId);
        frameId = window.requestAnimationFrame(render);
      }
    }, { rootMargin: "260px 0px" });
    observer.observe(canvas);
    frameId = window.requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-visible rounded-full" aria-hidden="true">
      <div className="absolute -inset-[20%] rounded-full">
        <img
          src="/media/ai-orbit-cinematic-planet-cutout.png"
          alt=""
          draggable="false"
          className="absolute inset-0 h-full w-full select-none object-contain opacity-95 drop-shadow-[0_0_48px_rgba(125,249,255,0.30)]"
          style={{
            mixBlendMode: "screen",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 0%, black 49%, rgba(0,0,0,0.84) 61%, rgba(0,0,0,0.32) 74%, transparent 88%)",
            maskImage: "radial-gradient(circle at 50% 50%, black 0%, black 49%, rgba(0,0,0,0.84) 61%, rgba(0,0,0,0.32) 74%, transparent 88%)",
          }}
        />
      </div>
      <div className="absolute inset-[9%] rounded-full bg-[radial-gradient(circle_at_42%_38%,rgba(255,244,216,0.16),rgba(125,249,255,0.08)_28%,transparent_66%)] mix-blend-screen" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-38 mix-blend-screen" aria-hidden="true" />
    </div>
  );
}

function OrbitCore({ active }) {
  return (
    <motion.div
      animate={{ scale: active ? 1.08 : [1, 1.045, 1], opacity: active ? 1 : [0.92, 1, 0.92] }}
      transition={{ duration: active ? 0.35 : 4.2, repeat: active ? 0 : Infinity, ease: "easeInOut" }}
      style={{ x: "-50%", y: "-50%" }}
      className="absolute left-1/2 top-1/2 z-40 grid h-44 w-44 place-items-center rounded-full md:h-56 md:w-56"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-5 rounded-full border border-cyan-100/[0.12] shadow-[0_0_40px_rgba(125,249,255,0.10)]"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-10 rounded-full border border-dashed border-violet-200/[0.10]"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-16 rounded-full border border-cyan-100/[0.045]"
      />
      <div className="absolute -inset-20 rounded-full bg-[radial-gradient(circle,rgba(104,210,255,0.20),rgba(88,91,255,0.08)_38%,transparent_70%)] blur-2xl" />
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-4 rounded-full bg-[conic-gradient(from_115deg,transparent,rgba(125,249,255,0.18),transparent_28%,rgba(255,255,255,0.10)_42%,transparent_56%,rgba(148,118,255,0.12),transparent)] blur-[2px]"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-7 rounded-full border border-cyan-100/[0.08] shadow-[0_0_42px_rgba(125,249,255,0.10)]"
        style={{ transform: "rotateX(68deg) rotateZ(-18deg)" }}
      />
      <div className="relative h-[132%] w-[132%] overflow-visible">
        <CinematicOrbitPlanet />
      </div>
    </motion.div>
  );
}

function OrbitRing({ ring, index }) {
  const rotation = ring.direction === "cw" ? 360 : -360;
  const counterRotation = ring.direction === "cw" ? -360 : 360;
  const orbitHeight = ring.radius * ring.ellipse;
  const orbitItems = ring.priority?.length ? ring.priority : ring.items.slice(0, 3);

  return (
    <motion.div
      animate={{ rotate: [ring.tilt, ring.tilt + rotation] }}
      transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
      className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
      style={{ width: `${ring.radius}%`, height: `${orbitHeight}%`, marginLeft: `-${ring.radius / 2}%`, marginTop: `-${orbitHeight / 2}%` }}
    >
      <div
        className="absolute inset-0 rounded-full border"
        style={{
          borderColor: "rgba(255,255,255,0.034)",
        }}
      />
      <div
        className="absolute inset-0 rounded-full border border-dashed"
        style={{
          borderColor: "rgba(255,255,255,0.024)",
          opacity: 0.64,
        }}
      />
      <motion.span
        className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100 shadow-[0_0_20px_rgba(125,249,255,0.7)]"
        animate={{ opacity: [0.36, 1, 0.36], scale: [0.82, 1.24, 0.82] }}
        transition={{ duration: 3.1 + index * 0.16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full shadow-[0_0_18px_rgba(125,249,255,0.78)]"
        style={{ backgroundColor: ring.accent }}
        animate={{ opacity: [0.14, 0.66, 0.14] }}
        transition={{ duration: 3.4 + index * 0.18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ rotate: [-ring.tilt, -ring.tilt + counterRotation] }}
          transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
          style={fontStyles.mono}
          className="rounded-full border border-white/[0.045] bg-black/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] backdrop-blur md:text-[11px]"
        >
          <span className="text-white/28">{ring.label}</span>
        </motion.div>
      </div>

      {orbitItems.map((item, itemIndex) => {
        const angle = (itemIndex / orbitItems.length) * Math.PI * 2 + index * 0.42;
        const radiusTweak = 56 + ((itemIndex % 3) - 1) * 2.2;
        const x = 50 + Math.cos(angle) * radiusTweak;
        const y = 50 + Math.sin(angle) * radiusTweak;
        const isPriority = ring.priority?.includes(item);
        const sizeClass = isPriority ? "px-3 py-1.5 text-[11px] md:text-[12px]" : "px-2.5 py-1.5 text-[10px] md:text-[11px]";
        return (
          <div key={item} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
            <motion.div
              animate={{ rotate: [-ring.tilt, -ring.tilt + counterRotation] }}
              transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
            >
              <div
                className={`inline-flex max-w-[128px] items-center gap-1.5 rounded-full border bg-black/48 shadow-[0_14px_32px_rgba(0,0,0,0.20)] backdrop-blur-md md:max-w-[148px] ${sizeClass}`}
                style={{
                  borderColor: "rgba(255,255,255,0.065)",
                  opacity: isPriority ? 0.92 : 0.58,
                  boxShadow: isPriority ? `0 0 18px ${ring.accent}, 0 18px 42px rgba(0,0,0,0.24)` : "0 18px 42px rgba(0,0,0,0.22)",
                }}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full shadow-[0_0_12px_rgba(125,249,255,0.72)]" style={{ backgroundColor: ring.accent }} />
                <span style={fontStyles.ui} className={`truncate whitespace-nowrap font-medium tracking-[0.01em] ${isPriority ? "text-white/76" : "text-white/52"}`}>{item}</span>
              </div>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}

function OrbitLegend() {
  return (
    <div className="pointer-events-none absolute bottom-5 left-5 z-50 hidden max-w-[330px] rounded-[1.5rem] border border-white/[0.045] bg-black/16 p-4 text-white/34 backdrop-blur-md lg:block">
      <p style={fontStyles.mono} className="mb-3 text-[11px] uppercase tracking-[0.18em] text-cyan-50/42">Orbit Legend</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {orbitGroups.map((ring) => (
          <div key={ring.id} className="flex items-center gap-2 text-left">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ring.accent, boxShadow: `0 0 12px ${ring.accent}` }} />
            <span style={fontStyles.mono} className="text-[10px] uppercase tracking-[0.08em] text-white/34">{ring.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrbitScene() {
  const totalNodes = orbitGroups.reduce((sum, ring) => sum + ring.items.length, 0);

  return (
    <div
      className="relative mx-auto aspect-[1.42/1] w-full max-w-[1560px] overflow-visible bg-transparent"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(125,249,255,0.13),transparent_24%),radial-gradient(circle_at_28%_38%,rgba(77,163,255,0.08),transparent_32%),radial-gradient(circle_at_78%_36%,rgba(148,118,255,0.10),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(255,255,255,0.38)_0_1px,transparent_1.6px),radial-gradient(circle_at_72%_28%,rgba(190,220,255,0.32)_0_1px,transparent_1.7px),radial-gradient(circle_at_46%_74%,rgba(255,255,255,0.22)_0_1px,transparent_1.6px)] [background-size:73px_73px,113px_113px,151px_151px] opacity-[0.18]" />
      {Array.from({ length: 0 }).map((_, i) => (
        <motion.span
          key={`star-${i}`}
          className="pointer-events-none absolute h-px w-px rounded-full bg-white"
          style={{
            left: `${(i * 37 + i * i * 3) % 100}%`,
            top: `${(i * 53 + i * 11) % 100}%`,
            width: `${1 + (i % 3) * 0.55}px`,
            height: `${1 + (i % 3) * 0.55}px`,
            boxShadow: i % 7 === 0 ? "0 0 18px rgba(255,255,255,0.86)" : "0 0 10px rgba(160,232,255,0.62)",
          }}
          animate={{ opacity: [0.12 + (i % 5) * 0.04, 0.55 + (i % 4) * 0.1, 0.12 + (i % 5) * 0.04], scale: [0.86, 1.22, 0.86] }}
          transition={{ duration: 2.8 + (i % 9) * 0.42, repeat: Infinity, ease: "easeInOut", delay: (i % 13) * 0.12 }}
        />
      ))}
      {[].map((i) => (
        <motion.span
          key={`comet-${i}`}
          className="pointer-events-none absolute h-px w-32 rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent"
          style={{ left: `${8 + i * 24}%`, top: `${18 + i * 21}%`, rotate: "-18deg" }}
          animate={{ x: [-140, 280], opacity: [0, 0.82, 0] }}
          transition={{ duration: 5.8 + i * 0.9, repeat: Infinity, ease: "easeInOut", delay: 1.4 + i * 2.2 }}
        />
      ))}

      {[0, 1, 2, 3].map((i) => (
        <div
          key={`deep-ring-${i}`}
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-white/[0.018]"
          style={{ width: `${112 + i * 20}%`, height: `${60 + i * 8}%`, marginLeft: `-${56 + i * 10}%`, marginTop: `-${30 + i * 4}%`, transform: `rotate(${i * 11}deg)` }}
        />
      ))}

      <motion.div
        className="pointer-events-none absolute left-[6%] top-[18%] h-px w-[34%] rotate-[-18deg] bg-gradient-to-r from-transparent via-cyan-100/48 to-transparent"
        animate={{ x: [-100, 140], opacity: [0, 0.68, 0] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[8%] top-[72%] h-px w-[28%] rotate-[-22deg] bg-gradient-to-r from-transparent via-violet-200/42 to-transparent"
        animate={{ x: [140, -100], opacity: [0, 0.56, 0] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
      />

      {orbitGroups.map((ring, index) => (
        <OrbitRing key={ring.id} ring={ring} index={index} />
      ))}

      <OrbitCore active={false} />
      <OrbitLegend />

      <div className="pointer-events-none absolute right-5 top-5 z-50 hidden rounded-[1.5rem] border border-white/[0.04] bg-black/16 px-4 py-3 text-right backdrop-blur-md lg:block">
        <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.16em] text-white/34">Live Stack Map</p>
        <p style={fontStyles.mono} className="mt-1 text-[11px] text-cyan-50/50">{orbitGroups.length} Orbits · {totalNodes} Nodes</p>
      </div>
    </div>
  );
}

function TechnologyRadar() {
  const hostRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = hostRef.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setActive(Boolean(entry?.isIntersecting));
    }, { rootMargin: "360px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="relative mx-auto aspect-[1.42/1] w-full max-w-[1560px]">
      {active ? (
        <OrbitScene />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(125,249,255,0.10),transparent_24%),radial-gradient(circle_at_28%_38%,rgba(77,163,255,0.06),transparent_32%),radial-gradient(circle_at_78%_36%,rgba(148,118,255,0.08),transparent_34%)]" />
      )}
    </div>
  );
}

const AGENT_API_URL =
  import.meta.env.VITE_AGENT_API_URL ||
  (typeof window !== "undefined" && window.location.hostname.endsWith("pages.dev")
    ? "https://wuyi-with-ai.vercel.app/api/agent"
    : "/api/agent");
const AGENT_TEXT_TIMEOUT_MS = 75000;
const AGENT_IMAGE_TIMEOUT_MS = 140000;
const AGENT_MAX_ATTACHMENTS = 3;
const AGENT_MAX_IMAGE_BYTES = 900 * 1024;
const AGENT_MAX_TEXT_FILE_BYTES = 80 * 1024;
const AGENT_ATTACHMENT_ACCEPT = "image/png,image/jpeg,image/webp,image/gif,text/plain,text/markdown,text/csv,application/json,.txt,.md,.csv,.json";
const PET_FRAME_VERSION = "kemusan-cutout-2";
const PET_KEMUSAN_FRAME_MS = 220;
const PET_KEMUSAN_REPEATS = 3;
const PET_FRAMES = {
  idle: `/media/ai-pet-agent-draw.png?v=${PET_FRAME_VERSION}`,
  welcome: `/media/ai-pet-agent-welcome.png?v=${PET_FRAME_VERSION}`,
  think: `/media/ai-pet-agent-think.png?v=${PET_FRAME_VERSION}`,
  slash: `/media/ai-pet-agent-slash-air.png?v=${PET_FRAME_VERSION}`,
  slashGuard: `/media/ai-pet-agent-slash-guard.png?v=${PET_FRAME_VERSION}`,
  dance: `/media/ai-pet-agent-dance-hop.png?v=${PET_FRAME_VERSION}`,
  danceTurn: `/media/ai-pet-agent-dance-turn.png?v=${PET_FRAME_VERSION}`,
  crouch: `/media/ai-pet-agent-crouch.png?v=${PET_FRAME_VERSION}`,
  kick: `/media/ai-pet-agent-sidekick.png?v=${PET_FRAME_VERSION}`,
  flip: `/media/ai-pet-agent-flip.png?v=${PET_FRAME_VERSION}`,
};
const PET_KEMUSAN_STEPS = [
  { src: PET_FRAMES.welcome, pose: "ready" },
  { src: PET_FRAMES.dance, pose: "cross-left" },
  { src: PET_FRAMES.danceTurn, pose: "cross-right" },
  { src: PET_FRAMES.kick, pose: "front-push" },
  { src: PET_FRAMES.danceTurn, pose: "turn-back" },
  { src: PET_FRAMES.crouch, pose: "low-step" },
  { src: PET_FRAMES.dance, pose: "bounce-back" },
  { src: PET_FRAMES.welcome, pose: "finish" },
];
const PET_KEMUSAN_DURATION_MS = PET_KEMUSAN_FRAME_MS * PET_KEMUSAN_STEPS.length * PET_KEMUSAN_REPEATS;
const petTrickNames = ["flip", "dance", "danceTurn", "slash", "kick", "welcome", "think", "crouch"];
const petTrickAnimations = {
  idle: { x: 0, y: 0, rotate: 0, rotateY: 0, scale: 1 },
  flip: { y: [0, -92, -48, 0], rotate: [0, -10, 8, 0], rotateY: [0, 18, -12, 0], scale: [1, 1.08, 0.98, 1] },
  dance: { x: [0, -13, 14, -10, 10, 0], y: [0, -13, 0, -10, 0, 0], rotate: [0, -8, 9, -7, 6, 0], scale: [1, 1.04, 0.99, 1.04, 1] },
  danceTurn: { x: [0, 10, -8, 12, 0], y: [0, -10, -4, -12, 0], rotate: [0, 7, -9, 6, 0], rotateY: [0, 12, -8, 10, 0], scale: [1, 1.035, 1.01, 1.04, 1] },
  kemusan: {
    x: [0, -10, 9, 13, -8, -4, 6, 0],
    y: [0, -8, -2, -9, 2, 5, -6, 0],
    rotate: [0, -4, 3, 5, -5, -3, 4, 0],
    rotateY: [-2, 5, -6, 7, -8, 4, -4, -2],
    scale: [1, 1.025, 1.01, 1.03, 0.995, 1.018, 1.026, 1],
  },
  slash: { x: [0, -5, 18, 0], y: [0, -8, -14, 0], rotate: [0, -8, 14, 0], rotateY: [0, -14, 8, 0], scale: [1, 1.05, 1.03, 1] },
  kick: { x: [0, -8, 12, 0], y: [0, -18, -10, 0], rotate: [0, -10, 8, 0], scale: [1, 1.05, 1.03, 1] },
  welcome: { y: [0, -12, -4, -10, 0], rotate: [0, -5, 4, -3, 0], scale: [1, 1.055, 1.02, 1.04, 1] },
  think: { y: [0, -8, -4, 0], rotate: [0, 4, -4, 0], scale: [1, 1.035, 1.02, 1] },
  crouch: { y: [0, 8, -4, 0], rotate: [0, -4, 3, 0], scale: [1, 0.98, 1.03, 1] },
};
const petTrickTransitions = {
  idle: { duration: 0.4 },
  flip: { duration: 1.7, ease: [0.22, 1, 0.36, 1] },
  dance: { duration: 2.15, ease: "easeInOut" },
  danceTurn: { duration: 2.05, ease: "easeInOut" },
  kemusan: { duration: PET_KEMUSAN_DURATION_MS / 1000, ease: "linear" },
  slash: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
  kick: { duration: 1.35, ease: [0.16, 1, 0.3, 1] },
  welcome: { duration: 1.7, ease: [0.16, 1, 0.3, 1] },
  think: { duration: 2.35, ease: "easeInOut" },
  crouch: { duration: 1.85, ease: [0.16, 1, 0.3, 1] },
};

const agentModes = {
  about_wuyi: {
    label: "对话",
    placeholder: "问 AI伍子胥：AI 入门、模型选择、网页项目、Agent 思路都可以。",
    starter: "用中文简单介绍一下这个网站，以及 AI 新手应该先看哪几个部分。",
  },
  pain_validation: {
    label: "痛点判断",
    placeholder: "先说一个真实 AI 痛点：你想用 AI 做什么，现在卡在哪里，带来了什么影响。",
    starter: "我想用 AI 把获客内容、客户回复和跟进提醒串起来，但现在只是零散用聊天工具，效率低也很难复用。",
  },
  image_generation: {
    label: "AI 生图",
    placeholder: "描述你想生成的图片：主体、风格、构图、颜色、用途。",
    starter: "生成一张适合 AI 学习路径页面的科技电影感配图，浅色背景，蓝白光，一条路径穿过模型、代码和产品界面节点，无文字。",
  },
};

const INITIAL_PAIN_STATE = {
  round: 0,
  approved: false,
  stageSummary: "",
  signals: [],
};

const painRoundCopies = [
  {
    title: "1 填写痛点",
    placeholder: "留下你用AI过程中最痛的感受，我尽力思考解决...",
    starter: "我用 AI 时最痛的是：",
  },
  {
    title: "2 答案待确认",
    placeholder: "痛点已记录。正式答案等确认之后再补上。",
    starter: "我已确认，请在答案区给出思考。",
  },
];

function getPainModeCopy(painState) {
  if (painState?.approved) {
    return {
      ...agentModes.pain_validation,
      placeholder: "痛点已记录。正式答案等确认之后再补上。",
      starter: "我已确认，请在答案区给出思考。",
    };
  }

  const round = Math.min(painRoundCopies.length - 1, Math.max(0, Number(painState?.round) || 0));
  const copy = painRoundCopies[round];
  return {
    ...agentModes.pain_validation,
    placeholder: copy.placeholder,
    starter: copy.starter,
  };
}

function formatBytes(bytes) {
  const size = Number(bytes) || 0;
  if (size >= 1024 * 1024) return `${(size / 1024 / 1024).toFixed(1)}MB`;
  if (size >= 1024) return `${Math.round(size / 1024)}KB`;
  return `${size}B`;
}

function isReadableTextFile(file) {
  const type = String(file.type || "").toLowerCase();
  return type.startsWith("text/") || /\.(txt|md|csv|json)$/i.test(file.name || "");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("read failed"));
    reader.readAsDataURL(file);
  });
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("read failed"));
    reader.readAsText(file, "utf-8");
  });
}

function attachmentSummary(attachments = []) {
  if (!attachments.length) return "";
  return attachments.map((item) => `${item.kind === "image" ? "图片" : "文件"}：${item.name}`).join("\n");
}

function AgentImages({ images }) {
  if (!Array.isArray(images) || !images.length) return null;

  return (
    <div className="mt-3 grid gap-3">
      {images.map((image, index) => {
        const src = image.url || (image.b64Json ? `data:image/png;base64,${image.b64Json}` : "");
        if (!src) return null;
        return (
          <a key={`${src}-${index}`} href={src} target="_blank" rel="noreferrer" className="group block overflow-clip rounded-2xl border border-cyan-100/12 bg-black/26">
            <img src={src} alt={image.revisedPrompt || "AI generated image"} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.015]" loading="lazy" />
            {image.revisedPrompt ? (
              <p className="border-t border-white/[0.06] px-3 py-2 text-[11px] leading-5 text-white/46">{image.revisedPrompt}</p>
            ) : null}
          </a>
        );
      })}
    </div>
  );
}

function AgentAttachments({ attachments = [] }) {
  if (!Array.isArray(attachments) || !attachments.length) return null;

  return (
    <div className="mt-3 grid gap-2">
      {attachments.map((item) => (
        <div key={item.id || item.name} className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/18 px-3 py-2 text-xs text-white/60">
          <Icon name={item.kind === "image" ? "image" : "file"} className="h-3.5 w-3.5 shrink-0 text-cyan-50/68" />
          <span className="min-w-0 flex-1 truncate">{item.name}</span>
          <span className="shrink-0 text-white/36">{formatBytes(item.size)}</span>
        </div>
      ))}
    </div>
  );
}

function CyberAgentPet({ offset, onPointerDown, onOpen, dragging }) {
  const [trick, setTrick] = useState("welcome");
  const [kemusanFrameIndex, setKemusanFrameIndex] = useState(0);
  const petRef = useRef(null);
  const trickTimeoutRef = useRef(null);
  const resetTrickTimeoutRef = useRef(null);
  const kemusanStep = PET_KEMUSAN_STEPS[kemusanFrameIndex] || PET_KEMUSAN_STEPS[0];
  const petFrameSrc = dragging
    ? PET_FRAMES.welcome
    : trick === "kemusan"
      ? kemusanStep.src
    : trick === "dance"
      ? PET_FRAMES.dance
      : trick === "danceTurn"
        ? PET_FRAMES.danceTurn
      : trick === "slash"
        ? PET_FRAMES.slash
        : trick === "kick"
          ? PET_FRAMES.kick
        : trick === "think"
          ? PET_FRAMES.think
          : trick === "crouch"
            ? PET_FRAMES.crouch
          : trick === "welcome"
            ? PET_FRAMES.welcome
          : trick === "flip"
            ? PET_FRAMES.flip
            : PET_FRAMES.idle;
  const petStageAnimate = dragging
    ? { y: -18, rotateX: 10, rotateY: -12, scaleX: 1.045, scaleY: 0.965 }
    : trick === "kemusan"
      ? {
          x: [0, -12, 12, -8, 10, -4, 0],
          y: [0, -8, 0, -10, 0, -6, 0],
          rotateX: [0, 2, 0, 3, 0],
          rotateY: [-4, 7, -8, 6, -5, 4, -4],
          rotateZ: [0, -4, 4, -3, 3, -2, 0],
          scale: [1, 1.025, 1, 1.03, 1.01, 1.02, 1],
        }
      : { y: [0, -7, 0], rotateX: [0, 3, 0], rotateY: [-3, 4, -3] };
  const petStageTransition = dragging
    ? { duration: 0.16, ease: "easeOut" }
    : trick === "kemusan"
      ? { duration: 2.18, repeat: Infinity, ease: "easeInOut" }
      : { duration: 4.2, repeat: Infinity, ease: "easeInOut" };

  useEffect(() => {
    Object.values(PET_FRAMES).forEach((src) => {
      const image = new Image();
      image.src = src;
    });

    const scheduleTrick = () => {
      const delay = 6500 + Math.random() * 12500;
      trickTimeoutRef.current = window.setTimeout(() => {
        const nextTrick = petTrickNames[Math.floor(Math.random() * petTrickNames.length)];
        setTrick(nextTrick);
        resetTrickTimeoutRef.current = window.setTimeout(() => {
          setTrick("idle");
          scheduleTrick();
        }, nextTrick === "slash" ? 1400 : nextTrick === "flip" ? 1700 : 2500);
      }, delay);
    };

    const celebrate = (event) => {
      window.clearTimeout(trickTimeoutRef.current);
      window.clearTimeout(resetTrickTimeoutRef.current);
      const nextTrick = event?.detail?.trick || "dance";
      setTrick(nextTrick);
      resetTrickTimeoutRef.current = window.setTimeout(() => {
        setTrick("idle");
        scheduleTrick();
      }, nextTrick === "slash" ? 1600 : nextTrick === "kemusan" ? PET_KEMUSAN_DURATION_MS + 280 : 2800);
    };

    window.addEventListener("wuyi-agent-celebrate", celebrate);

    resetTrickTimeoutRef.current = window.setTimeout(() => {
      setTrick("idle");
      scheduleTrick();
    }, 2200);
    return () => {
      window.removeEventListener("wuyi-agent-celebrate", celebrate);
      window.clearTimeout(trickTimeoutRef.current);
      window.clearTimeout(resetTrickTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (trick !== "kemusan") {
      setKemusanFrameIndex(0);
      return undefined;
    }

    setKemusanFrameIndex(0);
    const frameTimer = window.setInterval(() => {
      setKemusanFrameIndex((index) => (index + 1) % PET_KEMUSAN_STEPS.length);
    }, PET_KEMUSAN_FRAME_MS);

    return () => {
      window.clearInterval(frameTimer);
    };
  }, [trick]);

  return (
    <motion.button
      ref={petRef}
      type="button"
      onPointerDown={onPointerDown}
      onClick={onOpen}
      style={{ x: offset.x, y: offset.y }}
      animate={dragging ? { rotate: -4, scale: 1.055 } : petTrickAnimations[trick]}
      transition={dragging ? { duration: 0.18, ease: "easeOut" } : petTrickTransitions[trick]}
      whileHover={{ scale: 1.055 }}
      whileTap={{ scale: 1.01 }}
      data-pet-trick={trick}
      data-dragging={dragging ? "true" : "false"}
      className="ai-pet-shell group fixed bottom-4 right-3 z-[80] h-[326px] w-[286px] cursor-grab touch-none select-none active:cursor-grabbing sm:right-5 md:bottom-7 md:right-[max(1.75rem,calc((100vw-1500px)/2+1.75rem))]"
      aria-label="打开可拖拽 AI伍子胥智能体"
    >
      <span className="ai-pet-orbit ai-pet-orbit-one" />
      <span className="ai-pet-orbit ai-pet-orbit-two" />
      <span className="ai-pet-ground" />
      <motion.div
        aria-hidden="true"
        animate={petStageAnimate}
        transition={petStageTransition}
        className="ai-pet-stage pointer-events-none absolute left-[10px] top-0 h-[286px] w-[266px]"
      >
        <span className="ai-pet-backlight" />
        <span className="ai-pet-side-glow" />
        <span className="ai-pet-scanline" />
        <span className="ai-pet-slash" />
        <img
          src={petFrameSrc}
          alt=""
          data-kemusan-frame={trick === "kemusan" ? kemusanFrameIndex + 1 : undefined}
          data-kemusan-pose={trick === "kemusan" ? kemusanStep.pose : undefined}
          className="ai-pet-avatar relative h-full w-full object-contain brightness-110 contrast-110 saturate-110"
          draggable="false"
        />
      </motion.div>
      <span className="ai-pet-label pointer-events-none absolute bottom-[10px] left-[143px] -translate-x-1/2 whitespace-nowrap rounded-full border border-cyan-100/20 bg-black/58 px-3 py-1 text-[12px] font-semibold leading-none text-cyan-50/86 shadow-[0_10px_28px_rgba(0,0,0,0.30)] backdrop-blur-md">
        <span className="tracking-[0.14em]">AI伍子胥</span>
        <span className="ml-2 tracking-normal text-cyan-50/58">对话 / 痛点 / 生图</span>
      </span>
    </motion.button>
  );
}

function WuYiAgent() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("about_wuyi");
  const [draft, setDraft] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [attachmentError, setAttachmentError] = useState("");
  const [painState, setPainState] = useState(INITIAL_PAIN_STATE);
  const [petOffset, setPetOffset] = useState({ x: 0, y: 0 });
  const [petDragging, setPetDragging] = useState(false);
  const fileInputRef = useRef(null);
  const petDraggedRef = useRef(false);
  const petDragStateRef = useRef(null);
  const painDanceFiredRef = useRef(false);
  const openRef = useRef(false);
  const [messages, setMessages] = useState([
    {
      id: "boot",
      role: "assistant",
      content: "我是 AI伍子胥。可以中文对话、快速收集 AI 痛点，也可以生成图片。痛点入口不做复杂审核，提交后会先给你正反馈。",
      diagnosis: null,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    const replayCelebrationWhenPanelIsOpen = (event) => {
      if (!openRef.current || event?.detail?.replayed) return;
      const detail = { ...(event?.detail || {}), replayed: true };
      setOpen(false);
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent("wuyi-agent-celebrate", { detail }));
      }, 120);
    };

    window.addEventListener("wuyi-agent-celebrate", replayCelebrationWhenPanelIsOpen);
    return () => {
      window.removeEventListener("wuyi-agent-celebrate", replayCelebrationWhenPanelIsOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const frameId = window.requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [messages, loading, open]);

  const appendAssistant = (content, diagnosis = null, tone = "normal", images = []) => {
    setMessages((current) => [
      ...current,
      {
        id: `assistant-${Date.now()}-${Math.random()}`,
        role: "assistant",
        content,
        diagnosis,
        tone,
        images,
      },
    ]);
  };

  const applyPainCheck = (painCheck, requestMode) => {
    if (requestMode !== "pain_validation" || !painCheck) return;

    const nextRound = Math.min(3, Math.max(0, Number(painCheck.nextRound ?? painCheck.round ?? 0) || 0));
    const nextState = {
      round: painCheck.approved ? 3 : Math.min(2, nextRound),
      approved: Boolean(painCheck.approved),
      stageSummary: painCheck.stageSummary || "",
      signals: Array.isArray(painCheck.signals) ? painCheck.signals.slice(0, 8) : [],
    };
    setPainState(nextState);

    if (nextState.approved && !painDanceFiredRef.current) {
      painDanceFiredRef.current = true;
      window.dispatchEvent(new CustomEvent("wuyi-agent-celebrate", { detail: { trick: "kemusan", reason: "pain-approved" } }));
    }
  };

  const submitLocalPain = (text, localAttachments = []) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      diagnosis: null,
      attachments: localAttachments.map(({ dataUrl, text: fileText, ...item }) => item),
    };
    const assistantMessage = {
      id: `assistant-${Date.now()}-${Math.random()}`,
      role: "assistant",
      content: "收到，我会进行深度思考之后在答案区给出思考，企业级业务可以联系我~",
      diagnosis: null,
      tone: "normal",
    };

    painDanceFiredRef.current = true;
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setPainState({
      round: 1,
      approved: false,
      stageSummary: text,
      signals: ["pain_submitted", "answer_pending"],
    });
    setDraft("");
    window.dispatchEvent(new CustomEvent("wuyi-agent-celebrate", { detail: { trick: "kemusan", reason: "pain-submitted" } }));
  };

  const handleAttachmentFiles = async (fileList) => {
    const incoming = Array.from(fileList || []);
    if (!incoming.length) return;

    setAttachmentError("");
    const availableSlots = Math.max(0, AGENT_MAX_ATTACHMENTS - attachments.length);
    if (!availableSlots) {
      setAttachmentError(`最多上传 ${AGENT_MAX_ATTACHMENTS} 个附件。`);
      return;
    }

    const accepted = [];
    const errors = [];
    for (const file of incoming.slice(0, availableSlots)) {
      const isImage = String(file.type || "").startsWith("image/");
      const isText = isReadableTextFile(file);
      const maxBytes = isImage ? AGENT_MAX_IMAGE_BYTES : AGENT_MAX_TEXT_FILE_BYTES;

      if (!isImage && !isText) {
        errors.push(`${file.name} 暂只支持图片、TXT、MD、CSV、JSON。`);
        continue;
      }

      if (file.size > maxBytes) {
        errors.push(`${file.name} 超过 ${formatBytes(maxBytes)}。`);
        continue;
      }

      try {
        const base = {
          id: `${Date.now()}-${Math.random()}-${file.name}`,
          name: file.name,
          type: file.type || (isImage ? "image/*" : "text/plain"),
          size: file.size,
          kind: isImage ? "image" : "text",
        };
        if (isImage) {
          accepted.push({ ...base, dataUrl: await readFileAsDataUrl(file) });
        } else {
          accepted.push({ ...base, text: (await readFileAsText(file)).slice(0, 18000) });
        }
      } catch {
        errors.push(`${file.name} 读取失败，请换一个文件。`);
      }
    }

    if (incoming.length > availableSlots) {
      errors.push(`已达到 ${AGENT_MAX_ATTACHMENTS} 个附件上限，多余文件未添加。`);
    }

    if (accepted.length) setAttachments((current) => [...current, ...accepted]);
    if (errors.length) setAttachmentError(errors.join(" "));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const sendMessage = async (overrideText) => {
    const text = String(overrideText || draft).trim();
    const outgoingAttachments = overrideText ? [] : attachments;
    if ((!text && !outgoingAttachments.length) || loading) return;
    const requestMode = mode;

    if (requestMode === "pain_validation") {
      submitLocalPain(text || attachmentSummary(outgoingAttachments) || "已上传附件，请记录这个痛点。", outgoingAttachments);
      setAttachments([]);
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      diagnosis: null,
      attachments: outgoingAttachments.map(({ dataUrl, text: fileText, ...item }) => item),
    };
    const nextMessages = [...messages, userMessage];
    const history = nextMessages
      .filter((item) => item.role === "user" || item.role === "assistant")
      .slice(-8)
      .map((item) => ({ role: item.role, content: item.content }));

    setMessages(nextMessages);
    setDraft("");
    setAttachments([]);
    setAttachmentError("");
    setLoading(true);

    const controller = new AbortController();
    const timeoutMs = requestMode === "image_generation" ? AGENT_IMAGE_TIMEOUT_MS : AGENT_TEXT_TIMEOUT_MS;
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(AGENT_API_URL, {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: requestMode,
          message: text,
          history,
          attachments: outgoingAttachments,
          painState: requestMode === "pain_validation" ? painState : undefined,
        }),
      });

      window.clearTimeout(timeoutId);
      const payload = await response.json().catch(() => null);

      if (payload?.reply || payload?.diagnosis) {
        applyPainCheck(payload?.painCheck, requestMode);
        appendAssistant(
          payload.reply || "信号已返回，但模型没有给出文字回复。",
          payload.diagnosis || null,
          response.ok ? "normal" : "warning",
          payload.images || [],
        );
        return;
      }

      setDraft((current) => current || text);
      setAttachments((current) => current.length ? current : outgoingAttachments);
      appendAssistant("AI伍子胥收到了异常响应。输入内容已经保留，可以稍后重试，或直接通过页面底部联系伍轶。", null, "warning");
    } catch (error) {
      window.clearTimeout(timeoutId);
      setDraft((current) => current || text);
      setAttachments((current) => current.length ? current : outgoingAttachments);
      appendAssistant(
        error?.name === "AbortError"
          ? "链路响应超时。输入内容已经保留，可以稍后再试，或直接联系 WuYi。"
          : "网络链路暂时没有接通。输入内容已经保留，可以稍后重试，或直接通过页面底部联系 WuYi。",
        null,
        "warning",
      );
    } finally {
      setLoading(false);
    }
  };

  const submitMessage = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const openFromPet = () => {
    if (petDraggedRef.current) {
      petDraggedRef.current = false;
      return;
    }
    setOpen(true);
  };

  const clampPetOffset = (offset) => {
    const minX = typeof window === "undefined" ? -900 : -(window.innerWidth - 260);
    const minY = typeof window === "undefined" ? -620 : -(window.innerHeight - 182);
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    return {
      x: clamp(offset.x, minX, 18),
      y: clamp(offset.y, minY, 18),
    };
  };

  const handlePetPointerDown = (event) => {
    if (event.button !== 0) return;
    petDraggedRef.current = false;
    setPetDragging(true);
    petDragStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: petOffset.x,
      originY: petOffset.y,
      moved: false,
    };

    const movePet = (moveEvent) => {
      const state = petDragStateRef.current;
      if (!state) return;
      const dx = moveEvent.clientX - state.startX;
      const dy = moveEvent.clientY - state.startY;
      if (Math.abs(dx) + Math.abs(dy) > 28) {
        state.moved = true;
        petDraggedRef.current = true;
      }
      setPetOffset(clampPetOffset({ x: state.originX + dx, y: state.originY + dy }));
    };

    const releasePet = () => {
      const wasMoved = Boolean(petDragStateRef.current?.moved);
      window.removeEventListener("pointermove", movePet);
      window.removeEventListener("pointerup", releasePet);
      window.removeEventListener("pointercancel", releasePet);
      petDragStateRef.current = null;
      setPetDragging(false);
      if (!wasMoved) setOpen(true);
      window.setTimeout(() => {
        petDraggedRef.current = false;
      }, 90);
    };

    window.addEventListener("pointermove", movePet);
    window.addEventListener("pointerup", releasePet);
    window.addEventListener("pointercancel", releasePet);
  };

  const activeMode = mode === "pain_validation" ? getPainModeCopy(painState) : agentModes[mode];

  return (
    <>
      {!open ? (
        <CyberAgentPet offset={petOffset} onPointerDown={handlePetPointerDown} onOpen={openFromPet} dragging={petDragging} />
      ) : null}

      {open ? <div className="fixed inset-0 bg-black/44 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)} /> : null}

      {open ? (
        <div className="fixed inset-x-0 bottom-0 z-40 md:inset-auto md:bottom-6 md:right-6">
          <motion.aside
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative ml-auto flex max-h-[86vh] w-full flex-col overflow-hidden rounded-t-[1.75rem] border border-cyan-100/14 bg-[#030814]/94 shadow-[0_-18px_68px_rgba(77,163,255,0.18)] backdrop-blur-md md:mr-0 md:max-h-[calc(100vh-3rem)] md:w-[420px] md:rounded-[1.55rem] md:shadow-[0_22px_84px_rgba(77,163,255,0.18)]"
            aria-label="AI伍子胥"
          >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(125,249,255,0.16),transparent_34%),radial-gradient(circle_at_92%_18%,rgba(148,118,255,0.16),transparent_35%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,rgba(255,255,255,.26)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:34px_34px]" />

          <div className="relative border-b border-white/[0.07] px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="relative mt-1 grid h-12 w-14 shrink-0 place-items-center rounded-2xl border border-cyan-100/18 bg-cyan-100/[0.06] shadow-[0_0_26px_rgba(77,163,255,0.16)]">
                  <span className="absolute -top-2 left-2 h-4 w-3 rounded-t-full border border-cyan-100/18 bg-black/34" />
                  <span className="absolute -top-2 right-2 h-4 w-3 rounded-t-full border border-violet-100/18 bg-black/34" />
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-100 shadow-[0_0_10px_rgba(125,249,255,0.9)]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-100 shadow-[0_0_10px_rgba(148,118,255,0.75)]" />
                  </span>
                </div>
                <div>
                <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.18em] text-cyan-100/58">AI WUZI XU</p>
                <h2 className="mt-1 text-lg font-medium text-white">AI伍子胥</h2>
                  <p className="mt-1 text-sm leading-6 text-white/52">免费 DeepSeek 对话 + Seedream 生图，另加一个本地轻量痛点入口。痛点提交不会卡 AI 判断通道；对话和生图仍受免费额度限制。</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-white/54 transition hover:border-cyan-100/22 hover:text-white" aria-label="关闭 AI伍子胥">
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-white/[0.07] bg-black/22 p-1">
              {Object.entries(agentModes).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${mode === key ? "bg-cyan-100/14 text-cyan-50 shadow-[0_0_24px_rgba(125,249,255,0.12)]" : "text-white/52 hover:text-white/78"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {mode === "pain_validation" ? (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {painRoundCopies.map((item, index) => {
                  const done = painState.approved || painState.round > index;
                  const active = !painState.approved && painState.round === index;
                  return (
                    <div key={item.title} className={`rounded-2xl border px-3 py-2 text-[11px] leading-5 ${done ? "border-emerald-200/24 bg-emerald-200/[0.07] text-emerald-50/72" : active ? "border-cyan-100/20 bg-cyan-100/[0.08] text-cyan-50/78" : "border-white/[0.06] bg-white/[0.025] text-white/38"}`}>
                      <span className="block font-semibold">0{index + 1}</span>
                      <span className="block truncate">{item.title.replace(/^\d+\s/, "")}</span>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <div className="mt-3 grid gap-2 text-[12px] leading-5 text-white/48 sm:grid-cols-2">
              <p className="rounded-2xl border border-white/[0.06] bg-white/[0.035] px-3 py-2">痛点：写一句最痛感受，提交后猫咪跳科目三。</p>
              <p className="rounded-2xl border border-white/[0.06] bg-white/[0.035] px-3 py-2">对话 / 生图：适合 AI 咨询、网页内容和视觉实验。</p>
            </div>
          </div>

          <div ref={scrollRef} className="relative flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] rounded-2xl border px-4 py-3 text-sm leading-6 ${message.role === "user" ? "border-cyan-100/16 bg-cyan-100/[0.08] text-cyan-50" : message.tone === "warning" ? "border-amber-100/16 bg-amber-100/[0.06] text-white/72" : "border-white/[0.07] bg-white/[0.04] text-white/68"}`}>
                  {message.content ? <p className="whitespace-pre-wrap">{message.content}</p> : null}
                  <AgentAttachments attachments={message.attachments} />
                  <AgentImages images={message.images} />
                </div>
              </div>
            ))}
            {loading ? (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-cyan-100/10 bg-white/[0.04] px-4 py-3">
                  <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.24em] text-cyan-100/46">{mode === "image_generation" ? "AI 生图中" : "信号传输中"}</p>
                  <div className="mt-3 flex gap-1.5">
                    {[0, 1, 2].map((dot) => (
                      <motion.span key={dot} animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.12 }} className="h-1.5 w-1.5 rounded-full bg-cyan-100/70" />
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <form onSubmit={submitMessage} className="relative border-t border-white/[0.07] bg-black/18 px-5 py-4">
            {mode === "pain_validation" && painState.round === 1 ? (
              <p className="mb-3 rounded-2xl border border-emerald-100/10 bg-emerald-100/[0.045] px-4 py-2 text-sm leading-6 text-emerald-50/70">
                答案区已记录痛点，等确认后再给具体思考。
              </p>
            ) : (
              <button type="button" onClick={() => sendMessage(activeMode.starter)} disabled={loading} className="mb-3 w-full rounded-2xl border border-cyan-100/10 bg-cyan-100/[0.045] px-4 py-2 text-left text-sm leading-6 text-cyan-50/66 transition hover:border-cyan-100/20 hover:text-cyan-50 disabled:cursor-not-allowed disabled:opacity-50">
                {activeMode.starter}
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={AGENT_ATTACHMENT_ACCEPT}
              className="hidden"
              onChange={(event) => handleAttachmentFiles(event.target.files)}
            />
            {attachments.length ? (
              <div className="mb-3 grid gap-2">
                {attachments.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 rounded-2xl border border-cyan-100/10 bg-cyan-100/[0.045] px-3 py-2 text-xs text-cyan-50/70">
                    <Icon name={item.kind === "image" ? "image" : "file"} className="h-3.5 w-3.5 shrink-0" />
                    <span className="min-w-0 flex-1 truncate">{item.name}</span>
                    <span className="shrink-0 text-cyan-50/40">{formatBytes(item.size)}</span>
                    <button
                      type="button"
                      onClick={() => setAttachments((current) => current.filter((attachment) => attachment.id !== item.id))}
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/10 text-white/42 transition hover:border-rose-100/24 hover:text-rose-50"
                      aria-label={`移除 ${item.name}`}
                    >
                      <Icon name="close" className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
            {attachmentError ? <p className="mb-3 rounded-2xl border border-amber-100/12 bg-amber-100/[0.06] px-3 py-2 text-xs leading-5 text-amber-50/72">{attachmentError}</p> : null}
            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading || attachments.length >= AGENT_MAX_ATTACHMENTS}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.045] text-cyan-50/70 transition hover:border-cyan-100/24 hover:bg-cyan-100/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="上传图片或小文件"
                title="上传图片或小文件"
              >
                <Icon name="upload" className="h-4 w-4" />
              </button>
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={activeMode.placeholder}
                rows={2}
                className="min-h-[48px] flex-1 resize-none rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/28 focus:border-cyan-100/24 focus:bg-white/[0.065]"
              />
              <button type="submit" disabled={loading || (!draft.trim() && !attachments.length)} className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-cyan-100/18 bg-cyan-100/[0.10] text-cyan-50 transition hover:border-cyan-100/32 hover:bg-cyan-100/[0.16] disabled:cursor-not-allowed disabled:opacity-40" aria-label="发送给 AI伍子胥">
                <Icon name="send" className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-white/32">支持图片、TXT、MD、CSV、JSON，小文件会随消息一起发送。</p>
          </form>
          </motion.aside>
        </div>
      ) : null}
    </>
  );
}

function GithubLaunchOverlay({ active }) {
  return (
    <motion.div initial={false} animate={{ opacity: active ? 1 : 0 }} transition={{ duration: active ? 0.16 : 0.5 }} className="pointer-events-none fixed inset-0 z-50 grid place-items-center bg-black/72 backdrop-blur-md">
      <motion.div initial={false} animate={active ? { scale: [0.92, 1, 1.02], opacity: [0, 1, 1] } : { scale: 0.98, opacity: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className="relative w-[min(92vw,520px)] overflow-hidden rounded-[2.2rem] border border-cyan-100/16 bg-[#050b18]/80 px-9 py-8 text-center shadow-[0_0_90px_rgba(77,163,255,0.24)] backdrop-blur-md">
        <p style={fontStyles.mono} className="text-[12px] uppercase tracking-[0.18em] text-cyan-100/60">AI System Launch</p>
        <p className="mt-3 text-xl font-medium text-white">Opening GitHub Repository</p>
        <p className="mt-2 text-sm text-white/42">Connecting to hoanacantincus-cmd</p>
        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div animate={active ? { width: ["0%", "100%"] } : { width: "0%" }} transition={{ duration: 0.72, ease: "easeInOut" }} className="h-full rounded-full bg-gradient-to-r from-cyan-200 via-white to-violet-200" /></div>
      </motion.div>
    </motion.div>
  );
}

function WuYiAgentGate() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const wakeAgent = (event) => {
      if (event?.detail?.agentMountReplay) return;
      setEnabled(true);
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent("wuyi-agent-celebrate", {
          detail: { ...(event?.detail || {}), agentMountReplay: true },
        }));
      }, 80);
    };

    window.addEventListener("wuyi-agent-celebrate", wakeAgent);
    return () => window.removeEventListener("wuyi-agent-celebrate", wakeAgent);
  }, []);

  return enabled ? <WuYiAgent /> : null;
}

export default function App() {
  const [githubBooting, setGithubBooting] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [sharePanelOpen, setSharePanelOpen] = useState(false);
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const isAnalyticsRoute = pathname === "/admin-analytics";
  const codingBasicsMatch = pathname.match(/^\/ai-coding-basics(?:\/([^/]+))?\/?$/);
  const isCodingBasicsRoute = Boolean(codingBasicsMatch);
  const codingBasicsTopicId = codingBasicsMatch?.[1] || "";
  const practiceRoute = pathname === "/agent-development" || pathname === "/automation-productization"
    ? pathname.slice(1)
    : "";

  useEffect(() => {
    if (!window.location.hash) return undefined;
    const scrollToHash = () => {
      const target = document.querySelector(window.location.hash);
      target?.scrollIntoView({ block: "start" });
    };
    const frameId = window.requestAnimationFrame(scrollToHash);
    const settleId = window.setTimeout(scrollToHash, 180);
    const lateId = window.setTimeout(scrollToHash, 520);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(settleId);
      window.clearTimeout(lateId);
    };
  }, []);

  useEffect(() => {
    trackAnalytics("page_view", { section: isAnalyticsRoute ? "admin-analytics" : "home" });
  }, [isAnalyticsRoute]);

  useEffect(() => {
    if (isAnalyticsRoute) return undefined;
    const seen = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id && !seen.has(entry.target.id)) {
          seen.add(entry.target.id);
          trackAnalytics("section_view", { section: entry.target.id });
        }
      });
    }, { threshold: 0.32 });

    ["hero", "ai-roadmap", "ai-coding-basics", "model-benchmark", "coding-tools", "agent-development", "automation-productization", "radar", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [isAnalyticsRoute]);

  useEffect(() => {
    if (isAnalyticsRoute) return undefined;
    const canScrollInside = (target, deltaY) => {
      if (!(target instanceof Element)) return false;
      if (target.closest("textarea,input,select,[contenteditable='true']")) return true;

      for (let node = target; node && node !== document.body && node !== document.documentElement; node = node.parentElement) {
        const { overflowY } = window.getComputedStyle(node);
        const scrollable = /auto|scroll|overlay/.test(overflowY) && node.scrollHeight > node.clientHeight + 1;
        if (!scrollable) continue;
        if (deltaY > 0 && node.scrollTop + node.clientHeight < node.scrollHeight - 1) return true;
        if (deltaY < 0 && node.scrollTop > 1) return true;
      }

      return false;
    };

    const handleWheel = (event) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey) return;

      const wheelFallbackSpeed = 4;
      const unit = event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? window.innerHeight : 1;
      const deltaY = event.deltaY * unit;
      if (!deltaY || canScrollInside(event.target, deltaY)) return;

      const fallbackDeltaY = deltaY * wheelFallbackSpeed;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const before = window.scrollY;
      if ((fallbackDeltaY > 0 && before >= maxScroll - 1) || (fallbackDeltaY < 0 && before <= 1)) return;

      window.requestAnimationFrame(() => {
        if (Math.abs(window.scrollY - before) < 1) {
          window.scrollBy({ top: fallbackDeltaY, behavior: "auto" });
        }
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isAnalyticsRoute]);

  useEffect(() => {
    if (isAnalyticsRoute) return undefined;
    let settleTimer = 0;
    const markScrolling = () => {
      document.documentElement.dataset.pageScrolling = "true";
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        delete document.documentElement.dataset.pageScrolling;
      }, 180);
    };

    window.addEventListener("scroll", markScrolling, { passive: true });
    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", markScrolling);
      delete document.documentElement.dataset.pageScrolling;
    };
  }, [isAnalyticsRoute]);

  const scrollToSection = (targetId) => (event) => {
    event.preventDefault();
    const target = document.querySelector(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      if (window.location.hash !== targetId) window.history.pushState(null, "", targetId);
    }, 120);
  };

  const launchGithub = (event) => {
    event.preventDefault();
    setGithubBooting(true);
    const githubWindow = window.open(profile.github, "_blank", "noopener,noreferrer");
    if (!githubWindow) window.location.href = profile.github;
    window.setTimeout(() => setGithubBooting(false), 850);
  };

  const copyShareLink = async () => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        return true;
      } catch {
        // Fall through to the textarea copy fallback.
      }
    }

    try {
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(textarea);
      return copied;
    } catch {
      return false;
    }
  };

  const shareSite = async () => {
    const nativeShare = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) && navigator.share;
    setSharePanelOpen(false);

    try {
      if (nativeShare) {
        await navigator.share({ ...sharePayload, url: shareUrl });
        setShareStatus("已打开分享");
      } else {
        await copyShareLink();
        setShareStatus("复制成功");
      }
    } catch (error) {
      if (error?.name === "AbortError") {
        setShareStatus("分享已取消");
      } else if (nativeShare) {
        setSharePanelOpen(true);
        setShareStatus("请手动复制");
      } else {
        await copyShareLink();
        setShareStatus("复制成功");
      }
    }

    window.setTimeout(() => setShareStatus(""), 2200);
  };

  if (isAnalyticsRoute) {
    return <AnalyticsDashboard fontStyles={fontStyles} />;
  }

  if (isCodingBasicsRoute) {
    return <AICodingBasicsPage fontStyles={fontStyles} topicId={codingBasicsTopicId} />;
  }

  if (practiceRoute) {
    return <PracticeDetailPage type={practiceRoute} fontStyles={fontStyles} />;
  }

  return (
    <main style={fontStyles.ui} className="min-h-screen [overflow-x:clip] bg-black text-white">
      <GithubLaunchOverlay active={githubBooting} />
      <WuYiAgentGate />
      {sharePanelOpen ? (
        <div className="fixed inset-x-4 bottom-5 z-[80] mx-auto max-w-xl rounded-[1.35rem] border border-cyan-100/18 bg-[#070b14]/92 p-4 text-white shadow-[0_22px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:bottom-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p style={fontStyles.mono} className="text-[10px] uppercase tracking-[0.2em] text-cyan-100/52">Share Link</p>
              <p className="mt-1 text-sm text-white/62">桌面端可复制网址；移动端会优先打开系统分享面板，微信通常会出现在可分享应用里。</p>
            </div>
            <button type="button" onClick={() => setSharePanelOpen(false)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/58 transition hover:text-white">
              ×
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-black/28 p-3 md:flex-row md:items-center">
            <code className="min-w-0 flex-1 break-all text-sm text-cyan-50/78">{shareUrl}</code>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard?.writeText(shareUrl);
                  setShareStatus("已复制链接");
                } catch {
                  setShareStatus("请手动复制");
                }
              }}
              className="rounded-full border border-cyan-100/16 bg-cyan-100/[0.08] px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-100/[0.14]"
            >
              {shareStatus || "复制网址"}
            </button>
          </div>
        </div>
      ) : null}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.055),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.04),transparent_34%),linear-gradient(180deg,#000,#050505_48%,#000)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.28)_1px,transparent_1px)] [background-size:56px_56px]" />

      <header className="relative z-20 mx-auto flex max-w-[1540px] items-center justify-between px-6 py-7 md:px-10">
        <a href="#hero" className="inline-flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.05]"><Icon name="core" /></span><span className="text-base font-medium text-white/50 transition hover:text-white">{profile.logoText}</span></a>
        <nav className="hidden items-center gap-5 text-base text-white/50 md:flex"><a href="#ai-roadmap" onClick={scrollToSection("#ai-roadmap")} className="hover:text-white">路径</a><a href="#ai-coding-basics" onClick={scrollToSection("#ai-coding-basics")} className="hover:text-white">编程基础</a><a href="#model-benchmark" onClick={scrollToSection("#model-benchmark")} className="hover:text-white">模型评测</a><a href="#coding-tools" onClick={scrollToSection("#coding-tools")} className="hover:text-white">编程智能体</a><a href="#agent-development" onClick={scrollToSection("#agent-development")} className="hover:text-white">Agent开发</a><a href="#automation-productization" onClick={scrollToSection("#automation-productization")} className="hover:text-white">自动化产品化</a><a href="#radar" onClick={scrollToSection("#radar")} className="hover:text-white">Radar</a><a href="#contact" onClick={scrollToSection("#contact")} className="hover:text-white">联系</a></nav>
      </header>

      <ScrollVideoHero
        profile={profile}
        shareStatus={shareStatus}
        onGithub={launchGithub}
        onContact={scrollToSection("#contact")}
        onShare={shareSite}
        fontStyles={fontStyles}
      />

      <AIInsightsSection fontStyles={fontStyles} CoreVisual={AICoreScene} />

      <section id="story-removed" className="hidden">
        <EvolutionLightBackground background={evolutionBackgrounds.story} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(125,249,255,0.08),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(148,118,255,0.13),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_32%,rgba(255,255,255,0.012))]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,.26)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:58px_58px]" />
        <div className="relative z-10 mx-auto max-w-[1500px]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mb-16 max-w-4xl text-center md:mb-20"
          >
            <h2 className="mx-auto bg-gradient-to-b from-white via-slate-100/90 to-white/42 bg-clip-text text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.055em] text-transparent md:text-[4.2rem]">
              方法与案例
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-cyan-50/58 md:text-lg">
              从 AI 编程基础，到 Agent 开发，再到自动化和产品化交付。
            </p>
            <p className="mx-auto mt-2 max-w-3xl text-base leading-8 text-white/48 md:text-lg">
              这里不讲抽象概念，只讲如何把能力变成能运行、能验证、能复用的系统。
            </p>
          </motion.div>

          <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_34px_110px_rgba(125,160,200,0.20)]"
            >
              <img src="/media/ai-learning-path-light.png" alt="浅色 AI 实战路径视觉图" className="h-full min-h-[320px] w-full object-cover" loading="lazy" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.38))]" />
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {practicePanels.map((panel, index) => (
                <motion.article
                  key={panel.no}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.08, duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden rounded-[1.6rem] border border-cyan-100/[0.10] bg-white/[0.045] p-6 backdrop-blur-xl"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(125,249,255,0.14),transparent_34%)]" />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <span style={fontStyles.mono} className="rounded-full border border-cyan-100/14 bg-cyan-100/[0.08] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-cyan-50/66">{panel.meta}</span>
                      <span style={fontStyles.mono} className="text-xs text-white/32">{panel.no}</span>
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold tracking-[-0.035em] text-white">{panel.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/56">{panel.desc}</p>
                    <div className="mt-6 grid gap-2">
                      {panel.points.map((point) => (
                        <div key={point} className="flex items-center gap-2 text-sm text-cyan-50/68">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-100 shadow-[0_0_12px_rgba(125,249,255,0.72)]" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[2rem] border border-cyan-100/[0.10] bg-white/[0.035] shadow-[0_36px_110px_rgba(0,0,0,0.38)]"
            >
              <img src="/media/ai-method-system-map-cinematic.png" alt="AI 方法与系统案例视觉图" className="min-h-[360px] w-full object-cover" loading="lazy" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(3,4,10,0.38)),radial-gradient(circle_at_72%_28%,rgba(125,249,255,0.18),transparent_34%)]" />
              <div className="absolute bottom-5 left-5 right-5 grid gap-3 md:grid-cols-3">
                {systems.map((item) => (
                  <div key={item.no} className="rounded-2xl border border-white/[0.10] bg-black/44 p-4 backdrop-blur-md">
                    <p style={fontStyles.mono} className="text-[10px] uppercase tracking-[0.18em] text-cyan-100/46">{item.status}</p>
                    <p className="mt-2 text-sm font-semibold text-white/84">{item.cnTitle}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-4">
              {storyFrames.map((frame, index) => (
                <motion.article
                  key={frame.no}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: index * 0.05, duration: 0.58 }}
                  className="group relative overflow-hidden rounded-[1.55rem] border border-white/[0.08] bg-black/22 p-5 backdrop-blur-xl"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_18%,rgba(125,249,255,0.10),transparent_34%)] opacity-0 transition group-hover:opacity-100" />
                  <div className="relative flex gap-4">
                    <span style={fontStyles.mono} className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-cyan-100/14 bg-cyan-100/[0.08] text-sm text-cyan-50/78">{frame.no}</span>
                    <div>
                      <p style={fontStyles.mono} className="text-[10px] uppercase tracking-[0.18em] text-cyan-100/42">{frame.english}</p>
                      <h3 className="mt-1 text-xl font-semibold text-white">{frame.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/55">{frame.desc}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="radar" className="relative z-10 [overflow-x:clip] bg-black px-6 py-28 text-white md:px-10 md:py-36">
        <EvolutionLightBackground background={evolutionBackgrounds.radar} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-[#050505]/85 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-[#050505]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.055),transparent_26%),radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.045),transparent_30%),linear-gradient(180deg,#000_0%,#050505_48%,#000_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.018] [background-image:linear-gradient(to_right,rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_28%,rgba(255,255,255,0.40)_0_1px,transparent_1.7px),radial-gradient(circle_at_78%_34%,rgba(190,220,255,0.38)_0_1px,transparent_1.7px),radial-gradient(circle_at_52%_78%,rgba(255,255,255,0.24)_0_1px,transparent_1.6px)] [background-size:88px_88px,132px_132px,176px_176px] opacity-[0.18]" />
        <div className="pointer-events-none absolute -left-[20%] top-[24%] h-72 w-[72%] -rotate-12 rounded-full bg-[radial-gradient(ellipse,rgba(255,255,255,0.045),transparent_72%)] blur-3xl" />
        <div className="pointer-events-none absolute right-[-18%] bottom-[18%] h-72 w-[72%] rotate-12 rounded-full bg-[radial-gradient(ellipse,rgba(255,255,255,0.05),transparent_72%)] blur-3xl" />

        <div className="relative z-10 mx-auto max-w-[1500px]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 mx-auto max-w-4xl text-center"
          >
            <h2 className="mx-auto bg-gradient-to-b from-white via-slate-100/90 to-white/42 bg-clip-text text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.055em] text-transparent md:text-[4.2rem]">
              AI Orbit Radar
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-cyan-50/58 md:text-lg">
              围绕 AI Core 运行的技术星图。
            </p>
            <p className="mx-auto mt-2 max-w-3xl text-base leading-8 text-white/48 md:text-lg">
              从基础模型、智能体、RAG、训练优化、强化学习到应用工程，每一条轨道都服务于真实 AI 产品的构建。
            </p>
          </motion.div>

          <div
            className="relative z-10 mx-auto mt-10 h-[330px] max-w-full overflow-clip sm:h-[390px] md:mt-16 md:h-[560px] lg:mt-20 lg:h-auto lg:overflow-visible"
            style={{
              WebkitMaskImage: "linear-gradient(90deg, #000 0%, #000 86%, transparent 100%)",
              maskImage: "linear-gradient(90deg, #000 0%, #000 86%, transparent 100%)",
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 w-[920px] -translate-x-1/2 -translate-y-1/2 scale-[0.42] sm:scale-[0.5] md:scale-[0.78] lg:static lg:w-full lg:translate-x-0 lg:translate-y-0 lg:scale-100"
              style={{
                WebkitMaskImage: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.45) 8%, #000 18%, #000 100%)",
                maskImage: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.45) 8%, #000 18%, #000 100%)",
              }}
            >
              <TechnologyRadar />
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="relative z-10 [overflow-x:clip] px-6 py-32 text-white md:px-10 md:py-44">
        <EvolutionLightBackground background={evolutionBackgrounds.contact} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.055),transparent_34%),radial-gradient(circle_at_82%_30%,rgba(255,255,255,0.045),transparent_38%),radial-gradient(circle_at_18%_68%,rgba(255,255,255,0.035),transparent_34%),linear-gradient(180deg,#000_0%,#050505_44%,#000_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black via-[#050505]/70 to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.022] [background-image:linear-gradient(to_right,rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(255,255,255,0.34)_0_1px,transparent_1.6px),radial-gradient(circle_at_78%_36%,rgba(190,220,255,0.30)_0_1px,transparent_1.6px),radial-gradient(circle_at_52%_78%,rgba(255,255,255,0.22)_0_1px,transparent_1.6px)] [background-size:96px_96px,148px_148px,196px_196px] opacity-[0.14]" />
        <div className="pointer-events-none absolute left-1/2 top-[24%] h-px w-[78vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-100/22 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 bottom-[18%] h-64 w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,255,255,0.045),rgba(255,255,255,0.035)_38%,transparent_72%)] blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-6xl text-center"
        >
          <p style={fontStyles.mono} className="mb-7 text-[12px] uppercase tracking-[0.22em] text-cyan-50/56">WuYi with AI</p>
          <h2 className="mx-auto max-w-none whitespace-nowrap bg-gradient-to-b from-white via-slate-100/88 to-white/38 bg-clip-text text-[clamp(1.55rem,4.7vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.065em] text-transparent">
            当想象力接入智能，现实开始重构。
          </h2>

          <div className="mx-auto mt-12 h-px max-w-xl bg-gradient-to-r from-transparent via-cyan-100/26 to-transparent" />

          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <p style={fontStyles.serif} className="text-[2.7rem] font-light tracking-[0.18em] text-white/92 md:text-[4.2rem]">AI伍子胥</p>
            <p className="text-base font-medium tracking-[0.22em] text-cyan-50/56">{profile.location}</p>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl gap-3 text-base text-white/68 md:grid-cols-3">
            <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-full border border-cyan-100/10 bg-white/[0.035] px-5 py-3 backdrop-blur-xl transition hover:border-cyan-100/24 hover:bg-white/[0.075] hover:text-white">
              GitHub：{profile.githubName}
            </a>
            <a href={`mailto:${profile.email}`} className="rounded-full border border-cyan-100/10 bg-white/[0.035] px-5 py-3 backdrop-blur-xl transition hover:border-cyan-100/24 hover:bg-white/[0.075] hover:text-white">
              邮箱：{profile.email}
            </a>
            <span className="rounded-full border border-cyan-100/10 bg-white/[0.035] px-5 py-3 backdrop-blur-xl">
              合作/企业级AI能力学习：{profile.phone}
            </span>
          </div>
        </motion.div>
      </footer>
    </main>
  );
}
