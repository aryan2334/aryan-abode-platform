"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Phone, Check, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const timeSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "4:30 PM", "6:00 PM"];

export function SiteVisitCTASection() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", date: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setSubmitted(true);
  };

  return (
    <SectionWrapper id="site-visit" className="py-28 bg-[#08080e]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,76,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 grid-overlay opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <motion.p
              className="text-[#c9a84c] text-xs font-semibold tracking-[0.35em] uppercase mb-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              Site Visit
            </motion.p>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#f0f0f4] leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              Experience It
              <br />
              <span className="text-gradient-gold">In Person</span>
            </motion.h2>
            <motion.p
              className="text-[#a8a8b4] text-lg font-light leading-relaxed mb-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              Numbers tell a story. But standing in your future home — with the sea breeze and
              city skyline visible from your balcony — that&apos;s when the decision becomes easy.
            </motion.p>

            {/* Visit features */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {[
                { icon: MapPin, text: "Complimentary pickup from Vizag city" },
                { icon: CalendarDays, text: "2-hour curated site experience" },
                { icon: Phone, text: "Dedicated relationship manager" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 glass rounded-xl px-4 py-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease }}
                >
                  <div className="w-8 h-8 rounded-lg glass-gold flex items-center justify-center shrink-0">
                    <item.icon size={14} className="text-[#c9a84c]" />
                  </div>
                  <span className="text-[#a8a8b4] text-sm font-light">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — Booking form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            {!submitted ? (
              <div className="glass rounded-3xl p-8 md:p-10">
                <h3 className="text-[#f0f0f4] text-xl font-light mb-2">Book Your Visit</h3>
                <p className="text-[#5c5c6e] text-sm font-light mb-8">
                  Select a date and time slot that works for you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="text-[#5c5c6e] text-xs tracking-[0.2em] uppercase block mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-white/[0.03] border border-white/08 rounded-xl px-4 py-3 text-[#f0f0f4] text-sm font-light placeholder:text-[#3a3a4a] outline-none focus:border-[#c9a84c]/40 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-[#5c5c6e] text-xs tracking-[0.2em] uppercase block mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 00000 00000"
                      className="w-full bg-white/[0.03] border border-white/08 rounded-xl px-4 py-3 text-[#f0f0f4] text-sm font-light placeholder:text-[#3a3a4a] outline-none focus:border-[#c9a84c]/40 transition-colors"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="text-[#5c5c6e] text-xs tracking-[0.2em] uppercase block mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/08 rounded-xl px-4 py-3 text-[#f0f0f4] text-sm font-light outline-none focus:border-[#c9a84c]/40 transition-colors [color-scheme:dark]"
                    />
                  </div>

                  {/* Time slots */}
                  <div>
                    <label className="text-[#5c5c6e] text-xs tracking-[0.2em] uppercase block mb-3">
                      Preferred Time
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <motion.button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className="py-2.5 rounded-xl text-xs font-light transition-all duration-200"
                          style={
                            selectedSlot === slot
                              ? {
                                  background: "rgba(201,168,76,0.15)",
                                  border: "1px solid rgba(201,168,76,0.4)",
                                  color: "#c9a84c",
                                }
                              : {
                                  background: "rgba(255,255,255,0.03)",
                                  border: "1px solid rgba(255,255,255,0.06)",
                                  color: "#5c5c6e",
                                }
                          }
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {slot}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={!selectedSlot}
                    className="w-full py-4 rounded-2xl text-sm font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, #c9a84c, #e8c97d)",
                      color: "#050508",
                    }}
                    whileHover={selectedSlot ? { scale: 1.02 } : {}}
                    whileTap={selectedSlot ? { scale: 0.98 } : {}}
                  >
                    Confirm Site Visit
                    <ArrowRight size={14} />
                  </motion.button>
                </form>
              </div>
            ) : (
              <motion.div
                className="glass-gold rounded-3xl p-10 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/30 flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                >
                  <Check size={28} className="text-[#c9a84c]" />
                </motion.div>
                <h3 className="text-[#f0f0f4] text-2xl font-light mb-3">
                  Visit Confirmed!
                </h3>
                <p className="text-[#a8a8b4] font-light leading-relaxed mb-2">
                  Thank you, <span className="text-[#c9a84c]">{formData.name}</span>.
                </p>
                <p className="text-[#5c5c6e] text-sm font-light">
                  We&apos;ll call you on{" "}
                  <span className="text-[#a8a8b4]">{formData.phone}</span> to confirm
                  your {selectedSlot} visit on {formData.date}.
                </p>
                <div className="mt-8 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />
                <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase mt-6 font-light">
                  See you at Aryan Abode
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
