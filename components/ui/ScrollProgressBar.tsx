"use client";

import React from "react";
import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  // Silky smooth physics for luxury motion as the user scrolls
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none"
      aria-hidden="true"
    >
      {/* Moving Scroll Progress Line matching Reference Image */}
      <motion.div
        style={{ scaleX }}
        className="h-full w-full bg-gradient-to-r from-[#c2593f] via-[#d96543] to-[#c2593f] origin-left shadow-[0_1px_8px_rgba(194,89,63,0.55)]"
      />
    </div>
  );
}

