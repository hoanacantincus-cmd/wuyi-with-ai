import React, { useState } from "react";
import { motion } from "framer-motion";
import { aiCodingBasicsTopics, getAiCodingTopic } from "./aiCodingBasicsData";

function FloatingField({ topic }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        className={`absolute -right-24 top-16 h-[22rem] w-[22rem] rounded-full border border-white/[0.06] bg-gradient-to-br ${topic.tint} opacity-[0.075] blur-md`}
      />
      <motion.div
        animate={{ y: [-18, 18, -18], x: [0, 18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-[18%] h-2 w-2 rounded-full bg-cyan-100/[0.65] shadow-[0_0_18px_rgba(125,249,255,0.45)]"
      />
      <motion.div
        animate={{ y: [12, -20, 12], x: [0, -24, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[16%] right-[18%] h-3 w-3 rounded-full bg-white/[0.45] shadow-[0_0_20px_rgba(255,255,255,0.38)]"
      />
    </div>
  );
}

function TopicOverviewCard({ topic, index, fontStyles }) {
  return (
    <motion.a
      href={`/ai-coding-basics/${topic.id}`}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
      className="group relative min-h-[300px] overflow-hidden rounded-[2.1rem] border border-white/[0.09] bg-white/[0.05] p-5 shadow-[0_26px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-100/25 hover:bg-white/[0.075]"
    >
      <FloatingField topic={topic} />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <span style={fontStyles.mono} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-50/58">Solo Page</span>
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black/20 text-sm font-semibold text-white/62">{topic.no}</span>
        </div>
        <p className={`mt-10 bg-gradient-to-r ${topic.tint} bg-clip-text text-[2.45rem] font-black leading-none tracking-[-0.08em] text-transparent md:text-[3rem]`}>
          {topic.art}
        </p>
        <h2 className="mt-5 text-2xl font-semibold tracking-[-0.045em] text-white">{topic.title}</h2>
        <p className="mt-4 text-sm leading-7 text-white/56">{topic.hook}</p>
        <span className="mt-auto pt-8 text-sm font-semibold text-cyan-50/70 transition group-hover:text-white">进入实用页</span>
      </div>
    </motion.a>
  );
}

function CopyPromptCard({ prompt, index, fontStyles }) {
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard?.writeText(prompt.body);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="relative overflow-hidden rounded-[1.25rem] border border-cyan-100/[0.12] bg-black/36 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-md"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p style={fontStyles.mono} className="text-[10px] uppercase tracking-[0.2em] text-cyan-100/42">Copy Prompt {String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-white">{prompt.title}</h3>
          {prompt.desc ? <p className="mt-2 text-sm leading-6 text-white/52">{prompt.desc}</p> : null}
        </div>
        <button
          type="button"
          onClick={copyPrompt}
          className="shrink-0 rounded-full border border-cyan-100/18 bg-cyan-100/[0.08] px-4 py-2 text-sm font-semibold text-cyan-50/78 transition hover:border-cyan-100/34 hover:bg-cyan-100/[0.14] hover:text-white"
        >
          {copied ? "已复制" : "复制提示词"}
        </button>
      </div>
      <pre className="mt-4 max-h-[320px] overflow-auto whitespace-pre-wrap rounded-xl border border-white/[0.08] bg-black/44 p-4 text-sm leading-7 text-cyan-50/72">
        {prompt.body}
      </pre>
    </motion.article>
  );
}

function QuestionPrinciplesPanel({ items, fontStyles }) {
  if (!items?.length) return null;

  return (
    <div className="mt-6">
      <p style={fontStyles.mono} className="mb-4 text-[11px] uppercase tracking-[0.2em] text-cyan-100/42">Question Principles</p>
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="relative overflow-hidden rounded-[1.25rem] border border-white/[0.09] bg-white/[0.04] p-5 shadow-[0_18px_64px_rgba(0,0,0,0.18)] backdrop-blur-md"
          >
            <div className="absolute -right-14 -top-16 h-40 w-40 rounded-full bg-cyan-100/[0.07] blur-2xl" />
            <div className="relative">
              <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.18em] text-cyan-100/40">Principle {String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/62">{item.body}</p>
              {item.tip ? <p className="mt-4 rounded-xl border border-cyan-100/12 bg-cyan-100/[0.055] p-3 text-sm font-semibold leading-6 text-cyan-50/72">{item.tip}</p> : null}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function ToolRankingPanel({ items, fontStyles }) {
  if (!items?.length) return null;
  const impactCards = [
    {
      label: "效率",
      value: "+14%",
      body: "NBER 对 5,172 名客服坐席的真实部署研究显示，AI 助手让每小时解决问题数平均提升。",
      source: "NBER · Generative AI at Work",
    },
    {
      label: "产出",
      value: "+66%",
      body: "NN/g 汇总客服、商业写作、编程三类实验后认为，生成式 AI 对真实业务任务的平均吞吐提升明显。",
      source: "Nielsen Norman Group",
    },
    {
      label: "学习",
      value: "2个月",
      body: "同一客服研究里，新员工使用 AI 两个月后的表现，接近未使用 AI 员工六个月以上经验水平。",
      source: "Stanford / MIT / NBER",
    },
    {
      label: "范围",
      value: "60-70%",
      body: "McKinsey 估算，当前生成式 AI 与相关技术有潜力自动化员工大量日常工作活动。",
      source: "McKinsey Global Institute",
    },
  ];

  return (
    <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/55 bg-[linear-gradient(135deg,#f7fdff_0%,#dff4f6_42%,#eef0ff_72%,#fff8e7_100%)] p-4 text-slate-950 shadow-[0_30px_110px_rgba(19,58,72,0.28)] md:p-6">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(15,23,42,.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,.045)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-200/55 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-12 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl" />

      <div className="relative grid gap-6 border-b border-slate-950/[0.08] pb-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div>
          <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.2em] text-slate-500">China AI Tools · May 2026 Update</p>
          <h3 className="mt-3 text-[2.45rem] font-semibold leading-none text-slate-950 md:text-[4.1rem]">AI工具</h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700">
            先看 AI 工具能给工作和生活带来的效率、质量、学习曲线收益，再按下面榜单选择国内工具。榜单口径来自 AICPB 2026-05-09 发布的中国 AI 月榜和各垂类榜单，底层统计为 2026 年 4 月网站访问量 / App MAU。
          </p>
        </div>

        <div className="relative overflow-hidden border border-slate-950/[0.08] bg-white/62 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl">
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-200/55 blur-3xl" />
          <div className="relative flex items-center justify-between gap-4 border-b border-slate-950/[0.08] pb-3">
            <p style={fontStyles.mono} className="text-[11px] uppercase text-slate-500">AI tools impact</p>
            <span className="text-sm font-semibold text-slate-600">work & life</span>
          </div>
          <div className="relative mt-4 grid gap-2 sm:grid-cols-2">
            {impactCards.map((card) => (
              <div key={card.label} className="min-h-[132px] border border-slate-950/[0.07] bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(236,249,255,0.54))] p-3 shadow-[0_12px_34px_rgba(15,23,42,0.07)]">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-600">{card.label}</span>
                  <span className="bg-slate-950 px-2.5 py-1 text-sm font-semibold text-cyan-50">{card.value}</span>
                </div>
                <p className="mt-3 text-[13px] leading-6 text-slate-700">{card.body}</p>
                <p style={fontStyles.mono} className="mt-3 text-[9px] uppercase tracking-[0.14em] text-slate-400">{card.source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-5 grid gap-3">
        {items.map((item, index) => (
          <motion.a
            key={`${item.category}-${item.name}`}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.035, duration: 0.45 }}
            className="group relative overflow-hidden border border-slate-950/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(255,255,255,0.48))] p-4 text-slate-950 shadow-[0_16px_54px_rgba(15,23,42,0.10)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-500/28 hover:bg-white/82 hover:shadow-[0_24px_74px_rgba(18,126,151,0.16)] md:grid md:grid-cols-[86px_0.75fr_1.25fr_0.92fr] md:items-center md:gap-4"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-400 via-violet-300 to-amber-200 opacity-70" />
            <div className="pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full bg-cyan-100/60 blur-3xl transition group-hover:bg-cyan-200/80" />

            <div className="flex items-center justify-between gap-4 md:block">
              <div className="relative grid h-14 w-14 shrink-0 place-items-center bg-slate-950 text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                <span style={fontStyles.mono} className="text-xl font-semibold">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <p className="max-w-[11rem] text-right text-xs font-semibold leading-5 text-slate-500 md:mt-3 md:text-left">{item.category}</p>
            </div>

            <div className="mt-4 md:mt-0">
              <p className="text-xl font-semibold leading-tight text-slate-950 md:text-2xl">{item.name}</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">{item.company}</p>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-700 md:mt-0">{item.reason}</p>

            <div className="mt-4 border border-slate-950/[0.08] bg-slate-950/[0.035] p-3 md:mt-0">
              <p style={fontStyles.mono} className="text-[10px] uppercase text-slate-500">ranking signal</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{item.signal}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

function InstallGuidePanel({ guide, fontStyles }) {
  if (!guide?.steps?.length) return null;
  const [copiedAgentPrompt, setCopiedAgentPrompt] = useState(false);

  const copyAgentPrompt = async () => {
    try {
      await navigator.clipboard?.writeText(guide.agentPrompt.body);
      setCopiedAgentPrompt(true);
      window.setTimeout(() => setCopiedAgentPrompt(false), 1800);
    } catch {
      setCopiedAgentPrompt(false);
    }
  };

  return (
    <div className="mt-6 grid gap-4">
      {guide.agentPrompt ? (
        <div className="relative overflow-hidden rounded-[1.35rem] border border-white/50 bg-[linear-gradient(135deg,#f7fdff_0%,#dff6f7_48%,#fff4da_100%)] p-5 text-slate-950 shadow-[0_24px_86px_rgba(18,76,92,0.20)] md:p-6">
          <div className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-cyan-200/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-8 h-48 w-48 rounded-full bg-amber-100/70 blur-3xl" />
          <div className="relative grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{guide.agentPrompt.label}</p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-slate-950">{guide.agentPrompt.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-700">{guide.agentPrompt.desc}</p>
              <button
                type="button"
                onClick={copyAgentPrompt}
                className="mt-5 rounded-full border border-slate-950/[0.10] bg-slate-950 px-4 py-2 text-sm font-semibold text-cyan-50 shadow-[0_12px_34px_rgba(15,23,42,0.18)] transition hover:bg-slate-800"
              >
                {copiedAgentPrompt ? "已复制提示词" : "复制给智能体"}
              </button>
            </div>
            <pre className="max-h-[360px] overflow-auto rounded-2xl border border-slate-950/[0.08] bg-white/72 p-4 text-sm leading-7 text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"><code>{guide.agentPrompt.body}</code></pre>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[1.25rem] border border-cyan-100/14 bg-[linear-gradient(180deg,rgba(232,247,255,0.96),rgba(218,234,242,0.88))] p-6 text-slate-950 shadow-[0_18px_64px_rgba(0,0,0,0.20)]">
        <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{guide.label}</p>
        <h3 className="mt-3 text-2xl font-semibold leading-tight text-slate-950">{guide.title}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-700">{guide.desc}</p>
        <div className="mt-5 grid gap-3">
          {guide.checks.map((item, index) => (
            <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-900/[0.08] bg-white/70 px-4 py-3 text-sm text-slate-700">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-950 text-xs font-semibold text-cyan-50">{index + 1}</span>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[1.25rem] border border-white/[0.09] bg-white/[0.04] p-5 shadow-[0_18px_64px_rgba(0,0,0,0.18)] backdrop-blur-md">
        <div className="grid gap-4">
          {guide.steps.map((step, index) => (
            <article key={step.title} className="rounded-xl border border-white/[0.08] bg-black/26 p-4">
              <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.18em] text-cyan-100/38">Step {String(index + 1).padStart(2, "0")}</p>
              <h4 className="mt-2 text-lg font-semibold text-white">{step.title}</h4>
              <p className="mt-2 text-sm leading-7 text-white/62">{step.body}</p>
              {step.command ? <pre className="mt-3 overflow-auto rounded-lg border border-white/[0.08] bg-black/54 p-3 text-sm leading-7 text-cyan-50/78"><code>{step.command}</code></pre> : null}
            </article>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

function MonetizationColumnsPanel({ columns, fontStyles }) {
  if (!columns?.companies?.length || !columns?.methods?.length) return null;

  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      <section className="relative overflow-hidden rounded-[1.35rem] border border-cyan-100/18 bg-[linear-gradient(135deg,#f8fdff_0%,#e5f7fb_44%,#fff5dc_100%)] p-5 text-slate-950 shadow-[0_24px_88px_rgba(0,0,0,0.22)] md:p-6">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-200/55 blur-3xl" />
        <div className="relative">
          <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Revenue Signals</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight text-slate-950">{columns.leftTitle}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{columns.leftNote}</p>
          <div className="mt-5 grid gap-3">
            {columns.companies.map((company, index) => (
              <a
                key={`${company.name}-${company.metric}`}
                href={company.href}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-3 rounded-2xl border border-slate-950/[0.08] bg-white/72 p-4 shadow-[0_14px_44px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-white md:grid-cols-[3.3rem_1fr]"
              >
                <span style={fontStyles.mono} className="grid h-12 w-12 place-items-center rounded-full bg-slate-950 text-sm font-semibold text-cyan-50">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-semibold text-slate-950">{company.name}</span>
                    <span className="rounded-full border border-slate-950/[0.08] bg-slate-950/[0.04] px-2.5 py-1 text-xs font-semibold text-slate-600">{company.region}</span>
                  </span>
                  <span className="mt-2 block text-sm font-semibold leading-6 text-cyan-700">{company.metric}</span>
                  <span className="mt-2 block text-sm leading-6 text-slate-700">{company.model}</span>
                  <span style={fontStyles.mono} className="mt-3 block text-[10px] uppercase tracking-[0.14em] text-slate-400">{company.signal}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[1.35rem] border border-white/[0.09] bg-white/[0.045] p-5 shadow-[0_20px_76px_rgba(0,0,0,0.20)] backdrop-blur-md md:p-6">
        <div className="pointer-events-none absolute -left-14 -top-16 h-48 w-48 rounded-full bg-amber-100/[0.09] blur-3xl" />
        <div className="relative">
          <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.2em] text-cyan-100/42">China Playbooks</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">{columns.rightTitle}</h3>
          <p className="mt-3 text-sm leading-7 text-white/58">{columns.rightNote}</p>
          <div className="mt-5 grid gap-3">
            {columns.methods.map((method, index) => (
              <article key={method.title} className="rounded-2xl border border-white/[0.08] bg-black/24 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.18em] text-cyan-100/38">Method {String(index + 1).padStart(2, "0")}</p>
                    <h4 className="mt-2 text-lg font-semibold text-white">{method.title}</h4>
                  </div>
                  <span className="shrink-0 rounded-full border border-cyan-100/12 bg-cyan-100/[0.07] px-3 py-1 text-xs font-semibold text-cyan-50/72">{method.price}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/62">{method.fit}</p>
                <p className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.04] p-3 text-sm font-semibold leading-6 text-cyan-50/76">{method.action}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TopicDetailPage({ topic, fontStyles }) {
  const siblings = aiCodingBasicsTopics.filter((item) => item.id !== topic.id);
  const isSoftTopic = topic.id === "concept-aesthetics";

  return (
    <main
      style={{
        ...fontStyles.ui,
        ...(isSoftTopic
          ? {
              backgroundImage: "linear-gradient(135deg,#f4fbff 0%,#e8edff 50%,#fff0f6 100%)",
              backgroundColor: "#f8fafc",
            }
          : {}),
      }}
      className={`design-learning-page min-h-screen overflow-x-clip ${isSoftTopic ? "bg-slate-50 text-slate-950" : "bg-[#030506] text-white"}`}
    >
      {isSoftTopic ? (
        <>
          <div className="fixed inset-0 -z-10 bg-[linear-gradient(135deg,#f4fbff_0%,#e8edff_50%,#fff0f6_100%)]" />
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.72),transparent_30%),radial-gradient(circle_at_84%_14%,rgba(255,255,255,0.54),transparent_32%)]" />
          <div className="fixed inset-0 -z-10 opacity-[0.48] [background-image:linear-gradient(to_right,rgba(15,23,42,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,.04)_1px,transparent_1px)] [background-size:54px_54px]" />
        </>
      ) : (
        <>
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_16%_10%,rgba(125,249,255,0.045),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(255,255,255,0.026),transparent_30%),linear-gradient(180deg,#05070a,#071016_42%,#020304)]" />
          <div className="fixed inset-0 -z-10 opacity-[0.018] [background-image:linear-gradient(to_right,rgba(255,255,255,.32)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:72px_72px]" />
        </>
      )}

      <header className="relative z-10 mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-7 md:px-10">
        <a href="/" className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${isSoftTopic ? "border-slate-950/[0.10] bg-white/62 text-slate-700 hover:text-slate-950" : "border-white/10 bg-white/[0.045] text-white/64 hover:text-white"}`}>返回首页</a>
        <a href="/ai-coding-basics" style={fontStyles.mono} className={`text-[11px] uppercase tracking-[0.22em] transition ${isSoftTopic ? "text-slate-500 hover:text-slate-950" : "text-cyan-100/45 hover:text-cyan-50"}`}>AI Coding Basics</a>
      </header>

      <section className="relative mx-auto grid min-h-[62vh] max-w-[1500px] items-center gap-8 px-5 pb-12 pt-8 md:px-10 lg:grid-cols-[0.95fr_1.05fr]">
        <FloatingField topic={topic} />
        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72 }} className="relative z-10">
          <p style={fontStyles.mono} className={`mb-5 text-[11px] uppercase tracking-[0.28em] ${isSoftTopic ? "text-slate-500" : "text-cyan-100/54"}`}>Chapter {topic.no}</p>
          <p className={`inline-block bg-gradient-to-r ${topic.tint} bg-clip-text text-[3.1rem] font-black leading-none tracking-[-0.06em] text-transparent md:text-[5.6rem]`}>
            {topic.art}
          </p>
          <h1 className={`mt-7 text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.04em] md:text-[4.6rem] ${isSoftTopic ? "text-slate-950" : "text-white"}`}>{topic.title}</h1>
          <p className={`mt-5 max-w-3xl text-base leading-8 md:text-lg ${isSoftTopic ? "text-slate-700" : "text-white/[0.68]"}`}>{topic.detail}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.72 }} className="relative z-10 rounded-[1.35rem] border border-cyan-100/18 bg-[linear-gradient(180deg,rgba(236,249,255,0.96),rgba(216,237,246,0.90))] p-5 text-slate-950 shadow-[0_24px_90px_rgba(0,0,0,0.24)] md:p-7">
          <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{topic.impactHighlights?.length ? "AI Tools Impact" : "Practical Outcome"}</p>
          <p className="mt-4 text-xl font-semibold leading-8 text-slate-950">{topic.practicalOutcome}</p>
          {topic.impactHighlights?.length ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {topic.impactHighlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-900/[0.08] bg-white/[0.72] p-4 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-600">{item.label}</span>
                    <span className="rounded-full bg-slate-950 px-3 py-1 text-sm font-semibold text-cyan-50">{item.value}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 grid gap-3">
              {topic.checklist.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-900/[0.08] bg-white/[0.68] px-4 py-3 text-sm text-slate-700">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-950 text-xs font-semibold text-cyan-50">{index + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 pb-24 md:px-10">
        <div className="grid gap-3 lg:grid-cols-3">
          {topic.sections.map((section, index) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08, duration: 0.62 }}
              className={`relative min-h-[220px] overflow-hidden rounded-[1.1rem] border p-5 backdrop-blur-md ${isSoftTopic ? "border-slate-950/[0.08] bg-white/72 shadow-[0_18px_60px_rgba(15,23,42,0.10)]" : "border-white/[0.08] bg-white/[0.035] shadow-[0_18px_60px_rgba(0,0,0,0.18)]"}`}
            >
              <div className={`absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${topic.tint} ${isSoftTopic ? "opacity-35" : "opacity-[0.08]"} blur-2xl`} />
              <div className="relative">
                <p style={fontStyles.mono} className={`text-[11px] uppercase tracking-[0.2em] ${isSoftTopic ? "text-slate-500" : "text-cyan-100/42"}`}>Module {String(index + 1).padStart(2, "0")}</p>
                <h2 className={`mt-4 text-xl font-semibold tracking-[-0.035em] ${isSoftTopic ? "text-slate-950" : "text-white"}`}>{section.title}</h2>
                <p className={`mt-3 text-sm leading-7 ${isSoftTopic ? "text-slate-700" : "text-white/64"}`}>{section.body}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {topic.questionPrinciples?.length ? <QuestionPrinciplesPanel items={topic.questionPrinciples} fontStyles={fontStyles} /> : null}

        {topic.toolRankings?.length ? <ToolRankingPanel items={topic.toolRankings} fontStyles={fontStyles} /> : null}

        {topic.monetizationColumns ? <MonetizationColumnsPanel columns={topic.monetizationColumns} fontStyles={fontStyles} /> : null}

        {topic.installGuide ? <InstallGuidePanel guide={topic.installGuide} fontStyles={fontStyles} /> : null}

        {topic.prompts?.length && !topic.hidePrompts ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {topic.prompts.map((prompt, index) => (
              <CopyPromptCard key={prompt.title} prompt={prompt} index={index} fontStyles={fontStyles} />
            ))}
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[1.25rem] border border-cyan-100/18 bg-[linear-gradient(180deg,rgba(232,247,255,0.95),rgba(218,234,242,0.88))] p-6 text-slate-950 shadow-[0_18px_64px_rgba(0,0,0,0.20)]">
            <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.2em] text-slate-500">First Question</p>
            <p className="mt-4 text-2xl font-semibold leading-9 tracking-[-0.03em] text-slate-950">{topic.keyQuestion}</p>
          </div>
          <div className={`rounded-[1.25rem] border p-6 backdrop-blur-md ${isSoftTopic ? "border-slate-950/[0.08] bg-white/70" : "border-white/[0.08] bg-white/[0.04]"}`}>
            <p style={fontStyles.mono} className={`text-[11px] uppercase tracking-[0.2em] ${isSoftTopic ? "text-slate-500" : "text-cyan-100/42"}`}>Useful Links</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {topic.links.map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${isSoftTopic ? "border-slate-950/[0.10] bg-white/72 text-slate-700 hover:border-cyan-400/40 hover:text-slate-950" : "border-cyan-100/14 bg-cyan-100/[0.07] text-cyan-50/74 hover:border-cyan-100/30 hover:bg-cyan-100/[0.13] hover:text-white"}`}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p style={fontStyles.mono} className={`mb-4 text-[11px] uppercase tracking-[0.2em] ${isSoftTopic ? "text-slate-500" : "text-cyan-100/42"}`}>Next Pages</p>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {siblings.map((item) => (
              <a key={item.id} href={`/ai-coding-basics/${item.id}`} className={`rounded-xl border p-4 transition ${isSoftTopic ? "border-slate-950/[0.08] bg-white/70 hover:border-cyan-400/40 hover:bg-white" : "border-white/[0.08] bg-white/[0.035] hover:border-cyan-100/22 hover:bg-white/[0.07]"}`}>
                <span className={`text-xs ${isSoftTopic ? "text-slate-500" : "text-cyan-50/42"}`}>{item.no}</span>
                <p className={`mt-2 text-sm font-semibold ${isSoftTopic ? "text-slate-800" : "text-white/74"}`}>{item.title}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function OverviewPage({ fontStyles }) {
  return (
    <main style={fontStyles.ui} className="design-learning-page min-h-screen overflow-x-clip bg-black px-5 py-8 text-white md:px-10 md:py-10">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.055),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.04),transparent_34%),linear-gradient(180deg,#000,#050505_48%,#000)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.28)_1px,transparent_1px)] [background-size:56px_56px]" />

      <header className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
        <a href="/" className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-semibold text-white/64 transition hover:text-white">返回首页</a>
        <span style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.22em] text-cyan-100/45">AI Coding Basics</span>
      </header>

      <section className="mx-auto max-w-[1500px] pb-16 pt-16 md:pt-24">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72 }} className="max-w-5xl">
          <p style={fontStyles.mono} className="mb-5 text-[11px] uppercase tracking-[0.28em] text-cyan-100/54">For Chinese AI Beginners</p>
          <h1 className="bg-gradient-to-b from-white via-slate-100/90 to-white/42 bg-clip-text text-[3rem] font-semibold leading-[1.02] tracking-[-0.065em] text-transparent md:text-[6rem]">
            AI 编程基础实用页
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/58 md:text-lg">
            这里不是一篇长文章，而是 6 个单独入口。每个页面只解决一个新手最关心的问题：模型怎么选、没有复杂网络条件怎么开始、什么时候不用写代码、AI 变现怎么起步、AI 概念怎么看、开源 skill 怎么复用。
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {aiCodingBasicsTopics.map((topic, index) => (
            <TopicOverviewCard key={topic.id} topic={topic} index={index} fontStyles={fontStyles} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function AICodingBasicsPage({ fontStyles, topicId }) {
  const topic = getAiCodingTopic(topicId);
  if (topic) return <TopicDetailPage topic={topic} fontStyles={fontStyles} />;
  return <OverviewPage fontStyles={fontStyles} />;
}
