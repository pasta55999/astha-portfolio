"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { Monogram } from "@/components/Monogram";

export const sections = [
  { id: "work", label: "Work" },
  { id: "thinking", label: "Thinking" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [sectionActive, setSectionActive] = useState<string>("");
  const active = home ? sectionActive : pathname.startsWith("/projects") ? "work" : "";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!home) return;
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setSectionActive(visible[0].target.id);
        else if (window.scrollY < 200) setSectionActive("");
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1, 0.4] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [home, pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled || open ? "bg-ink/80 backdrop-blur-md" : "bg-transparent"}`}>
      <div className={`mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10 transition-[height] duration-500 ${scrolled ? "h-14" : "h-20"}`}>
        <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-3" aria-label={`${profile.name} — home`}>
          <Monogram className="h-7 w-7 text-lime transition-transform duration-500 group-hover:rotate-90" />
          <span className="font-display text-xl tracking-tight">{profile.firstName}</span>
          <span className="eyebrow hidden sm:inline text-[0.6rem]">/ GenAI engineer</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <Link
                key={s.id}
                href={href(s.id)}
                aria-current={isActive ? "true" : undefined}
                className="relative px-3 py-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper-dim hover:text-paper transition-colors"
              >
                <span className={`mr-1.5 inline-block h-1 w-1 rounded-full align-middle transition-colors ${isActive ? "bg-lime" : "bg-transparent"}`} aria-hidden />
                {s.label}
              </Link>
            );
          })}
          <a
            href={profile.github.url}
            target="_blank"
            rel="noreferrer"
            className="ml-3 inline-flex items-center gap-1 border border-line-strong px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] hover:bg-paper hover:text-ink transition-colors"
          >
            GitHub <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center border border-line-strong"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-x-0 top-14 bottom-0 bg-ink border-t border-line px-5 pt-8 overflow-y-auto"
          >
            <ul className="flex flex-col">
              {sections.map((s, i) => (
                <li key={s.id} className="border-b border-line">
                  <Link
                    href={href(s.id)}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5"
                  >
                    <span className="font-display text-4xl">{s.label}</span>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={profile.github.url}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-lime px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-lime-ink"
            >
              GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
