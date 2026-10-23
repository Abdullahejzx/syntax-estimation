import type { LucideIcon } from "lucide-react";
import {
  Building2,
  ClipboardCheck,
  Clock,
  Database,
  FileSpreadsheet,
  Hammer,
  Layers,
  MapPin,
  PencilRuler,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  Truck,
  Upload,
  UserCheck,
  Users,
} from "lucide-react";
import type { AccordionItem } from "@/components/ui/Accordion";
import { formatStat, stats } from "./proof";

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

// TODO: placeholder stats. The first one comes from content/proof.ts so it always matches the stats band.
export const heroStats = [
  { value: formatStat(stats[0]), label: stats[0].label, highlight: false },
  { value: "24–72 hr", label: "Turnaround", highlight: true },
  { value: "All 50", label: "US states covered", highlight: false },
];

// Illustrative numbers for the hero's sample takeoff card (not a real project).
export const heroEstimate = {
  project: "Mixed-Use Building, Phase 1",
  lines: [
    { label: "Div 03 · Cast-in-Place Concrete", amount: "$418,290", qty: "1,420 CY" },
    { label: "Div 05 · Structural Steel", amount: "$684,150", qty: "312 TON" },
    { label: "Div 09 · Drywall & Ceilings", amount: "$295,400", qty: "48.2k SF" },
    { label: "Div 26 · Electrical", amount: "$522,800", qty: "Full scope" },
  ],
  total: "$1,920,640",
  turnaround: "Delivered in 36 hours",
};

// ---------------------------------------------------------------------------
// Software strip
// ---------------------------------------------------------------------------

// TODO: confirm which tools the team actually uses
export const software: { name: string; icon: LucideIcon }[] = [
  { name: "PlanSwift", icon: Layers },
  { name: "Bluebeam Revu", icon: PencilRuler },
  { name: "RSMeans Data", icon: Database },
  { name: "On-Screen Takeoff", icon: ScanSearch },
  { name: "Microsoft Excel", icon: FileSpreadsheet },
];

// ---------------------------------------------------------------------------
// Who we serve
// ---------------------------------------------------------------------------

export const audiences = [
  {
    tag: "Role 01",
    icon: Building2,
    title: "General Contractors",
    subtitle: "Commercial, multi-family and public projects",
    text: "Get an independent baseline to check sub bids against, confirm nothing fell between trades, and walk into bid day with numbers you trust.",
    listLabel: "What you get",
    list: ["Conceptual and schematic budgets", "Full CSI MasterFormat estimates", "Sub bid leveling sheets", "Change order reviews"],
    href: "/trades/general-contractor/",
    featured: false,
  },
  {
    tag: "Most requested",
    icon: Hammer,
    title: "Subcontractors",
    subtitle: "Trade takeoffs with material and labor",
    text: "Bid more jobs without adding headcount. Quantities come back organized the way your crews install, so pricing them is fast.",
    listLabel: "Trades we cover",
    list: [], // filled from content/trades.ts
    href: "/trades/",
    featured: true,
  },
  {
    tag: "Role 03",
    icon: Truck,
    title: "Material Suppliers",
    subtitle: "Bills of materials and product takeoffs",
    text: "Turn drawings and specs into product counts your sales team can quote from, so you respond to contractors before your competitors do.",
    listLabel: "Typical outputs",
    list: ["Lumber and framing counts", "Rebar and steel lists", "Pipe and conduit runs", "Fixture and equipment schedules"],
    href: "/trades/supplier/",
    featured: false,
  },
];

// ---------------------------------------------------------------------------
// How it works
// ---------------------------------------------------------------------------

export const steps: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Upload your plans",
    text: "Send PDFs, CAD files, specs or a plan-room link through our quote form, along with your bid date.",
    icon: Upload,
  },
  {
    title: "We review the scope",
    text: "An estimator checks the drawings and sends a fixed quote, a delivery date and any questions about scope.", // TODO: add quote response time once confirmed
    icon: ScanSearch,
  },
  {
    title: "Takeoff and pricing",
    text: "We measure every item and price it with labor and material rates for your project's location.",
    icon: PencilRuler,
  },
  {
    title: "Bid-ready package",
    text: "You receive marked-up drawings, an editable Excel workbook and a summary you can drop into your proposal.",
    icon: ClipboardCheck,
  },
];

// ---------------------------------------------------------------------------
// Sample estimate
// ---------------------------------------------------------------------------

// Illustrative rows showing the deliverable format.
export const sampleRows = [
  { code: "03 30 00", description: "Cast-in-place concrete, 4,000 PSI", qty: "1,420", unit: "CY", total: "$418,290" },
  { code: "05 12 00", description: "Structural steel framing", qty: "312", unit: "TON", total: "$684,150" },
  { code: "09 22 16", description: "Non-structural metal framing, 20 GA", qty: "24,100", unit: "LF", total: "$142,190" },
  { code: "09 29 00", description: 'Gypsum board, 5/8" Type X', qty: "48,200", unit: "SF", total: "$153,210" },
];

