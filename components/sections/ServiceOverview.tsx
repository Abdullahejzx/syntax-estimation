/* eslint-disable @next/next/no-img-element -- static export; photos are pre-sized WebP files */
import type { LucideIcon } from "lucide-react";
import { Laptop, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { Service } from "@/content/services";
import { photo } from "@/lib/images";
import { Reveal } from "@/components/motion/Reveal";
import { CheckList } from "@/components/ui/CheckList";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";

function ChipGroup({ icon: Icon, label, items }: { icon: LucideIcon; label: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-caption font-bold uppercase tracking-wider text-navy">
        <Icon aria-hidden="true" className="size-4 text-accent-ink" />
        {label}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-md border border-line bg-white px-2.5 py-1 text-body-sm font-medium text-navy">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Service page section under the hero: photo, what the service is, who it's for, deliverables and software. */
export function ServiceOverview({ service }: { service: Service }) {
  const { overview } = service;
  const image = photo(`service-${service.slug}`, "lg");
  return (
    <Section tone="mist" labelledBy="overview-title">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <figure className="relative">
              <img
                src={image.src}
                alt={image.alt}
                width={1600}
                height={900}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-xl object-cover shadow-lift lg:aspect-[4/5]"
              />
              <figcaption className="absolute right-4 bottom-4 left-4 flex items-center gap-3 rounded-lg bg-white/95 p-3 shadow-float backdrop-blur-sm sm:right-auto">
                <IconTile icon={service.icon} tone="accent" size="sm" />
                <span>
                  <span className="block text-caption uppercase tracking-wider text-body">{siteConfig.name}</span>
                  <span className="block font-display font-bold text-navy">{service.shortName}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-7">
            <Eyebrow variant="chip" className="mb-3">
              Service overview
            </Eyebrow>
            <h2 id="overview-title" className="text-headline-xl-mobile font-bold lg:text-headline-lg">
              {overview.title}
            </h2>
            {overview.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-4 text-body-md text-ink sm:text-body-lg">
                {p}
              </p>
            ))}

            <div className="mt-8 rounded-xl border border-line bg-white p-5 shadow-card sm:p-6">
              <h3 className="mb-3 text-caption font-bold uppercase tracking-wider text-navy">What you receive</h3>
              <CheckList items={overview.deliverables} className="grid gap-x-6 gap-y-2 space-y-0 sm:grid-cols-2" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <ChipGroup icon={Users} label="Who it's for" items={overview.audiences} />
              <ChipGroup icon={Laptop} label="Software we use" items={overview.software} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
