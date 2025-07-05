"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentTraceIndex, setCurrentTraceIndex] = useState(0);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Array of different SVG traces
  const traces = [
    // Computer trace
    {
      name: "Computer",
      content: (
        <>
          {/* Monitor Frame */}
          <path 
            d="M100,60 L300,60 C310,60 320,70 320,80 L320,260 C320,270 310,280 300,280 L100,280 C90,280 80,270 80,260 L80,80 C80,70 90,60 100,60 Z" 
            className="animate-draw-infinite"
          />
          {/* Screen */}
          <path 
            d="M95,75 L305,75 L305,265 L95,265 Z" 
            className="animate-draw-infinite"
          />
          {/* Stand */}
          <path 
            d="M160,280 L240,280 L260,320 L140,320 Z M150,320 L250,320 L270,340 L130,340 Z" 
            className="animate-draw-infinite"
          />
          {/* Menu Bar */}
          <path 
            d="M95,75 L305,75 L305,95 L95,95 Z" 
            className="animate-draw-infinite"
          />
          {/* Window Controls */}
          <circle cx="110" cy="85" r="4" className="animate-draw-infinite" />
          <circle cx="125" cy="85" r="4" className="animate-draw-infinite" />
          <circle cx="140" cy="85" r="4" className="animate-draw-infinite" />
          {/* Code Editor */}
          <path d="M110,110 L290,110 M110,130 L240,130 M110,150 L270,150 M110,170 L250,170" 
            className="animate-draw-infinite" 
            strokeDasharray="4,6"
          />
          {/* Decorative Elements */}
          <path 
            d="M320,140 C330,140 340,150 340,160 M80,220 C70,220 60,230 60,240" 
            className="animate-draw-infinite"
          />
        </>
      ),
    },
    // Smartphone trace
    {
      name: "Smartphone",
      content: (
        <>
          {/* Phone Frame */}
          <path 
            d="M140,40 C130,40 120,50 120,60 L120,340 C120,350 130,360 140,360 L260,360 C270,360 280,350 280,340 L280,60 C280,50 270,40 260,40 L140,40 Z" 
            className="animate-draw-infinite"
          />
          {/* Screen */}
          <path 
            d="M130,70 L270,70 L270,310 L130,310 Z" 
            className="animate-draw-infinite"
          />
          {/* Top Speaker */}
          <path 
            d="M180,50 L220,50 C225,50 230,52 230,55 C230,58 225,60 220,60 L180,60 C175,60 170,58 170,55 C170,52 175,50 180,50 Z" 
            className="animate-draw-infinite"
          />
          {/* Home Button */}
          <circle cx="200" cy="335" r="12" className="animate-draw-infinite" />
          <circle cx="200" cy="335" r="10" className="animate-draw-infinite" />
          {/* App Grid */}
          <path 
            d="M150,90 L250,90 L250,290 L150,290 Z" 
            className="animate-draw-infinite"
            strokeDasharray="2,4"
          />
          {/* App Icons */}
          <rect x="160" y="100" width="35" height="35" rx="8" className="animate-draw-infinite" />
          <rect x="205" y="100" width="35" height="35" rx="8" className="animate-draw-infinite" />
          <rect x="160" y="145" width="35" height="35" rx="8" className="animate-draw-infinite" />
          <rect x="205" y="145" width="35" height="35" rx="8" className="animate-draw-infinite" />
        </>
      ),
    },
    // Website trace
    {
      name: "Website",
      content: (
        <>
          {/* Browser Window */}
          <path 
            d="M80,40 L320,40 C330,40 340,50 340,60 L340,340 C340,350 330,360 320,360 L80,360 C70,360 60,350 60,340 L60,60 C60,50 70,40 80,40 Z" 
            className="animate-draw-infinite"
          />
          {/* Navigation Bar */}
          <path 
            d="M60,40 L340,40 L340,80 L60,80 Z" 
            className="animate-draw-infinite"
          />
          {/* URL Bar */}
          <path 
            d="M85,55 C90,55 95,58 95,62 L305,62 C310,62 315,58 315,55 L315,65 C315,68 310,72 305,72 L95,72 C90,72 85,68 85,65 Z" 
            className="animate-draw-infinite"
          />
          {/* Browser Controls */}
          <circle cx="85" cy="60" r="4" className="animate-draw-infinite" />
          <circle cx="100" cy="60" r="4" className="animate-draw-infinite" />
          <circle cx="115" cy="60" r="4" className="animate-draw-infinite" />
          {/* Content Layout */}
          <path 
            d="M80,100 L320,100 M80,140 L320,140" 
            className="animate-draw-infinite"
          />
          {/* Hero Section */}
          <path 
            d="M100,160 L300,160 L300,240 L100,240 Z" 
            className="animate-draw-infinite"
          />
          {/* Content Grid */}
          <path 
            d="M100,260 L180,260 L180,320 L100,320 Z M220,260 L300,260 L300,320 L220,320 Z" 
            className="animate-draw-infinite"
          />
        </>
      ),
    },
    // AI trace
    {
      name: "AI",
      content: (
        <>
          {/* Circuit Board Background */}
          <path 
            d="M60,60 L340,60 L340,340 L60,340 Z" 
            className="animate-draw-infinite"
            strokeDasharray="5,10"
          />
          {/* Neural Network */}
          {/* Input Layer */}
          <circle cx="120" cy="140" r="15" className="animate-draw-infinite" />
          <circle cx="120" cy="200" r="15" className="animate-draw-infinite" />
          <circle cx="120" cy="260" r="15" className="animate-draw-infinite" />
          {/* Hidden Layer 1 */}
          <circle cx="200" cy="120" r="15" className="animate-draw-infinite" />
          <circle cx="200" cy="200" r="15" className="animate-draw-infinite" />
          <circle cx="200" cy="280" r="15" className="animate-draw-infinite" />
          {/* Hidden Layer 2 */}
          <circle cx="280" cy="160" r="15" className="animate-draw-infinite" />
          <circle cx="280" cy="240" r="15" className="animate-draw-infinite" />
          {/* Connections */}
          <path 
            d="M135,140 L185,120 M135,140 L185,200 M135,200 L185,120 M135,200 L185,200 M135,200 L185,280 M135,260 L185,200 M135,260 L185,280" 
            className="animate-draw-infinite"
            strokeOpacity="0.6"
          />
          <path 
            d="M215,120 L265,160 M215,200 L265,160 M215,200 L265,240 M215,280 L265,240" 
            className="animate-draw-infinite"
            strokeOpacity="0.6"
          />
          {/* Data Flow Animation */}
          <circle cx="160" cy="160" r="3" className="animate-pulse" />
          <circle cx="240" cy="200" r="3" className="animate-pulse" />
          <circle cx="200" cy="240" r="3" className="animate-pulse" />
        </>
      ),
    },
    // Mobile App trace
    {
      name: "Mobile App",
      content: (
        <>
          {/* App Container */}
          <path 
            d="M80,40 C70,40 60,50 60,60 L60,340 C60,350 70,360 80,360 L320,360 C330,360 340,350 340,340 L340,60 C340,50 330,40 320,40 L80,40 Z" 
            className="animate-draw-infinite"
          />
          {/* Status Bar */}
          <path 
            d="M60,40 L340,40 L340,70 L60,70 Z" 
            className="animate-draw-infinite"
          />
          {/* Navigation */}
          <path 
            d="M60,320 L340,320 L340,360 L60,360 Z" 
            className="animate-draw-infinite"
          />
          {/* Nav Icons */}
          <circle cx="120" cy="340" r="8" className="animate-draw-infinite" />
          <circle cx="200" cy="340" r="8" className="animate-draw-infinite" />
          <circle cx="280" cy="340" r="8" className="animate-draw-infinite" />
          {/* Content Cards */}
          <path 
            d="M80,90 L320,90 C325,90 330,95 330,100 L330,140 C330,145 325,150 320,150 L80,150 C75,150 70,145 70,140 L70,100 C70,95 75,90 80,90 Z" 
            className="animate-draw-infinite"
          />
          <path 
            d="M80,170 L320,170 C325,170 330,175 330,180 L330,220 C330,225 325,230 320,230 L80,230 C75,230 70,225 70,220 L70,180 C70,175 75,170 80,170 Z" 
            className="animate-draw-infinite"
          />
          <path 
            d="M80,250 L320,250 C325,250 330,255 330,260 L330,300 C330,305 325,310 320,310 L80,310 C75,310 70,305 70,300 L70,260 C70,255 75,250 80,250 Z" 
            className="animate-draw-infinite"
          />
        </>
      ),
    },
  ];

  // Effect to change trace every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTraceIndex((prevIndex) => (prevIndex + 1) % traces.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [traces.length]);

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

          {/* Right Column - Animated Traces */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7 }}
            className="relative h-full min-h-[400px] flex items-center justify-center bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-xl backdrop-blur-sm p-8"
          >
            <div className="relative w-full max-w-[400px] mx-auto aspect-square">
              <motion.div
                key={currentTraceIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full max-w-[320px] max-h-[320px]">
                    <svg
                      viewBox="0 0 400 400"
                      className="w-full h-full stroke-current text-purple-500 dark:text-purple-400"
                      style={{
                        filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.2))",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        fill: "none"
                      }}
                    >
                      {/* Background Grid */}
                      <path
                        d="M40,40 L360,40 L360,360 L40,360 Z"
                        className="stroke-purple-200/20 dark:stroke-purple-800/20"
                        strokeDasharray="4,8"
                      />
                      <path
                        d="M200,40 L200,360 M40,200 L360,200"
                        className="stroke-purple-200/10 dark:stroke-purple-800/10"
                        strokeDasharray="4,8"
                      />
                      
                      {/* Main Content */}
                      <g transform="translate(20, 20)">
                        {traces[currentTraceIndex].content}
                      </g>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 