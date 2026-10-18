"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, MapPin, Mouse } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { Starfield } from "@/components/Starfield";

const ease = [0.16, 1, 0.3, 1] as const;

function useTyped(text: string, speed = 70, startDelay = 400) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setN(i);
      if (i < text.length) timer = setTimeout(tick, speed);
    };
    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay, reduce]);
  return text.slice(0, n);
}

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: profile.timezone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-flex h-7 items-center rounded-full border border-white/10 bg-white/[0.04] px-3 font-mono text-[11.5px] tracking-wide text-white/60" suppressHydrationWarning>
      {profile.timezoneLabel} {time ?? "--:--:--"}
    </span>
  );
}

export function Hero() {
  const typed = useTyped(profile.typed);
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div id="top" className="relative flex min-h-screen flex-col overflow-hidden">
      {/* background: nebula + starfield + vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="nebula absolute inset-0" />
        <Starfield className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_30%,transparent_40%,rgba(5,1,15,0.55)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05010f]/80 via-[#05010f]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#05010f] to-transparent" />
        <div className="noise-overlay absolute inset-0" />
        {/* orbit rings */}
        <div className="absolute -right-[10%] -bottom-[30%] hidden h-[80vh] w-[80vh] rounded-full border border-violet-400/10 md:block" />
        <div className="absolute -right-[5%] -bottom-[25%] hidden h-[60vh] w-[60vh] rounded-full border border-violet-400/15 md:block" />
        <div className="absolute right-[5%] -bottom-[18%] hidden h-[40vh] w-[40vh] rounded-full border border-indigo-400/20 shadow-[0_0_80px_rgba(99,102,241,0.25)_inset] md:block" />
      </div>

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-28 pt-[130px] sm:px-8 lg:pb-24" aria-labelledby="hero-title">
        <div className="w-full">
          <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="max-w-2xl">
                <p className="mb-3 font-mono text-[13px] tracking-[0.35em] text-violet-300/90" aria-label={profile.typed}>
                  {typed}
                  <span className="animate-blink ml-1 inline-block h-4 w-[2px] translate-y-[3px] bg-violet-300" />
                </p>
                <div
                  className="transition-transform duration-150 ease-out will-change-transform"
                  style={{ transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
                  onPointerMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 4, y: -((e.clientY - r.top) / r.height - 0.5) * 4 });
                  }}
                  onPointerLeave={() => setTilt({ x: 0, y: 0 })}
                >
                  <motion.h1 {...fade(0.1)} id="hero-title" className="font-display text-gradient-name cursor-default text-[clamp(3.5rem,9vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight">
                    {profile.firstName}
                  </motion.h1>
                  <motion.h2 {...fade(0.22)} className="font-display mt-3 text-[clamp(1.6rem,4vw,2.6rem)] font-bold leading-[1.08] tracking-tight text-white">
                    {profile.headline[0]}
                    <br />
                    {profile.headline[1]} <span className="text-gradient-accent">{profile.headline[2]}</span>
                  </motion.h2>
                </div>
                <motion.p {...fade(0.34)} className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-base">
                  {profile.intro}
                </motion.p>

                <motion.div {...fade(0.44)} className="mt-7 flex flex-wrap items-center gap-4">
                  <Link href="#projects" className="btn-primary-glow shimmer-sweep btn-gradient group inline-flex items-center gap-2.5 rounded-2xl px-7 py-3.5 text-[15px] font-semibold text-white">
                    View My Work
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  {profile.resume ? (
                    <a href={profile.resume} className="group inline-flex items-center gap-2.5 rounded-2xl border border-white/20 bg-white/[0.03] px-7 py-3.5 text-[15px] font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:border-violet-300/50 hover:bg-violet-500/10">
                      <Download className="h-4 w-4" /> Download Resume
                    </a>
                  ) : (
                    <Link href="#contact" className="group inline-flex items-center gap-2.5 rounded-2xl border border-white/20 bg-white/[0.03] px-7 py-3.5 text-[15px] font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:border-violet-300/50 hover:bg-violet-500/10">
                      Let&apos;s Connect
                    </Link>
                  )}
                </motion.div>

                <motion.div {...fade(0.54)} className="mt-6 flex items-center gap-3">
                  <a href={profile.github.url} target="_blank" rel="noreferrer" aria-label="GitHub" className="glass group flex h-12 w-12 items-center justify-center rounded-2xl text-violet-200/80 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/50 hover:text-white">
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      <GithubIcon className="h-5 w-5" />
                    </span>
                  </a>
                  {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="glass group flex h-12 w-12 items-center justify-center rounded-2xl text-violet-200/80 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/50 hover:text-white">
                      <span className="transition-transform duration-300 group-hover:scale-110">
                        <LinkedinIcon className="h-5 w-5" />
                      </span>
                    </a>
                  )}
                  {profile.status && (
                    <span className="ml-2 flex items-center gap-2 text-xs text-white/60">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      {profile.status}
                    </span>
                  )}
                </motion.div>

                <motion.div {...fade(0.64)} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-white/50">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-violet-300" /> Currently in {profile.location}
                  </span>
                  <LocalTime />
                </motion.div>
              </div>
            </div>

            {/* mindset card */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5, ease }} className="hidden lg:block">
              <div className="animate-float-slow glass ml-auto max-w-[260px] rounded-2xl border-violet-400/25 p-[1px]">
                <div className="rounded-2xl bg-[#0a0618]/70 px-5 py-4 shadow-[0_0_40px_rgba(139,92,246,0.25)]">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-violet-300/70">{"// mindset"}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    {profile.mindset.map((m, i) => (
                      <span key={m}>
                        {m}
                        {i < profile.mindset.length - 1 && <span className="text-violet-300"> · </span>}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              {/* terminal card */}
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8, ease }} className="glass-strong ml-auto mt-6 max-w-[380px] rounded-2xl p-[1px]">
                <div className="rounded-2xl bg-[#07031a]/80 p-4 font-mono text-[12px] leading-relaxed shadow-[0_0_40px_rgba(139,92,246,0.18)]">
                  <div className="flex items-center gap-1.5 border-b border-white/10 pb-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-300/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                    <span className="ml-2 text-[11px] text-white/40">astha@dubai — zsh</span>
                  </div>
                  <TerminalLines />
                </div>
              </motion.div>
            </motion.div>
          </div>

          <a href="#about" className="absolute -bottom-2 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 transition-colors hover:text-white md:flex">
            <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
              <span className="animate-scroll-dot h-2 w-1 rounded-full bg-violet-300" />
            </span>
            <span className="text-xs tracking-wide">Scroll to explore</span>
            <span className="h-8 w-px bg-gradient-to-b from-violet-400/70 to-transparent" />
          </a>
          <div className="absolute -bottom-2 left-5 flex items-center gap-2 text-xs text-white/60 md:hidden">
            <Mouse className="h-3.5 w-3.5" /> Scroll to explore
          </div>
        </div>
      </section>
    </div>
  );
}

const terminal = [
  { cmd: "whoami", out: "genai engineer · dubai · ~2y startups" },
  { cmd: "ls ~/projects", out: "guidr  trace  reelcall  wish  tell  brandorbit  eval-loop" },
  { cmd: "cat focus.txt", out: "agents that can't lie about state · voice-first UX · eval loops" },
  { cmd: "status --now", out: "open to conversations" },
];

/** Lines appear one after another on mount (instant under reduced motion). */
function TerminalLines() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? terminal.length : 0);
  useEffect(() => {
    if (reduce) return;
    if (shown >= terminal.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 1600 : 700);
    return () => clearTimeout(t);
  }, [shown, reduce]);
  return (
    <div className="mt-3 space-y-1.5">
      {terminal.slice(0, shown).map((l) => (
        <div key={l.cmd}>
          <p className="text-white/85">
            <span className="text-violet-300">❯</span> {l.cmd}
          </p>
          <p className="text-white/50">{l.out}</p>
        </div>
      ))}
      {shown < terminal.length && (
        <p className="text-white/85">
          <span className="text-violet-300">❯</span> <span className="animate-blink inline-block h-3.5 w-[7px] translate-y-[2px] bg-violet-300/80" />
        </p>
      )}
    </div>
  );
}
