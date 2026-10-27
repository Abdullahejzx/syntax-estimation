import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import { serviceHref, services } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";
import { CardPhoto } from "@/components/ui/CardPhoto";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Services hub grid: three cards on top, the remaining two centered below (desktop). */
export function ServiceCards({ title, intro }: { title: string; intro?: string }) {
  return (
    <Section labelledBy="service-cards-title">
      <Container>
        <SectionHeading id="service-cards-title" title={title} intro={intro} />
        <ul className="flex flex-wrap justify-center gap-5 lg:gap-6">
          {services.map((service, i) => (
            <Reveal
              as="li"
              key={service.slug}
              delay={(i % 3) * 0.06}
              className="w-full md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <Link
                href={serviceHref(service.slug)}
                className="card-lift group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card"
              >
                <CardPhoto image={`service-${service.slug}`}>
                  <IconTile icon={service.icon} tone="accent" className="absolute bottom-3 left-4 shadow-card ring-2 ring-white" />
                </CardPhoto>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-headline-md font-bold">{service.name}</h3>
                  <p className="mt-2 text-body-sm sm:text-body-md">{service.summary}</p>
                  <ul className="mt-4 space-y-2 text-body-sm text-ink">
                    {service.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-ink" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1 pt-6 font-display text-[0.9375rem] font-semibold text-navy transition-[gap] group-hover:gap-2">
                    View service <span className="sr-only">: {service.name}</span>
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
