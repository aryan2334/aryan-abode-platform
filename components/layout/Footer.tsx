"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, Link, ExternalLink } from "lucide-react";

const footerLinks = {
  Project: ["Overview", "Residences", "Amenities", "Master Plan"],
  Connect: ["Schedule Visit", "AI Concierge", "Virtual Tour", "Brochure"],
  Legal: ["Privacy Policy", "Terms of Use", "RERA", "Disclaimer"],
};

export function Footer() {
  return (
    <footer className="relative bg-[#050508] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #c9a84c 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/40 flex items-center justify-center">
                  <span className="text-[#c9a84c] text-sm font-bold tracking-widest">AA</span>
                </div>
                <span className="text-[#f0f0f4] font-light tracking-[0.2em] text-base uppercase">
                  Aryan Abode
                </span>
              </div>
              <p className="text-[#5c5c6e] text-sm leading-relaxed max-w-xs font-light">
                Where the future lives. Premium residences in Visakhapatnam&apos;s most connected growth corridor.
              </p>
              <div className="flex gap-4 mt-6">
                {[Globe, Link, ExternalLink].map((Icon, i) => (
                  <motion.button
                    key={i}
                    className="w-9 h-9 rounded-full glass flex items-center justify-center text-[#5c5c6e] hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={15} />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
            >
              <h3 className="text-[#c9a84c] text-xs font-semibold tracking-[0.3em] uppercase mb-5">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#5c5c6e] hover:text-[#a8a8b4] text-sm font-light transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact row */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6 text-[#5c5c6e] text-xs">
            <span className="flex items-center gap-2">
              <MapPin size={12} className="text-[#c9a84c]" />
              Bheemunipatnam, Visakhapatnam, AP
            </span>
            <span className="flex items-center gap-2">
              <Phone size={12} className="text-[#c9a84c]" />
              +91 98765 43210
            </span>
            <span className="flex items-center gap-2">
              <Mail size={12} className="text-[#c9a84c]" />
              hello@aryanabode.in
            </span>
          </div>
          <p className="text-[#3a3a4a] text-xs">
            © 2025 Aryan Abode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
