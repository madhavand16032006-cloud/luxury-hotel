"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles, Calendar, ArrowRight, ChevronRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface PageHeroProps {
  eyebrow: string;
  title: string;
  highlightTitle?: string;
  subtitle: string;
  breadcrumb: string;
  imageSrc?: string;
  videoSrc?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function PageHero({
  eyebrow,
  title,
  highlightTitle,
  subtitle,
  breadcrumb,
  imageSrc = "/images/hotel-hero.jpg",
  videoSrc,
  ctaText = "Reserve Your Stay",
  ctaHref = "/#visit",
}: PageHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative h-[55vh] min-h-[440px] max-h-[620px] w-full overflow-hidden bg-[#0d0806] flex items-end">
      {/* Cinematic Motion Video or Photography Background */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute inset-0"
      >
        {videoSrc ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={imageSrc}
            className="h-full w-full object-cover"
            style={{
              filter: "contrast(1.08) brightness(0.95) saturate(1.1)",
            }}
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={imageSrc}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}

        {/* Cinematic Atmospheric Luxury Dark Vignette & Dusk Overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/35" />
        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-black/60" />
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 sm:pb-16 md:px-12">
        {/* Breadcrumb Path in Light Gold */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
          className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-medium text-white/60 mb-3"
        >
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-gold/70" />
          <span className="text-[#dfba73] font-semibold">{breadcrumb}</span>
        </motion.div>

        {/* Category Eyebrow with Gold Accent Rule */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
          className="flex items-center gap-2.5 text-xs uppercase tracking-[0.3em] font-semibold text-gold mb-3"
        >
          <Sparkles className="h-3 w-3 text-gold" />
          <span>{eyebrow}</span>
          <span className="hidden sm:inline-block h-px w-16 bg-gradient-to-r from-gold to-transparent" />
        </motion.div>

        {/* Main Serif Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.08] tracking-tight text-warm-white max-w-3xl drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
        >
          {title}{" "}
          {highlightTitle && (
            <span className="bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] bg-clip-text text-transparent">
              {highlightTitle}
            </span>
          )}
        </motion.h1>

        {/* Editorial Subtitle & Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease: EASE }}
          className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2"
        >
          <p className="text-xs sm:text-sm leading-relaxed text-white/75 max-w-xl font-light">
            {subtitle}
          </p>

          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] hover:brightness-105 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#1a120b] shadow-[0_4px_20px_rgba(223,186,115,0.4)] transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Calendar className="h-4 w-4 text-[#1a120b]" />
            <span>{ctaText}</span>
            <ArrowRight className="h-4 w-4 text-[#1a120b]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

