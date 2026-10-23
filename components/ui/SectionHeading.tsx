import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  /** "text" = orange overline (home page), "chip" = blue pill (service and trade pages) */
  eyebrowStyle?: "text" | "chip";
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
export function Eyebrow({
  children,
  inverted,
  variant = "text",
  className,
}: {
  children: React.ReactNode;
  inverted?: boolean;
  variant?: "text" | "chip";
  className?: string;
}) {
  if (variant === "chip") {
    return (
      <span
        className={cn(
          "inline-block w-fit rounded px-2.5 py-1 font-sans text-caption font-semibold uppercase tracking-[0.1em]",
          inverted ? "border border-white/20 bg-navy-800 text-accent" : "bg-blue-50 text-blueprint-ink",
          className,
        )}
      >
        {children}
      </span>
    );
  }
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
  eyebrowStyle = "text",
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
      {eyebrow && (
        <Eyebrow inverted={inverted} variant={eyebrowStyle} className={eyebrowStyle === "chip" ? "mb-1" : undefined}>
          {eyebrow}
        </Eyebrow>
      )}
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
