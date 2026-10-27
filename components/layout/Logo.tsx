import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Placeholder logo: a "B" drawn with drafting strokes and an orange center line, plus the wordmark.
 * TODO: replace with the real logo file (SVG preferred) when available. The same mark is
 * repeated in app/icon.svg (favicon) and components/seo/OgImage.tsx (share images).
 */
export function Logo({ inverted, className, onClick }: { inverted?: boolean; className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.name} home`}
      className={cn("inline-flex min-h-11 items-center gap-2.5", className)}
    >
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill={inverted ? "#ffffff" : "#0b2545"} />
        <path
          d="M10.5 15.5V8h6.5a3.75 3.75 0 0 1 0 7.5M17.5 15.5a4.25 4.25 0 0 1 0 8.5h-7v-8.5"
          fill="none"
          stroke={inverted ? "#0b2545" : "#ffffff"}
          strokeWidth="2.6"
        />
        <path d="M10.5 15.5h7" stroke="#f28c28" strokeWidth="2.6" />
      </svg>
      <span
        className={cn(
          "font-display text-[1.0625rem] font-bold leading-tight tracking-tight whitespace-nowrap",
          inverted ? "text-white" : "text-navy",
        )}
      >
        Bidnora <span className="font-semibold">Engineering</span>
      </span>
    </Link>
  );
}
