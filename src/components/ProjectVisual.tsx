"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mic, Search, Play, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { type Accent, type Visual, accentVar } from "@/data/projects";

type Props = { visual: Visual; accent: Accent; className?: string; compact?: boolean };

export function ProjectVisual({ visual, accent, className = "", compact }: Props) {
  const color = accentVar[accent];
  const V = visuals[visual];
  return (
    <div
      className={`relative overflow-hidden rounded-sm border border-line bg-ink-2 ${className}`}
      style={{ ["--accent" as string]: color, containerType: "inline-size", fontSize: "clamp(11px, 1.35cqw, 19px)" }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-[0.07]" style={{ background: `radial-gradient(60% 60% at 70% 20%, var(--accent), transparent 70%)` }} />
      <V compact={!!compact} />
    </div>
  );
}

const Chrome = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="relative flex h-full flex-col">
    <div className="flex items-center gap-2 border-b border-line px-3 py-2 font-mono text-[0.6em] text-muted">
      <span className="h-2 w-2 rounded-full bg-ink-3" />
      <span className="h-2 w-2 rounded-full bg-ink-3" />
      <span className="h-2 w-2 rounded-full bg-ink-3" />
      <span className="ml-2 truncate">{title}</span>
    </div>
    <div className="relative flex-1 p-3 sm:p-4">{children}</div>
  </div>
);

function useLoop(duration: number) {
  const reduce = useReducedMotion();
  return reduce ? undefined : { repeat: Infinity, duration, ease: "easeInOut" as const };
}

