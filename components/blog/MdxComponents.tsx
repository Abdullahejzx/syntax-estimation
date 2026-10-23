import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { ArrowRight, Lightbulb, Phone, Quote, TriangleAlert } from "lucide-react";
import { siteConfig } from "@/config/site";
import { quoteHref } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";

/*
 * Components available inside blog posts (content/blog/*.mdx). Usage:
 *
 *   <ProTip title="Check the geotech report">Body text with **markdown**.</ProTip>
 *   <CommonMistake title="Assuming 60' bars">Body text.</CommonMistake>
 *   <ChecklistItem number="03" title="Bulkheads & chamfers">Body text.</ChecklistItem>
 *   <PullQuote by="Daniel Brooks, Chief Estimator">Quote text.</PullQuote>
 *   <MidArticleCta title="Bidding a concrete job?" text="We'll run the takeoff." />
 *
 * Props must be plain strings (MDX expressions like {3} are disabled for safety).
 */

function ProTip({ title = "Pro tip", children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="not-prose my-8 flex gap-4 rounded-r-xl border-l-4 border-navy bg-blue-50 p-5 sm:p-6">
      <span aria-hidden="true" className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-navy text-white">
        <Lightbulb className="size-5" />
      </span>
      <div className="min-w-0 text-body-md text-ink [&_p]:my-1.5 [&_p]:text-body-md [&_p]:leading-6 [&_strong]:text-navy">
        <span className="block font-display text-headline-sm font-bold text-navy">
          <span className="sr-only">Pro tip: </span>
          {title}
        </span>
        {children}
      </div>
    </aside>
  );
}

function CommonMistake({ title = "Common mistake", children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="not-prose my-8 flex gap-4 rounded-r-xl border-l-4 border-accent bg-accent-50 p-5 sm:p-6">
      <span aria-hidden="true" className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-navy">
        <TriangleAlert className="size-5" />
      </span>
      <div className="min-w-0 text-body-md text-ink [&_p]:my-1.5 [&_p]:text-body-md [&_p]:leading-6 [&_strong]:text-accent-ink">
        <span className="block font-display text-headline-sm font-bold text-accent-ink">
          <span className="sr-only">Common mistake: </span>
          {title}
        </span>
        {children}
      </div>
    </aside>
  );
}

function ChecklistItem({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="not-prose my-4 flex gap-4 rounded-xl border border-line bg-white p-5 shadow-card">
      <span aria-hidden="true" className="tabular inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-navy font-display font-bold text-white">
        {number}
      </span>
      <div className="min-w-0">
        <h3 className="text-headline-sm font-bold">
          <span className="sr-only">Item {number}: </span>
          {title}
        </h3>
        <div className="mt-1 text-body-sm text-body [&_p]:my-0.5 [&_p]:text-body-sm [&_p]:leading-6 [&_p]:text-body sm:[&_p]:text-body-md">{children}</div>
      </div>
    </div>
  );
}

function PullQuote({ by, children }: { by?: string; children: React.ReactNode }) {
  return (
    <figure className="not-prose relative my-10 rounded-xl bg-blue-50 px-6 py-8 text-center sm:px-10">
      <Quote aria-hidden="true" className="absolute top-4 left-4 size-10 text-accent/30" />
      <blockquote className="font-display text-headline-sm leading-snug font-semibold text-navy italic sm:text-headline-md [&_p]:m-0 [&_p]:font-display [&_p]:text-[inherit] [&_p]:leading-[inherit] [&_p]:text-navy">
        {children}
      </blockquote>
      {by && <figcaption className="mt-4 text-caption font-bold uppercase tracking-wider text-accent-ink">— {by}</figcaption>}
    </figure>
  );
}

function MidArticleCta({
  eyebrow = "Free quote",
  title = "Want us to run the numbers?",
  text = "Send your drawings and get a fixed quote and delivery date for your takeoff or estimate.",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
}) {
  return (
    <aside aria-label="Free quote offer" className="not-prose relative my-10 overflow-hidden rounded-xl bg-navy p-6 text-navy-200 shadow-float sm:p-8">
      <div aria-hidden="true" className="bg-blueprint-grid-light pointer-events-none absolute inset-0" />
      <div className="relative">
        <p className="inline-block rounded bg-accent px-2 py-1 text-[0.6875rem] font-bold uppercase tracking-wide text-navy">{eyebrow}</p>
        <p className="mt-4 font-display text-headline-md font-bold text-white sm:text-headline-lg">{title}</p>
        <p className="mt-3 text-body-md">{text}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={quoteHref} fullOnMobile>
            Upload Plans for a Free Quote
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
          <a href={siteConfig.phoneHref} className="inline-flex min-h-11 items-center justify-center gap-2 font-semibold text-white hover:text-accent">
            <Phone aria-hidden="true" className="size-4 text-accent" />
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </aside>
  );
}

/** Styling for the plain Markdown elements inside a post. */
const elements = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 {...props} className="mt-12 mb-4 scroll-mt-28 text-headline-lg-mobile font-bold sm:text-headline-lg" />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} className="mt-8 mb-3 scroll-mt-28 text-headline-sm font-bold sm:text-headline-md" />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p {...props} className="my-4 text-body-md leading-7 text-ink sm:text-[1.0625rem] sm:leading-8" />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => <ul {...props} className="my-4 list-disc space-y-2 pl-6 text-body-md leading-7 text-ink marker:text-accent-ink" />,
  ol: (props: ComponentPropsWithoutRef<"ol">) => <ol {...props} className="my-4 list-decimal space-y-2 pl-6 text-body-md leading-7 text-ink marker:font-bold marker:text-navy" />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => <strong {...props} className="font-semibold text-navy" />,
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const className = "font-semibold text-blueprint-ink underline underline-offset-2 hover:text-navy";
    return href.startsWith("/") ? (
      <Link href={href} {...props} className={className} />
    ) : (
      <a href={href} {...props} className={className} target="_blank" rel="noopener noreferrer" />
    );
  },
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote {...props} className="my-6 border-l-4 border-line-strong pl-4 text-body-md text-body italic" />
  ),
  hr: () => <hr className="my-10 border-line" />,
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-line bg-white shadow-card">
      <table {...props} className="tabular w-full min-w-[32rem] text-left text-body-sm" />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => <thead {...props} className="bg-blue-50 text-caption uppercase tracking-wide text-navy" />,
  th: (props: ComponentPropsWithoutRef<"th">) => <th {...props} className="px-4 py-3 font-semibold" />,
  td: (props: ComponentPropsWithoutRef<"td">) => <td {...props} className={cn("border-t border-line px-4 py-3 text-ink")} />,
};

export const mdxComponents = { ...elements, ProTip, CommonMistake, ChecklistItem, PullQuote, MidArticleCta };
