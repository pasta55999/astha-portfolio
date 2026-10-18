"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Wrench, Code2, Zap, Layers, Heart, Quote } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { getProject } from "@/data/projects";
import { profile } from "@/data/profile";
import { Reveal, Heading, GradientText, SectionBackdrop } from "@/components/ui";

const all = skillGroups.flatMap((g) => g.skills.map((s) => ({ ...s, group: g.title })));
const groups = ["All", ...skillGroups.map((g) => g.title)];

export function Skills() {
  const [active, setActive] = useState("All");
  const [expanded, setExpanded] = useState(false);
  const filtered = active === "All" ? all : all.filter((s) => s.group === active);
  const list = active === "All" && !expanded ? filtered.slice(0, 9) : filtered;

  return (
    <div className="relative overflow-hidden">
      <SectionBackdrop variant="c" />
      <section id="skills" className="relative z-10 scroll-mt-20 overflow-x-clip">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-24 sm:px-8">
          <Reveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3.5 py-1 text-[13px] font-medium text-violet-200">
              <Wrench className="h-3.5 w-3.5" /> My Toolbox
            </span>
            <Heading size="md" center className="mx-auto mt-3 max-w-4xl">
              Skills that build <GradientText>possibilities</GradientText>
            </Heading>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-white/55 sm:text-base">No ratings or percentages — every skill points at the project where I actually used it.</p>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.6fr]">
            <Reveal className="hidden lg:block">
              <div className="glass rounded-3xl p-6">
                <Quote className="h-6 w-6 text-violet-400" />
                <p className="mt-3 text-[15px] leading-relaxed text-white/85">
                  Tools are important,
                  <br />
                  but the real skill is knowing which problem is worth them.
                </p>
                <span className="mt-4 block h-[3px] w-8 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
                <ul className="mt-6 space-y-3">
                  {skillGroups.map((g) => (
                    <li key={g.title}>
                      <button type="button" onClick={() => setActive(g.title)} className={`w-full rounded-xl border px-3.5 py-2.5 text-left transition-all duration-300 ${active === g.title ? "border-violet-400/45 bg-violet-500/10" : "border-white/[0.07] bg-white/[0.04] hover:border-violet-400/30"}`}>
                        <p className="text-sm font-semibold text-white">{g.title}</p>
                        <p className="mt-0.5 text-xs text-white/50">{g.blurb}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <div className="min-w-0">
              <Reveal className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Skill groups">
                {groups.map((g) => (
                  <button key={g} type="button" role="tab" aria-selected={active === g} onClick={() => setActive(g)} className={`pill px-3 py-1.5 text-xs ${active === g ? "pill-active btn-primary-glow" : ""}`}>
                    {g}
                  </button>
                ))}
              </Reveal>
              <p className="mt-2.5 text-xs text-white/60">
                Showing {list.length} of {all.length}
                {active === "All" && list.length < all.length && " — select a category or expand to explore everything."}
              </p>
              <motion.div layout className="mt-4 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {list.map((s, i) => {
                    const p = s.evidence ? getProject(s.evidence) : undefined;
                    return (
                      <motion.div key={s.name} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3, delay: i * 0.02 }} className="min-w-0">
                        <div className="group relative flex h-full min-w-0 flex-col rounded-2xl border border-white/10 bg-[#0b0620]/70 p-4 backdrop-blur-xl transition-colors duration-300 hover:border-violet-400/40">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-violet-300 transition-colors duration-300 group-hover:bg-white/[0.07]">
                            <GroupIcon group={s.group} />
                          </span>
                          <span className="mt-3 flex items-start justify-between gap-2">
                            <span className="min-w-0 flex-1 text-[13px] font-semibold leading-snug text-white [overflow-wrap:anywhere]">{s.name}</span>
                          </span>
                          {s.note && <span className="mt-1 block text-[11px] leading-snug text-white/50">{s.note}</span>}
                          <span className="mt-auto flex items-center justify-between pt-3">
                            <span className="text-[11px] text-white/45">{s.group}</span>
                            {p && (
                              <Link href={`/projects/${p.slug}`} className="inline-flex items-center gap-1 text-[11px] font-semibold text-violet-400 transition-colors hover:text-violet-200">
                                {p.name} <ArrowUpRight className="h-3 w-3" />
                              </Link>
                            )}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
              {active === "All" && filtered.length > 9 && (
                <div className="mt-5 flex justify-center">
                  <button type="button" onClick={() => setExpanded((v) => !v)} className="pill px-5 py-2.5 text-sm">
                    {expanded ? "Show fewer" : `Show all ${all.length} skills`}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_0.8fr]">
            <Reveal className="glass flex flex-wrap items-center gap-x-5 gap-y-4 rounded-2xl px-5 py-4 lg:flex-nowrap">
              {[
                { Icon: Code2, v: `${all.length}`, l: "Skills, each with evidence" },
                { Icon: Layers, v: `${profile.stats[0].value}`, l: "Projects" },
                { Icon: Zap, v: `${profile.stats[1].value}`, l: "Hackathons" },
                { Icon: Heart, v: "Always", l: "Learning" },
              ].map(({ Icon, v, l }, i) => (
                <span key={l} className={`flex min-w-0 flex-1 items-center gap-3 ${i ? "lg:border-l lg:border-white/10 lg:pl-5" : ""}`}>
                  <span className="animate-glow-breathe flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300 shadow-[0_0_18px_rgba(139,92,246,0.35)]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="font-display block text-lg font-bold leading-tight text-white">{v}</span>
                    <span className="block break-words text-[11px] text-white/50">{l}</span>
                  </span>
                </span>
              ))}
            </Reveal>
            <Reveal delay={80}>
              <Link href="#experience" className="group relative flex min-w-0 items-center justify-between gap-4 overflow-hidden rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-600/25 via-[#0b0620]/80 to-[#0b0620] px-6 py-5 transition-all duration-300 hover:border-violet-300/60">
                <span className="font-hand animate-neon-flicker text-[28px] font-semibold leading-[1.05] text-violet-300">
                  Where I&apos;ve
                  <br />
                  used them...
                </span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-violet-300/50 text-white transition-all duration-300 group-hover:bg-violet-500/25 group-hover:shadow-[0_0_24px_rgba(139,92,246,0.6)]">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function GroupIcon({ group }: { group: string }) {
  if (/AI/.test(group)) return <Zap className="h-4 w-4" />;
  if (/Backend/.test(group)) return <Code2 className="h-4 w-4" />;
  if (/Product/.test(group)) return <Layers className="h-4 w-4" />;
  return <Wrench className="h-4 w-4" />;
}
