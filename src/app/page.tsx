import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen">
      <Navbar />
      
      <div id="home">
        <ScrollyCanvas />
      </div>
      
      <div id="work">
        <Projects />
      </div>
      
      <div id="about">
        <About />
      </div>

      <div id="experience">
        <Experience />
      </div>

      <div id="skills">
        <Skills />
      </div>
      
      <div id="contact">
        <Contact />
      </div>
      
      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center flex flex-col items-center justify-center bg-[#121212]">
        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} Priya Singh. All rights reserved.
        </p>
        <p className="text-white/20 text-xs mt-2 font-mono tracking-widest">
          SENSE → PROCESS → CONNECT → AUTOMATE
        </p>
      </footer>
    </main>
  );
}
