"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Node = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  r: number;
  label?: string;
  hub?: boolean;
  color: string;
};

/**
 * A pointer-reactive system map: three hubs (AI · Product · Experiments)
 * surrounded by drifting nodes that link up when close. It is a drawing, not
 * an agent — purely decorative and fully local.
 */
export function SystemCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const css = getComputedStyle(document.documentElement);
    const LIME = css.getPropertyValue("--lime").trim() || "#d4ff3f";
    const CORAL = css.getPropertyValue("--coral").trim() || "#ff5c3a";
    const COBALT = css.getPropertyValue("--cobalt").trim() || "#3a5bff";
    const PAPER = css.getPropertyValue("--paper").trim() || "#f4f1ea";

    let w = 0, h = 0, dpr = 1;
    let nodes: Node[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let t = 0;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const hubs: Node[] = [
        { x: w * 0.28, y: h * 0.3, label: "AI", color: LIME },
        { x: w * 0.72, y: h * 0.38, label: "PRODUCT", color: COBALT },
        { x: w * 0.46, y: h * 0.74, label: "EXPERIMENTS", color: CORAL },
      ].map((n) => ({ ...n, ox: n.x, oy: n.y, vx: 0, vy: 0, r: 4, hub: true }));

      const count = Math.round(Math.min(70, Math.max(28, (w * h) / 9000)));
      const seeded = (i: number) => {
        const s = Math.sin(i * 9301 + 49297) * 233280;
        return s - Math.floor(s);
      };
      const rest: Node[] = Array.from({ length: count }, (_, i) => {
        const x = seeded(i * 2) * w;
        const y = seeded(i * 2 + 1) * h;
        return { x, y, ox: x, oy: y, vx: 0, vy: 0, r: 1 + seeded(i * 3) * 1.6, color: PAPER };
      });
      nodes = [...hubs, ...rest];
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.004;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!reduce) {
          // gentle drift around origin
          const drift = n.hub ? 6 : 14;
          const tx = n.ox + Math.sin(t * (n.hub ? 0.7 : 1.3) + i) * drift;
          const ty = n.oy + Math.cos(t * (n.hub ? 0.5 : 1.1) + i * 1.7) * drift;
          n.vx += (tx - n.x) * 0.01;
          n.vy += (ty - n.y) * 0.01;
          if (pointer.active) {
            const dx = pointer.x - n.x, dy = pointer.y - n.y;
            const d2 = dx * dx + dy * dy;
            const R = 180;
            if (d2 < R * R) {
              const d = Math.sqrt(d2) || 1;
              const f = (1 - d / R) * (n.hub ? 0.35 : 0.9);
              n.vx += (dx / d) * f;
              n.vy += (dy / d) * f;
            }
          }
          n.vx *= 0.9;
          n.vy *= 0.9;
          n.x += n.vx;
          n.y += n.vy;
        }
      }

      // links
      const LINK = 120;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const reach = a.hub || b.hub ? LINK * 1.6 : LINK;
          if (d2 < reach * reach) {
            const alpha = (1 - Math.sqrt(d2) / reach) * (a.hub || b.hub ? 0.35 : 0.18);
            ctx.strokeStyle = a.hub ? hexA(a.color, alpha) : b.hub ? hexA(b.color, alpha) : hexA(PAPER, alpha);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // hub-to-hub triangle
      ctx.strokeStyle = hexA(PAPER, 0.25);
      ctx.setLineDash([2, 6]);
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      ctx.lineTo(nodes[1].x, nodes[1].y);
      ctx.lineTo(nodes[2].x, nodes[2].y);
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

      // nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.hub ? n.color : hexA(PAPER, 0.7);
        ctx.fill();
        if (n.hub) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 7 + Math.sin(t * 3) * 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = hexA(n.color, 0.5);
          ctx.stroke();
          ctx.font = "600 10px var(--font-geist-mono), ui-monospace, monospace";
          ctx.fillStyle = n.color;
          ctx.textBaseline = "middle";
          ctx.letterSpacing = "2px";
          ctx.fillText(n.label!, n.x + 16, n.y + 1);
        }
      }

      // pointer
      if (pointer.active && !reduce) {
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = LIME;
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = pointer.y = -9999;
    };

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw();
    });
    ro.observe(canvas);
    build();
    draw();

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduce) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

function hexA(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
