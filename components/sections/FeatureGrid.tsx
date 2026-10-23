import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export type FeatureItem = {
  title: string;
  text: string;
  icon: LucideIcon;
  /** Optional footer row: a neutral label on the left, an orange tag on the right */
  metaLabel?: string;
  metaValue?: string;
};

type FeatureGridProps = {
  items: FeatureItem[];
  eyebrow?: string;
  eyebrowStyle?: "text" | "chip";
  title: string;
  intro?: string;
  id?: string;
  tone?: "white" | "mist";
};

/** Icon + title + text cards in a 3-column grid (1 column on phones). */
export function FeatureGrid({
  items,
  eyebrow,
  eyebrowStyle,
  title,
  intro,
  id = "features",
  tone = "mist",
}: FeatureGridProps) {
  const headingId = `${id}-title`;
  return (
    <Section id={id} tone={tone} labelledBy={headingId}>
      <Container>
        <SectionHeading id={headingId} eyebrow={eyebrow} eyebrowStyle={eyebrowStyle} title={title} intro={intro} />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 0.06}>
              <div className="card-lift flex h-full flex-col items-start rounded-lg border border-line bg-white p-6 shadow-card">
                <IconTile icon={item.icon} className="mb-4" />
                <h3 className="mb-2 text-headline-sm font-bold">{item.title}</h3>
                <p className="text-body-sm sm:text-body-md">{item.text}</p>
                {(item.metaLabel || item.metaValue) && (
                  <div className="mt-auto w-full pt-5">
                    <div className="flex items-center justify-between gap-3 border-t border-line pt-4 text-caption">
                      <span className="text-body">{item.metaLabel}</span>
                      <span className="text-right font-semibold text-accent-ink">{item.metaValue}</span>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
