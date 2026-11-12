"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

interface Skill {
  name: string;
  category: string;
  icon: string;
}

const skills: Skill[] = [
  {
    name: "Next.js",
    icon: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg",
    category: "FRONTEND",
  },
  {
    name: "Nuxt.js",
    icon: "/nuxt-js-logo.png",
    category: "FRONTEND",
  },
  {
    name: "Laravel",
    icon: "https://laravel.com/img/logomark.min.svg",
    category: "BACKEND",
  },
  {
    name: "Symfony",
    icon: "https://symfony.com/logos/symfony_black_03.svg",
    category: "BACKEND",
  },
  {
    name: "Python",
    icon: "https://www.python.org/static/community_logos/python-logo-generic.svg",
    category: "BACKEND",
  },
  {
    name: "TypeScript",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    category: "FRONTEND",
  },
  {
    name: "JavaScript",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    category: "FRONTEND",
  },
  {
    name: "HTML5",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
    category: "FRONTEND",
  },
  {
    name: "CSS3",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
    category: "FRONTEND",
  },
  {
    name: "React Native",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    category: "MOBILE",
  },
  {
    name: "Tauri",
    icon: "/tauri.svg",
    category: "DESKTOP",
  },
  {
    name: "Docker",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
    category: "DEVOPS",
  },
  {
    name: "Deep Learning",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg",
    category: "IA",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  FRONTEND: "#22d3ee",
  BACKEND: "#a78bfa",
  MOBILE: "#34d399",
  DESKTOP: "#fbbf24",
  DEVOPS: "#60a5fa",
  IA: "#f472b6",
};

const FILTERS = ["TOUS", ...Object.keys(CATEGORY_COLORS)];

/* ---------- 3D tilt card ---------- */
const SkillCard = ({
  skill,
  index,
  isInView,
}: {
  skill: Skill;
  index: number;
  isInView: boolean;
}) => {
  const color = CATEGORY_COLORS[skill.category] ?? "#a78bfa";
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [16, -16]), {
    stiffness: 220,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-16, 16]), {
    stiffness: 220,
    damping: 18,
  });
  const gx = useTransform(x, (v) => v * 100);
  const gy = useTransform(y, (v) => v * 100);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22), transparent 55%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    x.set(0.5);
    y.set(0.5);
    setHovered(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.8 }
      }
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{ perspective: 900 }}
    >
      {/* idle floating */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration: 4 + (index % 3),
          delay: index * 0.25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          onMouseMove={handleMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            borderColor: hovered ? `${color}88` : "rgba(255,255,255,0.08)",
            boxShadow: hovered
              ? `0 25px 50px -15px ${color}66, 0 0 30px -5px ${color}44`
              : "0 10px 30px -15px rgba(0,0,0,0.5)",
          }}
          className="relative group p-8 rounded-2xl text-center glass-effect border bg-white/5 backdrop-blur-md transition-[border-color,box-shadow] duration-300 overflow-hidden cursor-pointer"
        >
          {/* glare following the cursor */}
          <motion.div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{ background: glare, opacity: hovered ? 1 : 0 }}
          />

          {/* top accent line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 opacity-70"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            }}
          />

          {/* icon, popped out in 3D */}
          <div
            className="relative w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center p-3"
            style={{
              transform: "translateZ(50px)",
              background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
            }}
          >
            {/* spinning ring */}
            <motion.span
              className="absolute inset-0 rounded-full border border-dashed"
              style={{ borderColor: `${color}66` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="w-full h-full"
              animate={hovered ? { scale: 1.2, rotate: 6 } : { scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Image
                src={skill.icon}
                alt={skill.name}
                width={48}
                height={48}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </motion.div>
          </div>

          <h4
            className="font-body-md text-body-md font-bold mb-2"
            style={{ transform: "translateZ(30px)" }}
          >
            {skill.name}
          </h4>
          <span
            className="inline-block px-3 py-0.5 rounded-full text-[10px] font-semibold tracking-widest"
            style={{
              transform: "translateZ(20px)",
              color,
              background: `${color}1a`,
              border: `1px solid ${color}44`,
            }}
          >
            {skill.category}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ---------- Section ---------- */
export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [filter, setFilter] = useState("TOUS");

  const filtered =
    filter === "TOUS" ? skills : skills.filter((s) => s.category === filter);

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-24 px-gutter overflow-hidden transition-all duration-1000"
    >
      {/* animated background */}
      <motion.div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-purple-500/15 blur-3xl pointer-events-none"
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at center, black 25%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 25%, transparent 75%)",
        }}
      />

      <div className="relative z-10 max-w-container-max mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-label-caps text-label-caps text-primary mb-2">
            EXPERTISE
          </h2>
          <h3 className="font-headline-md text-headline-md">
            Mes Compétences
          </h3>
          <p className="mt-3 text-sm opacity-60">
            {skills.length} technologies · passez la souris sur les cartes
          </p>
        </motion.div>

        {/* category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {FILTERS.map((f) => {
            const active = filter === f;
            const c = CATEGORY_COLORS[f] ?? "#ffffff";
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest border transition-colors"
                style={{
                  borderColor: active ? `${c}99` : "rgba(255,255,255,0.12)",
                  color: active ? c : "inherit",
                  opacity: active ? 1 : 0.7,
                }}
              >
                {active && (
                  <motion.span
                    layoutId="skill-filter-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: `${c}22` }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            );
          })}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
                isInView={isInView}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};