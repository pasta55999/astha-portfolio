const items = ["Agentic systems", "Voice-first UX", "Arabic · English", "Evaluation loops", "Browser intelligence", "Climate risk", "Rapid prototyping", "Products, not demos"];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="marquee overflow-hidden border-y border-line py-3" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="flex items-center font-mono text-[0.68rem] uppercase tracking-[0.2em] text-paper-dim">
            <span className="px-6">{t}</span>
            <span className="h-1 w-1 rounded-full bg-lime" />
          </span>
        ))}
      </div>
    </div>
  );
}
