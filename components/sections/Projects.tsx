"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
}

const projects: Project[] = [
  {
    title: "BLT Travel",
    description:
      "Site d'agence de voyage de catégorie A : réservation d'hôtels, circuits, excursions et transferts en Tunisie, avec moteur de recherche et espace client.",
    image: "/BLT.png",
    tags: ["Voyage", "Réservation"],
    demoLink: "https://blt.tn/",
  },
  {
    title: "SRTSILIANA",
    description:
      "Plateforme de gestion des abonnements scolaires avec maintenance continue et améliorations.",
    image: "/srts.png",
    tags: ["Laravel", "UX"],
    demoLink: "https://srtsiliana.tn",
  },
  {
    title: "Didi Travel",
    description:
      "Plateforme d'agence de voyage : hôtels Tunisie et monde, billetterie, Omra, voyages organisés et espace B2B pour les agences partenaires.",
    image: "/DIDI.png",
    tags: ["Voyage", "B2B"],
    demoLink: "https://diditraveltunisia.com/",
  },
  {
    title: "Saphir Palace",
    description:
      "Application de gestion hôtelière complète pour réservations et facturations.",
    image: "/saphir.png",
    tags: ["Laravel", "Booking"],
    demoLink: "https://saphir.demos.tn",
  },
  {
    title: "Tracksolid Pro",
    description:
      "Plateforme de suivi GPS et de gestion de flotte avec espace client sécurisé et tableau de bord d'administration.",
    image: "/Tracksolid.png",
    tags: ["Tracking", "Dashboard"],
    demoLink: "https://app.tracksolidpro.tn/",
  },
  {
    title: "2nsolution",
    description:
      "Application de création de CV professionnels avec templates personnalisables.",
    image: "/resume.png",
    tags: ["Next.js", "Builder"],
    demoLink: "https://2nsolution.com/",
  },
];

const hostname = (url: string) => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
};

/* ---------- 3D tilt project card ---------- */
const ProjectCard = ({
  project,
  index,
  isInView,
}: {
  project: Project;
  index: number;
  isInView: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [7, -7]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-7, 7]), {
    stiffness: 200,
    damping: 20,
  });
  const gx = useTransform(x, (v) => v * 100);
  const gy = useTransform(y, (v) => v * 100);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.14), transparent 55%)`;

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
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="project-card group relative rounded-2xl overflow-hidden glass-effect flex flex-col h-full border border-white/10 hover:border-primary/40 transition-colors duration-300 hover:shadow-2xl hover:shadow-primary/20"
      >
        {/* glare */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
          style={{ background: glare, opacity: hovered ? 1 : 0 }}
        />

        {/* number badge */}
        <span className="absolute top-14 right-4 z-10 font-mono text-xs text-white/70 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* browser-style frame */}
        <a
          href={project.demoLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ouvrir ${project.title}`}
          className="block"
        >
          <div className="flex items-center gap-1.5 px-3 py-2 bg-black/30 border-b border-white/10">
            <span className="w-2 h-2 rounded-full bg-red-400/80" />
            <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
            <span className="w-2 h-2 rounded-full bg-green-400/80" />
            <span className="ml-2 flex-1 truncate rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono text-white/50">
              {hostname(project.demoLink)}
            </span>
          </div>

          <div className="relative overflow-hidden aspect-video bg-surface-bright">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="grayscale-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* gradient + CTA on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-on-primary translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                Visiter le site
                <span className="material-symbols-outlined text-base">
                  open_in_new
                </span>
              </span>
            </div>
          </div>
        </a>

        <div
          className="p-8 flex flex-col grow"
          style={{ transform: "translateZ(25px)" }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="font-label-caps text-[10px] bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
          <h4 className="font-headline-md text-xl mb-4">{project.title}</h4>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6 grow">
            {project.description}
          </p>
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary flex items-center gap-2 font-bold group-hover:translate-x-2 transition-transform"
          >
            Découvrir
            <span className="material-symbols-outlined">north_east</span>
          </a>
        </div>

        {/* bottom accent line */}
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary via-cyan-300 to-purple-400 group-hover:w-full transition-all duration-500" />
      </motion.div>
    </motion.div>
  );
};

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="projects"
      className="relative py-24 px-gutter bg-surface-container-lowest overflow-hidden transition-all duration-1000"
    >
      {/* animated background */}
      <motion.div
        className="absolute top-20 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 -left-24 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(circle at center, black 25%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 25%, transparent 75%)",
        }}
      />

      <div className="relative z-10 max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-label-caps text-label-caps text-primary mb-2">
              PORTFOLIO
            </h2>
            <h3 className="font-headline-md text-headline-md">Mes Projets</h3>
            <motion.div
              className="mt-3 h-1 rounded-full bg-gradient-to-r from-primary to-purple-400"
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body-md text-body-md text-on-surface-variant max-w-md"
          >
            Découvrez mes principales réalisations professionnelles, alliant design raffiné et performance technique.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};