import { Check, CircleCheck } from "lucide-react";
import { cn } from "@/lib/cn";

type CheckListProps = {
  items: React.ReactNode[];
  /** "check" = small tick, "circle" = circled tick for feature lists */
  variant?: "check" | "circle";
  className?: string;
};

export function CheckList({ items, variant = "check", className }: CheckListProps) {
  const Icon = variant === "check" ? Check : CircleCheck;
  return (
    <ul className={cn(variant === "check" ? "space-y-2" : "space-y-3", "text-body-sm text-ink sm:text-body-md", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <Icon
            aria-hidden="true"
            className={cn("mt-0.5 shrink-0 text-accent-ink", variant === "check" ? "size-4" : "size-[18px]")}
            strokeWidth={2.25}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
