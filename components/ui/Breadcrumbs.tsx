import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export type Crumb = { label: string; href: string };

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. "Home" is added automatically. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-body-sm">
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight aria-hidden="true" className="size-3.5 text-line-strong" />}
                {last ? (
                  <span aria-current="page" className="font-semibold text-accent-ink">
                    {crumb.label}
                  </span>
                ) : (
                  <Link href={crumb.href} className="inline-flex items-center gap-1 text-body hover:text-navy">
                    {i === 0 && <House aria-hidden="true" className="size-3.5" />}
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
