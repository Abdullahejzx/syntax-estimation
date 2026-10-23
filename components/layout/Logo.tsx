import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Placeholder logo: an "S" drawn from drafting lines plus the wordmark.
 * TODO: replace with the real logo file (SVG preferred) when available.
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
          d="M23 10.5H9.5v5.5h13v5.5H9"
          fill="none"
          stroke={inverted ? "#0b2545" : "#ffffff"}
          strokeWidth="2.4"
          strokeLinecap="square"
        />
        <circle cx="23" cy="21.5" r="2.2" fill="#f28c28" />
      </svg>
      <span
        className={cn(
          "font-display text-[1.0625rem] font-bold leading-tight tracking-tight",
          inverted ? "text-white" : "text-navy",
        )}
      >
        Syntax <span className="font-semibold">Estimation</span>
      </span>
    </Link>
  );
}
