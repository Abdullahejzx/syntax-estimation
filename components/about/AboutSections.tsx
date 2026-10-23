import { BadgeCheck, Clock, FileSpreadsheet, MapPin, PencilRuler, Wrench } from "lucide-react";
import { about } from "@/content/about";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Section } from "@/components/ui/Section";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";

/** Hero visual: a drawing sheet, a takeoff line card and a "Based in New Jersey" badge, stacked. */
export function AboutVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto max-w-md pb-10 lg:max-w-none">
      <div className="rounded-xl border border-line bg-white p-3 shadow-lift">
        <div className="flex items-center justify-between rounded-md bg-mist px-3 py-2 text-caption">
          <span className="flex items-center gap-1.5 font-semibold text-navy">
            <PencilRuler className="size-3.5 text-blueprint" />
            FOUNDATION_SHEET_A2.1.dwg
          </span>
          <span className="hidden rounded bg-blue-50 px-1.5 py-0.5 text-[0.625rem] font-semibold text-blueprint sm:inline">QA checked</span>
        </div>
        <div className="bg-blueprint-grid relative mt-2 h-28 rounded-md bg-mist">
          <div className="absolute top-4 bottom-4 left-[18%] right-[18%] border-y border-dashed border-navy/50" />
          <div className="absolute top-3 bottom-3 left-[40%] border-l border-dashed border-navy/50" />
          <div className="absolute top-3 bottom-3 left-[68%] border-l border-dashed border-navy/50" />
          <span className="absolute top-8 left-[22%] rounded border border-blueprint bg-blue-50 px-2 py-1 text-[0.625rem] font-semibold text-blueprint">
            F-1 footing · 142.8 CY
          </span>
          <span className="absolute top-[4.25rem] right-[8%] rounded border sm:top-10 sm:right-[14%] border-accent bg-accent-50 px-2 py-1 text-[0.625rem] font-semibold text-accent-ink">
            #6 rebar · 4,820 LB
          </span>
        </div>
      </div>

      <div className="relative -mt-2 ml-0 w-[88%] rounded-xl border border-line bg-white p-4 shadow-float sm:-ml-6">
        <div className="flex items-start justify-between gap-3">
          <p className="flex items-center gap-2 font-display text-[1rem] font-bold text-navy">
            <FileSpreadsheet className="size-4 text-blueprint" />
            CSI 03 30 00 concrete takeoff
          </p>
          <span className="shrink-0 rounded bg-blue-50 px-2 py-0.5 text-[0.6875rem] font-semibold text-navy">.XLSX</span>
        </div>
        <ul className="tabular mt-3 space-y-1.5 text-caption">
          <li className="flex justify-between rounded bg-mist px-2.5 py-1.5 font-semibold text-navy">
            <span>Slab on grade 5&quot;, 4,000 PSI</span>
            <span>18,450 SF</span>
          </li>
          <li className="flex justify-between px-2.5 py-1.5 text-body">
            <span>Local rate, NJ ZIP 071</span>
            <span className="font-semibold text-navy">$7.42 / SF</span>
          </li>
          <li className="flex justify-between rounded bg-mist px-2.5 py-1.5 font-semibold text-navy">
            <span>Material & labor total</span>
            <span className="text-accent-ink">$136,899</span>
          </li>
        </ul>
      </div>

      <div className="absolute right-0 bottom-0 flex items-center gap-3 rounded-xl bg-navy px-4 py-3 text-white shadow-float">
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-navy-800">
          <MapPin className="size-5 text-accent" />
        </span>
        <span>
          <span className="block font-display text-[0.9375rem] font-bold">Based in New Jersey</span>
          <span className="block text-caption text-navy-200">Serving contractors in all 50 states</span>
        </span>
      </div>
    </div>
  );
}

