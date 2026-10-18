/** Custom "A" monogram: a node graph folded into a letterform. */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M6 27 16 5l10 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 19h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="5" r="2.4" fill="currentColor" />
      <circle cx="6" cy="27" r="2.4" fill="currentColor" />
      <circle cx="26" cy="27" r="2.4" fill="currentColor" />
      <circle cx="16" cy="19" r="2" fill="var(--ink)" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
