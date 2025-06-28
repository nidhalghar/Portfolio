"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
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
                  Développeur Full Stack avec un an d'expérience, je conçois des applications web fiables et performantes. Autonome, curieux et rigoureux, je cherche à contribuer à des projets innovants tout en continuant à progresser dans un environnement stimulant.
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
                    { number: "1+", label: "Année d'expérience" },
                    { number: "7+", label: "Projets Réalisés" },
                    { number: "5+", label: "Technologies Maîtrisées" },
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

          {/* Right Column - Computer Trace */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7 }}
            className="relative h-full flex items-center justify-center"
          >
            <div className="w-full aspect-square relative">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full stroke-current text-purple-500 dark:text-purple-400"
                style={{ 
                  filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.2))',
                  strokeWidth: '2',
                  strokeLinecap: 'round',
                  fill: 'none'
                }}
              >
                {/* Monitor Stand */}
                <path
                  d="M180,300 L220,300 L230,340 L170,340 Z"
                  className="animate-draw-infinite"
                />
                
                {/* Monitor Base */}
                <path
                  d="M150,340 L250,340"
                  className="animate-draw-infinite"
                />
                
                {/* Monitor Frame */}
                <path
                  d="M100,100 L300,100 L300,280 L100,280 Z"
                  className="animate-draw-infinite"
                />
                
                {/* Screen Inner */}
                <path
                  d="M110,110 L290,110 L290,270 L110,270 Z"
                  className="animate-draw-infinite"
                />
                
                {/* Menu Bar */}
                <path
                  d="M110,110 L290,110 L290,130 L110,130 Z"
                  className="animate-draw-infinite"
                />
                
                {/* Window Controls */}
                <circle cx="125" cy="120" r="5" className="animate-draw-infinite" />
                <circle cx="145" cy="120" r="5" className="animate-draw-infinite" />
                <circle cx="165" cy="120" r="5" className="animate-draw-infinite" />
                
                {/* Code Editor Layout */}
                <path
                  d="M120,140 L180,140 L180,260 L120,260"
                  className="animate-draw-infinite"
                />
                
                {/* Code Lines */}
                <path d="M130,160 L170,160" className="animate-draw-infinite" />
                <path d="M130,180 L160,180" className="animate-draw-infinite" />
                <path d="M130,200 L165,200" className="animate-draw-infinite" />
                <path d="M130,220 L155,220" className="animate-draw-infinite" />
                
                {/* Main Content Area */}
                <path
                  d="M190,140 L280,140 L280,260 L190,260"
                  className="animate-draw-infinite"
                />
                
                {/* Content Elements */}
                <path d="M200,160 L270,160" className="animate-draw-infinite" />
                <path d="M200,180 L260,180" className="animate-draw-infinite" />
                <path d="M200,200 L265,200" className="animate-draw-infinite" />
                
                {/* Decorative Elements */}
                <path
                  d="M320,150 C330,150 340,160 340,170 C340,180 330,190 320,190"
                  className="animate-draw-infinite"
                />
                <path
                  d="M60,220 C70,220 80,230 80,240 C80,250 70,260 60,260"
                  className="animate-draw-infinite"
                />
                
                {/* Connection Lines */}
                <path
                  d="M340,170 L360,170 M350,160 L350,180"
                  className="animate-draw-infinite"
                />
                <path
                  d="M40,240 L60,240 M50,230 L50,250"
                  className="animate-draw-infinite"
                />
                
                {/* Status Bar */}
                <path
                  d="M110,250 L290,250"
                  className="animate-draw-infinite"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 