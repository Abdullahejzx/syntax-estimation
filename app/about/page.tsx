import { ArrowRight, ShieldCheck } from "lucide-react";
import { about } from "@/content/about";
import { quoteHref } from "@/content/navigation";
import { stats, testimonials } from "@/content/proof";
import { pageMetadata } from "@/lib/metadata";
import { localBusinessSchema } from "@/lib/schema";
import {
  AboutVisual,
  CoverageSection,
  StorySection,
  TeamSection,
  TimelineSection,
  ToolsSection,
  ValuesSection,
} from "@/components/about/AboutSections";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { StatsBand } from "@/components/sections/StatsBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = pageMetadata({ ...about.seo, path: "/about/" });

export default function AboutPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <PageHero
        breadcrumbs={[{ label: "About Us", href: "/about/" }]}
        tag={about.hero.tag}
        tagTone="accent"
        title={
          <>
            {about.hero.titleStart} <span className="text-blueprint">{about.hero.titleEnd}</span>
          </>
        }
        intro={about.hero.intro}
        badges={about.hero.badges}
        actions={
          <>
            <ButtonLink href={quoteHref} size="lg" fullOnMobile>
              Get a Free Quote
              <ArrowRight aria-hidden="true" className="size-[18px]" />
            </ButtonLink>
            <ButtonLink href="#credentials" variant="secondary" size="lg" fullOnMobile>
              <ShieldCheck aria-hidden="true" className="size-[18px] text-blueprint" />
              View Our Credentials
            </ButtonLink>
          </>
        }
        aside={<AboutVisual />}
      />
      <StorySection />
      <TimelineSection />
      <ValuesSection />
      <StatsBand stats={stats} note={about.statsNote} />
      <TeamSection />
      <ToolsSection />
      <CoverageSection />
      <Testimonials
        title="Trusted by Builders Across the Country"
        intro="What general contractors, trade subcontractors and suppliers say about working with us."
        items={testimonials}
      />
      <CtaBand {...about.cta} />
    </>
  );
}
