"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import Image from "next/image";
import { products, type Product } from "@/lib/products";
import {
  UtensilsCrossed,
  X,
  MessageSquare,
  Coffee,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [portions, setPortions] = useState(2);
  const [serviceType, setServiceType] = useState<"in-room" | "restaurant">("in-room");
  const [specialNote, setSpecialNote] = useState("Medium Spice");

  const coffeeItems = products.filter((p) => p.category === "coffee");
  const pasticceriaItems = products.filter((p) => p.category === "pasticceria");

  const handleOpenOrder = (product: Product) => {
    setSelectedProduct(product);
    setPortions(2);
    setServiceType("in-room");
    setSpecialNote("Medium Spice");
  };

  return (
    <div id="dining" className="relative">
      {/* Coffee & Tiffin Section */}
      <section id="coffee" className="relative pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-italian-red font-medium">
            Chapter I · Filter Coffee &amp; Tiffin
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-warm-brown">
            The Kumbakonam Ritual
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-warm-brown/70 max-w-lg mx-auto">
            Freshly brewed degree filter coffee in pure brass davarah-tumblers, paired with soft steamed tiffin.
          </p>
        </div>
        {coffeeItems.map((product, index) => (
          <ProductChapter
            key={product.id}
            product={product}
            reverse={index % 2 === 1}
            onOrder={() => handleOpenOrder(product)}
          />
        ))}
      </section>

      {/* Pasticceria & Royal Feasts Section */}
      <section id="pasticceria" className="relative pt-24 pb-24 border-t border-cream/80">
        <div className="mx-auto max-w-7xl px-6 md:px-12 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-olive font-medium">
            Chapter II · Heritage Confections &amp; Feasts
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-warm-brown">
            Chettinad Royal Treats
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-warm-brown/70 max-w-lg mx-auto">
            Traditional slow-cooked recipes prepared using heritage brass cauldrons and cold-pressed sesame oil.
          </p>
        </div>
        {pasticceriaItems.map((product, index) => (
          <ProductChapter
            key={product.id}
            product={product}
            reverse={index % 2 === 0}
            onOrder={() => handleOpenOrder(product)}
          />
        ))}
      </section>

      {/* Interactive Dining Order / Table Reservation Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md"
          >
            <div className="relative w-full max-w-md rounded-none border border-gold/40 bg-[#170f0b] p-6 text-warm-white shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
                    Dakshin Royal Dining · {selectedProduct.category}
                  </span>
                  <h3 className="mt-1 font-display text-2xl text-warm-white">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs text-gold font-mono font-semibold mt-0.5">
                    {selectedProduct.price} · {selectedProduct.origin}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-none border border-white/20 p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Service Type Selection */}
              <div className="mt-5 space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/60 mb-2">
                    1. Dining Service Option
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setServiceType("in-room")}
                      className={`p-3 rounded-none border text-left transition-all cursor-pointer ${serviceType === "in-room"
                          ? "bg-gold/20 border-gold text-white font-semibold"
                          : "bg-white/5 border-white/15 text-white/70 hover:bg-white/10"
                        }`}
                    >
                      <p className="font-semibold text-warm-white">In-Room Delivery</p>
                      <p className="text-[10px] text-white/60 mt-0.5">Delivered to Suite in 25 mins</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceType("restaurant")}
                      className={`p-3 rounded-none border text-left transition-all cursor-pointer ${serviceType === "restaurant"
                          ? "bg-gold/20 border-gold text-white font-semibold"
                          : "bg-white/5 border-white/15 text-white/70 hover:bg-white/10"
                        }`}
                    >
                      <p className="font-semibold text-warm-white">Reserve Dining Table</p>
                      <p className="text-[10px] text-white/60 mt-0.5">At Dakshin Courtyard Pavilion</p>
                    </button>
                  </div>
                </div>

                {/* Portions / Guests */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/60 mb-2">
                    2. Portions / Guests
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setPortions(n)}
                        className={`flex-1 py-2 rounded-none text-xs font-semibold transition-all cursor-pointer ${portions === n
                            ? "bg-gold text-warm-brown shadow-sm"
                            : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
                          }`}
                      >
                        {n} {n === 5 ? "+" : ""}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary Preference */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/60 mb-2">
                    3. Dietary / Spice Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Mild Spice (Family Friendly)",
                      "Medium Authentic Chettinad",
                      "Extra Spicy (Traditional)",
                      "Pure Vegetarian / Jain Preparation",
                    ].map((pref) => (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => setSpecialNote(pref)}
                        className={`p-2 text-left text-[11px] rounded-none border transition-all cursor-pointer ${specialNote === pref
                            ? "bg-gold/15 border-gold text-gold font-medium"
                            : "bg-white/5 border-white/15 text-white/65 hover:bg-white/10"
                          }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inclusions Note */}
                <div className="p-3 rounded-none bg-white/5 border border-white/10 flex items-center gap-2 text-[11px] text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Served fresh in traditional brass &amp; banana leaf presentation</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/919444012345?text=${encodeURIComponent(
                    `Vanakkam! I would like to order: ${selectedProduct.name} (${portions} portion${portions > 1 ? "s" : ""}) · Service: ${serviceType === "in-room" ? "In-Room Suite Delivery" : "Reserve Table at Dakshin Restaurant"} · Preference: ${specialNote}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-none bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold uppercase tracking-wider text-white transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Send Order to WhatsApp Concierge</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="w-full py-2.5 rounded-none border border-white/20 bg-white/5 hover:bg-white/10 text-xs uppercase tracking-wider text-white/70 transition-colors cursor-pointer"
                >
                  Close Menu
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductChapter({
  product,
  reverse,
  onOrder,
}: {
  product: Product;
  reverse: boolean;
  onOrder: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.97]);
  const textY = useTransform(scrollYProgress, [0, 1], [35, -35]);

  return (
    <article
      ref={ref}
      id={`item-${product.id}`}
      className={`mx-auto grid min-h-[85svh] max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-12 ${reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
    >
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="relative aspect-[4/5] w-full"
        data-cursor-text="SAVOR"
      >
        <div className="group relative h-full w-full overflow-hidden rounded-none border border-warm-brown/20 shadow-[0_40px_90px_-30px_rgba(90,70,54,0.38)] transition-all duration-700 hover:shadow-[0_50px_100px_-25px_rgba(90,70,54,0.48)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 ease-[var(--ease-cinematic)] group-hover:scale-108"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={product.id === "espresso"}
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-warm-brown/40 via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-30" />

          {/* Price Tag Badge */}
          <div className="absolute top-6 right-6 rounded-none bg-black/75 px-4 py-1.5 text-xs font-semibold text-gold border border-gold/40 shadow-lg backdrop-blur-md">
            {product.price}
          </div>
        </div>
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
          <span className="rounded-none border border-warm-brown/20 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-warm-brown/70">
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
              className="rounded-none bg-cream/70 border border-warm-brown/10 px-3 py-1 text-xs text-warm-brown/80 backdrop-blur-xs transition-colors hover:bg-cream hover:text-warm-brown"
            >
              {note}
            </span>
          ))}
        </motion.div>

        {/* User-Friendly Action Button: Order to Room / Reserve Table */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.45, duration: 1, ease: EASE }}
          className="mt-8 flex items-center gap-4"
        >
          <button
            type="button"
            onClick={onOrder}
            className="flex items-center gap-2.5 rounded-none bg-italian-red hover:bg-[#b5372e] py-3 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-warm-white shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <UtensilsCrossed className="h-3.5 w-3.5" />
            <span>Order to Room / Reserve Table</span>
          </button>
        </motion.div>
      </motion.div>
    </article>
  );
}
