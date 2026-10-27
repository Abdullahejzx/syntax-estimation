import { LayoutGrid } from "lucide-react";
import type { Trade } from "./types";

export const flooring: Trade = {
  slug: "flooring",
  name: "Flooring Estimating",
  shortName: "Flooring",
  summary: "Tile, carpet, LVT, wood and base quantities including pattern waste.",
  icon: LayoutGrid,
  group: "trade",

  seo: {
    title: "Flooring Estimating & Takeoff Services",
    description:
      "Flooring takeoffs for tile, carpet, LVT, wood and resilient flooring, with pattern waste, base and transitions measured room by room.",
  },
  hero: {
    tag: "For flooring contractors",
    title: "Flooring Estimating & Takeoff Services",
    intro:
      "Tile, carpet, LVT, wood and resilient flooring measured room by room, with pattern waste, base, transitions and prep included, so your flooring bid is ready to price.",
    badges: ["CSI Division 09 coverage", "Pattern waste applied", "Base & transitions counted"],
  },
  heroCard: {
    sheet: "DWG A-111 · Floor finish plan",
    project: "Hotel renovation, 120 rooms",
    code: "CSI 09 65 00 Resilient flooring",
    lines: [
      { label: "LVT, 6×48 plank", value: "28,400 SF", note: "+8% waste" },
      { label: "Broadloom carpet", value: "3,120 SY" },
      { label: "Porcelain tile, baths", value: "9,860 SF" },
      { label: '4" rubber base', value: "12,600 LF" },
    ],
  },
  // TODO: confirm turnaround
  facts: [
    { label: "Turnaround", value: "24–48 hr", text: "Typical for flooring packages" },
    { label: "Units", value: "SF, SY & LF", text: "Hard surface, carpet and base" },
    { label: "Waste", value: "By pattern", text: "Straight lay, diagonal or herringbone" },
    { label: "Coverage", value: "Division 09", text: "Plus underlayment and prep" },
  ],
  scope: {
    title: "Complete Flooring Quantities, Room by Room",
    intro: "Every finish on the floor plan, with the waste, base, transitions and prep that go with it.",
    items: [
      { title: "Resilient flooring", text: "LVT, VCT and sheet vinyl by room, product and pattern." },
      { title: "Carpet", text: "Broadloom by square yard with seam planning, and carpet tile by carton." },
      { title: "Ceramic & porcelain tile", text: "Floor and wall tile, with setting materials and grout." },
      { title: "Wood flooring", text: "Solid and engineered wood with underlayment and finishing." },
      { title: "Base & transitions", text: "Rubber, tile and wood base, plus thresholds and transition strips." },
      { title: "Stair treads", text: "Treads, risers and nosings counted per stair." },
      { title: "Floor prep", text: "Leveling compound, moisture mitigation and grinding where specified." },
      { title: "Underlayment & membranes", text: "Acoustic underlayment and crack-isolation or waterproofing membranes." },
      { title: "Specialty flooring", text: "Sports floors, static-control tile, entrance mats and resinous floors." },
    ],
  },
  package: {
    zones: [
      { label: "Guest rooms: LVT", detail: "28,400 SF" },
      { label: "Corridors: broadloom", detail: "3,120 SY" },
      { label: "Bathrooms: porcelain tile", detail: "9,860 SF" },
      { label: "Lobby: wood, herringbone", detail: "2,240 SF" },
    ],
    rows: [
      { item: "LVT, 6×48 plank", code: "09 65 19", net: 28400, unit: "SF", waste: 0.08 },
      { item: "Broadloom carpet", code: "09 68 16", net: 3120, unit: "SY", waste: 0.1 },
      { item: "Porcelain floor tile, 12×24", code: "09 30 13", net: 9860, unit: "SF", waste: 0.1 },
      { item: "Engineered wood, herringbone", code: "09 64 29", net: 2240, unit: "SF", waste: 0.15 },
      { item: '4" rubber base', code: "09 65 13", net: 12600, unit: "LF", waste: 0.05 },
      { item: "Self-leveling underlayment", code: "09 05 61", net: 6400, unit: "SF", waste: 0.05 },
    ],
    note: "Waste is set per product and layout, then totals are converted into cartons, rolls and boxes.",
  },
  pricing: {
    intro: "Product, pattern and prep each change the price. We keep them separate so your bid stays accurate.",
    pillars: [
      { text: "Flooring, adhesives, setting materials, underlayment and trims priced for your area.", chip: "Local supplier pricing" },
      { text: "Install hours by product, pattern and room size, including prep and base.", chip: "SF per installer-day" },
      { text: "Grinders, saws, rollers and moisture testing for the job.", chip: "Prep & cutting tools" },
      { text: "Protection, freight, attic stock and the markup you set.", chip: "Your markup & contingency" },
    ],
  },
  workflows: {
    title: "Tailored Flooring Estimating Workflows",
    intro: "Organized for flooring contractors, GCs and dealers.",
    items: [
      {
        title: "Flooring contractors",
        text: "Bid more flooring packages with areas, waste and accessories already worked out.",
        points: ["Quantities by room & product", "Seam and pattern planning"],
      },
      {
        title: "General contractors",
        text: "Check flooring bids and confirm prep, base and transitions are included.",
        points: ["Floor prep scope check", "Bid leveling support"],
      },
      {
        title: "Flooring dealers",
        text: "Cartons, rolls and accessory counts ready for quotes.",
        points: ["Cartons & rolls", "Adhesive & trim totals"],
      },
    ],
  },
  why: {
    title: "Why Flooring Contractors Choose Arvex",
    points: [
      { title: "Pattern waste done right", text: "Waste is set by product and layout, so herringbone isn't priced like straight lay." },
      { title: "Base and transitions included", text: "Every room perimeter and doorway is measured, not estimated." },
      { title: "Prep isn't forgotten", text: "Leveling and moisture mitigation are listed when the specs call for them." },
      { title: "Order-ready quantities", text: "Areas are converted into cartons, rolls and boxes." },
      { title: "Revisions tracked", text: "Finish plan changes are compared and highlighted." },
    ],
    tip: "Check the specs for moisture testing and mitigation: on slab-on-grade projects it can cost more than the flooring itself.",
    testimonialIndex: 0,
  },
  faqs: [
    {
      question: "How do you calculate flooring waste?",
      answer:
        "Waste depends on the product, pattern and room shapes. We apply waste per product and layout, show it in its own column and convert the total to cartons or rolls.",
    },
    {
      question: "Do you measure carpet in square yards?",
      answer:
        "Yes. Broadloom is measured in square yards with the seam layout considered, and carpet tile is reported in square feet and cartons.",
    },
    {
      question: "Are base and transitions included?",
      answer: "Yes. Wall base, thresholds, reducers and transition strips are measured at every room and doorway.",
    },
    {
      question: "Do you include floor prep?",
      answer:
        "When the specifications call for leveling, grinding or moisture mitigation, we include those quantities as separate line items.",
    },
  ],
  cta: {
    title: "Bidding a Flooring Package?",
    text: "Upload your finish plans for a fixed quote on a complete flooring takeoff.",
  },
};
