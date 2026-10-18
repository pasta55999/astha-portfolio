import Link from "next/link";
import { ArrowUpRight, Play, Globe } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { featuredProjects, moreProjects, experiments, accentVar, type Project } from "@/data/projects";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Reveal, SectionHeader, StatusPill, Tag, Button } from "@/components/ui";

export function ProjectShowcase() {
  return (
    <section id="work" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <SectionHeader
          index="01"
          label="Selected work"
          title={
            <>
              Products, not demos — <span className="italic text-paper-dim">with the honest status attached.</span>
            </>
          }
          intro="Four featured builds and three more below, each with a full case study: the problem, the thinking, what I actually built, and what's still missing."
        />

        <div className="mt-20 flex flex-col gap-28 md:gap-40">
          {featuredProjects.map((p, i) => (
            <FeatureRow key={p.slug} project={p} index={i} />
          ))}
        </div>

        <MoreBuilds />
        <Experiments />
      </div>
    </section>
  );
}

function Links({ project, light }: { project: Project; light?: boolean }) {
  const cls = `inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] ${light ? "text-paper-dim hover:text-paper" : "text-muted hover:text-paper"} transition-colors`;
  const { repo, demo, video } = project.links;
  return (
    <div className="flex flex-wrap gap-5">
      {repo && (
        <a href={repo} target="_blank" rel="noreferrer" className={cls}>
          <GithubIcon className="h-3.5 w-3.5" /> Repository
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noreferrer" className={cls}>
          <Globe className="h-3.5 w-3.5" /> Live demo
        </a>
      )}
      {video && (
        <a href={video} target="_blank" rel="noreferrer" className={cls}>
          <Play className="h-3.5 w-3.5" /> Demo video
        </a>
      )}
    </div>
  );
}

/** Four distinct layouts, chosen by index so each featured project reads differently. */
function FeatureRow({ project: p, index }: { project: Project; index: number }) {
  const accent = accentVar[p.accent];
  const layout = index % 4;

  const Header = (
    <div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs" style={{ color: accent }}>
          {p.number}
        </span>
        <StatusPill status={p.status} accent={p.accent} />
      </div>
      <h3 className="mt-5 font-display text-5xl md:text-7xl">
        <Link href={`/projects/${p.slug}`} className="link-ul">
          {p.name}
        </Link>
      </h3>
      <p className="mt-4 text-xl leading-snug text-paper md:text-2xl text-balance">{p.tagline}</p>
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
        {p.category.map((c) => (
          <Tag key={c} accent={p.accent}>
            {c}
          </Tag>
        ))}
      </div>
    </div>
  );

  const Body = (
    <div>
      <p className="text-paper-dim leading-relaxed md:text-lg">{p.summary}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {p.stack.slice(0, 6).map((s) => (
          <li key={s} className="border border-line px-2 py-1 font-mono text-[0.62rem] text-paper-dim">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Button href={`/projects/${p.slug}`} variant="ghost">
          Read the case study
        </Button>
        <Links project={p} />
      </div>
    </div>
  );

  const Visual = (
    <Link href={`/projects/${p.slug}`} className="group block" aria-label={`${p.name} case study`}>
      <ProjectVisual visual={p.visual} accent={p.accent} className={`aspect-[4/3] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-1 ${index % 4 === 0 ? "md:aspect-[16/7]" : "md:aspect-[16/11]"}`} />
    </Link>
  );

  if (layout === 0)
    // Full-bleed: visual spans wide, text below in two columns
    return (
      <Reveal as="div" className="grid gap-8">
        {Visual}
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6">{Header}</div>
          <div className="md:col-span-6 md:pt-14">{Body}</div>
        </div>
      </Reveal>
    );

  if (layout === 1)
    // Text left, visual right, offset
    return (
      <Reveal as="div" className="grid items-start gap-8 md:grid-cols-12">
        <div className="md:col-span-5 md:sticky md:top-28">
          {Header}
          <div className="mt-10">{Body}</div>
        </div>
        <div className="md:col-span-7 md:pl-10 md:pt-24">{Visual}</div>
      </Reveal>
    );

  if (layout === 2)
    // Visual left, accent block, text right
    return (
      <Reveal as="div" className="grid items-start gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="relative">
            <div className="absolute -left-3 -top-3 h-full w-full border md:-left-5 md:-top-5" style={{ borderColor: `color-mix(in srgb, ${accent} 40%, transparent)` }} aria-hidden />
            {Visual}
          </div>
        </div>
        <div className="md:col-span-5 md:pl-6 md:pt-10">
          {Header}
          <div className="mt-10">{Body}</div>
        </div>
      </Reveal>
    );

  // layout 3: header full width, then visual + body side by side
  return (
    <Reveal as="div" className="grid gap-10">
      <div className="max-w-3xl">{Header}</div>
      <div className="grid items-start gap-8 md:grid-cols-12">
        <div className="md:col-span-7">{Visual}</div>
        <div className="md:col-span-5 md:pl-6">{Body}</div>
      </div>
    </Reveal>
  );
}

function MoreBuilds() {
  return (
    <div className="mt-32 md:mt-44">
      <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
        <div>
          <p className="eyebrow">More builds</p>
          <h3 className="mt-3 font-display text-4xl md:text-5xl">Deeper, quieter engineering.</h3>
        </div>
        <Link href="/projects" className="link-ul inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.16em] text-paper-dim hover:text-paper">
          All projects <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
      <ul className="divide-y divide-line">
        {moreProjects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 0.06}>
            <Link href={`/projects/${p.slug}`} className="group grid gap-6 py-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-1 font-mono text-xs" style={{ color: accentVar[p.accent] }}>
                {p.number}
              </div>
              <div className="md:col-span-4">
                <h4 className="font-display text-3xl md:text-4xl">
                  <span className="link-ul">{p.name}</span>
                </h4>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <StatusPill status={p.status} accent={p.accent} />
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">{p.category.join(" · ")}</span>
                </div>
              </div>
              <p className="md:col-span-4 text-paper-dim leading-relaxed">{p.tagline}</p>
              <div className="md:col-span-3 md:justify-self-end">
                <ProjectVisual visual={p.visual} accent={p.accent} compact className="h-32 w-full md:w-56 transition-transform duration-700 group-hover:-translate-y-1" />
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

function Experiments() {
  return (
    <div className="mt-24 md:mt-32">
      <Reveal className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">Experiments</p>
          <h3 className="mt-3 font-display text-4xl md:text-5xl">
            Not products. <span className="italic text-paper-dim">Yet.</span>
          </h3>
          <p className="mt-4 text-paper-dim leading-relaxed">Directions I&apos;m actively poking at. Labelled honestly: no users, no benchmarks, no claims.</p>
        </div>
        <ul className="md:col-span-8 grid gap-px bg-line sm:grid-cols-2">
          {experiments.map((e) => (
            <li key={e.title} className="bg-ink p-6">
              <div className="flex items-center justify-between">
                <span className="eyebrow">{e.area}</span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-lime">{e.status}</span>
              </div>
              <h4 className="mt-3 font-display text-2xl">{e.title}</h4>
              <p className="mt-2 text-sm text-paper-dim leading-relaxed">{e.note}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
