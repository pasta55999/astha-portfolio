"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Star = { x: number; y: number; z: number; r: number; tw: number; hue: number };

/**
 * Drifting starfield with faint constellation links and pointer parallax.
 * Decorative only. Renders a single static frame under reduced motion.
 */
export function Starfield({ className = "", density = 1 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, raf = 0, t = 0;
    let stars: Star[] = [];
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(220, Math.max(60, (w * h) / 7000)) * density);
      const rnd = (i: number) => {
        const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
        return s - Math.floor(s);
      };
      stars = Array.from({ length: n }, (_, i) => ({
        x: rnd(i * 3) * w,
        y: rnd(i * 3 + 1) * h,
        z: 0.3 + rnd(i * 3 + 2) * 0.7,
        r: 0.4 + rnd(i * 7) * 1.4,
        tw: rnd(i * 11) * Math.PI * 2,
        hue: rnd(i * 13) > 0.8 ? 265 : 240,
      }));
    };

    const draw = () => {
      t += 0.008;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      ctx.clearRect(0, 0, w, h);
      const px = (pointer.x - 0.5) * 30, py = (pointer.y - 0.5) * 30;

      // links between near stars (sparse)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < stars.length; i += 3) {
        const a = stars[i];
        for (let j = i + 3; j < stars.length; j += 3) {
          const b = stars[j];
          const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < 110 * 110) {
            ctx.strokeStyle = `rgba(166,133,255,${(1 - Math.sqrt(d2) / 110) * 0.18})`;
            ctx.beginPath();
            ctx.moveTo(a.x + px * a.z, a.y + py * a.z);
            ctx.lineTo(b.x + px * b.z, b.y + py * b.z);
            ctx.stroke();
          }
        }
      }
      for (const s of stars) {
        if (!reduce) {
          s.y -= 0.04 * s.z;
          s.x += Math.sin(t + s.tw) * 0.03;
          if (s.y < -4) s.y = h + 4;
        }
        const a = 0.35 + 0.65 * Math.abs(Math.sin(t * 1.5 + s.tw)) * s.z;
        ctx.beginPath();
        ctx.arc(s.x + px * s.z, s.y + py * s.z, s.r * s.z, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue},80%,${s.hue === 265 ? 80 : 92}%,${a})`;
        ctx.fill();
        if (s.r > 1.5) {
          ctx.beginPath();
          ctx.arc(s.x + px * s.z, s.y + py * s.z, s.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(166,133,255,${a * 0.12})`;
          ctx.fill();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    };
    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw();
    });
    ro.observe(canvas);
    build();
    draw();
    window.addEventListener("pointermove", onMove, { passive: true });
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce, density]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
