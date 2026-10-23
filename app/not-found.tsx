import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { quoteHref } from "@/content/navigation";
import { serviceHref } from "@/content/services";
import { specialtyTrades, tradeHref } from "@/content/trades";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for couldn't be found.",
  robots: { index: false, follow: true },
};

const popular = [
  { label: "Construction cost estimating", href: serviceHref("cost-estimating") },
  { label: "Quantity takeoffs", href: serviceHref("quantity-takeoffs") },
  ...specialtyTrades.slice(0, 4).map((t) => ({ label: `${t.shortName} estimating`, href: tradeHref(t.slug) })),
];

/** Custom 404. The static export writes it to out/404.html, which .htaccess serves for missing URLs. */
export default function NotFound() {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden bg-mist py-16 sm:py-24">
      <div aria-hidden="true" className="bg-blueprint-grid pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-3">Error 404</Eyebrow>
            <h1 id="page-title" className="text-display-mobile font-extrabold sm:text-headline-xl lg:text-display">
              This page isn&apos;t on the plans.
            </h1>
            <p className="mt-5 max-w-xl sm:text-body-lg">
              The link may be out of date, or the page may have moved. Try one of the pages below, or send us your
              drawings and we&apos;ll get you a quote.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="/" size="lg" fullOnMobile>
                Back to Home
              </ButtonLink>
              <ButtonLink href={quoteHref} variant="secondary" size="lg" fullOnMobile>
                Get a Free Quote
                <ArrowRight aria-hidden="true" className="size-[18px]" />
              </ButtonLink>
            </div>
            <a href={siteConfig.phoneHref} className="mt-6 inline-flex min-h-11 items-center gap-2 text-body-md font-semibold text-navy hover:text-accent-ink">
              <Phone aria-hidden="true" className="size-4 text-accent-ink" />
              Or call {siteConfig.phone}
            </a>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl border border-line bg-white p-6 shadow-lift">
              {/* Drafting-style "missing sheet" graphic */}
              <div aria-hidden="true" className="bg-blueprint-grid-light relative mb-6 flex h-32 items-center justify-center rounded-lg bg-navy">
                <span className="font-display text-[4.5rem] leading-none font-extrabold text-white">404</span>
                <span className="absolute top-2 left-3 font-mono text-[0.625rem] text-navy-200">SHEET NOT FOUND</span>
                <span className="absolute right-3 bottom-2 font-mono text-[0.625rem] text-accent">REV —</span>
              </div>
              <h2 className="text-headline-sm font-bold">Popular pages</h2>
              <ul className="mt-3 divide-y divide-line">
                {popular.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="flex min-h-11 items-center justify-between gap-3 text-body-md text-navy hover:text-blueprint-ink">
                      {link.label}
                      <ArrowRight aria-hidden="true" className="size-4 text-blueprint-ink" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
                {[
                  { label: "All services", href: "/services/" },
                  { label: "All trades", href: "/trades/" },
                  { label: "About us", href: "/about/" },
                  { label: "Blog", href: "/blog/" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="inline-flex min-h-10 items-center rounded-lg border border-line bg-mist px-3 text-body-sm font-semibold text-navy hover:border-blueprint">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
