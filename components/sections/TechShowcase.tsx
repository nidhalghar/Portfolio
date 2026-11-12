"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Seg = { t: string; c: string };

const K = "#c084fc"; // keyword
const V = "#67e8f9"; // variable
const P = "#93c5fd"; // property
const S = "#86efac"; // string
const W = "#e5e7eb"; // plain

const CODE: Seg[][] = [
  [
    { t: "const ", c: K },
    { t: "dev", c: V },
    { t: " = {", c: W },
  ],
  [
    { t: "  experience", c: P },
    { t: ": ", c: W },
    { t: '"3+ ans"', c: S },
    { t: ",", c: W },
  ],
  [
    { t: "  frontend", c: P },
    { t: ": [", c: W },
    { t: '"React"', c: S },
    { t: ",", c: W },
    { t: '"Next"', c: S },
    { t: ",", c: W },
    { t: '"Nuxt"', c: S },
    { t: ",", c: W },
    { t: '"Angular"', c: S },
    { t: "],", c: W },
  ],
  [
    { t: "  backend", c: P },
    { t: ": [", c: W },
    { t: '"Laravel"', c: S },
    { t: ",", c: W },
    { t: '"Symfony"', c: S },
    { t: "],", c: W },
  ],
  [
    { t: "  passion", c: P },
    { t: ": ", c: W },
    { t: '"Code propre & UX"', c: S },
    { t: ",", c: W },
  ],
  [{ t: "};", c: W }],
];

const TOTAL_CHARS = CODE.reduce(
  (a, line) => a + line.reduce((b, s) => b + s.t.length, 0) + 1,
  0
);

const TECHS = [
  { name: "React", symbol: "⚛", color: "#61DAFB" },
  { name: "Next.js", symbol: "N", color: "#ffffff" },
  { name: "Nuxt", symbol: "▲", color: "#00DC82" },
  { name: "Angular", symbol: "A", color: "#DD0031" },
  { name: "Laravel", symbol: "L", color: "#FF2D20" },
  { name: "Symfony", symbol: "S", color: "#e5e7eb" },
];

const CHIPS = [
  { label: "</>", top: "8%", left: "8%", delay: 0 },
  { label: "{ }", top: "12%", right: "9%", delay: 1 },
  { label: "API", bottom: "10%", left: "10%", delay: 2 },
  { label: "SQL", bottom: "8%", right: "8%", delay: 0.5 },
  { label: "Git", top: "46%", left: "3%", delay: 1.5 },
];

function renderCode(n: number) {
  let left = n;
  let caretPlaced = false;
  return CODE.map((line, i) => {
    const segs: React.ReactNode[] = [];
    line.forEach((s, j) => {
      if (left <= 0) return;
      segs.push(
        <span key={j} style={{ color: s.c }}>
          {s.t.slice(0, left)}
        </span>
      );
      left -= s.t.length;
    });
    left -= 1;
    if (!caretPlaced && left <= 0) {
      caretPlaced = true;
      segs.push(
        <span
          key="caret"
          className="inline-block w-[7px] h-[1.1em] align-middle ml-px bg-cyan-300 animate-pulse"
        />
      );
    }
    return (
      <div key={i} className="min-h-[1.5em]">
        {segs}
      </div>
    );
  });
}

export const TechShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [typed, setTyped] = useState(0);

  // 3D tilt following the mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(mx, { stiffness: 120, damping: 14 });
  const rotateX = useSpring(my, { stiffness: 120, damping: 14 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x * 18);
    my.set(-y * 18);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Typing animation (loops with a pause at the end)
  useEffect(() => {
    const id = setInterval(() => {
      setTyped((n) => (n > TOTAL_CHARS + 45 ? 0 : n + 1));
    }, 55);
    return () => clearInterval(id);
  }, []);

  // Elliptical orbit of the tech badges (pseudo-3D: depth = scale + opacity + z-index)
  useAnimationFrame((t) => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    const rx = w * 0.4;
    const ry = h * 0.36;
    TECHS.forEach((_, i) => {
      const node = badgeRefs.current[i];
      if (!node) return;
      const a = (t / 1000) * 0.55 + (i * Math.PI * 2) / TECHS.length;
      const x = Math.cos(a) * rx;
      const y = Math.sin(a) * ry;
      const depth = (Math.sin(a) + 1) / 2; // 0 = back, 1 = front
      const scale = 0.7 + 0.35 * depth;
      node.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      node.style.opacity = String(0.45 + 0.55 * depth);
      node.style.zIndex = depth > 0.5 ? "30" : "5";
    });
  });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-full h-full min-h-[460px] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 shadow-xl border border-white/10"
      style={{ perspective: 1000 }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(circle at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 30%, transparent 75%)",
        }}
      />

      {/* Glowing orbs */}
      <motion.div
        className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-purple-500/30 blur-3xl"
        animate={{ scale: [1, 1.25, 1], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-cyan-500/25 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating chips */}
      {CHIPS.map((c) => (
        <motion.span
          key={c.label}
          className="absolute z-10 px-2 py-1 rounded-md text-[11px] font-mono text-cyan-200/80 bg-white/5 border border-white/10 backdrop-blur-sm"
          style={{
            top: c.top,
            left: c.left,
            right: c.right,
            bottom: c.bottom,
          }}
          animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 4,
            delay: c.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {c.label}
        </motion.span>
      ))}

      {/* Orbiting tech badges */}
      {TECHS.map((tech, i) => (
        <div
          key={tech.name}
          ref={(el) => {
            badgeRefs.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 will-change-transform"
          style={{ marginLeft: -32, marginTop: -32 }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20"
            style={{ boxShadow: `0 0 22px ${tech.color}55` }}
          >
            <span
              className="text-xl font-bold leading-none"
              style={{ color: tech.color }}
            >
              {tech.symbol}
            </span>
            <span className="mt-1 text-[9px] text-white/80 font-medium">
              {tech.name}
            </span>
          </div>
        </div>
      ))}

      {/* Center: 3D tilting code window */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="relative z-20 w-[82%] max-w-[360px] rounded-xl overflow-hidden bg-slate-950/90 border border-white/15 backdrop-blur-md"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            boxShadow:
              "0 25px 60px -10px rgba(99,102,241,0.45), 0 0 0 1px rgba(255,255,255,0.05)",
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="ml-2 text-[11px] text-white/50 font-mono">
              developer.ts
            </span>
          </div>

          {/* Code */}
          <div
            className="p-4 font-mono text-[11.5px] leading-relaxed whitespace-pre"
            style={{ transform: "translateZ(30px)" }}
          >
            {renderCode(typed)}
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-indigo-500/20 border-t border-white/10 text-[10px] font-mono text-white/60">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Full Stack
            </span>
            <span>TypeScript</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
