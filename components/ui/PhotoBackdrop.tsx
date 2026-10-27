/* eslint-disable @next/next/no-img-element -- static export; photos are pre-sized WebP files */
import { type PhotoKey, photo } from "@/lib/images";
import { cn } from "@/lib/cn";

type PhotoBackdropProps = {
  image: PhotoKey;
  /** Set for the photo at the top of the page so it loads first */
  priority?: boolean;
  /** "left" darkens the text side most (heroes); "even" for centered text (CTA bands) */
  fade?: "left" | "even";
  className?: string;
};

/**
 * Full-bleed construction photo behind a section, under a navy overlay and a faint
 * blueprint grid so white text stays readable (WCAG AA) on any part of the photo.
 * Place inside a `relative overflow-hidden` section.
 */
export function PhotoBackdrop({ image, priority, fade = "left", className }: PhotoBackdropProps) {
  const { src } = photo(image, "lg");
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <img
        src={src}
        alt=""
        width={1600}
        height={900}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="size-full object-cover"
      />
      <div
        className={cn(
          "absolute inset-0",
          fade === "left"
            ? "bg-gradient-to-b from-navy/70 via-navy/75 to-navy/90 lg:bg-gradient-to-r lg:from-navy/90 lg:via-navy/65 lg:to-navy/25"
            : "bg-navy/75",
        )}
      />
      <div className="bg-blueprint-grid-light absolute inset-0 opacity-50" />
    </div>
  );
}
