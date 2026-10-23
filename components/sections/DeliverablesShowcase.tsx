import { SquareCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type DeliverablesShowcaseProps = {
  title: string;
  intro?: string;
  items: { title: string; text: string }[];
  formats: string[];
  /** Rows shown in the spreadsheet mock-up: code, description, qty, unit, total */
  previewRows: [string, string, string, string, string][];
  fileName: string;
  tone?: "white" | "mist";
};

/** Spreadsheet + plan-markup mock-up beside a numbered list of what's in the package. */
export function DeliverablesShowcase({ title, intro, items, formats, previewRows, fileName, tone = "white" }: DeliverablesShowcaseProps) {
  return (
    <Section tone={tone} labelledBy="deliverables-title">
      <Container>
        <SectionHeading id="deliverables-title" align="left" title={title} intro={intro} />
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-6">
            <figure aria-label="Example deliverable: spreadsheet and marked-up plan" className="rounded-xl bg-navy p-3 shadow-float sm:p-4">
              <div className="flex items-center justify-between gap-3 rounded-t-lg bg-navy-950 px-3 py-2.5">
                <span className="flex min-w-0 items-center gap-2 text-caption text-white">
                  <span aria-hidden="true" className="flex gap-1">
                    <span className="size-2.5 rounded-full bg-[#f87171]" />
                    <span className="size-2.5 rounded-full bg-accent" />
                    <span className="size-2.5 rounded-full bg-white/70" />
                  </span>
                  <span className="truncate">{fileName}</span>
                </span>
                <span className="shrink-0 rounded bg-accent px-1.5 py-0.5 font-mono text-[0.625rem] font-bold text-navy">FORMULAS ON</span>
              </div>
              <div className="overflow-x-auto rounded-b-lg bg-white">
                <table className="tabular w-full min-w-[26rem] font-mono text-[0.6875rem]">
                  <thead className="bg-blue-50 text-left text-navy">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-semibold">CSI</th>
                      <th scope="col" className="px-3 py-2 font-semibold">DESCRIPTION</th>
                      <th scope="col" className="px-3 py-2 text-right font-semibold">QTY</th>
                      <th scope="col" className="px-3 py-2 text-right font-semibold">UNIT</th>
                      <th scope="col" className="px-3 py-2 text-right font-semibold">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-ink">
                    {previewRows.map(([code, desc, qty, unit, total]) => (
                      <tr key={code + desc}>
                        <td className="px-3 py-2 text-accent-ink">{code}</td>
                        <td className="max-w-[12rem] truncate px-3 py-2">{desc}</td>
                        <td className="px-3 py-2 text-right">{qty}</td>
                        <td className="px-3 py-2 text-right text-body">{unit}</td>
                        <td className="px-3 py-2 text-right font-bold text-navy">{total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 rounded-lg bg-navy-800 p-3">
                <div className="mb-2 flex justify-between gap-3 text-[0.6875rem] text-navy-200">
                  <span>Marked-up plan (vector PDF)</span>
                  <span className="hidden xs:inline">Sheet 3 of 48 · Level 1</span>
                </div>
                <svg viewBox="0 0 400 90" className="h-20 w-full" aria-hidden="true">
                  <rect x="20" y="10" width="160" height="70" fill="rgba(47,111,219,0.15)" stroke="#2f6fdb" strokeWidth="1.5" strokeDasharray="4 2" />
                  <rect x="200" y="10" width="180" height="70" fill="rgba(242,140,40,0.12)" stroke="#f28c28" strokeWidth="1.5" />
                  <line x1="20" y1="45" x2="180" y2="45" stroke="#2f6fdb" />
                  <line x1="200" y1="45" x2="380" y2="45" stroke="#f28c28" />
                  <text x="30" y="32" fill="#dfe8f8" fontSize="10" fontFamily="sans-serif">SLAB A: 12,400 SF</text>
                  <text x="210" y="32" fill="#fde3c6" fontSize="10" fontFamily="sans-serif">FRAMING B: 8,450 LF</text>
                  <circle cx="100" cy="45" r="3" fill="#2f6fdb" />
                  <circle cx="290" cy="45" r="3" fill="#f28c28" />
                </svg>
              </div>
            </figure>
          </Reveal>

          <div className="lg:col-span-6">
            <ol className="space-y-5">
              {items.map((item, i) => (
                <li key={item.title} className="flex gap-3">
                  <SquareCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-ink" />
                  <div>
                    <h3 className="text-[1rem] font-bold leading-snug">
                      {i + 1}. {item.title}
                    </h3>
                    <p className="mt-1 text-body-sm sm:text-body-md">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-xl border border-line bg-mist p-4">
              <p className="mb-3 text-caption font-semibold uppercase tracking-wider text-body">File formats you receive</p>
              <ul className="flex flex-wrap gap-2">
                {formats.map((f) => (
                  <li key={f} className="rounded-md border border-line bg-white px-2.5 py-1 text-caption font-semibold text-navy">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
