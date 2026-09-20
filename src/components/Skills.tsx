"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const getProficiency = (skill: string) => {
  const expert     = ["Arduino", "Embedded C", "Arduino IDE", "ESP32", "Ultrasonic Sensor"];
  const proficient = ["C", "MPU6050", "RFID Module", "IR Sensor", "Proteus", "Digital", "Analog", "Wireless"];
  if (expert.includes(skill))     return 3;
  if (proficient.includes(skill)) return 2;
  return 1;
};

const CODE_SNIPPETS: Record<string, React.ReactNode> = {
  "Embedded C":        <><span className="text-pink-400">#include</span> &lt;avr/io.h&gt;{"\n"}<span className="text-pink-400">int</span> <span className="text-emerald-300">main</span>{"() {\n  "}DDRB |= {"(1 << PB5);\n  "}<span className="text-pink-400">while</span>{"(1) {\n    "}PORTB ^= {"(1 << PB5);\n    "}_delay_ms(<span className="text-purple-300">500</span>);{"\n  }\n  "}<span className="text-pink-400">return</span> <span className="text-purple-300">0</span>;{"\n}"}</>,
  "C":                 <><span className="text-pink-400">#include</span> &lt;stdio.h&gt;{"\n"}<span className="text-pink-400">int</span> <span className="text-emerald-300">main</span>{"() {\n  "}<span className="text-emerald-300">printf</span>(<span className="text-yellow-300">"Hello, Hardware!\n"</span>);{"\n  "}<span className="text-pink-400">return</span> <span className="text-purple-300">0</span>;{"\n}"}</>,
  "Verilog":           <><span className="text-pink-400">module</span> <span className="text-emerald-300">led_blink</span>(input clk, output <span className="text-blue-300">reg</span> led);{"\n  "}<span className="text-pink-400">reg</span> [<span className="text-purple-300">24</span>:0] counter;{"\n  "}<span className="text-pink-400">always</span> @(posedge clk) <span className="text-pink-400">begin</span>{"\n    "}counter &lt;= counter + <span className="text-purple-300">1</span>;{"\n    "}led &lt;= counter[<span className="text-purple-300">24</span>];{"\n  "}<span className="text-pink-400">end</span>{"\n"}<span className="text-pink-400">endmodule</span></>,
  "Arduino":           <><span className="text-pink-400">#define</span> TRIG <span className="text-purple-300">9</span>{"\n"}<span className="text-pink-400">void</span> <span className="text-emerald-300">setup</span>{"() {\n  "}pinMode(TRIG, OUTPUT);{"\n  "}Serial.<span className="text-emerald-300">begin</span>(<span className="text-purple-300">9600</span>);{"\n}"}{"\n"}<span className="text-pink-400">void</span> <span className="text-emerald-300">loop</span>{"() {\n  "}digitalWrite(TRIG, HIGH);{"\n  "}delay(<span className="text-purple-300">10</span>);{"\n}"}</>,
  "ESP32":             <><span className="text-pink-400">#include</span> &lt;WiFi.h&gt;{"\n"}<span className="text-pink-400">void</span> <span className="text-emerald-300">setup</span>{"() {\n  "}WiFi.<span className="text-emerald-300">begin</span>(<span className="text-yellow-300">"SSID"</span>, <span className="text-yellow-300">"PASS"</span>);{"\n  "}<span className="text-pink-400">while</span>(WiFi.status() != WL_CONNECTED){"\n    "}delay(<span className="text-purple-300">500</span>);{"\n}"}</>,
  "MPU6050":           <>Wire.<span className="text-emerald-300">begin</span>();{"\n"}Wire.<span className="text-emerald-300">beginTransmission</span>(<span className="text-purple-300">0x68</span>);{"\n"}Wire.<span className="text-emerald-300">write</span>(<span className="text-purple-300">0x6B</span>);{"\n"}Wire.<span className="text-emerald-300">write</span>(<span className="text-purple-300">0</span>);{"\n"}Wire.<span className="text-emerald-300">endTransmission</span>(<span className="text-pink-400">true</span>);</>,
  "RFID Module":       <><span className="text-pink-400">#include</span> &lt;MFRC522.h&gt;{"\n"}MFRC522 rfid(SS_PIN, RST_PIN);{"\n"}<span className="text-pink-400">void</span> <span className="text-emerald-300">loop</span>{"() {\n  "}<span className="text-pink-400">if</span>(rfid.<span className="text-emerald-300">PICC_IsNewCardPresent</span>()){"\n    "}rfid.<span className="text-emerald-300">PICC_ReadCardSerial</span>();{"\n  }"}{"\n}"}</>,
  "Ultrasonic Sensor": <>pinMode(TRIG, OUTPUT);{"\n"}<span className="text-pink-400">long</span> <span className="text-emerald-300">getDistance</span>{"() {\n  "}digitalWrite(TRIG, HIGH);{"\n  "}delayMicroseconds(<span className="text-purple-300">10</span>);{"\n  "}digitalWrite(TRIG, LOW);{"\n  "}<span className="text-pink-400">return</span> pulseIn(ECHO, HIGH) / <span className="text-purple-300">58</span>;{"\n}"}</>,
  "IR Sensor":         <><span className="text-pink-400">#define</span> IR_PIN <span className="text-purple-300">7</span>{"\n"}<span className="text-pink-400">void</span> <span className="text-emerald-300">loop</span>{"() {\n  "}<span className="text-pink-400">int</span> val = digitalRead(IR_PIN);{"\n  "}<span className="text-pink-400">if</span>(val == LOW){"\n    "}Serial.<span className="text-emerald-300">println</span>(<span className="text-yellow-300">"Object!"</span>);{"\n  }"}{"\n}"}</>,
  "Arduino IDE":       <><span className="text-pink-400">// Arduino IDE</span>{"\n"}<span className="text-pink-400">void</span> <span className="text-emerald-300">setup</span>{"() {\n  "}Serial.<span className="text-emerald-300">begin</span>(<span className="text-purple-300">115200</span>);{"\n  "}Serial.<span className="text-emerald-300">println</span>(<span className="text-yellow-300">"Device Ready"</span>);{"\n}"}</>,
  "MATLAB":            <>A = [<span className="text-purple-300">1</span> <span className="text-purple-300">2</span>; <span className="text-purple-300">3</span> <span className="text-purple-300">4</span>];{"\n"}eigenvalues = <span className="text-emerald-300">eig</span>(A);{"\n"}<span className="text-emerald-300">plot</span>(eigenvalues, <span className="text-yellow-300">'ro'</span>);</>,
  "Proteus":           <><span className="text-pink-400">// Proteus Simulation</span>{"\n"}<span className="text-pink-400">// 1.</span> Place Arduino UNO{"\n"}<span className="text-pink-400">// 2.</span> Add HC-SR04{"\n"}<span className="text-pink-400">// 3.</span> Load .hex{"\n"}<span className="text-pink-400">// 4.</span> Run @ 16MHz</>,
  "Analog":            <><span className="text-pink-400">int</span> val = <span className="text-emerald-300">analogRead</span>(A0);{"\n"}<span className="text-pink-400">float</span> v = val * (<span className="text-purple-300">5.0</span> / <span className="text-purple-300">1023.0</span>);{"\n"}Serial.<span className="text-emerald-300">println</span>(v);</>,
  "Digital":           <>pinMode(<span className="text-purple-300">13</span>, OUTPUT);{"\n"}digitalWrite(<span className="text-purple-300">13</span>, HIGH);{"\n"}delay(<span className="text-purple-300">1000</span>);{"\n"}digitalWrite(<span className="text-purple-300">13</span>, LOW);</>,
  "Wireless":          <><span className="text-pink-400">#include</span> &lt;esp_now.h&gt;{"\n"}<span className="text-pink-400">void</span> <span className="text-emerald-300">OnDataRecv</span>(const uint8_t* mac,{"\n  "}const uint8_t* data, <span className="text-pink-400">int</span> len){"{\n  "}memcpy(&rxData, data, <span className="text-pink-400">sizeof</span>(rxData));{"\n}"}</>,
  "Optical":           <><span className="text-pink-400">int</span> ldrVal = <span className="text-emerald-300">analogRead</span>(A1);{"\n"}<span className="text-pink-400">if</span>(ldrVal &lt; <span className="text-purple-300">300</span>){"{\n  "}Serial.<span className="text-emerald-300">println</span>(<span className="text-yellow-300">"Light!"</span>);{"\n}"}</>,
};

