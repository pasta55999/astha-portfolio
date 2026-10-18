"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode, type CSSProperties, type HTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";
import { type Status, statusLabel } from "@/data/projects";

/** Scroll-triggered reveal using IntersectionObserver + CSS (respects reduced motion via CSS). */
export function Reveal({ children, delay = 0, className = "", as: Tag = "div", style, ...rest }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "section" | "li" | "p" | "article" } & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const T = Tag as "div";
  return (
    <T ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms`, ...style } as CSSProperties} {...rest}>
      {children}
    </T>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function Heading({ children, className = "", size = "lg", center }: { children: ReactNode; className?: string; size?: "lg" | "md"; center?: boolean }) {
  const s = size === "lg" ? "text-[clamp(2.5rem,5vw,4rem)] leading-[1.05]" : "text-[clamp(2rem,5vw,3.5rem)] leading-tight";
  return <h2 className={`font-display font-extrabold tracking-tight text-white ${s} ${center ? "text-center" : ""} ${className}`}>{children}</h2>;
}

export function GradientText({ children }: { children: ReactNode }) {
  return <span className="text-gradient-accent">{children}</span>;
}

export function PrimaryButton({ href, children, external, className = "", rounded = "rounded-2xl" }: { href: string; children: ReactNode; external?: boolean; className?: string; rounded?: string }) {
  const cls = `btn-primary-glow shimmer-sweep btn-gradient group inline-flex items-center gap-2.5 ${rounded} px-7 py-3.5 text-[15px] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 ${className}`;
  const inner = (
    <>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function GhostButton({ href, children, external, className = "", icon }: { href: string; children: ReactNode; external?: boolean; className?: string; icon?: ReactNode }) {
  const cls = `group inline-flex items-center gap-2.5 rounded-2xl border border-white/20 bg-white/[0.03] px-7 py-3.5 text-[15px] font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:border-violet-300/50 hover:bg-violet-500/10 hover:text-white ${className}`;
  const inner = (
    <>
      {icon}
      {children}
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function StatusPill({ status }: { status: Status }) {
  const color: Record<Status, string> = {
    idea: "bg-white/40",
    concept: "bg-amber-300",
    prototype: "bg-violet-400",
    "working-demo": "bg-emerald-400",
    deployed: "bg-emerald-400",
  };
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-white/80">
      <span className={`h-1.5 w-1.5 rounded-full ${color[status]}`} />
      {statusLabel[status]}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}

/** Decorative section background: nebula glows + grid + noise, with fades top/bottom. */
export function SectionBackdrop({ variant = "a", fadeTop = true, fadeBottom = true }: { variant?: "a" | "b" | "c"; fadeTop?: boolean; fadeBottom?: boolean }) {
  const blobs = {
    a: [
      "left-[-10%] top-[-10%] h-[60vh] w-[60vh] bg-violet-600/30",
      "right-[-15%] top-[20%] h-[70vh] w-[70vh] bg-indigo-600/25",
      "left-[30%] bottom-[-20%] h-[50vh] w-[50vh] bg-fuchsia-600/15",
    ],
    b: [
      "right-[-10%] top-[-20%] h-[70vh] w-[70vh] bg-indigo-600/25",
      "left-[-15%] bottom-[-10%] h-[60vh] w-[60vh] bg-violet-600/25",
      "left-[45%] top-[30%] h-[40vh] w-[40vh] bg-blue-600/12",
    ],
    c: [
      "left-[10%] top-[-20%] h-[60vh] w-[60vh] bg-violet-700/25",
      "right-[-10%] bottom-[-20%] h-[70vh] w-[70vh] bg-indigo-700/25",
    ],
  }[variant];
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {blobs.map((b, i) => (
        <div key={i} className={`absolute rounded-full blur-3xl ${i % 2 ? "animate-blob-2" : "animate-blob"} ${b}`} />
      ))}
      <div className="grid-lines absolute inset-0" />
      <div className="noise-overlay absolute inset-0" />
      {fadeTop && <div className="fade-top absolute inset-x-0 top-0 h-32" />}
      {fadeBottom && <div className="fade-bottom absolute inset-x-0 bottom-0 h-40" />}
    </div>
  );
}
