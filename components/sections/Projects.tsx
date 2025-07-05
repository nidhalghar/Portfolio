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
    tags: [ "Laravel", "Bootstrap", "REST API",],
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
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">{project.title}</h3>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {project.tags.slice(0, 4).map((tag, i) => (
                <span
                  key={i}
                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full bg-white/20 text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full bg-white/20 text-white backdrop-blur-sm">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 sm:line-clamp-4">
            {project.description}
          </p>
          <div className="flex gap-2 sm:gap-4">
            <Button
              variant="default"
              size="sm"
              className="bg-gradient-to-r from-[#008090] to-[#008090] hover:from-[#008090]/80 hover:to-[#008090]/80 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
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

  return (
    <section ref={ref} id="projects" className="py-12 sm:py-16 lg:py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/10 to-transparent dark:from-transparent dark:via-purple-900/10 dark:to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#008090] via-[#008090] to-[#008090]">
            Mes Projets
          </h2>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez mes principales réalisations professionnelles
          </p>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ 
            clickable: true,
            el: '.swiper-pagination',
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="project-slider"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <ProjectCard project={project} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination centrée sous le carrousel */}
        <div className="swiper-pagination !mt-6 !mb-0 flex justify-center"></div>

        {/* Navigation buttons */}
        <div className="flex justify-center items-center mt-4 gap-4">
          <button className="swiper-button-prev !static !w-10 !h-10 !bg-white dark:!bg-gray-800 !rounded-full !shadow-lg hover:!bg-gray-50 dark:hover:!bg-gray-700 transition-colors">
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="swiper-button-next !static !w-10 !h-10 !bg-white dark:!bg-gray-800 !rounded-full !shadow-lg hover:!bg-gray-50 dark:hover:!bg-gray-700 transition-colors">
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx global>{`
        .project-slider .swiper-pagination-bullet {
          background: #008090;
          opacity: 0.3;
        }
        .project-slider .swiper-pagination-bullet-active {
          opacity: 1;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          display: none !important;
        }
      `}</style>
    </section>
  );
};