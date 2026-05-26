"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Award, MapPin, Clock } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/common/SectionWrapper";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

const milestones = [
  { year: "2024", label: "Pre-launch pricing", value: "₹4,200/sq.ft", active: true },
  { year: "2026", label: "Airport inauguration", value: "Est. ₹6,500/sq.ft", active: false },
  { year: "2028", label: "IT Hub completion", value: "Est. ₹9,000/sq.ft", active: false },
  { year: "2030", label: "Full corridor maturity", value: "Est. ₹14,000/sq.ft", active: false },
];

const investmentStats = [
  {
    icon: TrendingUp,
    value: "3.3×",
    label: "Projected appreciation",
    detail: "By 2030 based on infrastructure pipeline",
  },
  {
    icon: Award,
    value: "RERA",
    label: "Fully Certified",
    detail: "AP RERA Reg. No. AP/01/2024/XXXXX",
  },
  {
    icon: MapPin,
    value: "28 km",
    label: "From Vizag City",
    detail: "30-min drive on NH-16",
  },
  {
    icon: Clock,
    value: "2026",
    label: "Possession Year",
    detail: "On-time delivery guarantee",
  },
];

export function InvestmentStorySection() {
  return (
    <SectionWrapper id="investment" className="py-28 bg-[#050508]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 80%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <SectionHeader
          eyebrow="Investment Story"
          title="Your Wealth, Multiplied"
          subtitle="Aryan Abode isn't just a home — it's a precisely timed entry into one of India's fastest-appreciating real estate corridors."
        />

        {/* Animated numbers strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden mb-12">
          {[
            { target: 50000, prefix: "₹", suffix: " Cr+", label: "Infrastructure pipeline" },
            { target: 330, prefix: "", suffix: "%", label: "Projected appreciation" },
            { target: 28, prefix: "", suffix: " km", label: "Distance to Vizag city" },
            { target: 2026, prefix: "", suffix: "", label: "Possession year" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="bg-[#0a0a12] px-6 py-8 text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              <p className="text-3xl md:text-4xl font-light text-gradient-gold tabular-nums">
                <AnimatedCounter target={item.target} prefix={item.prefix} suffix={item.suffix} />
              </p>
              <p className="text-[#5c5c6e] text-xs tracking-[0.15em] uppercase mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {investmentStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass rounded-2xl p-6 flex flex-col gap-3 group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              whileHover={{ borderColor: "rgba(201,168,76,0.2)", y: -4 }}
            >
              <div className="w-10 h-10 rounded-xl glass-gold flex items-center justify-center">
                <stat.icon size={18} className="text-[#c9a84c]" />
              </div>
              <p className="text-gradient-gold text-3xl font-light">{stat.value}</p>
              <div>
                <p className="text-[#f0f0f4] text-sm font-light">{stat.label}</p>
                <p className="text-[#5c5c6e] text-xs font-light mt-1 leading-relaxed">{stat.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Appreciation timeline */}
        <motion.div
          className="glass-gold rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <h3 className="text-[#f0f0f4] text-xl font-light tracking-tight mb-2">
            Appreciation Trajectory
          </h3>
          <p className="text-[#5c5c6e] text-sm mb-10 font-light">
            Projected per sq.ft. price based on confirmed infrastructure pipeline
          </p>

          <div className="relative">
            {/* Timeline connector line */}
            <div className="absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-[#c9a84c]/40 via-[#c9a84c]/20 to-transparent hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease }}
                >
                  {/* Dot */}
                  <div className="relative flex items-center gap-3 md:block mb-3">
                    <motion.div
                      className={`w-3 h-3 rounded-full border-2 shrink-0 md:mb-4 ${
                        m.active
                          ? "border-[#c9a84c] bg-[#c9a84c]"
                          : "border-[#5c5c6e] bg-transparent"
                      }`}
                      animate={m.active ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="flex flex-col">
                      <span
                        className={`text-xs font-semibold tracking-[0.2em] uppercase ${
                          m.active ? "text-[#c9a84c]" : "text-[#5c5c6e]"
                        }`}
                      >
                        {m.year}
                      </span>
                    </div>
                  </div>
                  <p className={`text-2xl font-light mb-1 ${m.active ? "text-[#e8c97d]" : "text-[#a8a8b4]"}`}>
                    {m.value}
                  </p>
                  <p className="text-[#5c5c6e] text-xs font-light">{m.label}</p>
                  {m.active && (
                    <span className="inline-block mt-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#050508] bg-[#c9a84c] px-2 py-0.5 rounded-full">
                      Enter Now
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chart bars */}
          <div className="mt-10 flex items-end gap-3 h-24">
            {[42, 65, 90, 140].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-lg origin-bottom"
                style={{
                  background: i === 0
                    ? "linear-gradient(to top, #c9a84c, #7a6230)"
                    : `rgba(201,168,76,${0.15 - i * 0.02})`,
                  height: `${h}px`,
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              />
            ))}
          </div>
          <div className="flex gap-3 mt-2 text-[10px] text-[#5c5c6e] text-center">
            {milestones.map((m) => (
              <div key={m.year} className="flex-1">{m.year}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
