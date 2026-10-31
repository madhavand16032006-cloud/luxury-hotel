"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Clock, Calendar, Sparkles } from "lucide-react";

const NAV_ITEMS = [
  { label: "Story", href: "#story" },
  { label: "Coffee", href: "#coffee" },
  { label: "Pasticceria", href: "#pasticceria" },
  { label: "Atmosphere", href: "#atmosphere" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Visit", href: "#visit" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Detect current section
      const sections = NAV_ITEMS.map((item) => item.href.slice(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "py-4 px-4 sm:px-8"
            : "py-6 sm:py-8 px-6 md:px-12"
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "max-w-6xl rounded-full border border-warm-brown/15 bg-warm-white/80 px-6 py-3 shadow-[0_20px_50px_-20px_rgba(90,70,54,0.15)] backdrop-blur-xl"
              : "max-w-7xl"
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "body")}
            className="group flex items-center gap-3 transition-opacity"
            data-cursor-text="TOP"
          >
            <span
              className={`font-display text-lg tracking-[0.3em] font-medium transition-colors ${
                scrolled ? "text-warm-brown" : "text-warm-white"
              }`}
            >
              BR VELLUTO
            </span>
            <span
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] transition-colors ${
                scrolled
                  ? "bg-basil/10 text-basil border border-basil/20"
                  : "bg-warm-white/15 text-warm-white backdrop-blur-sm"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open Today
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-7">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <li key={item.label} className="relative">
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:opacity-100 ${
                        scrolled
                          ? isActive
                            ? "text-italian-red font-semibold"
                            : "text-warm-brown/70 hover:text-warm-brown"
                          : isActive
                          ? "text-warm-white font-semibold"
                          : "text-warm-white/80 hover:text-warm-white"
                      }`}
                      data-cursor-text="VIEW"
                    >
                      {item.label}
                    </a>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${
                          scrolled ? "bg-italian-red" : "bg-warm-white"
                        }`}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            <a
              href="#visit"
              onClick={(e) => handleNavClick(e, "#visit")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                scrolled
                  ? "bg-italian-red text-warm-white hover:bg-italian-red/90 shadow-[0_10px_25px_-10px_rgba(142,44,37,0.5)] hover:-translate-y-0.5"
                  : "bg-warm-white/20 text-warm-white backdrop-blur-md hover:bg-warm-white/30 border border-warm-white/40"
              }`}
              data-cursor-text="BOOK"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Reserve</span>
            </a>
          </nav>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`flex items-center justify-center rounded-full p-2.5 transition-colors md:hidden ${
              scrolled
                ? "text-warm-brown hover:bg-cream"
                : "text-warm-white hover:bg-warm-white/15"
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 flex flex-col justify-between bg-warm-white/95 px-8 pt-32 pb-12 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-6">
              <span className="text-xs uppercase tracking-[0.3em] text-warm-brown/40">
                Menu Directory
              </span>
              {NAV_ITEMS.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="font-display text-4xl text-warm-brown hover:text-italian-red transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="border-t border-warm-brown/15 pt-8">
              <div className="flex items-center justify-between text-xs text-warm-brown/70">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  07:00 – 20:00 Daily
                </span>
                <span>Milano & Firenze</span>
              </div>
              <a
                href="#visit"
                onClick={(e) => handleNavClick(e, "#visit")}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-italian-red py-4 text-xs uppercase tracking-[0.25em] text-warm-white shadow-lg"
              >
                Plan Your Visit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
