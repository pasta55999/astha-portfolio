"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { Monogram } from "@/components/Monogram";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

export const sections = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [sectionActive, setSectionActive] = useState<string>("top");
  const active = home ? sectionActive : pathname.startsWith("/projects") ? "projects" : "";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!home) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const line = window.scrollY + window.innerHeight * 0.4;
      let current = "top";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= line) current = s.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = "contact";
      setSectionActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [home]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);
  const connectHref = profile.linkedin || profile.github.url;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "border-b border-white/10 bg-[#05010f]/75 backdrop-blur-xl" : "bg-transparent"}`}>
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Primary">
        <Link href="/#top" onClick={() => setOpen(false)} className="group flex items-center gap-2.5" aria-label={`${profile.name} — home`}>
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-600/40 to-indigo-600/30 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105">
            <Monogram className="h-6 w-6 text-violet-200" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-white">{profile.firstName}</span>
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <Link
                  href={href(s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative text-[15px] transition-colors ${isActive ? "font-medium text-violet-300" : "text-white/70 hover:text-white"}`}
                >
                  {s.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 transition-all duration-300 ${isActive ? "w-full shadow-[0_0_12px_rgba(139,92,246,0.9)]" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <a
            href={connectHref}
            target="_blank"
            rel="noreferrer"
            className="group btn-primary-glow shimmer-sweep inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-600/10 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-600/20"
          >
            Let&apos;s Connect
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="glass flex h-11 w-11 items-center justify-center rounded-xl text-white lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto bg-[#05010f]/95 px-5 pb-10 pt-6 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <Link
                    href={href(s.id)}
                    onClick={() => setOpen(false)}
                    className={`glass flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-medium transition-colors ${active === s.id ? "border-violet-400/50 text-violet-200" : "text-white/85"}`}
                  >
                    {s.label}
                    <span className="font-mono text-xs text-white/40">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <a href={profile.github.url} target="_blank" rel="noreferrer" aria-label="GitHub" className="glass flex h-12 w-12 items-center justify-center rounded-2xl text-violet-200">
                <GithubIcon className="h-5 w-5" />
              </a>
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="glass flex h-12 w-12 items-center justify-center rounded-2xl text-violet-200">
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              )}
              <a href={connectHref} target="_blank" rel="noreferrer" className="btn-gradient btn-primary-glow inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold text-white">
                Let&apos;s Connect <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
