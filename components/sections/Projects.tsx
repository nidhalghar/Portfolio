"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
    title: "FreeOui",
    description: "Application de gestion et diffusion d'offres promotionnelles avec expérience utilisateur optimisée.",
    image: "/freeoui.png",
    tags: ["Laravel", "API"],
    demoLink: "https://freeoui.com",
  },
  {
    title: "SRTSILIANA",
    description: "Plateforme de gestion des abonnements scolaires avec maintenance continue et améliorations.",
    image: "/srts.png",
    tags: ["Laravel", "UX"],
    demoLink: "https://srtsiliana.tn",
  },
  {
    title: "Padel Society",
    description: "Gestion d'un club de padel premium : réservations, adhésions et gestion d'événements.",
    image: "/padel-society.png",
    tags: ["Nuxt.js", "MongoDB"],
    demoLink: "https://padel.4prod.tn/",
  },
  {
    title: "Saphir Palace",
    description: "Application de gestion hôtelière complète pour réservations et facturations.",
    image: "/saphir.png",
    tags: ["Laravel", "Booking"],
    demoLink: "https://saphir.demos.tn",
  },
  {
    title: "Dot Expo",
    description: "Gestion d'événements avec réservation de stands et administration sécurisée.",
    image: "/dotexpo.png",
    tags: ["Next.js", "Shadcn UI"],
    demoLink: "https://dotexpo.tn",
  },
  {
    title: "2nsolution",
    description: "Application de création de CV professionnels avec templates personnalisables.",
    image: "/resume.png",
    tags: ["Next.js", "Builder"],
    demoLink: "https://2nsolution.com/",
  },
];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="projects"
      className="py-24 px-gutter bg-surface-container-lowest transition-all duration-1000"
    >
      <div className="max-w-container-max mx-auto">
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
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="project-card group rounded-2xl overflow-hidden glass-effect flex flex-col h-full"
            >
              <div className="relative overflow-hidden aspect-video bg-surface-bright">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="grayscale-image w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col grow">
                <div className="flex gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="font-label-caps text-[10px] bg-primary/10 text-primary px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="font-headline-md text-xl mb-4">
                  {project.title}
                </h4>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
