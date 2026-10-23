import { Check } from "lucide-react";
import type { Trade } from "@/content/trades";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Market segments (e.g. Commercial / Multi-Family / Public Projects), each with its own anchor. */
export function Segments({ data }: { data: NonNullable<Trade["segments"]> }) {
  return (
    <Section id="markets" labelledBy="segments-title">
      <Container>
        <SectionHeading id="segments-title" eyebrow="Markets" title={data.title} intro={data.intro} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-8">
          {data.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.07}>
              <article id={item.id} className="card-lift relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-xl border border-line bg-white p-6 shadow-card sm:p-8">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-blueprint" />
                <IconTile icon={item.icon} className="mb-5" />
                <h3 className="text-headline-md font-bold">{item.title}</h3>
                <p className="mt-2 text-body-sm sm:text-body-md">{item.text}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5 text-body-sm text-ink">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-ink" strokeWidth={2.5} />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
