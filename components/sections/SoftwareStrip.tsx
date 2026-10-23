import { software } from "@/content/home";
import { Container } from "@/components/ui/Container";

/** "Built with" row of tools. Wraps and centers on desktop, swipes on phones. */
export function SoftwareStrip() {
  return (
    <section aria-labelledby="software-title" className="border-y border-line bg-mist py-6">
      <Container className="flex flex-col items-center gap-3">
        <h2 id="software-title" className="text-center font-sans text-caption font-semibold uppercase tracking-[0.12em] text-body">
          Estimates built with industry-standard software
        </h2>
        <ul className="no-scrollbar -mx-4 flex w-[calc(100%+2rem)] snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:w-auto sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
          {software.map(({ name, icon: Icon }, i) => (
            <li
              key={name}
              className="flex shrink-0 snap-start items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 shadow-card"
            >
              <Icon aria-hidden="true" className={i % 2 ? "size-[18px] text-accent-ink" : "size-[18px] text-blueprint-ink"} />
              <span className="text-label font-semibold text-navy">{name}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
