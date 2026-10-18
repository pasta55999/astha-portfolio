import Image from "next/image";
import { profile } from "@/data/profile";
import { Reveal, SectionHeader } from "@/components/ui";
import { Monogram } from "@/components/Monogram";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <SectionHeader
          index="03"
          label="About"
          title={
            <>
              Engineer first. <span className="italic text-paper-dim">Curious about everything around the engineering.</span>
            </>
          }
        />

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <div className="relative aspect-[4/5] overflow-hidden border border-line bg-ink-2">
              {profile.portrait ? (
                <Image src={profile.portrait} alt={`Portrait of ${profile.name}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              ) : (
                <div className="flex h-full w-full flex-col items-start justify-between p-6">
                  <Monogram className="h-16 w-16 text-lime" />
                  <div>
                    <p className="font-display text-4xl leading-none">{profile.name}</p>
                    <p className="eyebrow mt-3">Dubai, UAE · GenAI engineer</p>
                  </div>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 border-[12px] border-ink" aria-hidden />
            </div>
          </Reveal>

          <div className="md:col-span-8 md:pl-6">
            <div className="space-y-6 text-lg leading-relaxed text-paper md:text-xl">
              {profile.about.map((p, i) => (
                <Reveal as="p" key={i} delay={i * 0.08} className={i === 0 ? "font-display text-3xl leading-snug md:text-4xl" : "text-paper-dim"}>
                  {p}
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-16">
              <p className="eyebrow">Things I&apos;m exploring</p>
              <ul className="mt-5 grid gap-px bg-line sm:grid-cols-2">
                {profile.exploring.map((e) => (
                  <li key={e.topic} className="bg-ink p-5">
                    <p className="text-paper">{e.topic}</p>
                    <p className="mt-1.5 text-sm text-muted leading-relaxed">{e.note}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
