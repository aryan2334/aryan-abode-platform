"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

type RoomId = "living" | "bedroom" | "kitchen" | "balcony";

const rooms: { id: RoomId; label: string; sub: string }[] = [
  { id: "living", label: "Living Room", sub: "3BHK · Sea View" },
  { id: "bedroom", label: "Master Bedroom", sub: "3BHK · Bay View" },
  { id: "kitchen", label: "Kitchen", sub: "Modular · Premium" },
  { id: "balcony", label: "Balcony", sub: "270° View" },
];

const directions = ["North", "East", "South", "West"];

const STARS_40 = Array.from({ length: 40 }, (_, i) => {
  const s = Math.sin(i * 137.508) * 0.5 + 0.5;
  const c = Math.cos(i * 97.1) * 0.5 + 0.5;
  const o = Math.sin(i * 53.7) * 0.35 + 0.55;
  return { top: s * 55, left: c * 100, opacity: o };
});
const STARS_60 = Array.from({ length: 60 }, (_, i) => {
  const s = Math.sin(i * 113.4) * 0.5 + 0.5;
  const c = Math.cos(i * 79.3) * 0.5 + 0.5;
  const o = Math.sin(i * 47.2) * 0.35 + 0.55;
  const big = Math.sin(i * 23.1) > 0.6;
  return { top: s * 45, left: c * 100, opacity: o, big };
});

