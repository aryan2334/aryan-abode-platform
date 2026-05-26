"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Calculator, DollarSign } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const appreciationData = [
  { year: "2024", price: 4200, event: "Pre-launch entry" },
  { year: "2025", price: 5100, event: "Construction milestone" },
  { year: "2026", price: 6500, event: "Airport opens" },
  { year: "2027", price: 7800, event: "IT Hub expansion" },
  { year: "2028", price: 9200, event: "Metro connectivity" },
  { year: "2029", price: 11400, event: "Smart City status" },
  { year: "2030", price: 14000, event: "Full corridor maturity" },
];

const maxPrice = 14000;

function useAnimatedValue(target: number, duration = 600) {
  const [val, setVal] = useState(0);
  const prevTarget = useRef(0);
  useEffect(() => {
    const start = prevTarget.current;
    const diff = target - start;
    const startTime = performance.now();
    const frame = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(start + diff * eased));
      if (t < 1) requestAnimationFrame(frame);
      else prevTarget.current = target;
    };
    requestAnimationFrame(frame);
  }, [target, duration]);
  return val;
}

export function InvestmentPanel() {
  const [investment, setInvestment] = useState(55);
  const [years, setYears] = useState(6);
  const [paymentPlan, setPaymentPlan] = useState<"10:90" | "30:70" | "50:50">("30:70");
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const displayedData = appreciationData.slice(0, years + 1);
  const entryPrice = appreciationData[0].price;
  const exitPrice = appreciationData[Math.min(years, appreciationData.length - 1)].price;
  const appreciationRatio = exitPrice / entryPrice;
  const projectedValue = Math.round(investment * appreciationRatio);
  const profit = projectedValue - investment;
  const cagr = ((Math.pow(appreciationRatio, 1 / years) - 1) * 100).toFixed(1);

  const animatedProfit = useAnimatedValue(profit);
  const animatedValue = useAnimatedValue(projectedValue);
  const animatedRatio = useAnimatedValue(Math.round(appreciationRatio * 10)) / 10;

  return (
    <div className="h-full min-h-screen grid lg:grid-cols-[340px_1fr]">
      {/* ── Left: Calculator ── */}
      <div className="border-r border-white/5 flex flex-col overflow-y-auto">
        <div className="px-6 pt-8 pb-5 border-b border-white/5">
          <p className="text-[#c9a84c] text-[10px] tracking-[0.35em] uppercase mb-1">ROI Calculator</p>
          <h2 className="text-[#f0f0f4] text-xl font-light">Investment Projector</h2>
        </div>

        <div className="px-5 py-6 space-y-8 flex-1">
          {/* Investment amount */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[#5c5c6e] text-[10px] tracking-[0.3em] uppercase">Investment Amount</p>
              <p className="text-[#c9a84c] text-sm font-light">₹{investment}L</p>
            </div>
            <input
              type="range"
              min={45}
              max={90}
              step={5}
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #c9a84c ${((investment - 45) / 45) * 100}%, rgba(255,255,255,0.08) ${((investment - 45) / 45) * 100}%)`,
              }}
            />
            <div className="flex justify-between mt-1.5 text-[#3a3a4a] text-[9px]">
              <span>₹45L</span><span>₹90L</span>
            </div>
          </div>

          {/* Hold period */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[#5c5c6e] text-[10px] tracking-[0.3em] uppercase">Hold Period</p>
              <p className="text-[#c9a84c] text-sm font-light">{years} years</p>
            </div>
            <input
              type="range"
              min={1}
              max={6}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #c9a84c ${((years - 1) / 5) * 100}%, rgba(255,255,255,0.08) ${((years - 1) / 5) * 100}%)`,
              }}
            />
            <div className="flex justify-between mt-1.5 text-[#3a3a4a] text-[9px]">
              <span>1yr</span><span>6yr</span>
            </div>
          </div>

          {/* Payment plan */}
          <div>
            <p className="text-[#5c5c6e] text-[10px] tracking-[0.3em] uppercase mb-3">Payment Plan</p>
            <div className="space-y-2">
              {(["10:90", "30:70", "50:50"] as const).map((plan) => (
                <motion.button
                  key={plan}
                  onClick={() => setPaymentPlan(plan)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-light"
                  style={
                    paymentPlan === plan
                      ? { background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#f0f0f4" }
                      : { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", color: "#5c5c6e" }
                  }
                  whileHover={{ x: 2 }}
                >
                  <span>{plan} Plan</span>
                  <span className="text-xs text-[#5c5c6e]">{plan === "10:90" ? "Book with 10%" : plan === "30:70" ? "Bank linked" : "Own funds"}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Result card */}
        <div className="mx-4 mb-5 p-5 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.04))", border: "1px solid rgba(201,168,76,0.2)" }}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-[#5c5c6e] text-[9px] uppercase tracking-widest mb-1">Projected Value</p>
              <p className="text-xl font-light" style={{ background: "linear-gradient(135deg, #c9a84c, #e8c97d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                ₹{animatedValue}L
              </p>
            </div>
            <div>
              <p className="text-[#5c5c6e] text-[9px] uppercase tracking-widest mb-1">Net Profit</p>
              <p className="text-xl font-light text-emerald-400">+₹{animatedProfit}L</p>
            </div>
            <div>
              <p className="text-[#5c5c6e] text-[9px] uppercase tracking-widest mb-1">Appreciation</p>
              <p className="text-xl font-light text-[#f0f0f4]">{animatedRatio}×</p>
            </div>
            <div>
              <p className="text-[#5c5c6e] text-[9px] uppercase tracking-widest mb-1">CAGR</p>
              <p className="text-xl font-light text-[#f0f0f4]">{cagr}%</p>
            </div>
          </div>
          <div className="h-px bg-[#c9a84c]/10 my-3" />
          <p className="text-[#5c5c6e] text-[9px] leading-relaxed">
            Projections based on confirmed infrastructure pipeline. Not a guarantee.
          </p>
        </div>
      </div>

      {/* ── Right: Chart ── */}
      <div className="flex flex-col p-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={14} className="text-[#c9a84c]" />
            <p className="text-[#f0f0f4] font-light">Price Appreciation Chart</p>
          </div>
          <p className="text-[#5c5c6e] text-xs font-light">Per sq.ft value — Bheemunipatnam corridor</p>
        </div>

        {/* Chart area */}
        <div className="flex-1 relative min-h-[280px]">
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)" }}
          >
            {/* Grid lines */}
            {[0.25, 0.5, 0.75, 1].map((r) => (
              <div key={r} className="absolute left-12 right-4" style={{ bottom: `${r * 78 + 10}%`, borderTop: "1px dashed rgba(255,255,255,0.04)" }}>
                <span className="absolute right-full pr-2 -translate-y-1/2 text-[9px] text-[#3a3a4a]">
                  ₹{Math.round(maxPrice * r / 1000)}k
                </span>
              </div>
            ))}

            {/* Bars + line */}
            <div className="absolute inset-4 left-12 flex items-end gap-2">
              {displayedData.map((d, i) => {
                const h = (d.price / maxPrice) * 100;
                const isHovered = hoveredYear === i;
                const isPast = i === 0;
                return (
                  <motion.div
                    key={d.year}
                    className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
                    onMouseEnter={() => setHoveredYear(i)}
                    onMouseLeave={() => setHoveredYear(null)}
                  >
                    {/* Tooltip */}
                    {isHovered && (
                      <motion.div
                        className="absolute bottom-full mb-2 px-3 py-2 rounded-xl border border-[#c9a84c]/25 bg-[#0a0a12]/95 backdrop-blur-sm text-center z-10 whitespace-nowrap"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <p className="text-[#c9a84c] text-xs font-semibold">₹{d.price.toLocaleString()}/sq.ft</p>
                        <p className="text-[#5c5c6e] text-[10px]">{d.event}</p>
                      </motion.div>
                    )}

                    <motion.div
                      className="w-full rounded-t-lg relative overflow-hidden"
                      style={{
                        height: `${h}%`,
                        background: isPast
                          ? "linear-gradient(to top, #c9a84c, #7a6230)"
                          : isHovered
                          ? `linear-gradient(to top, rgba(201,168,76,0.4), rgba(201,168,76,0.15))`
                          : `linear-gradient(to top, rgba(201,168,76,${0.15 - i * 0.01}), rgba(201,168,76,0.06))`,
                        border: isHovered || isPast ? "1px solid rgba(201,168,76,0.4)" : "1px solid rgba(201,168,76,0.08)",
                        transition: "all 0.2s ease",
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.8, delay: i * 0.08, ease }}
                    >
                      {(isPast || isHovered) && (
                        <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.4), transparent)" }} />
                      )}
                    </motion.div>
                    <span className="text-[9px] text-[#5c5c6e] mt-1">{d.year}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Milestone events */}
        <div className="mt-6 flex flex-wrap gap-3">
          {displayedData.map((d, i) => (
            <div key={d.year} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: i === 0 ? "#c9a84c" : "rgba(201,168,76,0.3)" }} />
              <span className="text-[10px] text-[#5c5c6e]">{d.year}: {d.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
