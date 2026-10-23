import { ClipboardCheck } from "lucide-react";
import { sampleBenefits, sampleRows } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { CheckList } from "@/components/ui/CheckList";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SampleRequestForm } from "./SampleRequestForm";

/** Deliverable preview: a CSI-coded takeoff table next to benefits and the sample request form. */
export function SampleEstimate() {
  return (
    <Section id="sample-estimate" tone="mist" labelledBy="sample-title" className="lg:py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="order-2 lg:order-1 lg:col-span-6">
            <figure className="rounded-xl border border-line bg-white p-4 shadow-lift sm:p-5">
              <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                <span className="flex items-center gap-1.5 text-label font-bold text-navy">
                  <ClipboardCheck aria-hidden="true" className="size-[18px] text-accent-ink" />
                  Deliverable preview: CSI MasterFormat sheet
                </span>
                <span className="text-caption text-body">Excel compatible</span>
              </figcaption>
              {/* Scrolls sideways on narrow screens instead of squashing columns */}
              <div className="-mx-4 overflow-x-auto px-4 pt-3 sm:mx-0 sm:px-0">
                <table className="tabular w-full min-w-[30rem] text-left text-[0.75rem]">
                  <caption className="sr-only">Sample takeoff line items with quantities and totals</caption>
                  <thead className="bg-blue-50 text-[0.6875rem] uppercase tracking-wide text-navy">
                    <tr>
                      <th scope="col" className="rounded-l p-2 font-semibold">CSI code</th>
                      <th scope="col" className="p-2 font-semibold">Description</th>
                      <th scope="col" className="p-2 text-right font-semibold">Qty</th>
                      <th scope="col" className="p-2 font-semibold">Unit</th>
                      <th scope="col" className="rounded-r p-2 text-right font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {sampleRows.map((row) => (
                      <tr key={row.code} className="transition-colors hover:bg-blue-50/50">
                        <td className="p-2 font-mono font-semibold text-accent-ink">{row.code}</td>
                        <td className="p-2 font-medium text-navy">{row.description}</td>
                        <td className="p-2 text-right">{row.qty}</td>
                        <td className="p-2 text-body">{row.unit}</td>
                        <td className="p-2 text-right font-bold text-navy">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex flex-col gap-1 rounded-lg bg-mist p-3 text-[0.75rem] sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-2 font-medium text-ink">
                  <span aria-hidden="true" className="size-3 rounded-full bg-accent" />
                  Includes marked-up PDF drawings
                </span>
                <span className="font-bold text-navy">Live formulas (.xlsx)</span>
              </div>
            </figure>
          </Reveal>

          <div className="order-1 flex flex-col items-start gap-4 lg:order-2 lg:col-span-6">
            <Eyebrow>Full transparency</Eyebrow>
            <h2 id="sample-title" className="text-headline-xl-mobile font-bold lg:text-headline-xl">
              See exactly what you get before you commit
            </h2>
            <p className="sm:text-body-lg">
              Every estimate comes with documentation your estimators and project managers can check line by
              line and paste straight into your bid.
            </p>
            <CheckList
              variant="circle"
              items={sampleBenefits.map((b) => (
                <>
                  <strong className="font-semibold text-navy">{b.strong}</strong> {b.rest}
                </>
              ))}
            />
            <div className="mt-2 w-full border-t border-line pt-5">
              <SampleRequestForm />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
