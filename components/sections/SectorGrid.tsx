import { sectors } from "@/content/sectors";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type SectorGridProps = {
  title?: string;
  intro?: string;
  tone?: "white" | "mist";
};

/** Eight project-type cards: 1 column on small phones, 2 from 640px, 4 on desktop. */
export function SectorGrid({
  title = "Project Sectors We Estimate",
  intro = "Experience across commercial, residential, institutional and public work in all 50 states.",
  tone = "white",
}: SectorGridProps) {
  return (
    <Section tone={tone} labelledBy="sectors-title">
      <Container>
        <SectionHeading id="sectors-title" eyebrow="Project types" eyebrowStyle="chip" title={title} intro={intro} />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {sectors.map(({ title: name, text, note, icon: Icon }, i) => (
            <Reveal as="li" key={name} delay={(i % 4) * 0.05}>
              <div className="card-lift flex h-full flex-col rounded-xl border border-line bg-mist p-5">
                <span aria-hidden="true" className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-white text-blueprint shadow-card">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="text-headline-sm font-bold">{name}</h3>
                <p className="mt-2 text-body-sm">{text}</p>
                <div className="mt-auto pt-4">
                  <p className="border-t border-line pt-3 text-caption font-semibold text-accent-ink">{note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
