"use client";

import { motion } from "framer-motion";
import {
  Dumbbell,
  Waves,
  Trees,
  Shield,
  Car,
  Wifi,
  Coffee,
  Users,
  Sun,
  Droplets,
  Zap,
  Wind,
} from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/common/SectionWrapper";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const amenities = [
  { icon: Waves, label: "Infinity Pool", desc: "Horizon-edge pool with sea views", tier: "premium" },
  { icon: Dumbbell, label: "Fitness Studio", desc: "State-of-the-art equipment", tier: "premium" },
  { icon: Trees, label: "Zen Garden", desc: "Curated landscape retreat", tier: "premium" },
  { icon: Shield, label: "24/7 Security", desc: "AI-assisted surveillance", tier: "standard" },
  { icon: Car, label: "Smart Parking", desc: "Sensor-guided parking system", tier: "standard" },
  { icon: Wifi, label: "Fiber Internet", desc: "1 Gbps connectivity", tier: "standard" },
  { icon: Coffee, label: "Sky Lounge", desc: "Rooftop social space", tier: "premium" },
  { icon: Users, label: "Clubhouse", desc: "5000 sq.ft community hub", tier: "premium" },
  { icon: Sun, label: "Solar Power", desc: "40% renewable energy", tier: "standard" },
  { icon: Droplets, label: "Water Harvesting", desc: "Rainwater recycling system", tier: "standard" },
  { icon: Zap, label: "EV Charging", desc: "For every parking bay", tier: "standard" },
  { icon: Wind, label: "Cross Ventilation", desc: "Designed for sea breeze", tier: "standard" },
];

const premiumAmenities = amenities.filter((a) => a.tier === "premium");
const standardAmenities = amenities.filter((a) => a.tier === "standard");

export function AmenitiesSection() {
  return (
    <SectionWrapper id="amenities" className="py-28 bg-[#050508]">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(120,100,200,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <SectionHeader
          eyebrow="Amenities"
          title="Life Beyond Walls"
          subtitle="Every square foot of common space is designed to elevate your everyday experience."
        />

        {/* Premium amenities — large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {premiumAmenities.map((amenity, i) => (
            <motion.div
              key={amenity.label}
              className="relative rounded-2xl overflow-hidden group cursor-default"
              style={{
                background: "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(5,5,8,0.8) 100%)",
                border: "1px solid rgba(201,168,76,0.12)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              whileHover={{
                borderColor: "rgba(201,168,76,0.3)",
                y: -4,
                transition: { duration: 0.25 },
              }}
            >
              <div className="p-7">
                <motion.div
                  className="w-12 h-12 rounded-2xl glass-gold flex items-center justify-center mb-5"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <amenity.icon size={22} className="text-[#c9a84c]" />
                </motion.div>
                <h3 className="text-[#f0f0f4] font-light text-lg mb-1.5">{amenity.label}</h3>
                <p className="text-[#5c5c6e] text-xs font-light leading-relaxed">{amenity.desc}</p>
                <div className="mt-4">
                  <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#c9a84c] border border-[#c9a84c]/30 px-2.5 py-1 rounded-full">
                    Premium
                  </span>
                </div>
              </div>
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.08) 0%, transparent 70%)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Standard amenities — compact row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {standardAmenities.map((amenity, i) => (
            <motion.div
              key={amenity.label}
              className="glass rounded-xl p-4 flex flex-col items-center text-center gap-2 group cursor-default"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05, ease }}
              whileHover={{
                borderColor: "rgba(201,168,76,0.2)",
                y: -2,
                transition: { duration: 0.2 },
              }}
            >
              <div className="w-9 h-9 rounded-xl glass flex items-center justify-center group-hover:bg-[#c9a84c]/10 transition-colors">
                <amenity.icon size={15} className="text-[#a8a8b4] group-hover:text-[#c9a84c] transition-colors" />
              </div>
              <p className="text-[#a8a8b4] text-xs font-light leading-tight">{amenity.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Total count badge */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="glass-gold px-8 py-4 rounded-full flex items-center gap-4">
            <span className="text-gradient-gold text-3xl font-light">30+</span>
            <div>
              <p className="text-[#f0f0f4] text-sm font-light">World-class amenities</p>
              <p className="text-[#5c5c6e] text-xs">Across {">"}2 acres of curated spaces</p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
