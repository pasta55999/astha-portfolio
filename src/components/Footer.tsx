import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Monogram } from "@/components/Monogram";

const year = 2026; // static so the layout can be fully prerendered

export function Footer() {
  const links = [
    { label: "GitHub", href: profile.github.url },
    profile.linkedin && { label: "LinkedIn", href: profile.linkedin },
    profile.twitter && { label: "X / Twitter", href: profile.twitter },
    profile.email && { label: "Email", href: `mailto:${profile.email}` },
    profile.resume && { label: "Resume", href: profile.resume },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <Monogram className="h-8 w-8 text-lime" />
              <span className="font-display text-2xl">{profile.name}</span>
            </div>
            <p className="mt-5 max-w-md text-paper-dim leading-relaxed">
              Generative AI engineer in Dubai. I turn ideas into products, understand the problems behind them, and figure out how to make them useful.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Site</p>
            <ul className="space-y-2 text-sm">
              {[
                ["Work", "/#work"],
                ["All projects", "/projects"],
                ["Inside my thinking", "/#thinking"],
                ["About", "/#about"],
                ["Experience", "/#experience"],
                ["Contact", "/#contact"],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="link-ul text-paper-dim hover:text-paper">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Elsewhere</p>
            <ul className="space-y-2 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="link-ul inline-flex items-center gap-1 text-paper-dim hover:text-paper">
                    {l.label} <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted md:flex-row md:items-center md:justify-between">
          <span>© {year} {profile.name}</span>
          <span>
            Dubai, UAE · <span className="text-lime">what if?</span> → what works
          </span>
        </div>
      </div>
    </footer>
  );
}