/* ---------- Guidr: browser workspace + voice tutor + pointer ---------- */
function GuidrVisual({ compact }: { compact: boolean }) {
  const loop = useLoop(6);
  const steps = ["Open New Invoice", "Select supplier", "Enter amount", "Confirm & submit"];
  return (
    <Chrome title="nexus-finance.local / accounts-payable">
      <div className="grid h-full grid-cols-5 gap-3">
        <div className="col-span-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-2 w-16 rounded bg-ink-3" />
            <div id="g-new" className="relative rounded px-2 py-1 font-mono text-[0.6em] text-ink" style={{ background: "var(--accent)" }}>
              New Invoice
              <motion.span
                className="absolute -inset-1 rounded border-2"
                style={{ borderColor: "var(--accent)" }}
                animate={loop ? { opacity: [0, 1, 1, 0, 0], scale: [1.2, 1, 1, 1, 1] } : { opacity: 1 }}
                transition={loop ? { ...loop, times: [0, 0.15, 0.4, 0.5, 1] } : undefined}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {["Supplier", "TRN", "Amount (AED)", "Description"].map((f, i) => (
              <div key={f} className={`rounded border border-line px-2 py-1.5 ${i === 0 ? "border-[var(--accent)]/60" : ""}`}>
                <div className="font-mono text-[0.55em] text-muted">{f}</div>
                <div className="mt-1 h-1.5 w-2/3 rounded bg-ink-3" />
              </div>
            ))}
          </div>
          {!compact && (
            <div className="space-y-1.5 pt-1">
              {[1, 2, 3].map((r) => (
                <div key={r} className="flex gap-2">
                  <div className="h-1.5 flex-1 rounded bg-ink-3" />
                  <div className="h-1.5 w-10 rounded bg-ink-3" />
                </div>
              ))}
            </div>
          )}
          {/* animated pointer */}
          <motion.div
            className="pointer-events-none absolute"
            style={{ left: "8%", top: "40%" }}
            animate={loop ? { left: ["8%", "52%", "52%", "14%", "14%", "8%"], top: ["40%", "14%", "14%", "40%", "40%", "40%"] } : undefined}
            transition={loop ? { ...loop, times: [0, 0.15, 0.45, 0.6, 0.9, 1] } : undefined}
          >
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
              <path d="M1 1l5.5 14 2-5.5L14 7.5 1 1z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
            </svg>
          </motion.div>
        </div>
        <div className="col-span-2 flex flex-col justify-between rounded border border-line bg-ink/60 p-2.5">
          <div>
            <div className="flex items-center gap-1.5 font-mono text-[0.55em] uppercase tracking-widest text-muted">
              <Mic className="h-3 w-3" style={{ color: "var(--accent)" }} /> Guidr · listening
            </div>
            <p className="mt-2 text-[0.68em] leading-snug text-paper">
              اضغطي <span style={{ color: "var(--accent)" }}>New Invoice</span> — it opens a blank supplier bill, which you need before anything else can be filled in.
            </p>
            <p className="mt-2 font-mono text-[0.55em] text-muted">lang: mixed → reply: ar/en</p>
          </div>
          <ol className="mt-3 space-y-1">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-1.5 font-mono text-[0.55em]">
                <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "" : "bg-ink-3"}`} style={i === 0 ? { background: "var(--accent)" } : undefined} />
                <span className={i === 0 ? "text-paper" : "text-muted"}>{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-2 border-t border-line pt-1.5 font-mono text-[0.5em] text-muted">LESSON_STATE verified by Convex · not by the model</div>
        </div>
      </div>
    </Chrome>
  );
}

/* ---------- Trace: exposure map + risk layers ---------- */
function TraceVisual({ compact }: { compact: boolean }) {
  const loop = useLoop(8);
  return (
    <Chrome title="trace / portfolio / shared-vulnerability">
      <div className="grid h-full grid-cols-5 gap-3">
        <div className="relative col-span-3 overflow-hidden rounded border border-line bg-ink">
          <svg viewBox="0 0 300 200" className="h-full w-full">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0v20" fill="none" stroke="rgba(244,241,234,0.06)" />
              </pattern>
              <radialGradient id="flood" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="300" height="200" fill="url(#grid)" />
            {/* coastline-ish path */}
            <path d="M0 150 C 60 120, 90 170, 150 140 S 240 90, 300 110 V200 H0Z" fill="rgba(244,241,234,0.04)" />
            <motion.ellipse cx="150" cy="118" rx="80" ry="46" fill="url(#flood)" animate={loop ? { rx: [76, 86, 76], ry: [42, 50, 42] } : undefined} transition={loop} />
            {[
              [120, 108, "WH-01"],
              [168, 126, "PL-02"],
              [146, 96, "RT-03"],
              [240, 60, "HQ"],
            ].map(([x, y, l]) => (
              <g key={String(l)}>
                <circle cx={x} cy={y} r="3.5" fill={l === "HQ" ? "var(--muted)" : "var(--accent)"} />
                <text x={Number(x) + 7} y={Number(y) + 3} fontSize="7" fill="var(--paper-dim)" fontFamily="var(--font-geist-mono)">
                  {l}
                </text>
              </g>
            ))}
            <path d="M120 108 L168 126 L146 96 Z" fill="none" stroke="var(--accent)" strokeDasharray="2 3" strokeWidth="0.8" />
          </svg>
          <div className="absolute left-2 top-2 font-mono text-[0.5em] uppercase tracking-widest text-muted">flood · synthetic · v3</div>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <div className="rounded border border-line p-2">
            <div className="font-mono text-[0.5em] uppercase tracking-widest text-muted">Shared exposure</div>
            <div className="font-display text-3xl" style={{ color: "var(--accent)" }}>
              84.8%
            </div>
            <div className="font-mono text-[0.5em] text-muted">3 sectors · 1 footprint</div>
          </div>
          {!compact && (
            <div className="rounded border border-line p-2 text-[0.6em] leading-snug text-paper-dim">
              <span className="font-mono text-[0.5em] uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                Evidence-gap agent
              </span>
              <br />
              Where are the switchboards? That answer collapses an AED range.
            </div>
          )}
          <div className="rounded border border-line p-2 font-mono text-[0.55em] text-muted">
            <div className="flex justify-between">
              <span>NPV</span>
              <span className="text-paper">unknown</span>
            </div>
            <div className="flex justify-between">
              <span>lender loss</span>
              <span className="text-paper">not modelled</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span>ar / en parity</span>
              <span style={{ color: "var(--accent)" }}>pass</span>
            </div>
          </div>
        </div>
      </div>
    </Chrome>
  );
}

/* ---------- Reelcall: visual search over reels ---------- */
function ReelcallVisual({ compact }: { compact: boolean }) {
  const loop = useLoop(7);
  const query = "pink dessert, hidden gem, around AED 40";
  const results = [
    { k: "speech", t: "0:14", s: "“honestly a hidden gem”", m: true },
    { k: "visual", t: "0:08", s: "pink dessert · counter", m: true },
    { k: "price", t: "0:31", s: "“around forty dirhams”", m: false },
  ];
  return (
    <Chrome title="reelcall.app / recall">
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center gap-2 rounded border border-line bg-ink px-2.5 py-1.5">
          <Search className="h-3 w-3 text-muted" />
          <motion.span className="font-mono text-[0.62em] text-paper" animate={loop ? { opacity: [0.4, 1, 1, 0.4] } : undefined} transition={loop}>
            {query}
          </motion.span>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative overflow-hidden rounded border border-line bg-ink" style={{ aspectRatio: compact ? "3/4" : "9/13" }}>
              <div className="absolute inset-0" style={{ background: i === 0 ? "linear-gradient(160deg, var(--accent) 0%, transparent 70%)" : "linear-gradient(160deg, rgba(244,241,234,0.12), transparent 70%)", opacity: i === 0 ? 0.55 : 1 }} />
              <div className="absolute left-1.5 top-1.5 font-mono text-[0.5em] text-paper-dim">@{["dubaifoodie", "marina.eats", "sweettooth"][i]}</div>
              <div className="absolute inset-x-1.5 bottom-1.5">
                {i === 0 ? (
                  <div className="flex items-center gap-1 rounded bg-ink/80 px-1.5 py-1 font-mono text-[0.5em]" style={{ color: "var(--accent)" }}>
                    <Play className="h-2.5 w-2.5" /> jump to 0:14
                  </div>
                ) : (
                  <div className="h-1.5 w-2/3 rounded bg-ink-3" />
                )}
              </div>
            </div>
          ))}
        </div>
        <ul className="space-y-1 font-mono text-[0.55em]">
          {results.map((r) => (
            <li key={r.k} className="flex items-center gap-2">
              <span className="w-10 uppercase tracking-widest text-muted">{r.k}</span>
              <span className="text-muted">{r.t}</span>
              <span className={r.m ? "text-paper" : "text-muted"}>{r.s}</span>
              {r.m && <CheckCircle2 className="ml-auto h-3 w-3" style={{ color: "var(--accent)" }} />}
            </li>
          ))}
        </ul>
      </div>
    </Chrome>
  );
}

/* ---------- Wish: page-native controls + reviewed plan ---------- */
function WishVisual({ compact }: { compact: boolean }) {
  const loop = useLoop(7);
  const cards = [
    { t: "Cove · Marina", p: "AED 120,000 / yr", ok: true },
    { t: "Loft · Marina", p: "AED 9,000 / mo", ok: true },
    { t: "Grove · JVC", p: "AED 165,000 / yr", ok: false },
  ];
  return (
    <Chrome title="harbor-and-grove.demo / listings  ·  ✦ Wish active">
      <div className="grid h-full grid-cols-5 gap-3">
        <div className="col-span-3 space-y-2">
          {cards.map((c, i) => (
            <motion.div
              key={c.t}
              className="flex items-center gap-2 rounded border border-line bg-ink px-2 py-2"
              animate={loop && !c.ok ? { opacity: [1, 1, 0.25, 0.25, 1] } : undefined}
              transition={loop ? { ...loop, times: [0, 0.4, 0.5, 0.9, 1] } : undefined}
            >
              <span className="flex h-3 w-3 items-center justify-center rounded-sm border" style={{ borderColor: "var(--accent)", background: i < 2 ? "var(--accent)" : "transparent" }}>
                {i < 2 && <span className="h-1.5 w-1.5 bg-ink" />}
              </span>
              <div className="flex-1">
                <div className="text-[0.62em] text-paper">{c.t}</div>
                <div className="font-mono text-[0.5em] text-muted">{c.p}</div>
              </div>
              {!c.ok && <span className="font-mono text-[0.5em] text-muted">over budget</span>}
            </motion.div>
          ))}
          {!compact && (
            <div className="rounded border border-dashed border-line px-2 py-1.5 font-mono text-[0.5em] text-muted">
              partial upfront = 1st installment + deposit + agency fee · unlisted charges: unknown
            </div>
          )}
        </div>
        <div className="col-span-2 flex flex-col gap-2 rounded border p-2.5" style={{ borderColor: "color-mix(in srgb, var(--accent) 50%, transparent)" }}>
          <div className="flex items-center gap-1 font-mono text-[0.55em] uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            <Sparkles className="h-3 w-3" /> Wish
          </div>
          <p className="text-[0.62em] leading-snug text-paper">“Compare these, add an AED 150k budget, let me enter the fees.”</p>
          <div className="mt-auto rounded bg-ink p-2 font-mono text-[0.5em] leading-relaxed text-paper-dim">
            {`{ components: ["selection",`}
            <br />
            {`  "comparison","budget"],`}
            <br />
            {`  listingIds: ["one","two"],`}
            <br />
            {`  budgetAnnual: 150000 }`}
            <div className="mt-1 flex items-center gap-1" style={{ color: "var(--accent)" }}>
              <CheckCircle2 className="h-2.5 w-2.5" /> validated · no JS
            </div>
          </div>
        </div>
      </div>
    </Chrome>
  );
}

/* ---------- Tell: reconciliation bridge + findings ---------- */
function TellVisual({ compact }: { compact: boolean }) {
  const bars = [
    { l: "Seller-reported", v: 100, c: "rgba(244,241,234,0.25)" },
    { l: "− refunds", v: 86, c: "var(--accent)" },
    { l: "− cancellations", v: 81, c: "var(--accent)" },
    { l: "− discounts", v: 74, c: "var(--accent)" },
    { l: "Supported net sales", v: 74, c: "var(--paper)" },
  ];
  return (
    <Chrome title="tell / saffron-and-sage / overview">
      <div className="grid h-full grid-cols-5 gap-3">
        <div className="col-span-3">
          <div className="font-mono text-[0.5em] uppercase tracking-widest text-muted">Headline → supported net sales</div>
          <div className="mt-2 space-y-1.5">
            {bars.map((b) => (
              <div key={b.l} className="flex items-center gap-2 font-mono text-[0.5em]">
                <span className="w-20 truncate text-muted">{b.l}</span>
                <div className="h-2 flex-1 rounded-sm bg-ink">
                  <motion.div className="h-full rounded-sm" style={{ background: b.c }} initial={{ width: 0 }} whileInView={{ width: `${b.v}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 space-y-1.5">
          {[
            ["REV-001:2025-06", "high", "Revenue overstated"],
            ["REF-002:2025-10", "high", "Late-posted refunds"],
            ["SEA-001:2025-11", "info", "Seasonal (legit)"],
          ]
            .slice(0, compact ? 2 : 3)
            .map(([k, s, t]) => (
              <div key={k} className="rounded border border-line bg-ink p-1.5">
                <div className="flex items-center gap-1">
                  {s === "high" ? <AlertTriangle className="h-2.5 w-2.5 text-coral" /> : <CheckCircle2 className="h-2.5 w-2.5 text-muted" />}
                  <span className="text-[0.58em] text-paper">{t}</span>
                </div>
                <div className="font-mono text-[0.45em] text-muted">{k} · evidence: 12 rows</div>
              </div>
            ))}
        </div>
      </div>
    </Chrome>
  );
}

