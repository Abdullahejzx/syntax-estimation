import { FileSpreadsheet, FileText } from "lucide-react";
import type { TakeoffRow, Trade } from "@/content/trades";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const zoneStyles = [
  { box: "border-blueprint bg-blue-50", text: "text-blueprint-ink", dot: "bg-blueprint" },
  { box: "border-accent bg-accent-50", text: "text-accent-ink", dot: "bg-accent" },
  { box: "border-[#7c3aed] bg-[#f5f3ff]", text: "text-[#5b21b6]", dot: "bg-[#7c3aed]" },
  { box: "border-[#059669] bg-[#ecfdf5]", text: "text-[#047857]", dot: "bg-[#059669]" },
];

const fmt = (n: number, decimals: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Gross = net × (1 + waste). Whole-number units round up, since you can't order part of a sheet. */
function gross(row: TakeoffRow) {
  const value = row.net * (1 + row.waste);
  return Number.isInteger(row.net) ? Math.ceil(value - 1e-9) : Math.round(value * 10) / 10;
}
const decimalsOf = (row: TakeoffRow) => (Number.isInteger(row.net) ? 0 : 1);

/** Marked-up plan beside the itemized takeoff sheet, both as they'd arrive in the package. */
export function TradePackage({ data, tradeName }: { data: Trade["package"]; tradeName: string }) {
  const totalRows = data.total ? data.rows.filter((r) => r.unit === data.total!.unit) : [];
  const totalNet = totalRows.reduce((s, r) => s + r.net, 0);
  const totalGross = totalRows.reduce((s, r) => s + gross(r), 0);

  return (
    <Section id="package" labelledBy="package-title">
      <Container>
        <SectionHeading
          id="package-title"
          eyebrow="What you receive"
          title={data.title ?? `See What You Receive in Your ${tradeName} Package`}
          intro={data.intro ?? "Color-coded plan markups paired with an unlocked takeoff sheet you can load straight into your bid."}
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <figure className="flex h-full flex-col rounded-xl bg-blue-50 p-4 sm:p-5">
              <figcaption className="mb-4 flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2.5 shadow-card">
                <span className="flex items-center gap-2 text-body-sm font-semibold text-navy">
                  <FileText aria-hidden="true" className="size-4 text-accent-ink" />
                  Marked-up plan sheet (.PDF)
                </span>
                <span className="rounded bg-navy px-2 py-0.5 text-[0.625rem] font-bold uppercase text-white">Vector</span>
              </figcaption>
              <div className="bg-blueprint-grid grid flex-1 grid-cols-2 gap-3 rounded-lg bg-white p-3">
                {data.zones.map((zone, i) => (
                  <div key={zone.label} className={cn("flex min-h-24 flex-col justify-between rounded border-2 p-3", zoneStyles[i % 4].box)}>
                    <p className={cn("text-caption font-bold uppercase", zoneStyles[i % 4].text)}>{zone.label}</p>
                    <p className="mt-2 text-caption text-ink">{zone.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-caption text-body">Every measurement is color-coded and tied to its sheet number.</p>
            </figure>
          </Reveal>

          <Reveal delay={0.08}>
            <figure className="flex h-full flex-col rounded-xl bg-blue-50 p-4 sm:p-5">
              <figcaption className="mb-4 flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2.5 shadow-card">
                <span className="flex items-center gap-2 text-body-sm font-semibold text-navy">
                  <FileSpreadsheet aria-hidden="true" className="size-4 text-blueprint-ink" />
                  Itemized takeoff sheet (.XLSX)
                </span>
                <span className="rounded bg-[#047857] px-2 py-0.5 text-[0.625rem] font-bold uppercase text-white">Unlocked</span>
              </figcaption>
              <div className="flex-1 overflow-x-auto rounded-lg bg-white">
                <table className="tabular w-full min-w-[34rem] text-left text-caption">
                  <caption className="sr-only">Sample {tradeName.toLowerCase()} takeoff quantities</caption>
                  <thead className="bg-mist text-[0.6875rem] uppercase tracking-wide text-navy">
                    <tr>
                      <th scope="col" className="px-3 py-2.5 font-semibold">Item</th>
                      <th scope="col" className="px-3 py-2.5 font-semibold">CSI</th>
                      <th scope="col" className="px-3 py-2.5 text-right font-semibold">Net</th>
                      <th scope="col" className="px-3 py-2.5 font-semibold">Unit</th>
                      <th scope="col" className="px-3 py-2.5 text-right font-semibold">{data.wasteLabel ?? "Waste"}</th>
                      <th scope="col" className="px-3 py-2.5 text-right font-semibold">Gross</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {data.rows.map((row) => (
                      <tr key={row.item}>
                        <td className="px-3 py-2.5 text-ink">{row.item}</td>
                        <td className="px-3 py-2.5 font-mono whitespace-nowrap text-accent-ink">{row.code}</td>
                        <td className="px-3 py-2.5 text-right whitespace-nowrap">{fmt(row.net, decimalsOf(row))}</td>
                        <td className="px-3 py-2.5 text-body">{row.unit}</td>
                        <td className="px-3 py-2.5 text-right text-body">{row.waste ? `${Math.round(row.waste * 100)}%` : "—"}</td>
                        <td className="px-3 py-2.5 text-right font-bold whitespace-nowrap text-navy">{fmt(gross(row), decimalsOf(row))}</td>
                      </tr>
                    ))}
                  </tbody>
                  {data.total && (
                    <tfoot>
                      <tr className="bg-blue-50 font-bold text-navy">
                        <th scope="row" colSpan={2} className="px-3 py-2.5 uppercase">
                          {data.total.label}
                        </th>
                        <td className="px-3 py-2.5 text-right">{fmt(totalNet, 1)}</td>
                        <td className="px-3 py-2.5">{data.total.unit}</td>
                        <td className="px-3 py-2.5 text-right">—</td>
                        <td className="px-3 py-2.5 text-right text-accent-ink">{fmt(totalGross, 1)}</td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
              <p className="mt-3 text-caption text-body">Live formulas: change any waste factor and the gross quantity updates.</p>
            </figure>
          </Reveal>
        </div>
        <p className="mt-6 rounded-lg bg-blue-50 px-5 py-4 text-center text-body-sm text-ink">
          <strong className="text-navy">Illustrative example.</strong> {data.note}
        </p>
      </Container>
    </Section>
  );
}
