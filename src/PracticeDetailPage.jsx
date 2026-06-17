import React, { useState } from "react";
import { motion } from "framer-motion";

const pageConfigs = {
  "agent-development": {
    eyebrow: "Agent Development",
    title: "Agent开发",
    subtitle: "把模型变成能完成任务、能被验证、能被接管的系统。",
    image: "/media/ai-agent-workbench-cinematic.png",
    accent: "from-[#00E5FF] via-[#2F7BFF] to-[#6E43FF]",
    background:
      "linear-gradient(135deg, #f4fdff 0%, #dff6ff 46%, #fff2e0 100%)",
    gridTint: "rgba(15, 23, 42, 0.055)",
    intro: "Agent 的本质不是“会聊天”，而是在边界内完成任务。先做小闭环，再上框架。",
    principles: [
      ["先定验收", "写清成功结果、失败结果和人工接管条件。"],
      ["工具限权", "越能产生后果的工具，越要白名单、日志和确认点。"],
      ["失败复盘", "每次失败都进入评测集，下次发布前回归。"],
    ],
    phases: [
      ["01", "任务", "只选一个高频、低风险、可验收任务。"],
      ["02", "工具", "只开放必要工具，并记录每次调用。"],
      ["03", "状态", "保存步骤、结果和下一步动作。"],
      ["04", "验证", "用日志、评测集和人工确认判断能否上线。"],
    ],
    projects: [
      { name: "LangGraph", desc: "状态机、人类接管、持久执行。", href: "https://github.com/langchain-ai/langgraph" },
      { name: "Dify", desc: "从工作流到生产应用。", href: "https://github.com/langgenius/dify" },
      { name: "CrewAI", desc: "区分自主协作和受控流程。", href: "https://github.com/crewAIInc/crewAI" },
      { name: "Agent 系统课程", desc: "适合补充 LangGraph、工具调用和失败处理的完整案例。", href: "https://www.youtube.com/results?search_query=AI+agents+full+course+LangGraph+tools" },
    ],
    checklist: ["资料问答 Agent", "工具调用 Agent", "20 次运行记录", "人工确认点"],
    prompts: [
      {
        title: "设计一个可验收 Agent",
        body: `你是我的 Agent 产品架构师。请帮我设计一个最小可运行、可验收、可接管的 Agent。

业务目标：
【写下想让 Agent 完成的任务】

请按下面结构输出：
1. Agent 的单一目标
2. 成功结果是什么
3. 失败结果是什么
4. 需要开放哪些工具
5. 哪些工具必须人工确认
6. 每一步要记录什么日志
7. 如何保存状态
8. 如何设置人工接管点
9. 最小 MVP 怎么做
10. 第一次验证用 5 个测试任务

限制：
- 不要一上来设计多 Agent。
- 不要开放高风险工具。
- 不要只讲概念，要给可执行步骤。`,
      },
      {
        title: "Agent 失败复盘提示词",
        body: `请帮我复盘一次 Agent 失败案例。

失败现象：
【粘贴失败过程、日志、错误结果】

请输出：
1. 失败属于哪类：目标不清 / 工具错误 / 权限过大 / 状态丢失 / 验证不足 / 模型误判
2. 根因分析
3. 应该补哪条规则
4. 应该补哪条评测用例
5. 是否需要人工接管点
6. 下次运行前的最小修改清单`,
      },
    ],
  },
  "automation-productization": {
    eyebrow: "Automation Productization",
    title: "自动化与产品化",
    subtitle: "把重复动作变成可监控、可恢复、可收费的真实 MVP。",
    image: "/media/ai-method-system-map-cinematic.png",
    accent: "from-[#FF2D95] via-[#FF6B2D] to-[#FFD166]",
    background:
      "linear-gradient(135deg, #fff7df 0%, #e7fbf5 48%, #eef1ff 100%)",
    gridTint: "rgba(15, 23, 42, 0.055)",
    intro: "自动化的本质不是脚本，而是把高频流程做成可提交、可追踪、可交付的产品入口。",
    principles: [
      ["先算 ROI", "选每周重复、耗时明显、结果可验收的流程。"],
      ["节点可重跑", "采集、清洗、生成、校验、通知分开做。"],
      ["入口产品化", "用户能提交、看状态、拿结果、反馈失败。"],
    ],
    phases: [
      ["01", "流程", "锁定一个高频重复流程。"],
      ["02", "节点", "每一步都能单独测试和重跑。"],
      ["03", "机制", "补日志、重试、告警、人工审核。"],
      ["04", "入口", "做提交、状态、结果、反馈四个页面能力。"],
    ],
    projects: [
      { name: "n8n", desc: "确定性流程和系统集成。", href: "https://github.com/n8n-io/n8n" },
      { name: "Playwright", desc: "浏览器自动化和验证。", href: "https://playwright.dev/docs/intro" },
      { name: "Dify", desc: "把 AI 工作流发布成应用。", href: "https://github.com/langgenius/dify" },
      { name: "n8n 自动化案例", desc: "适合观察 AI 自动化从流程搭建到交付闭环的完整路径。", href: "https://www.youtube.com/results?search_query=n8n+AI+automation+full+course+AI+SaaS+MVP" },
    ],
    checklist: ["一个重复流程", "日志和状态", "重试和接管", "任务状态页"],
    prompts: [
      {
        title: "把重复流程产品化",
        body: `你是我的自动化产品经理。请把下面这个重复流程设计成可交付的自动化产品入口。

流程描述：
【写下现在人工怎么做】

请输出：
1. 用户提交入口需要哪些字段
2. 流程拆成哪些节点
3. 每个节点输入、输出、失败条件
4. 哪些节点可以重试
5. 哪些节点需要人工审核
6. 用户怎么看状态
7. 用户最终拿到什么结果
8. 管理员怎么看日志
9. 最小 MVP 页面有哪些
10. 第一版不做什么

要求：
- 优先保证可追踪、可重跑、可交付。
- 不要只写脚本，要设计成普通用户能用的入口。`,
      },
      {
        title: "自动化 ROI 判断",
        body: `请帮我判断一个流程值不值得自动化。

流程：
【写下流程】

请按下面格式评估：
1. 每周重复次数
2. 单次人工耗时
3. 出错成本
4. 数据是否稳定
5. 是否有明确输入输出
6. 自动化难度：低 / 中 / 高
7. 建议：先不做 / 做脚本 / 做工作流 / 做产品入口
8. 第一版最小可交付方案`,
      },
    ],
  },
};

