import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type IconTileProps = {
  icon: LucideIcon;
  tone?: "blue" | "accent" | "navy";
  size?: "md" | "sm";
  className?: string;
};

const tones = {
  blue: "bg-blue-50 text-blueprint-ink",
  accent: "bg-accent-50 text-accent-ink",
  navy: "bg-navy text-white",
};

/** Rounded square holding a line icon, used at the top of cards. */
export function IconTile({ icon: Icon, tone = "blue", size = "md", className }: IconTileProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg",
        size === "md" ? "size-11" : "size-9",
        tones[tone],
        className,
      )}
    >
      <Icon className={size === "md" ? "size-[22px]" : "size-[18px]"} strokeWidth={1.75} />
    </span>
  );
}