function LivingRoomRender({ dir }: { dir: number }) {
  if (dir === 0)
    return (
      <div className="w-full h-full relative overflow-hidden">
        {/* Sky */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #06081a 0%, #0e1535 40%, #1a2040 60%, #0a0a0e 100%)" }} />
        {/* Stars */}
        {STARS_40.map((s, i) => (
          <div key={i} className="absolute w-px h-px bg-white rounded-full" style={{ top: `${s.top}%`, left: `${s.left}%`, opacity: s.opacity }} />
        ))}
        {/* City silhouette */}
        <svg className="absolute bottom-[35%] left-0 right-0 w-full opacity-40" viewBox="0 0 800 120" preserveAspectRatio="none">
          <path d="M0,120 L0,80 L30,80 L30,40 L50,40 L50,20 L70,20 L70,10 L90,10 L90,30 L110,30 L110,60 L130,60 L130,20 L150,20 L150,50 L180,50 L180,35 L200,35 L200,65 L220,65 L220,30 L250,30 L250,55 L270,55 L270,25 L290,25 L290,45 L310,45 L310,15 L330,15 L330,40 L360,40 L360,70 L380,70 L380,30 L400,30 L400,50 L430,50 L430,80 L450,80 L450,45 L470,45 L470,60 L500,60 L500,40 L520,40 L520,70 L550,70 L550,35 L570,35 L570,55 L600,55 L600,25 L620,25 L620,50 L650,50 L650,80 L680,80 L680,55 L700,55 L700,75 L730,75 L730,45 L750,45 L750,65 L780,65 L780,85 L800,85 L800,120 Z" fill="#1a1f35" />
          <path d="M0,120 L0,90 L40,90 L40,70 L60,70 L60,85 L80,85 L80,75 L100,75 L100,85 L130,85 L130,95 L160,95 L160,80 L190,80 L190,90 L220,90 L220,75 L250,75 L250,88 L280,88 L280,92 L310,92 L310,82 L340,82 L340,88 L380,88 L380,95 L420,95 L420,85 L460,85 L460,92 L500,92 L500,85 L540,85 L540,93 L580,93 L580,88 L620,88 L620,94 L660,94 L660,87 L700,87 L700,92 L740,92 L740,88 L780,88 L780,95 L800,95 L800,120 Z" fill="#0f1120" />
        </svg>
        {/* Sea horizon */}
        <div className="absolute" style={{ bottom: "32%", left: 0, right: 0, height: "3%", background: "linear-gradient(to right, transparent, rgba(100,150,255,0.2), transparent)" }} />
        {/* Floor reflection */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: "33%", background: "linear-gradient(to top, #08080e 0%, #0d0d1a 100%)" }} />
        {/* Hardwood floor pattern */}
        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-15" style={{ height: "32%" }} viewBox="0 0 800 200" preserveAspectRatio="none">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 20} x2="800" y2={i * 20} stroke="#c9a84c" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="200" stroke="#c9a84c" strokeWidth="0.3" />
          ))}
        </svg>
        {/* Window frames */}
        <div className="absolute inset-x-8 inset-y-[5%]" style={{ bottom: "33%" }}>
          <div className="w-full h-full border-2 border-[#c9a84c]/30 rounded-sm">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#c9a84c]/20" />
            <div className="absolute top-0 bottom-0 left-1/3 w-px bg-[#c9a84c]/20" />
            <div className="absolute top-0 bottom-0 left-2/3 w-px bg-[#c9a84c]/20" />
          </div>
        </div>
        {/* Couch silhouette */}
        <div className="absolute bottom-[33%] left-1/2 -translate-x-1/2 w-[55%] h-[9%]" style={{ background: "linear-gradient(to top, #1a1a2e, #141425)" }}>
          <div className="absolute -top-[40%] left-2 right-2 h-[40%]" style={{ background: "#111120" }} />
          <div className="absolute -top-[40%] left-0 w-[12%] h-full" style={{ background: "#131322" }} />
          <div className="absolute -top-[40%] right-0 w-[12%] h-full" style={{ background: "#131322" }} />
        </div>
        {/* Ambient warm light from left */}
        <div className="absolute left-0 top-1/4 w-1/3 h-1/2 pointer-events-none" style={{ background: "radial-gradient(ellipse at left, rgba(201,168,76,0.08), transparent)" }} />
        {/* Label */}
        <div className="absolute bottom-4 right-5 text-[#c9a84c]/40 text-[10px] tracking-[0.2em] uppercase">Sea View · North</div>
      </div>
    );

  if (dir === 1)
    return (
      <div className="w-full h-full relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0a0a12 0%, #0f0f1e 100%)" }} />
        {/* TV wall */}
        <div className="absolute inset-x-[15%] top-[15%] bottom-[35%]" style={{ background: "linear-gradient(to bottom, #0e0e1e, #141420)" }}>
          <div className="absolute inset-[8%] rounded-sm" style={{ background: "#060610", boxShadow: "0 0 30px rgba(201,168,76,0.1) inset" }}>
            <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at center, #1a2040, transparent)" }} />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[#c9a84c]/30 text-[9px] tracking-widest">75&quot; 8K OLED</div>
          </div>
        </div>
        {/* Cabinet */}
        <div className="absolute inset-x-[8%]" style={{ top: "62%", height: "5%", background: "#111118", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-[#c9a84c]/20" />
        </div>
        {/* Accent wall texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 400 300">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 15} x2="400" y2={i * 15} stroke="#c9a84c" strokeWidth="0.5" />
          ))}
        </svg>
        <div className="absolute bottom-4 right-5 text-[#c9a84c]/40 text-[10px] tracking-[0.2em] uppercase">Living Room · East</div>
      </div>
    );

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(145deg, #08080e 0%, #0d0d18 100%)" }} />
      <div className="absolute inset-x-[20%] top-[20%] bottom-[38%]" style={{ background: "linear-gradient(to bottom, #0f1020, #090910)", border: "1px solid rgba(201,168,76,0.06)" }} />
      <div className="absolute bottom-[38%] left-0 right-0 h-[2%]" style={{ background: "rgba(201,168,76,0.06)" }} />
      <div className="absolute bottom-[36%] inset-x-[5%] h-[4%]" style={{ background: "#0e0e16" }} />
      <div className="absolute bottom-4 right-5 text-[#c9a84c]/40 text-[10px] tracking-[0.2em] uppercase">Feature Wall · {directions[dir]}</div>
    </div>
  );
}

function MasterBedroomRender({ dir }: { dir: number }) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #07080f 0%, #0c0d1a 50%, #080809 100%)" }} />
      {dir === 0 && (
        <>
          {/* Morning light from window */}
          <div className="absolute top-0 right-0 w-1/2 h-2/3 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(255,220,100,0.06), transparent 70%)" }} />
          {/* Window */}
          <div className="absolute top-[10%] right-[10%] w-[35%] h-[50%] border border-[#c9a84c]/20" style={{ background: "linear-gradient(to bottom, #060b1a, #0a1025)" }}>
            <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(to bottom, rgba(255,200,80,0.08), transparent)" }} />
          </div>
          {/* Bed */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[60%]" style={{ top: "52%", height: "18%" }}>
            <div className="w-full h-full" style={{ background: "linear-gradient(to top, #141420, #1a1a28)" }} />
            <div className="absolute -top-[40%] left-[5%] right-[5%] h-[40%]" style={{ background: "#111122", borderRadius: "2px 2px 0 0" }} />
            {/* Pillows */}
            <div className="absolute top-[10%] left-[12%] w-[28%] h-[45%] rounded-sm" style={{ background: "#1e1e2e" }} />
            <div className="absolute top-[10%] right-[12%] w-[28%] h-[45%] rounded-sm" style={{ background: "#1e1e2e" }} />
          </div>
          {/* Floor */}
          <div className="absolute bottom-0 inset-x-0 h-[28%]" style={{ background: "linear-gradient(to top, #060608, #0d0d15)" }} />
          {/* Pendant light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[15%]" style={{ background: "rgba(201,168,76,0.2)" }} />
          <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full" style={{ top: "13%", background: "radial-gradient(circle, rgba(201,168,76,0.5), rgba(201,168,76,0.1))", boxShadow: "0 0 30px rgba(201,168,76,0.3)" }} />
        </>
      )}
      {dir !== 0 && (
        <div className="absolute inset-[15%] opacity-20" style={{ background: "#0d0d1e", border: "1px solid rgba(201,168,76,0.08)" }} />
      )}
      <div className="absolute bottom-4 right-5 text-[#c9a84c]/40 text-[10px] tracking-[0.2em] uppercase">Master Bedroom · {directions[dir]}</div>
    </div>
  );
}

function KitchenRender({ dir }: { dir: number }) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "#07070d" }} />
      {dir === 0 && (
        <>
          {/* Counter */}
          <div className="absolute bottom-[35%] inset-x-0 h-[8%]" style={{ background: "linear-gradient(to top, #1a1a20, #222228)", borderTop: "2px solid rgba(201,168,76,0.3)" }} />
          {/* Backsplash */}
          <div className="absolute inset-x-0" style={{ bottom: "43%", top: "15%", background: "#0e0e16" }}>
            <svg className="w-full h-full opacity-10" viewBox="0 0 400 200">
              {Array.from({ length: 8 }).map((_, r) =>
                Array.from({ length: 16 }).map((_, c) => (
                  <rect key={`${r}-${c}`} x={c * 25 + 1} y={r * 25 + 1} width={23} height={23} fill="none" stroke="#c9a84c" strokeWidth="0.5" />
                ))
              )}
            </svg>
          </div>
          {/* Cabinets */}
          <div className="absolute top-[15%] inset-x-0 h-[20%]" style={{ background: "#0c0c14", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="absolute top-[30%] h-[40%] w-px" style={{ left: `${25 * (i + 1)}%`, background: "rgba(201,168,76,0.1)" }} />
            ))}
          </div>
          {/* Under-cabinet lighting */}
          <div className="absolute inset-x-0 h-2 pointer-events-none" style={{ top: "35%", background: "linear-gradient(to bottom, rgba(201,168,76,0.08), transparent)" }} />
          {/* Sink area */}
          <div className="absolute left-[35%] w-[30%]" style={{ bottom: "35%", height: "3%", background: "#151518", border: "1px solid rgba(201,168,76,0.1)" }} />
        </>
      )}
      <div className="absolute bottom-4 right-5 text-[#c9a84c]/40 text-[10px] tracking-[0.2em] uppercase">Kitchen · {directions[dir]}</div>
    </div>
  );
}

