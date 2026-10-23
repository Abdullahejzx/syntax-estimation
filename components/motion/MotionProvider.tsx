"use client";

import { MotionConfig } from "framer-motion";

/** reducedMotion="user" turns off movement for visitors who ask their OS for reduced motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
