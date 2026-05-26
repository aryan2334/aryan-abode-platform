"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Investment", href: "#investment" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "glass-dark py-3" : "py-5"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 rounded-full border border-[#c9a84c]/40 flex items-center justify-center">
              <span className="text-[#c9a84c] text-xs font-bold tracking-widest">AA</span>
            </div>
            <span className="text-[#f0f0f4] font-light tracking-[0.2em] text-sm uppercase hidden sm:block">
              Aryan Abode
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-[#a8a8b4] hover:text-[#f0f0f4] text-sm font-light tracking-wider transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              onClick={() => handleNavClick("#site-visit")}
              className="px-5 py-2 rounded-full text-xs font-semibold tracking-[0.15em] uppercase border border-[#c9a84c]/50 text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Schedule Visit
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#a8a8b4] hover:text-[#f0f0f4] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 glass-dark flex flex-col pt-24 px-8 pb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-6 mt-4">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-2xl font-light text-[#f0f0f4] tracking-wide border-b border-[#ffffff]/05 pb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => handleNavClick("#site-visit")}
                className="mt-4 w-full py-3 rounded-full border border-[#c9a84c]/50 text-[#c9a84c] text-sm font-semibold tracking-[0.15em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Schedule Visit
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
