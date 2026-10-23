import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Used as the heading's id so the parent Section can reference it */
  id?: string;
  align?: "center" | "left";
  /** Light text for navy sections */
  inverted?: boolean;
  className?: string;
};

/** Small uppercase overline used above section titles. */
export function Eyebrow({ children, inverted, className }: { children: React.ReactNode; inverted?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "block font-sans text-caption font-bold uppercase tracking-[0.12em]",
        inverted ? "text-accent" : "text-accent-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "center",
  inverted,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex max-w-3xl flex-col gap-2 lg:mb-12",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && <Eyebrow inverted={inverted}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={cn(
          "text-headline-xl-mobile font-bold lg:text-headline-xl",
          inverted && "text-white",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("text-body-md sm:text-body-lg", inverted ? "text-navy-200" : "text-body")}>
          {intro}
        </p>
      )}
    </div>
  );
}
