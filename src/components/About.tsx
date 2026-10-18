import Image from "next/image";
import { Sparkles, Cpu, MapPin, GraduationCap, Brain, Bot, Mic, FlaskConical, Rocket, Compass, Layers, Trophy, Clock, Lightbulb } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal, Eyebrow, Heading, GradientText, SectionBackdrop } from "@/components/ui";

const icons = { cpu: Cpu, map: MapPin, graduation: GraduationCap, brain: Brain, bot: Bot, mic: Mic, flask: FlaskConical, rocket: Rocket, compass: Compass } as const;
const statIcons = [Layers, Trophy, Clock, Lightbulb];

export function About() {
  const a = profile.about;
  return (
    <div className="relative overflow-hidden">
      <SectionBackdrop variant="b" />
      <section id="about" className="relative z-10 flex min-h-[100vh] scroll-mt-20 flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-14 pt-28 sm:px-8 lg:pt-36">
          <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal className="min-w-0">
              <Eyebrow>{"// 01. About me"}</Eyebrow>
              <Heading className="mt-5">
                {a.heading[0]}
                <br className="hidden sm:inline" /> {a.heading[1]} <GradientText>{a.heading[2]}</GradientText>
              </Heading>
              <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-white/60 sm:text-lg">
                {a.paragraphs.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>

              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {a.facts.map((f) => {
                  const Icon = icons[f.icon as keyof typeof icons];
                  return (
                    <div key={f.title} className="glass rounded-2xl px-4 py-3.5 transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/85">
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="mt-3 text-[15px] font-bold leading-tight text-white">{f.title}</p>
                      <p className="mt-1 text-xs leading-snug text-white/50">{f.sub}</p>
                    </div>
                  );
                })}
              </div>

              <figure className="mt-9">
                <blockquote className="font-hand text-[30px] leading-tight text-white lg:text-[34px]">“{a.quote}”</blockquote>
              </figure>
            </Reveal>

            <Reveal delay={120} className="glass w-full max-w-md rounded-3xl p-5 shadow-[0_24px_70px_rgba(0,0,0,0.45)] lg:ml-auto lg:p-6">
              {profile.portrait && (
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={profile.portrait} alt={`Portrait of ${profile.name}`} fill sizes="(min-width:1024px) 28rem, 100vw" className="object-cover" />
                </div>
              )}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white sm:text-xl">What I Enjoy</h3>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300 shadow-[0_0_16px_rgba(139,92,246,0.3)]">
                  <Sparkles className="h-4 w-4" />
                </span>
              </div>
              <ul className="mt-4 space-y-2.5">
                {a.enjoy.map((e) => {
                  const Icon = icons[e.icon as keyof typeof icons];
                  return (
                    <li key={e.label} className="group flex items-center gap-3.5 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3.5 py-2.5 transition-all duration-300 hover:border-violet-400/45 hover:bg-violet-500/10">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300 shadow-[0_0_14px_rgba(139,92,246,0.3)] transition-all duration-300 group-hover:bg-violet-500/25 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-white/85 sm:text-[15px]">{e.label}</span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={80} className="glass mt-14 rounded-2xl px-5 py-4 shadow-[0_24px_70px_rgba(0,0,0,0.45)] sm:px-6">
            <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:divide-x sm:divide-white/10">
              {profile.stats.map((s, i) => {
                const Icon = statIcons[i % statIcons.length];
                return (
                  <div key={s.label} className="flex min-w-0 items-center gap-3 px-1 sm:px-5 sm:first:pl-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white/85">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="font-display block text-xl font-bold leading-tight text-white sm:text-2xl">{s.value}</span>
                      <span className="block break-words text-xs text-white/50">{s.label}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
