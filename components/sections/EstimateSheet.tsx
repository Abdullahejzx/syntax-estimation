import { ArrowRight, BadgeCheck, FileSpreadsheet, Lock, Sigma, Zap } from "lucide-react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export type SheetData = {
  title: string;
  meta: string;
  /** Worksheet names shown as tabs (informational, not interactive) */
  sheets: string[];
  columns: { label: string; numeric?: boolean }[];
  groups: { name: string; rows: string[][] }[];
  /** Subtotal / markup lines under the table */
  summary?: { label: string; value: string }[];
  total?: { label: string; value: string };
  note?: string;
};

type EstimateSheetProps = {
  data: SheetData;
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "white" | "mist";
};

/** Large worked-example spreadsheet. Scrolls sideways on narrow screens. */
export function EstimateSheet({ data, eyebrow = "Sample deliverable", title, intro, tone = "mist" }: EstimateSheetProps) {
  const colCount = data.columns.length;
  return (
    <Section id="sample-sheet" tone={tone} labelledBy="sheet-title">
      <Container>
        <SectionHeading id="sheet-title" eyebrow={eyebrow} eyebrowStyle="chip" title={title} intro={intro} />
        <Reveal>
          <figure className="overflow-hidden rounded-xl border border-line bg-white shadow-lift">
            <figcaption className="flex flex-col gap-2 bg-navy-950 px-4 py-3 text-white sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <span className="flex items-center gap-2 font-display text-[0.9375rem] font-bold">
                <FileSpreadsheet aria-hidden="true" className="size-5 shrink-0 text-accent" />
                {data.title}
              </span>
              <span className="flex items-center gap-2 text-caption text-navy-200">
                {data.meta}
                <span className="rounded border border-white/25 px-1.5 py-0.5 text-white">Illustrative example</span>
              </span>
            </figcaption>

            <div aria-hidden="true" className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line bg-mist px-3 pt-2">
              {data.sheets.map((sheet, i) => (
                <span
                  key={sheet}
                  className={cn(
                    "shrink-0 rounded-t-md px-3 py-2 text-caption",
                    i === 0 ? "border-b-2 border-accent bg-white font-bold text-navy" : "text-body",
                  )}
                >
                  {sheet}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-line px-4 py-2 text-caption sm:px-5">
              <span className="flex items-center gap-1.5 font-medium text-blueprint-ink">
                <Sigma aria-hidden="true" className="size-3.5" />
                Live formulas, unlocked cells
              </span>
              {data.note && <span className="text-body">{data.note}</span>}
            </div>

            <div className="overflow-x-auto">
              <table className="tabular w-full min-w-[44rem] text-left text-body-sm">
                <caption className="sr-only">{data.title}</caption>
                <thead>
                  <tr className="border-b border-line text-caption uppercase tracking-wider text-navy">
                    {data.columns.map((col) => (
                      <th key={col.label} scope="col" className={cn("px-4 py-3 font-semibold", col.numeric && "text-right")}>
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                {data.groups.map((group) => (
                  <tbody key={group.name} className="divide-y divide-line">
                    <tr className="bg-blue-50">
                      <th colSpan={colCount} scope="colgroup" className="px-4 py-2.5 text-caption font-bold uppercase tracking-wide text-navy">
                        {group.name}
                      </th>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.join("|")} className="transition-colors hover:bg-blue-50/40">
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={cn(
                              "px-4 py-3",
                              ci === 0 && "font-mono text-caption whitespace-nowrap text-accent-ink",
                              ci > 1 && "whitespace-nowrap",
                              ci === 1 && "text-ink",
                              data.columns[ci]?.numeric && "text-right",
                              ci === row.length - 1 && data.total && "font-bold text-navy",
                            )}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                ))}
                {data.summary && (
                  <tbody className="border-t-2 border-navy">
                    {data.summary.map((line, i) => (
                      <tr key={line.label}>
                        <td colSpan={colCount - 1} className={cn("px-4 py-2 text-right", i === 0 ? "pt-4 font-semibold text-navy" : "text-body")}>
                          {line.label}
                        </td>
                        <td className={cn("px-4 py-2 text-right", i === 0 ? "pt-4 font-bold text-navy" : "text-ink")}>{line.value}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>

            {data.total && (
              <div className="flex items-center justify-between gap-4 bg-navy-950 px-4 py-4 sm:justify-end sm:px-5">
                <span className="font-display text-[0.9375rem] font-bold uppercase tracking-wide text-white sm:text-headline-sm">
                  {data.total.label}
                </span>
                <span className="tabular font-display text-headline-sm font-extrabold text-accent sm:text-headline-md">{data.total.value}</span>
              </div>
            )}
          </figure>
        </Reveal>

        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-line bg-white p-5 shadow-card lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-body-sm text-ink">
            <li className="flex items-center gap-1.5">
              <BadgeCheck aria-hidden="true" className="size-4 text-accent-ink" />
              Marked-up PDF drawings included
            </li>
            <li className="flex items-center gap-1.5">
              <Lock aria-hidden="true" className="size-4 text-blueprint-ink" />
              Unlocked Excel (.xlsx)
            </li>
            <li className="flex items-center gap-1.5">
              <Zap aria-hidden="true" className="size-4 text-accent-ink" />
              Rush turnaround available
            </li>
          </ul>
          {/* TODO: point to a downloadable sample file once one exists */}
          <ButtonLink href="/#sample-estimate" fullOnMobile>
            Get the Full Sample Package
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
