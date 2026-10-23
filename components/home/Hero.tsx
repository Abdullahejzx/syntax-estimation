import { ArrowRight, CircleCheck, FileText } from "lucide-react";
import { quoteHref } from "@/content/navigation";
import { heroEstimate, heroStats } from "@/content/home";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** Dark CAD-plan panel with a floating takeoff summary card. Pure HTML/SVG, no images. */
function EstimatePreview() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-navy p-4 text-white shadow-float sm:p-5">
      <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-3 font-mono text-[0.6875rem] tracking-wider">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-accent" />
          CAD PLAN // LVL-02 STRUCT + MEP
        </span>
        <span className="hidden text-navy-300 xs:inline">SCALE 1/4&quot; = 1&apos;-0&quot;</span>
      </div>

      <div aria-hidden="true" className="py-3 font-mono text-[0.625rem] text-navy-300">
        <div className="flex justify-between text-accent-100">
          <span>[GRID A-04 TO G-12]</span>
          <span>SHEET S-201</span>
        </div>
        <svg viewBox="0 0 340 100" className="mt-2 h-24 w-full sm:h-28">
          <g fill="none" stroke="#8fa3c2" strokeOpacity="0.45" strokeWidth="1">
            <rect x="10" y="10" width="320" height="80" strokeDasharray="4 4" />
            <line x1="10" y1="50" x2="330" y2="50" />
            <line x1="120" y1="10" x2="120" y2="90" />
            <line x1="230" y1="10" x2="230" y2="90" />
            <path d="M10 98h320M10 95v6M330 95v6" />
          </g>
          <circle cx="120" cy="50" r="4" fill="#f28c28" />
          <circle cx="230" cy="50" r="4" fill="#dfe8f8" />
          <g fill="#8fa3c2" fontFamily="monospace" fontSize="9">
            <text x="22" y="32">SLAB S-1</text>
            <text x="132" y="32">DUCT TRUNK</text>
            <text x="242" y="32">PANEL RM 204</text>
            <text x="150" y="75">80&apos;-0&quot;</text>
          </g>
        </svg>
      </div>

      <div className="rounded-lg bg-white p-4 text-ink shadow-float">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-caption font-semibold uppercase text-blueprint-ink">Sample takeoff summary</p>
            <p className="font-display text-[1rem] font-bold text-navy">{heroEstimate.project}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded bg-blue-50 px-2 py-1 text-caption font-semibold text-navy">
            <CircleCheck aria-hidden="true" className="size-3.5 text-accent-ink" />
            Bid ready
          </span>
        </div>
        <ul className="tabular mt-3 space-y-1.5 text-[0.75rem]">
          {heroEstimate.lines.map((line) => (
            <li key={line.label} className="flex items-center justify-between gap-3 rounded bg-mist px-2 py-1.5">
              <span className="truncate font-medium">{line.label}</span>
              <span className="shrink-0 font-bold text-navy">
                {line.amount} <span className="hidden font-normal text-body sm:inline">({line.qty})</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-end justify-between gap-3 border-t border-line pt-3">
          <div>
            <p className="text-caption text-body">Total bid package</p>
            <p className="tabular font-display text-headline-md font-extrabold text-navy">{heroEstimate.total}</p>
          </div>
          <p className="text-right text-caption font-semibold text-accent-ink">{heroEstimate.turnaround}</p>
        </div>
      </div>
      <p className="mt-2 text-right text-[0.6875rem] text-navy-300">Illustrative example</p>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-24">
      <div aria-hidden="true" className="bg-blueprint-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-blue-100 opacity-60 blur-3xl"
      />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start gap-5 lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-mist px-3 py-1.5 text-caption font-semibold uppercase text-navy">
              <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
              New Jersey based · Estimating for all 50 states
            </p>

            <h1 id="hero-title" className="text-display-mobile font-extrabold sm:text-headline-xl lg:text-display">
              Accurate Construction Estimates.{" "}
              <span className="text-accent-strong underline decoration-blue-100 decoration-4 underline-offset-8">
                Delivered Fast.
              </span>
            </h1>

            <p className="max-w-2xl text-body-md sm:text-body-lg">
              Material takeoffs and bid-ready cost estimates prepared from your plans in 24 to 72 hours, for
              general contractors, subcontractors and suppliers who want to bid more work without adding
              overhead.
            </p>

            <div className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row">
              <ButtonLink href={quoteHref} size="lg" fullOnMobile>
                Upload Your Plans
                <ArrowRight aria-hidden="true" className="size-[18px]" />
              </ButtonLink>
              {/* TODO: link to a downloadable sample estimate PDF once one exists */}
              <ButtonLink href="/#sample-estimate" variant="secondary" size="lg" fullOnMobile>
                <FileText aria-hidden="true" className="size-[18px] text-blueprint-ink" />
                See a Sample Estimate
              </ButtonLink>
            </div>

            {/* TODO: placeholder stats (see content/home.ts) */}
            <dl className="grid w-full grid-cols-2 gap-3 pt-2 sm:grid-cols-3 sm:gap-4">
              {heroStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    "flex flex-col-reverse rounded-lg border border-line bg-mist p-3 sm:p-4",
                    i === heroStats.length - 1 && "col-span-2 sm:col-span-1",
                  )}
                >
                  <dt className="text-caption uppercase text-body">{stat.label}</dt>
                  <dd
                    className={cn(
                      "tabular font-display text-headline-lg-mobile font-bold sm:text-headline-lg",
                      stat.highlight ? "text-accent-strong" : "text-navy",
                    )}
                  >
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Reveal className="lg:col-span-5" delay={0.15}>
            <EstimatePreview />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
