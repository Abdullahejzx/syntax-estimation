import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { features, homeFaqs, steps } from "@/content/home";
import { stats, testimonials } from "@/content/proof";
import { socialMetadata } from "@/lib/metadata";
import { localBusinessSchema } from "@/lib/schema";
import { Audiences } from "@/components/sections/Audiences";
import { Hero } from "@/components/home/Hero";
import { LatestInsights } from "@/components/home/LatestInsights";
import { Pricing } from "@/components/home/Pricing";
import { SampleEstimate } from "@/components/home/SampleEstimate";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { SoftwareStrip } from "@/components/sections/SoftwareStrip";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { StatsBand } from "@/components/sections/StatsBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { JsonLd } from "@/components/seo/JsonLd";

const title = "Construction Cost Estimating & Quantity Takeoff Services";
const description =
  "Accurate construction cost estimates and material takeoffs delivered in 24–72 hours for general contractors, subcontractors and suppliers in all 50 states.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${siteConfig.name}` },
  description,
  alternates: { canonical: "/" },
  ...socialMetadata({ title, description, path: "/" }),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <Hero />
      <SoftwareStrip />
      <ServicesGrid />
      <Audiences />
      <ProcessSteps
        id="how-it-works"
        eyebrow="How it works"
        title="From Blueprints to Bid in 4 Simple Steps"
        intro="A straightforward process built around tight bid deadlines."
        steps={steps}
      />
      <SampleEstimate />
      <Pricing />
      <FeatureGrid
        id="why-us"
        eyebrow="Why Bidnora Engineering"
        title="Engineered for Bid Accuracy & Speed"
        intro="Why contractors across the country hand their takeoffs to our team."
        items={features}
      />
      <StatsBand stats={stats} />
      <Testimonials items={testimonials} />
      <FaqSection items={homeFaqs} />
      <LatestInsights />
      <CtaBand />
    </>
  );
}
