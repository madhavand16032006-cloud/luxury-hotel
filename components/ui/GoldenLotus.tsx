import React from "react";

export function GoldenLotus({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lotusGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#be8e46" />
          <stop offset="30%" stopColor="#dfba73" />
          <stop offset="60%" stopColor="#fae4b2" />
          <stop offset="100%" stopColor="#c79a4d" />
        </linearGradient>
      </defs>
      {/* Central Upright Lotus Petal */}
      <path
        d="M32 10 C29 22 28 34 32 44 C36 34 35 22 32 10 Z"
        fill="url(#lotusGoldGrad)"
        stroke="#fff0c8"
        strokeWidth="0.75"
      />
      {/* Intermediate Left Petal */}
      <path
        d="M32 44 C26 33 19 22 14 17 C21 24 28 34 32 44 Z"
        fill="url(#lotusGoldGrad)"
        opacity="0.95"
      />
      {/* Intermediate Right Petal */}
      <path
        d="M32 44 C38 33 45 22 50 17 C43 24 36 34 32 44 Z"
        fill="url(#lotusGoldGrad)"
        opacity="0.95"
      />
      {/* Outer Flared Left Petal */}
      <path
        d="M32 44 C19 36 10 28 4 23 C12 30 23 37 32 44 Z"
        fill="url(#lotusGoldGrad)"
        opacity="0.85"
      />
      {/* Outer Flared Right Petal */}
      <path
        d="M32 44 C45 36 54 28 60 23 C52 30 41 37 32 44 Z"
        fill="url(#lotusGoldGrad)"
        opacity="0.85"
      />
      {/* Lotus Floral Base Curves */}
      <path
        d="M18 47 Q32 41 46 47 Q32 43.5 18 47 Z"
        fill="url(#lotusGoldGrad)"
      />
      <path
        d="M23 49.5 Q32 46.5 41 49.5 Q32 48 23 49.5 Z"
        fill="url(#lotusGoldGrad)"
      />
    </svg>
  );
}

