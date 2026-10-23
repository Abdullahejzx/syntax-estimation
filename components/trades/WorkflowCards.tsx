import { CircleCheck, HardHat, Building2, Truck } from "lucide-react";
import type { Trade } from "@/content/trades";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [HardHat, Building2, Truck];

/** Three role cards showing how the takeoff is set up for each type of client. */
export function WorkflowCards({ data }: { data: Trade["workflows"] }) {
  return (
    <Section labelledBy="workflows-title">
      <Container>
        <SectionHeading id="workflows-title" eyebrow="Who it's for" title={data.title} intro={data.intro} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-8">
          {data.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <article className="card-lift flex h-full flex-col rounded-xl border border-line bg-mist p-6 sm:p-8">
                <IconTile icon={icons[i % icons.length]} className="mb-5 bg-blue-100" />
                <h3 className="text-headline-sm font-bold">{item.title}</h3>
                <p className="mt-3 text-body-sm sm:text-body-md">{item.text}</p>
                <ul className="mt-auto space-y-2 pt-6">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-caption font-medium text-navy">
                      <CircleCheck aria-hidden="true" className="size-4 shrink-0 text-accent-ink" />
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
