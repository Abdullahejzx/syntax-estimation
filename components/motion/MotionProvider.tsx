"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * LazyMotion keeps Framer Motion's animation engine out of the first page load: components
 * use the lightweight `m.div` (not `motion.div`) and the features arrive after hydration.
 * `strict` throws if a `motion.*` component sneaks back in.
 * reducedMotion="user" turns off movement for visitors who ask their OS for reduced motion.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
