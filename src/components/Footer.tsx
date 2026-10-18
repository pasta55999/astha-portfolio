import Link from "next/link";
import { ArrowRight, ArrowUpRight, Heart } from "lucide-react";
import { profile } from "@/data/profile";
import { Monogram } from "@/components/Monogram";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { GradientText } from "@/components/ui";

const year = 2026; // static so the layout can be fully prerendered

export function Footer() {
  const quick = [
    ["Home", "/#top"],
    ["About", "/#about"],
    ["Projects", "/#projects"],
    ["Skills", "/#skills"],
    ["Experience", "/#experience"],
    ["Contact", "/#contact"],
  ];
  const places = [
    { label: "GitHub", href: profile.github.url },
    profile.linkedin && { label: "LinkedIn", href: profile.linkedin },
    profile.twitter && { label: "X / Twitter", href: profile.twitter },
    { label: "All projects", href: "/projects" },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="nebula absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05010f] via-[#05010f]/40 to-[#05010f]/80" />
        <div className="noise-overlay absolute inset-0" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-8 pt-14 sm:px-8 lg:px-10 lg:pt-16">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-5 py-2 font-mono text-[11px] tracking-[0.32em] text-white/70 backdrop-blur-md">{"// END OF THE JOURNEY"}</span>
          <h2 className="font-display mt-6 text-[clamp(2.4rem,3.6vw,3.4rem)] font-extrabold leading-[1.1] tracking-tight text-white">
            Thanks for <GradientText>Visiting!</GradientText>
          </h2>
          <p className="mt-4 max-w-[580px] text-[16.5px] leading-[1.6] text-white/70 sm:text-[17px]">
            If something here sparked an idea, I&apos;d love to hear it. Stay curious, keep building, and I&apos;ll see you around the internet — or around Dubai.
          </p>
          <div className="mt-8 flex w-full max-w-[620px] items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/25" />
            <Monogram className="h-6 w-6 text-violet-300" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/25" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:mt-10 lg:grid-cols-[1.5fr_1fr_1fr_1.15fr] lg:gap-x-10">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/40 to-indigo-600/30 ring-1 ring-white/10">
                <Monogram className="h-6 w-6 text-violet-200" />
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight text-white">{profile.firstName}</span>
            </div>
            <p className="mt-3.5 max-w-[290px] text-[15px] leading-relaxed text-white/60">Generative AI engineer in Dubai, turning ideas into working software — and understanding the problems behind them.</p>
            <div className="mt-6 flex gap-3">
              <a href={profile.github.url} target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/80 backdrop-blur-md transition-all duration-300 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white">
                <GithubIcon className="h-5 w-5" />
              </a>
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/80 backdrop-blur-md transition-all duration-300 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white">
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
          <div className="min-w-0 lg:border-l lg:border-white/10 lg:pl-10">
            <h4 className="font-display text-[17px] font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2.5">
              {quick.map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="group flex items-center justify-between gap-6 py-0.5 text-[15px] text-white/65 transition-colors hover:text-white">
                    <span>{l}</span>
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 lg:border-l lg:border-white/10 lg:pl-10">
            <h4 className="font-display text-[17px] font-semibold text-white">Other Places</h4>
            <ul className="mt-4 space-y-2.5">
              {places.map((p) => (
                <li key={p.href}>
                  <a href={p.href} target={p.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center justify-between gap-6 py-0.5 text-[15px] text-white/65 transition-colors hover:text-white">
                    <span>{p.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 lg:border-l lg:border-white/10 lg:pl-10">
            <h4 className="font-display text-[17px] font-semibold text-white">Let&apos;s Connect</h4>
            <p className="mt-3 max-w-[280px] text-[15px] leading-relaxed text-white/60">Open to collaborations, interesting problems, hackathon teams and GenAI roles.</p>
            <Link href="/#contact" className="btn-primary-glow group mt-5 inline-flex h-12 items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 px-6 text-[15px] font-semibold text-white">
              Send a Message <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-[#0a051c]/70 px-5 py-3.5 backdrop-blur-md sm:flex-row sm:justify-between">
          <p className="text-center text-[13.5px] text-white/55 sm:text-left">
            © {year} {profile.name}. All rights reserved.
          </p>
          <div className="hidden items-center gap-2.5 md:flex">
            <span className="font-mono text-[11.5px] tracking-[0.28em] text-white/60">
              IDEAS <span className="text-white/30">✕</span> CODE <span className="text-white/30">✕</span> PRODUCTS
            </span>
          </div>
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-[13.5px] text-white/55">
            Made with <Heart className="h-3.5 w-3.5 fill-violet-400 text-violet-400" /> in Dubai <span className="mx-1 text-white/25">|</span> Keep building
          </p>
        </div>
      </div>
    </footer>
  );
}
