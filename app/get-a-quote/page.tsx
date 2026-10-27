import { quoteFaqs, quotePage } from "@/content/quote";
import { pageMetadata } from "@/lib/metadata";
import { localBusinessSchema } from "@/lib/schema";
import { QuoteWizard } from "@/components/forms/QuoteWizard";
import { MapEmbed } from "@/components/quote/MapEmbed";
import { ContactCards, DeadlineStrip, QuoteSidebar } from "@/components/quote/QuoteSections";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";

export const metadata = pageMetadata({ ...quotePage.seo, path: "/get-a-quote/" });

export default function GetAQuotePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <PageHero
        image="bg-quote"
        breadcrumbs={[{ label: "Get a Quote", href: "/get-a-quote/" }]}
        tag={quotePage.hero.tag}
        tagTone="accent"
        title={quotePage.hero.title}
        intro={quotePage.hero.intro}
        badges={quotePage.hero.badges}
      />

      <section aria-label="Quote request form" className="bg-white py-10 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <QuoteWizard />
            </div>
            <aside className="lg:sticky lg:top-28 lg:col-span-4">
              <QuoteSidebar />
            </aside>
          </div>
        </Container>
      </section>

      <ContactCards />
      <section aria-label="Office location" className="bg-white py-12 lg:py-16">
        <Container>
          <MapEmbed />
        </Container>
      </section>
      <FaqSection items={quoteFaqs} eyebrow="Quote questions" title="Frequently Asked Questions" />
      <DeadlineStrip />
      {/* Keeps the footer clear of the fixed Back/Next bar on phones */}
      <div aria-hidden="true" className="h-20 bg-navy md:hidden" />
    </>
  );
}
