"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
    category: "FRONTEND"
  },
  {
    name: "Nuxt.js",
    icon: "/nuxt-js-logo.png",
    category: "FRONTEND"
  },
  {
    name: "Laravel",
    icon: "https://laravel.com/img/logomark.min.svg",
    category: "BACKEND"
  },
  {
    name: "Symfony",
    icon: "https://symfony.com/logos/symfony_black_03.svg",
    category: "BACKEND"
  },
  {
    name: "Python",
    icon: "https://www.python.org/static/community_logos/python-logo-generic.svg",
    category: "BACKEND"
  },
  {
    name: "TypeScript",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    category: "FRONTEND"
  },
  {
    name: "JavaScript",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    category: "FRONTEND"
  },
  {
    name: "HTML5",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
    category: "FRONTEND"
  },
  {
    name: "CSS3",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
    category: "FRONTEND"
  },
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="skills"
      className="py-24 px-gutter transition-all duration-1000"
    >
      <div className="max-w-container-max mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-label-caps text-label-caps text-primary mb-2">
            EXPERTISE
          </h2>
          <h3 className="font-headline-md text-headline-md">
            Mes Compétences
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 30, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group p-8 glass-effect rounded-2xl hover:border-primary/30 transition-all text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-surface-container-high rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors p-2">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              <h4 className="font-body-md text-body-md font-bold mb-1">
                {skill.name}
              </h4>
              <div className="font-label-caps text-[10px] text-on-surface-variant">
                {skill.category}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
