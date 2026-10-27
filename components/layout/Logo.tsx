import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Placeholder logo: an "A" drawn like a roof truss, with an orange tie beam, plus the wordmark.
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
        <path d="M8.5 24 16 8.5 23.5 24" fill="none" stroke={inverted ? "#0b2545" : "#ffffff"} strokeWidth="2.6" strokeLinejoin="miter" />
        <path d="M11.6 18.5h8.8" stroke="#f28c28" strokeWidth="2.6" />
      </svg>
      <span
        className={cn(
          "font-display text-[1.0625rem] font-bold leading-tight tracking-tight whitespace-nowrap",
          inverted ? "text-white" : "text-navy",
        )}
      >
        Arvex <span className="font-semibold">Designs</span>
      </span>
    </Link>
  );
}