export function StorySection() {
  const { story } = about;
  return (
    <Section labelledBy="story-title">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-3">{story.eyebrow}</Eyebrow>
            <h2 id="story-title" className="text-headline-xl-mobile font-bold lg:text-headline-xl">
              {story.title}
            </h2>
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} className="mt-4 sm:text-body-lg">
                {p}
              </p>
            ))}
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {story.badges.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2 font-display text-headline-sm font-semibold text-navy">
                  <Icon aria-hidden="true" className="size-5 text-accent-ink" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="lg:col-span-5">
            <div className="rounded-xl border border-line bg-white p-6 shadow-lift sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-headline-md font-bold">{story.card.title}</h3>
                <Wrench aria-hidden="true" className="size-6 text-blueprint" />
              </div>
              <ul className="space-y-6">
                {story.card.items.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <IconTile icon={item.icon} size="sm" />
                    <div>
                      <h4 className="text-headline-sm font-bold">{item.title}</h4>
                      <p className="mt-1 text-body-sm sm:text-body-md">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-start gap-2 rounded-lg bg-blue-50 p-4 text-body-sm text-ink">
                <BadgeCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-ink" />
                {story.card.note}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export function TimelineSection() {
  const { timeline } = about;
  return (
    <Section tone="mist" labelledBy="timeline-title">
      <Container>
        <SectionHeading id="timeline-title" eyebrow={timeline.eyebrow} title={timeline.title} intro={timeline.intro} />
        {/* TODO: placeholder milestones (see content/about.ts) */}
        <ol className="relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden="true" className="absolute top-[3.1rem] right-[10%] left-[10%] hidden h-px bg-line-strong lg:block" />
          {timeline.items.map((item, i) => {
            const now = i === timeline.items.length - 1;
            return (
              <Reveal as="li" key={item.title} delay={i * 0.07} className="relative">
                <article className="flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-card">
                  <p className="flex items-center gap-2 text-caption font-bold uppercase">
                    <span
                      className={cn(
                        "inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-caption",
                        now ? "bg-accent text-navy" : "bg-navy text-white",
                      )}
                    >
                      {item.badge}
                    </span>
                    <span className={now ? "text-accent-ink" : "text-navy"}>{item.label}</span>
                  </p>
                  <h3 className="mt-4 text-headline-sm font-bold">{item.title}</h3>
                  <p className="mt-2 text-body-sm sm:text-body-md">{item.text}</p>
                  <p className="mt-auto flex items-center gap-1.5 pt-5 text-caption text-body">
                    <Clock aria-hidden="true" className="size-3.5 text-blueprint" />
                    {item.foot}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

export function ValuesSection() {
  const { values } = about;
  return (
    <Section labelledBy="values-title">
      <Container>
        <SectionHeading id="values-title" eyebrow={values.eyebrow} title={values.title} intro={values.intro} />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {values.items.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 0.06}>
              <div className="card-lift flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-card">
                <IconTile icon={v.icon} tone={i === 1 ? "accent" : "blue"} className="mb-4" />
                <h3 className="text-headline-md font-bold">{v.title}</h3>
                <p className="mt-2 text-body-sm sm:text-body-md">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

export function TeamSection() {
  const { team } = about;
  return (
    <Section id="team" tone="mist" labelledBy="team-title">
      <Container>
        <SectionHeading id="team-title" eyebrow={team.eyebrow} title={team.title} intro={team.intro} />
        {/* TODO: placeholder team (see content/about.ts) */}
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {team.members.map((m, i) => (
            <Reveal as="li" key={m.name} delay={(i % 3) * 0.06}>
              <article className="card-lift flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-card">
                <div className="flex items-center gap-4">
                  <span aria-hidden="true" className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-navy font-display text-headline-sm font-bold text-white">
                    {initials(m.name)}
                  </span>
                  <div>
                    <h3 className="text-headline-sm font-bold">{m.name}</h3>
                    <p className="text-body-sm font-semibold text-blueprint">{m.role}</p>
                    <p className="flex items-center gap-1 text-caption text-body">
                      <Clock aria-hidden="true" className="size-3.5 text-accent-ink" />
                      {m.years} years of experience
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-body-sm sm:text-body-md">{m.bio}</p>
                <p className="mt-auto pt-5">
                  <span className="inline-block rounded-md border border-line bg-mist px-2.5 py-1 text-caption font-medium text-navy">{m.focus}</span>
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function ToolsSection() {
  const { tools } = about;
  return (
    <Section id="credentials" labelledBy="tools-title">
      <Container>
        <SectionHeading id="tools-title" eyebrow={tools.eyebrow} title={tools.title} intro={tools.intro} />
        <h3 className="mb-4 text-center text-caption font-semibold uppercase tracking-[0.12em] text-body">Takeoff & modeling software</h3>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {tools.software.map(({ icon: Icon, name, text }) => (
            <li key={name} className="flex flex-col items-center rounded-lg border border-line bg-mist p-4 text-center">
              <Icon aria-hidden="true" className="mb-2 size-6 text-blueprint" strokeWidth={1.75} />
              <span className="text-body-sm font-bold text-navy">{name}</span>
              <span className="text-caption text-body">{text}</span>
            </li>
          ))}
        </ul>
        <h3 className="mt-10 mb-4 text-center text-caption font-semibold uppercase tracking-[0.12em] text-body">Methods & background</h3>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {tools.methods.map(({ icon: Icon, name, text }, i) => (
            <li
              key={name}
              className={cn(
                "flex items-center gap-3 rounded-lg border border-line bg-white p-4 shadow-card",
                i === tools.methods.length - 1 && "col-span-2 sm:col-span-1",
              )}
            >
              <Icon aria-hidden="true" className="size-6 shrink-0 text-accent-ink" strokeWidth={1.75} />
              <span>
                <span className="block text-body-sm font-bold text-navy">{name}</span>
                <span className="block text-caption text-body">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

// Approximate positions (percent of the map box) for the coverage graphic
const mapPins = [
  { label: "SEA", x: 12, y: 14 },
  { label: "LA", x: 10, y: 62 },
  { label: "DFW", x: 46, y: 74 },
  { label: "CHI", x: 62, y: 30 },
  { label: "ATL", x: 72, y: 66 },
];
const hq = { x: 88, y: 32 };

export function CoverageSection() {
  const { coverage } = about;
  return (
    <Section tone="mist" labelledBy="coverage-title">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-3">{coverage.eyebrow}</Eyebrow>
            <h2 id="coverage-title" className="text-headline-xl-mobile font-bold lg:text-headline-xl">
              {coverage.title}
            </h2>
            <p className="mt-4 sm:text-body-lg">{coverage.intro}</p>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {coverage.markets.map((m) => (
                <li key={m.city} className="rounded-lg border border-line bg-white px-3 py-2.5 shadow-card">
                  <span className="block text-body-sm font-bold text-navy">{m.city}</span>
                  <span className="block text-caption text-body">{m.note}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-start gap-2 text-caption text-body">
              <BadgeCheck aria-hidden="true" className="mt-px size-4 shrink-0 text-accent-ink" />
              {coverage.note}
            </p>
          </div>
          <Reveal className="lg:col-span-7">
            <figure className="rounded-xl border border-line bg-white p-4 shadow-lift sm:p-6">
              <figcaption className="mb-4 flex items-center justify-between text-body-sm">
                <span className="flex items-center gap-2 font-semibold text-navy">
                  <span aria-hidden="true" className="size-2.5 rounded-full bg-accent" />
                  US labor & material pricing
                </span>
                <span className="text-caption text-body">50 states covered</span>
              </figcaption>
              <div className="bg-blueprint-grid relative aspect-[16/9] overflow-hidden rounded-lg bg-mist">
                <svg viewBox="0 0 100 56" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
                  {mapPins.map((p) => (
                    <path
                      key={p.label}
                      d={`M${p.x} ${p.y * 0.56} Q ${(p.x + hq.x) / 2} ${Math.min(p.y, hq.y) * 0.56 - 8} ${hq.x} ${hq.y * 0.56}`}
                      fill="none"
                      stroke="#2f6fdb"
                      strokeWidth="0.35"
                      strokeDasharray="1.2 1"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>
                {mapPins.map((p) => (
                  <span key={p.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                    <span className="block size-2.5 rounded-full bg-navy ring-4 ring-navy/10" />
                    <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[0.625rem] font-bold text-navy">{p.label}</span>
                  </span>
                ))}
                <span className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${hq.x}%`, top: `${hq.y}%` }}>
                  <span className="block size-3.5 rounded-full border-[3px] border-accent bg-white" />
                  <span className="absolute top-4 right-0 rounded bg-navy px-1.5 py-0.5 text-[0.625rem] font-bold whitespace-nowrap text-white">NJ HQ</span>
                </span>
              </div>
              <div className="mt-4 flex flex-wrap justify-between gap-2 text-caption font-medium text-navy">
                <span className="flex items-center gap-1.5">
                  <BadgeCheck aria-hidden="true" className="size-4 text-accent-ink" />
                  US-based estimators
                </span>
                <span className="text-body">Pricing adjusted by ZIP code</span>
              </div>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
