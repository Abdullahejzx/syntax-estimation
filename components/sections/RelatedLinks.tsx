import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { serviceHref, services } from "@/content/services";
import { specialtyTrades, tradeHref } from "@/content/trades";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type RelatedLinksProps = {
  title?: string;
  intro?: string;
  /** Slug of the current service, left out of the "other services" row */
  currentService?: string;
  /** Slug of the current trade, left out of the trade grid (cards then show their summary) */
  currentTrade?: string;
  tone?: "white" | "mist";
};

/** Small trade cards (2 per row on phones) plus a row of links to services. */
export function RelatedLinks({
  title = "Explore Specialized Trade Estimating",
  intro = "Need single-scope detail? We prepare trade takeoffs organized the way specialty subcontractors price their work.",
  currentService,
  currentTrade,
  tone = "white",
}: RelatedLinksProps) {
  const onTradePage = currentTrade !== undefined;
  const tradeList = specialtyTrades.filter((t) => t.slug !== currentTrade);
  const serviceList = services.filter((s) => s.slug !== currentService);

  return (
    <Section tone={tone} labelledBy="related-title">
      <Container>
        <SectionHeading id="related-title" eyebrow="Trade takeoffs" eyebrowStyle="chip" title={title} intro={intro} />
        <ul className={cn("grid grid-cols-2 gap-3 sm:gap-4", onTradePage ? "sm:grid-cols-3" : "sm:grid-cols-3 lg:grid-cols-5")}>
          {tradeList.map((trade) => (
            <li key={trade.slug}>
              <Link
                href={tradeHref(trade.slug)}
                className="card-lift group flex h-full flex-col rounded-xl border border-line bg-mist p-4"
              >
                <IconTile icon={trade.icon} size="sm" className="mb-3 bg-white shadow-card" />
                <span className="font-display text-[0.9375rem] font-bold text-navy">{trade.shortName}</span>
                {onTradePage && <span className="mt-1 hidden text-caption text-body sm:block">{trade.summary}</span>}
                <span className="mt-auto inline-flex items-center gap-1 pt-3 text-caption font-semibold text-blueprint transition-[gap] group-hover:gap-2">
                  Explore trade <ArrowRight aria-hidden="true" className="size-3.5" />
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/trades/" className="group flex h-full flex-col rounded-xl bg-navy p-4 text-white transition-colors hover:bg-navy-800">
              <IconTile icon={LayoutGrid} size="sm" tone="accent" className="mb-3" />
              <span className="font-display text-[0.9375rem] font-bold">All trades</span>
              {onTradePage && <span className="mt-1 hidden text-caption text-navy-200 sm:block">Including GC and supplier services.</span>}
              <span className="mt-auto inline-flex items-center gap-1 pt-3 text-caption font-semibold text-accent transition-[gap] group-hover:gap-2">
                View the list <ArrowRight aria-hidden="true" className="size-3.5" />
              </span>
            </Link>
          </li>
        </ul>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 lg:flex-row lg:items-center">
          <h3 className="shrink-0 text-[0.9375rem] font-bold">{currentService ? "Other services:" : "Our services:"}</h3>
          <ul className="flex flex-wrap gap-2">
            {serviceList.map((s) => (
              <li key={s.slug}>
                <Link
                  href={serviceHref(s.slug)}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-line bg-white px-3 text-body-sm font-semibold text-navy transition-colors hover:border-blueprint hover:text-blueprint"
                >
                  <s.icon aria-hidden="true" className="size-4 text-blueprint" />
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
