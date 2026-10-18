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
      <nav aria-label="Case study sections" className="md:sticky md:top-28">
        <p className="eyebrow mb-4">Contents</p>
        <ol className="flex gap-x-4 gap-y-2 overflow-x-auto pb-2 md:flex-col md:gap-0 md:overflow-visible md:pb-0">
          {sections.map((s, i) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex items-center gap-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors ${isActive ? "text-paper" : "text-muted hover:text-paper-dim"}`}
                >
                  <span className="hidden h-px w-4 transition-all md:block" style={{ background: isActive ? "var(--accent)" : "var(--line)", width: isActive ? 24 : 12 }} />
                  <span className="md:hidden" style={{ color: isActive ? "var(--accent)" : undefined }}>
                    0{i + 1}
                  </span>
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
