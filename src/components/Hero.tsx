"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui";
import { SystemCanvas } from "@/components/SystemCanvas";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease },
  });

  return (
    <section className="relative min-h-[100svh] overflow-hidden" aria-labelledby="hero-title">
      {/* interactive canvas, pinned right on desktop, behind on mobile */}
      <div className="pointer-events-none absolute inset-0 md:pointer-events-auto md:left-[46%]">
        <SystemCanvas className="h-full w-full opacity-70 md:opacity-100" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent md:from-ink md:via-transparent md:to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-20">
        <motion.p {...fade(0.05)} className="eyebrow text-lime">
          {profile.eyebrow}
        </motion.p>

        <h1 id="hero-title" className="mt-6 font-display text-[clamp(2.9rem,9.5vw,8.5rem)] leading-[0.92]">
          <motion.span {...fade(0.15)} className="block">
            {profile.headline[0]}
          </motion.span>
          <motion.span {...fade(0.28)} className="block">
            <span className="italic text-paper-dim">Built to</span> make things <span className="text-lime">happen.</span>
          </motion.span>
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <motion.p {...fade(0.42)} className="md:col-span-6 max-w-xl text-lg leading-relaxed text-paper-dim md:text-xl">
            {profile.intro}
          </motion.p>
          <motion.div {...fade(0.52)} className="md:col-span-6 flex flex-wrap items-center gap-3 md:justify-end">
            <Button href="#work">Explore my work</Button>
            <Button href="#contact" variant="ghost">
              Let&apos;s connect
            </Button>
          </motion.div>
        </div>

        <motion.div {...fade(0.7)} className="mt-14 flex flex-col gap-4 border-t border-line pt-5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted sm:flex-row sm:items-center sm:justify-between">
          {profile.currentFocus ? (
            <span className="inline-flex items-center gap-2.5">
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-lime text-lime pulse" />
              <span className="text-paper-dim">{profile.currentFocus.label}:</span> {profile.currentFocus.text}
            </span>
          ) : (
            <span />
          )}
          <a href="#work" className="inline-flex items-center gap-2 hover:text-paper transition-colors">
            Scroll <ArrowDown className="h-3.5 w-3.5 motion-safe:animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
