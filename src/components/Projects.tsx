"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, X, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: 1,
    title: "Free Hand Wheel Chair",
    category: "EMBEDDED SYSTEMS",
    description: "Smart wheelchair with ultrasonic obstacle avoidance (auto-stops at 30 cm), MPU6050 fall detection, and joystick override — real-time motor control response under 200 ms.",
    techStack: ["ESP32", "Arduino", "Ultrasonic Sensor", "MPU6050", "Embedded C/C++"],
    github: "#",
    liveDemo: "#",
    color: "from-emerald-500/20 to-emerald-900/0",
    glow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:border-emerald-500/50",
    problem: "A wheelchair user cannot always react in time to an obstacle ahead, and a fall can go unnoticed for minutes. Both safety scenarios need to be handled autonomously by the chair itself.",
    solution: "An ultrasonic sensor measures distance ahead continuously; the controller auto-stops at 30 cm. An MPU6050 gyroscope/accelerometer tracks orientation for fall detection. A joystick override maintains user control at any time. Firmware written in Embedded C/C++ using Arduino IDE.",
    architecture: "ESP32/Arduino as central MCU. Ultrasonic sensor on front for obstacle detection with 30 cm threshold. MPU6050 for 6-axis fall detection. L298N H-Bridge motor driver for DC motor control. Joystick input for manual override. End-to-end response time < 200 ms.",
    highlights: [
      "Ultrasonic obstacle avoidance — auto-stops at 30 cm threshold",
      "MPU6050 gyroscope & accelerometer for real-time fall detection",
      "Joystick override maintains user control at all times",
      "Motor control response time < 200 ms end-to-end",
    ],
  },
  {
    id: 2,
    title: "RFID Based Smart Shopping Cart",
    category: "EMBEDDED SYSTEMS",
    description: "Automated billing system for 50+ RFID-tagged items — real-time item identification, cart update, and total bill calculation without manual checkout.",
    techStack: ["RFID Module", "RC522", "Arduino", "Embedded C"],
    github: "#",
    liveDemo: "#",
    color: "from-blue-500/20 to-blue-900/0",
    glow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:border-blue-500/50",
    problem: "Items are only scanned at the till, creating long queues and checkout delays. Moving the billing to the moment an item is picked up eliminates the bottleneck entirely.",
    solution: "Every item carries an RFID tag. The RC522 reader detects the tag as the item enters the cart, the Arduino matches the tag ID to an item and price in a lookup table, updates cart state, and recalculates the running total. Written entirely in Embedded C.",
    architecture: "RC522 RFID reader module interfaced with Arduino via SPI. Tag ID lookup table stored in Arduino program memory. Cart state managed in SRAM. 7-segment or LCD display for running total. System supports 50+ unique tagged items.",
    highlights: [
      "Supports 50+ RFID-tagged items with unique tag IDs",
      "Real-time item identification as items are added to cart",
      "Automatic cart state update and running total calculation",
      "User tracking and billing without manual scanning or checkout queue",
    ],
  },
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProject]);

  return (
    <section className="relative bg-[#121212] py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5 z-20" id="work">
      
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1.5px,transparent_1.5px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-4 items-center text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 tracking-tight">
            Hardware Projects
          </h2>
          <p className="text-white/60 text-lg">
            Real prototypes solving real problems — from obstacle avoidance to automated billing.
          </p>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              >
                <div
                  onClick={() => setSelectedId(project.id)}
                  className={`group relative flex flex-col justify-between p-8 md:p-10 min-h-[420px] rounded-[2rem] overflow-hidden bg-white/[0.02] backdrop-blur-3xl transition-all duration-700 cursor-pointer border border-white/5 hover:border-white/10 ${project.glow} hover:-translate-y-2 h-full`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />

                  <div className="relative z-10 flex justify-between items-start w-full mb-8">
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-white/50 group-hover:text-white/90 group-hover:border-white/30 transition-all duration-500">
                      {project.category}
                    </span>
                    <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:border-white transition-all duration-500">
                      <Cpu className="w-5 h-5 text-white/40 group-hover:text-black transition-all duration-300" />
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col gap-4 transform transition-transform duration-700 group-hover:translate-x-2 flex-grow">
                    <h3 className="text-3xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-500">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-base max-w-md group-hover:text-white/70 transition-colors duration-500 leading-relaxed font-light line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-wrap gap-2 mt-8 transform transition-transform duration-700 group-hover:translate-x-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-white/60 group-hover:border-white/20 group-hover:text-white/80 transition-all duration-500">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-12 bg-black/60 backdrop-blur-md"
          >
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedId(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden overflow-y-auto bg-[#121212]/95 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className={`p-8 md:p-12 bg-gradient-to-br ${selectedProject.color}`}>
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono uppercase tracking-widest text-white/90 mb-6">
                  {selectedProject.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedProject.title}</h3>
                <p className="text-white/80 text-base leading-relaxed mb-6">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-black/30 border border-white/10 text-xs text-white/90">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 md:p-12 flex flex-col gap-8">
                {/* Problem */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 mb-3">Problem</h4>
                  <p className="text-white/70 leading-relaxed">{selectedProject.problem}</p>
                </div>
                {/* Solution */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 mb-3">Solution</h4>
                  <p className="text-white/70 leading-relaxed">{selectedProject.solution}</p>
                </div>
                {/* Architecture */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 mb-3">Architecture</h4>
                  <p className="text-white/70 leading-relaxed">{selectedProject.architecture}</p>
                </div>
                {/* Highlights */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 mb-4">Key Highlights</h4>
                  <ul className="flex flex-col gap-3">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
