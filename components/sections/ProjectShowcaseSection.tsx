"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BedDouble, Maximize2, ArrowRight, Check } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/common/SectionWrapper";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const units = [
  {
    type: "2 BHK",
    tag: "Smart Living",
    area: "1,050 – 1,150",
    areaUnit: "sq.ft",
    price: "₹45 L",
    priceSuffix: "onwards",
    bedrooms: 2,
    bathrooms: 2,
    features: ["Open-plan living", "Premium finishes", "Smart home ready", "Private balcony"],
    color: "#a8a8b4",
    accentColor: "rgba(168,168,180,0.15)",
    borderColor: "rgba(168,168,180,0.2)",
    available: 12,
  },
  {
    type: "2.5 BHK",
    tag: "Most Popular",
    area: "1,250 – 1,380",
    areaUnit: "sq.ft",
    price: "₹55 L",
    priceSuffix: "onwards",
    bedrooms: 2,
    bathrooms: 2,
    features: ["Study/flex room", "Expansive balcony", "Modular kitchen", "Double master suite"],
    color: "#c9a84c",
    accentColor: "rgba(201,168,76,0.10)",
    borderColor: "rgba(201,168,76,0.35)",
    available: 8,
    featured: true,
  },
  {
    type: "3 BHK",
    tag: "Prestige",
    area: "1,550 – 1,750",
    areaUnit: "sq.ft",
    price: "₹72 L",
    priceSuffix: "onwards",
    bedrooms: 3,
    bathrooms: 3,
    features: ["Grand living spaces", "Three-sided balcony", "Servant quarters", "Premium elevation"],
    color: "#e8c97d",
    accentColor: "rgba(232,201,125,0.08)",
    borderColor: "rgba(232,201,125,0.25)",
    available: 6,
  },
];

export function ProjectShowcaseSection() {
  const [active, setActive] = useState(1);

  return (
    <SectionWrapper id="residences" className="py-28 bg-[#08080e]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.025) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <SectionHeader
          eyebrow="Residences"
          title="Choose Your Space"
          subtitle="Three unit configurations, each meticulously designed to balance space, luxury, and livability."
        />

        {/* Unit type selector */}
        <div className="flex justify-center gap-2 mb-12">
          {units.map((u, i) => (
            <motion.button
              key={u.type}
              onClick={() => setActive(i)}
              className="px-5 py-2 rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300"
              style={
                active === i
                  ? {
                      background: u.color,
                      color: "#050508",
                    }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#5c5c6e",
                    }
              }
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {u.type}
            </motion.button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {units.map((unit, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={unit.type}
                className="relative rounded-3xl overflow-hidden cursor-pointer"
                style={{
                  background: unit.accentColor,
                  border: `1px solid ${isActive ? unit.borderColor : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isActive
                    ? `0 0 40px ${unit.accentColor}, 0 0 80px ${unit.accentColor}`
                    : "none",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                whileHover={{
                  y: -6,
                  borderColor: unit.borderColor,
                  transition: { duration: 0.3 },
                }}
                onClick={() => setActive(i)}
              >
                {/* Featured badge */}
                {unit.featured && (
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase"
                    style={{ background: unit.color, color: "#050508" }}
                  >
                    {unit.tag}
                  </div>
                )}
                {!unit.featured && (
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase border"
                    style={{ borderColor: unit.borderColor, color: unit.color }}
                  >
                    {unit.tag}
                  </div>
                )}

                {/* Floor plan placeholder */}
                <div
                  className="relative h-52 flex items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${unit.accentColor}, rgba(5,5,8,0.8))`,
                  }}
                >
                  {/* Architectural grid lines */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-10"
                    viewBox="0 0 200 200"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <rect x="30" y="30" width="140" height="140" fill="none" stroke={unit.color} strokeWidth="0.5" />
                    <rect x="30" y="30" width="85" height="90" fill="none" stroke={unit.color} strokeWidth="0.5" />
                    <rect x="30" y="120" width="55" height="50" fill="none" stroke={unit.color} strokeWidth="0.5" />
                    <rect x="85" y="30" width="85" height="60" fill="none" stroke={unit.color} strokeWidth="0.5" />
                    <rect x="115" y="90" width="55" height="80" fill="none" stroke={unit.color} strokeWidth="0.5" />
                    <line x1="85" y1="90" x2="170" y2="90" stroke={unit.color} strokeWidth="0.5" />
                    <line x1="85" y1="30" x2="85" y2="120" stroke={unit.color} strokeWidth="0.5" />
                    <line x1="115" y1="90" x2="115" y2="170" stroke={unit.color} strokeWidth="0.5" />
                    <line x1="30" y1="120" x2="115" y2="120" stroke={unit.color} strokeWidth="0.5" />
                  </svg>
                  <motion.div
                    className="relative z-10 text-center"
                    animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <BedDouble size={36} style={{ color: unit.color, opacity: 0.5, margin: "0 auto" }} />
                  </motion.div>
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse at center, ${unit.accentColor} 0%, transparent 70%)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3
                        className="text-3xl font-light tracking-tight"
                        style={{ color: unit.color }}
                      >
                        {unit.type}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-[#5c5c6e] text-xs">
                        <Maximize2 size={11} />
                        <span>{unit.area} {unit.areaUnit}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#f0f0f4] text-lg font-light">{unit.price}</p>
                      <p className="text-[#5c5c6e] text-[10px] tracking-wider uppercase">{unit.priceSuffix}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {unit.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-[#a8a8b4] text-xs font-light">
                        <Check size={11} style={{ color: unit.color, flexShrink: 0 }} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Availability */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-[#5c5c6e] text-xs">
                      <span style={{ color: unit.color }} className="font-semibold">{unit.available}</span> units available
                    </span>
                    <motion.button
                      className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase"
                      style={{ color: unit.color }}
                      whileHover={{ x: 3 }}
                    >
                      View Floor Plan <ArrowRight size={12} />
                    </motion.button>
                  </div>
                </div>

                {/* Active indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: `linear-gradient(90deg, transparent, ${unit.color}, transparent)` }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA row */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
        >
          <p className="text-[#5c5c6e] text-sm mb-5">
            Not sure which unit is right for you?
          </p>
          <motion.button
            className="px-8 py-3 rounded-full glass border border-[#c9a84c]/30 text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase hover:bg-[#c9a84c]/10 transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Talk to Our AI Concierge
          </motion.button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
