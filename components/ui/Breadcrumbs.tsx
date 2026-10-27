import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import { cn } from "@/lib/cn";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export type Crumb = { label: string; href: string };

/**
 * Visible breadcrumb trail plus matching BreadcrumbList structured data. "Home" is added automatically.
 * `inverted` is for dark (photo) heroes.
 */
export function Breadcrumbs({ items, inverted }: { items: Crumb[]; inverted?: boolean }) {
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
                {i > 0 && <ChevronRight aria-hidden="true" className={cn("size-3.5", inverted ? "text-white/40" : "text-line-strong")} />}
                {last ? (
                  <span aria-current="page" className={cn("font-semibold", inverted ? "text-accent" : "text-accent-ink")}>
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className={cn("inline-flex items-center gap-1", inverted ? "text-navy-200 hover:text-white" : "text-body hover:text-navy")}
                  >
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
