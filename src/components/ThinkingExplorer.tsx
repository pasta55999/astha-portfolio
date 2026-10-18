"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, accentVar, type Project, type Thinking } from "@/data/projects";
import { SectionHeader } from "@/components/ui";

const stages: { key: keyof Thinking; label: string; prompt: string }[] = [
  { key: "problem", label: "Problem", prompt: "What friction did I notice?" },
  { key: "insight", label: "Product insight", prompt: "What made it worth building?" },
  { key: "design", label: "System design", prompt: "How are the pieces split?" },
  { key: "prototype", label: "Prototype", prompt: "What actually exists today?" },
  { key: "next", label: "What I'd improve", prompt: "If I kept going…" },
];

/**
 * "Inside My Thinking": an interactive walk through how each project was
 * reasoned about. Entirely data-driven from projects[].thinking — no model,
 * no API, nothing generated at runtime.
 */
export function ThinkingExplorer() {
  const [slug, setSlug] = useState(projects[0].slug);
  const [stage, setStage] = useState(0);
  const reduce = useReducedMotion();
  const id = useId();
  const project = projects.find((p) => p.slug === slug) as Project;
  const accent = accentVar[project.accent];

  const selectProject = (s: string) => {
    setSlug(s);
    setStage(0);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setStage((s) => Math.min(stages.length - 1, s + 1));
    if (e.key === "ArrowLeft") setStage((s) => Math.max(0, s - 1));
  };

  return (
    <section id="thinking" className="scroll-mt-24 border-t border-line bg-ink-2/40">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <SectionHeader
          index="02"
          label="Inside my thinking"
          title={
            <>
              Not just what I built — <span className="italic text-paper-dim">how I got there.</span>
            </>
          }
          intro="Pick a project and step through the reasoning: the problem I noticed, the insight that made it worth building, how the system was split, what exists today, and what I'd fix next. Written by me, driven by structured data — nothing here is generated live."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          {/* project switcher */}
          <div className="min-w-0 lg:col-span-3" role="tablist" aria-label="Projects" aria-orientation="vertical">
            <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0 lg:divide-y lg:divide-line lg:border-y lg:border-line">
              {projects.map((p) => {
                const active = p.slug === slug;
                return (
                  <li key={p.slug} className="shrink-0">
                    <button
                      type="button"
                      role="tab"
                      id={`${id}-tab-${p.slug}`}
                      aria-selected={active}
                      aria-controls={`${id}-panel`}
                      onClick={() => selectProject(p.slug)}
                      className={`flex w-full items-center gap-3 border px-4 py-3 text-left transition-colors lg:border-0 lg:px-2 lg:py-4 ${active ? "border-paper bg-paper text-ink lg:bg-transparent lg:text-paper" : "border-line text-paper-dim hover:text-paper"}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: active ? accentVar[p.accent] : "var(--ink-3)" }} />
                      <span className="font-display text-xl lg:text-2xl">{p.name}</span>
                      <span className="ml-auto hidden font-mono text-[0.6rem] text-muted lg:inline">{p.number}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* stage panel */}
          <div className="min-w-0 lg:col-span-9" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${slug}`} onKeyDown={onKey}>
            {/* progression rail */}
            <ol className="relative grid grid-cols-5 gap-1" aria-label="Reasoning stages">
              {stages.map((s, i) => {
                const done = i <= stage;
                return (
                  <li key={s.key} className="relative">
                    <button
                      type="button"
                      onClick={() => setStage(i)}
                      aria-current={i === stage ? "step" : undefined}
                      className="group w-full text-left"
                    >
                      <span className="block h-[2px] w-full bg-ink-3 overflow-hidden">
                        <motion.span className="block h-full" style={{ background: accent }} initial={false} animate={{ scaleX: done ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }} />
                      </span>
                      <span className={`mt-3 block font-mono text-[0.6rem] uppercase tracking-[0.16em] transition-colors ${i === stage ? "text-paper" : "text-muted group-hover:text-paper-dim"}`}>
                        <span className="hidden sm:inline">0{i + 1} · </span>
                        {s.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="relative mt-10 min-h-[260px] border border-line bg-ink p-6 md:p-10">
              <div className="absolute right-0 top-0 h-16 w-16" style={{ background: `linear-gradient(225deg, ${accent} 0%, transparent 55%)`, opacity: 0.35 }} aria-hidden />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${slug}-${stage}`}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="eyebrow" style={{ color: accent }}>
                    {project.name} / {stages[stage].label}
                  </p>
                  <p className="mt-2 font-display text-3xl md:text-4xl italic text-paper-dim">{stages[stage].prompt}</p>
                  <p className="mt-6 max-w-3xl text-lg leading-relaxed md:text-xl">{project.thinking[stages[stage].key]}</p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStage((s) => Math.max(0, s - 1))}
                    disabled={stage === 0}
                    className="border border-line px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-paper-dim hover:text-paper disabled:opacity-30"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStage((s) => Math.min(stages.length - 1, s + 1))}
                    disabled={stage === stages.length - 1}
                    className="inline-flex items-center gap-2 bg-paper px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink hover:bg-lime disabled:opacity-30"
                  >
                    Next <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <Link href={`/projects/${project.slug}`} className="link-ul inline-flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-paper-dim hover:text-paper">
                  Full case study <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <p className="mt-3 font-mono text-[0.6rem] text-muted">Tip: use ← → to step through stages.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
