import type { Stat } from "@/content/proof";
import { CountUp } from "@/components/motion/CountUp";
import { Container } from "@/components/ui/Container";

/** Navy band of big counting numbers. 2 columns on phones, 4 on desktop. */
export function StatsBand({
  stats,
  label = "Syntax Estimation by the numbers",
  note,
}: {
  stats: Stat[];
  label?: string;
  /** Optional line under the numbers */
  note?: string;
}) {
  return (
    <section aria-label={label} className="relative overflow-hidden bg-navy py-14 lg:py-16">
      <div aria-hidden="true" className="bg-blueprint-grid-light pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-10 text-center lg:grid-cols-4 lg:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse items-center">
              <dt className="text-caption font-semibold uppercase tracking-wider text-navy-200">{stat.label}</dt>
              <dd className="flex flex-col items-center">
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  className="tabular font-display text-headline-xl-mobile font-extrabold text-white sm:text-headline-xl lg:text-display"
                />
                <span aria-hidden="true" className="mt-2 mb-3 h-1 w-12 rounded-full bg-accent" />
              </dd>
            </div>
          ))}
        </dl>
        {note && <p className="mt-10 border-t border-white/10 pt-6 text-center text-body-sm font-medium text-navy-200">{note}</p>}
      </Container>
    </section>
  );
}
