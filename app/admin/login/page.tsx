"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [password,  setPassword]  = useState("");
  const [showPass,  setShowPass]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);
    if (!res.ok) { setError("Incorrect password. Try again."); return; }
    router.push("/admin");
    router.refresh();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center text-[#f4f4f8]"
      style={{
        background:
          "radial-gradient(ellipse 100% 65% at 0% 100%, rgba(12,140,100,0.14) 0%, transparent 50%)," +
          "radial-gradient(ellipse 80% 55% at 100% 0%, rgba(220,160,20,0.12) 0%, transparent 45%)," +
          "#04040e",
      }}
    >
      <motion.div
        className="w-full max-w-sm px-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
            style={{
              background: "rgba(240,200,64,0.18)",
              border: "1.5px solid rgba(240,200,64,0.60)",
              boxShadow: "0 0 24px rgba(240,200,64,0.35), 0 0 60px rgba(240,200,64,0.12)",
            }}
          >
            <span className="text-[#f0c84a] text-sm font-bold tracking-widest">AA</span>
          </div>
          <p className="text-white text-lg font-semibold tracking-tight">Aryan Abode</p>
          <p className="text-[#8898c0] text-xs tracking-widest uppercase mt-1">Admin Access</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Lock size={14} className="text-[#f0c84a]" />
            <p className="text-[#8898c0] text-[11px] tracking-[0.25em] uppercase">Secure Login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[#a0acd0] text-[10px] tracking-[0.2em] uppercase block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                  className="w-full border rounded-xl px-4 py-3 pr-10 text-[#f0f0f4] text-sm font-light placeholder:text-[#4858a0] outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.14)" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(240,200,64,0.55)";
                    e.target.style.boxShadow   = "0 0 0 3px rgba(240,200,64,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.14)";
                    e.target.style.boxShadow   = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5868a0] hover:text-[#8898c0] transition-colors"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                className="text-red-400 text-xs text-center"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={!password || loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold tracking-[0.12em] uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #e0b84e, #f5d060)",
                color: "#050508",
                boxShadow: "0 4px 20px rgba(224,184,78,0.40)",
              }}
              whileHover={!loading && password ? { scale: 1.02, boxShadow: "0 4px 28px rgba(224,184,78,0.60)" } : {}}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? "Verifying…" : (
                <>Enter Dashboard <ArrowRight size={14} /></>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-[#3a4870] text-[11px] text-center mt-6">
          Aryan Abode · Admin · Secured
        </p>
      </motion.div>
    </div>
  );
}
