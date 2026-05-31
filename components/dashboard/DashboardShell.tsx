"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Building2,
  MapPin,
  CalendarDays,
  ChevronRight,
} from "lucide-react";
import { DiscoverPanel } from "./panels/DiscoverPanel";
import { ResidencesPanel } from "./panels/ResidencesPanel";
import { LocationPanel } from "./panels/LocationPanel";
import { BookingPanel } from "./panels/BookingPanel";

export type PanelId = "discover" | "residences" | "location" | "book";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const navItems = [
  { id: "discover", icon: Compass, label: "Discover", sub: "Overview" },
  { id: "residences", icon: Building2, label: "Residences", sub: "Floor Plans" },
  { id: "location", icon: MapPin, label: "Location", sub: "Growth Map" },
  { id: "book", icon: CalendarDays, label: "Book Visit", sub: "Schedule" },
];


export function DashboardShell() {
  const [active, setActive] = useState<PanelId>("discover");
  const navigate = (id: PanelId) => setActive(id);

  const panels: Record<PanelId, React.ReactNode> = {
    discover: <DiscoverPanel onNavigate={navigate} />,
    residences: <ResidencesPanel onNavigate={navigate} />,
    location: <LocationPanel />,
    book: <BookingPanel />,
  };

  return (
    <div className="flex h-[100dvh] w-full max-w-[100vw] overflow-hidden text-[#f4f4f8]" style={{ background: "#04040e" }}>
      {/* ── Desktop Sidebar ── */}
      <motion.aside
        className="hidden lg:flex flex-col w-[220px] shrink-0 border-r border-white/15 relative z-20"
        style={{ background: "linear-gradient(180deg, #111124 0%, #0c0c1c 60%, #090912 100%)" }}
        initial={{ x: -220, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
      >
        {/* Logo */}
        <div className="px-6 py-7 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(224,184,78,0.18)", border: "1.5px solid rgba(224,184,78,0.65)", boxShadow: "0 0 18px rgba(224,184,78,0.4), 0 0 40px rgba(224,184,78,0.15)" }}>
              <span className="text-[#f0c84a] text-[10px] font-bold tracking-widest">AA</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium tracking-[0.15em] uppercase leading-none">
                Aryan Abode
              </p>
              <p className="text-[#9090b8] text-[10px] tracking-wider mt-0.5">Premium · G+4 · 54 Units</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 pt-4 flex-1">
          {navItems.map((item, i) => {
            const isActive = active === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActive(item.id as PanelId)}
                className={`relative flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group ${
                  isActive ? "border" : "hover:bg-white/[0.06] border border-transparent"
                }`}
                style={isActive ? { background: "rgba(224,184,78,0.18)", borderColor: "rgba(224,184,78,0.35)", boxShadow: "0 0 20px rgba(224,184,78,0.12), inset 0 0 20px rgba(224,184,78,0.04)" } : {}}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease }}
              >
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#d4aa50] rounded-full"
                    layoutId="sidebar-indicator"
                  />
                )}
                <item.icon
                  size={16}
                  className={`shrink-0 transition-colors ${
                    isActive ? "text-[#f0c84a]" : "text-[#7070a0] group-hover:text-[#b0b0cc]"
                  }`}
                />
                <div>
                  <p
                    className={`text-xs font-medium leading-none ${
                      isActive ? "text-[#f0c84a]" : "text-[#b8b8d0]"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className={`text-[10px] mt-0.5 ${isActive ? "text-[#b0903a]" : "text-[#606082]"}`}>{item.sub}</p>
                </div>
                {isActive && (
                  <ChevronRight size={12} className="ml-auto text-[#d4aa50]/60" />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Bottom CTA */}
        <div className="px-4 pb-6 pt-4 border-t border-white/10">
          <motion.button
            onClick={() => setActive("book")}
            className="w-full py-2.5 rounded-xl text-xs font-bold tracking-[0.15em] uppercase"
            style={{ background: "linear-gradient(135deg, #e0b84e, #f5d060)", color: "#050508", boxShadow: "0 4px 20px rgba(224,184,78,0.45), 0 0 40px rgba(224,184,78,0.15)" }}
            whileHover={{ scale: 1.03, boxShadow: "0 4px 28px rgba(224,184,78,0.65), 0 0 50px rgba(224,184,78,0.2)" }}
            whileTap={{ scale: 0.97 }}
          >
            Book a Site Visit
          </motion.button>
          <p className="text-[#7888a8] text-[10px] text-center mt-3">
            Pre-launch · Limited units
          </p>
        </div>
      </motion.aside>

      {/* ── Main Panel ── */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0d0d1a] z-20 relative shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(212,170,80,0.15)", border: "1px solid rgba(212,170,80,0.4)" }}>
              <span className="text-[#d4aa50] text-[9px] font-bold">AA</span>
            </div>
            <div className="min-w-0">
              <span className="text-white text-sm font-medium tracking-wider block truncate">Aryan Abode</span>
              <span className="text-[#7888a8] text-[10px] block truncate">Premium · G+4 · 54 Units</span>
            </div>
          </div>
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-contain [-webkit-overflow-scrolling:touch]"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.4, ease }}
            >
              {panels[active]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile bottom nav */}
        <nav
          className="lg:hidden flex items-stretch border-t border-white/10 bg-[#0d0d1a] shrink-0 pb-[env(safe-area-inset-bottom)]"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id as PanelId)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[52px] py-2 px-1 transition-colors ${
                active === item.id ? "text-[#f0c84a]" : "text-[#7888a8]"
              }`}
            >
              <item.icon size={20} strokeWidth={active === item.id ? 2.25 : 1.75} />
              <span className="text-[10px] tracking-wide leading-none">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
