import React, { useState } from "react";
import { fetchAnalyticsSummary } from "./analyticsClient";

function StatCard({ label, value, detail }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5">
      <p className="text-sm text-white/42">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      {detail ? <p className="mt-2 text-sm leading-6 text-cyan-50/50">{detail}</p> : null}
    </div>
  );
}

function ListBlock({ title, items }) {
  const entries = Object.entries(items || {}).sort((a, b) => Number(b[1]) - Number(a[1])).slice(0, 8);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/22 p-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-4 space-y-3">
        {entries.length ? entries.map(([name, count]) => (
          <div key={name} className="flex items-center justify-between gap-4 border-t border-white/[0.06] pt-3 text-sm">
            <span className="truncate text-white/60">{name || "unknown"}</span>
            <span className="font-semibold text-cyan-50">{count}</span>
          </div>
        )) : <p className="text-sm text-white/36">暂无数据</p>}
      </div>
    </div>
  );
}

export default function AnalyticsDashboard({ fontStyles }) {
  const [password, setPassword] = useState("");
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadSummary = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = await fetchAnalyticsSummary(password);
      setSummary(payload);
    } catch (err) {
      setSummary(null);
      setError(err?.message || "统计后台暂时不可用。");
    } finally {
      setLoading(false);
    }
  };

  const totals = summary?.totals || {};
  const last7 = summary?.last7 || {};
  const last30 = summary?.last30 || {};

  return (
    <main style={fontStyles.ui} className="min-h-screen bg-[#03040a] px-5 py-8 text-white md:px-10 md:py-12">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(74,117,255,0.18),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(137,83,255,0.16),transparent_34%),linear-gradient(180deg,#060711,#020207)]" />
      <div className="mx-auto max-w-6xl">
        <a href="/" className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/56 transition hover:text-white">返回首页</a>
        <section className="mt-10 rounded-[2rem] border border-white/[0.10] bg-black/24 p-6 backdrop-blur-xl md:p-8">
          <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.24em] text-cyan-100/52">Private Analytics</p>
          <h1 className="mt-3 text-[2.4rem] font-semibold leading-tight tracking-[-0.05em] text-white md:text-[4rem]">网站访问数据</h1>
          <p className="mt-3 max-w-2xl text-base leading-8 text-white/50">匿名统计后台，只展示访问量、近似访客量、来源、设备、滚动完成率和点击事件。</p>

          <form onSubmit={loadSummary} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="输入统计后台密码"
              className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-white/[0.045] px-4 text-white outline-none placeholder:text-white/28 focus:border-cyan-100/24"
            />
            <button type="submit" disabled={loading || !password.trim()} className="rounded-2xl border border-cyan-100/18 bg-cyan-100/[0.10] px-6 py-3 font-semibold text-cyan-50 transition hover:bg-cyan-100/[0.16] disabled:cursor-not-allowed disabled:opacity-40">
              {loading ? "读取中" : "查看数据"}
            </button>
          </form>
          {error ? <p className="mt-4 rounded-2xl border border-amber-100/14 bg-amber-100/[0.06] px-4 py-3 text-sm text-amber-50/72">{error}</p> : null}
          {summary && !summary.configured ? <p className="mt-4 rounded-2xl border border-cyan-100/14 bg-cyan-100/[0.06] px-4 py-3 text-sm text-cyan-50/70">统计存储未配置。请在 Vercel 配置 Upstash Redis 环境变量后重新部署。</p> : null}
        </section>

        {summary ? (
          <section className="mt-6 grid gap-5">
            <div className="grid gap-5 md:grid-cols-4">
              <StatCard label="总事件" value={totals.events || 0} detail="所有匿名事件合计" />
              <StatCard label="近 7 天 PV" value={last7.pageViews || 0} detail="page_view 事件" />
              <StatCard label="近 7 天访客" value={last7.visitors || 0} detail="按日匿名哈希近似" />
              <StatCard label="近 30 天访客" value={last30.visitors || 0} detail="按日匿名哈希近似" />
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <ListBlock title="来源" items={last30.referrers} />
              <ListBlock title="设备" items={last30.devices} />
              <ListBlock title="滚动完成率" items={last30.progress} />
              <ListBlock title="按钮点击" items={last30.clicks} />
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
