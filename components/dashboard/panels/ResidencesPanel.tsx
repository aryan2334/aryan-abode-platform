"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, Home } from "lucide-react";
import type { PanelId } from "@/components/dashboard/DashboardShell";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

type GroupId = "2BHK" | "2.5BHK" | "3BHK";

interface Variant {
  id: string;
  sqft: number;
  facing: string;
  flatNos: string;
  image: string;
  basePrice: [number, number];
  rooms: { name: string; size: string }[];
}

const variants: Record<GroupId, Variant[]> = {
  "2BHK": [
    {
      id: "2bhk-1210e", sqft: 1210, facing: "East", flatNos: "7 · 9 · 11",
      image: "/plan-2bhk-1210e.png",
      basePrice: [48, 58],
      rooms: [
        { name: "M Bedroom",      size: "14'0\"×11'0\""    },
        { name: "Ch Bedroom",     size: "10'10½\"×11'1½\"" },
        { name: "Dining/Kitchen", size: "13'3\"×11'0\""    },
        { name: "Work Space",     size: "7'6\"×11'1½\""    },
        { name: "Living",         size: "10'0\"×11'1½\""   },
        { name: "Sitout",         size: "4'6\"×11'1½\""    },
        { name: "A Toilet",       size: "4'3\"×7'6\""      },
        { name: "C Toilet",       size: "4'3\"×7'0\""      },
        { name: "Wash Area",      size: "4'3\" wide"        },
      ],
    },
    {
      id: "2bhk-1215w", sqft: 1215, facing: "West", flatNos: "8 · 10 · 12",
      image: "/plan-2bhk-1215w.png",
      basePrice: [48, 60],
      rooms: [
        { name: "M Bedroom",      size: "14'0\"×11'0\""    },
        { name: "Ch Bedroom",     size: "11'6\"×11'1½\""   },
        { name: "Dining/Kitchen", size: "14'3\"×11'0\""    },
        { name: "Work Space",     size: "7'0\"×11'1½\""    },
        { name: "Living",         size: "10'0\"×11'1½\""   },
        { name: "Sitout",         size: "4'6\"×11'1½\""    },
        { name: "A Toilet",       size: "4'3\"×7'6\""      },
        { name: "C Toilet",       size: "4'3\"×7'0\""      },
        { name: "Wash Area",      size: "4'3\" wide"        },
      ],
    },
  ],
  "2.5BHK": [
    {
      id: "2.5bhk-1200e", sqft: 1200, facing: "East", flatNos: "13 · 14",
      image: "/plan-2.5bhk-1200e.png",
      basePrice: [52, 62],
      rooms: [
        { name: "M Bedroom",  size: "11'6\"×11'0\""  },
        { name: "Ch Bedroom", size: "10'0\"×11'0\""  },
        { name: "Living",     size: "11'3\"×9'9\""   },
        { name: "Dining",     size: "10'4½\"×9'9\""  },
        { name: "Kitchen",    size: "8'3\"×8'0\""    },
        { name: "Sitout",     size: "4'9\"×9'9\""    },
        { name: "Foyer",      size: "10'0\"×11'0\""  },
        { name: "C Toilet",   size: "4'3\"×7'6\""    },
        { name: "A Toilet",   size: "4'6\"×7'6\""    },
        { name: "Puja",       size: "—"              },
        { name: "Wash Area",  size: "4'3\" wide"      },
      ],
    },
    {
      id: "2.5bhk-1205w", sqft: 1205, facing: "West", flatNos: "16 · 18",
      image: "/plan-2.5bhk-1205w.png",
      basePrice: [52, 62],
      rooms: [
        { name: "M Bedroom",       size: "11'6\"×11'0\""  },
        { name: "Ch Bedroom",      size: "10'1½\"×11'0\"" },
        { name: "Living",          size: "10'4½\"×9'9\""  },
        { name: "Dining",          size: "11'9\"×9'9\""   },
        { name: "Kitchen",         size: "8'6\"×8'0\""    },
        { name: "Sitout",          size: "4'6\"×5'9\""    },
        { name: "Foyer",           size: "10'0\"×11'0\""  },
        { name: "C Toilet",        size: "4'3\"×7'0\""    },
        { name: "A Toilet",        size: "4'6\"×7'6\""    },
        { name: "Puja / Crockery", size: "—"             },
        { name: "Wash Area",       size: "4'4½\" wide"   },
      ],
    },
    {
      id: "2.5bhk-1215e", sqft: 1215, facing: "East", flatNos: "17 · 19",
      image: "/plan-2.5bhk-1215e.png",
      basePrice: [54, 64],
      rooms: [
        { name: "M Bedroom",  size: "11'6\"×11'0\""  },
        { name: "Ch Bedroom", size: "10'0\"×11'0\""  },
        { name: "Living",     size: "11'3\"×9'9\""   },
        { name: "Dining",     size: "10'4½\"×9'9\""  },
        { name: "Kitchen",    size: "8'3\"×8'0\""    },
        { name: "Sitout",     size: "10'4½\"×4'0\""  },
        { name: "Foyer",      size: "10'0\"×9'9\""   },
        { name: "C Toilet",   size: "4'3\"×7'0\""    },
        { name: "A Toilet",   size: "4'6\"×7'6\""    },
        { name: "Puja",       size: "—"              },
        { name: "Wash Area",  size: "4'3\" wide"      },
      ],
    },
    {
      id: "2.5bhk-1245w", sqft: 1245, facing: "West", flatNos: "20",
      image: "/plan-2.5bhk-1245w.png",
      basePrice: [55, 68],
      rooms: [
        { name: "M Bedroom",       size: "11'6\"×11'0\""  },
        { name: "Ch Bedroom",      size: "10'1½\"×11'0\"" },
        { name: "Living",          size: "10'4½\"×10'9\"" },
        { name: "Dining",          size: "11'9\"×10'9\""  },
        { name: "Kitchen",         size: "8'6\"×8'0\""    },
        { name: "Sitout",          size: "4'6\"×10'9\""   },
        { name: "Foyer",           size: "10'0\"×11'0\""  },
        { name: "C Toilet",        size: "4'3\"×7'0\""    },
        { name: "A Toilet",        size: "4'6\"×7'6\""    },
        { name: "Puja / Crockery", size: "—"             },
        { name: "Wash Area",       size: "4'4½\" wide"   },
      ],
    },
    {
      id: "2.5bhk-1350e", sqft: 1350, facing: "East", flatNos: "5",
      image: "/plan-2.5bhk-1350e.png",
      basePrice: [60, 74],
      rooms: [
        { name: "M Bedroom",  size: "13'0\"×11'0\""  },
        { name: "Ch Bedroom", size: "11'6\"×11'0\""  },
        { name: "Living",     size: "12'0\"×9'9\""   },
        { name: "Dining",     size: "13'0\"×9'9\""   },
        { name: "Kitchen",    size: "10'3\"×8'0\""   },
        { name: "Sitout",     size: "4'6\"×9'9\""    },
        { name: "Foyer",      size: "12'0\"×11'0\""  },
        { name: "C Toilet",   size: "4'3\"×7'6\""    },
        { name: "A Toilet",   size: "4'6\"×7'6\""    },
        { name: "Puja",       size: "—"              },
        { name: "Wash Area",  size: "4'3\" wide"      },
      ],
    },
  ],
  "3BHK": [
    {
      id: "3bhk-1515e", sqft: 1515, facing: "East", flatNos: "1 · 3",
      image: "/plan-3bhk-1515e.png",
      basePrice: [70, 84],
      rooms: [
        { name: "M Bedroom",    size: "13'0\"×12'0\""        },
        { name: "Ch Bedroom",   size: "11'3\"×11'9\""        },
        { name: "G Bedroom",    size: "12'0\"×11'9\""        },
        { name: "Living",       size: "12'9\"×12'0\""        },
        { name: "Dining",       size: "12'4\"×12'0\""        },
        { name: "Kitchen",      size: "10'3\"×9'1½\""        },
        { name: "Sitout",       size: "5'3\"×13'0\""         },
        { name: "A Toilet ×2",  size: "4'6\"×7'0\" / 7'6\"" },
        { name: "PWD",          size: "4'6\"×4'4½\""         },
        { name: "Wash Area",    size: "4'3\" wide"            },
      ],
    },
    {
      id: "3bhk-1515w", sqft: 1515, facing: "West", flatNos: "2 · 4",
      image: "/plan-3bhk-1515w.png",
      basePrice: [70, 84],
      rooms: [
        { name: "M Bedroom",    size: "13'0\"×12'0\""        },
        { name: "Ch Bedroom",   size: "11'0\"×11'9\""        },
        { name: "G Bedroom",    size: "12'0\"×11'9\""        },
        { name: "Living",       size: "12'9\"×12'0\""        },
        { name: "Dining",       size: "12'4\"×12'0\""        },
        { name: "Kitchen",      size: "10'3\"×8'1½\""        },
        { name: "Sitout",       size: "4'3\"×12'0\""         },
        { name: "A Toilet ×2",  size: "4'9\"×7'0\" / 7'6\"" },
        { name: "PWD",          size: "4'9\"×4'4½\""         },
        { name: "Wash Area",    size: "4'3\" wide"            },
      ],
    },
    {
      id: "3bhk-1640w", sqft: 1640, facing: "West", flatNos: "6",
      image: "/plan-3bhk-1640w.png",
      basePrice: [76, 92],
      rooms: [
        { name: "M Bedroom",   size: "13'0\"×12'0\""            },
        { name: "Ch Bedroom",  size: "11'0\"×11'9\""            },
        { name: "G Bedroom",   size: "10'9\"×11'9\""            },
        { name: "Living",      size: "15'4½\"×12'0\""           },
        { name: "Dining",      size: "12'6\"×12'0\""            },
        { name: "Kitchen",     size: "13'1½\"×8'1½\""           },
        { name: "Sitout",      size: "4'3\"×12'0\""             },
        { name: "Toilets ×3",  size: "4'3\"×7'6\" / 4'6\"×7'6\"" },
        { name: "Wash Area",   size: "4'3\" wide"                },
      ],
    },
  ],
};

