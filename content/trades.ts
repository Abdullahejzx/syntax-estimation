import type { LucideIcon } from "lucide-react";
import {
  BrickWall,
  Building2,
  Droplets,
  Frame,
  LayoutGrid,
  Layers,
  PaintRoller,
  Snowflake,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";

/**
 * One entry per trade or client type. The header menu, footer, home page and
 * (from Phase 3) the /trades/[slug] pages are all generated from this list,
 * so adding a trade means adding one entry here.
 */
export type Trade = {
  slug: string;
  name: string;
  /** Short name for menus and chips */
  shortName: string;
  summary: string;
  icon: LucideIcon;
  /** "trade" = specialty subcontractor trades; "client" = who we work with */
  group: "trade" | "client";
};

export const trades: Trade[] = [
  {
    slug: "concrete",
    name: "Concrete Estimating",
    shortName: "Concrete",
    summary: "Footings, slabs, walls, rebar and formwork quantified to the cubic yard.",
    icon: Layers,
    group: "trade",
  },
  {
    slug: "masonry",
    name: "Masonry Estimating",
    shortName: "Masonry",
    summary: "Block, brick, stone, grout and reinforcement counts by wall type.",
    icon: BrickWall,
    group: "trade",
  },
  {
    slug: "metal",
    name: "Metal & Steel Estimating",
    shortName: "Metal",
    summary: "Structural and miscellaneous metals, decking, rails and stairs by weight.",
    icon: Wrench,
    group: "trade",
  },
  {
    slug: "drywall",
    name: "Drywall Estimating",
    shortName: "Drywall",
    summary: "Board, framing, finish levels and accessories measured by room and wall type.",
    icon: Frame,
    group: "trade",
  },
  {
    slug: "insulation",
    name: "Insulation Estimating",
    shortName: "Insulation",
    summary: "Batt, blown, rigid and spray foam takeoffs with R-values and assemblies.",
    icon: Snowflake,
    group: "trade",
  },
  {
    slug: "painting",
    name: "Painting Estimating",
    shortName: "Painting",
    summary: "Wall, ceiling, trim and specialty coating areas with coats and finishes.",
    icon: PaintRoller,
    group: "trade",
  },
  {
    slug: "flooring",
    name: "Flooring Estimating",
    shortName: "Flooring",
    summary: "Tile, carpet, LVT, wood and base quantities including pattern waste.",
    icon: LayoutGrid,
    group: "trade",
  },
  {
    slug: "electrical",
    name: "Electrical Estimating",
    shortName: "Electrical",
    summary: "Devices, fixtures, conduit, wire and gear counted from the E-sheets.",
    icon: Zap,
    group: "trade",
  },
  {
    slug: "plumbing",
    name: "Plumbing Estimating",
    shortName: "Plumbing",
    summary: "Fixtures, piping runs and fittings by system and material.",
    icon: Droplets,
    group: "trade",
  },
  {
    slug: "general-contractor",
    name: "General Contractor Estimating",
    shortName: "General Contractors",
    summary: "Full-scope estimates for commercial, multi-family and public projects.",
    icon: Building2,
    group: "client",
  },
  {
    slug: "supplier",
    name: "Supplier & Manufacturer Takeoffs",
    shortName: "Suppliers",
    summary: "Bills of materials and product takeoffs so your sales team can quote faster.",
    icon: Truck,
    group: "client",
  },
];

export const specialtyTrades = trades.filter((t) => t.group === "trade");
export const clientTypes = trades.filter((t) => t.group === "client");
export const tradeHref = (slug: string) => `/trades/${slug}/`;
