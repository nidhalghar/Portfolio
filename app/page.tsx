import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Navbar } from "@/components/navigation/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