function RoomDimensionsList({
  variantId,
  rooms,
}: {
  variantId: string;
  rooms: { name: string; size: string }[];
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={variantId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {rooms.map((r) => (
          <div key={r.name} className="flex items-center justify-between py-1.5 border-b border-white/10 gap-2">
            <span className="text-[11px] text-[#9090b8] shrink-0">{r.name}</span>
            <span className="text-[11px] font-mono text-right" style={{ color: "rgba(240,200,74,0.90)" }}>
              {r.size}
            </span>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

export function ResidencesPanel({ onNavigate: _onNavigate }: { onNavigate?: (id: PanelId) => void } = {}) {
  const [group, setGroup]   = useState<GroupId>("2.5BHK");
  const [varIdx, setVarIdx] = useState(0);

  const list    = variants[group];
  const variant = list[Math.min(varIdx, list.length - 1)];

  return (
    <div className="flex flex-col lg:flex-row lg:h-full lg:min-h-screen">

      {/* ── Floor plan (first on mobile, right on desktop) ── */}
      <div
        className="order-1 lg:order-2 flex flex-col w-full lg:flex-1 lg:min-h-0 shrink-0"
        style={{ background: "linear-gradient(135deg, #09090e 0%, #0a0a12 100%)" }}
      >
        <div
          className="flex flex-wrap items-center gap-x-2 gap-y-2 px-4 sm:px-6 py-3 border-b border-white/15 shrink-0"
          style={{ background: "rgba(16,16,30,0.95)" }}
        >
          <Home size={13} className="text-[#d4aa50] shrink-0" />
          <span className="text-white text-xs sm:text-sm font-light min-w-0">
            {group} · {variant.sqft} sq.ft · {variant.facing}
          </span>
          <span className="text-[#8898c0] text-[10px] sm:text-xs shrink-0">Flat {variant.flatNos}</span>
          <div
            className="sm:ml-auto px-2.5 sm:px-3 py-1 rounded-full shrink-0"
            style={{ background: "rgba(212,170,80,0.1)", border: "1px solid rgba(212,170,80,0.25)" }}
          >
            <span className="text-[#d4aa50] text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase">
              RERA
            </span>
          </div>
        </div>

        <div className="relative w-full h-[min(58vh,480px)] min-h-[300px] lg:flex-1 lg:min-h-[320px] lg:h-auto bg-[#08080f]">
          <AnimatePresence mode="wait">
            <motion.div
              key={variant.id}
              className="absolute inset-0 flex items-center justify-center p-2 sm:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease }}
            >
              <Image
                src={variant.image}
                alt={`${group} ${variant.sqft} sqft floor plan – ${variant.facing} facing`}
                width={1200}
                height={900}
                className="max-h-full max-w-full w-auto h-auto object-contain"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
                unoptimized
              />
            </motion.div>
          </AnimatePresence>
          <p className="absolute bottom-2 left-0 right-0 text-center text-[#606080] text-[9px] tracking-wider pointer-events-none lg:hidden">
            Pinch to zoom · scroll for options below
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 border-t border-white/15 shrink-0"
          style={{ background: "rgba(16,16,30,0.95)" }}
        >
          <span className="text-[#7888a8] text-[10px] leading-relaxed">
            G+4 · 20 flats/floor · 54 units for sale
          </span>
          <div className="sm:ml-auto flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-[10px] font-medium">54 available</span>
          </div>
        </div>
      </div>

      {/* ── Configurator (below plan on mobile, left on desktop) ── */}
      <div
        className="order-2 lg:order-1 w-full lg:w-[272px] shrink-0 flex flex-col border-t lg:border-t-0 lg:border-r border-white/15"
        style={{ background: "linear-gradient(180deg, #111126 0%, #0d0d1e 50%, #0a0a18 100%)" }}
      >
        <div className="px-4 sm:px-5 pt-5 pb-4 border-b border-white/10">
          <p className="text-[#f0c84a] text-[10px] tracking-[0.35em] uppercase mb-1">Configurator</p>
          <h2 className="text-white text-base sm:text-lg font-semibold tracking-wide">Choose Your Residence</h2>
        </div>

        <div className="px-4 pt-4 pb-3">
          <p className="text-[#8898c0] text-[9px] tracking-[0.3em] uppercase mb-2.5">Flat Type</p>
          <div className="grid grid-cols-3 gap-1.5">
            {(["2BHK", "2.5BHK", "3BHK"] as GroupId[]).map((g) => (
              <motion.button
                key={g}
                onClick={() => { setGroup(g); setVarIdx(0); }}
                className="py-2.5 rounded-xl text-xs font-semibold tracking-wide"
                style={group === g
                  ? { background: "rgba(224,184,78,0.22)", border: "1px solid rgba(224,184,78,0.6)", color: "#f0c84a", boxShadow: "0 0 14px rgba(224,184,78,0.18)" }
                  : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#8080b0" }}
                whileTap={{ scale: 0.97 }}
              >
                {g}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="px-4 pb-4">
          <p className="text-[#8898c0] text-[9px] tracking-[0.3em] uppercase mb-2">Configuration</p>
          <div className="space-y-1.5">
            {list.map((v, i) => (
              <motion.button
                key={v.id}
                onClick={() => setVarIdx(i)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left"
                style={varIdx === i
                  ? { background: "rgba(224,184,78,0.15)", border: "1px solid rgba(224,184,78,0.45)" }
                  : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}
                whileTap={{ scale: 0.99 }}
              >
                <div>
                  <p className={`text-xs font-medium ${varIdx === i ? "text-white" : "text-[#a0a0c8]"}`}>
                    {v.sqft} sq.ft · {v.facing}
                  </p>
                  <p className="text-[10px] text-[#5a5a80] mt-0.5">Flat {v.flatNos}</p>
                </div>
                {varIdx === i && <Check size={11} className="text-[#d4aa50] shrink-0" />}
              </motion.button>
            ))}
          </div>
        </div>

        <details className="px-4 pb-5 group lg:hidden" open>
          <summary className="text-[#8898c0] text-[9px] tracking-[0.3em] uppercase cursor-pointer list-none flex items-center justify-between py-1">
            Room Dimensions
            <span className="text-[#606080] text-[10px] normal-case tracking-normal group-open:hidden">Show</span>
            <span className="text-[#606080] text-[10px] normal-case tracking-normal hidden group-open:inline">Hide</span>
          </summary>
          <RoomDimensionsList variantId={variant.id} rooms={variant.rooms} />
        </details>

        <div className="hidden lg:block px-4 pb-3 flex-1 overflow-y-auto">
          <p className="text-[#8898c0] text-[9px] tracking-[0.3em] uppercase mb-2">Room Dimensions</p>
          <RoomDimensionsList variantId={variant.id} rooms={variant.rooms} />
        </div>
      </div>
    </div>
  );
}
