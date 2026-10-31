"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  Volume2,
  VolumeX,
  Sparkles,
  Coffee,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Camera,
  Info,
  CheckCircle2,
} from "lucide-react";

const MATERIALS = [
  {
    name: "Athangudi Handmade Tiles",
    description:
      "Centuries-old artisanal geometric floor tiles hand-cast using natural earth pigments, river sand, and glass molds in Chettinad.",
    tag: "Heritage Craft",
    image: "/images/room-chettinad-suite.jpg",
    origin: "Kanadukathan & Athangudi, Sivaganga",
    story:
      "Crafted individually by Chettiar master artisans without machinery, these tiles naturally maintain a cool temperature even during midsummer afternoons, giving our sanctuary its signature soothing earth feel underfoot.",
  },
  {
    name: "Hand-Carved Burma Teak",
    description:
      "Soaring royal palace pillars and intricately carved door lintels preserving authentic Tamil regal majesty and timeless permanence.",
    tag: "Architecture",
    image: "/images/hotel-hero.jpg",
    origin: "Historic Chettinad Merchant Mansions",
    story:
      "Imported by 19th-century maritime traders and hand-carved with motifs of lotus blossoms and sacred peacocks, our teak pillars ground the sanctuary with a warm, grounding aura of dignified permanence.",
  },
  {
    name: "Kuthu Vilakku Brasswork",
    description:
      "Traditional temple-grade brass oil lamps casting warm, comforting ambient glows and the fragrance of cold-pressed sesame oil across our courtyards.",
    tag: "Aura & Serenity",
    image: "/images/facility-dining.jpg",
    origin: "Nachiyar Koil, Thanjavur District",
    story:
      "Handcrafted in the bell-metal casting foundries of Nachiyar Koil, every brass lamp is ritually lit each evening at dusk, marking the transition from worldly bustle to quiet royal contemplation.",
  },
];

const SANCTUARY_PHOTOS = [
  {
    title: "The Heritage Courtyard & Teak Pillars",
    subtitle: "Central Palace Quadrangle",
    description:
      "Sunlit central courtyard framed by century-old Burmese teakwood pillars, Athangudi flooring, and fragrant jasmine garlands.",
    src: "/images/hotel-hero.jpg",
  },
  {
    title: "Emerald Courtyard Swimming Pool",
    subtitle: "Open 06:00 to 20:00 · Valet Active",
    description:
      "Tranquil poolside lounge nestled between carved stone pavilions, tropical foliage, and private relaxation cabanas.",
    src: "/images/facility-pool.jpg",
  },
  {
    title: "Dakshin Royal Dining Pavilion",
    subtitle: "Chettinad & Pure Vegetarian",
    description:
      "Traditional bronze-ware dining experience featuring slow-cooked Chettinad curries and authentic Kumbakonam brass filter coffee.",
    src: "/images/facility-dining.jpg",
  },
  {
    title: "Secured Covered Parking & Valet",
    subtitle: "24/7 Monitored Bay · Complimentary",
    description:
      "Spacious covered parking with round-the-clock CCTV surveillance, EV charging ports, and immediate valet service upon arrival.",
    src: "/images/facility-parking.jpg",
  },
];