function BalconyRender() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Ocean + sky */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #05071a 0%, #0a1030 30%, #0f1840 50%, #061018 70%, #030408 100%)" }} />
      {/* Horizon glow */}
      <div className="absolute left-0 right-0 pointer-events-none" style={{ top: "42%", height: "8%", background: "linear-gradient(to bottom, transparent, rgba(100,160,255,0.06), transparent)" }} />
      {/* Moon */}
      <div className="absolute w-10 h-10 rounded-full" style={{ top: "12%", right: "20%", background: "radial-gradient(circle, rgba(255,245,200,0.7), rgba(255,245,200,0.1))", boxShadow: "0 0 20px rgba(255,245,200,0.15)" }} />
      {/* Stars */}
      {STARS_60.map((s, i) => (
        <div key={i} className="absolute rounded-full" style={{ width: s.big ? "2px" : "1px", height: s.big ? "2px" : "1px", top: `${s.top}%`, left: `${s.left}%`, background: "white", opacity: s.opacity }} />
      ))}
      {/* Ocean waves */}
      <svg className="absolute opacity-20" style={{ top: "50%", left: 0, right: 0, width: "100%", height: "20%" }} viewBox="0 0 800 80" preserveAspectRatio="none">
        <path d="M0,40 Q100,20 200,40 Q300,60 400,40 Q500,20 600,40 Q700,60 800,40" fill="none" stroke="rgba(100,160,255,0.4)" strokeWidth="2" />
        <path d="M0,55 Q100,35 200,55 Q300,75 400,55 Q500,35 600,55 Q700,75 800,55" fill="none" stroke="rgba(100,160,255,0.2)" strokeWidth="1.5" />
      </svg>
      {/* Balcony floor */}
      <div className="absolute bottom-0 inset-x-0 h-[22%]" style={{ background: "linear-gradient(to top, #0a0a10, #0d0d18)" }} />
      {/* Railing */}
      <div className="absolute inset-x-0 h-px" style={{ bottom: "22%", background: "linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)" }} />
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="absolute w-px" style={{ bottom: "22%", height: "12%", left: `${5 + i * 4.7}%`, background: "rgba(201,168,76,0.15)" }} />
      ))}
      {/* Plant silhouette */}
      <div className="absolute bottom-[22%] left-[8%] w-6 opacity-60">
        <svg viewBox="0 0 24 60" className="w-full">
          <path d="M12,60 L12,20 Q6,10 2,5 Q8,12 12,25 Q16,12 22,5 Q18,10 12,20" fill="#1a2a10" />
        </svg>
      </div>
      {/* City lights reflection on sea */}
      <div className="absolute" style={{ top: "55%", left: "10%", right: "10%", height: "15%", background: "radial-gradient(ellipse, rgba(201,168,76,0.04), transparent)" }} />
      <div className="absolute bottom-4 right-5 text-[#c9a84c]/40 text-[10px] tracking-[0.2em] uppercase">Balcony · Sea Facing</div>
    </div>
  );
}

