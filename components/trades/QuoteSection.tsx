import { Check, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { QuickQuoteForm } from "@/components/forms/QuickQuoteForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";

const checklist = [
  "Drawings as PDF or CAD files, or a plan-room link",
  "Specifications, or just the sections for your scope",
  "Any addenda issued so far",
  "Your bid date and anything to include or exclude",
];

/** "Get a quote" band on trade pages: what to send on the left, the quick quote form on the right. */
export function QuoteSection({ tradeName, context }: { tradeName: string; context: string }) {
  return (
    <Section id="quote" tone="mist" labelledBy="quote-title">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 lg:pt-4">
            <Eyebrow className="mb-2">Free quote</Eyebrow>
            <h2 id="quote-title" className="text-headline-xl-mobile font-bold lg:text-headline-xl">
              Get a {tradeName} Takeoff Quote
            </h2>
            <p className="mt-3 sm:text-body-lg">
              Send what you have and we&apos;ll reply with a fixed price and delivery date before any work starts.
            </p>
            <h3 className="mt-8 text-[1rem] font-bold">What to send</h3>
            <ul className="mt-3 space-y-2.5 text-body-md text-ink">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-ink" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-2 rounded-xl border border-line bg-white p-5">
              <p className="text-body-sm font-semibold text-navy">Rather talk it through?</p>
              <a href={siteConfig.phoneHref} className="flex min-h-11 items-center gap-2 font-display text-headline-sm font-bold text-navy hover:text-accent-ink">
                <Phone aria-hidden="true" className="size-5 text-accent-ink" />
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex min-h-11 items-center gap-2 text-body-md text-blueprint hover:underline">
                <Mail aria-hidden="true" className="size-5" />
                {siteConfig.email}
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-xl border border-line bg-white p-5 shadow-float sm:p-8">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blueprint to-accent" />
              <QuickQuoteForm context={context} title={`Request a ${tradeName} Quote`} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
