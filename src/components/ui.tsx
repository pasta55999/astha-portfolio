"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { type Accent, type Status, accentVar, statusLabel } from "@/data/projects";

/** Fade/slide in when scrolled into view. Respects reduced motion. */
export function Reveal({ children, delay = 0, className = "", as = "div", ...rest }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "section" | "li" | "p" } & Omit<HTMLMotionProps<"div">, "children">) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </M>
  );
}

export function SectionHeader({ index, label, title, intro, className = "" }: { index: string; label: string; title: ReactNode; intro?: ReactNode; className?: string }) {
  return (
    <Reveal className={`grid gap-6 md:grid-cols-12 ${className}`}>
      <div className="md:col-span-3 flex items-start gap-3">
        <span className="font-mono text-xs text-lime">{index}</span>
        <span className="eyebrow pt-0.5">{label}</span>
      </div>
      <div className="md:col-span-9">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-balance">{title}</h2>
        {intro && <p className="mt-5 max-w-2xl text-paper-dim leading-relaxed md:text-lg">{intro}</p>}
      </div>
    </Reveal>
  );
}

type BtnProps = { href: string; children: ReactNode; variant?: "primary" | "ghost"; external?: boolean; className?: string };
export function Button({ href, children, variant = "primary", external, className = "" }: BtnProps) {
  const base = "group inline-flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-300";
  const styles = variant === "primary" ? "bg-lime text-lime-ink hover:bg-paper" : "border border-line-strong text-paper hover:bg-paper hover:text-ink";
  const inner = (
    <>
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );
  if (external)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${base} ${styles} ${className}`}>
        {inner}
      </a>
    );
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {inner}
    </Link>
  );
}

export function StatusPill({ status, accent }: { status: Status; accent?: Accent }) {
  const color = accent ? accentVar[accent] : "var(--paper-dim)";
  return (
    <span className="inline-flex items-center gap-2 border border-line px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-paper-dim">
      <span className="relative inline-block h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {statusLabel[status]}
    </span>
  );
}

export function Tag({ children, accent }: { children: ReactNode; accent?: Accent }) {
  return (
    <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em]" style={{ color: accent ? accentVar[accent] : "var(--muted)" }}>
      {children}
    </span>
  );
}
