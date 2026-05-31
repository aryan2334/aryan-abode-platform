"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Server, Building2, Waves, Route, GraduationCap, Heart, MapPin } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── NH-16 corridor — runs N-S on the WEST side of the project.
   Passes through NH marker at (197,298). Project at (248,283) is
   ~50px east (< 1 km). Continues NNE toward airport area.         ── */
const NH16 = "M 142,560 C 152,500 164,458 175,410 C 183,374 192,336 197,298 C 201,268 208,238 220,206 C 233,170 252,135 278,92";

/* ── Coastline — Bay of Bengal, runs full height on east side ── */
const COAST = "M 388,0 C 384,52 392,108 386,160 C 380,208 372,244 368,278 C 364,296 358,308 356,328 C 352,358 350,394 346,432 C 342,466 338,498 334,560";

/* mx/my = absolute SVG position on viewBox 0 0 500 560; project at (248,283)
   Distances from official brochure + Google Maps verification.
   Airport NNE 15km · Google DC WNW 14km · IT SEZ SSW 20km
   Beach E 4km · NH-16 W <1km · Education NW 3km · NRI Hospital NW 2km  */
const landmarks = [
  {
    id: "airport", icon: Plane,
    label: "GMR Alluri Sitarama Raju International Airport", short: "Airport",
    sub: "Under Construction · Bhogapuram", time: "25 min drive", km: "15 km",
    mx: 295, my: 168, color: "#f0c84a", impact: "High",
    desc: "AP's new GMR-built greenfield airport at Bhogapuram — just 15 km away. Its opening will directly catalyse price appreciation along this entire coastal corridor.",
  },
  {
    id: "beach", icon: Waves,
    label: "Bheemili Beach", short: "Beach",
    sub: "Pristine · Blue Flag Rated", time: "8 min drive", km: "4 km",
    mx: 358, my: 278, color: "#38d8e8", impact: "Lifestyle",
    desc: "One of Andhra Pradesh's cleanest beaches just 4 km away. A short drive delivers uninterrupted sea views, clean sands, and a fresh coastal breeze.",
  },
  {
    id: "highway", icon: Route,
    label: "NH-16 National Highway", short: "NH-16",
    sub: "6-Lane · < 1 km Access", time: "2 min drive", km: "< 1 km",
    mx: 197, my: 298, color: "#c8c8e0", impact: "Connectivity",
    desc: "India's Eastern freight and passenger spine (Chennai–Kolkata) is less than 1 km from the site. Direct on-ramp access puts you in Vizag city in under 25 minutes.",
  },
  {
    id: "itpark", icon: Building2,
    label: "Rushikonda IT SEZ", short: "IT SEZ",
    sub: "Active · VSEZ Phase II", time: "36 min drive", km: "20 km",
    mx: 210, my: 390, color: "#a070f0", impact: "High",
    desc: "Visakhapatnam's premier IT corridor with VSEZ, major tech campuses, and 50,000+ IT professionals — the strongest driver of residential rental demand.",
  },
  {
    id: "edu", icon: GraduationCap,
    label: "ANITS College · Oakridge School", short: "Education",
    sub: "ANITS · Oakridge · SASI", time: "6 min drive", km: "3 km",
    mx: 232, my: 248, color: "#f09440", impact: "Lifestyle",
    desc: "ANITS College and Oakridge School are within 3 km. SASI Educational Campus, Narayana Colleges, and Tirumala College are all clustered along the NH-16 corridor.",
  },
  {
    id: "health", icon: Heart,
    label: "NRI Hospital & Vizag Hospitals", short: "Hospitals",
    sub: "NRI Hospital · KGH · Apollo", time: "4 min drive", km: "2 km",
    mx: 215, my: 266, color: "#ff7070", impact: "Essential",
    desc: "NRI Multi-Specialty Hospital is just 2 km from the site, visible on the access road. King George Hospital, Care Hospital, and Apollo are 25 km away in Vizag city.",
  },
  {
    id: "google", icon: Server,
    label: "Google Data Centre", short: "Google DC",
    sub: "Planned · Tarluvada SEZ", time: "38 min drive", km: "14 km",
    mx: 160, my: 265, color: "#4da8ff", impact: "High",
    desc: "Google's planned data centre in the Tarluvada SEZ, just 14 km inland. A direct magnet for global tech investment and high-income professionals in this region.",
  },
];

