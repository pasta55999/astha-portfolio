"use client";

import { useEffect, useState } from "react";

/** Sticky in-page navigation for case studies with active-section tracking. */
export function CaseStudyNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <aside className="min-w-0 md:col-span-3 md:row-start-1">
      <nav aria-label="Case study sections" className="glass rounded-2xl p-4 md:sticky md:top-24">
        <p className="font-mono text-[11px] tracking-[0.25em] text-violet-300/80">CONTENTS</p>
        <ol className="mt-3 flex gap-x-2 gap-y-2 overflow-x-auto pb-1 md:flex-col md:gap-0 md:overflow-visible md:pb-0">
          {sections.map((s, i) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] transition-all md:px-2 ${isActive ? "bg-violet-500/15 font-medium text-white" : "text-white/55 hover:text-white"}`}
                >
                  <span className={`font-mono text-[10px] ${isActive ? "text-violet-300" : "text-white/35"}`}>0{i + 1}</span>
                  {s.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
