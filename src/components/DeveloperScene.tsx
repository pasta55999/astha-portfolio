/**
 * Animated illustration: a developer (her) at a laptop. Pure inline SVG + CSS
 * keyframes (typing hands, blinking, nodding head, scrolling code, coffee
 * steam, floating glyphs). All animation is disabled under reduced motion
 * via the global stylesheet rules on `.dev-scene`.
 */
export function DeveloperScene({ className = "" }: { className?: string }) {
  return (
    <div className={`dev-scene relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 520 420" className="h-full w-full" fill="none">
        <defs>
          <linearGradient id="ds-screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1b1040" />
            <stop offset="1" stopColor="#0a0620" />
          </linearGradient>
          <linearGradient id="ds-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.45" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ds-hair" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2a1a3a" />
            <stop offset="1" stopColor="#120a1f" />
          </linearGradient>
          <linearGradient id="ds-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8d54ff" />
            <stop offset="1" stopColor="#4f46e5" />
          </linearGradient>
          <radialGradient id="ds-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#7c3aed" stopOpacity="0.35" />
            <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
          <clipPath id="ds-screen-clip">
            <rect x="212" y="204" width="120" height="82" rx="5" />
          </clipPath>
        </defs>

        {/* halo + floor */}
        <circle cx="300" cy="230" r="190" fill="url(#ds-halo)" />
        <ellipse cx="300" cy="372" rx="190" ry="14" fill="#8b5cf6" opacity="0.08" />

        {/* floating glyphs */}
        <g className="ds-float-a" fontFamily="var(--font-geist-mono), monospace" fontSize="16" fill="#c4b4ff" opacity="0.8">
          <text x="92" y="96">{"</>"}</text>
          <text x="420" y="78" fontSize="13">{"{ }"}</text>
        </g>
        <g className="ds-float-b" fontFamily="var(--font-geist-mono), monospace" fontSize="13" fill="#a685ff" opacity="0.7">
          <text x="64" y="190">λ</text>
          <text x="448" y="150">ai()</text>
          <text x="440" y="300" fontSize="12">01</text>
        </g>
        <circle className="ds-spark" cx="130" cy="140" r="2.5" fill="#d9d2ff" />
        <circle className="ds-spark ds-delay-1" cx="462" cy="228" r="2" fill="#d9d2ff" />
        <circle className="ds-spark ds-delay-2" cx="404" cy="48" r="2" fill="#a685ff" />

        {/* desk */}
        <rect x="112" y="318" width="308" height="12" rx="6" fill="#1a1333" />
        <rect x="128" y="330" width="10" height="42" rx="3" fill="#15102a" />
        <rect x="394" y="330" width="10" height="42" rx="3" fill="#15102a" />

        {/* coffee */}
        <g>
          <rect x="372" y="288" width="26" height="30" rx="5" fill="#2a2150" stroke="#8b5cf6" strokeOpacity="0.5" />
          <path d="M398 296h6a6 6 0 0 1 0 12h-6" stroke="#8b5cf6" strokeOpacity="0.5" strokeWidth="2" />
          <path className="ds-steam" d="M380 282c-3-5 3-8 0-13" stroke="#c4b4ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path className="ds-steam ds-delay-1" d="M388 282c-3-5 3-8 0-13" stroke="#c4b4ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* chair back */}
        <rect x="176" y="180" width="22" height="138" rx="10" fill="#1a1333" />

        {/* body group (gentle breathing) */}
        <g className="ds-breathe">
          {/* hair back */}
          <path d="M244 118c-26 12-34 46-30 84 2 18 6 34 6 34h22l10-118z" fill="url(#ds-hair)" />
          <path d="M300 118c26 12 34 46 30 84-2 18-6 34-6 34h-22l-10-118z" fill="url(#ds-hair)" />
          {/* torso */}
          <path d="M218 212c8-22 28-34 54-34s46 12 54 34l10 106H208z" fill="url(#ds-top)" />
          {/* upper arms (behind the laptop) */}
          <path className="ds-arm-l" d="M224 216c-14 20-16 44-8 66l20-4c-6-16-4-32 4-48z" fill="#f0c4a8" />
          <path className="ds-arm-r" d="M320 216c14 20 16 44 8 66l-20-4c6-16 4-32-4-48z" fill="#f0c4a8" />
          {/* neck */}
          <rect x="262" y="158" width="20" height="28" rx="8" fill="#e8b89c" />
          {/* head group (nod) */}
          <g className="ds-nod">
            <ellipse cx="272" cy="132" rx="30" ry="34" fill="#f0c4a8" />
            {/* hair front */}
            <path d="M240 130c-2-28 14-46 34-46 22 0 36 18 32 48-6-14-14-22-32-24-16 2-26 10-34 22z" fill="url(#ds-hair)" />
            {/* eyes */}
            <g className="ds-blink">
              <ellipse cx="262" cy="136" rx="3" ry="3.4" fill="#1b1230" />
              <ellipse cx="284" cy="136" rx="3" ry="3.4" fill="#1b1230" />
            </g>
            {/* glasses */}
            <g stroke="#c4b4ff" strokeWidth="1.6" fill="#8b5cf6" fillOpacity="0.12">
              <rect x="252" y="128" width="20" height="15" rx="6" />
              <rect x="274" y="128" width="20" height="15" rx="6" />
              <path d="M272 135h2" />
            </g>
            {/* smile + brows */}
            <path d="M265 152q7 5 14 0" stroke="#b87a62" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M256 122q6-4 12-1M278 121q6-3 12 1" stroke="#2a1a3a" strokeWidth="1.6" strokeLinecap="round" />
            {/* earrings */}
            <circle cx="243" cy="146" r="2" stroke="#c4b4ff" />
            <circle cx="301" cy="146" r="2" stroke="#c4b4ff" />
          </g>
        </g>

        {/* laptop (in front of torso) */}
        <g>
          <path d="M212 196h120a8 8 0 0 1 8 8v96H204v-96a8 8 0 0 1 8-8z" fill="#141028" stroke="#8b5cf6" strokeOpacity="0.5" />
          <rect x="212" y="204" width="120" height="82" rx="5" fill="url(#ds-screen)" />
          <g clipPath="url(#ds-screen-clip)">
            <g className="ds-code" fontFamily="var(--font-geist-mono), monospace" fontSize="6.5">
              {[
                ["#a685ff", "const tutor = agent({"],
                ["#c4b4ff", "  tools: [highlight, lookup],"],
                ["#c4b4ff", "  truth: convex.verify,"],
                ["#a685ff", "});"],
                ["#7dd3fc", "await speak(ar | en);"],
                ["#5ee9b5", "✓ step verified"],
                ["#a685ff", "evaluate(goldSet, {"],
                ["#c4b4ff", "  escalation: 'classifier',"],
                ["#a685ff", "});"],
                ["#5ee9b5", "✓ deploy --prod"],
                ["#a685ff", "const tutor = agent({"],
                ["#c4b4ff", "  tools: [highlight, lookup],"],
                ["#c4b4ff", "  truth: convex.verify,"],
                ["#a685ff", "});"],
                ["#7dd3fc", "await speak(ar | en);"],
                ["#5ee9b5", "✓ step verified"],
              ].map(([c, t], i) => (
                <text key={i} x="219" y={216 + i * 11} fill={c}>
                  {t}
                </text>
              ))}
            </g>
            <rect className="ds-cursor" x="219" y="276" width="4" height="8" fill="#c4b4ff" />
          </g>
          <rect x="212" y="256" width="120" height="30" fill="url(#ds-glow)" opacity="0.5" />
          <circle cx="322" cy="200" r="2" fill="#8b5cf6" />
          {/* base + keyboard */}
          <path d="M186 300h172a6 6 0 0 1 6 6v6a4 4 0 0 1-4 4H184a4 4 0 0 1-4-4v-6a6 6 0 0 1 6-6z" fill="#1d1738" stroke="#8b5cf6" strokeOpacity="0.4" />
          <rect x="246" y="304" width="52" height="3" rx="1.5" fill="#8b5cf6" opacity="0.5" />
        </g>

        {/* hands on the keyboard */}
        <g>
          <ellipse className="ds-hand-l" cx="240" cy="304" rx="11" ry="5.5" fill="#f0c4a8" />
          <ellipse className="ds-hand-r" cx="304" cy="304" rx="11" ry="5.5" fill="#f0c4a8" />
        </g>

        {/* floating status chip */}
        <g className="ds-float-b">
          <rect x="352" y="150" width="96" height="26" rx="13" fill="#0a051c" fillOpacity="0.9" stroke="#8b5cf6" strokeOpacity="0.5" />
          <circle cx="366" cy="163" r="4" fill="#00d294" />
          <text x="376" y="167" fontFamily="var(--font-geist-mono), monospace" fontSize="9" fill="#f4f2ff">
            building…
          </text>
        </g>
        <g className="ds-float-a">
          <rect x="56" y="228" width="104" height="26" rx="13" fill="#0a051c" fillOpacity="0.9" stroke="#8b5cf6" strokeOpacity="0.5" />
          <text x="68" y="245" fontFamily="var(--font-geist-mono), monospace" fontSize="9" fill="#c4b4ff">
            ✦ idea → product
          </text>
        </g>
      </svg>
    </div>
  );
}
