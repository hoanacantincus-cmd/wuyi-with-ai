import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { heroChapters } from "./aiShowcaseData";
import { trackAnalytics } from "./analyticsClient";

const HERO_VIDEO_SRC = "/media/ai-roadmap-hero-1080p30.mp4";
const HERO_POSTER_SRC = "/media/ai-roadmap-hero-poster.jpg";
const heroModuleLinks = [
  { no: "01", title: "AI 学习路径", href: "#ai-roadmap" },
  { no: "02", title: "AI 编程基础", href: "#ai-coding-basics" },
  { no: "03", title: "大模型评测", href: "#model-benchmark" },
  { no: "04", title: "AI 编程智能体评测", href: "#coding-tools" },
  { no: "05", title: "Agent开发", href: "#agent-development" },
  { no: "06", title: "AI Orbit Radar", href: "#radar" },
];

function ProgressRail({ activeIndex, progress }) {
  return (
    <div className="hidden w-16 shrink-0 flex-col items-center gap-3 lg:flex">
      <div className="h-40 w-px overflow-hidden rounded-full bg-white/10">
        <motion.div className="w-full rounded-full bg-gradient-to-b from-cyan-100 via-white to-violet-200" style={{ height: `${progress}%` }} />
      </div>
      <div className="space-y-2">
        {heroChapters.map((chapter, index) => (
          <span key={chapter.eyebrow} className={`block h-1.5 w-1.5 rounded-full transition ${index === activeIndex ? "bg-white shadow-[0_0_16px_rgba(160,232,255,0.9)]" : "bg-white/22"}`} />
        ))}
      </div>
    </div>
  );
}

function ModuleLinkGrid({ activeIndex, onTrack }) {
  return (
    <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
      {heroModuleLinks.map((item, index) => (
        <a
          key={item.title}
          href={item.href}
          onClick={() => onTrack(item.title)}
          className={`min-w-0 rounded-2xl border px-3 py-3 backdrop-blur-md transition hover:border-white/40 hover:bg-white/[0.10] ${index === activeIndex ? "border-white/72 bg-white/[0.10] shadow-[0_0_28px_rgba(255,255,255,0.10)]" : "border-white/[0.10] bg-black/30"}`}
        >
          <p className="text-[10px] font-medium tracking-[0.16em] text-cyan-100/50">{item.no}</p>
          <p className="mt-1 truncate text-xs font-semibold text-white/86">{item.title}</p>
        </a>
      ))}
    </div>
  );
}

