import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, accentVar } from "@/data/projects";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Reveal, StatusPill, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Projects",
  description: "All projects by Astha Chauhan — agentic AI, voice interfaces, climate-risk intelligence, browser assistants and evaluation loops, each with an honest status.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-32 md:px-10 md:pt-40">
      <Reveal>
        <p className="eyebrow text-lime">Index</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">
          All projects, <span className="italic text-paper-dim">{projects.length} and counting.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-paper-dim leading-relaxed md:text-lg">
          Every entry links to its repository where one is public and states exactly what is built versus planned. Add a project in <code className="font-mono text-sm text-paper">src/data/projects.ts</code> and it appears here automatically.
        </p>
      </Reveal>

      <ul className="mt-16 grid gap-px bg-line md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={(i % 2) * 0.06} className="bg-ink">
            <Link href={`/projects/${p.slug}`} className="group flex h-full flex-col p-6 md:p-8">
              <ProjectVisual visual={p.visual} accent={p.accent} className="aspect-[16/10] transition-transform duration-700 group-hover:-translate-y-1" />
              <div className="mt-6 flex items-center gap-3">
                <span className="font-mono text-xs" style={{ color: accentVar[p.accent] }}>
                  {p.number}
                </span>
                <StatusPill status={p.status} accent={p.accent} />
                <span className="ml-auto font-mono text-[0.62rem] text-muted">{p.year}</span>
              </div>
              <h2 className="mt-4 font-display text-4xl">
                <span className="link-ul">{p.name}</span>
              </h2>
              <p className="mt-3 text-paper-dim leading-relaxed">{p.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                {p.category.map((c) => (
                  <Tag key={c} accent={p.accent}>
                    {c}
                  </Tag>
                ))}
              </div>
              <span className="mt-auto inline-flex items-center gap-1 pt-6 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted group-hover:text-paper">
                Case study <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
