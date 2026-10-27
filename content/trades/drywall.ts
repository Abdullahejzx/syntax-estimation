import { Frame } from "lucide-react";
import type { Trade } from "./types";

export const drywall: Trade = {
  slug: "drywall",
  name: "Drywall Estimating",
  shortName: "Drywall",
  summary: "Board, framing, finish levels and accessories measured by room and wall type.",
  icon: Frame,
  group: "trade",

  seo: {
    title: "Drywall Estimating & Takeoff Services",
    description:
      "Drywall and framing takeoffs with board counts, studs and track, finish levels and accessories measured by room and wall type.",
  },
  hero: {
    tag: "For drywall & framing contractors",
    title: "Drywall Estimating & Takeoff Services",
    intro:
      "Board, framing, finishing and accessories measured by wall type and room, so you can price labor accurately and order exactly what each floor needs.",
    badges: ["CSI Division 09 coverage", "Counts by wall type", "Finish levels tracked"],
  },
  heroCard: {
    sheet: "DWG A-101 · Level 2 partition plan",
    project: "Medical office interior",
    code: "CSI 09 29 00 Gypsum board",
    lines: [
      { label: '5/8" Type X board', value: "1,840 SHT", note: "+10% waste" },
      { label: '3-5/8" 20 GA studs', value: "2,260 EA" },
      { label: "Top & bottom track", value: "6,120 LF" },
      { label: "Level 4 finish, walls", value: "41,800 SF" },
    ],
  },
  // TODO: confirm turnaround
  facts: [
    { label: "Turnaround", value: "24–48 hr", text: "Typical for interiors packages" },
    { label: "Units", value: "SF, LF & SHT", text: "Board, framing and corner bead" },
    { label: "Wall types", value: "By partition", text: "Every type tagged on the plans" },
    { label: "Coverage", value: "Division 09", text: "Plus framing and ceilings" },
  ],
  scope: {
    title: "Complete Drywall & Framing Quantities",
    intro: "Every partition type, ceiling and accessory measured, so hang, tape and finish can each be priced on their own.",
    items: [
      { title: "Partition framing", text: "Studs and track by gauge, size and spacing for every wall type." },
      { title: "Gypsum board", text: "Board by type and thickness, layers and sides, converted to sheets." },
      { title: "Ceilings & soffits", text: "Drywall ceilings, soffits and bulkheads with framing and hangers." },
      { title: "Finish levels", text: "Taping and finishing by area, from Level 2 in back rooms to Level 5." },
      { title: "Wall insulation", text: "Sound and thermal batts in partitions, by wall type and height." },
      { title: "Corner bead & trims", text: "Corner bead, L-bead, reveals and control joints by linear foot." },
      { title: "Shaft & rated walls", text: "Shaft wall, area separation and rated assemblies with all components." },
      { title: "Blocking & backing", text: "Wood or metal blocking for cabinets, grab bars and wall-mounted equipment." },
      { title: "Acoustical ceilings", text: "Ceiling grid and tile when ceilings are part of your package." },
    ],
  },
  package: {
    zones: [
      { label: 'Type P1: 5/8" both sides', detail: "2,140 LF · 10' high" },
      { label: "Type P3: rated, 2 layers", detail: "480 LF · 12' high" },
      { label: "Gyp ceiling, Level 2", detail: "3,260 SF" },
      { label: "Shaft wall, stair 1", detail: "1,120 SF" },
    ],
    rows: [
      { item: '5/8" Type X gypsum board', code: "09 29 00", net: 52400, unit: "SF", waste: 0.1 },
      { item: '3-5/8" 20 GA studs, 16" O.C.', code: "09 22 16", net: 2050, unit: "EA", waste: 0.1 },
      { item: '3-5/8" 20 GA track, top & bottom', code: "09 22 16", net: 5560, unit: "LF", waste: 0.1 },
      { item: "Paper-faced corner bead", code: "09 29 00", net: 3180, unit: "LF", waste: 0.05 },
      { item: '3-1/2" sound attenuation batts', code: "09 81 00", net: 21400, unit: "SF", waste: 0.05 },
      { item: "Level 4 finish, walls", code: "09 29 00", net: 41800, unit: "SF", waste: 0 },
    ],
    note: "Board is also converted into sheet counts by length, so stocking orders are ready per floor.",
  },
  pricing: {
    intro: "Hang, tape and finish are priced as separate steps, so you know exactly where labor dollars go.",
    pillars: [
      { text: "Board, studs, track, compound, tape, beads and fasteners at current local pricing.", chip: "Local supplier pricing" },
      { text: "Hang, tape and finish hours by board type, wall height and finish level.", chip: "SF per crew-day" },
      { text: "Lifts, scaffolding, panel carts and taping tools sized to the job.", chip: "Lifts & staging" },
      { text: "Delivery, stocking, cleanup and the markup you set.", chip: "Your markup & contingency" },
    ],
  },
  workflows: {
    title: "Tailored Drywall Estimating Workflows",
    intro: "Organized for interiors contractors, GCs and suppliers.",
    items: [
      {
        title: "Drywall & framing subcontractors",
        text: "Bid more interiors packages with quantities organized the way your hangers and tapers work.",
        points: ["Board by floor & wall type", "Stocking lists per level"],
      },
      {
        title: "General contractors",
        text: "Independent drywall quantities to compare subs and confirm rated walls and ceilings are covered.",
        points: ["Rated assembly checks", "Bid leveling support"],
      },
      {
        title: "Drywall suppliers",
        text: "Board, framing and accessory lists ready for quoting and stocking.",
        points: ["Sheets by type & length", "Accessory totals"],
      },
    ],
  },
  why: {
    title: "Why Drywall Contractors Choose Arvex",
    points: [
      { title: "Sheets, not just square feet", text: "Board is converted into sheet counts by length, so stocking orders are ready." },
      { title: "Every wall type tagged", text: "Partition types are color-coded on the plans, so you can see what each one costs." },
      { title: "Heights accounted for", text: "Wall heights from sections and ceiling plans drive board and stud lengths." },
      { title: "Finish levels separated", text: "Taping is broken out by finish level, so labor pricing is accurate." },
      { title: "Fast revisions", text: "Updated partition plans are compared and the changes clouded." },
    ],
    tip: "Confirm ceiling heights on the reflected ceiling plan; walls that run to deck need longer studs and more board.",
    testimonialIndex: 0,
  },
  faqs: [
    {
      question: "Do you convert drywall square footage into sheets?",
      answer:
        "Yes. Board area is converted into sheet counts by type, thickness and length, with waste applied, so you can order and stock directly.",
    },
    {
      question: "Do drywall takeoffs include framing?",
      answer:
        "Yes. Studs, track, headers, bracing and blocking are measured by wall type and gauge, unless you ask for board only.",
    },
    {
      question: "How do you handle different wall heights?",
      answer:
        "We take heights from sections, elevations and the reflected ceiling plan, and note walls that run to the deck, so stud and board lengths are right.",
    },
    {
      question: "Can you include acoustical ceilings?",
      answer: "Yes. Grid, tile and hangers can be added to the same takeoff if ceilings are in your scope.",
    },
  ],
  cta: {
    title: "Bidding a Drywall Package?",
    text: "Upload your plans and get a fixed quote for a full board, framing and finishing takeoff.",
  },
};
