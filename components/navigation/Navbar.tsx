"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Clock, Calendar, Sparkles } from "lucide-react";

const NAV_ITEMS = [
  { label: "Heritage", href: "#story" },
  { label: "Facilities", href: "#facilities" },
  { label: "Rooms & Suites", href: "#rooms" },
  { label: "Dining", href: "#dining" },
  { label: "Atmosphere", href: "#atmosphere" },
  { label: "Reserve", href: "#visit" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

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
      <header className="fixed top-0 left-0 right-0 z-40 py-3 sm:py-4 px-4 sm:px-8 transition-all duration-300">
        <div
          className={`mx-auto max-w-6xl flex items-center justify-between rounded-full border transition-all duration-300 px-5 py-2.5 shadow-md ${
            scrolled
              ? "bg-[#160f0b]/90 border-white/15 backdrop-blur-xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.5)]"
              : "bg-black/40 border-white/10 backdrop-blur-md"
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "body")}
            className="group flex items-center gap-2.5 transition-opacity"
            data-cursor-text="TOP"
          >
            <span className="font-display text-base sm:text-lg tracking-[0.25em] font-semibold text-warm-white group-hover:text-gold transition-colors">
              BR VASANTHAM
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/30 px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-gold font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Tamil Nadu
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-7 md:flex">
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-200 hover:text-gold ${
                        isActive ? "text-gold font-semibold" : "text-warm-white/80"
                      }`}
                      data-cursor-text="VIEW"
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <a
              href="#visit"
              onClick={(e) => handleNavClick(e, "#visit")}
              className="flex items-center gap-2 rounded-full bg-italian-red hover:bg-[#b5372e] px-4 py-2 text-xs uppercase tracking-[0.18em] font-semibold text-warm-white shadow-md transition-all hover:scale-105 active:scale-95"
              data-cursor-text="BOOK"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Book Stay</span>
            </a>
          </nav>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center rounded-full p-2 text-warm-white hover:bg-white/10 transition-colors md:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 flex flex-col justify-between bg-[#160f0b]/98 px-8 pt-28 pb-10 backdrop-blur-2xl md:hidden text-warm-white"
          >
            <nav className="flex flex-col gap-5">
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold/60 font-medium">
                BR Vasantham Directory
              </span>
              {NAV_ITEMS.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                  className="font-display text-2xl text-warm-white hover:text-gold transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="border-t border-white/15 pt-6">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gold" />
                  24/7 Front Desk &amp; Concierge
                </span>
                <span>Chennai &amp; Madurai</span>
              </div>
              <a
                href="#visit"
                onClick={(e) => handleNavClick(e, "#visit")}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-italian-red py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-warm-white shadow-lg"
              >
                Reserve Your Stay
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
