import { BadgeCheck, FileSpreadsheet, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";

export type MarkupZone = { label: string; detail: string };

type ProcessTimelineProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  steps: { title: string; text: string }[];
  /** Three labelled areas drawn on the plan mock-up */
  zones: [MarkupZone, MarkupZone, MarkupZone];
  sheetLabel?: string;
  tone?: "white" | "mist";
};

/** Color-coded plan sheet, the visual beside the process timeline. */
function PlanMarkup({ zones, sheetLabel }: { zones: ProcessTimelineProps["zones"]; sheetLabel: string }) {
  const zoneStyles = [
    "border-blueprint bg-blueprint/25",
    "border-accent bg-accent/20",
    "border-[#38bdf8] bg-[#38bdf8]/15",
  ];
  return (
    <figure className="rounded-xl border border-line bg-white p-4 shadow-lift sm:p-5">
      <figcaption className="mb-4 flex items-center justify-between gap-3 border-b border-line pb-3 text-caption">
        <span className="flex items-center gap-2 font-semibold uppercase tracking-wider text-navy">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-accent" />
          {sheetLabel}
        </span>
        <span className="font-medium text-blueprint-ink">Scale 1/4&quot; = 1&apos;-0&quot;</span>
      </figcaption>
      <div className="bg-blueprint-grid-light relative rounded-lg bg-navy p-4 pl-8 sm:p-6 sm:pl-10">
        <span aria-hidden="true" className="absolute top-1/2 left-2 -translate-y-1/2 -rotate-90 font-mono text-[0.625rem] text-navy-200 sm:left-3">
          52&apos;-0&quot;
        </span>
        <p aria-hidden="true" className="mb-2 border-b border-navy-300/50 pb-1 text-center font-mono text-[0.625rem] text-navy-200">
          74&apos;-6&quot;
        </p>
        <div className="grid grid-cols-2 gap-2 border-2 border-dashed border-white/60 p-2 sm:gap-3 sm:p-3">
          {zones.map((zone, i) => (
            <div
              key={zone.label}
              className={cn("rounded border-2 p-2.5 sm:p-3", zoneStyles[i], i === 2 ? "col-span-2 min-h-20" : "min-h-24")}
            >
              <p className="text-[0.6875rem] font-bold uppercase text-white sm:text-caption">{zone.label}</p>
              <p className="mt-0.5 text-[0.6875rem] text-navy-200">{zone.detail}</p>
            </div>
          ))}
        </div>
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[0.6875rem] font-semibold text-navy shadow-card sm:right-4 sm:bottom-4">
          <BadgeCheck aria-hidden="true" className="size-3.5 text-accent-ink" />
          QA checked
        </span>
      </div>
      <div className="mt-3 flex flex-wrap justify-between gap-2 text-caption text-body">
        <span className="flex items-center gap-1.5">
          <ShieldCheck aria-hidden="true" className="size-4 text-blueprint-ink" />
          Layered vector PDF
        </span>
        <span className="flex items-center gap-1.5">
          <FileSpreadsheet aria-hidden="true" className="size-4 text-accent-ink" />
          Linked Excel quantities
        </span>
      </div>
    </figure>
  );
}

/** Numbered vertical timeline on the left, plan mark-up visual on the right (below on phones). */
export function ProcessTimeline({
  eyebrow = "How we work",
  title,
  intro,
  steps,
  zones,
  sheetLabel = "Plan markup · Sheet A-102",
  tone = "white",
}: ProcessTimelineProps) {
  return (
    <Section id="process" tone={tone} labelledBy="process-title">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow variant="chip" className="mb-3">
              {eyebrow}
            </Eyebrow>
            <h2 id="process-title" className="text-headline-xl-mobile font-bold lg:text-headline-xl">
              {title}
            </h2>
            {intro && <p className="mt-3 max-w-2xl sm:text-body-lg">{intro}</p>}

            <ol className="relative mt-10 space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[13px] before:w-px before:bg-line-strong">
              {steps.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 0.06} className="relative flex gap-4">
                  <span
                    className={cn(
                      "relative z-10 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-caption font-bold",
                      i === steps.length - 1 ? "bg-accent text-navy" : "bg-navy text-white",
                    )}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-headline-sm font-bold">{step.title}</h3>
                    <p className="mt-1 text-body-sm sm:text-body-md">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <PlanMarkup zones={zones} sheetLabel={sheetLabel} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
