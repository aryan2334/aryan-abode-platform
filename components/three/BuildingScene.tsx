"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ── Palette (matches actual Aryan Abode brochure) ── */
const CREAM    = "#cec6b6";
const CREAM_LT = "#ddd8ce";
const GOLD     = "#c8921e";
const GOLD_LT  = "#dca830";
const WOOD     = "#7a5228";
const WIN      = "#0e1a28";
const BAND     = "#908878";
const SIGN_BG  = "#18120e";
const GRN      = "#3a6018";
const GRN_LT   = "#507828";

/* ── Dimensions ─────────────────────────────────── */
const FH = 1.7;    // floor height
const FLOORS = 5;
const TW = 3.4;    // main tower width
const TD = 2.0;    // main tower depth
const TH = FLOORS * FH;

/* ── Floor Bands ────────────────────────────────── */
function FloorBands({ n, w, z }: { n: number; w: number; z: number }) {
  return (
    <>
      {Array.from({ length: n + 1 }).map((_, i) => (
        <mesh key={i} position={[0, i * FH, z + 0.02]}>
          <boxGeometry args={[w + 0.06, 0.07, 0.04]} />
          <meshStandardMaterial color={BAND} roughness={0.6} />
        </mesh>
      ))}
    </>
  );
}

/* ── Gold Diamond Panels (left ~40% of facade) ───── */
function GoldPanels() {
  const cols = 4;
  const rows = 20;
  const size = 0.37;
  const step = 0.40;
  const x0   = -TW / 2 + 0.25;
  const y0   = 0.18;

  const panels = useMemo(() => {
    const arr: { x: number; y: number; bright: boolean }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arr.push({ x: x0 + c * step, y: y0 + r * step, bright: (r + c) % 3 === 0 });
      }
    }
    return arr;
  }, []);

  return (
    <>
      {panels.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, TD / 2 + 0.022]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[size * 0.75, size * 0.75, 0.055]} />
          <meshStandardMaterial
            color={p.bright ? GOLD_LT : GOLD}
            metalness={0.72} roughness={0.22}
            emissive={GOLD} emissiveIntensity={0.07}
          />
        </mesh>
      ))}
    </>
  );
}

/* ── Vertical Wood Slats ────────────────────────── */
function WoodSlats() {
  const count   = 7;
  const spacing = 0.19;
  const x0      = -TW / 2 + 0.25 + 4 * 0.40 + 0.22;
  const slatH   = TH * 0.68;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[x0 + i * spacing, slatH / 2, TD / 2 + 0.025]}>
          <boxGeometry args={[0.055, slatH, 0.055]} />
          <meshStandardMaterial color={WOOD} roughness={0.85} metalness={0.02} />
        </mesh>
      ))}
    </>
  );
}

/* ── Windows ────────────────────────────────────── */
function Windows({ n, w, z, cols, cx = 0 }: {
  n: number; w: number; z: number; cols: number; cx?: number;
}) {
  const wins = useMemo(() => {
    const list: { x: number; y: number }[] = [];
    const xStep = w / (cols + 1);
    for (let f = 0; f < n; f++) {
      for (let c = 0; c < cols; c++) {
        list.push({ x: cx - w / 2 + xStep * (c + 1), y: f * FH + FH * 0.45 });
      }
    }
    return list;
  }, [n, w, cols, cx]);

  return (
    <>
      {wins.map((wn, i) => (
        <mesh key={i} position={[wn.x, wn.y, z + 0.03]}>
          <boxGeometry args={[0.28, 0.56, 0.038]} />
          <meshStandardMaterial color={WIN} roughness={0.1} metalness={0.9}
            emissive={WIN} emissiveIntensity={0.18} />
        </mesh>
      ))}
    </>
  );
}

/* ── Balconies with plants ───────────────────────── */
function Balconies({ n, w, z }: { n: number; w: number; z: number }) {
  return (
    <>
      {Array.from({ length: n }).map((_, f) => (
        <group key={f} position={[0, f * FH + 0.1, 0]}>
          <mesh position={[0, 0, z + 0.25]}>
            <boxGeometry args={[w - 0.08, 0.07, 0.5]} />
            <meshStandardMaterial color={CREAM_LT} roughness={0.65} />
          </mesh>
          <mesh position={[0, 0.3, z + 0.48]}>
            <boxGeometry args={[w - 0.08, 0.04, 0.025]} />
            <meshStandardMaterial color="#ddd6c6" roughness={0.5} metalness={0.15} />
          </mesh>
          {f % 2 === 0 && (
            <mesh position={[-w / 2 + 0.38, 0.28, z + 0.36]}>
              <sphereGeometry args={[0.16, 8, 6]} />
              <meshStandardMaterial color={f === 0 ? GRN : GRN_LT} roughness={0.9} />
            </mesh>
          )}
        </group>
      ))}
    </>
  );
}

