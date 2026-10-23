"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds; use small steps (e.g. index * 0.06) to stagger cards in a grid */
  delay?: number;
  /** Starting vertical offset in px */
  y?: number;
  as?: "div" | "li";
};

/**
 * Fades and slides content up the first time it scrolls into view.
 * For reduced-motion visitors, MotionProvider drops the slide and keeps only a short fade.
 */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: RevealProps) {
  const Component = as === "li" ? motion.li : motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}
