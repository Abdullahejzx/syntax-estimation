"use client";

import { ChevronDown, ListOrdered } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Heading = { id: string; text: string };

function useActiveHeading(headings: Heading[]) {
  const [active, setActive] = useState(headings[0]?.id ?? "");
  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // A heading counts as "current" once it reaches the upper third of the screen
      { rootMargin: "-100px 0px -66% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);
  return active;
}

function Links({ headings, active, onNavigate }: { headings: Heading[]; active: string; onNavigate?: () => void }) {
  return (
    <ol className="space-y-1">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            onClick={onNavigate}
            aria-current={active === h.id ? "location" : undefined}
            className={cn(
              "flex min-h-10 items-start gap-2 rounded-md px-3 py-2 text-body-sm transition-colors",
              active === h.id ? "bg-accent-50 font-semibold text-navy shadow-[inset_3px_0_0_var(--color-accent)]" : "text-body hover:bg-mist hover:text-navy",
            )}
          >
            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-blueprint" />
            <span>{h.text}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Contents list: a sticky sidebar on desktop, a collapsible dropdown above the article on phones and tablets. */
export function TableOfContents({ headings, variant }: { headings: Heading[]; variant: "sidebar" | "dropdown" }) {
  const active = useActiveHeading(headings);
  const [open, setOpen] = useState(false);
  if (!headings.length) return null;

  if (variant === "dropdown") {
    return (
      <nav aria-label="On this page" className="rounded-xl border border-line bg-white shadow-card">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="toc-dropdown"
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-12 w-full items-center justify-between gap-3 px-4 font-display font-semibold text-navy"
        >
          <span className="flex items-center gap-2">
            <ListOrdered aria-hidden="true" className="size-4 text-accent-ink" />
            On this page
          </span>
          <ChevronDown aria-hidden="true" className={cn("size-5 text-accent-ink transition-transform", open && "rotate-180")} />
        </button>
        <div id="toc-dropdown" hidden={!open} className="border-t border-line p-2">
          <Links headings={headings} active={active} onNavigate={() => setOpen(false)} />
        </div>
      </nav>
    );
  }

  return (
    <nav aria-label="On this page" className="rounded-xl border border-line bg-white p-4 shadow-card">
      <p className="mb-2 flex items-center gap-2 border-b border-line px-3 pb-3 text-caption font-bold uppercase tracking-wider text-navy">
        <ListOrdered aria-hidden="true" className="size-4 text-accent-ink" />
        On this page
      </p>
      <Links headings={headings} active={active} />
    </nav>
  );
}