/* ── Main Tower ─────────────────────────────────── */
function MainTower() {
  return (
    <group position={[-0.35, 0, 0]}>
      <mesh position={[0, TH / 2, 0]}>
        <boxGeometry args={[TW, TH, TD]} />
        <meshStandardMaterial color={CREAM} roughness={0.72} />
      </mesh>
      <FloorBands n={FLOORS} w={TW} z={TD / 2} />
      <GoldPanels />
      <WoodSlats />
      <Windows n={FLOORS} w={1.1} z={TD / 2} cols={2} cx={0.85} />
      <Balconies n={FLOORS} w={TW} z={TD / 2} />
      {/* Signage dark panel */}
      <mesh position={[0, TH + 0.27, TD / 2 + 0.01]}>
        <boxGeometry args={[TW * 0.72, 0.52, 0.06]} />
        <meshStandardMaterial color={SIGN_BG} roughness={0.45} />
      </mesh>
      {/* Gold accent strip */}
      <mesh position={[0, TH - 0.01, TD / 2 + 0.015]}>
        <boxGeometry args={[TW + 0.02, 0.08, 0.05]} />
        <meshStandardMaterial color={GOLD_LT} metalness={0.9} roughness={0.1}
          emissive={GOLD} emissiveIntensity={0.18} />
      </mesh>
      {/* Parapet */}
      <mesh position={[0, TH + 0.64, 0]}>
        <boxGeometry args={[TW + 0.1, 0.32, TD + 0.1]} />
        <meshStandardMaterial color={CREAM} roughness={0.7} />
      </mesh>
    </group>
  );
}

/* ── Wing (secondary block, right side) ─────────── */
function Wing() {
  const WW = 2.4;
  const WD = 1.7;
  const WH = 4 * FH;
  return (
    <group position={[TW / 2 - 0.35 + WW / 2 - 0.05, 0, 0.28]}>
      <mesh position={[0, WH / 2, 0]}>
        <boxGeometry args={[WW, WH, WD]} />
        <meshStandardMaterial color={CREAM_LT} roughness={0.75} />
      </mesh>
      <FloorBands n={4} w={WW} z={WD / 2} />
      <Balconies n={4} w={WW} z={WD / 2} />
      <mesh position={[0, WH + 0.18, 0]}>
        <boxGeometry args={[WW + 0.08, 0.3, WD + 0.08]} />
        <meshStandardMaterial color={CREAM_LT} roughness={0.75} />
      </mesh>
    </group>
  );
}

/* ── Ground & Landscape ─────────────────────────── */
function Ground() {
  return (
    <group>
      <mesh position={[0, -0.09, 0.5]}>
        <boxGeometry args={[13, 0.18, 8]} />
        <meshStandardMaterial color="#222018" roughness={0.92} />
      </mesh>
      {/* Entrance canopy */}
      <mesh position={[-2.2, 0.92, TD / 2 + 1.9]}>
        <boxGeometry args={[2.4, 0.09, 1.4]} />
        <meshStandardMaterial color={SIGN_BG} roughness={0.5} />
      </mesh>
      {[-0.95, 0.95].map((x, i) => (
        <mesh key={i} position={[x - 2.2, 0.46, TD / 2 + 2.55]}>
          <boxGeometry args={[0.13, 0.92, 0.13]} />
          <meshStandardMaterial color="#706858" roughness={0.75} />
        </mesh>
      ))}
      {/* Shrubs */}
      {([-2.8, -1.8, 0.8, 2.2, 3.4] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0.24, TD / 2 + 1.2 + (i % 2) * 0.1]}>
          <sphereGeometry args={[0.38 + (i % 2) * 0.12, 7, 6]} />
          <meshStandardMaterial color={i % 2 === 0 ? GRN : GRN_LT} roughness={0.92} />
        </mesh>
      ))}
      {/* Palm trees */}
      {([-3.8, 4.4] as number[]).map((x, i) => (
        <group key={i} position={[x, 0, 1.5]}>
          <mesh position={[0, 1.9, 0]}>
            <cylinderGeometry args={[0.07, 0.12, 3.8, 8]} />
            <meshStandardMaterial color="#5a3818" roughness={0.9} />
          </mesh>
          {[0, 1, 2, 3, 4].map((j) => (
            <mesh key={j} position={[0, 3.9, 0]} rotation={[0.5, (j / 5) * Math.PI * 2, 0.1]}>
              <boxGeometry args={[0.07, 1.5, 0.07]} />
              <meshStandardMaterial color={GRN} roughness={0.9} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/* ── Scene wrapper with subtle present-pose sway ── */
function Scene() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.18) * 0.07 - 0.28;
  });
  return (
    <group ref={ref} position={[0, -3.9, 0]}>
      <MainTower />
      <Wing />
      <Ground />
    </group>
  );
}

/* ── Canvas export ───────────────────────────────── */
export function BuildingScene() {
  return (
    <Canvas
      camera={{ position: [-1.5, 4, 12], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", failIfMajorPerformanceCaveat: false }}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => { e.preventDefault(); }, false);
      }}
    >
      <ambientLight intensity={0.5} color="#f5ede0" />
      <directionalLight position={[-5, 9, 7]} intensity={1.4} color="#fffaf0" />
      <directionalLight position={[6, 3, -5]} intensity={0.2} color="#a0b8ff" />
      <pointLight position={[-2, 8, 3]} intensity={0.4} color="#ffe8a0" />
      <Stars radius={60} depth={40} count={300} factor={2} saturation={0} fade speed={0.4} />
      <Scene />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={false}
        maxPolarAngle={Math.PI * 0.68}
        minPolarAngle={Math.PI * 0.22}
      />
    </Canvas>
  );
}
