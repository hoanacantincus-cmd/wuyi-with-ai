import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const profile = {
  name: "不可言",
  title: "AI 先行者",
  heroTitle: "AI边池派",
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
    radius: 34,
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
    radius: 45,
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
    radius: 56,
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
    radius: 67,
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
    radius: 78,
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
    radius: 89,
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
    radius: 100,
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
    radius: 111,
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
    radius: 122,
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
    radius: 134,
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
  const base = "group inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium transition duration-300";
  const styles = variant === "primary"
    ? "border border-white/10 bg-white/[0.035] text-white/74 shadow-none hover:border-cyan-100/34 hover:bg-white/[0.105] hover:text-white hover:shadow-[0_18px_54px_rgba(77,163,255,0.14)]"
    : "border border-white/10 bg-white/[0.035] text-white/74 hover:border-white/22 hover:bg-white/[0.065] hover:text-white";

  return (
    <motion.a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noreferrer" : undefined} onClick={onClick} whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.985 }} className={`${base} ${styles}`}>
      {icon ? <Icon name={icon} className="h-4 w-4" /> : null}
      <span>{children}</span>
      {variant === "primary" ? <Icon name="arrow" className="h-4 w-4 opacity-55 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> : null}
    </motion.a>
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
      dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    const render = () => {
      frame += 1;
      const t = frame / 60;
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

      const sphere = ctx.createRadialGradient(cx - radius * 0.4, cy - radius * 0.46, radius * 0.06, cx, cy, radius);
      sphere.addColorStop(0, "rgba(246,249,255,0.95)");
      sphere.addColorStop(0.1, "rgba(198,240,255,0.42)");
      sphere.addColorStop(0.34, "rgba(120,210,255,0.22)");
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
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

function AILabel({ title, subtitle, className = "", align = "left", tier = "secondary", pointer, children }) {
  const styles = {
    primary: { move: 0.045, opacity: [0.84, 1, 0.84], wrapper: "max-w-[270px]", title: "text-[13px] font-semibold tracking-[0.13em] text-cyan-50/95", subtitle: "text-[12px] leading-5 text-cyan-50/78", dot: "bg-cyan-100/90 shadow-[0_0_20px_rgba(180,240,255,0.9)]", line: "via-cyan-100/42", visual: "opacity-95" },
    secondary: { move: 0.032, opacity: [0.58, 0.82, 0.58], wrapper: "max-w-[235px]", title: "text-[12px] font-medium tracking-[0.12em] text-cyan-50/74", subtitle: "text-[11px] leading-5 text-cyan-50/56", dot: "bg-cyan-200/64 shadow-[0_0_14px_rgba(125,249,255,0.45)]", line: "via-cyan-100/22", visual: "opacity-70" },
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
    <motion.div onMouseMove={handleMouseMove} onMouseLeave={() => setPointer({ x: 0, y: 0, px: 50, py: 50, active: false })} className="relative mx-auto aspect-[1.16/1] w-full max-w-[1080px] overflow-hidden rounded-[2.7rem] border border-cyan-100/18 bg-[#01030a] shadow-[inset_0_0_44px_rgba(120,180,255,0.075),0_0_90px_rgba(20,80,255,0.13),0_100px_260px_rgba(0,0,0,0.72)] backdrop-blur-2xl md:rounded-[4rem]">
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
    <motion.article initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }} className="group relative min-h-[250px] overflow-hidden rounded-[2rem] border border-white/[0.095] bg-[linear-gradient(145deg,rgba(255,255,255,0.078),rgba(255,255,255,0.03))] p-6 shadow-[0_34px_110px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-cyan-100/24 hover:bg-white/[0.072]">
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
            <div><p style={fontStyles.mono} className="text-[10px] uppercase tracking-[0.24em] text-cyan-50/34 transition duration-500 group-hover:text-cyan-50/58">{item.label}</p><p style={fontStyles.mono} className="mt-1 text-[10px] text-white/24 transition duration-500 group-hover:text-white/36">MODULE {item.tag}</p></div>
          </div>
          <span style={fontStyles.mono} className="text-[11px] text-white/24 transition duration-500 group-hover:text-white/42">{item.tag}</span>
        </div>
        <h3 className="text-[1.18rem] font-semibold tracking-[-0.035em] text-white/94 transition duration-500 group-hover:text-white">{item.title}</h3>
        <p className="mt-4 max-w-[92%] text-[0.94rem] leading-7 text-white/50 transition duration-500 group-hover:text-white/62">{item.desc}</p>
        <div className="mt-auto pt-6"><div className="flex items-center justify-between border-t border-white/[0.07] pt-4 transition duration-500 group-hover:border-cyan-100/12"><p style={fontStyles.mono} className="text-[10px] uppercase tracking-[0.18em] text-cyan-50/34 transition duration-500 group-hover:text-cyan-50/48">{item.meta}</p><span className="h-1.5 w-10 rounded-full bg-gradient-to-r from-transparent via-cyan-100/42 to-transparent transition duration-500 group-hover:w-16 group-hover:via-cyan-100/70" /></div></div>
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
      className="group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-cyan-100/[0.12] bg-[linear-gradient(145deg,rgba(255,255,255,0.078),rgba(255,255,255,0.025))] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.34)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-cyan-100/26 hover:bg-white/[0.07] lg:min-h-[390px]"
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
            <p style={fontStyles.mono} className="text-[11px] font-medium uppercase tracking-[0.26em] text-cyan-50/44">FRAME {frame.no}</p>
            <p style={fontStyles.mono} className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/24">{frame.signal}</p>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-100/14 bg-black/24 text-[11px] text-cyan-50/62 shadow-[inset_0_0_18px_rgba(160,232,255,0.035)]" style={fontStyles.mono}>{frame.no}</span>
        </div>

        <div className="relative mb-4 rounded-[1.35rem] border border-white/[0.07] bg-black/18 p-2 shadow-[inset_0_0_28px_rgba(125,249,255,0.035)]">
          <StoryVisual type={frame.visual} index={index} />
          <div className="absolute right-3 top-3 rounded-full border border-cyan-100/14 bg-black/40 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-cyan-50/42" style={fontStyles.mono}>HUD</div>
        </div>

        <h3 className="text-[1.25rem] font-semibold tracking-[-0.04em] text-white/94">{frame.title}</h3>
        <p className="mt-2 text-[0.82rem] uppercase tracking-[0.12em] text-cyan-50/56" style={fontStyles.mono}>{frame.english}</p>
        <p className="mt-4 text-[0.92rem] leading-7 text-white/50">{frame.desc}</p>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between border-t border-white/[0.07] pt-4">
            <p style={fontStyles.mono} className="text-[9.5px] uppercase tracking-[0.16em] text-cyan-50/34">{frame.meta}</p>
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
      <div className="relative h-44 overflow-hidden rounded-[1.6rem] border border-white/[0.07] bg-black/22 p-5 shadow-[inset_0_0_36px_rgba(125,249,255,0.035)]">
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
              <p style={fontStyles.mono} className="mt-4 text-[9px] uppercase tracking-[0.16em] text-cyan-50/42">{node}</p>
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
      <div className="relative h-44 overflow-hidden rounded-[1.6rem] border border-white/[0.07] bg-black/22 p-4 shadow-[inset_0_0_36px_rgba(125,249,255,0.035)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.07),transparent_34%)]" />
        <div className="relative z-10 h-full rounded-[1.2rem] border border-white/[0.08] bg-white/[0.035] p-3">
          <div className="mb-3 flex items-center justify-between border-b border-white/[0.06] pb-2">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/28" />
              <span className="h-2 w-2 rounded-full bg-cyan-100/46" />
              <span className="h-2 w-2 rounded-full bg-violet-200/36" />
            </div>
            <p style={fontStyles.mono} className="text-[8px] uppercase tracking-[0.2em] text-cyan-50/34">AI UX Console</p>
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
            <div className="relative overflow-hidden rounded-xl border border-cyan-100/10 bg-black/22 p-3">
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
    <div className="relative h-44 overflow-hidden rounded-[1.6rem] border border-white/[0.07] bg-black/22 p-5 shadow-[inset_0_0_36px_rgba(125,249,255,0.035)]">
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
      className="group relative overflow-hidden rounded-[2.45rem] border border-white/[0.10] bg-[linear-gradient(145deg,rgba(255,255,255,0.082),rgba(255,255,255,0.028))] p-6 shadow-[0_42px_130px_rgba(0,0,0,0.42)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-cyan-100/24 hover:bg-white/[0.072]"
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
            <p style={fontStyles.mono} className="text-[10px] uppercase tracking-[0.28em] text-cyan-50/42">SYSTEM {item.no}</p>
            <h3 className="mt-4 text-[1.85rem] font-semibold leading-none tracking-[-0.055em] text-white md:text-[2.1rem]">{item.title}</h3>
            <p className="mt-2 text-[0.95rem] font-medium text-cyan-50/58">{item.cnTitle}</p>
          </div>
          <div className="rounded-full border border-cyan-100/14 bg-black/24 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-cyan-50/54" style={fontStyles.mono}>
            Status: {item.status}
          </div>
        </div>

        <SystemVisual type={item.visual} index={index} />

        <p className="mt-7 min-h-[58px] text-[0.96rem] leading-7 text-white/54 transition duration-500 group-hover:text-white/66">{item.desc}</p>
        <div className="mt-6 rounded-2xl border border-white/[0.07] bg-black/16 px-4 py-3">
          <p style={fontStyles.mono} className="text-[10px] uppercase tracking-[0.18em] text-cyan-50/44">{item.flow}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {item.stack.map((chip) => (
            <span key={chip} className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-[11px] text-white/44 transition duration-300 group-hover:border-cyan-100/14 group-hover:text-cyan-50/60">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function OrbitCore({ active }) {
  return (
    <motion.div
      animate={{ scale: active ? 1.08 : [1, 1.045, 1], opacity: active ? 1 : [0.92, 1, 0.92] }}
      transition={{ duration: active ? 0.35 : 4.2, repeat: active ? 0 : Infinity, ease: "easeInOut" }}
      style={{ x: "-50%", y: "-50%" }}
      className="absolute left-1/2 top-1/2 z-40 grid h-44 w-44 place-items-center rounded-full border border-cyan-100/24 bg-[radial-gradient(circle_at_50%_36%,rgba(255,255,255,0.30),rgba(125,249,255,0.14)_32%,rgba(10,18,34,0.92)_72%)] shadow-[inset_0_0_50px_rgba(235,245,255,0.12),0_0_120px_rgba(125,249,255,0.28),0_0_220px_rgba(88,91,255,0.10)] backdrop-blur-2xl md:h-56 md:w-56"
    >
      {[0, 1, 2].map((pulse) => (
        <motion.div
          key={`core-pulse-${pulse}`}
          className="absolute rounded-full border border-cyan-100/18"
          initial={false}
          animate={{ scale: [0.72, 1.88], opacity: [0.34, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut", delay: pulse * 1.05 }}
          style={{ inset: "14%" }}
        />
      ))}
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
      <div className="absolute -inset-20 rounded-full bg-[radial-gradient(circle,rgba(125,249,255,0.18),rgba(88,91,255,0.08)_38%,transparent_70%)] blur-2xl" />
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 rounded-full bg-[conic-gradient(from_90deg,transparent,rgba(125,249,255,0.16),transparent,rgba(168,138,255,0.14),transparent)] blur-sm"
      />
      <div className="relative text-center">
        <Icon name="core" className="mx-auto mb-4 h-9 w-9 text-cyan-50/78 md:h-10 md:w-10" />
        <p style={fontStyles.mono} className="text-[12px] font-semibold uppercase tracking-[0.34em] text-white/92 md:text-[14px]">AI CORE</p>
        <p style={fontStyles.mono} className="mt-3 text-[9px] uppercase tracking-[0.22em] text-cyan-50/48 md:text-[10px]">WuYi System Stack</p>
      </div>
    </motion.div>
  );
}

function OrbitRing({ ring, index }) {
  const rotation = ring.direction === "cw" ? 360 : -360;
  const counterRotation = ring.direction === "cw" ? -360 : 360;
  const orbitHeight = ring.radius * ring.ellipse;

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
          opacity: 0.66,
        }}
      />
      <motion.span
        className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_24px_rgba(160,232,255,0.95)]"
        animate={{ opacity: [0.28, 0.9, 0.28], scale: [0.9, 1.12, 0.9] }}
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
          className="rounded-full border border-white/[0.035] bg-black/14 px-2.5 py-1 text-[8px] uppercase tracking-[0.18em] backdrop-blur-xl md:text-[9px]"
        >
          <span className="text-white/14">{ring.label}</span>
        </motion.div>
      </div>

      {ring.items.map((item, itemIndex) => {
        const angle = (itemIndex / ring.items.length) * Math.PI * 2 + index * 0.42;
        const radiusTweak = 52 + ((itemIndex % 3) - 1) * 2.6;
        const x = 50 + Math.cos(angle) * radiusTweak;
        const y = 50 + Math.sin(angle) * radiusTweak;
        const isPriority = ring.priority?.includes(item);
        const sizeClass = isPriority ? "px-2.5 py-1.5 text-[9.5px] md:text-[10.5px]" : "px-2 py-1.5 text-[8.5px] md:text-[9.5px]";
        return (
          <div key={item} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
            <motion.div
              animate={{ rotate: [-ring.tilt, -ring.tilt + counterRotation] }}
              transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
            >
              <div
                className={`inline-flex max-w-[112px] items-center gap-1.5 rounded-full border bg-black/34 shadow-[0_18px_42px_rgba(0,0,0,0.22)] backdrop-blur-xl md:max-w-[128px] ${sizeClass}`}
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
    <div className="pointer-events-none absolute bottom-5 left-5 z-50 hidden max-w-[330px] rounded-[1.5rem] border border-white/[0.035] bg-black/8 p-4 text-white/24 backdrop-blur-xl lg:block">
      <p style={fontStyles.mono} className="mb-3 text-[9px] uppercase tracking-[0.28em] text-cyan-50/24">Orbit Legend</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {orbitGroups.map((ring) => (
          <div key={ring.id} className="flex items-center gap-2 text-left">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ring.accent, boxShadow: `0 0 12px ${ring.accent}` }} />
            <span style={fontStyles.mono} className="text-[8.5px] uppercase tracking-[0.12em] text-white/20">{ring.label}</span>
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(125,249,255,0.16),transparent_24%),radial-gradient(circle_at_28%_34%,rgba(77,163,255,0.12),transparent_30%),radial-gradient(circle_at_78%_28%,rgba(148,118,255,0.13),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(720px circle at 50% 54%, rgba(180,238,255,0.12), transparent 42%)" }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(255,255,255,0.48)_0_1px,transparent_1.6px),radial-gradient(circle_at_72%_28%,rgba(190,220,255,0.42)_0_1px,transparent_1.7px),radial-gradient(circle_at_46%_74%,rgba(255,255,255,0.30)_0_1px,transparent_1.6px)] [background-size:73px_73px,113px_113px,151px_151px] opacity-[0.24]" />
      {Array.from({ length: 64 }).map((_, i) => (
        <motion.span
          key={`star-${i}`}
          className="pointer-events-none absolute h-px w-px rounded-full bg-white"
          style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, opacity: 0.12 + (i % 5) * 0.045 }}
          animate={{ opacity: [0.06, 0.34 + (i % 3) * 0.07, 0.06], scale: [0.8, 1.25, 0.8] }}
          transition={{ duration: 4 + (i % 7) * 0.42, repeat: Infinity, ease: "easeInOut", delay: i * 0.037 }}
        />
      ))}

      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`deep-ring-${i}`}
          animate={{ rotate: i % 2 ? -360 : 360 }}
          transition={{ duration: 120 + i * 26, repeat: Infinity, ease: "linear" }}
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

      <div className="pointer-events-none absolute right-5 top-5 z-50 hidden rounded-[1.5rem] border border-white/[0.03] bg-black/8 px-4 py-3 text-right backdrop-blur-xl lg:block">
        <p style={fontStyles.mono} className="text-[9px] uppercase tracking-[0.28em] text-white/18">Live Stack Map</p>
        <p style={fontStyles.mono} className="mt-1 text-[10px] text-cyan-50/38">{orbitGroups.length} Orbits · {totalNodes} Nodes</p>
      </div>
    </div>
  );
}

function TechnologyRadar() {
  return <OrbitScene />;
}

const AGENT_API_URL = import.meta.env.VITE_AGENT_API_URL || "/api/agent";
const AGENT_TIMEOUT_MS = 30000;

const agentModes = {
  about_wuyi: {
    label: "认识伍轶",
    placeholder: "问我：伍轶适合做什么 AI 项目？",
    starter: "用 3 句话介绍伍轶，以及适合找他合作的项目类型。",
  },
  project_diagnosis: {
    label: "项目诊断",
    placeholder: "描述你的 AI 项目想法，我来拆成 MVP 路线。",
    starter: "我想做一个 AI 自动化产品，请帮我诊断适合的 MVP 路线。",
  },
};

function AgentDiagnosis({ diagnosis }) {
  if (!diagnosis) return null;

  const sections = [
    ["技术路线", diagnosis.techRoute],
    ["主要风险", diagnosis.risks],
    ["MVP 步骤", diagnosis.mvpSteps],
  ];

  return (
    <div className="mt-3 space-y-3 rounded-2xl border border-cyan-100/10 bg-black/24 p-4">
      <div>
        <p style={fontStyles.mono} className="text-[10px] uppercase tracking-[0.26em] text-cyan-100/38">Diagnosis</p>
        <p className="mt-1 text-sm font-medium text-white/84">{diagnosis.needType || "AI 项目诊断"}</p>
      </div>
      {sections.map(([title, items]) => Array.isArray(items) && items.length ? (
        <div key={title}>
          <p className="mb-2 text-xs font-medium text-cyan-50/48">{title}</p>
          <div className="space-y-1.5">
            {items.map((item, index) => (
              <p key={`${title}-${item}`} className="rounded-xl border border-white/[0.06] bg-white/[0.035] px-3 py-2 text-xs leading-5 text-white/62">
                <span style={fontStyles.mono} className="mr-2 text-cyan-100/42">{String(index + 1).padStart(2, "0")}</span>
                {item}
              </p>
            ))}
          </div>
        </div>
      ) : null)}
      {diagnosis.collaborationAdvice ? (
        <p className="rounded-xl border border-violet-100/10 bg-violet-100/[0.045] px-3 py-2 text-xs leading-5 text-white/62">{diagnosis.collaborationAdvice}</p>
      ) : null}
    </div>
  );
}

function CyberAgentPet({ offset, onPointerDown, onOpen }) {
  const [gaze, setGaze] = useState({ x: 0, y: 0 });

  const updateGaze = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height * 0.42;
    const clamp = (value) => Math.max(-1, Math.min(1, value));
    setGaze({
      x: clamp((event.clientX - cx) / (rect.width * 0.42)),
      y: clamp((event.clientY - cy) / (rect.height * 0.34)),
    });
  };

  return (
    <motion.button
      type="button"
      onPointerDown={onPointerDown}
      onPointerMove={updateGaze}
      onPointerLeave={() => setGaze({ x: 0, y: 0 })}
      onClick={onOpen}
      style={{ x: offset.x, y: offset.y }}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.98 }}
      className="group fixed bottom-5 right-5 z-40 h-[156px] w-[238px] cursor-grab touch-none select-none active:cursor-grabbing md:bottom-7 md:right-7"
      aria-label="打开可拖拽 WuYi Agent 智能体宠物"
    >
      <span className="pointer-events-none absolute bottom-5 left-1/2 h-5 w-24 -translate-x-1/2 rounded-full bg-cyan-100/18 blur-xl transition group-hover:bg-cyan-100/30" />
      <motion.svg
        viewBox="0 0 220 236"
        aria-hidden="true"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[28px] top-0 h-[136px] w-[136px] overflow-visible drop-shadow-[0_0_28px_rgba(77,163,255,0.35)]"
      >
        <defs>
          <linearGradient id="catFur" x1="44" y1="24" x2="175" y2="214" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1f3658" />
            <stop offset="0.46" stopColor="#111f38" />
            <stop offset="1" stopColor="#081120" />
          </linearGradient>
          <linearGradient id="catEdge" x1="38" y1="40" x2="184" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4df4ff" />
            <stop offset="1" stopColor="#9b5cff" />
          </linearGradient>
          <radialGradient id="catEyeCyan" cx="50%" cy="45%" r="62%">
            <stop stopColor="#e9ffff" />
            <stop offset="0.18" stopColor="#8fffff" />
            <stop offset="0.62" stopColor="#27cfff" />
            <stop offset="1" stopColor="#07204a" />
          </radialGradient>
          <radialGradient id="catEyeViolet" cx="50%" cy="45%" r="62%">
            <stop stopColor="#fff4ff" />
            <stop offset="0.18" stopColor="#d9b5ff" />
            <stop offset="0.62" stopColor="#8c58ff" />
            <stop offset="1" stopColor="#170b43" />
          </radialGradient>
          <filter id="catGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path d="M35 97C30 55 39 13 55 8c17-6 52 22 73 49 14-3 29-3 43 0 21-27 56-55 73-49 16 5 25 47 20 89 14 15 22 34 22 56 0 57-50 91-111 91H124C63 244 13 210 13 153c0-22 8-41 22-56Z" fill="#050c19" opacity="0.7" transform="scale(.78) translate(17 4)" />
        <path d="M37 88C31 50 37 12 52 8c15-5 48 21 68 47 13-3 27-3 40 0 20-26 53-52 68-47 15 4 21 42 15 80 17 15 27 36 27 59 0 51-43 83-96 83H96c-53 0-96-32-96-83 0-23 10-44 37-59Z" fill="url(#catFur)" transform="translate(17 0) scale(.82)" />

        <path d="M60 27c12 4 39 27 56 50-18 6-34 18-47 32-8-26-12-58-9-82Z" fill="#071224" opacity="0.98" transform="translate(17 0) scale(.82)" />
        <path d="M210 27c-12 4-39 27-56 50 18 6 34 18 47 32 8-26 12-58 9-82Z" fill="#071224" opacity="0.98" transform="translate(17 0) scale(.82)" />
        <path d="M72 42c11 6 27 21 38 36-11 4-21 11-30 20-5-18-9-39-8-56Z" fill="#122144" stroke="#54f3ff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" filter="url(#catGlow)" transform="translate(17 0) scale(.82)" />
        <path d="M198 42c-11 6-27 21-38 36 11 4 21 11 30 20 5-18 9-39 8-56Z" fill="#231348" stroke="#a15cff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" filter="url(#catGlow)" transform="translate(17 0) scale(.82)" />

        <path d="M47 129c10-20 44-28 88-21 44-7 78 1 88 21 1 7-2 21-12 30-22 18-131 18-153 0-10-9-13-23-11-30Z" fill="#1b3155" stroke="url(#catEdge)" strokeWidth="3" opacity="0.88" transform="translate(17 0) scale(.82)" />
        <g transform="translate(17 0) scale(.82)">
          <ellipse cx="89" cy="144" rx="20" ry="23" fill="#06152c" opacity="0.95" />
          <ellipse cx="181" cy="144" rx="20" ry="23" fill="#06152c" opacity="0.95" />
          <motion.g animate={{ x: gaze.x * 5, y: gaze.y * 4 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
            <ellipse cx="89" cy="144" rx="13" ry="16" fill="url(#catEyeCyan)" filter="url(#catGlow)" />
            <circle cx="94" cy="137" r="4.5" fill="white" opacity="0.92" />
            <ellipse cx="181" cy="144" rx="13" ry="16" fill="url(#catEyeViolet)" filter="url(#catGlow)" />
            <circle cx="186" cy="137" r="4.5" fill="white" opacity="0.92" />
          </motion.g>
          <path d="M70 126c8-7 28-8 38-1M162 125c10-7 29-6 38 1" fill="none" stroke="#6eefff" strokeWidth="4" strokeLinecap="round" opacity="0.62" />
        </g>

        <path d="M123 166c6-5 18-5 24 0-1 7-6 12-12 12s-11-5-12-12Z" fill="#a35cff" transform="translate(17 0) scale(.82)" />
        <path d="M135 177v8m0 0c-7 12-24 13-31 1m31-1c7 12 24 13 31 1" fill="none" stroke="#a35cff" strokeWidth="4.5" strokeLinecap="round" transform="translate(17 0) scale(.82)" />

        <path d="M111 62v25m-22-19v16l12 8v18m66-42v16l-12 8v18" fill="none" stroke="#54f3ff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" filter="url(#catGlow)" transform="translate(17 0) scale(.82)" />
        <circle cx="111" cy="59" r="7" fill="#192646" stroke="#54f3ff" strokeWidth="4" transform="translate(17 0) scale(.82)" />
        <circle cx="89" cy="66" r="6" fill="#192646" stroke="#54f3ff" strokeWidth="4" transform="translate(17 0) scale(.82)" />
        <circle cx="167" cy="66" r="6" fill="#192646" stroke="#54f3ff" strokeWidth="4" transform="translate(17 0) scale(.82)" />
        <circle cx="135" cy="104" r="8" fill="#8b5cff" stroke="#54f3ff" strokeWidth="4" transform="translate(17 0) scale(.82)" />

        <path d="M74 217c8-28 31-43 61-43s53 15 61 43H74Z" fill="#0b1425" stroke="#243858" strokeWidth="3" transform="translate(17 0) scale(.82)" />
        <path d="M87 197l20 17v28M183 197l-20 17v28M106 184c7 10 51 10 58 0" fill="none" stroke="#54f3ff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" transform="translate(17 0) scale(.82)" />
        <path d="M174 206l-16 15v22" fill="none" stroke="#a15cff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.92" transform="translate(17 0) scale(.82)" />
      </motion.svg>
      <span className="pointer-events-none absolute bottom-[8px] left-[96px] -translate-x-1/2 whitespace-nowrap rounded-full border border-cyan-100/14 bg-black/46 px-3 py-1 text-[10px] font-semibold leading-none text-cyan-50/66 shadow-[0_10px_28px_rgba(0,0,0,0.30)] backdrop-blur-xl">
        <span className="tracking-[0.14em]">AI pet</span>
        <span className="ml-2 tracking-normal text-cyan-50/58">点我一起唠唠嗑。</span>
      </span>
    </motion.button>
  );
}

function WuYiAgent() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("about_wuyi");
  const [draft, setDraft] = useState("");
  const [petOffset, setPetOffset] = useState({ x: 0, y: 0 });
  const petDraggedRef = useRef(false);
  const petDragStateRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: "boot",
      role: "assistant",
      content: "我是 WuYi Agent。可以快速介绍伍轶，也可以把你的 AI 项目想法拆成可执行的 MVP 路线。",
      diagnosis: null,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const frameId = window.requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [messages, loading, open]);

  const appendAssistant = (content, diagnosis = null, tone = "normal") => {
    setMessages((current) => [
      ...current,
      {
        id: `assistant-${Date.now()}-${Math.random()}`,
        role: "assistant",
        content,
        diagnosis,
        tone,
      },
    ]);
  };

  const sendMessage = async (overrideText) => {
    const text = String(overrideText || draft).trim();
    if (!text || loading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      diagnosis: null,
    };
    const nextMessages = [...messages, userMessage];
    const history = nextMessages
      .filter((item) => item.role === "user" || item.role === "assistant")
      .slice(-8)
      .map((item) => ({ role: item.role, content: item.content }));

    setMessages(nextMessages);
    setDraft("");
    setLoading(true);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), AGENT_TIMEOUT_MS);

    try {
      const response = await fetch(AGENT_API_URL, {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent: mode, message: text, history }),
      });

      window.clearTimeout(timeoutId);
      const payload = await response.json().catch(() => null);

      if (payload?.reply || payload?.diagnosis) {
        appendAssistant(
          payload.reply || "信号已返回，但模型没有给出文字回复。",
          payload.diagnosis || null,
          response.ok ? "normal" : "warning",
        );
        return;
      }

      setDraft((current) => current || text);
      appendAssistant("WuYi Agent 收到了异常响应。输入内容已经保留，可以稍后重试，或直接通过页面底部联系伍轶。", null, "warning");
    } catch (error) {
      window.clearTimeout(timeoutId);
      setDraft((current) => current || text);
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
    const minY = typeof window === "undefined" ? -620 : -(window.innerHeight - 168);
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    return {
      x: clamp(offset.x, minX, 18),
      y: clamp(offset.y, minY, 18),
    };
  };

  const handlePetPointerDown = (event) => {
    if (event.button !== 0) return;
    petDraggedRef.current = false;
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
      window.removeEventListener("pointermove", movePet);
      window.removeEventListener("pointerup", releasePet);
      window.removeEventListener("pointercancel", releasePet);
      petDragStateRef.current = null;
      window.setTimeout(() => {
        petDraggedRef.current = false;
      }, 90);
    };

    window.addEventListener("pointermove", movePet);
    window.addEventListener("pointerup", releasePet);
    window.addEventListener("pointercancel", releasePet);
  };

  const activeMode = agentModes[mode];

  return (
    <>
      {!open ? (
        <CyberAgentPet offset={petOffset} onPointerDown={handlePetPointerDown} onOpen={openFromPet} />
      ) : null}

      {open ? <div className="fixed inset-0 bg-black/44 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)} /> : null}

      {open ? (
        <div className="fixed inset-x-0 bottom-0 z-40 md:inset-auto md:bottom-6 md:right-6">
          <motion.aside
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative ml-auto flex max-h-[86vh] w-full flex-col overflow-hidden rounded-t-[1.75rem] border border-cyan-100/14 bg-[#030814]/94 shadow-[0_-24px_90px_rgba(77,163,255,0.22)] backdrop-blur-2xl md:mr-0 md:max-h-[calc(100vh-3rem)] md:w-[420px] md:rounded-[1.55rem] md:shadow-[0_28px_120px_rgba(77,163,255,0.22)]"
            aria-label="WuYi Agent"
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
                <p style={fontStyles.mono} className="text-[10px] uppercase tracking-[0.34em] text-cyan-100/42">WuYi Agent</p>
                <h2 className="mt-1 text-lg font-medium text-white">AI 项目接口已接入</h2>
                  <p className="mt-1 text-xs leading-5 text-white/38">AI PET 在线，免费模型通道可能限流，异常时会自动降级。</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-white/54 transition hover:border-cyan-100/22 hover:text-white" aria-label="关闭 WuYi Agent">
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 rounded-full border border-white/[0.07] bg-black/22 p-1">
              {Object.entries(agentModes).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  className={`rounded-full px-3 py-2 text-xs font-medium transition ${mode === key ? "bg-cyan-100/14 text-cyan-50 shadow-[0_0_24px_rgba(125,249,255,0.12)]" : "text-white/42 hover:text-white/72"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div ref={scrollRef} className="relative flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] rounded-2xl border px-4 py-3 text-sm leading-6 ${message.role === "user" ? "border-cyan-100/16 bg-cyan-100/[0.08] text-cyan-50" : message.tone === "warning" ? "border-amber-100/16 bg-amber-100/[0.06] text-white/72" : "border-white/[0.07] bg-white/[0.04] text-white/68"}`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <AgentDiagnosis diagnosis={message.diagnosis} />
                </div>
              </div>
            ))}
            {loading ? (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-cyan-100/10 bg-white/[0.04] px-4 py-3">
                  <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.24em] text-cyan-100/46">信号传输中</p>
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
            <button type="button" onClick={() => sendMessage(activeMode.starter)} disabled={loading} className="mb-3 w-full rounded-2xl border border-cyan-100/10 bg-cyan-100/[0.045] px-4 py-2 text-left text-xs leading-5 text-cyan-50/58 transition hover:border-cyan-100/20 hover:text-cyan-50 disabled:cursor-not-allowed disabled:opacity-50">
              {activeMode.starter}
            </button>
            <div className="flex items-end gap-2">
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={activeMode.placeholder}
                rows={2}
                className="min-h-[48px] flex-1 resize-none rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/28 focus:border-cyan-100/24 focus:bg-white/[0.065]"
              />
              <button type="submit" disabled={loading || !draft.trim()} className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-cyan-100/18 bg-cyan-100/[0.10] text-cyan-50 transition hover:border-cyan-100/32 hover:bg-cyan-100/[0.16] disabled:cursor-not-allowed disabled:opacity-40" aria-label="发送给 WuYi Agent">
                <Icon name="send" className="h-4 w-4" />
              </button>
            </div>
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
      <motion.div initial={false} animate={active ? { scale: [0.92, 1, 1.02], opacity: [0, 1, 1] } : { scale: 0.98, opacity: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className="relative w-[min(92vw,520px)] overflow-hidden rounded-[2.2rem] border border-cyan-100/16 bg-[#050b18]/80 px-9 py-8 text-center shadow-[0_0_140px_rgba(77,163,255,0.30)] backdrop-blur-2xl">
        <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.34em] text-cyan-100/52">AI System Launch</p>
        <p className="mt-3 text-xl font-medium text-white">Opening GitHub Repository</p>
        <p className="mt-2 text-sm text-white/42">Connecting to hoanacantincus-cmd</p>
        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div animate={active ? { width: ["0%", "100%"] } : { width: "0%" }} transition={{ duration: 0.72, ease: "easeInOut" }} className="h-full rounded-full bg-gradient-to-r from-cyan-200 via-white to-violet-200" /></div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [githubBooting, setGithubBooting] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -40]);
  const coreY = useTransform(scrollY, [0, 600], [0, 38]);

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

  return (
    <main style={fontStyles.ui} className="min-h-screen overflow-hidden bg-[#03040a] text-white">
      <GithubLaunchOverlay active={githubBooting} />
      <WuYiAgent />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(74,117,255,0.18),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(137,83,255,0.16),transparent_34%),linear-gradient(180deg,#060711,#020207)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.28)_1px,transparent_1px)] [background-size:56px_56px]" />

      <header className="relative z-20 mx-auto flex max-w-[1540px] items-center justify-between px-6 py-7 md:px-10">
        <a href="#hero" className="inline-flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.05]"><Icon name="core" /></span><span className="text-base font-medium text-white/50 transition hover:text-white">{profile.logoText}</span></a>
        <nav className="hidden items-center gap-7 text-base text-white/50 md:flex"><a href="#capability" onClick={scrollToSection("#capability")} className="hover:text-white">能力</a><a href="#story" onClick={scrollToSection("#story")} className="hover:text-white">方法</a><a href="#systems" onClick={scrollToSection("#systems")} className="hover:text-white">系统</a><a href="#contact" onClick={scrollToSection("#contact")} className="hover:text-white">联系</a></nav>
      </header>

      <section id="hero" className="relative z-10 mx-auto grid min-h-[calc(100vh-92px)] max-w-[1540px] items-center gap-8 px-5 pb-20 pt-6 sm:px-6 md:gap-12 md:px-10 md:pb-24 md:pt-8 lg:grid-cols-[0.72fr_1.28fr]">
        <motion.div style={{ y: heroY }} className="relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 34, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.08, duration: 1.05 }} className="max-w-3xl">
            <span className="relative block bg-gradient-to-b from-white via-cyan-50/90 to-white/34 bg-clip-text text-[3.2rem] font-semibold leading-[0.96] tracking-[-0.065em] text-transparent md:text-[5.2rem] lg:text-[6.4rem]">{profile.heroTitle}</span>
            {profile.heroTitleSecond ? <span className="relative mt-2 block bg-gradient-to-b from-white via-cyan-50/86 to-white/32 bg-clip-text text-[3.2rem] font-semibold leading-[0.96] tracking-[-0.065em] text-transparent md:text-[5.2rem] lg:text-[6.4rem]">{profile.heroTitleSecond}</span> : null}
            <span className="mt-6 block max-w-2xl text-[1.12rem] font-medium leading-8 tracking-[-0.01em] text-cyan-50/74 md:text-[1.45rem]">{profile.heroSubtitle}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.85 }} className="mt-7 max-w-xl text-[0.98rem] leading-8 text-white/50 md:text-[1.05rem]">{profile.line}</motion.p>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.85 }} className="mt-8 grid max-w-lg grid-cols-3 gap-3 border-y border-white/[0.07] py-5">{[["01", "构想"], ["02", "构建"], ["03", "进化"]].map(([no, label]) => <div key={label}><p style={fontStyles.mono} className="text-[11px] tracking-[0.22em] text-cyan-100/36">{no}</p><p className="mt-1 text-sm font-medium text-white/78">{label}</p></div>)}</motion.div>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.85 }} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><CTAButton href={profile.github} icon="github" onClick={launchGithub}>查看 GitHub</CTAButton><CTAButton href="#capability" variant="ghost" onClick={scrollToSection("#capability")}>探索我的系统</CTAButton><CTAButton href="#contact" variant="ghost" icon="mail" onClick={scrollToSection("#contact")}>联系我</CTAButton></motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.62, duration: 0.9 }} className="mt-8 flex items-center gap-3 text-[12px] text-white/34" style={fontStyles.mono}><span className="h-px w-10 bg-gradient-to-r from-cyan-100/0 via-cyan-100/35 to-cyan-100/0" />WUYi WITH AI / CODE FLOW / IMAGINATION SYSTEM</motion.div>
        </motion.div>
        <motion.div style={{ y: coreY }} className="relative mx-auto w-full max-w-[760px] lg:max-w-none"><div className="absolute -inset-6 bg-[radial-gradient(circle_at_50%_48%,rgba(77,163,255,0.16),transparent_56%)] blur-2xl md:-inset-10" /><AICoreScene booting={githubBooting} /></motion.div>
      </section>

      <section id="capability" className="relative z-10 overflow-hidden border-y border-white/[0.06] bg-[#05060c] px-6 py-28 md:px-10 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(125,249,255,0.075),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(148,118,255,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_28%,rgba(255,255,255,0.015))]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,.26)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.75 }} className="relative mx-auto mb-14 max-w-4xl text-center">
            <h2 className="mx-auto bg-gradient-to-b from-white via-slate-100/90 to-white/42 bg-clip-text text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.055em] text-transparent md:text-[4.2rem]">Capability Matrix</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-cyan-50/42 md:text-base">我的 AI 系统能力栈</p>
            <p className="mx-auto mt-2 max-w-3xl text-sm leading-7 text-white/34 md:text-base">把开发、自动化、Agent、设计、数据与产品化能力组合成可运行的系统矩阵。</p>
          </motion.div>
          <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3">{capabilityItems.map((item, index) => <CapabilityChip key={item.title} item={item} index={index} />)}</div>
        </div>
      </section>

      <section id="story" className="relative z-10 overflow-hidden border-y border-white/[0.06] bg-[#03040a] px-6 py-28 text-white md:px-10 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(125,249,255,0.08),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(148,118,255,0.13),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_32%,rgba(255,255,255,0.012))]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,.26)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:58px_58px]" />
        <div className="pointer-events-none absolute left-1/2 top-[54%] hidden h-px w-[76vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-100/22 to-transparent lg:block" />
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mb-16 max-w-4xl text-center md:mb-20"
          >
            <h2 className="mx-auto bg-gradient-to-b from-white via-slate-100/90 to-white/42 bg-clip-text text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.055em] text-transparent md:text-[4.2rem]">
              How I Build With AI
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-cyan-50/42 md:text-base">
              从混乱问题，到可执行系统。
            </p>
            <p className="mx-auto mt-2 max-w-3xl text-sm leading-7 text-white/34 md:text-base">
              把问题拆成结构，把结构接入智能，再把智能落成可运行的产品流程。
            </p>
          </motion.div>

          <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-100/20 to-transparent lg:hidden" />
            {storyFrames.map((frame, index) => (
              <div key={frame.no} className="relative pl-8 lg:pl-0">
                <span className="absolute left-[18px] top-10 z-20 h-3 w-3 rounded-full border border-cyan-100/35 bg-cyan-100/70 shadow-[0_0_18px_rgba(125,249,255,0.65)] lg:left-1/2 lg:top-[-18px] lg:-translate-x-1/2" />
                {index < storyFrames.length - 1 ? <span className="absolute left-1/2 top-[-13px] hidden h-px w-full bg-gradient-to-r from-cyan-100/22 to-transparent lg:block" /> : null}
                <StoryFrame frame={frame} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="systems" className="relative z-10 overflow-hidden border-y border-white/[0.06] bg-[#03040a] px-6 py-28 text-white md:px-10 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(160,232,255,0.09),transparent_30%),radial-gradient(circle_at_18%_22%,rgba(74,117,255,0.12),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(148,118,255,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_30%,rgba(255,255,255,0.012))]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,.26)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:58px_58px]" />
        <div className="pointer-events-none absolute left-1/2 top-[58%] hidden h-px w-[72vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-100/22 to-transparent lg:block" />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-[58%] hidden h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(160,232,255,0.86)] lg:block"
          animate={{ x: ["-36vw", "36vw", "-36vw"], opacity: [0, 1, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mb-16 max-w-4xl text-center md:mb-20"
          >
            <h2 className="mx-auto bg-gradient-to-b from-white via-slate-100/90 to-white/42 bg-clip-text text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.055em] text-transparent md:text-[4.2rem]">
              Selected Systems
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-cyan-50/42 md:text-base">
              正在形成的 AI 系统模块
            </p>
            <p className="mx-auto mt-2 max-w-3xl text-sm leading-7 text-white/34 md:text-base">
              自动化、产品界面与数据智能，是我把 AI 变成真实系统的三个核心落点。
            </p>
          </motion.div>
          <div className="relative grid gap-6 lg:grid-cols-3">
            {systems.map((item, index) => <SystemCard key={item.title} item={item} index={index} />)}
          </div>
        </div>
      </section>

      <section id="radar" className="relative z-10 overflow-hidden bg-[#02030A] px-6 py-28 text-white md:px-10 md:py-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#03040a] via-[#040713]/85 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#03040a] via-[#070818]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(125,249,255,0.08),transparent_26%),radial-gradient(circle_at_18%_20%,rgba(77,163,255,0.10),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(148,118,255,0.14),transparent_30%),linear-gradient(180deg,#02030A_0%,#040712_48%,#0A0616_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.018] [background-image:linear-gradient(to_right,rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_28%,rgba(255,255,255,0.40)_0_1px,transparent_1.7px),radial-gradient(circle_at_78%_34%,rgba(190,220,255,0.38)_0_1px,transparent_1.7px),radial-gradient(circle_at_52%_78%,rgba(255,255,255,0.24)_0_1px,transparent_1.6px)] [background-size:88px_88px,132px_132px,176px_176px] opacity-[0.18]" />
        <div className="pointer-events-none absolute -left-[20%] top-[24%] h-72 w-[72%] -rotate-12 rounded-full bg-[radial-gradient(ellipse,rgba(125,249,255,0.07),transparent_72%)] blur-3xl" />
        <div className="pointer-events-none absolute right-[-18%] bottom-[18%] h-72 w-[72%] rotate-12 rounded-full bg-[radial-gradient(ellipse,rgba(148,118,255,0.10),transparent_72%)] blur-3xl" />

        <div className="relative mx-auto max-w-[1500px]">
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
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-cyan-50/42 md:text-base">
              围绕 AI Core 运行的技术星图。
            </p>
            <p className="mx-auto mt-2 max-w-3xl text-sm leading-7 text-white/34 md:text-base">
              从基础模型、智能体、RAG、训练优化、强化学习到应用工程，每一条轨道都服务于真实 AI 产品的构建。
            </p>
          </motion.div>

          <div
            className="relative z-10 mx-auto mt-10 h-[330px] max-w-full overflow-hidden sm:h-[390px] md:mt-16 md:h-[560px] lg:mt-20 lg:h-auto lg:overflow-visible"
            style={{
              WebkitMaskImage: "linear-gradient(90deg, #000 0%, #000 86%, transparent 100%)",
              maskImage: "linear-gradient(90deg, #000 0%, #000 86%, transparent 100%)",
            }}
          >
            <div className="absolute left-1/2 top-1/2 w-[920px] -translate-x-1/2 -translate-y-1/2 scale-[0.42] sm:scale-[0.5] md:scale-[0.78] lg:static lg:w-full lg:translate-x-0 lg:translate-y-0 lg:scale-100">
              <TechnologyRadar />
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="relative z-10 overflow-hidden px-6 py-32 text-white md:px-10 md:py-44">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(125,249,255,0.11),transparent_34%),radial-gradient(circle_at_82%_30%,rgba(148,118,255,0.13),transparent_38%),radial-gradient(circle_at_18%_68%,rgba(77,163,255,0.08),transparent_34%),linear-gradient(180deg,#02030A_0%,#040713_44%,#020207_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#02030A] via-[#071022]/70 to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.022] [background-image:linear-gradient(to_right,rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(255,255,255,0.34)_0_1px,transparent_1.6px),radial-gradient(circle_at_78%_36%,rgba(190,220,255,0.30)_0_1px,transparent_1.6px),radial-gradient(circle_at_52%_78%,rgba(255,255,255,0.22)_0_1px,transparent_1.6px)] [background-size:96px_96px,148px_148px,196px_196px] opacity-[0.14]" />
        <div className="pointer-events-none absolute left-1/2 top-[24%] h-px w-[78vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-100/22 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 bottom-[18%] h-64 w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(125,249,255,0.08),rgba(148,118,255,0.06)_38%,transparent_72%)] blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-6xl text-center"
        >
          <p style={fontStyles.mono} className="mb-7 text-[11px] uppercase tracking-[0.42em] text-cyan-50/36">WuYi with AI</p>
          <h2 className="mx-auto max-w-none whitespace-nowrap bg-gradient-to-b from-white via-slate-100/88 to-white/38 bg-clip-text text-[clamp(1.55rem,4.7vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.065em] text-transparent">
            当想象力接入智能，现实开始重构。
          </h2>

          <div className="mx-auto mt-12 h-px max-w-xl bg-gradient-to-r from-transparent via-cyan-100/26 to-transparent" />

          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <p style={fontStyles.serif} className="text-[2.7rem] font-light tracking-[0.18em] text-white/92 md:text-[4.2rem]">伍轶</p>
            <p className="text-sm font-medium tracking-[0.42em] text-cyan-50/38">{profile.location}</p>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl gap-3 text-sm text-white/58 md:grid-cols-3">
            <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-full border border-cyan-100/10 bg-white/[0.035] px-5 py-3 backdrop-blur-xl transition hover:border-cyan-100/24 hover:bg-white/[0.075] hover:text-white">
              GitHub：{profile.githubName}
            </a>
            <a href={`mailto:${profile.email}`} className="rounded-full border border-cyan-100/10 bg-white/[0.035] px-5 py-3 backdrop-blur-xl transition hover:border-cyan-100/24 hover:bg-white/[0.075] hover:text-white">
              邮箱：{profile.email}
            </a>
            <a href={`tel:${profile.phone}`} className="rounded-full border border-cyan-100/10 bg-white/[0.035] px-5 py-3 backdrop-blur-xl transition hover:border-cyan-100/24 hover:bg-white/[0.075] hover:text-white">
              电话：{profile.phone}
            </a>
          </div>
        </motion.div>
      </footer>
    </main>
  );
}
