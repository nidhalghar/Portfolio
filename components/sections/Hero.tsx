"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ROLES = [
  "Next.js & Nuxt.js",
  "Laravel & Symfony",
  "Applications mobiles React Native",
  "Docker & Deep Learning",
];

const ORBIT = [
  {
    name: "Next.js",
    icon: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg",
  },
  {
    name: "React Native",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  },
  { name: "Laravel", icon: "https://laravel.com/img/logomark.min.svg" },
  {
    name: "Docker",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
  },
  {
    name: "TensorFlow",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg",
  },
];

const PARTICLES = [
  { label: "</>", top: "12%", left: "6%", delay: 0 },
  { label: "{ }", top: "22%", left: "48%", delay: 1.2 },
  { label: "npm", top: "70%", left: "4%", delay: 0.6 },
  { label: "git", top: "82%", left: "44%", delay: 1.8 },
  { label: "API", top: "10%", left: "90%", delay: 0.9 },
  { label: "=>", top: "88%", left: "88%", delay: 2.1 },
];

const STATS = [
  { value: "3+", label: "Ans d'expérience" },
  { value: "7+", label: "Projets réalisés" },
  { value: "10+", label: "Technologies" },
];

export const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  /* ---------- typewriter ---------- */
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[roleIndex];
    const delay = !deleting && text === full ? 1600 : deleting ? 30 : 70;
    const t = setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
        return;
      }
      setText(
        deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)
      );
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, roleIndex]);

  /* ---------- 3D tilt on the photo ---------- */
  const portraitRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(mx, { stiffness: 120, damping: 14 });
  const rotateX = useSpring(my, { stiffness: 120, damping: 14 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 20);
    my.set(-((e.clientY - rect.top) / rect.height - 0.5) * 20);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  /* ---------- orbit ring around the photo ---------- */
  const orbitRefs = useRef<(HTMLDivElement | null)[]>([]);
  useAnimationFrame((t) => {
    const el = portraitRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    const rx = w * 0.56;
    const ry = h * 0.2;
    const tilt = -0.28;
    ORBIT.forEach((_, i) => {
      const node = orbitRefs.current[i];
      if (!node) return;
      const a = (t / 1000) * 0.5 + (i * Math.PI * 2) / ORBIT.length;
      const ex = Math.cos(a) * rx;
      const ey = Math.sin(a) * ry;
      const x = ex * Math.cos(tilt) - ey * Math.sin(tilt);
      const y = ex * Math.sin(tilt) + ey * Math.cos(tilt) + h * 0.05;
      const depth = (Math.sin(a) + 1) / 2;
      node.style.transform = `translate(${x}px, ${y}px) scale(${0.7 + 0.4 * depth})`;
      node.style.opacity = String(0.5 + 0.5 * depth);
      node.style.zIndex = depth > 0.5 ? "30" : "5";
    });
  });

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center px-gutter overflow-hidden transition-all duration-1000"
    >
      {/* ---------- animated background ---------- */}
      <motion.div
        className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-primary/15 blur-3xl pointer-events-none"
        animate={{ x: [0, 50, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-24 w-[520px] h-[520px] rounded-full bg-purple-500/15 blur-3xl pointer-events-none"
        animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(circle at 60% 50%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at 60% 50%, black 20%, transparent 70%)",
        }}
      />
      {PARTICLES.map((p) => (
        <motion.span
          key={p.label}
          className="absolute hidden md:block px-2 py-1 rounded-md text-xs font-mono text-primary/70 bg-primary/5 border border-primary/10 pointer-events-none"
          style={{ top: p.top, left: p.left }}
          animate={{ y: [0, -14, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{
            duration: 5,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.label}
        </motion.span>
      ))}

      <div className="max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-24">
        {/* ---------- left column ---------- */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-primary/20 bg-primary/5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Disponible pour de nouveaux projets
          </div>

          <h2 className="font-label-caps text-label-caps text-primary mb-4 uppercase tracking-widest">
            Nidhal Gharbi
          </h2>
          <h1 className="font-display-lg-mobile md:text-display-lg mb-4 leading-tight">
            Développeur Web{" "}
            <motion.span
              className="bg-gradient-to-r from-primary via-cyan-300 to-purple-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              Full Stack
            </motion.span>
          </h1>

          {/* typewriter */}
          <div className="h-8 mb-6 font-mono text-lg text-on-surface-variant">
            <span className="text-primary">&gt; </span>
            {text}
            <span className="inline-block w-[2px] h-5 ml-0.5 align-middle bg-primary animate-pulse" />
          </div>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-10">
            Passionné par la création d&apos;expériences web modernes et intuitives.
            Je transforme des idées en solutions numériques innovantes avec une précision technique inégalée.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-body-md text-body-md flex items-center gap-2 border border-primary/20 shadow-lg shadow-primary/20"
            >
              <motion.span
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                initial={{ left: "-40%" }}
                animate={{ left: ["-40%", "140%"] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: "easeInOut",
                }}
              />
              <span className="relative">Voir mes projets</span>
              <motion.span
                className="material-symbols-outlined relative"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                arrow_forward
              </motion.span>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-xl font-body-md text-body-md border border-primary/30 hover:bg-primary/10 transition-colors"
            >
              Me contacter
            </motion.a>

            <div className="flex items-center gap-6 ml-2">
              <motion.a
                whileHover={{ y: -4, scale: 1.15 }}
                href="https://github.com/nidhalghar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>code</span>
              </motion.a>
              <motion.a
                whileHover={{ y: -4, scale: 1.15 }}
                href="https://www.linkedin.com/in/nidhal-gharbi-6b27a8254/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">link</span>
              </motion.a>
            </div>
          </div>

          {/* stats */}
          <div className="flex flex-wrap gap-8 mt-12">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
              >
                <div className="text-3xl font-bold text-primary">{s.value}</div>
                <div className="text-xs uppercase tracking-widest text-on-surface-variant">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ---------- right column: 3D portrait ---------- */}
        <motion.div
          className="lg:col-span-5 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            ref={portraitRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px]"
            style={{ perspective: 1000 }}
          >
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse" />

            {/* orbiting technologies */}
            {ORBIT.map((t, i) => (
              <div
                key={t.name}
                ref={(el) => {
                  orbitRefs.current[i] = el;
                }}
                className="absolute left-1/2 top-1/2 will-change-transform"
                style={{ marginLeft: -26, marginTop: -26 }}
                title={t.name}
              >
                <div className="w-[52px] h-[52px] rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg shadow-black/30 flex items-center justify-center p-2.5">
                  <Image
                    src={t.icon}
                    alt={t.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            ))}

            {/* tilting portrait */}
            <motion.div
              className="relative z-10 w-full h-full"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* spinning rings */}
              <motion.div
                className="absolute -inset-3 rounded-full border border-dashed border-primary/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-6 rounded-full border border-primary/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              />

              <div
                className="relative w-full h-full rounded-full border border-primary/30 p-4 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/20"
                style={{ transform: "translateZ(20px)" }}
              >
                <Image
                  src="/nidhal cv image.png"
                  alt="Nidhal Gharbi"
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              </div>

              {/* status card popped out in 3D */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-surface-container-high glass-effect p-6 rounded-2xl shadow-2xl"
                style={{ transform: "translateZ(70px)" }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <span className="material-symbols-outlined text-primary">verified</span>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-primary">Status</div>
                    <div className="font-body-md text-body-md font-bold">Disponible pour projets</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ---------- scroll indicator ---------- */}
      <motion.a
        href="#about"
        aria-label="Défiler vers le bas"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="w-5 h-8 rounded-full border border-current flex justify-center pt-1.5">
          <motion.span
            className="w-1 h-1.5 rounded-full bg-current"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </span>
      </motion.a>
    </section>
  );
};