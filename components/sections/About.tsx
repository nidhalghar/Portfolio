"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TechShowcase } from "./TechShowcase";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={ref} id="about" className="py-20 bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ color: "#008090" }}>
          À Propos de Moi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Content and Stats */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl backdrop-blur-sm bg-opacity-50 dark:bg-opacity-50">
              <div className="space-y-6">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-lg text-gray-600 dark:text-gray-300"
                >
                  Développeur Full Stack avec plus de 3 ans d&#39;expérience, je conçois des applications web fiables et performantes. Je maîtrise plusieurs technologies front-end et back-end : Next.js, Nuxt, Angular, React, Laravel et Symfony. Autonome, curieux et rigoureux, je cherche à contribuer à des projets innovants tout en continuant à progresser dans un environnement stimulant.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-lg text-gray-600 dark:text-gray-300"
                >
                  Mon objectif est de créer des expériences utilisateur exceptionnelles
                  en combinant un design élégant avec des fonctionnalités robustes.
                </motion.p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { number: "3+", label: "Années d'expérience" },
                    { number: "7+", label: "Projets Réalisés" },
                    { number: "6+", label: "Technologies Maîtrisées" },
                    { number: "100%", label: "Satisfaction Client" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                      transition={{ delay: 0.2 * index, duration: 0.5 }}
                      className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10"
                    >
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Animated 3D tech showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7 }}
            className="relative h-full min-h-[460px]"
          >
            <TechShowcase />
          </motion.div>
        </div>
      </div>
    </section>
  );
};