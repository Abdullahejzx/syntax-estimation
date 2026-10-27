import { ArrowRight, Clock, Lock, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { quoteHref } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PhotoBackdrop } from "@/components/ui/PhotoBackdrop";
import { Eyebrow } from "@/components/ui/SectionHeading";

type CtaBandProps = {
  eyebrow?: string;
  title?: string;
  text?: string;
  buttonLabel?: string;
};

// TODO: confirm these promises match how the business works
const assurances = [
  { icon: Lock, text: "100% confidential" },
  { icon: ShieldCheck, text: "NDA on request" },
  { icon: Clock, text: "Fixed price before we start" },
];

/** Closing call-to-action band used at the bottom of most pages, over a construction photo. */
export function CtaBand({
  eyebrow = "Start estimating today",
  title = "Ready to Win Your Next Bid?",
  text = "Send us your plans and get a fixed quote and delivery date. No commitment and no obligation.",
  buttonLabel = "Upload Plans for a Free Quote",
}: CtaBandProps) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-navy py-16 text-navy-200 lg:py-24">
      <PhotoBackdrop image="bg-cta" fade="even" />
      <Container size="narrow" className="relative text-center">
        <Eyebrow inverted className="mb-3">
          {eyebrow}
        </Eyebrow>
        <h2 id="cta-title" className="mb-5 text-display-mobile font-extrabold text-white lg:text-display">
          {title}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl sm:text-body-lg">{text}</p>
        <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={quoteHref} size="lg" fullOnMobile>
            {buttonLabel}
            <ArrowRight aria-hidden="true" className="size-5" />
          </ButtonLink>
          <ButtonLink href={siteConfig.phoneHref} variant="outlineLight" size="lg" fullOnMobile>
            Call {siteConfig.phone}
          </ButtonLink>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-caption">
          {assurances.map(({ icon: Icon, text: label }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon aria-hidden="true" className="size-4 text-accent" />
              {label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
