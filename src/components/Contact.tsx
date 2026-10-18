import { ArrowUpRight, Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui";

export function Contact() {
  const channels = [
    profile.email && { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
    { label: "GitHub", value: `github.com/${profile.github.handle}`, href: profile.github.url, Icon: GithubIcon },
    profile.linkedin && { label: "LinkedIn", value: profile.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: profile.linkedin, Icon: LinkedinIcon },
    profile.resume && { label: "Resume", value: "Download PDF", href: profile.resume, Icon: FileText },
  ].filter(Boolean) as { label: string; value: string; href: string; Icon: typeof Mail }[];

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="flex items-start gap-3">
              <span className="font-mono text-xs text-lime">05</span>
              <span className="eyebrow pt-0.5">Contact</span>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.92]">
              Building something <span className="italic text-paper-dim">ambitious?</span>
              <br />
              Let&apos;s <span className="text-lime">talk.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper-dim">
              I&apos;m most useful on early, ambiguous problems where AI could make something genuinely easier — and where someone needs to get from idea to working prototype fast. Founders, hiring managers and fellow builders in Dubai or anywhere: say hi.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5 md:pt-24">
            <ul className="divide-y divide-line border-y border-line">
              {channels.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 py-5 transition-colors hover:text-lime"
                  >
                    <Icon className="h-4 w-4 text-muted group-hover:text-lime" />
                    <span className="eyebrow w-20">{label}</span>
                    <span className="flex-1 truncate">{value}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
            {!profile.email && (
              <p className="mt-4 font-mono text-[0.62rem] text-muted">
                {/* Shown until an email/LinkedIn is set in src/data/profile.ts */}
                More ways to reach me coming soon — GitHub is the fastest route for now.
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
