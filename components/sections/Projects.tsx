"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
}

const projects: Project[] = [
  {
    title: "FreeOui - Gestion d'offres promotionnelles",
    description: "Application web complète de gestion et diffusion d'offres promotionnelles, offrant une expérience utilisateur optimisée pour la découverte et la gestion des promotions.",
    image: "/freeoui.png",
    tags: ["Nuxt.js", "Laravel", "MongoDB", "Firebase", "REST API", "Tailwind"],
    demoLink: "https://freeoui.com",
  },
  {
    title: "SRTSILIANA - Gestion des abonnements scolaires",
    description: "Plateforme web de gestion des abonnements scolaires avec maintenance continue et améliorations des fonctionnalités pour une meilleure expérience utilisateur.",
    image: "/srts.png",
    tags: ["Laravel", "Bootstrap", "REST API"],
    demoLink: "https://srtsiliana.tn",
  },
  {
    title: "ADAPT - Gestion des remboursements agricoles",
    description: "Plateforme web dédiée à la gestion des remboursements et au suivi des agriculteurs, incluant des fonctionnalités avancées de vérification et de reporting.",
    image: "/adapt.png",
    tags: ["Laravel", "Bootstrap", "REST API"],
    demoLink: "https://adapt-cereales.org/",
  },
  {
    title: "Saphir Palace - Gestion hôtelière",
    description: "Application web complète pour la gestion des opérations hôtelières, incluant réservations, planning des chambres, facturation et suivi client.",
    image: "/saphir.png",
    tags: ["Laravel", "Bootstrap", "REST API", "MySQL"],
    demoLink: "https://saphir.demos.tn",
  },
  {
    title: "Dot Expo - Gestion d'événements",
    description: "Application web de gestion d'événements avec fonctionnalités de réservation de stands, gestion des exposants et interface d'administration sécurisée.",
    image: "/dotexpo.png",
    tags: ["Next.js", "Shadcn UI", "MongoDB", "GitHub"],
    demoLink: "https://dotexpo.4prod.tn",
  },
  {
    title: "Resum.io - Builder de CV & Lettres de Motivation",
    description: "Application web complète de création et gestion de CV professionnels et lettres de motivation, avec des templates personnalisables et un système de recrutement intégré.",
    image: "/resume.png",
    tags: ["Next.js", "Shadcn UI", "MongoDB", "GitHub", "PDF Generation", "AI Assistant"],
    demoLink: "http://34.121.203.29:3000/",
  },
  {
    title: "Privatechlab - Site Vitrine",
    description: "Site web one-page moderne pour une société de développement, présentant les services, l'équipe et les réalisations avec une interface élégante et responsive.",
    image: "/priva.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    demoLink: "https://privatechlab.com",
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group relative h-full"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden h-full">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded-full bg-white/20 text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {project.description}
          </p>
          <div className="flex gap-4">
            <Button
              variant="default"
              className="bg-gradient-to-r from-[#008090] to-[#008090] hover:from-[#008090]/80 hover:to-[#008090]/80"
              asChild
            >
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                Voir la démo
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Créer des groupes de 3 projets pour le slider
  const projectGroups = [];
  for (let i = 0; i < projects.length; i += 3) {
    projectGroups.push(projects.slice(i, i + 3));
  }

  return (
    <section ref={ref} id="projects" className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/10 to-transparent dark:from-transparent dark:via-purple-900/10 dark:to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#008090] via-[#008090] to-[#008090]">
            Mes Projets
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Découvrez mes principales réalisations professionnelles
          </p>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          spaceBetween={30}
          className="project-slider"
        >
          {projectGroups.map((group, groupIndex) => (
            <SwiperSlide key={groupIndex}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};