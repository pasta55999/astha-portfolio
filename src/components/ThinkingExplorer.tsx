"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lightbulb } from "lucide-react";
import { projects, type Thinking } from "@/data/projects";
import { Reveal, Heading, GradientText, StatusPill } from "@/components/ui";
import { ProjectVisual } from "@/components/ProjectVisual";

const stages: { key: keyof Thinking; label: string; prompt: string }[] = [
  { key: "problem", label: "Problem", prompt: "What friction did I notice?" },
  { key: "insight", label: "Insight", prompt: "What made it worth building?" },
  { key: "design", label: "System design", prompt: "How are the pieces split?" },
  { key: "prototype", label: "Prototype", prompt: "What actually exists today?" },
  { key: "next", label: "Improve next", prompt: "If I kept going…" },
];

/** "Inside My Thinking": data-driven walk through how each project was reasoned about. No model, no API. */
export function ThinkingExplorer() {
  const [slug, setSlug] = useState(projects[0].slug);
  const [stage, setStage] = useState(0);
  const id = useId();
  const project = projects.find((p) => p.slug === slug)!;
  const select = (s: string) => {
    setSlug(s);
    setStage(0);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setStage((s) => Math.min(stages.length - 1, s + 1));
    if (e.key === "ArrowLeft") setStage((s) => Math.max(0, s - 1));
  };

  return (
    <section id="thinking" className="relative z-10 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-6 sm:px-8">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3.5 py-1 text-[13px] font-medium text-violet-200">
            <Lightbulb className="h-3.5 w-3.5" /> Inside my thinking
          </span>
          <Heading size="md" center className="mx-auto mt-3 max-w-3xl">
            Not just what I built — <GradientText>how I got there.</GradientText>
          </Heading>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/55 sm:text-base">Pick a project and step through the reasoning. Written by me, driven by structured data — nothing here is generated live.</p>
        </Reveal>

        <Reveal delay={80} className="mt-8 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Projects">
          {projects.map((p) => {
            const on = p.slug === slug;
            return (
              <button key={p.slug} type="button" role="tab" id={`${id}-tab-${p.slug}`} aria-selected={on} aria-controls={`${id}-panel`} onClick={() => select(p.slug)} className={`pill px-4 py-2 text-sm ${on ? "pill-active btn-primary-glow" : ""}`}>
                <span className="font-mono text-[11px] text-white/40">{p.number}</span>
                {p.name}
              </button>
            );
          })}
        </Reveal>

        <Reveal delay={140}>
          <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${slug}`} onKeyDown={onKey} className="glass-strong mt-8 rounded-3xl p-5 shadow-[0_0_70px_-15px_rgba(139,92,246,0.4)] sm:p-8">
            <ol className="grid grid-cols-5 gap-2" aria-label="Reasoning stages">
              {stages.map((s, i) => {
                const done = i <= stage;
                return (
                  <li key={s.key}>
                    <button type="button" onClick={() => setStage(i)} aria-current={i === stage ? "step" : undefined} className="group w-full text-left">
                      <span className="block h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.span className="block h-full rounded-full bg-gradient-to-r from-violet-500 via-violet-400 to-indigo-400 shadow-[0_0_12px_rgba(139,92,246,0.6)]" initial={false} animate={{ scaleX: done ? 1 : 0 }} style={{ transformOrigin: "left" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
                      </span>
                      <span className={`mt-2.5 block text-[11px] font-medium sm:text-xs ${i === stage ? "text-white" : "text-white/45 group-hover:text-white/70"}`}>
                        <span className="hidden sm:inline">0{i + 1} · </span>
                        {s.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="relative min-h-[220px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={`${slug}-${stage}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                    <p className="font-mono text-[11.5px] tracking-[0.3em] text-violet-300/80">
                      {project.name.toUpperCase()} / {stages[stage].label.toUpperCase()}
                    </p>
                    <p className="font-hand mt-2 text-3xl text-white/90">{stages[stage].prompt}</p>
                    <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg">{project.thinking[stages[stage].key]}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={slug} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.35 }} className="hidden lg:block">
                  <Link href={`/projects/${project.slug}`} className="card group block overflow-hidden rounded-2xl">
                    <ProjectVisual visual={project.visual} accent={project.accent} compact className="aspect-[16/10] transition-transform duration-700 group-hover:scale-[1.04]" />
                    <div className="flex items-center justify-between gap-2 px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.category.slice(0, 2).map((c) => (
                          <span key={c} className="tag">
                            {c}
                          </span>
                        ))}
                      </div>
                      <StatusPill status={project.status} />
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
              <div className="flex gap-2">
                <button type="button" onClick={() => setStage((s) => Math.max(0, s - 1))} disabled={stage === 0} className="pill px-4 py-2 text-sm disabled:opacity-30">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button type="button" onClick={() => setStage((s) => Math.min(stages.length - 1, s + 1))} disabled={stage === stages.length - 1} className="btn-gradient inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white disabled:opacity-30">
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <Link href={`/projects/${project.slug}`} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-violet-300 hover:text-white">
                Full case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-[11px] text-white/35">Tip: use ← → to step through stages.</p>
        </Reveal>
      </div>
    </section>
  );
}
