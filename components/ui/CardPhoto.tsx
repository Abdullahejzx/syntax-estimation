/* eslint-disable @next/next/no-img-element -- static export; photos are pre-sized WebP files */
import { type PhotoKey, photo } from "@/lib/images";
import { cn } from "@/lib/cn";

/**
 * Photo at the top of a card. Zooms slightly when the surrounding `group` card is hovered.
 * Decorative by default (the card's heading names it); pass `describe` to announce the alt text.
 */
export function CardPhoto({
  image,
  className,
  ratio = "aspect-[16/10]",
  describe,
  children,
}: {
  image: PhotoKey;
  className?: string;
  /** Tailwind aspect-ratio class */
  ratio?: string;
  describe?: boolean;
  /** Overlay content, e.g. an icon badge */
  children?: React.ReactNode;
}) {
  const { src, alt } = photo(image, "sm");
  return (
    <div className={cn("relative overflow-hidden bg-navy", ratio, className)}>
      <img
        src={src}
        alt={describe ? alt : ""}
        width={800}
        height={520}
        loading="lazy"
        decoding="async"
        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
      {children}
    </div>
  );
}
