import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Globe, Play, BookOpen } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { projects, getProject, accentVar, statusLabel } from "@/data/projects";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Reveal, StatusPill, Tag } from "@/components/ui";
import { CaseStudyNav } from "@/components/CaseStudyNav";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.name} — case study`,
    description: p.tagline,
    openGraph: { title: `${p.name} — ${p.category.join(" · ")}`, description: p.tagline },
  };
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

  const linkCls = "inline-flex items-center gap-2 border border-line-strong px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] hover:bg-paper hover:text-ink transition-colors";

  return (
    <article style={{ ["--accent" as string]: accent }}>
      {/* header */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ background: `radial-gradient(50% 60% at 80% 0%, ${accent}, transparent 70%)` }} aria-hidden />
        <div className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-28 md:px-10 md:pt-36">
          <Reveal>
            <Link href="/#work" className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted hover:text-paper">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to work
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs" style={{ color: accent }}>
                Project {p.number}
              </span>
              <StatusPill status={p.status} accent={p.accent} />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">{p.year}</span>
            </div>
            <h1 className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9]">{p.name}</h1>
            <p className="mt-6 max-w-3xl text-2xl leading-snug md:text-3xl text-balance">{p.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1">
              {p.category.map((c) => (
                <Tag key={c} accent={p.accent}>
                  {c}
                </Tag>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <ProjectVisual visual={p.visual} accent={p.accent} className="aspect-[16/10]" />
            </div>
            <dl className="md:col-span-4 grid content-start gap-5 text-sm">
              <div>
                <dt className="eyebrow">Status</dt>
                <dd className="mt-1.5 leading-relaxed text-paper-dim">{p.statusNote}</dd>
              </div>
              <div>
                <dt className="eyebrow">Team</dt>
                <dd className="mt-1.5 text-paper-dim">{p.team}</dd>
              </div>
              <div>
                <dt className="eyebrow">Stack</dt>
                <dd className="mt-1.5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="border border-line px-2 py-0.5 font-mono text-[0.62rem] text-paper-dim">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {repo && (
                  <a href={repo} target="_blank" rel="noreferrer" className={linkCls}>
                    <GithubIcon className="h-3.5 w-3.5" /> Repository
                  </a>
                )}
                {demo && (
                  <a href={demo} target="_blank" rel="noreferrer" className={linkCls}>
                    <Globe className="h-3.5 w-3.5" /> Live demo
                  </a>
                )}
                {video && (
                  <a href={video} target="_blank" rel="noreferrer" className={linkCls}>
                    <Play className="h-3.5 w-3.5" /> Demo video
                  </a>
                )}
                {docs && (
                  <a href={docs} target="_blank" rel="noreferrer" className={linkCls}>
                    <BookOpen className="h-3.5 w-3.5" /> Docs
                  </a>
                )}
                {!repo && !demo && !video && <span className="font-mono text-[0.62rem] text-muted">Repository link coming soon.</span>}
              </div>
            </dl>
          </Reveal>
        </div>
      </header>

      {/* body */}
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
        <CaseStudyNav sections={sections.map(([id, label]) => ({ id, label }))} />

        <div className="min-w-0 md:col-span-9 md:col-start-4 space-y-24">
          <Block id="problem" n="01" title="The problem" paras={cs.problem} />
          <Block id="insight" n="02" title="The insight" paras={cs.insight} lead />
          <Block id="solution" n="03" title="The solution" paras={cs.solution}>
            <Flow steps={cs.flow} />
          </Block>
          <Block id="contribution" n="04" title="My contribution" list={cs.contribution} note={p.team} />
          <Block id="implementation" n="05" title="Technical implementation" paras={cs.implementation}>
            {cs.code && (
              <figure className="mt-10 overflow-hidden border border-line bg-ink-2">
                <figcaption className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                  <span>{cs.code.title}</span>
                  <span>{cs.code.lang}</span>
                </figcaption>
                <pre className="overflow-x-auto p-4 text-[0.78rem] leading-relaxed text-paper-dim">
                  <code>{cs.code.code}</code>
                </pre>
                {cs.code.note && <p className="border-t border-line px-4 py-3 text-sm text-muted">{cs.code.note}</p>}
              </figure>
            )}
          </Block>

          <section id="decisions" className="scroll-mt-28">
            <Heading n="06" title="Key engineering decisions" />
            <div className="mt-8 grid gap-px bg-line sm:grid-cols-2">
              {cs.decisions.map((d, i) => (
                <Reveal key={d.title} delay={i * 0.05} className="bg-ink p-6">
                  <span className="font-mono text-[0.62rem]" style={{ color: accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-2xl leading-tight">{d.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper-dim">{d.body}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <Block id="challenges" n="07" title="Challenges & iteration" list={cs.challenges} />

          <section id="status" className="scroll-mt-28">
            <Heading n="08" title="Current status" />
            <Reveal className="mt-8 border-l-2 pl-6" style={{ borderColor: accent }}>
              <p className="font-display text-3xl">{statusLabel[p.status]}</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-paper-dim">{p.statusNote}</p>
            </Reveal>
          </section>

          <Block id="next" n="09" title="Next steps" list={cs.next} />
        </div>
      </div>

      {/* prev/next */}
      <nav aria-label="Other projects" className="border-t border-line">
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-2">
          <Link href={`/projects/${prev.slug}`} className="group flex items-center justify-between gap-6 border-b border-line px-5 py-10 md:border-b-0 md:border-r md:px-10">
            <div>
              <span className="eyebrow inline-flex items-center gap-2">
                <ArrowLeft className="h-3 w-3" /> Previous
              </span>
              <p className="mt-3 font-display text-4xl md:text-5xl">{prev.name}</p>
            </div>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group flex items-center justify-between gap-6 px-5 py-10 text-right md:px-10">
            <div className="ml-auto">
              <span className="eyebrow inline-flex items-center gap-2">
                Next <ArrowRight className="h-3 w-3" />
              </span>
              <p className="mt-3 font-display text-4xl md:text-5xl">{next.name}</p>
            </div>
          </Link>
        </div>
        <div className="border-t border-line">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-10">
            <Link href="/projects" className="link-ul font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted hover:text-paper">
              All projects
            </Link>
            <Link href="/#thinking" className="link-ul inline-flex items-center gap-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted hover:text-paper">
              See the reasoning <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>
    </article>
  );
}

function Heading({ n, title }: { n: string; title: string }) {
  return (
    <Reveal className="flex items-baseline gap-4">
      <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
        {n}
      </span>
      <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
    </Reveal>
  );
}

function Block({ id, n, title, paras, list, lead, note, children }: { id: string; n: string; title: string; paras?: string[]; list?: string[]; lead?: boolean; note?: string; children?: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <Heading n={n} title={title} />
      <div className="mt-8 max-w-3xl space-y-5">
        {paras?.map((t, i) => (
          <Reveal as="p" key={i} delay={i * 0.04} className={lead && i === 0 ? "font-display text-2xl leading-snug md:text-3xl" : "leading-relaxed text-paper-dim md:text-lg"}>
            {t}
          </Reveal>
        ))}
        {list && (
          <ul className="space-y-3">
            {list.map((t, i) => (
              <Reveal as="li" key={i} delay={i * 0.04} className="flex gap-4 leading-relaxed text-paper-dim md:text-lg">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                <span>{t}</span>
              </Reveal>
            ))}
          </ul>
        )}
        {note && <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">{note}</p>}
      </div>
      {children}
    </section>
  );
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <Reveal className="mt-10">
      <p className="eyebrow mb-4">How a request moves through the system</p>
      <ol className="flex flex-wrap items-stretch gap-2">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className="border border-line bg-ink-2 px-3 py-2 font-mono text-[0.68rem] text-paper">
              <span className="mr-2" style={{ color: "var(--accent)" }}>
                {i + 1}
              </span>
              {s}
            </span>
            {i < steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-muted" aria-hidden />}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
