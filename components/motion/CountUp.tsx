"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const easeOutQuint = (t: number) => 1 - (1 - t) ** 5;

/**
 * Counts up to `value` when scrolled into view. The final number is rendered on the
 * server, so crawlers and no-JS visitors always see the real figure. Plain
 * requestAnimationFrame keeps this out of the Framer Motion bundle.
 */
export function CountUp({ value, prefix = "", suffix = "", decimals = 0, duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = `${prefix}${format(value, decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const show = (n: number) => {
      el.textContent = `${prefix}${format(n, decimals)}${suffix}`;
    };
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / (duration * 1000));
          show(value * easeOutQuint(t));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    // Only reset to zero if the number is still off screen, so nothing visible flickers
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) show(0);
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      show(value);
    };
  }, [value, prefix, suffix, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {final}
    </span>
  );
}
