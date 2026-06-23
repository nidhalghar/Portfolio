"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionId = section.getAttribute("id") || "";

        if (scrollY >= sectionTop) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80;
      const sectionTop = section.offsetTop - offset;
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth"
      });
    }
  };

  const navItems = [
    { name: "Accueil", id: "home" },
    { name: "À propos", id: "about" },
    { name: "Compétences", id: "skills" },
    { name: "Projets", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-outline-variant/30 bg-surface-glass shadow-sm"
    >
      <div className="flex justify-between items-center h-16 px-gutter max-w-container-max mx-auto">
        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center space-x-2"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={120}
            className="w-32 h-15"
          />
        </button>
        
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-gray-700 dark:text-gray-200 hover:text-primary transition-colors ${
                activeSection === item.id ? "text-primary font-semibold" : ""
              } font-body-md text-body-md`}
            >
              {item.name}
            </button>
          ))}
        </nav>
        
        <a
          href="/Gharbi%20Nidhal.pdf"
          download="Gharbi Nidhal.pdf"
          className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-body-md text-body-md hover:scale-105 transition-transform duration-200 active:scale-95 inline-block"
        >
          Download CV
        </a>
      </div>
    </motion.nav>
  );
};
