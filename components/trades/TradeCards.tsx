import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { clientTypes, specialtyTrades, tradeHref } from "@/content/trades";
import { Reveal } from "@/components/motion/Reveal";
import { CardPhoto } from "@/components/ui/CardPhoto";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** /trades hub grid of specialty trades: 2 columns on phones, 3 on desktop. */
export function SpecialtyTradeCards({ title, intro }: { title: string; intro: string }) {
  return (
    <Section labelledBy="specialty-title">
      <Container>
        <SectionHeading id="specialty-title" title={title} intro={intro} />
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {specialtyTrades.map((trade, i) => (
            <Reveal as="li" key={trade.slug} delay={(i % 3) * 0.05}>
              <Link
                href={tradeHref(trade.slug)}
                className="card-lift group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card"
              >
                <CardPhoto image={`trade-${trade.slug}`}>
                  <IconTile
                    icon={trade.icon}
                    tone="accent"
                    size="sm"
                    className="absolute bottom-2 left-3 shadow-card ring-2 ring-white sm:bottom-3 sm:left-4"
                  />
                </CardPhoto>
                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <h3 className="text-[1rem] font-bold sm:text-headline-md">{trade.shortName}</h3>
                  <p className="mt-1.5 text-caption sm:mt-2 sm:text-body-md">{trade.summary}</p>
                  <ul className="mt-4 hidden flex-wrap gap-1.5 sm:flex">
                    {trade.scope.items.slice(0, 3).map((item) => (
                      <li key={item.title} className="rounded border border-line bg-mist px-2 py-0.5 text-[0.75rem] font-medium text-navy">
                        {item.title}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 font-display text-[0.875rem] font-semibold text-accent-ink transition-[gap] group-hover:gap-2">
                    View trade <span className="sr-only">: {trade.name}</span>
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

/** /trades hub cards for General Contractors and Suppliers, with their market segments. */
export function ClientTypeCards({ title, intro }: { title: string; intro: string }) {
  return (
    <Section tone="mist" labelledBy="clients-title">
      <Container>
        <SectionHeading id="clients-title" title={title} intro={intro} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {clientTypes.map((client, i) => (
            <Reveal key={client.slug} delay={i * 0.08}>
              <article className="card-lift group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card">
                <CardPhoto image={`trade-${client.slug}`} ratio="aspect-[16/7]" />
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <IconTile icon={client.icon} tone="navy" />
                    <div>
                      <h3 className="text-headline-md font-bold">{client.name}</h3>
                      <p className="mt-1 text-body-sm sm:text-body-md">{client.summary}</p>
                    </div>
                </div>
                {client.segments && (
                  <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {client.segments.items.map((segment) => (
                      <li key={segment.id}>
                        <Link
                          href={`${tradeHref(client.slug)}#${segment.id}`}
                          className="flex h-full min-h-11 items-start gap-2 rounded-lg border border-line bg-mist p-3 text-body-sm font-semibold text-navy transition-colors hover:border-blueprint hover:text-blueprint-ink"
                        >
                          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-ink" strokeWidth={2.5} />
                          {segment.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={tradeHref(client.slug)}
                  className="mt-auto inline-flex min-h-11 items-center gap-1 pt-6 font-display text-[0.9375rem] font-semibold text-accent-ink hover:text-navy"
                >
                  Learn more <span className="sr-only">about {client.name}</span>
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
