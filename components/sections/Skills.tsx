"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { ProgressCircle } from "@/components/ui/progress-circle";

interface Skill {
  name: string;
  icon: string;
  category: string;
  percentage: number;
  color: string;
}

const skills: Skill[] = [
  {
    name: "Next.js",
    icon: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg",
    category: "Frontend",
    percentage: 90,
    color: "#008090"
  },
  {
    name: "Nuxt.js",
    icon: "/nuxt-js-logo.png",
    category: "Frontend",
    percentage: 85,
    color: "#008090"
  },
  {
    name: "Laravel",
    icon: "https://laravel.com/img/logomark.min.svg",
    category: "Backend",
    percentage: 88,
    color: "#008090"
  },
  {
    name: "Symfony",
    icon: "https://symfony.com/logos/symfony_black_03.svg",
    category: "Backend",
    percentage: 85,
    color: "#008090"
  },
  {
    name: "Python",
    icon: "https://www.python.org/static/community_logos/python-logo-generic.svg",
    category: "Backend",
    percentage: 80,
    color: "#008090"
  },
  {
    name: "TypeScript",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    category: "Frontend",
    percentage: 92,
    color: "#008090"
  },
  {
    name: "JavaScript",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    category: "Frontend",
    percentage: 95,
    color: "#008090"
  },
  {
    name: "HTML5",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
    category: "Frontend",
    percentage: 98,
    color: "#008090"
  },
  {
    name: "CSS3",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
    category: "Frontend",
    percentage: 95,
    color: "#008090"
  }
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [isLooping] = useState(true);

  useEffect(() => {
    if (!isInView) return;

    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const startLoop = () => {
      setVisibleIndex(0);
      interval = setInterval(() => {
        setVisibleIndex(prev => {
          if (prev >= skills.length - 1) {
            clearInterval(interval);
            timeout = setTimeout(() => {
              if (isLooping) {
                setVisibleIndex(-1);
                setTimeout(startLoop, 500);
              }
            }, 5000);
            return prev;
          }
          return prev + 1;
        });
      }, 5000);
    };

    startLoop();

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isInView, isLooping]);

  return (
    <section ref={ref} id="skills" className="py-12 relative overflow-hidden min-h-screen bg-gradient-to-b from-transparent to-transparent">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_800px_at_50%_50%,#00809010,transparent)]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008090]/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008090]/20 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-[#008090] via-[#008090] to-[#008090]"
        >
          Mes Compétences
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Progress Circles Column */}
          <div className="space-y-4 lg:pl-8">
            <motion.div 
              className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/10 dark:border-gray-700/10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#008090] to-[#008090] mb-6 text-center">
                Niveaux de Compétences
              </h3>
              <div className="space-y-5">
                {skills.map((skill, index) => (
                  <ProgressCircle
                    key={skill.name}
                    name={skill.name}
                    icon={skill.icon}
                    percentage={skill.percentage}
                    color={skill.color}
                    isVisible={index === visibleIndex}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* 3D Marquee Column */}
          <div className="h-[500px] lg:h-[600px] w-full flex items-center justify-end overflow-visible">
            <div className="w-full h-full translate-x-[5%]">
              <ThreeDMarquee items={skills} className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 