function PhaseCard({ phase, index, fontStyles }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ delay: index * 0.06, duration: 0.58 }}
      className="relative overflow-hidden rounded-[1.2rem] border border-slate-950/[0.08] bg-white/72 p-6 text-slate-950 shadow-[0_18px_62px_rgba(15,23,42,0.10)] backdrop-blur-md"
    >
      <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Phase {phase[0]}</p>
      <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{phase[1]}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-700">{phase[2]}</p>
    </motion.article>
  );
}

function PrincipleCard({ principle, index, fontStyles }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ delay: index * 0.05, duration: 0.52 }}
      className="rounded-[1.1rem] border border-slate-950/[0.08] bg-white/72 p-5 text-slate-950 shadow-[0_16px_54px_rgba(15,23,42,0.10)] backdrop-blur-md"
    >
      <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Principle {String(index + 1).padStart(2, "0")}</p>
      <h3 className="mt-4 text-xl font-semibold tracking-[-0.025em] text-slate-950">{principle[0]}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-700">{principle[1]}</p>
    </motion.article>
  );
}

function ProjectLink({ project, index }) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.48 }}
      className="group grid gap-2 rounded-xl border border-slate-950/[0.08] bg-white/72 p-4 text-slate-950 transition hover:border-cyan-400/40 hover:bg-white"
    >
      <h3 className="text-base font-semibold text-slate-950">{project.name} ↗</h3>
      <p className="text-sm leading-6 text-slate-700">{project.desc}</p>
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
      className="rounded-[1.25rem] border border-slate-950/[0.08] bg-white/72 p-5 text-slate-950 shadow-[0_18px_64px_rgba(15,23,42,0.10)] backdrop-blur-md"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p style={fontStyles.mono} className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Copy Prompt {String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-slate-950">{prompt.title}</h3>
        </div>
        <button
          type="button"
          onClick={copyPrompt}
          className="shrink-0 rounded-full border border-slate-950/[0.10] bg-slate-950 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:bg-slate-800"
        >
          {copied ? "已复制" : "复制提示词"}
        </button>
      </div>
      <pre className="mt-4 max-h-[320px] overflow-auto whitespace-pre-wrap rounded-xl border border-slate-950/[0.08] bg-slate-950/[0.04] p-4 text-sm leading-7 text-slate-800">
        {prompt.body}
      </pre>
    </motion.article>
  );
}

