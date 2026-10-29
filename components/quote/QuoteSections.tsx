import { ArrowRight, AtSign, Clock, Headset, Mail, MapPin, Phone, Star, TrendingUp } from "lucide-react";
import { fullAddress, siteConfig } from "@/config/site";
import { nextSteps } from "@/content/quote";
import { testimonials } from "@/content/proof";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Eyebrow } from "@/components/ui/SectionHeading";

/** Right-hand column beside the quote form (moves below it on phones). */
export function QuoteSidebar() {
  const quote = testimonials[1];
  return (
    <div className="space-y-6">
      <section aria-labelledby="talk-title" className="rounded-xl border border-line bg-white p-6 shadow-card">
        <div className="flex items-center gap-3">
          <IconTile icon={Headset} tone="accent" />
          <div>
            <h2 id="talk-title" className="text-headline-sm font-bold">
              Prefer to talk it through?
            </h2>
            <p className="text-caption text-body">Our estimators are happy to help</p>
          </div>
        </div>
        <p className="mt-4 text-body-sm">Bid closing in the next 48 hours? Skip the form and speak to an estimator directly.</p>
        <div className="mt-4 space-y-2">
          <a href={siteConfig.phoneHref} className="flex min-h-12 items-center justify-between gap-3 rounded-lg bg-mist px-4 font-display font-bold text-navy hover:bg-blue-50">
            <span className="flex items-center gap-2">
              <Phone aria-hidden="true" className="size-4 text-accent-ink" />
              {siteConfig.phone}
            </span>
            <span className="text-caption font-semibold text-accent-ink">Call now →</span>
          </a>
          <a href={`mailto:${siteConfig.email}`} className="flex min-h-12 items-center justify-between gap-3 rounded-lg bg-mist px-4 text-body-sm font-semibold text-navy hover:bg-blue-50">
            <span className="flex min-w-0 items-center gap-2">
              <Mail aria-hidden="true" className="size-4 shrink-0 text-accent-ink" />
              <span className="truncate">{siteConfig.email}</span>
            </span>
            <span className="shrink-0 text-caption font-semibold text-accent-ink">Email →</span>
          </a>
        </div>
      </section>

      <section aria-labelledby="next-title" className="rounded-xl border border-line bg-white p-6 shadow-card">
        <h2 id="next-title" className="flex items-center gap-2 text-headline-sm font-bold">
          <TrendingUp aria-hidden="true" className="size-5 text-accent-ink" />
          What happens next
        </h2>
        <ol className="relative mt-5 space-y-5 before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-px before:bg-line-strong">
          {nextSteps.map((s, i) => (
            <li key={s.title} className="relative flex gap-3">
              <span
                className={cn(
                  "relative z-10 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-caption font-bold",
                  i === 0 ? "bg-accent text-navy" : "bg-navy text-white",
                )}
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-[0.9375rem] font-bold">{s.title}</h3>
                <p className="mt-0.5 text-body-sm">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* TODO: placeholder testimonial (see content/proof.ts) */}
      <figure className="rounded-xl border border-line bg-white p-6 shadow-card">
        <div className="flex gap-0.5 text-accent" role="img" aria-label="Rated 5 out of 5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} aria-hidden="true" className="size-4 fill-current" strokeWidth={0} />
          ))}
        </div>
        <blockquote className="mt-3 text-body-sm text-ink italic">&ldquo;{quote.quote}&rdquo;</blockquote>
        <figcaption className="mt-4 border-t border-line pt-3">
          <span className="block text-body-sm font-bold text-navy">{quote.name}</span>
          <span className="block text-caption text-body">{quote.role}</span>
        </figcaption>
      </figure>
    </div>
  );
}

/** Four contact cards: call, email, office, hours. Two per row on phones. */
export function ContactCards() {
  const cards = [
    { icon: Phone, title: "Call us", sub: "Talk to an estimator", value: siteConfig.phone, href: siteConfig.phoneHref },
    { icon: AtSign, title: "Email us", sub: "We reply within one business day", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: MapPin, title: "Visit our office", sub: "Las Vegas, Nevada headquarters", value: fullAddress },
    { icon: Clock, title: "Business hours", sub: "Serving all US time zones", lines: siteConfig.hoursDetail },
  ];
  return (
    <section aria-label="Contact details" className="bg-mist py-12 lg:py-16">
      <Container>
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {cards.map((c) => (
            <li key={c.title} className="flex flex-col rounded-xl border border-line bg-white p-4 shadow-card sm:p-6">
              <IconTile icon={c.icon} tone="accent" size="sm" className="mb-4" />
              <h2 className="text-[0.9375rem] font-bold">{c.title}</h2>
              <p className="text-caption text-body">{c.sub}</p>
              <div className="mt-auto pt-4 text-body-sm">
                {c.href ? (
                  <a href={c.href} className="font-semibold break-words text-accent-ink hover:underline">
                    {c.value}
                  </a>
                ) : c.lines ? (
                  c.lines.map((l) => (
                    <span key={l} className="block text-ink">
                      {l}
                    </span>
                  ))
                ) : (
                  <address className="not-italic text-ink">{c.value}</address>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Slim navy band: call us if the bid is due soon. */
export function DeadlineStrip() {
  return (
    <section aria-labelledby="deadline-title" className="relative overflow-hidden bg-navy py-10">
      <div aria-hidden="true" className="bg-blueprint-grid-light pointer-events-none absolute inset-0" />
      <Container className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Eyebrow inverted className="mb-2">
            Bid due soon?
          </Eyebrow>
          <h2 id="deadline-title" className="text-headline-md font-bold text-white lg:text-headline-lg">
            Call us directly: <a href={siteConfig.phoneHref} className="text-accent hover:underline">{siteConfig.phone}</a>
          </h2>
          <p className="mt-1 text-body-sm text-navy-200">Rush takeoffs are available for tight bid deadlines.</p>
        </div>
        <ButtonLink href={siteConfig.phoneHref} size="lg" fullOnMobile>
          <Phone aria-hidden="true" className="size-5" />
          Call Now
          <ArrowRight aria-hidden="true" className="size-4" />
        </ButtonLink>
      </Container>
    </section>
  );
}
