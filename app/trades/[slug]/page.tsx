import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, FileDown } from "lucide-react";
import { testimonials } from "@/content/proof";
import { getTrade, tradeHref, trades } from "@/content/trades";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { AdvantageSplit } from "@/components/sections/AdvantageSplit";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { SoftwareStrip } from "@/components/sections/SoftwareStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { PricingPillars } from "@/components/trades/PricingPillars";
import { QuickFacts } from "@/components/trades/QuickFacts";
import { QuoteSection } from "@/components/trades/QuoteSection";
import { ScopeMatrix } from "@/components/trades/ScopeMatrix";
import { Segments } from "@/components/trades/Segments";
import { TakeoffCard } from "@/components/trades/TakeoffCard";
import { TradePackage } from "@/components/trades/TradePackage";
import { WorkflowCards } from "@/components/trades/WorkflowCards";
import { ButtonLink } from "@/components/ui/Button";

type Props = { params: Promise<{ slug: string }> };

// Only the slugs in content/trades exist; anything else is a 404 at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return trades.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const trade = getTrade((await params).slug);
  if (!trade) return {};
  return pageMetadata({ ...trade.seo, path: tradeHref(trade.slug), image: `trades/${trade.slug}` });
}

export default async function TradePage({ params }: Props) {
  const trade = getTrade((await params).slug);
  if (!trade) notFound();

  const path = tradeHref(trade.slug);
  const label = trade.label ?? trade.shortName;

  return (
    <>
      <JsonLd data={serviceSchema({ name: trade.name, description: trade.seo.description, path })} />

      <PageHero
        breadcrumbs={[
          { label: "Trades", href: "/trades/" },
          { label: trade.shortName, href: path },
        ]}
        tag={trade.hero.tag}
        tagTone="accent"
        title={trade.hero.title}
        intro={trade.hero.intro}
        badges={trade.hero.badges}
        actions={
          <>
            <ButtonLink href="#quote" size="lg" fullOnMobile>
              Get a {label} Quote
              <ArrowRight aria-hidden="true" className="size-[18px]" />
            </ButtonLink>
            <ButtonLink href="#package" variant="secondary" size="lg" fullOnMobile>
              <FileDown aria-hidden="true" className="size-[18px] text-blueprint-ink" />
              See a Sample Takeoff
            </ButtonLink>
          </>
        }
        aside={<TakeoffCard card={trade.heroCard} />}
      />

      <QuickFacts facts={trade.facts} />
      {trade.segments && <Segments data={trade.segments} />}
      <ScopeMatrix {...trade.scope} />
      <TradePackage data={trade.package} tradeName={label} />
      {trade.pricing && <PricingPillars data={trade.pricing} tradeName={label} />}
      <WorkflowCards data={trade.workflows} />
      <AdvantageSplit
        eyebrow="Why Syntax"
        numbered
        title={trade.why.title}
        points={trade.why.points}
        tip={trade.why.tip}
        testimonial={testimonials[trade.why.testimonialIndex] ?? testimonials[0]}
      />
      <SoftwareStrip />
      <QuoteSection tradeName={label} context={`Trade: ${trade.name}`} />
      <RelatedLinks
        currentTrade={trade.slug}
        title={trade.group === "trade" ? "Need Estimates for Other Trades?" : "Trade Takeoffs for Your Subcontractors"}
        intro={
          trade.group === "trade"
            ? "The same detail and turnaround for every specialty trade on the job."
            : "Need a single scope instead of the whole job? Every specialty trade has its own takeoff package."
        }
      />
      <FaqSection items={trade.faqs} eyebrowStyle="chip" title={`${label} Estimating FAQ`} />
      <CtaBand eyebrow="Ready for bid day" title={trade.cta.title} text={trade.cta.text} />
    </>
  );
}