/* ---------- BrandOrbit: share of voice ---------- */
function BrandOrbitVisual({ compact }: { compact: boolean }) {
  const rows = [
    ["Seraj Home (you)", 42],
    ["Competitor A", 68],
    ["Competitor B", 51],
    ["Competitor C", 23],
  ] as const;
  return (
    <Chrome title="brandorbit / ai-visibility">
      <div className="grid h-full grid-cols-5 gap-3">
        <div className="col-span-3 space-y-2">
          <div className="font-mono text-[0.5em] uppercase tracking-widest text-muted">Mention rate by brand</div>
          {rows.map(([n, v], i) => (
            <div key={n} className="flex items-center gap-2 font-mono text-[0.5em]">
              <span className={`w-20 truncate ${i === 0 ? "text-paper" : "text-muted"}`}>{n}</span>
              <div className="h-2 flex-1 rounded-sm bg-ink">
                <motion.div className="h-full rounded-sm" style={{ background: i === 0 ? "var(--accent)" : "rgba(244,241,234,0.25)" }} initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }} />
              </div>
              <span className="w-6 text-right text-paper-dim">{v}%</span>
            </div>
          ))}
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <div className="rounded border border-line p-2">
            <div className="font-mono text-[0.5em] uppercase tracking-widest text-muted">Inaccurate claims</div>
            <div className="font-display text-2xl text-paper">3</div>
            <div className="font-mono text-[0.5em] text-muted">warranty · price · policy</div>
          </div>
          {!compact && (
            <div className="rounded border border-line p-2 text-[0.58em] leading-snug text-paper-dim">
              <span className="font-mono text-[0.5em] uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                evidence
              </span>
              <br />
              “…comes with a 1-year warranty” — catalogue says 2 years.
            </div>
          )}
        </div>
      </div>
    </Chrome>
  );
}

