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
      {/* Moving Scroll Progress Line with Premium Royal Gold Finish */}
      <motion.div
        style={{ scaleX }}
        className="h-full w-full bg-gradient-to-r from-[#be8e46] via-[#fae4b2] to-[#dfba73] origin-left shadow-[0_1px_12px_rgba(223,186,115,0.75),0_0_4px_rgba(250,228,178,0.9)]"
      />
    </div>
  );
}

