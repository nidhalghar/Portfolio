"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const stats = [
    { number: "2+", label: "ANNÉE EXPÉRIENCE", icon: "history_edu" },
    { number: "7+", label: "PROJETS RÉALISÉS", icon: "rocket_launch" },
    { number: "5+", label: "TECHNOLOGIES MAÎTRISÉES", icon: "code" },
    { number: "90%", label: "SATISFACTION CLIENT", icon: "emoji_events" },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="py-24 px-gutter bg-surface-container-lowest transition-all duration-1000"
    >
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-label-caps text-label-caps text-primary mb-2 tracking-widest">
                PROFIL
              </h2>
              <h3 className="font-headline-md text-headline-md mb-6">
                À Propos de Moi
              </h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Développeur Full Stack avec un an d&apos;expérience, je conçois des applications web fiables et performantes. Autonome, curieux et rigoureux, je cherche à contribuer à des projets innovants tout en continuant à progresser dans un environnement stimulant.
              </p>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 leading-relaxed">
                Mon objectif est de créer des expériences utilisateur exceptionnelles en combinant un design élégant avec des fonctionnalités robustes.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 glass-effect rounded-2xl border border-outline-variant/20 hover:border-primary/30 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-symbols-outlined text-primary">
                      {stat.icon}
                    </span>
                    <div className="text-4xl font-bold text-primary">
                      {stat.number}
                    </div>
                  </div>
                  <div className="font-label-caps text-label-caps text-on-surface-variant">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-full min-h-[400px] flex items-center justify-center bg-surface-container rounded-2xl p-8"
          >
            <div className="relative w-full max-w-[320px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-9xl text-primary/20">
                  <span className="material-symbols-outlined" style={{ fontSize: "10rem" }}>
                    developer_mode
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
