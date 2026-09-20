"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Briefcase, BookOpen } from "lucide-react";

const EXPERIENCES = [
  {
    company: "NIELIT (National Institute of Electronics & Information Technology), GIDA",
    role: "Embedded Systems Intern",
    duration: "Jun 2026 – Jul 2026",
    type: "Gorakhpur, Uttar Pradesh",
    icon: <Briefcase size={24} className="text-white/30 shrink-0" />,
    bullets: [
      "Completed hands-on internship gaining practical exposure to microcontroller programming, sensor integration, and real-time system design.",
      "Programmed microcontrollers in Embedded C for sensor-driven automation tasks under industry supervision.",
      "Interfaced multiple peripherals with controllers and validated system behaviour using serial monitors and simulation tools.",
    ]
  },
];

const CERTIFICATIONS = [
  {
    title: "Bootcamp — Robotic Process Automation",
    issuer: "NIELIT Gorakhpur | FutureSkills PRIME (MeitY & nasscom)",
    duration: "Jan 2025",
    type: "Gorakhpur, Uttar Pradesh",
    bullets: [
      "Completed 6-day intensive bootcamp (06–11 Jan 2025) on Robotic Process Automation under the FutureSkills PRIME initiative.",
    ]
  },
  {
    title: "Workshop — IoT & Robotics (2 Days)",
    issuer: "Vigyan Pathshala Pvt. Ltd. at Buddha Institute of Technology",
    duration: "2024",
    type: "Gorakhpur, Uttar Pradesh",
    bullets: [
      "Attended hands-on workshop on Internet of Things and Robotics; gained practical exposure to IoT-based systems and automation.",
    ]
  },
];

const AWARDS = [
  { title: "3rd Position — District Level Skill India Competition", category: "Electronics Engineering", date: "Jan 2026", emoji: "🥉" },
  { title: "Academic Excellence Award — Merit Certificate, 2nd Year", category: "CGPA: 8.4", date: "2024–25", emoji: "🏆" },
  { title: "Academic Excellence Award — Merit Certificate, 1st Year", category: "CGPA: 8.385", date: "2023–24", emoji: "⭐" },
];

