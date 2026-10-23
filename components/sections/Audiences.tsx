import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { audiences } from "@/content/home";
import { specialtyTrades, tradeHref } from "@/content/trades";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { CheckList } from "@/components/ui/CheckList";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type AudiencesProps = {
  eyebrow?: string;
  eyebrowStyle?: "text" | "chip";
  title?: string;
  intro?: string;
  tone?: "white" | "mist";
};

/** "Tailored to your role" cards for GCs, subcontractors and suppliers. */
export function Audiences({
  eyebrow = "Who we serve",
  eyebrowStyle,
  title = "Tailored to Your Role in the Build",
  intro = "A GC, a drywall sub and a lumber yard need very different outputs. We set up every takeoff to fit how you price and build.",
  tone = "mist",
}: AudiencesProps) {
  return (
    <Section tone={tone} labelledBy="audiences-title">
      <Container>
        <SectionHeading id="audiences-title" eyebrow={eyebrow} eyebrowStyle={eyebrowStyle} title={title} intro={intro} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <article
                className={cn(
                  "card-lift flex h-full flex-col rounded-xl border bg-white p-6 sm:p-8",
                  a.featured ? "border-accent/40 shadow-lift" : "border-line shadow-card",
                )}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={cn(
                      "rounded px-2.5 py-1 text-caption font-semibold uppercase",
                      a.featured ? "bg-accent-100 text-accent-ink" : "bg-blue-50 text-navy",
                    )}
                  >
                    {a.tag}
                  </span>
                  <a.icon aria-hidden="true" className={cn("size-6", a.featured ? "text-accent-ink" : "text-blueprint")} />
                </div>
                <h3 className="text-headline-md font-bold">{a.title}</h3>
                <p className="mt-1 mb-4 text-caption font-semibold text-accent-ink">{a.subtitle}</p>
                <p className="mb-6 text-body-sm sm:text-body-md">{a.text}</p>

                <div className="mt-auto border-t border-line pt-4">
                  <p className="mb-2 text-[0.6875rem] font-bold uppercase tracking-wider text-body">{a.listLabel}</p>
                  {a.list.length > 0 ? (
                    <CheckList items={a.list} />
                  ) : (
                    <ul className="flex flex-wrap gap-1.5">
                      {specialtyTrades.map((t) => (
                        <li key={t.slug}>
                          <Link
                            href={tradeHref(t.slug)}
                            className="inline-flex min-h-8 items-center rounded border border-line bg-mist px-2.5 text-[0.75rem] font-semibold text-navy transition-colors hover:border-blueprint hover:text-blueprint"
                          >
                            {t.shortName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    href={a.href}
                    className="mt-5 inline-flex min-h-11 items-center gap-1 font-display text-[0.875rem] font-semibold text-accent-ink hover:text-navy"
                  >
                    {a.featured ? "Browse all trades" : `Estimating for ${a.title.toLowerCase()}`}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
