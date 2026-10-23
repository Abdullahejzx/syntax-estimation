import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { quoteHref } from "@/content/navigation";
import { serviceHref, services } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServicesGrid() {
  return (
    <Section labelledBy="services-title">
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow="Our services"
          title="Precision Estimating & Preconstruction Services"
          intro="Takeoffs and cost models built around your trade, your market and the CSI MasterFormat structure your team already uses."
        />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={i * 0.06}>
              <Link
                href={serviceHref(service.slug)}
                className="card-lift group flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-card"
              >
                <IconTile icon={service.icon} className="mb-4" />
                <h3 className="mb-2 text-headline-md font-bold">{service.name}</h3>
                <p className="text-body-sm sm:text-body-md">{service.summary}</p>
                <span className="mt-6 inline-flex items-center gap-1 font-display text-[0.875rem] font-semibold text-accent-ink transition-[gap] group-hover:gap-2">
                  Learn more <span className="sr-only">about {service.name}</span>
                  <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
            </Reveal>
          ))}
          {/* Sixth tile completes the 3x2 / 2x3 grid */}
          <Reveal as="li" delay={0.3}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg bg-navy p-6 text-navy-200 shadow-card">
              <div aria-hidden="true" className="bg-blueprint-grid-light absolute inset-0" />
              <div className="relative flex h-full flex-col items-start">
                <h3 className="mb-2 text-headline-md font-bold text-white">Not sure which service fits?</h3>
                <p className="text-body-sm sm:text-body-md">
                  Send your drawings and we&apos;ll recommend the right scope, with a fixed price and delivery date
                  before any work starts.
                </p>
                <div className="mt-auto flex w-full flex-col gap-3 pt-6 sm:flex-row sm:items-center">
                  <ButtonLink href={quoteHref}>Get a Free Quote</ButtonLink>
                  <Link href="/services/" className="inline-flex min-h-11 items-center gap-1 whitespace-nowrap font-display text-[0.875rem] font-semibold text-white hover:text-accent">
                    Compare services <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </ul>
      </Container>
    </Section>
  );
}
