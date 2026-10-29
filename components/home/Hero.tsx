import { ArrowRight, FileText } from "lucide-react";
import { quoteHref } from "@/content/navigation";
import { heroSlides, heroStats } from "@/content/home";
import { photo } from "@/lib/images";
import { cn } from "@/lib/cn";
import { QuickQuoteForm } from "@/components/forms/QuickQuoteForm";
import { ButtonLink } from "@/components/ui/Button";
import { HeroSlider } from "./HeroSlider";

/**
 * Home hero, laid out like the service pages: headline, buttons and a sliding service
 * spotlight on the left, the quick quote form on the right, over rotating site photos.
 */
export function Hero() {
  return (
    <HeroSlider
      slides={heroSlides}
      images={heroSlides.map((s) => photo(s.image, "lg").src)}
      aside={
        <div className="relative overflow-hidden rounded-xl border border-line bg-white p-5 text-body shadow-float sm:p-7">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blueprint to-accent" />
          <QuickQuoteForm context="Home page hero" />
        </div>
      }
      footer={
        // TODO: placeholder stats (see content/home.ts)
        <dl className="mt-10 grid grid-cols-2 gap-3 border-t border-white/15 pt-8 sm:grid-cols-3 sm:gap-4 lg:mt-14">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col-reverse rounded-lg border border-white/15 bg-white/5 p-3 backdrop-blur-sm sm:p-4",
                i === heroStats.length - 1 && "col-span-2 sm:col-span-1",
              )}
            >
              <dt className="text-caption uppercase text-navy-200">{stat.label}</dt>
              <dd className={cn("tabular font-display text-headline-lg-mobile font-bold sm:text-headline-lg", stat.highlight ? "text-accent" : "text-white")}>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      }
    >
      <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-caption font-semibold uppercase text-white backdrop-blur-sm">
        <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
        Las Vegas based · Estimating for all 50 states
      </p>

      <h1 id="hero-title" className="text-display-mobile font-extrabold text-white sm:text-headline-xl lg:text-display">
        Accurate Construction Estimates. <span className="text-accent">Delivered Fast.</span>
      </h1>

      <p className="max-w-2xl text-body-md text-navy-200 sm:text-body-lg">
        Material takeoffs, bid-ready cost estimates and drafting prepared from your plans in 24 to 72 hours, for general
        contractors, subcontractors and suppliers who want to bid more work without adding overhead.
      </p>

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <ButtonLink href={quoteHref} size="lg" fullOnMobile>
          Upload Your Plans
          <ArrowRight aria-hidden="true" className="size-[18px]" />
        </ButtonLink>
        {/* TODO: link to a downloadable sample estimate PDF once one exists */}
        <ButtonLink href="/#sample-estimate" variant="outlineLight" size="lg" fullOnMobile>
          <FileText aria-hidden="true" className="size-[18px]" />
          See a Sample Estimate
        </ButtonLink>
      </div>
    </HeroSlider>
  );
}
