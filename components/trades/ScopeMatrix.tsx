import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ScopeMatrixProps = {
  title: string;
  intro: string;
  items: { title: string; text: string }[];
};

/** Numbered grid of everything included in a trade takeoff. */
export function ScopeMatrix({ title, intro, items }: ScopeMatrixProps) {
  return (
    <Section id="scope" tone="mist" labelledBy="scope-title">
      <Container>
        <SectionHeading id="scope-title" align="left" eyebrow="Scope coverage" title={title} intro={intro} />
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 0.05}>
              <div className="flex h-full gap-4 rounded-lg border border-line bg-white p-4 shadow-card sm:p-5">
                <span
                  aria-hidden="true"
                  className="tabular inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-mono text-caption font-bold text-blueprint"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1rem] font-bold leading-snug">{item.title}</h3>
                  <p className="mt-1 text-body-sm">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
