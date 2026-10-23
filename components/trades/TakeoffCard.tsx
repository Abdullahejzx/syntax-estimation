import { FileSpreadsheet, PencilRuler } from "lucide-react";
import type { Trade } from "@/content/trades";
import { cn } from "@/lib/cn";

const swatches = ["bg-blueprint", "bg-accent", "bg-navy", "bg-blue-100"];

/** Hero visual for trade pages: a drawing sheet with a takeoff summary card on top. */
export function TakeoffCard({ card }: { card: Trade["heroCard"] }) {
  return (
    <figure aria-label={`Sample takeoff summary: ${card.project}`} className="rounded-xl border border-line bg-white p-3 shadow-float sm:p-4">
      <figcaption className="flex items-center justify-between gap-3 rounded-lg bg-mist px-3 py-2.5 text-caption">
        <span className="flex min-w-0 items-center gap-2 font-semibold uppercase text-navy">
          <PencilRuler aria-hidden="true" className="size-4 shrink-0 text-blueprint" />
          <span className="truncate">{card.sheet}</span>
        </span>
        <span className="hidden shrink-0 font-mono text-[0.6875rem] text-body xs:inline">SCALE 1/8&quot; = 1&apos;-0&quot;</span>
      </figcaption>

      {/* Stylized plan drawing */}
      <div aria-hidden="true" className="bg-blueprint-grid-light relative mt-3 h-36 overflow-hidden rounded-lg bg-navy sm:h-40">
        <div className="absolute top-8 left-6 right-16 bottom-4 border-2 border-accent" />
        <div className="absolute top-11 left-10 right-24 bottom-9 border-2 border-dashed border-blueprint bg-blueprint/20" />
        <div className="absolute top-11 left-10 right-24 bottom-9 grid grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="border-r border-blueprint/30" />
          ))}
        </div>
        <span className="absolute top-2 left-3 font-mono text-[0.625rem] text-navy-200">REV 02</span>
        <span className="absolute top-2 right-3 font-mono text-[0.625rem] text-accent">TAKEOFF ACTIVE</span>
      </div>

      <div className="relative -mt-8 mx-2 rounded-lg border border-line bg-white p-3 shadow-lift sm:mx-3 sm:p-4">
        <div className="flex items-start justify-between gap-3 rounded-md bg-mist px-3 py-2">
          <div className="min-w-0">
            <p className="font-display text-[0.9375rem] font-bold text-navy">{card.project}</p>
            <p className="text-caption text-body">Illustrative example</p>
          </div>
          <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[0.6875rem] font-semibold text-accent-ink">QA checked</span>
        </div>
        <ul className="tabular mt-2 divide-y divide-line text-body-sm">
          {card.lines.map((line, i) => (
            <li key={line.label} className="flex items-center justify-between gap-3 px-1 py-2">
              <span className="flex min-w-0 items-center gap-2 text-ink">
                <span aria-hidden="true" className={cn("size-2.5 shrink-0 rounded-sm", swatches[i % swatches.length])} />
                <span className="truncate">{line.label}</span>
              </span>
              <span className="shrink-0 font-bold text-navy">
                {line.value}
                {line.note && <span className="ml-1 hidden text-caption font-normal text-body sm:inline">({line.note})</span>}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex items-center justify-between gap-3 rounded-md bg-blue-50 px-3 py-2 text-caption">
          <span className="truncate font-medium text-navy">{card.code}</span>
          <span className="flex shrink-0 items-center gap-1 font-semibold text-accent-ink">
            <FileSpreadsheet aria-hidden="true" className="size-3.5" />
            Excel ready
          </span>
        </div>
      </div>
    </figure>
  );
}