const SKILL_GROUPS = [
  { label: "Languages",             tag: "LANGUAGES",    accent: "#10b981", skills: ["C", "Embedded C", "Verilog"] },
  { label: "Hardware",              tag: "HARDWARE",     accent: "#06b6d4", skills: ["ESP32", "Arduino", "Ultrasonic Sensor", "IR Sensor", "MPU6050", "RFID Module"] },
  { label: "Tools",                 tag: "TOOLS",        accent: "#a78bfa", skills: ["Arduino IDE", "MATLAB", "Proteus"] },
  { label: "Communication Systems", tag: "COMMUNICATION",accent: "#34d399", skills: ["Analog", "Digital", "Wireless", "Optical"] },
];

const PROF_LABELS = ["Familiar", "Proficient", "Expert"];

function GroupCard({ group, groupIdx }: { group: typeof SKILL_GROUPS[0]; groupIdx: number }) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const snippet   = activeSkill ? CODE_SNIPPETS[activeSkill] : null;
  const profLevel = activeSkill ? getProficiency(activeSkill) : 0;
  const profLabel = profLevel > 0 ? PROF_LABELS[profLevel - 1] : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: groupIdx * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[2rem] bg-[#0f0f0f] border border-white/[0.08] hover:border-white/[0.15] transition-colors duration-300 overflow-hidden shadow-xl"
      onMouseLeave={() => setActiveSkill(null)}
    >
      {/* Header */}
      <div className="px-8 pt-7 pb-5 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: group.accent, boxShadow: `0 0 8px ${group.accent}` }} />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">{group.tag}</span>
        </div>
        {/* Proficiency */}
        <div className="flex items-center gap-2 h-5">
          {activeSkill && (
            <>
              <span className="text-[11px] font-mono text-white/30">{profLabel}</span>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full transition-all duration-200"
                    style={i <= profLevel ? { background: group.accent, boxShadow: `0 0 6px ${group.accent}` } : { background: "rgba(255,255,255,0.1)" }} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Skill pills */}
      <div className="px-8 py-6 flex flex-wrap gap-3">
        {group.skills.map(skill => {
          const isActive = activeSkill === skill;
          return (
            <button
              key={skill}
              onMouseEnter={() => setActiveSkill(skill)}
              className="px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 cursor-default select-none"
              style={isActive
                ? { background: group.accent, color: "#0a0a0a", borderColor: "transparent", boxShadow: `0 0 14px ${group.accent}88` }
                : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.1)" }
              }
            >
              {skill}
            </button>
          );
        })}
      </div>

      {/* Code snippet — always in DOM, shown/hidden via CSS only */}
      <div
        className="mx-6 transition-all duration-200 overflow-hidden"
        style={{
          maxHeight: snippet ? "300px" : "0px",
          opacity:   snippet ? 1 : 0,
          marginBottom: snippet ? "1.5rem" : "0",
        }}
      >
        <div className="rounded-2xl bg-[#050505] overflow-hidden" style={{ border: `1px solid ${group.accent}33` }}>
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.015]">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <span className="ml-2 text-[10px] font-mono text-white/20 tracking-widest">
              {activeSkill ? activeSkill.toLowerCase().replace(/ /g, "_") + ".c" : ""}
            </span>
          </div>
          {/* Code — always rendered so no flash */}
          <pre className="p-5 font-mono text-xs leading-relaxed text-white/70 overflow-x-auto">
            {snippet ?? ""}
          </pre>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section className="relative z-20 bg-[#121212] overflow-hidden py-32 md:py-48 px-6 md:px-12 lg:px-24 border-t border-white/5" id="skills">
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-emerald-500/[0.07] rounded-full blur-[200px] mix-blend-screen pointer-events-none translate-x-[20%] -translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10 lg:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-[5rem] font-bold text-white tracking-tighter mb-6"
        >
          Skills<span className="text-emerald-400">.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/40 text-lg mb-20 font-light"
        >
          Hover over any skill to see a code snippet.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {SKILL_GROUPS.map((group, gi) => (
            <GroupCard key={group.label} group={group} groupIdx={gi} />
          ))}
        </div>
      </div>
    </section>
  );
}