function RoomView({ roomId, dir }: { roomId: RoomId; dir: number }) {
  switch (roomId) {
    case "living": return <LivingRoomRender dir={dir} />;
    case "bedroom": return <MasterBedroomRender dir={dir} />;
    case "kitchen": return <KitchenRender dir={dir} />;
    case "balcony": return <BalconyRender />;
  }
}

export function VirtualTourPanel() {
  const [roomIdx, setRoomIdx] = useState(0);
  const [dir, setDir] = useState(0);
  const [dragDir, setDragDir] = useState<"left" | "right" | null>(null);
  const dragStart = useRef<number | null>(null);

  const activeRoom = rooms[roomIdx];

  const rotate = useCallback(
    (delta: 1 | -1) => {
      setDragDir(delta === 1 ? "right" : "left");
      setTimeout(() => {
        setDir((d) => (d + delta + 4) % 4);
        setDragDir(null);
      }, 200);
    },
    []
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStart.current = e.clientX;
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStart.current === null) return;
    const delta = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(delta) > 40) rotate(delta < 0 ? 1 : -1);
  };

  return (
    <div className="h-full min-h-screen flex flex-col">
      {/* Room selector */}
      <div className="flex items-center gap-1 px-6 pt-6 pb-4 border-b border-white/5 shrink-0">
        {rooms.map((room, i) => (
          <motion.button
            key={room.id}
            onClick={() => { setRoomIdx(i); setDir(0); }}
            className="flex-1 px-3 py-2.5 rounded-xl text-xs font-medium tracking-wider transition-all duration-200"
            style={
              roomIdx === i
                ? { background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c" }
                : { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", color: "#5c5c6e" }
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {room.label}
          </motion.button>
        ))}
      </div>

      {/* Main viewport */}
      <div className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing select-none" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeRoom.id}-${dir}`}
            className="absolute inset-0"
            initial={{ opacity: 0, x: dragDir === "right" ? 80 : dragDir === "left" ? -80 : 0, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: dragDir === "right" ? -60 : 60, scale: 0.99 }}
            transition={{ duration: 0.35, ease }}
          >
            <RoomView roomId={activeRoom.id} dir={dir} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={() => rotate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm flex items-center justify-center text-[#a8a8b4] hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-colors z-10"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => rotate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm flex items-center justify-center text-[#a8a8b4] hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-colors z-10"
        >
          <ChevronRight size={18} />
        </button>

        {/* Compass indicator */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/08 bg-black/30 backdrop-blur-sm z-10">
          {directions.map((d, i) => (
            <span key={d} className={`text-[10px] font-semibold tracking-wider transition-colors ${i === dir ? "text-[#c9a84c]" : "text-[#3a3a4a]"}`}>{d}</span>
          ))}
        </div>

        {/* Drag hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/05 bg-black/20 backdrop-blur-sm z-10 pointer-events-none">
          <span className="text-[#3a3a4a] text-[10px] tracking-widest uppercase">Drag to look around</span>
        </div>

        {/* Fullscreen icon */}
        <div className="absolute top-4 right-4 z-10">
          <button className="w-8 h-8 rounded-lg border border-white/08 bg-black/20 flex items-center justify-center text-[#5c5c6e] hover:text-[#c9a84c] transition-colors">
            <Maximize2 size={13} />
          </button>
        </div>
      </div>

      {/* Room info bar */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-white/5 bg-[#07070d] shrink-0">
        <div>
          <p className="text-[#f0f0f4] text-sm font-light">{activeRoom.label}</p>
          <p className="text-[#5c5c6e] text-xs mt-0.5">{activeRoom.sub}</p>
        </div>
        <div className="flex gap-2">
          {rooms.map((r, i) => (
            <button
              key={r.id}
              onClick={() => { setRoomIdx(i); setDir(0); }}
              className="w-2 h-2 rounded-full transition-colors"
              style={{ background: roomIdx === i ? "#c9a84c" : "rgba(255,255,255,0.1)" }}
            />
          ))}
        </div>
        <div className="text-right">
          <p className="text-[#c9a84c] text-xs font-semibold">{directions[dir]} Wall</p>
          <p className="text-[#5c5c6e] text-[10px] mt-0.5">View {dir + 1} of 4</p>
        </div>
      </div>
    </div>
  );
}
