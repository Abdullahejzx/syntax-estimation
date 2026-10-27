"use client";

/* eslint-disable @next/next/no-img-element -- static export; photos are pre-sized WebP files */
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

export type HeroSlide = { image: string; label: string; title: string; text: string; href: string };

const INTERVAL = 6000;

type HeroSliderProps = {
  slides: HeroSlide[];
  /** Resolved photo URLs, in the same order as `slides` */
  images: string[];
  /** Static copy above the spotlight (eyebrow, H1, intro, buttons) */
  children: React.ReactNode;
  /** Right-hand column (the quote form) */
  aside: React.ReactNode;
  /** Full-width row under both columns (the stats) */
  footer?: React.ReactNode;
};

/**
 * The Home hero section: cross-fading background photos plus a horizontally sliding
 * "service spotlight" under the headline. Auto-advances every 6 s; pauses on hover,
 * keyboard focus, a hidden tab or the pause button; never auto-plays for visitors who
 * prefer reduced motion. Swipe on touch screens.
 */
export function HeroSlider({ slides, images, children, aside, footer }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      mq.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const playing = !paused && !userPaused && !reduced;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [playing, index, go]);

  const step = (delta: number) => {
    setInteracted(true);
    go(index + delta);
  };

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-navy pt-10 pb-10 text-navy-200 sm:pt-14 lg:py-20">
      {/* Background photos, cross-fading behind the whole hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            width={1600}
            height={900}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding="async"
            className={cn(
              "absolute inset-0 size-full object-cover transition-[opacity,transform] duration-[1200ms] ease-out motion-reduce:transition-none",
              i === index ? "scale-100 opacity-100" : "scale-105 opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/75 to-navy/90 lg:bg-gradient-to-r lg:from-navy/90 lg:via-navy/65 lg:to-navy/30" />
        <div className="bg-blueprint-grid-light absolute inset-0 opacity-50" />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col items-start gap-5 lg:col-span-7 lg:pt-4">
            {children}

            {/* Service spotlight carousel */}
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label="Our services"
              className="relative w-full max-w-xl overflow-hidden rounded-xl border border-white/15 bg-navy-950/55 backdrop-blur-sm"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
              }}
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
                touchX.current = null;
              }}
            >
              {/* Progress bar for the current slide */}
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-white/10">
                <div
                  key={`${index}-${playing}`}
                  className={cn("h-full bg-accent", playing ? "animate-[hero-progress_6s_linear_forwards]" : "w-full opacity-40")}
                />
              </div>

              <div aria-live={interacted ? "polite" : "off"} className="overflow-hidden">
                <ul
                  className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
                  style={{ transform: `translateX(-${index * 100}%)` }}
                >
                  {slides.map((slide, i) => (
                    <li
                      key={slide.label}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${i + 1} of ${count}: ${slide.label}`}
                      aria-hidden={i !== index}
                      inert={i !== index}
                      className="w-full shrink-0 p-5 sm:p-6"
                    >
                      <p className="text-caption font-bold uppercase tracking-[0.12em] text-accent">{slide.label}</p>
                      <p className="mt-1.5 font-display text-headline-sm font-bold text-white sm:text-headline-md">{slide.title}</p>
                      <p className="mt-1.5 text-body-sm text-navy-200">{slide.text}</p>
                      <Link
                        href={slide.href}
                        className="mt-3 inline-flex min-h-11 items-center gap-1 font-display text-[0.875rem] font-semibold text-white hover:text-accent"
                      >
                        Explore {slide.label} <ArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/10 px-3 py-2 sm:px-4">
                <div className="flex items-center gap-1">
                  {slides.map((slide, i) => (
                    <button
                      key={slide.label}
                      type="button"
                      onClick={() => {
                        setInteracted(true);
                        go(i);
                      }}
                      aria-label={`Show slide ${i + 1}: ${slide.label}`}
                      aria-current={i === index ? "true" : undefined}
                      className="group inline-flex size-11 items-center justify-center"
                    >
                      <span
                        className={cn(
                          "block h-1.5 rounded-full transition-all",
                          i === index ? "w-6 bg-accent" : "w-1.5 bg-white/40 group-hover:bg-white/70",
                        )}
                      />
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {!reduced && (
                    <button
                      type="button"
                      onClick={() => setUserPaused((p) => !p)}
                      aria-label={userPaused ? "Play slides" : "Pause slides"}
                      className="inline-flex size-11 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      {userPaused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous slide"
                    className="inline-flex size-11 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    <ChevronLeft aria-hidden="true" className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next slide"
                    className="inline-flex size-11 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    <ChevronRight aria-hidden="true" className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:col-span-5">{aside}</div>
        </div>
        {footer}
      </Container>
    </section>
  );
}
