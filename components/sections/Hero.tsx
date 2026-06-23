"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section 
      ref={ref} 
      id="home" 
      className="relative min-h-screen flex items-center px-gutter overflow-hidden transition-all duration-1000"
    >
      <div className="max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-24">
        <motion.div 
          className="lg:col-span-7"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-label-caps text-label-caps text-primary mb-4 uppercase tracking-widest">
            Nidhal Gharbi
          </h2>
          <h1 className="font-display-lg-mobile md:text-display-lg mb-6 leading-tight">
            Développeur Web <span className="text-primary">Full Stack</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-10">
            Passionné par la création d&apos;expériences web modernes et intuitives. 
            Je transforme des idées en solutions numériques innovantes avec une précision technique inégalée.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#projects"
              className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-body-md text-body-md hover:scale-105 transition-all flex items-center gap-2 border border-primary/20"
            >
              Voir mes projets
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          
            <div className="flex items-center gap-6 ml-4">
              <a href="https://github.com/nidhalghar" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>code</span>
              </a>
              <a href="https://www.linkedin.com/in/nidhal-gharbi-6b27a8254/" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">link</span>
              </a>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-5 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative w-full h-full rounded-full border border-primary/20 p-4 backdrop-blur-sm overflow-hidden">
              <Image
                src="/nidhal cv image.png"
                alt="Nidhal Gharbi"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-surface-container-high glass-effect p-6 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary">verified</span>
                </div>
                <div>
                  <div className="font-label-caps text-label-caps text-primary">Status</div>
                  <div className="font-body-md text-body-md font-bold">Disponible pour projets</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
