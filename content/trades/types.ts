import type { LucideIcon } from "lucide-react";
import type { AccordionItem } from "@/components/ui/Accordion";

/** One row of the takeoff sheet. Gross quantity is calculated from net × (1 + waste). */
export type TakeoffRow = { item: string; code: string; net: number; unit: string; waste: number };

/**
 * Everything a /trades/[slug] page needs. Each trade lives in its own file in this
 * folder; content/trades/index.ts lists them in menu order.
 */
export type Trade = {
  slug: string;
  /** Full name, used for page titles */
  name: string;
  /** Short name for menus and chips */
  shortName: string;
  /** Word used inside headings like "How We Price Your ___ Bid" (defaults to shortName) */
  label?: string;
  /** One sentence for menus and cards */
  summary: string;
  icon: LucideIcon;
  /** "trade" = specialty subcontractor trades; "client" = who we work with */
  group: "trade" | "client";

  seo: { title: string; description: string };
  hero: { tag: string; title: string; intro: string; badges: [string, string, string] };
  /** The takeoff summary card beside the hero copy */
  heroCard: { sheet: string; project: string; code: string; lines: { label: string; value: string; note?: string }[] };
  /** Four quick facts under the hero */
  facts: { label: string; value: string; text: string }[];
  /** Optional market segments (used by General Contractors and Suppliers) */
  segments?: {
    title: string;
    intro: string;
    items: { id: string; title: string; text: string; points: string[]; icon: LucideIcon }[];
  };
  scope: { title: string; intro: string; items: { title: string; text: string }[] };
  package: {
    title?: string;
    intro?: string;
    /** Four labelled areas on the marked-up plan */
    zones: { label: string; detail: string }[];
    rows: TakeoffRow[];
    /** Adds a total row summing every row in this unit */
    total?: { label: string; unit: string };
    /** Header for the waste column (e.g. "Allowance" for steel connections) */
    wasteLabel?: string;
    note: string;
  };
  /** Optional: suppliers price their own materials, so their page skips this */
  pricing?: { intro: string; pillars: { text: string; chip: string }[] };
  workflows: { title: string; intro: string; items: { title: string; text: string; points: [string, string] }[] };
  why: { title: string; points: { title: string; text: string }[]; tip: string; testimonialIndex: number };
  faqs: AccordionItem[];
  cta: { title: string; text: string };
};
