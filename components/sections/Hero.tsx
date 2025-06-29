"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { DevObjects } from "../3d/DevObjects";
import { Suspense } from "react";

export const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10 flex items-center justify-between px-20 relative overflow-hidden">
      {/* Fond 3D */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <DevObjects />
          </Suspense>
        </Canvas>
      </div>

      {/* Contenu Principal */}
      <div className="flex-1 relative z-10">
        <div className="max-w-xl">
          <h2 className="text-lg mb-4 text-gray-600 dark:text-gray-300">Bonjour, je suis Nidhal,</h2>
          <h1 className="text-6xl font-bold mb-6 leading-tight" style={{ color: "#008090" }}>
            Développeur<br />
            Web Junior
          </h1>
          <p className="text-lg mb-10 text-gray-600 dark:text-gray-300">
            Passionné par la création d&apos;expériences web modernes et intuitives. 
            Je transforme des idées en solutions numériques innovantes.
          </p>
          <Button
            asChild
            className="text-white rounded-full px-10 py-6 text-base font-medium shadow-md transition-all hover:shadow-lg hover:scale-105"
            style={{ backgroundColor: "#008090" }}
          >
            <a href="/Cv nidhal .pdf" download>Télécharger mon CV</a>
          </Button>
        </div>
      </div>

      {/* Image de Profil */}
      <div className="flex-1 flex justify-center relative z-10">
        <div className="relative w-[450px] h-[450px]">
          <div className="absolute right-[-20px] top-[-20px] text-4xl rotate-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">++</div>
          <div className="w-full h-full rounded-full overflow-hidden border-8 border-white dark:border-gray-800 relative bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 shadow-2xl">
            <div className="w-full h-full relative">
              <Image
                src="/pixelcut-export (1).png"
                alt="Photo de profil de Nidhal"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Éléments décoratifs */}
            <div className="absolute bottom-0 left-0 right-0">
              <div className="flex justify-center gap-2 mb-6">
                {Array(5).fill("").map((_, i) => (
                  <div key={i} className="w-6 h-1.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 dark:from-purple-400/20 dark:to-blue-400/20 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Liens Sociaux */}
        <div className="absolute bottom-0 right-0 flex gap-6 mb-6">
          <Link href="https://github.com/nidhalghar" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors hover:scale-110">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </Link>
          <Link href="https://www.linkedin.com/in/nidhal-gharbi-6b27a8254/" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors hover:scale-110">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
            </svg>
          </Link>
         
        </div>
      </div>
    </section>
  );
}; 