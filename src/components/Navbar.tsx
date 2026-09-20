"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll Spy logic to detect which section is in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "work", "about", "experience", "skills", "contact"];
      const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
      
      let currentSection = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop - 150;
          if (scrollPosition >= offsetTop) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 z-[9999] origin-left"
        style={{ scaleX }}
      />

      {/* Floating Navigation Bar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed top-8 left-0 w-full flex justify-center z-[9900]"
      >
        <div className="flex items-center gap-1 md:gap-2 p-2 rounded-full glassmorphism bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-x-auto max-w-[95vw] md:max-w-max hide-scrollbar">
          {["home", "work", "about", "experience", "skills", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollTo(section)}
              className={`relative px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 capitalize whitespace-nowrap ${
                activeSection === section ? "text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              {activeSection === section && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{section}</span>
            </button>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
