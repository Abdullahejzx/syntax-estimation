import type { LucideIcon } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

type PageHeroProps = {
  breadcrumbs: Crumb[];
  tag?: string;
  /** "blue" chip (services) or "accent" orange pill (trades), as in the designs */
  tagTone?: "blue" | "accent";
  title: React.ReactNode;
  intro: string;
  /** Buttons under the intro */
  actions?: React.ReactNode;
  /** Short proof points shown as a dotted row under the buttons */
  badges?: string[];
  /** Small icon cards shown under the buttons */
  highlights?: { icon: LucideIcon; title: string; text: string }[];
  /** Right-hand column (e.g. the quick quote form). Without it the copy stays at reading width. */
  aside?: React.ReactNode;
};

/** Inner-page hero on a mist background with the blueprint grid: breadcrumbs, H1, intro and CTAs. */
export function PageHero({
  breadcrumbs,
  tag,
  tagTone = "blue",
  title,
  intro,
  actions,
  badges,
  highlights,
  aside: asideNode,
}: PageHeroProps) {
  const aside = asideNode ? asideNode : null;
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden border-b border-line bg-mist py-10 sm:py-14 lg:py-20">
      <div aria-hidden="true" className="bg-blueprint-grid pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className={cn("grid grid-cols-1 gap-10", aside !== null && "items-start lg:grid-cols-12 lg:gap-12")}>
          <div className={cn("flex flex-col items-start", aside !== null ? "lg:col-span-7 lg:pt-6" : "max-w-4xl")}>
            <Breadcrumbs items={breadcrumbs} />
            {tag &&
              (tagTone === "accent" ? (
                <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-100 px-3 py-1 text-caption font-bold uppercase tracking-[0.1em] text-accent-ink">
                  <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
                  {tag}
                </p>
              ) : (
                <Eyebrow variant="chip" className="mb-4 border border-blueprint/25 bg-white">
                  {tag}
                </Eyebrow>
              ))}
            <h1 id="page-title" className="text-display-mobile font-extrabold sm:text-headline-xl lg:text-[3.25rem] lg:leading-[1.15]">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-body-md sm:text-body-lg">{intro}</p>

            {actions && <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">{actions}</div>}

            {badges && (
              <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-caption font-medium text-ink">
                {badges.map((badge) => (
                  <li key={badge} className="flex items-center gap-1.5">
                    <BadgeCheck aria-hidden="true" className="size-4 text-accent-ink" />
                    {badge}
                  </li>
                ))}
              </ul>
            )}

            {highlights && (
              <ul className="mt-8 grid w-full grid-cols-2 gap-3 border-t border-line pt-6 sm:grid-cols-3">
                {highlights.map(({ icon: Icon, title: label, text }, i) => (
                  <li
                    key={label}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg border border-line bg-white p-3 shadow-card sm:gap-3",
                      i === 2 && "col-span-2 sm:col-span-1",
                    )}
                  >
                    <Icon aria-hidden="true" className="size-6 shrink-0 text-accent-ink" strokeWidth={1.75} />
                    <span>
                      <span className="block text-body-sm font-semibold text-navy">{label}</span>
                      <span className="block text-caption text-body">{text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {aside !== null && (
            <Reveal className="lg:col-span-5" delay={0.1}>
              {aside}
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