export default function ScrollVideoHero({ profile, shareStatus, onGithub, onContact, onShare, fontStyles }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const reportedProgressRef = useRef(new Set());
  const latestProgressRef = useRef(0);
  const activeIndexRef = useRef(0);
  const progressValueRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const heroInViewRef = useRef(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const activeChapter = heroChapters[activeIndex] || heroChapters[0];
  const activeModuleIndex = Math.min(heroModuleLinks.length - 1, Math.floor((progressValue / 100) * heroModuleLinks.length));

  const applyProgress = (value) => {
    const progress = Math.max(0, Math.min(1, value));
    latestProgressRef.current = progress;
    const nextProgress = Math.round(progress * 100);
    const nextIndex = Math.min(heroChapters.length - 1, Math.floor(progress * heroChapters.length));

    if (nextIndex !== activeIndexRef.current) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }

    if (nextProgress !== progressValueRef.current) {
      progressValueRef.current = nextProgress;
      setProgressValue(nextProgress);
    }

    [25, 50, 75, 100].forEach((milestone) => {
      if (nextProgress >= milestone && !reportedProgressRef.current.has(milestone)) {
        reportedProgressRef.current.add(milestone);
        trackAnalytics("hero_progress", { section: "hero", progress: milestone });
      }
    });
  };

  const playHeroVideo = () => {
    const video = videoRef.current;
    if (!video || !heroInViewRef.current) return;
    video.muted = true;
    video.playbackRate = 1;
    video.play().catch(() => {
      // Muted autoplay is allowed by current browsers; poster remains visible if a client delays it.
    });
  };

  useEffect(() => {
    let frameId = 0;
    lastScrollYRef.current = window.scrollY;

    const syncFromNativeScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
        const nextScrollY = window.scrollY;
        const deltaY = nextScrollY - lastScrollYRef.current;
        lastScrollYRef.current = nextScrollY;
        const progress = (window.scrollY - section.offsetTop) / scrollable;
        applyProgress(progress);
        if (Math.abs(deltaY) > 1) playHeroVideo();
      });
    };

    window.addEventListener("scroll", syncFromNativeScroll, { passive: true });
    window.addEventListener("resize", syncFromNativeScroll);
    syncFromNativeScroll();
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", syncFromNativeScroll);
      window.removeEventListener("resize", syncFromNativeScroll);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    let cancelled = false;

    const warmVideo = () => {
      if (cancelled) return;
      video.muted = true;
      video.load();
      playHeroVideo();
    };

    const frameId = window.requestAnimationFrame(warmVideo);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    playHeroVideo();
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video?.duration || !Number.isFinite(video.duration)) return;
    applyProgress(video.currentTime / video.duration);
  };

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      heroInViewRef.current = Boolean(entry?.isIntersecting);
      if (!entry?.isIntersecting) {
        video.pause();
      } else {
        playHeroVideo();
      }
    }, { threshold: 0.08 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const trackCta = (target, handler) => (event) => {
    trackAnalytics("cta_click", { section: "hero", target });
    handler?.(event);
  };

  return (
    <section id="hero" ref={sectionRef} className="relative z-30 min-h-[calc(100svh-96px)] [overflow-x:clip] md:h-[430vh]">
      <div className="relative min-h-[calc(100svh-96px)] overflow-hidden bg-black md:sticky md:top-0 md:min-h-screen">
        <div className="relative z-0 mx-5 mt-3 aspect-video overflow-hidden rounded-[1.35rem] border border-white/10 bg-black shadow-[0_20px_70px_rgba(77,163,255,0.18)] md:absolute md:inset-0 md:m-0 md:aspect-auto md:rounded-none md:border-0 md:shadow-none">
          <img
            src={HERO_POSTER_SRC}
            alt=""
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-48 blur-2xl saturate-125"
            aria-hidden="true"
          />
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover opacity-100 md:object-contain"
            src={HERO_VIDEO_SRC}
            poster={HERO_POSTER_SRC}
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
            onCanPlay={playHeroVideo}
            onTimeUpdate={handleTimeUpdate}
            aria-hidden="true"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(0,0,0,0.72),rgba(0,0,0,0.2)_36%,rgba(0,0,0,0.16)_68%,rgba(0,0,0,0.46))] md:block" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[34vh] bg-gradient-to-t from-black via-black/48 to-transparent md:block" />
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-36 bg-gradient-to-b from-black/56 to-transparent md:block" />

        <div className="relative z-10 mx-auto flex max-w-[1540px] items-start px-5 pb-7 pt-5 sm:px-6 md:min-h-screen md:items-end md:px-10 md:pb-12 md:pt-20">
          <div className="grid w-full gap-5 lg:grid-cols-[0.8fr_0.12fr_0.62fr] lg:items-end">
            <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }} className="max-w-3xl rounded-[1.35rem] border border-white/[0.10] bg-black/42 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.30)] backdrop-blur-md md:rounded-[1.65rem] md:bg-black/28 md:p-6">
              <motion.div
                key={`falling-copy-${activeIndex}`}
                initial={{ opacity: 0, y: -42 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
              >
                <p style={fontStyles.mono} className="mb-3 text-[11px] uppercase tracking-[0.24em] text-cyan-100/62 md:mb-4">
                  {activeChapter.eyebrow}
                </p>
                <h1>
                  <span className="block bg-gradient-to-b from-white via-cyan-50/94 to-white/44 bg-clip-text text-[2.28rem] font-semibold leading-[0.96] tracking-[-0.055em] text-transparent md:text-[4.8rem] lg:text-[5.7rem]">
                    AI伍子胥
                  </span>
                  <span className="mt-3 block max-w-2xl text-[0.96rem] font-medium leading-7 text-cyan-50/78 md:mt-4 md:text-[1.24rem]">
                    {activeChapter.title}
                  </span>
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/62 md:mt-4 md:leading-7 md:text-base">
                  {activeChapter.desc}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] text-white/40 md:mt-5" style={fontStyles.mono}>
                  <span className="h-px w-10 bg-gradient-to-r from-transparent via-cyan-100/42 to-transparent" />
                  {activeChapter.meta}
                </div>
              </motion.div>
              <div className="mt-4 flex flex-wrap gap-2 md:mt-6 md:gap-3">
                <a href="#model-benchmark" onClick={trackCta("model-benchmark")} className="rounded-full border border-cyan-100/16 bg-cyan-100/[0.10] px-4 py-2.5 text-sm font-semibold text-cyan-50 backdrop-blur-md transition hover:border-cyan-100/32 hover:bg-cyan-100/[0.16] md:px-5 md:py-3">
                  看模型榜单
                </a>
                <a href="#coding-tools" onClick={trackCta("coding-tools")} className="rounded-full border border-white/12 bg-white/[0.045] px-4 py-2.5 text-sm font-semibold text-white/72 backdrop-blur-md transition hover:border-white/24 hover:bg-white/[0.075] hover:text-white md:px-5 md:py-3">
                  看编程软件评测
                </a>
                <a href={profile.github} onClick={trackCta("github", onGithub)} className="rounded-full border border-white/12 bg-white/[0.045] px-4 py-2.5 text-sm font-semibold text-white/72 backdrop-blur-md transition hover:border-white/24 hover:bg-white/[0.075] hover:text-white md:px-5 md:py-3">
                  GitHub
                </a>
                <button type="button" onClick={trackCta("share", onShare)} className="rounded-full border border-white/12 bg-white/[0.045] px-4 py-2.5 text-sm font-semibold text-white/72 backdrop-blur-md transition hover:border-white/24 hover:bg-white/[0.075] hover:text-white md:px-5 md:py-3">
                  {shareStatus || "分享主页"}
                </button>
              </div>
              <div className="mt-5 hidden sm:block lg:hidden">
                <ModuleLinkGrid activeIndex={activeModuleIndex} onTrack={(target) => trackAnalytics("cta_click", { section: "hero-module-mobile", target })} />
              </div>
            </motion.div>

            <ProgressRail activeIndex={activeIndex} progress={progressValue} />

            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.8 }} className="relative hidden lg:block">
              <div className="rounded-[1.55rem] border border-white/[0.10] bg-black/22 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.24)] backdrop-blur-md">
                <div className="mb-4 flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div>
                    <p style={fontStyles.mono} className="text-[11px] uppercase tracking-[0.22em] text-cyan-100/52">AI Roadmap</p>
                  </div>
                  <p style={fontStyles.mono} className="text-[12px] text-white/40">{String(progressValue).padStart(2, "0")}%</p>
                </div>
                <ModuleLinkGrid activeIndex={activeModuleIndex} onTrack={(target) => trackAnalytics("cta_click", { section: "hero-module", target })} />
                <button type="button" onClick={trackCta("contact", onContact)} className="mt-4 w-full rounded-2xl border border-violet-100/14 bg-violet-100/[0.07] px-4 py-3 text-sm font-semibold text-violet-50/78 transition hover:border-violet-100/28 hover:bg-violet-100/[0.12] hover:text-white">
                  当想象力接入智能，现实开始重构
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
