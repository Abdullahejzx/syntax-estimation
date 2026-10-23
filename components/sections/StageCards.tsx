import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export type Stage = {
  badge: string;
  title: string;
  subtitle?: string;
  text: string;
  metricLabel: string;
  metricValue: string;
  /** 0–100; draws a small bar under the metric */
  progress?: number;
  /** Highlights the card and appends this label to its badge, e.g. "Most requested" */
  featured?: string;
};

type StageCardsProps = {
  items: Stage[];
  eyebrow?: string;
  title: string;
  intro?: string;
  id?: string;
  tone?: "white" | "mist";
};

/** Four milestone / package cards with a badge, metric and optional progress bar. */
export function StageCards({ items, eyebrow, title, intro, id = "stages", tone = "mist" }: StageCardsProps) {
  return (
    <Section id={id} tone={tone} labelledBy={`${id}-title`}>
      <Container>
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} eyebrowStyle="chip" title={title} intro={intro} />
        <ol className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((stage, i) => (
            <Reveal as="li" key={stage.title} delay={i * 0.07} className="flex">
              <article
                className={cn(
                  "relative flex w-full flex-col rounded-xl border bg-white p-6 pt-8",
                  stage.featured ? "border-accent shadow-lift" : "border-line shadow-card",
                )}
              >
                <span
                  className={cn(
                    "absolute -top-3 left-6 rounded px-2 py-1 text-[0.6875rem] font-bold uppercase tracking-wide",
                    stage.featured ? "bg-accent text-navy" : "bg-navy text-white",
                  )}
                >
                  {stage.badge}
                  {stage.featured && ` · ${stage.featured}`}
                </span>
                <h3 className="text-headline-sm font-bold">{stage.title}</h3>
                {stage.subtitle && <p className="mt-0.5 text-caption font-semibold text-blueprint-ink">{stage.subtitle}</p>}
                <p className="mt-3 text-body-sm sm:text-body-md">{stage.text}</p>
                <div className="mt-auto pt-6">
                  <div className="flex items-baseline justify-between gap-3 border-t border-line pt-4">
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-body">{stage.metricLabel}</span>
                    <span className="tabular font-display text-[0.9375rem] font-bold text-navy">{stage.metricValue}</span>
                  </div>
                  {stage.progress !== undefined && (
                    <div aria-hidden="true" className="mt-3 h-1.5 overflow-hidden rounded-full bg-blue-50">
                      <div
                        className={cn("h-full rounded-full", stage.featured ? "bg-accent" : "bg-blueprint")}
                        style={{ width: `${stage.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