/* ---------- RAG eval: pipeline with gates ---------- */
function RagVisual({ compact }: { compact: boolean }) {
  const stages = ["rules", "rewrite", "BM25+dense", "rerank", "gate", "generate", "cite/check"];
  return (
    <Chrome title="support-agent / evals / v3.yaml">
      <div className="flex h-full flex-col gap-3">
        <div className="flex flex-wrap items-center gap-1 font-mono text-[0.5em]">
          {stages.map((s, i) => (
            <span key={s} className="flex items-center gap-1">
              <span className={`rounded border px-1.5 py-0.5 ${i === 4 || i === 6 ? "border-[var(--accent)] text-paper" : "border-line text-muted"}`}>{s}</span>
              {i < stages.length - 1 && <ArrowRight className="h-2.5 w-2.5 text-muted" />}
            </span>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-2 gap-2">
          <div className="rounded border border-line bg-ink p-2 text-[0.6em] leading-snug">
            <div className="font-mono text-[0.5em] uppercase tracking-widest text-muted">customer</div>
            <p className="text-paper">Can I return boots I wore once on a hike? I&apos;ll sue if not.</p>
            <div className="mt-2 font-mono text-[0.5em] uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              → hand-off · reason: legal_threat
            </div>
          </div>
          {!compact && (
            <div className="rounded border border-line bg-ink p-2 font-mono text-[0.5em] leading-relaxed text-muted">
              <div className="uppercase tracking-widest">gold set</div>
              <div className="text-paper">68 q · 15 dev / 53 test</div>
              <div>9 categories</div>
              <div>escalation = classifier (P/R/F1)</div>
              <div>thresholds tuned on dev only</div>
            </div>
          )}
        </div>
      </div>
    </Chrome>
  );
}

const visuals: Record<Visual, (p: { compact: boolean }) => React.JSX.Element> = {
  guidr: GuidrVisual,
  trace: TraceVisual,
  reelcall: ReelcallVisual,
  wish: WishVisual,
  tell: TellVisual,
  brandorbit: BrandOrbitVisual,
  rag: RagVisual,
};