export const sampleBenefits = [
  { strong: "Complete material takeoff", rest: "with formulas and color-coded markups tied to sheet numbers." },
  { strong: "Labor rates for your area,", rest: "with union or open-shop crews and prevailing wage where it applies." },
  { strong: "Equipment and general conditions:", rest: "lifts, scaffolding, cranes, dumpsters and site logistics." },
  { strong: "Markup you control:", rest: "overhead, profit and contingency in editable cells." },
];

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

// TODO: placeholder prices from the design. Replace with real pricing before launch.
export const pricingTiers = [
  {
    label: "Single trade",
    name: "Trade Takeoff",
    price: "$150",
    text: "For subcontractors bidding one trade: concrete, drywall, painting, electrical, plumbing and more.",
    features: ["24–48 hour turnaround", "Material quantities and cut lists", "Color-coded PDF markups", "Unlocked Excel takeoff"],
    cta: "Quote a single trade",
    featured: false,
  },
  {
    label: "Full scope residential",
    name: "Residential Estimate",
    price: "$350",
    text: "Custom homes, additions, renovations and small multi-family buildings.",
    features: ["48–72 hour turnaround", "Material, labor and equipment", "Pricing for your ZIP code", "Proposal-ready summary"],
    cta: "Upload residential plans",
    featured: true,
  },
  {
    label: "Multi-trade commercial",
    name: "Commercial Estimate",
    price: "$750",
    text: "Retail, office, education, healthcare and industrial projects.",
    features: ["Full CSI MasterFormat breakdown", "Sub bid comparison sheet", "Value-engineering notes", "Addenda updates included"],
    cta: "Quote a commercial job",
    featured: false,
  },
];

// ---------------------------------------------------------------------------
// Why us
// ---------------------------------------------------------------------------

// TODO: confirm each claim is accurate
export const features: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "One estimator, start to finish",
    text: "You deal with the same estimator on every job, by phone or email, so questions get answered without a ticket queue.",
    icon: UserCheck,
  },
  {
    title: "Confidential by default",
    text: "Your plans, pricing and client list stay private. We sign your NDA if you have one.",
    icon: ShieldCheck,
  },
  {
    title: "Local labor and material rates",
    text: "Pricing is adjusted to the project's location, not a national average, so it holds up against local sub bids.",
    icon: MapPin,
  },
  {
    title: "Addenda and revisions",
    text: "When the architect issues an addendum before bid day, we update the takeoff so you never submit stale numbers.",
    icon: RefreshCw,
  },
  {
    title: "Deadlines we commit to",
    text: "You get a delivery date before we start. Rush turnaround is available when a bid closes tomorrow.",
    icon: Clock,
  },
  {
    title: "Every trade, one team",
    text: "Civil, structural, architectural and MEP estimators work together, so scopes don't overlap or fall through the gaps.",
    icon: Users,
  },
];

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const homeFaqs: AccordionItem[] = [
  {
    question: "How fast can you turn around an estimate?",
    answer:
      "Most estimates are delivered in 24 to 72 hours, depending on the size of the plan set and the number of trades. If your bid closes sooner, ask for rush turnaround when you request a quote.",
  },
  {
    question: "What file formats do you accept?",
    answer:
      "PDF drawings, DWG and DXF files, specification books, images and ZIP archives. You can also share a Dropbox, Google Drive or plan-room link instead of uploading files.",
  },
  {
    question: "How do you price labor and materials for my area?",
    answer:
      "We start from published cost data and adjust it for the project's location, then cross-check against current supplier and subcontractor pricing for that market. Your estimate states the assumptions we used.",
  },
  {
    question: "Can I change unit costs and markups myself?",
    answer:
      "Yes. You get an unlocked Excel workbook with live formulas, so you can change unit prices, labor rates, overhead, profit or contingency at any time.",
  },
  {
    question: "Do you handle addenda and revisions?",
    answer:
      "Yes. Send us any addenda issued before your bid date and we update the takeoff and pricing to match.",
  },
  {
    question: "Is my project information kept confidential?",
    answer:
      "Yes. Your drawings and pricing are only seen by the estimators working on your project, and we never share them with other bidders. We are happy to sign your NDA.",
  },
];

// ---------------------------------------------------------------------------
// Latest insights (placeholder until the blog is built in Phase 6)
// ---------------------------------------------------------------------------

// TODO: Phase 6 replaces this list with the three newest posts from /content/blog
export const latestPosts = [
  {
    title: "Concrete Takeoff Checklist: 12 Items Contractors Miss",
    excerpt: "Over-excavation, lap splices, pump primers and the other line items that quietly erase concrete margins.",
    category: "Checklists",
    readTime: "8 min read",
    icon: Layers,
  },
  {
    title: "How to Read a Construction Estimate, Line by Line",
    excerpt: "What every section of a professional estimate means, and the questions to ask before you sign.",
    category: "Estimating Basics",
    readTime: "6 min read",
    icon: FileSpreadsheet,
  },
  {
    title: "5 Bidding Mistakes That Cost Subcontractors Jobs",
    excerpt: "From vague exclusions to late addenda, the avoidable errors that push good bids to second place.",
    category: "Bidding Strategy",
    readTime: "5 min read",
    icon: ClipboardCheck,
  },
];
