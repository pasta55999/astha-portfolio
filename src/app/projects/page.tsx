import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Globe, Trophy } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Reveal, Eyebrow, Heading, GradientText, StatusPill, SectionBackdrop } from "@/components/ui";
import { GithubIcon } from "@/components/BrandIcons";

export const metadata: Metadata = {
  title: "Projects",
  description: "All projects by Astha Chauhan — agentic AI, voice interfaces, climate-risk intelligence, browser assistants and evaluation loops, each with an honest status.",
};

export default function ProjectsPage() {
  return (
    <div className="relative overflow-hidden">
      <SectionBackdrop variant="a" fadeTop={false} />
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 md:pt-40">
        <Reveal className="text-center">
          <Eyebrow>{"// Index"}</Eyebrow>
          <Heading center className="mx-auto mt-4 max-w-3xl">
            All projects, <GradientText>{projects.length} and counting.</GradientText>
          </Heading>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/55 sm:text-lg">
            Every entry links to its repository where one is public and states exactly what is built versus planned.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal as="article" key={p.slug} delay={(i % 3) * 70} className="card group relative flex h-full flex-col overflow-hidden rounded-3xl hover:-translate-y-1">
              {p.award && (
                <span className="glass absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border-violet-300/40 px-3.5 py-1.5 text-xs font-semibold text-white">
                  <Trophy className="h-3.5 w-3.5 text-amber-300" /> {p.award}
                </span>
              )}
              <Link href={`/projects/${p.slug}`} className="relative block aspect-[16/10] overflow-hidden" aria-label={`${p.name} case study`}>
                <ProjectVisual visual={p.visual} accent={p.accent} className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0620] via-transparent to-transparent opacity-80" />
                <span className="glass absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-white/0 transition-all duration-300 group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <span className="absolute bottom-3 left-4 flex items-center gap-2">
                  <StatusPill status={p.status} />
                  <span className="font-mono text-[11px] text-white/50">{p.year}</span>
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
                <h2 className="font-display mt-4 text-[22px] font-bold tracking-tight text-white">{p.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{p.tagline}</p>
                <div className="mt-5 flex items-center justify-between">
                  <Link href={`/projects/${p.slug}`} className="group/link inline-flex items-center gap-2 text-[15px] font-semibold text-violet-400 transition-colors hover:text-violet-200">
                    View Project <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                  <div className="flex gap-2">
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
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
