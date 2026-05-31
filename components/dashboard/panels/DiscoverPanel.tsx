"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Plane, Server, Waves, MapPin } from "lucide-react";
import type { PanelId } from "@/components/dashboard/DashboardShell";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const BuildingScene = dynamic(
  () => import("@/components/three/BuildingScene").then((m) => m.BuildingScene),
  { ssr: false, loading: () => <div className="w-full h-full bg-transparent" /> }
);

const stats = [
  { value: "₹48L+", label: "Starting price" },
  { value: "2028", label: "Possession" },
  { value: "54", label: "Units for sale" },
  { value: "G+4", label: "Tower height" },
];

const highlights = [
  { icon: Plane, text: "15 min to Bhogapuram Airport" },
  { icon: Server, text: "20 min to Google Data Centre" },
  { icon: Waves, text: "5 min walk to Bheemili Beach" },
];

export function DiscoverPanel({ onNavigate }: { onNavigate?: (id: PanelId) => void }) {
  return (
    <div className="lg:h-full lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-x-hidden">
      {/* Background mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 0% 60%, rgba(224,184,78,0.10) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 100% 30%, rgba(30,180,160,0.07) 0%, transparent 50%)",
        }}
      />

      {/* ── Left: Copy ── */}
      <div className="flex flex-col justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-16 lg:pl-14 lg:pr-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 text-xs tracking-[0.3em] uppercase font-semibold">
              Pre-Launch Open
            </span>
          </div>

          <h1 className="text-[2rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white mb-2">
            Where the
          </h1>
          <h1 className="text-[2rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight mb-6 sm:mb-8">
            <span
              style={{
                background: "linear-gradient(135deg, #f5d060 0%, #ffdf80 40%, #e8c040 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 20px rgba(240,200,64,0.4))",
              }}
            >
              Future Lives
            </span>
          </h1>

          <p className="text-[#c0bcd4] text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-md mb-6 sm:mb-10">
            Premium 2, 2.5 & 3 BHK residences in Visakhapatnam&apos;s fastest-growing corridor
            — positioned at the intersection of sea, technology, and infrastructure.
          </p>

          {/* Highlight pills */}
          <div className="flex flex-col gap-2 sm:gap-2.5 mb-6 sm:mb-10">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(224,184,78,0.14)", border: "1px solid rgba(224,184,78,0.32)" }}>
                  <h.icon size={13} className="text-[#f0c84a]" />
                </div>
                <span className="text-[#c8c4dc] text-xs sm:text-sm font-light leading-snug">{h.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3">
            <motion.button
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-[0.12em] uppercase"
              style={{ background: "linear-gradient(135deg, #e0b84e, #f5d060)", color: "#08080f", boxShadow: "0 4px 24px rgba(224,184,78,0.50), 0 0 40px rgba(224,184,78,0.18)" }}
              whileHover={{ scale: 1.04, boxShadow: "0 4px 32px rgba(224,184,78,0.70), 0 0 60px rgba(224,184,78,0.25)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate?.("residences")}
            >
              <Sparkles size={14} />
              Explore Residences
            </motion.button>
            <motion.button
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border text-xs sm:text-sm font-light tracking-wider transition-all"
              style={{ borderColor: "rgba(224,184,78,0.4)", color: "#f0c84a" }}
              whileHover={{ scale: 1.04, borderColor: "rgba(224,184,78,0.7)", background: "rgba(224,184,78,0.06)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate?.("location")}
            >
              <MapPin size={13} /> Location Map <ArrowRight size={12} />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-3 mt-8 sm:mt-14 pt-6 sm:pt-8 border-t border-white/20"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease }}
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center px-1">
              <p className="text-lg sm:text-xl md:text-2xl font-light"
                style={{
                  background: "linear-gradient(135deg, #f0c84a, #f5e080)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </p>
              <p className="text-[#9090b8] text-[10px] tracking-[0.15em] uppercase mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Right: 3D Building ── */}
      <div className="relative h-[40vh] min-h-[220px] max-h-[320px] sm:h-[44vh] sm:max-h-[380px] lg:h-full lg:min-h-0 lg:max-h-none shrink-0">
        {/* Ambient glow behind model */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 55%, rgba(224,184,78,0.16) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(20,200,170,0.08) 0%, transparent 50%)",
          }}
        />

        {/* Label overlay */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none w-[calc(100%-2rem)] max-w-xs sm:max-w-none sm:w-auto">
          <div className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f0c84a] animate-pulse shrink-0" />
            <span className="text-[#b0b8d8] text-[9px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.2em] uppercase text-center leading-tight">
              <span className="sm:hidden">3D Model · Drag to explore</span>
              <span className="hidden sm:inline">Interactive 3D Model · Drag to Explore</span>
            </span>
          </div>
        </div>

        {/* RERA badge */}
        <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 pointer-events-none">
          <div className="px-3 py-1.5 rounded-full" style={{ border: "1px solid rgba(240,200,64,0.50)", background: "rgba(240,200,64,0.16)", boxShadow: "0 0 12px rgba(240,200,64,0.15)" }}>
            <span className="text-[#f0c84a] text-[10px] font-bold tracking-[0.25em] uppercase">
              RERA Certified
            </span>
          </div>
        </div>

        <BuildingScene />
      </div>
    </div>
  );
}