export default function PracticeDetailPage({ type, fontStyles }) {
  const page = pageConfigs[type] || pageConfigs["agent-development"];

  return (
    <main style={{ ...fontStyles.ui, background: page.background }} className="design-practice-page min-h-screen overflow-x-clip bg-slate-50 text-slate-950">
      <div className="fixed inset-0 -z-10" style={{ background: page.background }} />
      <div
        className="fixed inset-0 -z-10 opacity-[0.22] [background-size:72px_72px]"
        style={{
          backgroundImage: `linear-gradient(to right, ${page.gridTint} 1px, transparent 1px), linear-gradient(to bottom, ${page.gridTint} 1px, transparent 1px)`,
        }}
      />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_8%,rgba(255,255,255,0.72),transparent_28%),radial-gradient(circle_at_86%_16%,rgba(255,255,255,0.52),transparent_30%)]" />
      <header className="relative z-10 mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-7 md:px-10">
        <a href="/" className="rounded-full border border-slate-950/[0.10] bg-white/62 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950">返回首页</a>
        <span style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{page.eyebrow}</span>
      </header>

      <section className="relative mx-auto grid max-w-[1500px] gap-8 px-5 pb-20 pt-10 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72 }}>
          <p style={fontStyles.mono} className="mb-5 text-[11px] uppercase tracking-[0.28em] text-slate-500">{page.eyebrow}</p>
          <h1 className="text-[2.9rem] font-black leading-[1.02] tracking-[-0.055em] text-slate-950 md:text-[5.4rem]">{page.title}</h1>
          <p className={`mt-5 inline-block bg-gradient-to-r ${page.accent} bg-clip-text text-2xl font-black tracking-[-0.035em] text-transparent md:text-[2.45rem]`}>{page.subtitle}</p>
          <p className="mt-7 max-w-3xl text-base leading-8 text-slate-700 md:text-lg">{page.intro}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.72 }} className="design-practice-hero-image relative overflow-hidden rounded-[1.35rem] border border-slate-950/[0.08] bg-white/70 p-2 shadow-[0_24px_90px_rgba(15,23,42,0.14)]">
          <img src={page.image} alt="" className="block w-full rounded-[1rem] bg-white object-contain" />
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 pb-28 md:px-10">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {page.phases.map((phase, index) => <PhaseCard key={phase[0]} phase={phase} index={index} fontStyles={fontStyles} />)}
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {page.principles.map((principle, index) => <PrincipleCard key={principle[0]} principle={principle} index={index} fontStyles={fontStyles} />)}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {page.prompts.map((prompt, index) => <CopyPromptCard key={prompt.title} prompt={prompt} index={index} fontStyles={fontStyles} />)}
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-[1.25rem] border border-slate-950/[0.08] bg-white/72 p-6 text-slate-950 shadow-[0_18px_64px_rgba(15,23,42,0.10)] backdrop-blur-md">
            <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Start Checklist</p>
            <div className="mt-5 grid gap-3">
              {page.checklist.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-950/[0.08] bg-white/72 px-4 py-3 text-sm text-slate-700">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-950 text-xs font-semibold text-cyan-50">{index + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.25rem] border border-slate-950/[0.08] bg-white/70 p-6 backdrop-blur-md">
            <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Recommended Resources</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {page.projects.map((project, index) => <ProjectLink key={project.href} project={project} index={index} />)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
