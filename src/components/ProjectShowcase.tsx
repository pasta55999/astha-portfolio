"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Bot, FlaskConical, Globe, LayoutGrid, Mic, BarChart3, Search, Star } from "lucide-react";
import { projects, experiments, type Project } from "@/data/projects";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Reveal, Eyebrow, Heading, GradientText, StatusPill, SectionBackdrop } from "@/components/ui";
import { GithubIcon } from "@/components/BrandIcons";

const filters = [
  { label: "All Projects", icon: LayoutGrid, match: () => true },
  { label: "Agentic AI", icon: Bot, match: (p: Project) => p.category.some((c) => /Agent|RAG/i.test(c)) },
  { label: "Voice & Browser", icon: Mic, match: (p: Project) => p.category.some((c) => /Voice|Browser|Contextual/i.test(c)) },
  { label: "Search & Retrieval", icon: Search, match: (p: Project) => p.category.some((c) => /Search|Retrieval|Multimodal|RAG/i.test(c)) },
  { label: "Data & Analysis", icon: BarChart3, match: (p: Project) => p.category.some((c) => /Climate|Risk|Analytics|Reconciliation|Decision|Monitoring|Brand|Evaluation/i.test(c)) },
];

export function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const list = projects.filter(filters[active].match);

  return (
    <div className="relative">
      <SectionBackdrop variant="a" />
      <section id="projects" className="relative z-10 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8">
          <Reveal className="relative">
            <Eyebrow>{"// 02. Projects"}</Eyebrow>
            <Heading size="md" center className="mx-auto mt-4 max-w-4xl">
              Projects that solve
              <br className="hidden sm:block" /> <GradientText>real problems.</GradientText>
            </Heading>
            <p className="mt-3 text-center text-base text-white/55 sm:text-lg">Working prototypes and concepts — each with an honest status and a full case study.</p>
            <span className="absolute -top-2 right-0 hidden rotate-[8deg] select-none text-right font-hand text-2xl italic leading-tight text-violet-400/80 drop-shadow-[0_0_12px_rgba(139,92,246,0.8)] xl:block">
              Ideas
              <br />
              Code
              <br />
              Impact
            </span>
          </Reveal>

          <Reveal delay={80} className="mt-9 flex flex-wrap items-center justify-center gap-3" role="tablist" aria-label="Project filters">
            {filters.map((f, i) => {
              const Icon = f.icon;
              const on = i === active;
              return (
                <button key={f.label} type="button" role="tab" aria-selected={on} onClick={() => setActive(i)} className={`pill px-6 py-3 text-sm ${on ? "pill-active btn-primary-glow" : ""}`}>
                  <Icon className="h-4 w-4" />
                  {f.label}
                </button>
              );
            })}
          </Reveal>

          <motion.div layout className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}>
                  <ProjectCard project={p} featured={p.slug === "guidr"} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <Experiments />
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project: p, featured }: { project: Project; featured?: boolean }) {
  const href = `/projects/${p.slug}`;
  return (
    <article className={`card group relative flex h-full flex-col overflow-hidden rounded-3xl hover:-translate-y-1 ${featured ? "card-featured" : ""}`}>
      {featured && (
        <span className="glass absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border-violet-300/40 px-3.5 py-1.5 text-xs font-semibold text-white">
          <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" /> Featured
        </span>
      )}
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden" aria-label={`${p.name} case study`}>
        <ProjectVisual visual={p.visual} accent={p.accent} className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0620] via-transparent to-transparent opacity-80" />
        <span className="glass absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-white/0 transition-all duration-300 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
        <span className="absolute bottom-3 left-4">
          <StatusPill status={p.status} />
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {p.category.map((c) => (
            <span key={c} className="tag">
              {c}
            </span>
          ))}
        </div>
        <h3 className="font-display mt-4 text-[22px] font-bold tracking-tight text-white">
          <Link href={href} className="transition-colors group-hover:text-violet-200">
            {p.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{p.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-white/45">
          {p.stack.slice(0, 4).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between">
          <Link href={href} className="group/link inline-flex items-center gap-2 text-[15px] font-semibold text-violet-400 transition-colors hover:text-violet-200">
            View Project <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
          <div className="flex items-center gap-2">
            {p.links.demo && (
              <a href={p.links.demo} target="_blank" rel="noreferrer" aria-label={`${p.name} live demo`} className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-400/40 text-violet-200 transition-all duration-300 hover:border-violet-300 hover:bg-violet-500/20 hover:text-white">
                <Globe className="h-4 w-4" />
              </a>
            )}
            {p.links.repo && (
              <a href={p.links.repo} target="_blank" rel="noreferrer" aria-label={`${p.name} on GitHub`} className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-400/40 text-violet-200 transition-all duration-300 hover:border-violet-300 hover:bg-violet-500/20 hover:text-white">
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Experiments() {
  return (
    <Reveal className="relative mt-14">
      <span className="absolute -left-2 -top-10 hidden rotate-[-10deg] select-none font-hand text-2xl italic leading-tight text-violet-400/80 drop-shadow-[0_0_12px_rgba(139,92,246,0.8)] xl:block">
        Build
        <br />
        Solve
        <br />
        Grow
      </span>
      <div className="glass rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3.5 py-1 text-[13px] font-medium text-violet-200">
              <FlaskConical className="h-3.5 w-3.5" /> Experiments
            </span>
            <h3 className="font-display mt-3 text-2xl font-bold text-white sm:text-3xl">
              Not products. <GradientText>Yet.</GradientText>
            </h3>
            <p className="mt-2 max-w-xl text-sm text-white/55">Directions I&apos;m actively poking at — labelled honestly: no users, no benchmarks, no claims.</p>
          </div>
          <Link href="/projects" className="group inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-white">
            Browse all projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {experiments.map((e) => (
            <li key={e.title} className="group rounded-2xl border border-white/[0.07] bg-white/[0.04] p-4 transition-all duration-300 hover:border-violet-400/45 hover:bg-violet-500/10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">{e.area}</span>
                <span className="rounded-full bg-violet-500/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-violet-300">{e.status}</span>
              </div>
              <p className="mt-2 text-[15px] font-semibold text-white">{e.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/55">{e.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
