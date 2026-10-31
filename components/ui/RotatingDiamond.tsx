"use client";

import React from "react";
import { motion } from "motion/react";

interface RotatingDiamondProps {
  targetId?: string;
  className?: string;
}

export function RotatingDiamond({
  targetId = "facilities",
  className = "",
}: RotatingDiamondProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      aria-label="Explore BR Vasantham"
      data-cursor-text="EXPLORE"
      className={`group relative inline-flex flex-col items-center justify-center cursor-pointer select-none ${className}`}
    >
      {/* Prismatic Dispersion Halo behind the Diamond */}
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-300/25 via-white/35 to-amber-200/25 blur-sm opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

      {/* Subtle Breathing Caustic Ring to signify interactive discovery without words */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.55, 0.2] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
        className="absolute -inset-1.5 rounded-full border border-white/25 pointer-events-none group-hover:border-gold/50"
      />

      {/* 3D Perspective Rotator Container */}
      <div
        className="relative flex items-center justify-center"
        style={{ perspective: 600 }}
      >
        <motion.div
          animate={{
            rotateY: [0, 360],
            y: [0, 3.5, 0],
          }}
          transition={{
            rotateY: {
              repeat: Infinity,
              duration: 7,
              ease: "linear",
            },
            y: {
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
            },
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
          className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 active:scale-95"
        >
          {/* Realistic Brilliant-Cut Diamond Faceted SVG */}
          <svg
            viewBox="0 0 40 40"
            className="w-full h-full drop-shadow-[0_4px_12px_rgba(255,255,255,0.45)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Diamond Table Gradient */}
              <linearGradient id="diaTable" x1="12" y1="7" x2="28" y2="13" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.8" />
              </linearGradient>

              {/* Crown Bezel Left */}
              <linearGradient id="diaCrownL" x1="6" y1="13" x2="20" y2="7" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.9" />
              </linearGradient>

              {/* Crown Bezel Right */}
              <linearGradient id="diaCrownR" x1="34" y1="13" x2="20" y2="7" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.8" />
              </linearGradient>

              {/* Pavilion Center-Left (Ice Blue & Fire) */}
              <linearGradient id="diaPavCL" x1="14" y1="15" x2="20" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#7dd3fc" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.75" />
              </linearGradient>

              {/* Pavilion Center-Right (Brilliant White & Champagne Fire) */}
              <linearGradient id="diaPavCR" x1="26" y1="15" x2="20" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
              </linearGradient>

              {/* Pavilion Outer Left */}
              <linearGradient id="diaPavOL" x1="6" y1="15" x2="14" y2="25" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#1e3a8a" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.85" />
              </linearGradient>

              {/* Pavilion Outer Right */}
              <linearGradient id="diaPavOR" x1="34" y1="15" x2="26" y2="25" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#e0e7ff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
              </linearGradient>

              {/* Specular Girdle */}
              <linearGradient id="diaGirdle" x1="6" y1="14" x2="34" y2="14" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="75%" stopColor="#fef08a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* --- CROWN SECTION (Top) --- */}
            {/* Table Facet (Flat top) */}
            <polygon
              points="13,7 27,7 31,13 9,13"
              fill="url(#diaTable)"
              stroke="#ffffff"
              strokeWidth="0.5"
              strokeOpacity="0.9"
            />
            {/* Star Facets */}
            <polygon
              points="13,7 20,7 20,13 14,13"
              fill="url(#diaCrownL)"
              stroke="#ffffff"
              strokeWidth="0.4"
              strokeOpacity="0.8"
            />
            <polygon
              points="20,7 27,7 26,13 20,13"
              fill="url(#diaCrownR)"
              stroke="#ffffff"
              strokeWidth="0.4"
              strokeOpacity="0.8"
            />
            {/* Upper Corner Crown Kite Facets */}
            <polygon
              points="6,13 13,7 9,13"
              fill="url(#diaCrownL)"
              stroke="#ffffff"
              strokeWidth="0.4"
              strokeOpacity="0.75"
            />
            <polygon
              points="34,13 27,7 31,13"
              fill="url(#diaCrownR)"
              stroke="#ffffff"
              strokeWidth="0.4"
              strokeOpacity="0.75"
            />

            {/* --- GIRDLE BAND (Narrow belt) --- */}
            <polygon
              points="5.5,13 34.5,13 34.5,14.5 5.5,14.5"
              fill="url(#diaGirdle)"
              stroke="#ffffff"
              strokeWidth="0.3"
              strokeOpacity="0.8"
            />

            {/* --- PAVILION SECTION (Lower Cone pointing downward to Culet) --- */}
            {/* Outer Left Pavilion Facet */}
            <polygon
              points="5.5,14.5 13,14.5 20,36"
              fill="url(#diaPavOL)"
              stroke="#ffffff"
              strokeWidth="0.4"
              strokeOpacity="0.75"
            />
            {/* Center-Left Pavilion Facet */}
            <polygon
              points="13,14.5 20,14.5 20,36"
              fill="url(#diaPavCL)"
              stroke="#ffffff"
              strokeWidth="0.4"
              strokeOpacity="0.9"
            />
            {/* Center-Right Pavilion Facet */}
            <polygon
              points="20,14.5 27,14.5 20,36"
              fill="url(#diaPavCR)"
              stroke="#ffffff"
              strokeWidth="0.4"
              strokeOpacity="0.9"
            />
            {/* Outer Right Pavilion Facet */}
            <polygon
              points="27,14.5 34.5,14.5 20,36"
              fill="url(#diaPavOR)"
              stroke="#ffffff"
              strokeWidth="0.4"
              strokeOpacity="0.75"
            />

            {/* Internal Diamond Pavilion Ribs for realistic refraction lines */}
            <line x1="20" y1="14.5" x2="20" y2="36" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.95" />
            <line x1="13" y1="14.5" x2="20" y2="36" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.8" />
            <line x1="27" y1="14.5" x2="20" y2="36" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.8" />
            <line x1="9" y1="13" x2="13" y2="14.5" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.7" />
            <line x1="31" y1="13" x2="27" y2="14.5" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.7" />

            {/* Bottom Culet Point Specular Glint */}
            <circle cx="20" cy="36" r="0.8" fill="#ffffff" />
          </svg>

          {/* Twinkling 4-Point Star Sparkle Glint on Diamond Crown */}
          <motion.div
            animate={{
              scale: [0, 1.25, 0],
              opacity: [0, 1, 0],
              rotate: [0, 90],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              times: [0, 0.45, 1],
              delay: 0.6,
              ease: "easeInOut",
            }}
            className="absolute -top-1 right-0 w-3 h-3 pointer-events-none"
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
              <path
                d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
                fill="#ffffff"
              />
              <circle cx="8" cy="8" r="1.5" fill="#fef08a" />
            </svg>
          </motion.div>

          {/* Second Sparkle at Culet Tip */}
          <motion.div
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.9, 0],
              rotate: [45, 135],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.8,
              times: [0, 0.5, 1],
              delay: 1.7,
              ease: "easeInOut",
            }}
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 pointer-events-none"
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
              <path
                d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z"
                fill="#ffffff"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </a>
  );
}