// ── Reusable Experience Card (original best design) ──────────
const TimelineCard = ({ item, idx }: { item: typeof EXPERIENCES[0]; idx: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);
  const glareOpacity = useTransform(mouseYSpring, [-0.5, 0.5], [0, 0.1]);
  const [spotPos, setSpotPos] = React.useState({ x: 0, y: 0 });
  const [spotOp, setSpotOp] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-8 sm:pl-10 md:pl-20 group"
      style={{ perspective: 1200 }}
    >
      <div className="absolute w-8 h-px bg-gradient-to-r from-white/20 to-transparent top-12 left-0 -z-10 group-hover:from-emerald-500/50 transition-colors duration-500" />
      <div className="absolute w-4 h-4 md:w-5 md:h-5 bg-[#0a0a0a] border-[2px] md:border-[3px] border-white/20 rounded-full -left-[8.5px] md:-left-[10.5px] top-10 ring-4 md:ring-8 ring-[#0a0a0a] group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.6)] group-hover:scale-125 transition-all duration-500 z-10 box-border flex items-center justify-center">
        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-transparent group-hover:bg-emerald-400 transition-colors duration-500" />
      </div>

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setSpotOp(1)}
        onMouseLeave={() => { setSpotOp(0); x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="p-6 sm:p-8 md:p-12 rounded-[2rem] bg-[#0f0f0f] border border-white/[0.08] hover:border-white/[0.2] transition-colors duration-500 relative overflow-hidden shadow-2xl hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
      >
        <div className="pointer-events-none absolute -inset-px transition duration-500 z-0"
          style={{ opacity: spotOp, background: `radial-gradient(600px circle at ${spotPos.x}px ${spotPos.y}px, rgba(255,255,255,0.06), transparent 40%)` }} />
        <motion.div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[2rem] z-10" style={{ opacity: glareOpacity }} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

        <div className="relative z-20">
          <div className="mb-8 flex flex-col items-start gap-4" style={{ transform: "translateZ(30px)" }}>
            <span className="px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-mono text-emerald-300 tracking-[0.15em]">
              {item.duration}
            </span>
            <div className="mt-4">
              <h4 className="flex items-center gap-3 text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/70 tracking-tight mb-2">
                {item.icon}{item.company}
              </h4>
              <span className="text-white/50 text-lg md:text-xl block font-light">
                {item.role} <span className="text-white/20 mx-2 md:mx-3">•</span> {item.type}
              </span>
            </div>
          </div>
          <ul className="flex flex-col gap-6 mt-8">
            {item.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-4 md:gap-5 items-start leading-relaxed group/bullet hover:text-white transition-colors duration-300">
                <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-white/20 group-hover/bullet:bg-emerald-400 group-hover/bullet:shadow-[0_0_10px_rgba(52,211,153,0.8)] transition-all duration-300 shrink-0" />
                <span className="text-white/60 text-base md:text-lg group-hover/bullet:text-white/90 group-hover/bullet:translate-x-1 md:group-hover/bullet:translate-x-2 transition-all duration-300">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Certification Card — same 3D tilt + spotlight + glare ────
const CertCard = ({ cert, idx }: { cert: typeof CERTIFICATIONS[0]; idx: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);
  const glareOpacity = useTransform(mouseYSpring, [-0.5, 0.5], [0, 0.1]);
  const [spotPos, setSpotPos] = React.useState({ x: 0, y: 0 });
  const [spotOp, setSpotOp] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setSpotOp(1)}
        onMouseLeave={() => { setSpotOp(0); x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="p-8 rounded-[2rem] bg-[#0f0f0f] border border-white/[0.08] hover:border-emerald-500/30 transition-colors duration-500 relative overflow-hidden shadow-2xl hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] h-full"
      >
        {/* Spotlight */}
        <div className="pointer-events-none absolute -inset-px transition duration-500 z-0"
          style={{ opacity: spotOp, background: `radial-gradient(500px circle at ${spotPos.x}px ${spotPos.y}px, rgba(52,211,153,0.08), transparent 40%)` }} />
        {/* Glare */}
        <motion.div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[2rem] z-10" style={{ opacity: glareOpacity }} />
        {/* Top scan line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

        <div className="relative z-20" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-start justify-between gap-4 mb-6">
            <BookOpen size={22} className="text-emerald-400 shrink-0 mt-1" />
            <span className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-mono text-emerald-300 tracking-[0.15em] whitespace-nowrap">
              {cert.duration}
            </span>
          </div>
          <h4 className="text-xl font-bold text-white/90 mb-2 group-hover:text-white transition-colors duration-300 leading-snug">{cert.title}</h4>
          <p className="text-sm text-emerald-400/70 mb-5 font-mono">{cert.issuer}</p>
          <ul className="flex flex-col gap-3">
            {cert.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 items-start group/bullet">
                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-white/20 group-hover/bullet:bg-emerald-400 group-hover/bullet:shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all duration-300 shrink-0" />
                <span className="text-white/55 text-sm leading-relaxed group-hover/bullet:text-white/80 transition-colors duration-300">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Award Row — same spotlight + glare + scan line ───────────
const AwardRow = ({ award, idx }: { award: typeof AWARDS[0]; idx: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);
  const glareOpacity = useTransform(mouseYSpring, [-0.5, 0.5], [0, 0.08]);
  const [spotPos, setSpotPos] = React.useState({ x: 0, y: 0 });
  const [spotOp, setSpotOp] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setSpotOp(1)}
        onMouseLeave={() => { setSpotOp(0); x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="flex items-center justify-between gap-4 p-6 rounded-2xl bg-[#0f0f0f] border border-white/[0.08] hover:border-white/[0.2] transition-colors duration-500 relative overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      >
        {/* Spotlight */}
        <div className="pointer-events-none absolute -inset-px transition duration-500 z-0"
          style={{ opacity: spotOp, background: `radial-gradient(500px circle at ${spotPos.x}px ${spotPos.y}px, rgba(255,255,255,0.05), transparent 40%)` }} />
        {/* Glare */}
        <motion.div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl z-10" style={{ opacity: glareOpacity }} />
        {/* Top scan line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

        <div className="relative z-20 flex items-center gap-4">
          <span className="text-2xl">{award.emoji}</span>
          <div>
            <p className="text-white/90 font-semibold group-hover:text-white transition-colors duration-300">{award.title}</p>
            <p className="text-white/40 text-sm font-mono mt-1 group-hover:text-emerald-300/70 transition-colors duration-300">{award.category}</p>
          </div>
        </div>
        <span className="relative z-20 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/40 whitespace-nowrap group-hover:border-emerald-500/30 group-hover:text-emerald-300/70 transition-all duration-500">
          {award.date}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 60%", "end 80%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const ambientOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.5, 0.1]);

  return (
    <section className="relative z-20 bg-[#121212] overflow-hidden py-32 md:py-48 px-6 md:px-12 lg:px-24 border-t border-white/5" id="experience">
      <motion.div style={{ opacity: ambientOpacity }}
        className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[200px] mix-blend-screen pointer-events-none -translate-y-1/2 -translate-x-[30%]" />

      <div className="max-w-6xl mx-auto flex flex-col gap-24 md:gap-32 relative z-10 w-full lg:px-20">

        {/* ── Experience ── */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-[5rem] font-bold text-white tracking-tighter mb-16"
          >
            Experience<span className="text-emerald-400">.</span>
          </motion.h2>

          <div className="w-full relative ml-2 md:ml-0" ref={containerRef}>
            <div className="absolute left-[0px] top-4 bottom-[-64px] w-[1px] bg-white/[0.05]" />
            <div className="relative flex flex-col gap-20 pb-16 w-full">
              <motion.div style={{ height: lineHeight }}
                className="absolute left-[0px] top-4 w-[1px] bg-gradient-to-b from-transparent via-emerald-400 to-emerald-500 origin-top shadow-[0_0_20px_rgba(52,211,153,1)] z-20" />
              <motion.div style={{ top: dotTop }}
                className="absolute left-[-2.5px] mt-4 w-[6px] h-[40px] bg-white rounded-full shadow-[0_0_25px_5px_rgba(255,255,255,0.7),0_0_40px_10px_rgba(52,211,153,0.6)] z-30" />
              {EXPERIENCES.map((exp, idx) => (
                <TimelineCard key={idx} item={exp} idx={idx} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Certifications ── */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-12"
          >
            Certifications<span className="text-emerald-400">.</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <CertCard key={idx} cert={cert} idx={idx} />
            ))}
          </div>
        </div>

        {/* ── Awards ── */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-12"
          >
            Awards<span className="text-emerald-400">.</span>
          </motion.h2>
          <div className="flex flex-col gap-4">
            {AWARDS.map((award, idx) => (
              <AwardRow key={idx} award={award} idx={idx} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

