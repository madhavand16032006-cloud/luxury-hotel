"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";

const INGREDIENTS = [
  {
    name: "Arabica beans",
    origin: "Sidama & San Marcos",
    note: "Single-origin beans slow-roasted in small batches to preserve natural stone fruit and cocoa undertones.",
    profile: "Fragrant · Floral · Cocoa",
    tone: "#c9a65b",
    image: "/images/beans.jpg",
  },
  {
    name: "Mascarpone",
    origin: "Lombardy Dairy Farms",
    note: "Fresh cow's milk cream whipped by hand every morning until velvety, smooth, and cloud-light.",
    profile: "Silk · Sweet Cream · Delicate",
    tone: "#e8dcc8",
  },
  {
    name: "Olive oil",
    origin: "Tuscan Cold-Pressed",
    note: "First cold-extraction from hand-harvested Frantoio olives, delivering grassy and peppery finish.",
    profile: "Golden · Grassy · Peppery",
    tone: "#b5b56a",
  },
  {
    name: "Sweet Basil",
    origin: "Ligurian Coast",
    note: "DOP Genovese basil picked with the morning dew, crushed moments before service for optimal aromatics.",
    profile: "Anise · Herbaceous · Vibrant",
    tone: "#5c7a5a",
  },
];

export function IngredientCards() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} id="ingredients" className="relative overflow-hidden px-6 py-40 md:px-12 bg-warm-white">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <p className="text-xs uppercase tracking-[0.35em] text-olive font-medium">L'Artigianalità</p>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl text-warm-brown">The Sacred Ingredients</h2>
        <p className="mt-4 text-sm leading-relaxed text-warm-brown/70">
          Every espresso pulled and every pastry folded begins with four uncompromising pillars of Italian terroir.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {INGREDIENTS.map((item, i) => (
          <IngredientCard key={item.name} item={item} index={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

type Item = (typeof INGREDIENTS)[number];

function IngredientCard({
  item,
  index,
  progress,
}: {
  item: Item;
  index: number;
  progress: MotionValue<number>;
}) {
  const direction = index % 2 === 0 ? 1 : -1;
  const rotate = useTransform(progress, [0, 1], [-3.5 * direction, 3.5 * direction]);
  const y = useTransform(progress, [0, 1], [50 + index * 18, -50 - index * 18]);

  return (
    <motion.div style={{ rotate, y }} className="will-change-transform">
      <motion.div
        whileHover={{ scale: 1.05, y: -8 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex aspect-[3/4.2] flex-col justify-between overflow-hidden rounded-[2rem] border border-warm-brown/15 bg-white/70 p-7 shadow-[0_30px_60px_-25px_rgba(90,70,54,0.25)] backdrop-blur-md transition-shadow hover:shadow-[0_40px_80px_-20px_rgba(90,70,54,0.35)]"
        data-cursor-text="ORIGIN"
      >
        {/* Background glow or actual image */}
        {"image" in item && item.image ? (
          <div className="absolute inset-x-0 top-0 h-3/5 overflow-hidden rounded-t-[1.75rem]">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/50 to-white/95" />
          </div>
        ) : (
          <div
            className="absolute inset-x-0 top-0 h-2/3 opacity-70 blur-[3px] transition-opacity duration-500 group-hover:opacity-90"
            style={{ background: `radial-gradient(circle at 40% 30%, ${item.tone}, transparent 75%)` }}
            aria-hidden="true"
          />
        )}

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="rounded-full bg-warm-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-warm-brown shadow-xs backdrop-blur-xs">
            0{index + 1}
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-warm-brown/60 font-medium">
            {item.origin}
          </span>
        </div>

        {/* Bottom Details */}
        <div className="relative z-10 pt-4">
          <span className="inline-block rounded-full bg-cream/70 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-warm-brown/70 mb-2">
            {item.profile}
          </span>
          <h3 className="font-display text-3xl text-warm-brown group-hover:text-italian-red transition-colors">
            {item.name}
          </h3>
          <p className="mt-2.5 text-xs leading-relaxed text-warm-brown/75">
            {item.note}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
