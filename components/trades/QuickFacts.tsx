import type { Trade } from "@/content/trades";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

/** Strip of four fact cards under the trade hero. Two columns on phones. */
export function QuickFacts({ facts }: { facts: Trade["facts"] }) {
  return (
    <section aria-label="At a glance" className="bg-white py-8">
      <Container>
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
          {facts.map((fact, i) => (
            <div key={fact.label} className="flex flex-col rounded-lg border border-line bg-mist p-4 sm:p-5">
              <dt className={cn("text-[0.6875rem] font-semibold uppercase tracking-wider", i === 0 ? "text-accent-ink" : "text-body")}>
                {fact.label}
              </dt>
              <dd className="tabular mt-1 font-display text-headline-md font-bold text-navy sm:text-headline-lg">{fact.value}</dd>
              <dd className="mt-0.5 text-caption text-body sm:text-body-sm">{fact.text}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
