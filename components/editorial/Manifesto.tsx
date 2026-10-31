"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LINES = [
  "Coffee here is a ritual, not a rush.",
  "We roast slowly, pour patiently,",
  "and serve every cup as if it were",
  "the first of the morning.",
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(".manifesto-word");

      gsap.fromTo(
        words,
        { opacity: 0.12, y: 12 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        },
      );

      ScrollTrigger.refresh();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="story" className="relative mx-auto max-w-6xl px-6 py-40 md:px-12">
      <p className="mb-10 text-xs uppercase tracking-[0.35em] text-basil">Our philosophy</p>
      <p className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.15] text-warm-brown">
        {LINES.map((line) =>
          line.split(" ").map((word, i) => (
            <span key={`${line}-${i}`} className="manifesto-word mr-[0.28em] inline-block">
              {word}
            </span>
          )),
        )}
      </p>
    </section>
  );
}