export function Atmosphere() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Ambient Audio State & Web Audio Synthesizer
  const [soundPlaying, setSoundPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Gallery Modal State
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  // Craft Story Modal State
  const [selectedCraft, setSelectedCraft] = useState<(typeof MATERIALS)[0] | null>(null);

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.05]);

  // Clean Web Audio Ambient Synthesis (Carnatic Mohanam Pentatonic Drone: peaceful & soothing)
  const toggleSound = () => {
    if (soundPlaying) {
      // Fade out and stop
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0.0001,
          audioCtxRef.current.currentTime + 0.6
        );
        setTimeout(() => {
          oscillatorsRef.current.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch (err) {
              // ignore
            }
          });
          oscillatorsRef.current = [];
          setSoundPlaying(false);
        }, 600);
      } else {
        setSoundPlaying(false);
      }
    } else {
      // Start calming ambient temple harmonic drone
      try {
        const AudioCtxClass =
          window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtxClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.2);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Frequencies for Mohanam / Kalyani serene drone (Sa, Pa, Sa - Tanpura & Flute resonance)
        const notes = [130.81, 196.0, 261.63, 329.63, 392.0];
        const newOscs: OscillatorNode[] = [];

        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(450 + idx * 80, ctx.currentTime);

          const oscGain = ctx.createGain();
          oscGain.gain.value = 0.25 / (idx + 1);

          osc.type = idx % 2 === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle natural detune for warmth
          osc.detune.setValueAtTime((idx - 2) * 4, ctx.currentTime);

          osc.connect(filter);
          filter.connect(oscGain);
          oscGain.connect(masterGain);
          osc.start();
          newOscs.push(osc);
        });

        oscillatorsRef.current = newOscs;
        setSoundPlaying(true);
      } catch (e) {
        console.warn("Web Audio not permitted by browser:", e);
        setSoundPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {
          // cleanup
        }
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const openGallery = (idx = 0) => {
    setCurrentPhotoIdx(idx);
    setGalleryOpen(true);
  };

  const nextPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev + 1) % SANCTUARY_PHOTOS.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev - 1 + SANCTUARY_PHOTOS.length) % SANCTUARY_PHOTOS.length);
  };

  return (
    <section
      ref={containerRef}
      id="atmosphere"
      className="relative overflow-hidden bg-warm-white py-32 md:py-40 border-t border-cream"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-italian-red font-medium">
            L&apos;Atmosfera · Chettinad Royal Aesthetics
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-tight text-warm-brown">
            A sanctuary carved from heritage, teak, and stone.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-warm-brown/75">
            Step through our carved teakwood portals and leave the rush of modern life behind.
            Here, the fragrance of fresh jasmine, the cool caress of Athangudi tiles, and the gentle whisper
            of central AC create a peaceful haven in the heart of Tamil Nadu.
          </p>
        </div>

        {/* Ambient Visual Feature with Clear, Working Buttons */}
        <div className="mt-16 relative aspect-16/9 sm:aspect-21/9 w-full overflow-hidden rounded-none border border-warm-brown/20 shadow-[0_40px_100px_-30px_rgba(90,70,54,0.4)]">
          <motion.div style={{ scale: imageScale }} className="relative h-full w-full">
            <Image
              src="/images/hotel-hero.jpg"
              alt="BR Vasantham Grand architecture and atmosphere"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />
          </motion.div>

          {/* Top-Left Action Button: View Sanctuary Photo Gallery */}
          <div className="absolute top-5 left-5 z-10">
            <button
              type="button"
              onClick={() => openGallery(0)}
              className="group flex items-center gap-2 rounded-none border border-white/25 bg-black/60 px-4 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-warm-white shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-gold hover:text-warm-brown cursor-pointer active:scale-95"
            >
              <Camera className="h-4 w-4 text-gold group-hover:text-warm-brown" />
              <span>View Sanctuary Gallery ({SANCTUARY_PHOTOS.length} Views)</span>
            </button>
          </div>

          {/* Top-Right Action Button: Real Web-Audio Carnatic Temple Ambience */}
          <div className="absolute top-5 right-5 z-10">
            <button
              type="button"
              onClick={toggleSound}
              className={`group flex items-center gap-2.5 rounded-none border px-4 py-2.5 text-xs uppercase tracking-[0.18em] font-medium shadow-xl backdrop-blur-md transition-all duration-300 cursor-pointer active:scale-95 ${
                soundPlaying
                  ? "bg-emerald-950/80 border-emerald-400 text-emerald-200"
                  : "bg-black/60 border-white/25 text-warm-white hover:bg-white/20"
              }`}
            >
              {soundPlaying ? (
                <>
                  <Volume2 className="h-4 w-4 text-emerald-400 animate-pulse" />
                  <span>Courtyard Flute Ambience: On</span>
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-0.5 h-2/3 bg-emerald-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-0.5 h-4/5 bg-emerald-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="h-4 w-4 opacity-70" />
                  <span>Play Courtyard Ambience</span>
                </>
              )}
            </button>
          </div>

          {/* Floating Interior Quote & Facilities Badge */}
          <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-warm-white">
            <div className="max-w-md">
              <p className="font-display text-lg sm:text-2xl text-warm-white leading-snug drop-shadow-md">
                &ldquo;True royal luxury is not mere ornamentation, but the peace felt within.&rdquo;
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-white/70">
                BR Vasantham Grand · Tamil Nadu Sanctuary
              </p>
            </div>
            <a
              href="#visit"
              className="flex items-center gap-2 rounded-none border border-gold/40 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-md hover:bg-gold hover:text-warm-brown transition-colors text-gold"
            >
              <Coffee className="h-3.5 w-3.5" />
              <span>Reserve Room in this Sanctuary →</span>
            </a>
          </div>
        </div>

        {/* 3 Material Cards with Working 'Read Heritage Story' Modal Button */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {MATERIALS.map((mat, i) => (
            <motion.div
              key={mat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-none border border-warm-brown/15 bg-white p-8 shadow-[0_20px_45px_-20px_rgba(90,70,54,0.1)] transition-all duration-300 hover:shadow-[0_30px_60px_-20px_rgba(90,70,54,0.2)] hover:border-gold/50"
            >
              <div>
                <span className="rounded-none bg-cream px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold text-warm-brown/80 border border-warm-brown/15">
                  {mat.tag}
                </span>
                <h3 className="mt-5 font-display text-2xl text-warm-brown group-hover:text-italian-red transition-colors">
                  {mat.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-warm-brown/75">
                  {mat.description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-cream pt-4">
                <span className="text-xs uppercase tracking-[0.2em] text-warm-brown/50">Element 0{i + 1}</span>
                <button
                  type="button"
                  onClick={() => setSelectedCraft(mat)}
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-italian-red hover:text-warm-brown transition-colors cursor-pointer"
                >
                  <span>Read Craft Story</span>
                  <Info className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 1. Full-Screen Photo Gallery Modal */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-xl"
          >
            <div className="relative w-full max-w-5xl rounded-none border border-white/20 bg-[#160e0a] overflow-hidden text-warm-white shadow-2xl">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gold uppercase tracking-wider">
                    Photo {currentPhotoIdx + 1} of {SANCTUARY_PHOTOS.length}
                  </span>
                  <span className="text-xs text-white/40">|</span>
                  <span className="text-xs text-white/70 uppercase tracking-widest font-medium">
                    {SANCTUARY_PHOTOS[currentPhotoIdx].subtitle}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setGalleryOpen(false)}
                  className="rounded-none border border-white/20 p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Gallery"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Photo Display */}
              <div className="relative aspect-16/9 w-full bg-black/50">
                <Image
                  src={SANCTUARY_PHOTOS[currentPhotoIdx].src}
                  alt={SANCTUARY_PHOTOS[currentPhotoIdx].title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />

                {/* Left Arrow */}
                <button
                  type="button"
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-none border border-white/20 bg-black/60 p-3 text-white hover:bg-gold hover:text-warm-brown transition-colors cursor-pointer"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Right Arrow */}
                <button
                  type="button"
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-none border border-white/20 bg-black/60 p-3 text-white hover:bg-gold hover:text-warm-brown transition-colors cursor-pointer"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Caption & Quick Booking Action */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
                <div>
                  <h3 className="font-display text-2xl text-warm-white">
                    {SANCTUARY_PHOTOS[currentPhotoIdx].title}
                  </h3>
                  <p className="mt-1 text-xs text-white/70 max-w-xl">
                    {SANCTUARY_PHOTOS[currentPhotoIdx].description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="#visit"
                    onClick={() => setGalleryOpen(false)}
                    className="rounded-none bg-italian-red hover:bg-[#b5372e] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-warm-white transition-all shadow-md cursor-pointer"
                  >
                    Reserve Stay
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Craft Story Modal */}
      <AnimatePresence>
        {selectedCraft && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8 backdrop-blur-md"
          >
            <div className="relative w-full max-w-lg rounded-none border border-gold/40 bg-[#160e0a] p-6 sm:p-8 text-warm-white shadow-2xl">
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
                    {selectedCraft.tag} · {selectedCraft.origin}
                  </span>
                  <h3 className="mt-1 font-display text-2xl sm:text-3xl text-warm-white">
                    {selectedCraft.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCraft(null)}
                  className="rounded-none border border-white/20 p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed">
                <p>{selectedCraft.description}</p>
                <div className="p-4 rounded-none bg-white/5 border border-white/10 text-xs text-white/90">
                  <p className="font-semibold text-gold mb-1">Architectural Significance:</p>
                  <p>{selectedCraft.story}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Preserved across all Guest Suites</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCraft(null)}
                  className="rounded-none bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-wider text-warm-brown transition-colors cursor-pointer"
                >
                  Close Story
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
