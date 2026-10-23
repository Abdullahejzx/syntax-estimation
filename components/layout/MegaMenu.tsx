import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { quoteHref } from "@/content/navigation";
import { serviceHref, services } from "@/content/services";
import { clientTypes, specialtyTrades, tradeHref } from "@/content/trades";
import { buttonClasses } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { Eyebrow } from "@/components/ui/SectionHeading";

type PanelProps = { onNavigate: () => void };

function PanelLink({
  href,
  title,
  summary,
  icon,
  onNavigate,
}: PanelProps & { href: string; title: string; summary?: string; icon: Parameters<typeof IconTile>[0]["icon"] }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-mist focus-visible:bg-mist"
    >
      <IconTile icon={icon} size="sm" className="transition-colors group-hover:bg-blue-100" />
      <span className="min-w-0">
        <span className="block font-display text-[0.9375rem] font-semibold text-navy">{title}</span>
        {summary && <span className="mt-0.5 block text-body-sm text-body">{summary}</span>}
      </span>
    </Link>
  );
}

function QuoteCard({ onNavigate, title, text }: PanelProps & { title: string; text: string }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-lg bg-navy p-6 text-navy-200">
      <div aria-hidden="true" className="bg-blueprint-grid-light absolute inset-0" />
      <div className="relative flex h-full flex-col">
        <Eyebrow inverted>Free quote</Eyebrow>
        <p className="mt-2 font-display text-headline-sm font-bold text-white">{title}</p>
        <p className="mt-2 text-body-sm">{text}</p>
        <div className="mt-auto flex flex-col gap-3 pt-6">
          <Link href={quoteHref} onClick={onNavigate} className={buttonClasses({ className: "w-full" })}>
            Get a Free Quote
          </Link>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center justify-center gap-2 text-body-sm font-semibold text-white hover:text-accent"
          >
            <Phone aria-hidden="true" className="size-4" />
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

export function ServicesMenu({ onNavigate }: PanelProps) {
  return (
    <div className="grid grid-cols-12 gap-6 py-6">
      <div className="col-span-8">
        <div className="mb-2 flex items-center justify-between px-3">
          <Eyebrow>Estimating & preconstruction services</Eyebrow>
          <Link
            href="/services/"
            onClick={onNavigate}
            className="inline-flex items-center gap-1 text-body-sm font-semibold text-accent-ink hover:text-navy"
          >
            All services <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-1">
          {services.map((s) => (
            <li key={s.slug}>
              <PanelLink
                href={serviceHref(s.slug)}
                title={s.shortName}
                summary={s.summary}
                icon={s.icon}
                onNavigate={onNavigate}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-4">
        <QuoteCard
          onNavigate={onNavigate}
          title="Not sure which service you need?"
          text="Send us your plans and we'll recommend the right scope, price and turnaround before you commit."
        />
      </div>
    </div>
  );
}

export function TradesMenu({ onNavigate }: PanelProps) {
  return (
    <div className="grid grid-cols-12 gap-6 py-6">
      <div className="col-span-6">
        <div className="mb-2 flex items-center justify-between px-3">
          <Eyebrow>Specialty trades</Eyebrow>
          <Link
            href="/trades/"
            onClick={onNavigate}
            className="inline-flex items-center gap-1 text-body-sm font-semibold text-accent-ink hover:text-navy"
          >
            All trades <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <ul className="grid grid-cols-3 gap-1">
          {specialtyTrades.map((t) => (
            <li key={t.slug}>
              <Link
                href={tradeHref(t.slug)}
                onClick={onNavigate}
                className="group flex items-center gap-2.5 rounded-lg p-2.5 transition-colors hover:bg-mist focus-visible:bg-mist"
              >
                <IconTile icon={t.icon} size="sm" className="transition-colors group-hover:bg-blue-100" />
                <span className="font-display text-[0.9375rem] font-semibold text-navy">{t.shortName}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-3 border-l border-line pl-6">
        <Eyebrow className="mb-2 px-3">Who we work with</Eyebrow>
        <ul className="space-y-1">
          {clientTypes.map((t) => (
            <li key={t.slug}>
              <PanelLink
                href={tradeHref(t.slug)}
                title={t.shortName}
                summary={t.summary}
                icon={t.icon}
                onNavigate={onNavigate}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-3">
        <QuoteCard
          onNavigate={onNavigate}
          title="Bidding a trade package?"
          text="Get quantities and pricing matched to your crew's production rates."
        />
      </div>
    </div>
  );
}
