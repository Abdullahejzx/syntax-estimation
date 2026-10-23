import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, FileDown } from "lucide-react";
import { quoteHref } from "@/content/navigation";
import { testimonials } from "@/content/proof";
import { getService, serviceHref, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { QuickQuoteForm } from "@/components/forms/QuickQuoteForm";
import { AdvantageSplit } from "@/components/sections/AdvantageSplit";
import { CtaBand } from "@/components/sections/CtaBand";
import { EstimateSheet } from "@/components/sections/EstimateSheet";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { SectorGrid } from "@/components/sections/SectorGrid";
import { StageCards } from "@/components/sections/StageCards";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";

type Props = { params: Promise<{ slug: string }> };

// Only the slugs in content/services.ts exist; anything else is a 404 at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({ ...service.seo, path: serviceHref(service.slug) });
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const path = serviceHref(service.slug);

  return (
    <>
      <JsonLd data={serviceSchema({ name: service.name, description: service.seo.description, path })} />

      <PageHero
        breadcrumbs={[
          { label: "Services", href: "/services/" },
          { label: service.shortName, href: path },
        ]}
        tag={service.hero.tag}
        title={service.hero.title}
        intro={service.hero.intro}
        highlights={service.hero.highlights}
        actions={
          <>
            <ButtonLink href={quoteHref} size="lg" fullOnMobile>
              Get a Free Quote
              <ArrowRight aria-hidden="true" className="size-[18px]" />
            </ButtonLink>
            {/* TODO: link to a downloadable sample PDF once one exists */}
            <ButtonLink href="#sample-sheet" variant="secondary" size="lg" fullOnMobile>
              <FileDown aria-hidden="true" className="size-[18px] text-blueprint" />
              See a Sample
            </ButtonLink>
          </>
        }
        aside={
          <div className="relative overflow-hidden rounded-xl border border-line bg-white p-5 shadow-float sm:p-7">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blueprint to-accent" />
            <QuickQuoteForm context={`Service: ${service.name}`} />
          </div>
        }
      />

      <FeatureGrid
        id="included"
        tone="white"
        eyebrow="What's included"
        eyebrowStyle="chip"
        title={service.included.title}
        intro={service.included.intro}
        items={service.included.items}
      />
      <StageCards {...service.stages} />
      <ProcessTimeline
        title={service.process.title}
        intro={service.process.intro}
        steps={service.process.steps}
        zones={service.process.zones}
      />
      <EstimateSheet title={service.sheet.title} intro={service.sheet.intro} data={service.sheet.data} />
      <SectorGrid />
      <AdvantageSplit
        title={service.advantages.title}
        intro={service.advantages.intro}
        points={service.advantages.points}
        testimonial={testimonials[service.advantages.testimonialIndex] ?? testimonials[0]}
      />
      <RelatedLinks currentService={service.slug} />
      <FaqSection items={service.faqs} eyebrowStyle="chip" title={`${service.shortName} FAQs`} />
      <CtaBand eyebrow="Ready for bid day" title={service.cta.title} text={service.cta.text} />
    </>
  );
}
