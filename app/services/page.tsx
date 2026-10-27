import { FileUp } from "lucide-react";
import { quoteHref } from "@/content/navigation";
import { stats } from "@/content/proof";
import { servicesHub as hub } from "@/content/servicesHub";
import { pageMetadata } from "@/lib/metadata";
import { Audiences } from "@/components/sections/Audiences";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { CtaBand } from "@/components/sections/CtaBand";
import { DeliverablesShowcase } from "@/components/sections/DeliverablesShowcase";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { StageCards } from "@/components/sections/StageCards";
import { StatsBand } from "@/components/sections/StatsBand";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = pageMetadata({ ...hub.seo, path: "/services/" });

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image="bg-services"
        breadcrumbs={[{ label: "Services", href: "/services/" }]}
        tag={hub.hero.tag}
        title={hub.hero.title}
        intro={hub.hero.intro}
        badges={hub.hero.badges}
        actions={
          <>
            <ButtonLink href={quoteHref} size="lg" fullOnMobile>
              Get a Free Quote
            </ButtonLink>
            <ButtonLink href={quoteHref} variant="secondary" size="lg" fullOnMobile>
              <FileUp aria-hidden="true" className="size-[18px] text-blueprint-ink" />
              Upload Plans
            </ButtonLink>
          </>
        }
      />
      <ServiceCards title={hub.cards.title} intro={hub.cards.intro} />
      <StageCards id="lifecycle" {...hub.stages} />
      <Audiences eyebrow="Who we serve" eyebrowStyle="chip" tone="white" {...hub.audiences} />
      <ComparisonTable {...hub.comparison} />
      <DeliverablesShowcase {...hub.deliverables} />
      <StatsBand stats={stats} />
      <FaqSection items={hub.faqs} eyebrowStyle="chip" title="Frequently Asked Questions About Our Services" />
      <CtaBand {...hub.cta} buttonLabel="Upload Plans for a Quick Quote" />
    </>
  );
}
