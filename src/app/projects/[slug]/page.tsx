import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Globe, Play, BookOpen, Users, Layers, Activity } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { projects, getProject, accentVar, statusLabel } from "@/data/projects";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Reveal, StatusPill, GradientText, SectionBackdrop } from "@/components/ui";
import { CaseStudyNav } from "@/components/CaseStudyNav";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.name} — case study`, description: p.tagline, openGraph: { title: `${p.name} — ${p.category.join(" · ")}`, description: p.tagline } };
}

const sections = [
  ["problem", "The problem"],
  ["insight", "The insight"],
  ["solution", "The solution"],
  ["contribution", "My contribution"],
  ["implementation", "Technical implementation"],
  ["decisions", "Key engineering decisions"],
  ["challenges", "Challenges & iteration"],
  ["status", "Current status"],
  ["next", "Next steps"],
] as const;

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[100svh]" aria-busy="true" />}>
      <ProjectArticle params={params} />
    </Suspense>
  );
}

async function ProjectArticle({ params }: { params: PageProps<"/projects/[slug]">["params"] }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const accent = accentVar[p.accent];
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const cs = p.caseStudy;
  const { repo, demo, video, docs } = p.links;
  const linkCls = "pill px-4 py-2.5 text-[13px] font-medium text-white/85";

  return (
    <article style={{ ["--accent" as string]: accent }} className="relative overflow-hidden">
      <SectionBackdrop variant="a" fadeTop={false} />

      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-28 sm:px-8 md:pt-36">
          <Reveal>
            <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Back to projects
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="eyebrow">{`// Project ${p.number}`}</span>
              <StatusPill status={p.status} />
              <span className="font-mono text-xs text-white/50">{p.year}</span>
            </div>
            <h1 className="font-display mt-5 text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight text-white">{p.name}</h1>
            <p className="mt-5 max-w-3xl text-xl leading-snug text-white/80 sm:text-2xl">{p.tagline}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.category.map((c) => (
                <span key={c} className="tag">
                  {c}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="card overflow-hidden rounded-3xl lg:col-span-8">
              <ProjectVisual visual={p.visual} accent={p.accent} className="aspect-[16/10]" />
            </div>
            <aside className="glass flex flex-col gap-5 rounded-3xl p-5 text-sm lg:col-span-4">
              <div>
                <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-violet-300/80">
                  <Activity className="h-3.5 w-3.5" /> STATUS
                </p>
                <p className="mt-2 leading-relaxed text-white/70">{p.statusNote}</p>
              </div>
              <div>
                <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-violet-300/80">
                  <Users className="h-3.5 w-3.5" /> TEAM
                </p>
                <p className="mt-2 text-white/70">{p.team}</p>
              </div>
              <div>
                <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-violet-300/80">
                  <Layers className="h-3.5 w-3.5" /> STACK
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-white/70">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {repo && (
                  <a href={repo} target="_blank" rel="noreferrer" className={linkCls}>
                    <GithubIcon className="h-4 w-4" /> Repository
                  </a>
                )}
                {demo && (
                  <a href={demo} target="_blank" rel="noreferrer" className={linkCls}>
                    <Globe className="h-4 w-4" /> Live demo
                  </a>
                )}
                {video && (
                  <a href={video} target="_blank" rel="noreferrer" className={linkCls}>
                    <Play className="h-4 w-4" /> Demo video
                  </a>
                )}
                {docs && (
                  <a href={docs} target="_blank" rel="noreferrer" className={linkCls}>
                    <BookOpen className="h-4 w-4" /> Docs
                  </a>
                )}
                {!repo && !demo && !video && <span className="font-mono text-[11px] text-white/45">Repository link coming soon.</span>}
              </div>
            </aside>
          </Reveal>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12 md:py-20">
        <CaseStudyNav sections={sections.map(([id, label]) => ({ id, label }))} />

        <div className="min-w-0 space-y-20 md:col-span-9 md:col-start-4">
          <Block id="problem" n="01" title="The problem" paras={cs.problem} />
          <Block id="insight" n="02" title="The insight" paras={cs.insight} lead />
          <Block id="solution" n="03" title="The solution" paras={cs.solution}>
            <Flow steps={cs.flow} />
          </Block>
          <Block id="contribution" n="04" title="My contribution" list={cs.contribution} note={p.team} />
          <Block id="implementation" n="05" title="Technical implementation" paras={cs.implementation}>
            {cs.code && (
              <figure className="card mt-8 overflow-hidden rounded-2xl">
                <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                  <span className="flex items-center gap-2">
                    <span className="flex gap-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-300/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                    </span>
                    {cs.code.title}
                  </span>
                  <span>{cs.code.lang}</span>
                </figcaption>
                <pre className="overflow-x-auto bg-black/30 p-4 text-[0.78rem] leading-relaxed text-violet-100/85">
                  <code>{cs.code.code}</code>
                </pre>
                {cs.code.note && <p className="border-t border-white/10 px-4 py-3 text-sm text-white/55">{cs.code.note}</p>}
              </figure>
            )}
          </Block>

          <section id="decisions" className="scroll-mt-28">
            <BlockHeading n="06" title="Key engineering decisions" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {cs.decisions.map((d, i) => (
                <Reveal key={d.title} delay={i * 60} className="card rounded-2xl p-5">
                  <span className="font-mono text-[11px] text-violet-300">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display mt-2 text-lg font-bold leading-tight text-white">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{d.body}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <Block id="challenges" n="07" title="Challenges & iteration" list={cs.challenges} />

          <section id="status" className="scroll-mt-28">
            <BlockHeading n="08" title="Current status" />
            <Reveal className="glass mt-6 rounded-2xl border-l-4 p-5" style={{ borderLeftColor: accent }}>
              <p className="font-display text-2xl font-bold text-white">{statusLabel[p.status]}</p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">{p.statusNote}</p>
            </Reveal>
          </section>

          <Block id="next" n="09" title="Next steps" list={cs.next} />
        </div>
      </div>

      <nav aria-label="Other projects" className="relative z-10 border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-10 sm:px-8 md:grid-cols-2">
          <Link href={`/projects/${prev.slug}`} className="card group flex items-center justify-between gap-6 rounded-2xl p-6">
            <div>
              <span className="eyebrow inline-flex items-center gap-2 !text-[11px]">
                <ArrowLeft className="h-3 w-3" /> Previous
              </span>
              <p className="font-display mt-2 text-2xl font-bold text-white sm:text-3xl">{prev.name}</p>
            </div>
          </Link>
          <Link href={`/projects/${next.slug}`} className="card group flex items-center justify-between gap-6 rounded-2xl p-6 text-right">
            <div className="ml-auto">
              <span className="eyebrow inline-flex items-center gap-2 !text-[11px]">
                Next <ArrowRight className="h-3 w-3" />
              </span>
              <p className="font-display mt-2 text-2xl font-bold text-white sm:text-3xl">{next.name}</p>
            </div>
          </Link>
        </div>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 pb-10 sm:px-8">
          <Link href="/projects" className="text-sm text-white/60 hover:text-white">
            All projects
          </Link>
          <Link href="/#thinking" className="inline-flex items-center gap-1 text-sm font-semibold text-violet-300 hover:text-white">
            See the reasoning <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>
    </article>
  );
}

function BlockHeading({ n, title }: { n: string; title: string }) {
  return (
    <Reveal className="flex items-baseline gap-4">
      <span className="font-mono text-xs text-violet-300">{n}</span>
      <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
    </Reveal>
  );
}

function Block({ id, n, title, paras, list, lead, note, children }: { id: string; n: string; title: string; paras?: string[]; list?: string[]; lead?: boolean; note?: string; children?: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <BlockHeading n={n} title={title} />
      <div className="mt-6 max-w-3xl space-y-4">
        {paras?.map((t, i) => (
          <Reveal as="p" key={i} delay={i * 40} className={lead && i === 0 ? "text-lg font-medium leading-relaxed text-white sm:text-xl" : "leading-relaxed text-white/65 sm:text-[17px]"}>
            {t}
          </Reveal>
        ))}
        {list && (
          <ul className="space-y-3">
            {list.map((t, i) => (
              <Reveal as="li" key={i} delay={i * 40} className="flex gap-3 leading-relaxed text-white/65 sm:text-[17px]">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                <span>{t}</span>
              </Reveal>
            ))}
          </ul>
        )}
        {note && <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">{note}</p>}
      </div>
      {children}
    </section>
  );
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <Reveal className="glass mt-8 rounded-2xl p-5">
      <p className="font-mono text-[11px] tracking-[0.25em] text-violet-300/80">HOW A REQUEST MOVES THROUGH THE SYSTEM</p>
      <ol className="mt-4 flex flex-wrap items-stretch gap-2">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[13px] text-white/85">
              <span className="mr-2 font-mono text-violet-300">{i + 1}</span>
              {s}
            </span>
            {i < steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-white/35" aria-hidden />}
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-white/40">
        <GradientText>Interactive walkthrough</GradientText> of this reasoning is on the home page under “Inside my thinking”.
      </p>
    </Reveal>
  );
}
