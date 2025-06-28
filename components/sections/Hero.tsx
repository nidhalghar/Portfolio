"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { DevObjects } from "../3d/DevObjects";
import { OrbitControls } from "@react-three/drei";
import type { Variants } from "framer-motion";

const titleAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      repeat: Infinity,
      repeatDelay: 5,
    },
  },
};

const letterAnimation: Variants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.5
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
      repeat: Infinity,
      repeatDelay: 5,
    } as const,
  },
};

export const Hero = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const titleText = "Développeur Web Junior";
  const nameText = "Nidhal Gharbi";

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black"></div>
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-black/10 after:via-transparent after:to-black/10"></div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"></div>
      
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>

      {/* 3D Scene with reduced opacity */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <DevObjects />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 2.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-4">
        <motion.div
          variants={titleAnimation}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mt-2 font-serif"
          >
            {nameText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterAnimation}
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>

          <motion.h1 
            className="text-3xl md:text-5xl font-bold font-sans"
          >
            {titleText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterAnimation}
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Passionné par la création d&apos;expériences web modernes et intuitives
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className="flex gap-4 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white backdrop-blur-sm bg-opacity-20"
          >
            <Link href="#projects">Voir mes projets</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 hover:bg-gray-100/10 text-white backdrop-blur-sm bg-opacity-20"
          >
            <Link href="#contact">Me contacter</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}; 