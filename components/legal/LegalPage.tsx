import Link from "next/link";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { legalLinks } from "@/content/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

export type LegalBlock = string | { list: string[] };

export type LegalDoc = {
  title: string;
  path: string;
  description: string;
  lastUpdated: string;
  intro: string;
  sections: { id: string; title: string; body: LegalBlock[] }[];
};

function Toc({ doc }: { doc: LegalDoc }) {
  return (
    <ol className="space-y-1 text-body-sm">
      {doc.sections.map((s, i) => (
        <li key={s.id}>
          <a href={`#${s.id}`} className="flex min-h-9 items-center gap-2 rounded-md px-2 text-body hover:bg-mist hover:text-navy">
            <span className="tabular w-5 shrink-0 text-caption text-blueprint">{i + 1}.</span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Plain text page for policies: title band, table of contents and readable body copy. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <section aria-labelledby="page-title" className="relative overflow-hidden border-b border-line bg-mist py-10 sm:py-14">
        <div aria-hidden="true" className="bg-blueprint-grid pointer-events-none absolute inset-0" />
        <Container className="relative">
          <Breadcrumbs items={[{ label: doc.title, href: doc.path }]} />
          <h1 id="page-title" className="text-display-mobile font-extrabold sm:text-headline-xl">
            {doc.title}
          </h1>
          <p className="mt-3 text-body-sm text-body">Last updated: {doc.lastUpdated}</p>
        </Container>
      </section>

      <Container className="py-10 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-4 xl:col-span-3">
            {/* Phones: collapsible contents list */}
            <details className="group rounded-lg border border-line bg-white lg:hidden">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 font-display font-semibold text-navy">
                On this page
                <ChevronDown aria-hidden="true" className="size-5 text-accent-ink transition-transform group-open:rotate-180" />
              </summary>
              <nav aria-label="On this page" className="border-t border-line p-2">
                <Toc doc={doc} />
              </nav>
            </details>
            <nav aria-label="On this page" className="sticky top-28 hidden rounded-xl border border-line bg-white p-4 lg:block">
              <p className="mb-2 px-2 text-caption font-semibold uppercase tracking-wider text-body">On this page</p>
              <Toc doc={doc} />
              <div className="mt-4 border-t border-line pt-4">
                <p className="mb-1 px-2 text-caption font-semibold uppercase tracking-wider text-body">Other policies</p>
                <ul>
                  {legalLinks
                    .filter((l) => l.href !== doc.path)
                    .map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="flex min-h-9 items-center rounded-md px-2 text-body-sm text-blueprint hover:bg-mist">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </nav>
          </aside>

          <article className="max-w-3xl lg:col-span-8 xl:col-span-9">
            <p className="text-body-lg text-ink">{doc.intro}</p>
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="mt-10 scroll-mt-28">
                <h2 id={`${s.id}-h`} className="text-headline-md font-bold">
                  {i + 1}. {s.title}
                </h2>
                {s.body.map((block, bi) =>
                  typeof block === "string" ? (
                    <p key={bi} className="mt-3 text-body-md leading-7 text-ink">
                      {block}
                    </p>
                  ) : (
                    <ul key={bi} className="mt-3 list-disc space-y-1.5 pl-5 text-body-md leading-7 text-ink marker:text-accent-ink">
                      {block.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}

            <div className="mt-12 rounded-xl border border-line bg-mist p-6">
              <h2 className="text-headline-sm font-bold">Questions about this policy?</h2>
              <p className="mt-1 text-body-md">Contact {siteConfig.legalName}:</p>
              <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:gap-6">
                <a href={`mailto:${siteConfig.email}`} className="flex min-h-11 items-center gap-2 font-semibold text-blueprint hover:underline">
                  <Mail aria-hidden="true" className="size-4" />
                  {siteConfig.email}
                </a>
                <a href={siteConfig.phoneHref} className="flex min-h-11 items-center gap-2 font-semibold text-blueprint hover:underline">
                  <Phone aria-hidden="true" className="size-4" />
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </>
  );
}
