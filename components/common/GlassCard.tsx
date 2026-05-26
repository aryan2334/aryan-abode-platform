"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "gold" | "dark";
  hover?: boolean;
  delay?: number;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  variant = "default",
  hover = true,
  delay = 0,
  onClick,
}: GlassCardProps) {
  const variantClasses = {
    default: "glass",
    gold: "glass-gold",
    dark: "glass-dark",
  };

  return (
    <motion.div
      className={cn(
        "rounded-2xl overflow-hidden",
        variantClasses[variant],
        hover && "cursor-pointer",
        className
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        hover
          ? {
              y: -4,
              borderColor: "rgba(201,168,76,0.25)",
              transition: { duration: 0.3 },
            }
          : undefined
      }
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
