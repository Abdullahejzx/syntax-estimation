import Link from "next/link";
import { BadgeCheck, FileLock2, Lock, MapPin, ShieldCheck } from "lucide-react";
import { fullAddress, siteConfig } from "@/config/site";
import { legalLinks, quoteHref } from "@/content/navigation";
import { serviceHref, services } from "@/content/services";
import { tradeHref, trades } from "@/content/trades";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

const companyLinks = [
  { label: "About Us", href: "/about/" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Sample Estimate", href: "/#sample-estimate" },
  { label: "Blog", href: "/blog/" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: quoteHref },
];

// TODO: confirm each of these statements is accurate for the business
const trustPoints = [
  { icon: ShieldCheck, text: "Plans and pricing kept confidential" },
  { icon: Lock, text: "NDA available on request" },
  { icon: FileLock2, text: "Files shared only with your assigned estimator" },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="mb-3 font-display text-[0.9375rem] font-semibold uppercase tracking-wider text-white">{title}</h2>
      <ul className="space-y-0.5 text-body-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="inline-flex min-h-9 items-center transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-navy text-navy-200">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-white/10 py-14 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 flex flex-col gap-4 lg:col-span-4">
            <Logo inverted className="self-start" />
            <p className="max-w-sm text-body-sm">
              Construction cost estimates, quantity takeoffs and bid support for general contractors,
              subcontractors and suppliers across the United States.
            </p>
            <ul className="space-y-1 text-body-sm">
              <li>
                Phone:{" "}
                <a href={siteConfig.phoneHref} className="font-medium text-white hover:underline">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                Email:{" "}
                <a href={`mailto:${siteConfig.email}`} className="font-medium text-white hover:underline">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-1.5 pt-1">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                <address className="not-italic">{fullAddress}</address>
              </li>
            </ul>
            <p className="inline-flex w-fit items-center gap-1.5 rounded border border-white/15 bg-navy-800 px-2.5 py-1.5 text-caption">
              <BadgeCheck aria-hidden="true" className="size-4 text-accent" />
              Based in Las Vegas, Nevada · Serving all 50 states
            </p>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn
              title="Services"
              links={services.map((s) => ({ label: s.shortName, href: serviceHref(s.slug) }))}
            />
          </div>
          <div className="lg:col-span-2">
            <FooterColumn
              title="Trades"
              links={[
                ...trades.slice(0, 7).map((t) => ({ label: t.shortName, href: tradeHref(t.slug) })),
                { label: "All trades", href: "/trades/" },
              ]}
            />
          </div>
          <div className="lg:col-span-2">
            <FooterColumn title="Company" links={companyLinks} />
          </div>
          <div className="lg:col-span-2">
            <h2 className="mb-3 font-display text-[0.9375rem] font-semibold uppercase tracking-wider text-white">
              Your Files
            </h2>
            <ul className="space-y-3 text-body-sm">
              {trustPoints.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2">
                  <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                  {text}
                </li>
              ))}
            </ul>
            <SocialLinks className="-ml-2 mt-5 gap-1 text-white" />
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 py-6 text-caption md:flex-row md:items-center">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-9 items-center transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
