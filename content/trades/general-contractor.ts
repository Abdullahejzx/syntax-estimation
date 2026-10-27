import { Building, Building2, Landmark } from "lucide-react";
import type { Trade } from "./types";

export const generalContractor: Trade = {
  slug: "general-contractor",
  name: "General Contractor Estimating",
  shortName: "General Contractors",
  label: "GC",
  summary: "Full-scope estimates for commercial, multi-family and public projects.",
  icon: Building2,
  group: "client",

  seo: {
    title: "Estimating Services for General Contractors",
    description:
      "Full-scope construction estimates for general contractors on commercial, multi-family and public projects, organized by CSI division for bid day.",
  },
  hero: {
    tag: "For general contractors",
    title: "Estimating Services for General Contractors",
    intro:
      "Full-scope, multi-trade estimates for commercial, multi-family and public projects, organized by CSI division, so you can check sub bids, close scope gaps and submit with confidence.",
    badges: ["All CSI divisions", "Sub bid leveling", "Public bid formats"],
  },
  heroCard: {
    sheet: "Bid summary · All divisions",
    project: "Mixed-use building, 4 stories",
    code: "CSI MasterFormat 01–33",
    lines: [
      { label: "Div 03 · Concrete", value: "$1.42M" },
      { label: "Div 05 · Metals", value: "$0.98M" },
      { label: "Div 09 · Finishes", value: "$1.76M" },
      { label: "Div 22–26 · MEP", value: "$3.21M" },
    ],
  },
  // TODO: confirm turnaround
  facts: [
    { label: "Turnaround", value: "3–5 days", text: "Typical for full-scope commercial" },
    { label: "Coverage", value: "Div 01–33", text: "Every trade in one estimate" },
    { label: "Leveling", value: "Included", text: "Sheets to compare sub bids" },
    { label: "Formats", value: "Your forms", text: "Owner and public bid forms" },
  ],
  segments: {
    title: "Estimating for Every GC Market",
    intro: "Each market has its own pricing pressures and paperwork. We set up the estimate to match.",
    items: [
      {
        id: "commercial",
        icon: Building2,
        title: "Commercial",
        text: "Office, retail, hospitality and industrial work, from tenant fit-outs to ground-up buildings.",
        points: ["Core-and-shell and tenant improvements", "Phased and occupied renovations", "Owner budget and GMP support"],
      },
      {
        id: "multi-family",
        icon: Building,
        title: "Multi-Family",
        text: "Garden-style, podium and mid-rise apartments, senior living and student housing.",
        points: ["Unit-type and building breakdowns", "Wood-frame and podium systems", "Amenity and site scopes"],
      },
      {
        id: "public-projects",
        icon: Landmark,
        title: "Public Projects",
        text: "Schools, municipal buildings and other public work with prevailing wage and formal bid requirements.",
        points: ["Prevailing wage labor rates", "Bid forms and unit prices", "Alternates priced separately"],
      },
    ],
  },
  scope: {
    title: "Full-Scope Estimates, Division by Division",
    intro: "One estimate that covers the whole job, so you know what every sub bid should include.",
    items: [
      { title: "Division 01 general conditions", text: "Supervision, temporary facilities, insurance, bonds and schedule-driven costs." },
      { title: "Sitework & earthwork", text: "Clearing, excavation, utilities, paving and landscaping from the civil sheets." },
      { title: "Concrete & masonry", text: "Foundations, slabs, structure and masonry walls with all reinforcing." },
      { title: "Metals & carpentry", text: "Structural and misc. steel, rough carpentry and finish millwork." },
      { title: "Building envelope", text: "Roofing, waterproofing, insulation, cladding, windows and storefront." },
      { title: "Interiors & finishes", text: "Framing, drywall, ceilings, flooring, paint and specialties." },
      { title: "Mechanical, plumbing & fire", text: "HVAC, plumbing and fire protection from the M, P and FP sheets." },
      { title: "Electrical & low voltage", text: "Power, lighting, fire alarm and data from the E-sheets." },
      { title: "Alternates & allowances", text: "Owner alternates, unit prices and allowances priced separately." },
    ],
  },
  package: {
    title: "What's in a GC Estimate Package",
    intro: "A summary for the owner, detail for your team and leveling sheets for buyout.",
    zones: [
      { label: "Bid summary by division", detail: "Div 01–33 roll-up" },
      { label: "Sub bid leveling", detail: "Up to 3 bids per trade" },
      { label: "Alternates & unit prices", detail: "Priced separately" },
      { label: "Clarifications & exclusions", detail: "Bid-form ready" },
    ],
    rows: [
      { item: "Cast-in-place concrete, all elements", code: "03 30 00", net: 3860, unit: "CY", waste: 0.05 },
      { item: "Structural steel framing", code: "05 12 00", net: 412, unit: "TON", waste: 0.08 },
      { item: "Gypsum board, all types", code: "09 29 00", net: 186000, unit: "SF", waste: 0.1 },
      { item: "TPO roofing, 60-mil", code: "07 54 23", net: 28400, unit: "SF", waste: 0.05 },
      { item: "Aluminum storefront", code: "08 41 13", net: 6200, unit: "SF", waste: 0 },
      { item: "Galvanized ductwork", code: "23 31 13", net: 48600, unit: "LB", waste: 0.05 },
    ],
    note: "Key quantities for every division sit behind the bid summary, so you can check any sub's number.",
  },
  pricing: {
    intro: "Every division is priced from the same four cost groups, so the whole estimate reads consistently.",
    pillars: [
      { text: "Material pricing across every division, checked against current supplier quotes for the project's location.", chip: "Local market pricing" },
      { text: "Self-performed and subcontracted labor at union, open-shop or prevailing wage rates.", chip: "Wage determinations" },
      { text: "Cranes, lifts, hoists and site equipment tied to the project schedule.", chip: "Schedule-based" },
      { text: "General conditions, insurance, bonds, fee and contingency shown line by line.", chip: "Your fee & contingency" },
    ],
  },
  workflows: {
    title: "Built Around How GCs Bid",
    intro: "Support for everyone on your preconstruction and project teams.",
    items: [
      {
        title: "Estimating teams",
        text: "Add capacity during heavy bid weeks without hiring, and keep your team focused on strategy.",
        points: ["Overflow estimating", "Bid-day support"],
      },
      {
        title: "Project managers",
        text: "Budgets and change order pricing during construction, checked against the original estimate.",
        points: ["Change order reviews", "Cost-to-complete checks"],
      },
      {
        title: "Owners & developers",
        text: "Independent budgets for feasibility, lender reviews and contractor selection.",
        points: ["Feasibility budgets", "Lender-ready reports"],
      },
    ],
  },
  why: {
    title: "Why General Contractors Choose Bidnora",
    points: [
      { title: "A baseline for every trade", text: "Know what each sub bid should cost before the numbers come in." },
      { title: "Scope gaps closed", text: "Leveling sheets show what each sub included and excluded." },
      { title: "Ready for public bids", text: "Prevailing wage rates, bid forms, unit prices and alternates are handled." },
      { title: "Capacity on demand", text: "Bid more projects without adding permanent overhead." },
      { title: "One point of contact", text: "A lead estimator coordinates every trade in your estimate." },
    ],
    tip: "Level sub bids by scope, not just price: the low number is often missing a division-boundary item like firestopping or temporary protection.",
    testimonialIndex: 1,
  },
  faqs: [
    {
      question: "Do you estimate all CSI divisions?",
      answer: "Yes. We prepare full-scope estimates across Divisions 01 to 33, or any combination of divisions you need help with.",
    },
    {
      question: "Can you help level subcontractor bids?",
      answer:
        "Yes. Send us the bids you receive and we'll compare them against our quantities and scope, noting inclusions, exclusions and gaps.",
    },
    {
      question: "Do you handle public and prevailing wage projects?",
      answer:
        "Yes. We apply the published wage determinations, price alternates and unit prices separately, and organize the numbers to match the bid form.",
    },
    {
      question: "How long does a full-scope estimate take?",
      answer:
        "It depends on size and complexity. Many commercial projects take three to five business days; we confirm the schedule with your quote.",
    },
  ],
  cta: {
    title: "Bidding a Full-Scope Project?",
    text: "Send your bid documents and get a fixed quote and delivery date for a complete GC estimate.",
  },
};
