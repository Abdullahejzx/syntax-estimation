import type { LucideIcon } from "lucide-react";
import { Calculator, DraftingCompass, PencilRuler, Ruler, Waypoints } from "lucide-react";

/**
 * One entry per service. The header menu, footer, home page and (from Phase 2)
 * the /services/[slug] pages are all generated from this list.
 */
export type Service = {
  slug: string;
  /** Full name, used for page titles */
  name: string;
  /** Short name for menus and cards */
  shortName: string;
  /** One or two sentences for cards and menus */
  summary: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "cost-estimating",
    name: "Construction Cost Estimating",
    shortName: "Cost Estimating",
    summary:
      "Line-item material, labor and equipment pricing organized by CSI division and adjusted to your project's location.",
    icon: Calculator,
  },
  {
    slug: "quantity-takeoffs",
    name: "Quantity Takeoffs",
    shortName: "Quantity Takeoffs",
    summary:
      "Counts, lengths, areas and volumes measured from your drawings, with color-coded markups and an editable Excel workbook.",
    icon: Ruler,
  },
  {
    slug: "design-build",
    name: "Design-Build Estimating",
    shortName: "Design-Build",
    summary:
      "Early budgets and value-engineering input while the design is still moving, so the project lands inside its target cost.",
    icon: DraftingCompass,
  },
  {
    slug: "drafting",
    name: "Drafting Services",
    shortName: "Drafting",
    summary:
      "CAD drafting, as-built drawings, redline updates and permit sets prepared to your office standards.",
    icon: PencilRuler,
  },
  {
    slug: "structural-detailing-shop-drawings",
    name: "Structural Detailing & Shop Drawings",
    shortName: "Structural Detailing & Shop Drawings",
    summary:
      "Rebar and steel shop drawings, connection details and fabrication-ready schedules your shop can build from.",
    icon: Waypoints,
  },
];

export const serviceHref = (slug: string) => `/services/${slug}/`;
