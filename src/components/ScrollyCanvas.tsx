"use client";

import React, { useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import Overlay from "./Overlay";

// ── PCB node positions (as % of canvas w/h) ──────────────────
const NODES = [
  { x: 0.12, y: 0.18 }, { x: 0.28, y: 0.12 }, { x: 0.45, y: 0.22 },
  { x: 0.65, y: 0.10 }, { x: 0.80, y: 0.25 }, { x: 0.92, y: 0.15 },
  { x: 0.08, y: 0.45 }, { x: 0.22, y: 0.55 }, { x: 0.38, y: 0.42 },
  { x: 0.55, y: 0.50 }, { x: 0.70, y: 0.40 }, { x: 0.88, y: 0.48 },
  { x: 0.15, y: 0.72 }, { x: 0.30, y: 0.80 }, { x: 0.50, y: 0.70 },
  { x: 0.68, y: 0.78 }, { x: 0.82, y: 0.65 }, { x: 0.95, y: 0.75 },
  { x: 0.05, y: 0.88 }, { x: 0.42, y: 0.92 }, { x: 0.75, y: 0.90 },
];

// ── Traces: pairs of node indices ─────────────────────────────
const TRACES = [
  [0,1],[1,2],[2,3],[3,4],[4,5],
  [0,6],[6,7],[7,8],[8,9],[9,10],[10,11],
  [6,12],[12,13],[13,14],[14,15],[15,16],[16,17],
  [12,18],[18,19],[19,20],
  [2,8],[4,10],[9,14],[10,15],[3,9],[7,13],
];

interface Particle {
  traceIdx: number;
  t: number;       // 0..1 along the trace
  speed: number;
  opacity: number;
}

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scroll-driven colour shift: teal → cyan → emerald
  const hueShift = useTransform(scrollYProgress, [0, 0.5, 1], [178, 190, 160]);

  // Initialise particles
  useEffect(() => {
    const ps: Particle[] = [];
    TRACES.forEach((_, i) => {
      const count = Math.floor(Math.random() * 2) + 1;
      for (let k = 0; k < count; k++) {
        ps.push({
          traceIdx: i,
          t: Math.random(),
          speed: 0.0008 + Math.random() * 0.0012,
          opacity: 0.6 + Math.random() * 0.4,
        });
      }
    });
    particlesRef.current = ps;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (ts: number) => {
      const dt = ts - timeRef.current;
      timeRef.current = ts;

      const W = canvas.width;
      const H = canvas.height;
      const hue = hueShift.get();

      // ── Background ─────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);

      // Subtle radial glow centre
      const grad = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, W * 0.6);
      grad.addColorStop(0, `hsla(${hue},80%,40%,0.07)`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // ── Dot grid ───────────────────────────────────────────
      const spacing = 28;
      ctx.fillStyle = `hsla(${hue},60%,60%,0.08)`;
      for (let gx = spacing / 2; gx < W; gx += spacing) {
        for (let gy = spacing / 2; gy < H; gy += spacing) {
          ctx.beginPath();
          ctx.arc(gx, gy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── PCB traces ─────────────────────────────────────────
      TRACES.forEach(([a, b]) => {
        const ax = NODES[a].x * W, ay = NODES[a].y * H;
        const bx = NODES[b].x * W, by = NODES[b].y * H;

        // Right-angle routing (horizontal then vertical)
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, ay);   // horizontal segment
        ctx.lineTo(bx, by);   // vertical segment
        ctx.strokeStyle = `hsla(${hue},70%,55%,0.18)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // ── Nodes (solder pads) ────────────────────────────────
      const pulse = Math.sin(ts * 0.001) * 0.5 + 0.5; // 0..1
      NODES.forEach((n, i) => {
        const nx = n.x * W, ny = n.y * H;
        const isActive = i % 5 === Math.floor((ts * 0.001) % 5);

        // Outer glow ring
        const glow = ctx.createRadialGradient(nx, ny, 0, nx, ny, isActive ? 18 : 10);
        glow.addColorStop(0, `hsla(${hue},80%,60%,${isActive ? 0.35 * pulse : 0.12})`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(nx, ny, isActive ? 18 : 10, 0, Math.PI * 2);
        ctx.fill();

        // Core pad
        ctx.beginPath();
        ctx.arc(nx, ny, isActive ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue},80%,70%,${isActive ? 0.95 : 0.5})`;
        ctx.fill();

        // Outer ring
        ctx.beginPath();
        ctx.arc(nx, ny, isActive ? 7 : 5, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${hue},70%,60%,${isActive ? 0.7 : 0.25})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // ── Signal particles (travelling along traces) ─────────
      particlesRef.current.forEach(p => {
        p.t += p.speed * (dt || 16) * 0.06;
        if (p.t > 1) p.t = 0;

        const [a, b] = TRACES[p.traceIdx];
        const ax = NODES[a].x * W, ay = NODES[a].y * H;
        const bx = NODES[b].x * W, by = NODES[b].y * H;

        // Follow right-angle path: H then V
        let px: number, py: number;
        const cornerX = bx, cornerY = ay;
        const totalLen = Math.abs(bx - ax) + Math.abs(by - ay);
        const seg1Frac = totalLen > 0 ? Math.abs(bx - ax) / totalLen : 0.5;

        if (p.t <= seg1Frac) {
          const localT = seg1Frac > 0 ? p.t / seg1Frac : 0;
          px = ax + (cornerX - ax) * localT;
          py = ay;
        } else {
          const localT = (1 - seg1Frac) > 0 ? (p.t - seg1Frac) / (1 - seg1Frac) : 0;
          px = cornerX;
          py = cornerY + (by - cornerY) * localT;
        }

        // Particle glow
        const pg = ctx.createRadialGradient(px, py, 0, px, py, 8);
        pg.addColorStop(0, `hsla(${hue + 20},90%,75%,${p.opacity})`);
        pg.addColorStop(1, "transparent");
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue + 20},100%,85%,${p.opacity})`;
        ctx.fill();
      });

      // ── IC chip decorations ────────────────────────────────
      const chips = [
        { x: 0.35, y: 0.33, w: 0.08, h: 0.10, label: "ESP32" },
        { x: 0.60, y: 0.55, w: 0.07, h: 0.09, label: "RC522" },
        { x: 0.18, y: 0.60, w: 0.06, h: 0.08, label: "MPU" },
      ];
      chips.forEach(c => {
        const cx = c.x * W, cy = c.y * H;
        const cw = c.w * W, ch = c.h * H;
        ctx.strokeStyle = `hsla(${hue},60%,55%,0.35)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(cx - cw / 2, cy - ch / 2, cw, ch);
        // Pin marks
        const pins = 4;
        for (let p = 0; p < pins; p++) {
          const px2 = cx - cw / 2 + (cw / (pins - 1)) * p;
          ctx.fillStyle = `hsla(${hue},70%,60%,0.4)`;
          ctx.fillRect(px2 - 1, cy - ch / 2 - 4, 2, 4);
          ctx.fillRect(px2 - 1, cy + ch / 2,     2, 4);
        }
        ctx.fillStyle = `hsla(${hue},60%,65%,0.25)`;
        ctx.font = `bold ${Math.max(9, W * 0.009)}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(c.label, cx, cy);
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [hueShift]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Animated PCB canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0"
        />

        {/* Overlay text */}
        <Overlay scrollYProgress={scrollYProgress} />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 md:h-64 bg-gradient-to-t from-[#121212] to-transparent z-20 pointer-events-none" />
      </div>
    </div>
  );
}
