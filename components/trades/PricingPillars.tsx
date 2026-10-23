import { ChartColumn, Construction, Truck, Users } from "lucide-react";
import type { Trade } from "@/content/trades";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pillarMeta = [
  { title: "Materials", icon: Truck },
  { title: "Labor", icon: Users },
  { title: "Equipment", icon: Construction },
  { title: "Overhead & Profit", icon: ChartColumn },
];

/** "How we price your bid": the four cost groups behind every trade estimate. */
export function PricingPillars({ data, tradeName }: { data: NonNullable<Trade["pricing"]>; tradeName: string }) {
  return (
    <Section id="pricing-method" tone="mist" labelledBy="pillars-title">
      <Container>
        <SectionHeading id="pillars-title" align="left" eyebrow="How we price" title={`How We Price Your ${tradeName} Bid`} intro={data.intro} />
        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {data.pillars.map((pillar, i) => (
            <Reveal as="li" key={pillarMeta[i].title} delay={i * 0.06}>
              <div className="card-lift flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-card">
                <IconTile icon={pillarMeta[i].icon} className="mb-4" />
                <p className="text-caption font-bold uppercase tracking-wider text-accent-ink">Cost group {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-headline-sm font-bold">{pillarMeta[i].title}</h3>
                <p className="mt-2 text-body-sm sm:text-body-md">{pillar.text}</p>
                <p className="mt-auto pt-5">
                  <span className="block rounded-md bg-blue-50 px-3 py-2 font-mono text-caption text-navy">{pillar.chip}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
