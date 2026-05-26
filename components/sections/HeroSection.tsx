"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById("overview");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050508]"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-40" />

      {/* Mouse-reactive ambient light */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 80% 60% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(201,168,76,0.06) 0%, transparent 70%)`,
        }}
      />

      {/* Static ambient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(120,100,220,0.05) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Scrolling content with parallax */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto"
      >
        {/* Eyebrow badge */}
        <motion.div
          className="glass-gold inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          <Sparkles size={12} className="text-[#c9a84c]" />
          <span className="text-[#c9a84c] text-xs font-semibold tracking-[0.3em] uppercase">
            Visakhapatnam&apos;s Future Address
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="text-[clamp(3.5rem,12vw,10rem)] font-extralight tracking-[0.15em] uppercase text-[#f0f0f4] leading-[0.9]"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease }}
          >
            Aryan
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            className="text-[clamp(3.5rem,12vw,10rem)] font-extralight tracking-[0.15em] uppercase leading-[0.9]"
            style={{ WebkitTextStroke: "1px rgba(201,168,76,0.6)", color: "transparent" }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.65, ease }}
          >
            Abode
          </motion.h1>
        </div>

        {/* Divider line */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1, ease }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
          <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-light">
            Where the Future Lives
          </span>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-[#a8a8b4] text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-12 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease }}
        >
          Premium residences in Visakhapatnam&apos;s most connected growth corridor—
          engineered for tomorrow, crafted for today.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease }}
        >
          <motion.button
            onClick={() => document.getElementById("residences")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full bg-[#c9a84c] text-[#050508] text-sm font-semibold tracking-[0.2em] uppercase glow-gold hover:bg-[#e8c97d] transition-colors duration-300 min-w-[180px]"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Project
          </motion.button>
          <motion.button
            onClick={() => document.getElementById("ai-concierge")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full glass border border-[#c9a84c]/30 text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase hover:bg-[#c9a84c]/10 transition-all duration-300 min-w-[220px]"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Talk to AI Concierge
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex flex-wrap justify-center gap-x-12 gap-y-4 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6, ease }}
        >
          {[
            { value: "2–3 BHK", label: "Premium Residences" },
            { value: "15 min", label: "To Airport" },
            { value: "RERA", label: "Approved" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-[#c9a84c] text-xl font-light tracking-wider">{stat.value}</p>
              <p className="text-[#5c5c6e] text-xs tracking-[0.2em] uppercase mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#5c5c6e] hover:text-[#c9a84c] transition-colors z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
