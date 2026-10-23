import { FileUp } from "lucide-react";
import { quoteHref } from "@/content/navigation";
import { stats } from "@/content/proof";
import { tradesHub as hub } from "@/content/tradesHub";
import { pageMetadata } from "@/lib/metadata";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SoftwareStrip } from "@/components/sections/SoftwareStrip";
import { StatsBand } from "@/components/sections/StatsBand";
import { ClientTypeCards, SpecialtyTradeCards } from "@/components/trades/TradeCards";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = pageMetadata({ ...hub.seo, path: "/trades/" });

export default function TradesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Trades", href: "/trades/" }]}
        tag={hub.hero.tag}
        tagTone="accent"
        title={hub.hero.title}
        intro={hub.hero.intro}
        badges={hub.hero.badges}
        actions={
          <>
            <ButtonLink href={quoteHref} size="lg" fullOnMobile>
              Get a Free Quote
            </ButtonLink>
            <ButtonLink href={quoteHref} variant="secondary" size="lg" fullOnMobile>
              <FileUp aria-hidden="true" className="size-[18px] text-blueprint" />
              Upload Plans
            </ButtonLink>
          </>
        }
      />
      <SpecialtyTradeCards {...hub.specialty} />
      <ClientTypeCards {...hub.clients} />
      <ProcessSteps
        id="how-it-works"
        eyebrow="How it works"
        title="From Drawings to Takeoff in 4 Steps"
        intro="The same process for every trade, built around your bid date."
        steps={hub.steps}
      />
      <SoftwareStrip />
      <StatsBand stats={stats} />
      <FaqSection items={hub.faqs} eyebrowStyle="chip" title="Trade Takeoff FAQs" />
      <CtaBand {...hub.cta} />
    </>
  );
}
