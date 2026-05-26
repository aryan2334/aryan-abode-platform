"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  staggerChildren = 0.04,
  once = true,
  as: Tag = "h2",
}: AnimatedTextProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.div
      className={cn("flex flex-wrap gap-x-[0.3em]", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={child}
          style={{ display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

interface AnimatedLineProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function AnimatedLine({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedLineProps) {
  const dirMap = {
    up: { y: 32, x: 0 },
    down: { y: -32, x: 0 },
    left: { y: 0, x: 32 },
    right: { y: 0, x: -32 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...dirMap[direction], filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      {children}
    </motion.div>
  );
}
