"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw, Download, Users, Calendar, Phone, TrendingUp,
  ArrowUpRight, ArrowDownRight, LogOut,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  experience: string;
  visit_date: string;
  visit_time: string;
  created_at: string;
}

function exportCSV(leads: Lead[]) {
  const headers = ["Name", "Phone", "Experience", "Visit Date", "Visit Time", "Submitted At"];
  const rows = leads.map((l) => [
    l.name, l.phone, l.experience, l.visit_date, l.visit_time,
    new Date(l.created_at).toLocaleString("en-IN"),
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `aryan-abode-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function weekCount(leads: Lead[]) {
  const cutoff = new Date(Date.now() - 7 * 86_400_000);
  return leads.filter((l) => new Date(l.created_at) > cutoff).length;
}

const EXPERIENCE_STYLE: Record<string, { bg: string; border: string; text: string }> = {
  "Site Visit":      { bg: "rgba(96,165,250,0.14)",  border: "rgba(96,165,250,0.32)",  text: "#60a5fa" },
  "Virtual Consult": { bg: "rgba(192,132,252,0.14)", border: "rgba(192,132,252,0.32)", text: "#c084fc" },
};

export default function AdminLeads() {
  const [leads,       setLeads]       = useState<Lead[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  };

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads");
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      setLeads(await res.json());
      setLastRefresh(new Date());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    return () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };
  }, [fetchLeads]);

  const siteVisits      = leads.filter((l) => l.experience === "Site Visit").length;
  const virtualConsults = leads.filter((l) => l.experience === "Virtual Consult").length;
  const thisWeek        = weekCount(leads);
  const prevWeekCutoff  = new Date(Date.now() - 14 * 86_400_000);
  const prevWeek        = leads.filter((l) => {
    const d = new Date(l.created_at);
    return d > prevWeekCutoff && d <= new Date(Date.now() - 7 * 86_400_000);
  }).length;
  const weekDelta = thisWeek - prevWeek;

  const stats = [
    { icon: Users,     label: "Total Leads",      value: leads.length, color: "#f0c84a", sub: null },
    { icon: TrendingUp, label: "This Week",        value: thisWeek,    color: "#34d399", sub: weekDelta },
    { icon: Calendar,   label: "Site Visits",      value: siteVisits,  color: "#60a5fa", sub: null },
    { icon: Phone,      label: "Virtual Consults", value: virtualConsults, color: "#c084fc", sub: null },
  ];

  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  return (
    <div
      className="min-h-screen text-[#f4f4f8]"
      style={{
        background:
          "radial-gradient(ellipse 100% 65% at 0% 100%, rgba(12,140,100,0.12) 0%, transparent 50%)," +
          "radial-gradient(ellipse 80% 55% at 100% 0%, rgba(220,160,20,0.10) 0%, transparent 45%)," +
          "#04040e",
      }}
    >
      {/* ── Header ── */}
      <header
        className="border-b border-white/10 sticky top-0 z-30 backdrop-blur-xl"
        style={{ background: "rgba(8,8,20,0.90)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: "rgba(240,200,64,0.18)",
                border: "1.5px solid rgba(240,200,64,0.60)",
                boxShadow: "0 0 18px rgba(240,200,64,0.35)",
              }}
            >
              <span className="text-[#f0c84a] text-[10px] font-bold">AA</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold tracking-tight leading-none">Aryan Abode</p>
              <p className="text-[#8898c0] text-[11px] tracking-wider mt-0.5">Lead Dashboard</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {!loading && (
              <span className="text-[#6878a8] text-[10px] sm:text-xs w-full sm:w-auto sm:mr-auto order-first sm:order-none">
                Refreshed {lastRefresh.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
            <motion.button
              onClick={fetchLeads}
              disabled={loading}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs font-medium transition-all"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
              whileTap={{ scale: 0.97 }}
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              Refresh
            </motion.button>
            <motion.button
              onClick={() => exportCSV(leads)}
              disabled={leads.length === 0}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-40"
              style={{
                background: "linear-gradient(135deg, #e0b84e, #f5d060)",
                color: "#050508",
                boxShadow: "0 2px 14px rgba(224,184,78,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={13} />
              <span className="sm:hidden">CSV</span>
              <span className="hidden sm:inline">Export CSV</span>
            </motion.button>
            <motion.button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs font-medium transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
              whileTap={{ scale: 0.97 }}
              aria-label="Logout"
            >
              <LogOut size={13} className="text-[#8898c0]" />
              <span className="text-[#8898c0] hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 pb-10">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="rounded-2xl p-4 sm:p-5"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5, ease }}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                <s.icon size={16} style={{ color: s.color }} className="shrink-0" />
                <span className="text-[9px] sm:text-[10px] text-[#6878a8] uppercase tracking-wider text-right leading-tight">{s.label}</span>
              </div>
              <p className="text-2xl sm:text-4xl font-bold text-white tabular-nums">
                {loading ? <span className="text-[#3a3a6a]">—</span> : s.value}
              </p>
              {s.sub !== null && !loading && (
                <div className="flex items-center gap-1 mt-2">
                  {weekDelta >= 0
                    ? <ArrowUpRight size={12} className="text-emerald-400" />
                    : <ArrowDownRight size={12} className="text-red-400" />}
                  <span className={`text-[11px] ${weekDelta >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {weekDelta >= 0 ? "+" : ""}{weekDelta} vs last week
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── Leads table ── */}
        <motion.div
          className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease }}
        >
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 flex items-center justify-between gap-2">
            <p className="text-[#f0c84a] text-[10px] tracking-[0.25em] sm:tracking-[0.35em] uppercase">All Leads</p>
            <p className="text-[#6878a8] text-xs shrink-0">
              {loading ? "Loading…" : `${leads.length} ${leads.length === 1 ? "entry" : "entries"}`}
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                className="p-10 text-center"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                <p className="text-red-400 text-sm mb-2">Failed to load leads</p>
                <p className="text-[#6878a8] text-xs">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!error && !loading && leads.length === 0 && (
            <div className="p-20 text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: "rgba(240,200,64,0.10)", border: "1px solid rgba(240,200,64,0.20)" }}
              >
                <Users size={22} className="text-[#f0c84a]/60" />
              </div>
              <p className="text-[#8898c0] text-sm font-medium">No leads yet</p>
              <p className="text-[#4858a0] text-xs mt-1.5">
                Leads appear here once visitors book a site visit
              </p>
            </div>
          )}

          {!error && (loading || leads.length > 0) && (
            <>
            {/* Mobile: card list */}
            <div className="md:hidden divide-y divide-white/[0.06]">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="p-4 space-y-2">
                      <div className="h-4 w-32 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
                      <div className="h-3 w-24 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
                    </div>
                  ))
                : leads.map((lead, i) => {
                    const expStyle = EXPERIENCE_STYLE[lead.experience] ?? {
                      bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.2)", text: "#c0c8e0",
                    };
                    const submittedAt = new Date(lead.created_at);
                    return (
                      <motion.div
                        key={lead.id}
                        className="p-4 space-y-3"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.25, ease }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-white text-sm font-semibold">{lead.name}</p>
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0"
                            style={{
                              background: expStyle.bg,
                              border: `1px solid ${expStyle.border}`,
                              color: expStyle.text,
                            }}
                          >
                            {lead.experience}
                          </span>
                        </div>
                        <a href={`tel:${lead.phone}`} className="text-[#a0acd0] text-sm font-mono block">
                          {lead.phone}
                        </a>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-[#4858a0] text-[10px] uppercase tracking-wider mb-0.5">Visit</p>
                            <p className="text-[#c0c8e0]">{lead.visit_date}</p>
                            <p className="text-[#8898c0] font-mono">{lead.visit_time}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[#4858a0] text-[10px] uppercase tracking-wider mb-0.5">Submitted</p>
                            <p className="text-[#7888a8]">
                              {submittedAt.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                            </p>
                            <p className="text-[#4858a0] text-[10px]">
                              {submittedAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
            </div>

            {/* Desktop: table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.07]">
                    {["Name", "Phone", "Experience", "Visit Date", "Visit Time", "Submitted"].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-[10px] font-semibold text-[#7888b8] uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="border-b border-white/[0.05]">
                          {[140, 110, 90, 120, 80, 100].map((w, j) => (
                            <td key={j} className="px-6 py-4">
                              <div
                                className="h-3.5 rounded-lg animate-pulse"
                                style={{ width: w, background: "rgba(255,255,255,0.06)" }}
                              />
                            </td>
                          ))}
                        </tr>
                      ))
                    : leads.map((lead, i) => {
                        const expStyle = EXPERIENCE_STYLE[lead.experience] ?? {
                          bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.2)", text: "#c0c8e0",
                        };
                        const submittedAt = new Date(lead.created_at);
                        return (
                          <motion.tr
                            key={lead.id}
                            className="border-b border-white/[0.05] hover:bg-white/[0.03] transition-colors"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04, duration: 0.35, ease }}
                          >
                            <td className="px-6 py-4 text-sm text-white font-semibold">{lead.name}</td>
                            <td className="px-6 py-4 text-sm text-[#a0acd0] font-mono tracking-wider">{lead.phone}</td>
                            <td className="px-6 py-4">
                              <span
                                className="text-xs px-2.5 py-1 rounded-full font-medium"
                                style={{
                                  background: expStyle.bg,
                                  border: `1px solid ${expStyle.border}`,
                                  color: expStyle.text,
                                }}
                              >
                                {lead.experience}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-[#c0c8e0]">{lead.visit_date}</td>
                            <td className="px-6 py-4 text-sm text-[#c0c8e0] font-mono">{lead.visit_time}</td>
                            <td className="px-6 py-4">
                              <span className="text-xs text-[#7888a8]">
                                {submittedAt.toLocaleDateString("en-IN", {
                                  day: "numeric", month: "short", year: "numeric",
                                })}
                              </span>
                              <span className="text-[10px] text-[#4858a0] block">
                                {submittedAt.toLocaleTimeString("en-IN", {
                                  hour: "2-digit", minute: "2-digit",
                                })}
                              </span>
                            </td>
                          </motion.tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
            </>
          )}
        </motion.div>

        <p className="text-[#3a4870] text-[11px] text-center mt-8">
          Aryan Abode · Lead Dashboard · Data secured by Supabase
        </p>
      </main>
    </div>
  );
}
