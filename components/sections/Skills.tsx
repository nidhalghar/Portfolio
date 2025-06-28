"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Skill {
  category: string;
  items: string[];
  icon: string;
}

const skills: Skill[] = [
  {
    category: "Frontend",
    items: ["HTML5 / CSS3", "JavaScript / TypeScript", "React.js", "Next.js", "Tailwind CSS"],
    icon: "🎨",
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "API REST", "MongoDB"],
    icon: "⚙️",
  },
  {
    category: "Outils",
    items: ["Git", "GitHub", "VS Code", "Figma"],
    icon: "🛠️",
  },
];

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative group"
    >
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-1000"
      ></div>
      <motion.div
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-200 ease-out"
      >
        <div className="text-4xl mb-4">{skill.icon}</div>
        <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
          {skill.category}
        </h3>
        <ul className="space-y-2">
          {skill.items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex items-center text-gray-600 dark:text-gray-300"
            >
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
        >
          Mes Compétences
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}; 