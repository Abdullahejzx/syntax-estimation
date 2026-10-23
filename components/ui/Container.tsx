import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** "default" = 1280px, "narrow" = 896px (FAQ, CTA bands) */
  size?: "default" | "narrow";
};

/** Centered page column: 16px side padding on mobile, 24px from 640px up. */
export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        size === "default" ? "max-w-7xl" : "max-w-4xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
