import { Briefcase, Trophy, Users, GraduationCap } from "lucide-react";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { Reveal, Eyebrow, Heading, GradientText, SectionBackdrop } from "@/components/ui";

const kind = {
  work: { label: "Work", Icon: Briefcase },
  hackathon: { label: "Hackathon", Icon: Trophy },
  community: { label: "Community", Icon: Users },
  education: { label: "Education", Icon: GraduationCap },
} as const;

export function Experience() {
  const items = experience.filter((e) => e.verified);
  return (
    <div className="relative overflow-hidden">
      <SectionBackdrop variant="b" />
      <section id="experience" className="relative z-10 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 pb-24 pt-24 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr]">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>{"// 03. Experience"}</Eyebrow>
              <Heading className="mt-5">
                Startups, hackathons, <GradientText>and what I shipped.</GradientText>
              </Heading>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">
                Roles, education, and a selection of the 20+ hackathons and incubator programmes I&apos;ve built in. Team builds are labelled, and my individual contribution is spelled out in each project&apos;s case study.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="glass rounded-2xl p-4">
                  <p className="font-display text-2xl font-bold text-white">{profile.stats[1].value}</p>
                  <p className="text-xs text-white/50">{profile.stats[1].label}</p>
                </div>
                <div className="glass rounded-2xl p-4">
                  <p className="font-display text-2xl font-bold text-white">{profile.stats[2].value}</p>
                  <p className="text-xs text-white/50">{profile.stats[2].label}</p>
                </div>
              </div>
              <figure className="mt-8">
                <blockquote className="font-hand text-[28px] leading-tight text-white">“Get from ‘what if?’ to ‘what works’.”</blockquote>
              </figure>
            </Reveal>

            <ol className="relative border-l border-white/10 pl-6 sm:pl-10">
              {items.map((e, i) => {
                const { label, Icon } = kind[e.kind];
                return (
                  <Reveal as="li" key={`${e.title}-${i}`} delay={i * 60} className="relative pb-8 last:pb-0">
                    <span className="absolute -left-[31px] top-5 flex h-4 w-4 items-center justify-center sm:-left-[47px]">
                      <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 shadow-[0_0_14px_rgba(139,92,246,0.9)]" />
                    </span>
                    <article className="card group rounded-2xl p-5 sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-200/90">
                          <Icon className="h-3.5 w-3.5" /> {label}
                        </span>
                        <span className="font-mono text-xs text-white/50">{e.period}</span>
                      </div>
                      {e.award && (
                        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[11px] font-semibold text-amber-300">
                          <Trophy className="h-3.5 w-3.5" /> {e.award}
                        </span>
                      )}
                      <h3 className="font-display mt-4 text-xl font-bold tracking-tight text-white">{e.title}</h3>
                      <p className="mt-1 text-sm text-violet-300/90">{e.org}</p>
                      <p className="mt-3 text-sm leading-relaxed text-white/60">{e.summary}</p>
                      {e.bullets && (
                        <ul className="mt-3 space-y-1.5">
                          {e.bullets.map((b) => (
                            <li key={b} className="flex gap-2.5 text-sm text-white/60">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
