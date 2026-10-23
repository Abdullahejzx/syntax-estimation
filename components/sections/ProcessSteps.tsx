import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Step = { title: string; text: string; icon?: LucideIcon };

type ProcessStepsProps = {
  steps: Step[];
  eyebrow?: string;
  title: string;
  intro?: string;
  id?: string;
  tone?: "white" | "mist";
  /** Index of the step drawn in orange to mark where the main work happens */
  highlight?: number;
};

/** Numbered process cards, joined by a dashed line on desktop. */
export function ProcessSteps({ steps, eyebrow, title, intro, id, tone = "white", highlight = 2 }: ProcessStepsProps) {
  const headingId = `${id ?? "process"}-title`;
  return (
    <Section id={id} tone={tone} labelledBy={headingId}>
      <Container>
        <SectionHeading id={headingId} eyebrow={eyebrow} title={title} intro={intro} />
        <ol
          className={cn(
            "relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6",
            steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5",
          )}
        >
          <span
            aria-hidden="true"
            className="absolute top-11 right-[12%] left-[12%] hidden border-t-2 border-dashed border-line-strong lg:block"
          />
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="relative">
              <div className="flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-card">
                <span
                  className={cn(
                    "mb-4 inline-flex size-10 items-center justify-center rounded-full font-display text-headline-sm font-bold",
                    i === highlight ? "bg-accent text-navy" : "bg-navy text-white",
                  )}
                >
                  {i + 1}
                </span>
                <h3 className="mb-2 text-headline-sm font-bold">{step.title}</h3>
                <p className="text-body-sm sm:text-body-md">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