export function LocationPanel() {
  const [active, setActive] = useState("airport");
  const activeLm = landmarks.find((l) => l.id === active)!;

  const projX = 248, projY = 283;

  return (
    <div className="flex flex-col lg:flex-row lg:h-full lg:min-h-screen bg-[#07070e]">

      {/* ══════════════════ MAP ══════════════════ */}
      <div className="relative w-full shrink-0 h-[min(62vh,560px)] min-h-[380px] lg:flex-1 lg:min-h-0 lg:h-auto overflow-hidden">

        {/* Fine grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(212,170,80,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(212,170,80,0.022) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }} />

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 80% at 44% 50%, transparent 50%, rgba(7,7,14,0.75) 100%)",
        }} />

        <svg
          className="absolute inset-0 w-full h-full touch-none"
          viewBox="0 0 500 560"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Growth corridor map"
        >
          <defs>
            <linearGradient id="seaFill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#071420" stopOpacity="0" />
              <stop offset="100%" stopColor="#071420" stopOpacity="0.9" />
            </linearGradient>
            <radialGradient id="projGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d4aa50" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#d4aa50" stopOpacity="0" />
            </radialGradient>
            {landmarks.map((lm) => (
              <radialGradient key={lm.id} id={`lg-${lm.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={lm.color} stopOpacity="0.38" />
                <stop offset="100%" stopColor={lm.color} stopOpacity="0" />
              </radialGradient>
            ))}
            <clipPath id="mc"><rect x="0" y="0" width="500" height="560" /></clipPath>
          </defs>

          <g clipPath="url(#mc)">

            {/* ── Sea fill east of coastline ── */}
            <path d={`${COAST} L 500,560 L 500,0 Z`} fill="url(#seaFill)" />

            {/* ── Distance rings (subtle, centered on project) ── */}
            {[75, 152, 230].map((r, i) => (
              <motion.circle key={r} cx={projX} cy={projY} r={r} fill="none"
                stroke={i === 0 ? "rgba(56,216,232,0.09)" : "rgba(255,255,255,0.04)"}
                strokeWidth="0.8" strokeDasharray="3 9"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.9, ease }}
              />
            ))}
            {/* Ring labels */}
            {[{ r: 75, label: "10 km" }, { r: 152, label: "25 km" }, { r: 230, label: "50 km" }].map(({ r, label }) => (
              <text key={label} x={projX + r - 2} y={projY - 5} textAnchor="end"
                fill="rgba(255,255,255,0.16)" fontSize="6" fontFamily="var(--font-geist-sans)">{label}</text>
            ))}

            {/* ══ NH-16 CORRIDOR ══ */}
            {/* Outer atmospheric glow */}
            <path d={NH16} fill="none" stroke="rgba(200,210,255,0.06)" strokeWidth="20" strokeLinecap="round" />
            {/* Road body */}
            <path d={NH16} fill="none" stroke="rgba(200,210,255,0.14)" strokeWidth="6" strokeLinecap="round" />
            {/* Edge lines */}
            <path d={NH16} fill="none" stroke="rgba(200,210,255,0.3)" strokeWidth="1.2" strokeLinecap="round" />
            {/* Animated traffic flow */}
            <motion.path d={NH16} fill="none"
              stroke="rgba(220,230,255,0.5)" strokeWidth="1.5" strokeLinecap="round"
              strokeDasharray="14 22"
              animate={{ strokeDashoffset: [0, -144] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            />
            {/* NH-16 label */}
            <text x="70" y="450" fill="rgba(200,210,255,0.35)" fontSize="7.5"
              fontFamily="var(--font-geist-sans)" fontWeight="500" letterSpacing="0.1em"
              transform="rotate(-36,70,450)">NH-16</text>

            {/* ══ COASTLINE ══ */}
            {/* Sea glow behind coast */}
            <path d={COAST} fill="none" stroke="rgba(56,216,232,0.08)" strokeWidth="14" strokeLinecap="round" />
            {/* Main coast stroke — animated draw-in */}
            <motion.path d={COAST} fill="none"
              stroke="rgba(56,216,232,0.55)" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease }}
            />
            {/* Shimmer wave along coast */}
            <motion.path d={COAST} fill="none"
              stroke="rgba(56,216,232,0.22)" strokeWidth="1" strokeLinecap="round"
              strokeDasharray="8 18"
              animate={{ strokeDashoffset: [0, -104] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            />
            {/* Bay of Bengal label */}
            <text x="458" y="285" textAnchor="middle" fill="rgba(56,216,232,0.22)"
              fontSize="8.5" fontFamily="var(--font-geist-sans)" fontWeight="500" letterSpacing="0.14em"
              transform="rotate(90,458,285)">BAY OF BENGAL</text>

            {/* ══ CONNECTOR LINES ══ */}
            {landmarks.map((lm) => {
              const isAct = active === lm.id;
              return (
                <g key={`conn-${lm.id}`}>
                  {isAct && (
                    <line x1={projX} y1={projY} x2={lm.mx} y2={lm.my}
                      stroke={lm.color} strokeWidth="4" opacity="0.07" />
                  )}
                  <line x1={projX} y1={projY} x2={lm.mx} y2={lm.my}
                    stroke={isAct ? lm.color : "rgba(255,255,255,0.055)"}
                    strokeWidth={isAct ? 1.2 : 0.7}
                    strokeDasharray={isAct ? "none" : "4 8"}
                    style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                  />
                </g>
              );
            })}

            {/* ══ LANDMARK HALOS (active only) ══ */}
            {landmarks.map((lm) => active === lm.id ? (
              <circle key={`h-${lm.id}`} cx={lm.mx} cy={lm.my} r={30} fill={`url(#lg-${lm.id})`} />
            ) : null)}

            {/* ══ LANDMARK NODES ══ */}
            {landmarks.map((lm) => {
              const isAct = active === lm.id;
              const toLeft  = lm.mx < projX - 8;
              const toRight = lm.mx > projX + 8;
              const anchor  = toLeft ? "end" : toRight ? "start" : "middle";
              const lx = toLeft ? lm.mx - 15 : toRight ? lm.mx + 15 : lm.mx;
              const ly = (toLeft || toRight) ? lm.my - 1 : lm.my - 15;
              return (
                <g key={lm.id} style={{ cursor: "pointer" }} onClick={() => setActive(lm.id)}>
                  {/* Hit area */}
                  <circle cx={lm.mx} cy={lm.my} r={16} fill="transparent" />
                  {/* Pulse ring (active) */}
                  {isAct && (
                    <motion.circle cx={lm.mx} cy={lm.my} r={14} fill="none"
                      stroke={lm.color} strokeWidth="0.8"
                      animate={{ r: [12, 22, 12], opacity: [0.55, 0.06, 0.55] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                  )}
                  {/* Ring */}
                  <circle cx={lm.mx} cy={lm.my} r={isAct ? 9 : 6.5}
                    fill={`${lm.color}1c`} stroke={isAct ? lm.color : `${lm.color}65`}
                    strokeWidth={isAct ? 1.6 : 0.9}
                    style={{ transition: "all 0.22s", filter: isAct ? `drop-shadow(0 0 6px ${lm.color})` : "none" }}
                  />
                  {/* Core */}
                  <circle cx={lm.mx} cy={lm.my} r={isAct ? 4 : 2.8}
                    fill={lm.color} style={{ transition: "r 0.22s" }}
                  />
                  {/* Short name */}
                  <text x={lx} y={ly} textAnchor={anchor}
                    fill={isAct ? "#f2f2f6" : "rgba(145,145,168,0.9)"}
                    fontSize="7.5" fontFamily="var(--font-geist-sans)"
                    fontWeight={isAct ? "600" : "400"}
                    style={{ transition: "fill 0.22s" }}
                  >{lm.short}</text>
                  {/* Distance */}
                  <text x={lx} y={ly + 9} textAnchor={anchor}
                    fill={isAct ? `${lm.color}dd` : `${lm.color}78`}
                    fontSize="6" fontFamily="var(--font-geist-sans)"
                    style={{ transition: "fill 0.22s" }}
                  >{lm.km}</text>
                </g>
              );
            })}

            {/* ══ PROJECT MARKER ══ */}
            <circle cx={projX} cy={projY} r={52} fill="url(#projGlow)" />
            <motion.circle cx={projX} cy={projY} r={18} fill="none"
              stroke="#d4aa50" strokeWidth="0.8"
              animate={{ r: [18, 28, 18], opacity: [0.5, 0.08, 0.5] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle cx={projX} cy={projY} r={11} fill="none"
              stroke="#d4aa50" strokeWidth="1.4"
              animate={{ r: [11, 15, 11], opacity: [0.9, 0.3, 0.9] }}
              transition={{ duration: 3.2, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle cx={projX} cy={projY} r={5.5} fill="#d4aa50"
              style={{ filter: "drop-shadow(0 0 10px rgba(212,170,80,0.95))" }} />
            <text x={projX} y={projY + 25} textAnchor="middle"
              fill="rgba(212,170,80,0.92)" fontSize="8" fontFamily="var(--font-geist-sans)"
              fontWeight="700" letterSpacing="0.09em">ARYAN ABODE</text>

            {/* Vizag city ghost label */}
            <text x="178" y="440" textAnchor="middle"
              fill="rgba(255,255,255,0.055)" fontSize="9.5" fontFamily="var(--font-geist-sans)"
              fontWeight="500" letterSpacing="0.18em">VISAKHAPATNAM</text>

            {/* ══ COMPASS ROSE ══ */}
            <g transform="translate(38,38)">
              <circle r="20" fill="rgba(8,8,18,0.92)" stroke="rgba(212,170,80,0.18)" strokeWidth="1" />
              <polygon points="0,-14 2.8,2.5 0,0.5 -2.8,2.5" fill="#d4aa50" />
              <polygon points="0,14 2.8,-2.5 0,-0.5 -2.8,-2.5" fill="rgba(255,255,255,0.15)" />
              <text x="0" y="-17" textAnchor="middle"
                fill="rgba(212,170,80,0.9)" fontSize="7.5" fontFamily="var(--font-geist-sans)" fontWeight="700">N</text>
            </g>

            {/* ══ SCALE BAR ══ */}
            <g transform="translate(24,538)">
              <rect x="0" y="-3" width="80" height="6" rx="2.5" fill="rgba(255,255,255,0.05)" />
              <rect x="0" y="-3" width="40" height="6" rx="2.5" fill="rgba(255,255,255,0.1)" />
              {["0", "10 km", "20 km"].map((t, i) => (
                <text key={t} x={i * 40} y="-8" textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"}
                  fill="rgba(255,255,255,0.22)" fontSize="6" fontFamily="var(--font-geist-sans)">{t}</text>
              ))}
            </g>

          </g>
        </svg>
      </div>

      {/* ══════════════════ SIDEBAR ══════════════════ */}
      <div className="w-full lg:w-[336px] shrink-0 border-t lg:border-t-0 lg:border-l border-white/[0.07] flex flex-col bg-[#09091a]">

        {/* Header */}
        <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-white/[0.07]">
          <p className="text-[#d4aa50] text-[9.5px] tracking-[0.4em] uppercase mb-1.5">Growth Intelligence</p>
          <h2 className="text-white text-[19px] font-light tracking-wide leading-tight">Location Advantage</h2>
          <p className="text-[#505070] text-[10.5px] mt-1.5">₹50,000 Cr+ infrastructure corridor</p>
        </div>

        {/* Active landmark card */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            className="px-5 py-5 border-b border-white/[0.07]"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.26, ease }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${activeLm.color}14`, border: `1.5px solid ${activeLm.color}40` }}>
                <activeLm.icon size={16} style={{ color: activeLm.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[12.5px] font-medium leading-snug">{activeLm.label}</p>
                <p className="text-[9.5px] font-semibold tracking-wider uppercase mt-0.5"
                  style={{ color: `${activeLm.color}cc` }}>{activeLm.sub}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-3.5">
              {[
                { label: "Travel",   value: activeLm.time },
                { label: "Distance", value: activeLm.km },
                { label: "Impact",   value: activeLm.impact, accent: true },
              ].map(({ label, value, accent }) => (
                <div key={label} className="rounded-lg p-2.5 text-center"
                  style={{ background: `${activeLm.color}0b`, border: `1px solid ${activeLm.color}20` }}>
                  <p className="text-[#505070] text-[8px] uppercase tracking-widest mb-1">{label}</p>
                  <p className="text-[10.5px] font-semibold leading-tight"
                    style={{ color: accent ? activeLm.color : "#d4d4e8" }}>{value}</p>
                </div>
              ))}
            </div>
            <p className="text-[#606078] text-[10.5px] leading-relaxed">{activeLm.desc}</p>
          </motion.div>
        </AnimatePresence>

        {/* Landmark list */}
        <div className="flex-1 overflow-y-auto px-3 py-2.5 space-y-0.5">
          {landmarks.map((lm) => (
            <motion.button key={lm.id}
              onClick={() => setActive(lm.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
              style={active === lm.id
                ? { background: `${lm.color}0f`, border: `1px solid ${lm.color}2e` }
                : { background: "transparent", border: "1px solid transparent" }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.14 }}
            >
              <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${lm.color}10`, border: `1px solid ${lm.color}24` }}>
                <lm.icon size={11} style={{ color: active === lm.id ? lm.color : "#505070" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-light truncate"
                  style={{ color: active === lm.id ? "#e4e4f0" : "#585878" }}>{lm.short}</p>
                <p className="text-[9px] text-[#323248] truncate">{lm.km}</p>
              </div>
              <span className="text-[9.5px] shrink-0 font-medium tabular-nums"
                style={{ color: active === lm.id ? lm.color : "#323248" }}>
                {lm.time}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-white/[0.07]">
          <div className="flex items-center gap-2">
            <MapPin size={9} className="text-[#d4aa50] shrink-0" />
            <p className="text-[#303048] text-[9.5px]">Bheemunipatnam, Visakhapatnam District, AP 531163</p>
          </div>
        </div>

      </div>
    </div>
  );
}
