"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const conversationFlow = [
  {
    role: "ai" as const,
    message: "Looking for a future-ready investment or a premium lifestyle?",
    delay: 0,
  },
  {
    role: "user" as const,
    message: "I want a 2.5 BHK with sea views and good appreciation.",
    delay: 1500,
  },
  {
    role: "ai" as const,
    message:
      "Perfect choice. Our 2.5 BHK units in Block C face the bay — with Bhogapuram Airport opening in 2026, current prices offer a 3× appreciation window. Want me to schedule a site visit?",
    delay: 3000,
  },
  {
    role: "user" as const,
    message: "What's the current price range?",
    delay: 5000,
  },
  {
    role: "ai" as const,
    message:
      "₹55L – ₹65L depending on floor and view. Pre-launch pricing closes in 18 days. I can lock your unit right now with just ₹1L.",
    delay: 6500,
  },
];

const quickPrompts = [
  "Compare 2BHK vs 3BHK",
  "Show payment plans",
  "RERA details",
  "Site visit slots",
];

export function AIConciergeSection() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  const startConversation = () => {
    if (hasStarted) return;
    setHasStarted(true);
    conversationFlow.forEach((msg, i) => {
      const baseDelay = msg.delay;
      setTimeout(() => {
        if (msg.role === "ai") {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setVisibleMessages((v) => v + 1);
          }, 900);
        } else {
          setVisibleMessages((v) => v + 1);
        }
      }, baseDelay);
    });
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [visibleMessages, isTyping]);

  return (
    <SectionWrapper id="ai-concierge" className="py-28 bg-[#08080e]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 70% 50%, rgba(120,100,220,0.04) 0%, transparent 70%)",
        }}
      />

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
              AI Concierge
            </motion.p>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#f0f0f4] leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              Your 24/7
              <br />
              <span className="text-gradient-gold">Property Expert</span>
            </motion.h2>
            <motion.p
              className="text-[#a8a8b4] text-lg font-light leading-relaxed mb-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              Our AI concierge understands your lifestyle, investment goals, and preferences — then
              curates the perfect unit, financing plan, and timeline for you. Instantly.
            </motion.p>

            <motion.div
              className="space-y-4 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {[
                "Personalized unit recommendations",
                "Real-time pricing & availability",
                "Investment ROI projections",
                "Instant appointment booking",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                  <span className="text-[#a8a8b4] text-sm font-light">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#e8c97d] text-[#050508] text-sm font-semibold tracking-[0.15em] uppercase glow-gold"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6, ease }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Sparkles size={16} />
              Start AI Conversation
              <ArrowRight size={14} />
            </motion.button>
          </div>

          {/* Right — Chat panel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute -inset-px rounded-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.02), rgba(201,168,76,0.2))",
              }}
            />

            <div className="relative glass rounded-3xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c9a84c]/30 to-[#c9a84c]/10 flex items-center justify-center">
                    <Bot size={18} className="text-[#c9a84c]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0f0f17]" />
                </div>
                <div>
                  <p className="text-[#f0f0f4] text-sm font-light">Aryan AI</p>
                  <p className="text-emerald-400 text-[10px] tracking-wide">Online · Responds instantly</p>
                </div>
                <div className="ml-auto flex gap-1.5">
                  {[1, 2, 3].map((d) => (
                    <motion.div
                      key={d}
                      className="w-1 h-4 rounded-full bg-[#c9a84c]/30"
                      animate={{ scaleY: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.2 }}
                    />
                  ))}
                </div>
              </div>

              {/* Chat messages */}
              <div ref={chatRef} className="h-72 overflow-y-auto px-5 py-5 space-y-4 scroll-smooth">
                {!hasStarted && (
                  <motion.div
                    className="flex items-center justify-center h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <button
                      onClick={startConversation}
                      className="text-center text-[#5c5c6e] text-sm font-light hover:text-[#a8a8b4] transition-colors"
                    >
                      <Bot size={32} className="mx-auto mb-2 text-[#c9a84c]/40" />
                      Click to start the conversation
                    </button>
                  </motion.div>
                )}

                {conversationFlow.slice(0, visibleMessages).map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {msg.role === "ai" && (
                      <div className="w-7 h-7 rounded-full bg-[#c9a84c]/15 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot size={13} className="text-[#c9a84c]" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm font-light leading-relaxed ${
                        msg.role === "ai"
                          ? "glass text-[#f0f0f4] rounded-tl-sm"
                          : "bg-[#c9a84c]/15 border border-[#c9a84c]/20 text-[#e8c97d] rounded-tr-sm"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      className="flex gap-2 justify-start"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="w-7 h-7 rounded-full bg-[#c9a84c]/15 flex items-center justify-center shrink-0">
                        <Bot size={13} className="text-[#c9a84c]" />
                      </div>
                      <div className="glass px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]/50"
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick prompts */}
              <div className="px-5 pb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    className="px-3 py-1.5 rounded-full glass border border-white/08 text-[#5c5c6e] text-[11px] hover:text-[#c9a84c] hover:border-[#c9a84c]/25 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-white/5 px-4 py-3 flex items-center gap-3">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask anything about Aryan Abode…"
                  className="flex-1 bg-transparent text-[#f0f0f4] text-sm font-light placeholder:text-[#3a3a4a] outline-none"
                />
                <motion.button
                  className="w-9 h-9 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c]/25 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={14} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
