"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, MapPin, Radio, Send, FileText, Check, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { Reveal, Eyebrow, GradientText, SectionBackdrop } from "@/components/ui";

const subjects = ["Project collaboration", "Job opportunity", "Hackathon team", "General question"];

export function Contact() {
  const cards = [
    profile.email && { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail, tone: "bg-gradient-to-br from-violet-500 to-indigo-600" },
    { label: "GitHub", value: `github.com/${profile.github.handle}`, href: profile.github.url, Icon: GithubIcon, tone: "bg-white/10" },
    profile.linkedin && { label: "LinkedIn", value: profile.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: profile.linkedin, Icon: LinkedinIcon, tone: "bg-[#0A66C2]" },
    { label: "Location", value: profile.location, href: "https://www.google.com/maps/place/Dubai", Icon: MapPin, tone: "bg-gradient-to-br from-violet-500 to-indigo-600" },
    profile.resume && { label: "Resume", value: "Download PDF", href: profile.resume, Icon: FileText, tone: "bg-white/10" },
    { label: "Open to", value: "GenAI roles · hackathon teams · collaborations", href: "#contact-form", Icon: Sparkles, tone: "bg-white/10" },
  ].filter(Boolean) as { label: string; value: string; href: string; Icon: typeof Mail; tone: string }[];

  return (
    <div className="relative overflow-hidden">
      <SectionBackdrop variant="a" />
      <section id="contact" className="relative z-10 flex min-h-screen scroll-mt-20 flex-col">
        <div className="relative z-10 flex flex-1 flex-col justify-center">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 lg:px-10 lg:py-28">
            <div className="flex flex-col gap-y-12 md:flex-row md:items-start md:justify-between md:gap-x-10">
              <Reveal className="min-w-0 md:w-[47%] lg:w-[38%] lg:max-w-[560px]">
                <Eyebrow>{"// 04. Contact"}</Eyebrow>
                <h2 className="font-display mt-6 text-[clamp(2rem,3.5vw,3.1rem)] font-extrabold leading-[1.08] tracking-tight text-white">
                  Let&apos;s Build
                  <br />
                  Something
                  <br />
                  Ambitious <GradientText>Together.</GradientText>
                </h2>
                <p className="mt-4 max-w-[475px] text-[16.5px] leading-[1.62] text-white/75 sm:text-[17px]">
                  Have a product idea, a hackathon team that needs a GenAI engineer, or an early, ambiguous problem where AI could make something genuinely easier? I&apos;d love to hear about it.
                </p>
                <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                  {cards.map((c) => (
                    <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/45">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white sm:h-10 sm:w-10 ${c.tone}`}>
                        <c.Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block pr-6 text-[14px] font-bold text-white sm:text-[15px]">{c.label}</span>
                        <span className="mt-0.5 block break-words text-[12px] text-white/55 sm:text-[13px]">{c.value}</span>
                      </span>
                      <ArrowUpRight className="absolute right-3 top-3 h-3.5 w-3.5 text-white/30 transition-all group-hover:text-violet-300" />
                    </a>
                  ))}
                </div>
                <figure className="mt-8 lg:mt-10">
                  <blockquote className="font-hand text-[28px] leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)] sm:text-[32px] lg:text-[34px]">“Let&apos;s turn ideas into working software.”</blockquote>
                  <figcaption className="mt-2 font-mono text-[11px] tracking-[0.3em] text-white/55">— {profile.firstName.toUpperCase()}</figcaption>
                </figure>
              </Reveal>

              <Reveal delay={120} className="min-w-0 md:w-[49%] lg:max-w-[725px] lg:pt-9">
                <ContactForm />
                <div className="mt-8 w-full">
                  <p className="font-mono text-[11.5px] tracking-[0.3em] text-white/60">OTHER WAYS TO CONNECT</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a href={profile.github.url} target="_blank" rel="noreferrer" className="group flex h-[42px] items-center gap-2.5 rounded-full border border-white/10 bg-[#0b0716]/65 px-5 text-[14px] font-medium text-white/85 backdrop-blur-md transition-all hover:border-violet-400/45 hover:text-white">
                      <GithubIcon className="h-4 w-4" /> GitHub
                    </a>
                    {profile.linkedin && (
                      <a href={profile.linkedin} target="_blank" rel="noreferrer" className="group flex h-[42px] items-center gap-2.5 rounded-full border border-white/10 bg-[#0b0716]/65 px-5 text-[14px] font-medium text-white/85 backdrop-blur-md transition-all hover:border-violet-400/45 hover:text-white">
                        <LinkedinIcon className="h-4 w-4" /> LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * The form POSTs to Web3Forms (profile.contactAccessKey), which emails the
 * submission to Astha's inbox — visitors never leave the page. If no key is
 * configured yet, submit shows an inline error instead of falling back to mailto.
 */
function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const field = "mt-2 h-10 w-full rounded-lg border border-white/10 bg-black/40 px-3 text-[14px] text-white placeholder:text-white/35 outline-none transition focus:border-violet-400/60";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (!profile.contactAccessKey) {
      setError("This form isn't wired up yet — reach me on GitHub or LinkedIn below.");
      setState("error");
      return;
    }
    setState("sending");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: profile.contactAccessKey,
          from_name: "Portfolio Contact Form",
          subject: `[Portfolio] ${String(fd.get("subject") || "New message")}`,
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          replyto: String(fd.get("email") || ""),
          message: String(fd.get("message") || ""),
          botcheck: Boolean(fd.get("botcheck")),
        }),
      });
      const data = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Couldn't send — please try again in a moment.");
      }
      form.reset();
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send — please try again in a moment.");
      setState("error");
    }
  };

  return (
    <form id="contact-form" onSubmit={onSubmit} className="scroll-mt-28 mx-auto w-full max-w-[535px] rounded-3xl border border-violet-300/15 bg-[#0a051c]/75 p-6 shadow-[0_0_70px_-15px_rgba(139,92,246,0.4)] backdrop-blur-xl sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/20 text-violet-300 shadow-[0_0_16px_rgba(139,92,246,0.4)]">
          <Radio className="h-3.5 w-3.5" />
        </span>
        <span className="font-mono text-[11.5px] tracking-[0.3em] text-white/70">SEND A MESSAGE</span>
      </div>
      <h3 className="font-display mt-3 text-[clamp(1.85rem,2.6vw,2.6rem)] font-extrabold leading-tight tracking-tight text-white">
        I&apos;m all <GradientText>ears!</GradientText>
      </h3>
      <p className="mt-3 text-[14px] leading-relaxed text-white/60">
        Fill out the form and it lands straight in my inbox — no mail app needed.
      </p>
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-name" className="block text-[13.5px] font-medium text-white/75">
              Your Name
            </label>
            <input id="cf-name" name="name" required placeholder="Jane Doe" className={field} />
          </div>
          <div>
            <label htmlFor="cf-email" className="block text-[13.5px] font-medium text-white/75">
              Your Email
            </label>
            <input id="cf-email" name="email" type="email" required placeholder="jane@example.com" className={field} />
          </div>
        </div>
        <div>
          <label htmlFor="cf-subject" className="block text-[13.5px] font-medium text-white/75">
            Subject
          </label>
          <select id="cf-subject" name="subject" className={field} defaultValue={subjects[0]}>
            {subjects.map((s) => (
              <option key={s} className="bg-[#0a051c] text-white">
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-message" className="block text-[13.5px] font-medium text-white/75">
            Message
          </label>
          <textarea id="cf-message" name="message" required rows={4} placeholder="Tell me about the problem you're working on…" className={`${field} h-auto py-2`} />
        </div>
        {/* Honeypot — invisible to visitors; Web3Forms blocks submissions where it's checked. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="cf-botcheck">Leave this unchecked</label>
          <input id="cf-botcheck" name="botcheck" type="checkbox" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      <button
        type="submit"
        disabled={state === "sending" || state === "sent"}
        className="btn-primary-glow mt-5 flex h-11 w-full items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-80 disabled:hover:translate-y-0"
      >
        {state === "sending" ? (
          "Sending…"
        ) : state === "sent" ? (
          <>
            <Check className="h-4 w-4" /> Message sent
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send Message
          </>
        )}
      </button>
      {state === "sent" && (
        <p className="mt-3 text-[13px] text-emerald-300">Thanks — I&apos;ll get back to you soon.</p>
      )}
      {state === "error" && <p className="mt-3 text-[13px] text-rose-300">{error}</p>}
    </form>
  );
}
