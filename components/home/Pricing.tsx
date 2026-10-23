import { quoteHref } from "@/content/navigation";
import { pricingTiers } from "@/content/home";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Pricing() {
  return (
    <Section id="pricing" labelledBy="pricing-title">
      <Container>
        <SectionHeading
          id="pricing-title"
          eyebrow="Project-based pricing"
          title="Simple, Predictable Project Pricing"
          intro="No software subscriptions and no estimator salaries. You pay per project, and you see the price before we start."
        />
        {/* TODO: placeholder prices (see content/home.ts) */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08} className={cn(tier.featured && "order-first lg:order-none")}>
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-xl border bg-white p-6 sm:p-8",
                  tier.featured ? "border-accent shadow-float" : "card-lift border-line shadow-card",
                )}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wide text-navy">
                    Most popular
                  </span>
                )}
                <p className={cn("text-caption font-bold uppercase tracking-wider", tier.featured ? "text-accent-ink" : "text-blueprint")}>
                  {tier.label}
                </p>
                <h3 className="mt-1 text-headline-md font-bold">{tier.name}</h3>
                <p className="my-4 flex items-baseline gap-1.5">
                  <span className="text-caption text-body">Starting from</span>
                  <span className="tabular font-display text-headline-xl font-extrabold text-navy">{tier.price}</span>
                </p>
                <p className="mb-6 text-body-sm sm:text-body-md">{tier.text}</p>
                <CheckList items={tier.features} className="mb-8" />
                <ButtonLink
                  href={quoteHref}
                  variant={tier.featured ? "primary" : "secondary"}
                  className="mt-auto w-full"
                >
                  {tier.cta}
                </ButtonLink>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-caption text-body">
          Final pricing depends on the number of sheets, the trades involved and the project size. We review your
          drawings and confirm a fixed price before any work begins.
        </p>
      </Container>
    </Section>
  );
}
