"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: number;
  type: "system" | "user" | "error";
  content: React.ReactNode;
};

const INITIAL_HISTORY: Message[] = [
  { id: 1, type: "system", content: "Priya Singh Portfolio OS [Version 1.0.0]" },
  { id: 2, type: "system", content: "(c) 2026 Priya Singh. All rights reserved." },
  { id: 3, type: "system", content: " " },
  { id: 4, type: "system", content: "Type 'help' to see a list of available commands." }
];

export default function Contact() {
  const [history, setHistory] = useState<Message[]>(INITIAL_HISTORY);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => inputRef.current?.focus();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const val = input.trim();
      const cmd = val.toLowerCase();
      const newId = Date.now();
      const newHistory = [...history, { id: newId, type: "user" as const, content: val }];
      setInput("");

      let responseContent: React.ReactNode = "";

      switch (cmd) {
        case "whoami":
          responseContent = "Priya Singh — Final-year B.Tech ECE student at Buddha Institute of Technology, Gorakhpur. Embedded Systems & IoT engineer with 2 hardware prototypes, 1 internship at NIELIT, and 3 awards.";
          break;
        case "skills":
          responseContent = (
            <div className="flex flex-col gap-1 mt-1 font-mono text-sm">
              <span className="text-white/80"><span className="text-emerald-400">Languages:</span> C, Embedded C, Verilog</span>
              <span className="text-white/80"><span className="text-emerald-400">Hardware:</span> ESP32, Arduino, Ultrasonic Sensor, IR Sensor, MPU6050, RFID Module</span>
              <span className="text-white/80"><span className="text-emerald-400">Tools:</span> Arduino IDE, MATLAB, Proteus (Simulation)</span>
              <span className="text-white/80"><span className="text-emerald-400">Communication:</span> Analog, Digital, Wireless, Optical</span>
            </div>
          );
          break;
        case "projects":
          responseContent = (
            <div className="flex flex-col gap-2 mt-1">
              <span>Hardware Projects:</span>
              <span className="hover:text-emerald-400 transition-colors">- Free Hand Wheel Chair (ESP32, Arduino, MPU6050 — response &lt;200ms)</span>
              <span className="hover:text-emerald-400 transition-colors">- RFID Based Smart Shopping Cart (50+ tagged items, automated billing)</span>
              <span className="text-white/50 italic text-xs mt-1">Type 'help' for more commands.</span>
            </div>
          );
          break;
        case "education":
          responseContent = (
            <div className="flex flex-col gap-1 mt-1">
              <span><span className="text-emerald-400">B.Tech ECE</span> — Buddha Institute of Technology, Gorakhpur (2023–2027) | CGPA: 8.3</span>
              <span><span className="text-emerald-400">Intermediate (PCM)</span> — SVM Public School (2021–22) | 72.6%</span>
              <span><span className="text-emerald-400">High School</span> — SVM Public School (2019–20) | 86%</span>
            </div>
          );
          break;
        case "awards":
          responseContent = (
            <div className="flex flex-col gap-1 mt-1">
              <span>🥉 3rd Position — District Level Skill India Competition (Electronics) | Jan 2026</span>
              <span>🏆 Academic Excellence Award — 2nd Year (CGPA: 8.4) | 2024–25</span>
              <span>⭐ Academic Excellence Award — 1st Year (CGPA: 8.385) | 2023–24</span>
            </div>
          );
          break;
        case "contact":
          responseContent = (
            <div className="flex flex-col gap-1 mt-1">
              <span>Phone: <span className="text-emerald-400">+91-8303208212</span></span>
              <span>Email: <a href="mailto:priyasingh08533@gmail.com" className="text-emerald-400 hover:underline">priyasingh08533@gmail.com</a></span>
              <span>Location: <span className="text-white/70">Gorakhpur, Uttar Pradesh</span></span>
            </div>
          );
          break;
        case "hire me":
          window.location.href = "mailto:priyasingh08533@gmail.com";
          responseContent = "Opening email client... Looking forward to connecting! 😊";
          break;
        case "help":
          responseContent = (
            <div className="flex flex-col gap-1 font-mono text-sm mt-1">
              <span>Available commands:</span>
              <span className="text-white/70">&gt; <span className="text-emerald-400">whoami</span>     - About Priya Singh</span>
              <span className="text-white/70">&gt; <span className="text-emerald-400">skills</span>     - Technical skill set</span>
              <span className="text-white/70">&gt; <span className="text-emerald-400">projects</span>   - Hardware projects overview</span>
              <span className="text-white/70">&gt; <span className="text-emerald-400">education</span>  - Academic background</span>
              <span className="text-white/70">&gt; <span className="text-emerald-400">awards</span>     - Honours & recognition</span>
              <span className="text-white/70">&gt; <span className="text-emerald-400">contact</span>    - How to reach me</span>
              <span className="text-white/70">&gt; <span className="text-emerald-400">hire me</span>    - Send an email directly</span>
              <span className="text-white/70">&gt; <span className="text-emerald-400">clear</span>      - Clear terminal</span>
            </div>
          );
          break;
        case "clear":
          setHistory(INITIAL_HISTORY);
          return;
        default:
          responseContent = `bash: command not found: ${cmd}. Type 'help' to see available commands.`;
          setHistory([...newHistory, { id: newId + 1, type: "error" as const, content: responseContent }]);
          return;
      }

      setHistory([...newHistory, { id: newId + 1, type: "system" as const, content: responseContent }]);
    }
  };

  return (
    <section className="relative z-20 bg-[#121212] py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5" id="contact">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[200px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-[5rem] font-bold text-white tracking-tighter mb-6">
            Let&apos;s Connect<span className="text-emerald-400">_</span>
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Open to internships, embedded systems roles, and IoT collaborations. Type a command below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-4xl relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-1000" />
          <div
            className="relative w-full h-[400px] md:h-[500px] bg-[#050505] rounded-xl border border-white/10 overflow-hidden flex flex-col shadow-2xl font-mono text-sm md:text-base cursor-text"
            onClick={handleTerminalClick}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/5 select-none">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-white/30 text-xs font-mono tracking-widest">guest@priya-portfolio:~</div>
              <div className="w-12" />
            </div>

            <div ref={containerRef} className="flex-1 p-6 md:p-8 overflow-y-auto scroll-smooth flex flex-col gap-3" style={{ scrollbarWidth: "none" }}>
              <AnimatePresence initial={false}>
                {history.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-start gap-3 ${msg.type === "user" ? "text-white/90" : msg.type === "error" ? "text-red-400" : "text-emerald-400"}`}
                  >
                    <span className="shrink-0 mt-0 select-none">
                      {msg.type === "user" ? "guest@local:~$" : msg.content === " " ? "" : ">"}
                    </span>
                    <span className="whitespace-pre-wrap break-words">{msg.content}</span>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="flex items-start gap-3 text-white/90 mt-2">
                <span className="shrink-0 mt-0.5 select-none">guest@local:~$</span>
                <div className="flex-1 flex items-center relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent outline-none text-white/90 font-mono caret-transparent absolute inset-0 opacity-0"
                    spellCheck={false}
                    autoComplete="off"
                  />
                  <span className="pointer-events-none break-all">{input}</span>
                  <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="w-2.5 h-5 bg-emerald-400 ml-1 shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-20"
        >
          {[
            { name: "Email", link: "mailto:priyasingh08533@gmail.com", color: "hover:text-emerald-400 hover:border-emerald-400" },
            { name: "Phone", link: "tel:+918303208212", color: "hover:text-emerald-400 hover:border-emerald-400" },
            { name: "LinkedIn", link: "https://www.linkedin.com/in/priya-singh2205", color: "hover:text-emerald-400 hover:border-emerald-400" },
          ].map((social) => (
            <motion.a
              key={social.name}
              href={social.link}
              target={social.link.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              whileHover={{ y: -3 }}
              className={`text-white/50 px-8 py-3 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 font-medium ${social.color}`}
            >
              {social.name}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
