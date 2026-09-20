"use client";

import React, { useState } from "react";
import { motion, MotionValue, useTransform, useMotionValueEvent } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  const [showHero, setShowHero] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.12 && showHero) {
      setShowHero(false);
    } else if (latest <= 0.12 && !showHero) {
      setShowHero(true);
    }
  });

  // Section 1: Hero (0% to 8%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.04, 0.08], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.08], [0, -150]);

  // Section 2: Left Text (10% to 20%)
  const opacity2 = useTransform(scrollYProgress, [0.10, 0.15, 0.20], [0, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.10, 0.15, 0.20], [100, 0, -100]);

  // Section 3: Right Text (22% to 32%)
  const opacity3 = useTransform(scrollYProgress, [0.22, 0.27, 0.32], [0, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.22, 0.27, 0.32], [100, 0, -100]);

  return (
    <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
      
      {/* Section 1 */}
      {showHero && (
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
            Priya Singh.
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide">
            Embedded Systems & IoT Engineer.
          </p>
        </motion.div>
      )}

      {/* Section 2 */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-16 lg:p-24"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight max-w-sm md:max-w-md lg:max-w-lg drop-shadow-2xl">
          I build hardware that senses, processes, and automates.
        </h2>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col items-end justify-center p-8 md:p-16 lg:p-24 text-right"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight max-w-sm md:max-w-md lg:max-w-lg drop-shadow-2xl">
          Real prototypes. Real sensors. Real-time responses under 200ms.
        </h2>
      </motion.div>

    </div>
  );
}
