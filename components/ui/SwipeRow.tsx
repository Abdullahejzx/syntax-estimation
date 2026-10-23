import { cn } from "@/lib/cn";

type SwipeRowProps = {
  children: React.ReactNode;
  /** Grid classes applied from the breakpoint where the row stops swiping */
  gridClassName: string;
  /** Width of each slide while swiping */
  itemWidth?: string;
  className?: string;
  label?: string;
};

/**
 * A row that is a horizontal, snap-scrolling carousel on phones and a regular
 * grid from `md` up. Pure CSS: no JS, works with touch and trackpads.
 * Children should be wrapped in <SwipeItem>.
 */
export function SwipeRow({ children, gridClassName, className, label }: SwipeRowProps) {
  return (
    <div
      role={label ? "region" : undefined}
      aria-label={label}
      className={cn(
        // Bleed to the screen edge on mobile so slides peek in from the side
        "no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6",
        "md:mx-0 md:grid md:snap-none md:overflow-visible md:px-0 md:pb-0",
        gridClassName,
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SwipeItem({
  children,
  className,
  width = "w-[84%] xs:w-[78%] sm:w-[60%]",
}: {
  children: React.ReactNode;
  className?: string;
  width?: string;
}) {
  return <div className={cn("shrink-0 snap-start md:w-auto", width, className)}>{children}</div>;
}
