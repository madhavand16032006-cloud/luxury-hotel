"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { products, type Product } from "@/lib/products";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProductShowcase() {
  const coffeeItems = products.filter((p) => p.category === "coffee");
  const pasticceriaItems = products.filter((p) => p.category === "pasticceria");

  return (
    <div id="dining" className="relative">
      {/* Coffee Section */}
      <section id="coffee" className="relative pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-italian-red">Chapter I · Filter Coffee &amp; Tiffin</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-warm-brown">The Kumbakonam Ritual</h2>
        </div>
        {coffeeItems.map((product, index) => (
          <ProductChapter key={product.id} product={product} reverse={index % 2 === 1} />
        ))}
      </section>

      {/* Pasticceria Section */}
      <section id="pasticceria" className="relative pt-24 pb-24 border-t border-cream/80">
        <div className="mx-auto max-w-7xl px-6 md:px-12 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-olive">Chapter II · Heritage Confections</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-warm-brown">Chettinad Royal Treats</h2>
        </div>
        {pasticceriaItems.map((product, index) => (
          <ProductChapter key={product.id} product={product} reverse={index % 2 === 0} />
        ))}
      </section>
    </div>
  );
}

function ProductChapter({ product, reverse }: { product: Product; reverse: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Parallax float and a gentle scale as the chapter moves through the viewport
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.97]);
  const textY = useTransform(scrollYProgress, [0, 1], [35, -35]);

  return (
    <article
      ref={ref}
      id={`item-${product.id}`}
      className={`mx-auto grid min-h-[85svh] max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-12 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="relative aspect-[4/5] w-full"
        data-cursor-text="SAVOR"
      >
        <div className="group relative h-full w-full overflow-hidden rounded-[2.25rem] shadow-[0_40px_90px_-30px_rgba(90,70,54,0.38)] transition-all duration-700 hover:shadow-[0_50px_100px_-25px_rgba(90,70,54,0.48)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 ease-[var(--ease-cinematic)] group-hover:scale-108"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={product.id === "espresso"}
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-warm-brown/40 via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-30" />
          
          {/* Subtle price tag overlay on photo */}
          <div className="absolute top-6 right-6 rounded-full bg-warm-white/90 px-4 py-1.5 text-xs font-semibold text-warm-brown shadow-lg backdrop-blur-md">
            {product.price}
          </div>
        </div>
        <div className="absolute -bottom-6 -right-6 -z-10 h-36 w-36 rounded-full bg-cream/90 shadow-[0_20px_50px_-20px_rgba(90,70,54,0.35)] backdrop-blur-md md:h-44 md:w-44" />
      </motion.div>

      <motion.div style={{ y: textY }} className="max-w-md">
        <div className="flex items-center gap-3">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.35em" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="text-xs uppercase text-italian-red font-medium"
          >
            {product.italian}
          </motion.p>
          <span className="text-xs text-warm-brown/40">·</span>
          <span className="rounded-full border border-warm-brown/20 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-warm-brown/70">
            {product.category}
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="mt-3 font-display text-[clamp(2.75rem,6.5vw,5.5rem)] leading-none text-warm-brown"
        >
          {product.name}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.2, duration: 1.2, ease: EASE }}
          className="mt-2 text-xs uppercase tracking-[0.2em] text-warm-brown/60"
        >
          {product.origin}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.25, duration: 1.2, ease: EASE }}
          className="mt-6 text-base leading-relaxed text-warm-brown/80"
        >
          {product.description}
        </motion.p>

        {/* Tasting Notes Tags */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.35, duration: 1, ease: EASE }}
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] text-warm-brown/50 mr-1">Notes:</span>
          {product.notes.map((note) => (
            <span
              key={note}
              className="rounded-full bg-cream/70 border border-warm-brown/10 px-3 py-1 text-xs text-warm-brown/80 backdrop-blur-xs transition-colors hover:bg-cream hover:text-warm-brown"
            >
              {note}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </article>
  );
}
