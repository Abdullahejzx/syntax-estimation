import { cn } from "@/lib/cn";

const tones = {
  white: "bg-white",
  mist: "bg-mist",
  navy: "bg-navy text-navy-200",
} as const;

type SectionProps = {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  id?: string;
  className?: string;
  /** Accessible name for the region, usually the id of the section's heading */
  labelledBy?: string;
};

/** Full-width page band with the design's vertical rhythm (64px mobile, 80px desktop). */
export function Section({ children, tone = "white", id, className, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative w-full py-16 lg:py-20", tones[tone], className)}
    >
      {children}
    </section>
  );
}
