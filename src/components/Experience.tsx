import Link from "next/link";
import { experience } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import { getProject } from "@/data/projects";
import { Reveal, SectionHeader } from "@/components/ui";

const kindLabel = { work: "Work", hackathon: "Hackathon", community: "Community", education: "Education" } as const;

export function Experience() {
  const items = experience.filter((e) => e.verified);
  return (
    <section id="experience" className="scroll-mt-24 border-t border-line bg-ink-2/40">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <SectionHeader
          index="04"
          label="Experience"
          title={
            <>
              Two years of startups, <span className="italic text-paper-dim">a lot of hackathon weekends.</span>
            </>
          }
          intro="Only verified items are shown here. Team projects are labelled as such; individual contributions are spelled out in each case study."
        />

        <ol className="mt-16 border-t border-line">
          {items.map((e, i) => (
            <Reveal as="li" key={`${e.title}-${i}`} delay={i * 0.05} className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-6">
              <div className="md:col-span-3 flex items-baseline gap-4 md:block">
                <span className="font-mono text-xs text-lime">{e.period}</span>
                <span className="eyebrow md:mt-2 md:block">{kindLabel[e.kind]}</span>
              </div>
              <div className="md:col-span-9 md:grid md:grid-cols-9 md:gap-6">
                <div className="md:col-span-4">
                  <h3 className="font-display text-2xl md:text-3xl">{e.title}</h3>
                  <p className="mt-1 text-sm text-paper-dim">{e.org}</p>
                </div>
                <div className="md:col-span-5 mt-3 md:mt-0">
                  <p className="text-paper-dim leading-relaxed">{e.summary}</p>
                  {e.bullets && (
                    <ul className="mt-3 space-y-1.5 text-sm text-muted">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lime" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Skills />
      </div>
    </section>
  );
}

function Skills() {
  return (
    <div id="skills" className="mt-28 scroll-mt-24">
      <Reveal className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="eyebrow">Capabilities</p>
        </div>
        <div className="md:col-span-9">
          <h3 className="font-display text-4xl md:text-5xl">
            No progress bars. <span className="italic text-paper-dim">Every skill points at the project that proves it.</span>
          </h3>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-px bg-line md:grid-cols-2">
        {skillGroups.map((g, gi) => (
          <Reveal key={g.title} delay={gi * 0.05} className="bg-ink p-6 md:p-8">
            <h4 className="font-display text-2xl">{g.title}</h4>
            <p className="mt-1 text-sm text-muted">{g.blurb}</p>
            <ul className="mt-6 divide-y divide-line">
              {g.skills.map((s) => {
                const p = s.evidence ? getProject(s.evidence) : undefined;
                return (
                  <li key={s.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5">
                    <span className="text-paper">{s.name}</span>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                      {s.note && <span className="mr-3 hidden normal-case tracking-normal sm:inline">{s.note}</span>}
                      {p ? (
                        <Link href={`/projects/${p.slug}`} className="link-ul text-paper-dim hover:text-paper">
                          → {p.name}
                        </Link>
                      ) : null}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
