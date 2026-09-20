"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useMotionValue, useTransform, useSpring } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

// --- Data ---
const STATS = [
  { value: 2,   suffix: "",  label: "Hardware Prototypes" },
  { value: 8.3, suffix: "",  label: "CGPA" },
  { value: 3,   suffix: "",  label: "Awards Won" },
  { value: 50,  suffix: "+", label: "RFID Items Automated" },
];

// --- Components ---
const WordReveal = ({ text, className }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap gap-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const AnimatedCounter = ({ from, to, suffix, label }: { from: number; to: number; suffix: string; label: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const isFloat = to % 1 !== 0;
      const controls = animate(from, to, {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = (isFloat ? (Math.round(value * 10) / 10).toFixed(1) : Math.floor(value)) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, suffix]);

  return (
    <motion.div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center p-8 rounded-[2rem] bg-[#0f0f0f] border border-white/[0.08] hover:border-white/[0.2] transition-colors duration-700 group relative overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
    >
      <div 
        className="pointer-events-none absolute -inset-px transition duration-500"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.08), transparent 40%)`
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <span ref={nodeRef} className="relative z-10 text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60 tracking-tighter mb-3 group-hover:scale-110 group-hover:text-white transition-all duration-500 ease-out">
        {from}{suffix}
      </span>
      <span className="relative z-10 text-white/40 text-xs font-mono uppercase tracking-[0.2em] text-center leading-snug group-hover:text-emerald-300 transition-colors duration-500">
        {label}
      </span>
    </motion.div>
  );
};

export default function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const glareOpacity = useTransform(mouseYSpring, [-0.5, 0.5], [0, 0.2]);

  const handleTiltMovie = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleTiltLeave = () => { x.set(0); y.set(0); };

  return (
    <section className="relative z-20 bg-[#121212] overflow-hidden py-32 md:py-48 px-6 md:px-12 lg:px-24" id="about">
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[200px] mix-blend-screen pointer-events-none translate-x-[20%]" />
      
      <div className="max-w-6xl mx-auto flex flex-col gap-24 relative z-10 w-full lg:px-20">
        
        {/* TOP SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 lg:gap-24 items-center">
          
          {/* LEFT */}
          <div className="flex flex-col gap-16" style={{ perspective: 1500 }}>
            <motion.h2 
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-[5rem] font-bold text-white tracking-tighter"
            >
              About<span className="text-emerald-400">.</span>
            </motion.h2>

            {/* Profile Terminal Card */}
            <motion.div 
              ref={cardRef}
              onMouseMove={handleTiltMovie}
              onMouseLeave={handleTiltLeave}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/[0.08] font-mono text-sm relative group hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] hover:border-white/[0.2] transition-colors duration-700"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[2rem] pointer-events-none"
                style={{ opacity: glareOpacity }}
              />
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-white/30 font-bold">{'>'}</span>
                  <span className="text-white/90 font-bold text-xl tracking-tight">Priya Singh</span>
                  <motion.span 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                    className="w-2.5 h-6 bg-emerald-400 block"
                  />
                </div>
                
                <div className="flex flex-col gap-3 text-white/50 mb-10 border-t border-white/5 pt-8">
                  <span className="text-white/80 font-sans text-base">Embedded Systems & IoT Engineer</span>
                  <span className="text-white/80 font-sans text-base">Arduino · ESP32 · Embedded C</span>
                </div>
                
                <div className="flex flex-col gap-4 text-white/40 mb-10 font-sans">
                  <span className="flex items-center gap-4 hover:text-white transition-colors duration-300">
                    <MapPin size={16} className="text-white/30"/> Gorakhpur, Uttar Pradesh
                  </span>
                  <span className="flex items-center gap-4 hover:text-white transition-colors duration-300">
                    <GraduationCap size={16} className="text-white/30"/> Buddha Institute of Technology (B.Tech ECE)
                  </span>
                  <span className="flex items-center gap-4 hover:text-white transition-colors duration-300">
                    <Calendar size={16} className="text-white/30"/> 2023 – 2027 (CGPA: 8.3/10)
                  </span>
                </div>
                
                <div className="flex items-center gap-4 pt-6 border-t border-white/5 text-white/80 font-sans text-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"></span>
                  </span>
                  Open to Internships & Entry-Level Roles
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col lg:pt-[10rem] justify-center">
            <div className="flex flex-col gap-10">
              <motion.h3 
                initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 leading-[1.15] tracking-tight"
              >
                "I build hardware that solves real problems."
              </motion.h3>
              
              <div className="flex flex-col gap-8 text-white/50 text-xl font-light leading-relaxed">
                <WordReveal text="Final-year B.Tech ECE student at Buddha Institute of Technology (2023–2027), CGPA 8.3. Developed 2 working hardware prototypes using Arduino and ESP32, integrating sensors for real-time data processing and automation." />
                <WordReveal text="From ultrasonic obstacle avoidance to RFID-based smart billing — I don't just study embedded systems, I build them. Actively seeking opportunities in smart systems and industrial automation." />
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 relative mt-12">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-3xl pointer-events-none" />
          {STATS.map((stat, idx) => (
            <div key={idx} className="block">
              <AnimatedCounter from={0} to={stat.value} suffix={stat.suffix} label={stat.label} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
