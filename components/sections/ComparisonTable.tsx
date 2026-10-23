import { Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export type ComparisonRow = { feature: string; them: string; us: string };

type ComparisonTableProps = {
  rows: ComparisonRow[];
  title: string;
  intro?: string;
  eyebrow?: string;
  themLabel: string;
  usLabel: string;
  tone?: "white" | "mist";
};

/** Side-by-side comparison: a real table from 768px, stacked cards on phones. */
export function ComparisonTable({ rows, title, intro, eyebrow, themLabel, usLabel, tone = "mist" }: ComparisonTableProps) {
  return (
    <Section tone={tone} labelledBy="comparison-title">
      <Container>
        <SectionHeading id="comparison-title" eyebrow={eyebrow} eyebrowStyle="chip" title={title} intro={intro} />

        <div className="hidden overflow-hidden rounded-xl border border-line bg-white shadow-card md:block">
          <table className="w-full text-left text-body-sm">
            <caption className="sr-only">{title}</caption>
            <thead>
              <tr className="text-caption uppercase tracking-wider">
                <th scope="col" className="w-[24%] bg-blue-50 px-6 py-4 font-semibold text-navy">
                  Feature
                </th>
                <th scope="col" className="w-[36%] bg-blue-50 px-6 py-4 font-semibold text-body">
                  {themLabel}
                </th>
                <th scope="col" className="bg-navy px-6 py-4 font-semibold text-white">
                  <span className="flex items-center justify-between gap-3">
                    {usLabel}
                    <span className="rounded bg-accent px-2 py-0.5 text-[0.625rem] font-bold text-navy">Recommended</span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row" className="px-6 py-4 font-semibold text-navy">
                    {row.feature}
                  </th>
                  <td className="px-6 py-4 text-body">{row.them}</td>
                  <td className="bg-blue-50/60 px-6 py-4 font-semibold text-navy">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phones: one card per row */}
        <ul className="space-y-4 md:hidden">
          {rows.map((row) => (
            <li key={row.feature} className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
              <h3 className="bg-blue-50 px-4 py-3 text-[0.9375rem] font-bold">{row.feature}</h3>
              <dl className="divide-y divide-line text-body-sm">
                <div className="flex gap-3 px-4 py-3">
                  <Minus aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-body" />
                  <div>
                    <dt className="text-caption font-semibold uppercase text-body">{themLabel}</dt>
                    <dd className="text-body">{row.them}</dd>
                  </div>
                </div>
                <div className="flex gap-3 px-4 py-3">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-ink" strokeWidth={2.5} />
                  <div>
                    <dt className="text-caption font-semibold uppercase text-accent-ink">{usLabel}</dt>
                    <dd className="font-semibold text-navy">{row.us}</dd>
                  </div>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
