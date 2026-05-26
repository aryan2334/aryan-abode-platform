"use client";

import { motion } from "framer-motion";
import { Plane, Server, Building2, Waves, Route, GraduationCap, Heart } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/common/SectionWrapper";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const locations = [
  {
    icon: Plane,
    name: "Bhogapuram International Airport",
    status: "Under Construction",
    distance: "15 min drive",
    description:
      "Andhra Pradesh's upcoming international airport — a catalyst for exponential property appreciation in the entire corridor.",
    highlight: true,
  },
  {
    icon: Server,
    name: "Google Data Centre",
    status: "Operational",
    distance: "20 min drive",
    description:
      "Google's massive data infrastructure investment signals the region's emergence as a global tech destination.",
    highlight: false,
  },
  {
    icon: Building2,
    name: "Rushikonda IT Hub",
    status: "Expanding",
    distance: "25 min drive",
    description:
      "A growing technology park attracting top-tier companies and creating thousands of high-income jobs.",
    highlight: false,
  },
  {
    icon: Waves,
    name: "Bheemili Beach",
    status: "Pristine",
    distance: "5 min walk",
    description:
      "One of Andhra Pradesh's cleanest beaches — a natural luxury amenity right at your doorstep.",
    highlight: false,
  },
  {
    icon: Route,
    name: "National Highway NH-16",
    status: "Operational",
    distance: "Direct Access",
    description:
      "Seamless connectivity to Visakhapatnam city, Chennai, and beyond via the golden quadrilateral network.",
    highlight: false,
  },
  {
    icon: GraduationCap,
    name: "Educational Institutions",
    status: "Established",
    distance: "10 min drive",
    description:
      "Prestigious schools and colleges ensuring world-class education for your family.",
    highlight: false,
  },
  {
    icon: Heart,
    name: "Hospitals & Healthcare",
    status: "Available",
    distance: "12 min drive",
    description:
      "Multi-specialty hospitals providing comprehensive healthcare with 24/7 emergency services.",
    highlight: false,
  },
];

export function GrowthCorridorSection() {
  return (
    <SectionWrapper id="overview" className="py-28 bg-[#050508]">
      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <SectionHeader
          eyebrow="Strategic Location"
          title="Future Growth Corridor"
          subtitle="Positioned at the intersection of infrastructure, technology, and nature — every major development radiates from your doorstep."
        />

        {/* Featured card — Airport */}
        <motion.div
          className="mb-6 rounded-3xl overflow-hidden relative glass-gold glow-gold"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          whileHover={{ y: -4 }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl glass-gold flex items-center justify-center">
                  <Plane size={22} className="text-[#c9a84c]" />
                </div>
                <div>
                  <span className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase block">
                    {locations[0].status}
                  </span>
                  <span className="text-[#5c5c6e] text-xs">{locations[0].distance}</span>
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-light text-[#f0f0f4] leading-tight mb-4">
                {locations[0].name}
              </h3>
              <p className="text-[#a8a8b4] font-light leading-relaxed">
                {locations[0].description}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-[#c9a84c]/30 to-transparent" />
                <span className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase">
                  #1 Appreciation Driver
                </span>
              </div>
            </div>
            <div className="relative min-h-[240px] md:min-h-0 bg-gradient-to-br from-[#1a1408] to-[#050508] flex items-center justify-center overflow-hidden">
              {/* Runway visualization */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-2 h-full bg-gradient-to-b from-transparent via-[#c9a84c] to-transparent" />
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-2 bg-[#c9a84c] rounded"
                    style={{ top: `${15 + i * 14}%`, left: "50%", translateX: "-50%" }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <Plane size={80} className="text-[#c9a84c]/20" />
              </motion.div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Grid of remaining locations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations.slice(1).map((loc, i) => (
            <motion.div
              key={loc.name}
              className="glass rounded-2xl p-6 group cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07, ease }}
              whileHover={{
                y: -4,
                borderColor: "rgba(201,168,76,0.2)",
                backgroundColor: "rgba(201,168,76,0.03)",
              }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0 group-hover:bg-[#c9a84c]/10 transition-colors">
                  <loc.icon size={18} className="text-[#c9a84c]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[#c9a84c] text-[10px] font-semibold tracking-[0.25em] uppercase">
                      {loc.status}
                    </span>
                    <span className="text-[#5c5c6e] text-[10px] shrink-0">{loc.distance}</span>
                  </div>
                  <h3 className="text-[#f0f0f4] font-light text-base leading-snug mb-2">
                    {loc.name}
                  </h3>
                  <p className="text-[#5c5c6e] text-xs leading-relaxed font-light">
                    {loc.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom summary bar */}
        <motion.div
          className="mt-12 glass-gold rounded-2xl px-8 py-6 flex flex-wrap justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
        >
          {[
            { label: "Growth Drivers", value: "7+" },
            { label: "Km to City", value: "28" },
            { label: "Projected Appreciation", value: "3×" },
            { label: "Infrastructure Projects", value: "₹50,000 Cr+" },
          ].map((item) => (
            <div key={item.label} className="text-center flex-1 min-w-[100px]">
              <p className="text-gradient-gold text-2xl font-light">{item.value}</p>
              <p className="text-[#5c5c6e] text-xs tracking-[0.15em] uppercase mt-1">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
