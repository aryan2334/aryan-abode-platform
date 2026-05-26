"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Check, Car, Users, ChevronLeft, ChevronRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const timeSlots = ["9:30 AM", "11:00 AM", "12:30 PM", "2:00 PM", "3:30 PM", "5:00 PM"];
const experiences = [
  { id: "site", icon: Car, label: "Site Visit", sub: "2-hr tour with RM", duration: "2 hours" },
  { id: "digital", icon: Users, label: "Virtual Consult", sub: "Video call with expert", duration: "45 min" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  return { first, total };
}

export function BookingPanel() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [experience, setExperience] = useState("site");
  const [step, setStep] = useState<"pick" | "confirm" | "done">("pick");
  const [form, setForm] = useState({ name: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!canConfirm || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    const { error } = await supabase.from("leads").insert({
      name: form.name,
      phone: form.phone,
      experience: experiences.find((e) => e.id === experience)?.label ?? experience,
      visit_date: `${monthName} ${selectedDay}, ${year}`,
      visit_time: selectedSlot,
    });
    setSubmitting(false);
    if (error) { setSubmitError("Submission failed. Please try again."); return; }
    setStep("done");
  };

  const { first, total } = getCalendarDays(year, month);
  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDay(null);
  };

  const canConfirm = selectedDay !== null && selectedSlot !== null && form.name && form.phone;

  if (step === "done") {
    return (
      <div className="h-full min-h-screen flex items-center justify-center p-8">
        <motion.div
          className="max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease }}
        >
          <motion.div
            className="w-20 h-20 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/10 flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 }}
          >
            <Check size={32} className="text-[#c9a84c]" />
          </motion.div>
          <h2 className="text-3xl font-light text-[#f0f0f4] mb-3">Visit Confirmed!</h2>
          <p className="text-[#a8a8b4] font-light leading-relaxed mb-2">
            Thank you, <span className="text-[#c9a84c]">{form.name}</span>.
          </p>
          <p className="text-[#a0acd0] text-sm font-light">
            {monthName} {selectedDay}, {year} · {selectedSlot}
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent my-8" />
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase">See you at Aryan Abode</p>
          <motion.button
            onClick={() => { setStep("pick"); setSelectedDay(null); setSelectedSlot(null); setForm({ name: "", phone: "" }); }}
            className="mt-8 px-6 py-2 rounded-full border border-white/15 text-[#8898c0] text-xs hover:text-[#d0d8f0] transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            Book Another Visit
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen grid lg:grid-cols-[1fr_380px]">
      {/* ── Left: Calendar + Slots ── */}
      <div className="flex flex-col p-8 border-r border-white/12 overflow-y-auto" style={{ background: "rgba(10,10,24,0.6)" }}>
        <div className="mb-8">
          <p className="text-[#f0c84a] text-[10px] tracking-[0.35em] uppercase mb-1">Schedule</p>
          <h2 className="text-white text-2xl font-semibold tracking-tight">Book a Site Visit</h2>
        </div>

        {/* Experience selector */}
        <div className="mb-8">
          <p className="text-[#8898c0] text-[10px] tracking-[0.3em] uppercase mb-3">Experience Type</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {experiences.map((exp) => (
              <motion.button
                key={exp.id}
                onClick={() => setExperience(exp.id)}
                className="flex items-start gap-3 px-4 py-3 rounded-xl text-left transition-all"
                style={
                  experience === exp.id
                    ? { background: "rgba(224,184,78,0.18)", border: "1px solid rgba(224,184,78,0.45)", boxShadow: "0 0 16px rgba(224,184,78,0.12)" }
                    : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }
                }
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <exp.icon size={15} className={experience === exp.id ? "text-[#f0c84a]" : "text-[#7070a0]"} />
                <div>
                  <p className={`text-sm font-medium leading-none ${experience === exp.id ? "text-[#f0c84a]" : "text-[#c0c0d8]"}`}>{exp.label}</p>
                  <p className="text-[#8898c0] text-[10px] mt-1">{exp.sub}</p>
                  <p className="text-[#7888b0] text-[9px] mt-0.5">{exp.duration}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#f0f0f4] font-light">{monthName} {year}</p>
            <div className="flex gap-1">
              <button onClick={prevMonth} className="w-7 h-7 rounded-lg border border-white/15 flex items-center justify-center text-[#8080a8] hover:text-[#f0f0f4] transition-colors">
                <ChevronLeft size={13} />
              </button>
              <button onClick={nextMonth} className="w-7 h-7 rounded-lg border border-white/15 flex items-center justify-center text-[#8080a8] hover:text-[#f0f0f4] transition-colors">
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {DAYS.map((d) => (
              <div key={d} className="h-8 flex items-center justify-center text-[#7888b8] text-[10px] tracking-wider uppercase font-medium">{d}</div>
            ))}
            {Array.from({ length: first }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: total }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const isSelected = selectedDay === day;
              return (
                <motion.button
                  key={day}
                  disabled={isPast}
                  onClick={() => setSelectedDay(day)}
                  className="h-9 rounded-lg text-sm font-light transition-all disabled:opacity-25 disabled:cursor-not-allowed"
                  style={
                    isSelected
                      ? { background: "linear-gradient(135deg,#e0b84e,#f5d060)", color: "#050508", boxShadow: "0 0 12px rgba(224,184,78,0.4)" }
                      : isToday
                      ? { background: "rgba(224,184,78,0.16)", border: "1px solid rgba(224,184,78,0.4)", color: "#f0c84a" }
                      : { background: "rgba(255,255,255,0.04)", color: "#c0c0d8" }
                  }
                  whileHover={!isPast && !isSelected ? { background: "rgba(224,184,78,0.12)", scale: 1.05 } : {}}
                  whileTap={{ scale: 0.95 }}
                >
                  {day}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        <AnimatePresence>
          {selectedDay && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
            >
              <p className="text-[#8898c0] text-[10px] tracking-[0.3em] uppercase mb-3">
                Available Times · {monthName} {selectedDay}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {timeSlots.map((slot) => (
                  <motion.button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className="py-2.5 rounded-xl text-xs font-light transition-all"
                    style={
                      selectedSlot === slot
                        ? { background: "rgba(224,184,78,0.20)", border: "1px solid rgba(224,184,78,0.50)", color: "#f0c84a", boxShadow: "0 0 10px rgba(224,184,78,0.15)" }
                        : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "#9090b8" }
                    }
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {slot}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Right: Form ── */}
      <div className="flex flex-col p-7 overflow-y-auto" style={{ background: "rgba(12,12,26,0.5)" }}>
        <div className="mb-6">
          <p className="text-[#8898c0] text-[10px] tracking-[0.3em] uppercase mb-3">Your Details</p>
          <div className="space-y-4">
            {[
              { key: "name", label: "Full Name", placeholder: "Your name" },
              { key: "phone", label: "Phone Number", placeholder: "+91 00000 00000" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="text-[#a0acd0] text-[10px] tracking-[0.2em] uppercase block mb-2">{label}</label>
                <input
                  type={key === "phone" ? "tel" : "text"}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full border rounded-xl px-4 py-3 text-[#f0f0f4] text-sm font-light placeholder:text-[#5a5a80] outline-none transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.14)" }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(224,184,78,0.55)"; e.target.style.boxShadow = "0 0 0 3px rgba(224,184,78,0.08)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.14)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        {(selectedDay || selectedSlot || experience) && (
          <div className="rounded-2xl p-5 mb-6" style={{ background: "rgba(224,184,78,0.08)", border: "1px solid rgba(224,184,78,0.22)" }}>
            <p className="text-[#f0c84a] text-[10px] tracking-[0.3em] uppercase mb-4">Booking Summary</p>
            <div className="space-y-3">
              {[
                { label: "Experience", value: experiences.find(e => e.id === experience)?.label },
                { label: "Date", value: selectedDay ? `${monthName} ${selectedDay}, ${year}` : "Not selected" },
                { label: "Time", value: selectedSlot ?? "Not selected" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-[#8898c0] font-light">{label}</span>
                  <span className={value && value !== "Not selected" ? "text-white font-medium" : "text-[#6070a0]"}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Perks */}
        <div className="space-y-2.5 mb-6 flex-1">
          {["Complimentary pickup from Vizag city", "Dedicated relationship manager", "Exclusive pre-launch pricing access", "Refreshments & project brochure"].map((perk) => (
            <div key={perk} className="flex items-start gap-2.5 text-xs text-[#9090b8] font-light">
              <Check size={11} className="text-[#c9a84c] mt-0.5 shrink-0" />
              {perk}
            </div>
          ))}
        </div>

        <motion.button
          disabled={!canConfirm || submitting}
          onClick={handleConfirm}
          className="w-full py-3.5 rounded-xl text-sm font-bold tracking-[0.15em] uppercase transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: canConfirm && !submitting ? "linear-gradient(135deg, #e0b84e, #f5d060)" : "rgba(201,168,76,0.2)", color: canConfirm && !submitting ? "#050508" : "#5c5c6e" }}
          whileHover={canConfirm && !submitting ? { scale: 1.02 } : {}}
          whileTap={canConfirm && !submitting ? { scale: 0.98 } : {}}
        >
          {submitting ? "Submitting…" : "Confirm Site Visit"}
        </motion.button>
        {submitError && <p className="text-red-400 text-[11px] text-center mt-2">{submitError}</p>}
        <p className="text-[#7888b0] text-[10px] text-center mt-3">We&apos;ll confirm within 2 hours via SMS</p>
      </div>
    </div>
  );
}
