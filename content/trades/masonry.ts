import { BrickWall } from "lucide-react";
import type { Trade } from "./types";

export const masonry: Trade = {
  slug: "masonry",
  name: "Masonry Estimating",
  shortName: "Masonry",
  summary: "Block, brick, stone, grout and reinforcement counts by wall type.",
  icon: BrickWall,
  group: "trade",

  seo: {
    title: "Masonry Estimating & Takeoff Services",
    description:
      "Masonry takeoffs for CMU, brick and stone with unit counts, mortar, grout and reinforcing measured from your drawings by wall type.",
  },
  hero: {
    tag: "For masonry contractors",
    title: "Masonry Estimating & Takeoff Services",
    intro:
      "CMU, brick and stone counted wall by wall, with mortar, grout, reinforcing and accessories included, so your masonry bid reflects what's actually drawn.",
    badges: ["CSI Division 04 coverage", "Unit counts by wall type", "Grout & rebar included"],
  },
  heroCard: {
    sheet: "DWG A-201 · Exterior elevations",
    project: "Two-story retail building",
    code: "CSI 04 22 00 Concrete unit masonry",
    lines: [
      { label: '8" CMU, standard units', value: "12,480 EA", note: "+5% waste" },
      { label: "Face brick, modular", value: "38,600 EA" },
      { label: "Cell & bond beam grout", value: "41 CY" },
      { label: "Horizontal joint reinforcement", value: "9,860 LF" },
    ],
  },
  // TODO: confirm turnaround
  facts: [
    { label: "Turnaround", value: "24–48 hr", text: "Typical for single-building packages" },
    { label: "Units", value: "EA, SF & LF", text: "Units, wall area and lintels" },
    { label: "Reinforcing", value: "Included", text: "Vertical bars and joint reinforcement" },
    { label: "Coverage", value: "Division 04", text: "Block, brick, stone and veneer" },
  ],
  scope: {
    title: "Complete Division 04 Masonry Quantities",
    intro: "Every wall measured by type, with openings deducted and the hidden materials counted too.",
    items: [
      { title: "CMU walls", text: "Block counts by size and type, with openings deducted and bond beams called out." },
      { title: "Brick veneer", text: "Face brick by wall area and bond pattern, with special shapes and soldier courses." },
      { title: "Stone & cast stone", text: "Natural and manufactured stone, sills, coping and trim pieces by size." },
      { title: "Mortar & grout", text: "Mortar by unit count, and grout volumes for filled cells and bond beams." },
      { title: "Reinforcing", text: "Vertical bars by spacing, horizontal joint reinforcement and dowels to footings." },
      { title: "Lintels & bond beams", text: "Steel and precast lintels and bond beam lengths at every opening." },
      { title: "Flashing & ties", text: "Through-wall flashing, weeps, veneer ties and control joint materials." },
      { title: "Cavity insulation", text: "Cavity insulation and air barrier areas where they're part of the masonry scope." },
      { title: "Scaffolding & access", text: "Wall heights and lengths to plan scaffolding, lifts and staging." },
    ],
  },
  package: {
    zones: [
      { label: 'North elevation: 8" CMU', detail: "3,420 SF · 3,850 units" },
      { label: "Brick veneer, modular", detail: "5,560 SF · 38,600 units" },
      { label: "Bond beams at 4'-0\" & roof", detail: "1,280 LF" },
      { label: "Openings deducted (42 EA)", detail: "1,180 SF removed" },
    ],
    rows: [
      { item: '8" CMU, standard units', code: "04 22 00", net: 11090, unit: "EA", waste: 0.05 },
      { item: '8" CMU, bond beam units', code: "04 22 00", net: 960, unit: "EA", waste: 0.05 },
      { item: "Face brick, modular", code: "04 21 13", net: 38600, unit: "EA", waste: 0.05 },
      { item: "Type S mortar", code: "04 05 13", net: 640, unit: "BAG", waste: 0.1 },
      { item: "Cell & bond beam grout", code: "04 05 16", net: 41, unit: "CY", waste: 0.08 },
      { item: "Horizontal joint reinforcement, 9 GA", code: "04 05 19", net: 9860, unit: "LF", waste: 0.05 },
    ],
    note: "Counts are grouped by elevation and wall type, so labor and material can be priced separately.",
  },
  pricing: {
    intro: "Masonry margins live in the details. We price each cost group on its own so you can see where the money goes.",
    pillars: [
      { text: "Block, brick, stone, mortar, grout and reinforcing priced from suppliers near your project.", chip: "Local supplier pricing" },
      { text: "Mason and tender hours by unit type, wall height and complexity, at the right wage rates for the job.", chip: "Units per mason-day" },
      { text: "Scaffolding, mast climbers, forklifts, mixers and saws for the length of the work.", chip: "Access & mixing" },
      { text: "Cold-weather protection, cleanup, testing and the markup you set.", chip: "Your markup & contingency" },
    ],
  },
  workflows: {
    title: "Tailored Masonry Estimating Workflows",
    intro: "Organized for the people who build, buy and supply masonry.",
    items: [
      {
        title: "Masonry subcontractors",
        text: "Bid more block and brick packages without tying up your estimator on unit counts.",
        points: ["Counts by wall type & elevation", "Accessory lists ready to order"],
      },
      {
        title: "General contractors",
        text: "Check masonry sub bids against independent counts and catch missing lintels, flashing or reinforcing.",
        points: ["Bid leveling support", "Scope gap review"],
      },
      {
        title: "Masonry suppliers",
        text: "Unit counts and accessory lists your counter staff can quote quickly.",
        points: ["Units by size & color", "Mortar and grout totals"],
      },
    ],
  },
  why: {
    title: "Why Masonry Contractors Choose Arvex",
    points: [
      { title: "Accurate unit counts", text: "Openings are deducted and special units counted separately, so your order matches the wall." },
      { title: "Nothing hidden in the wall", text: "Grout, rebar, ties and flashing are measured, not guessed." },
      { title: "Production-friendly breakdowns", text: "Quantities by elevation, height and wall type make labor pricing faster." },
      { title: "Revisions highlighted", text: "When elevations change, updated counts show exactly what moved." },
      { title: "Clear exclusions", text: "Your scope sheet spells out what's in and out before you sign." },
    ],
    tip: "Price wall height separately: anything above scaffold height usually costs more per unit to lay.",
    testimonialIndex: 0,
  },
  faqs: [
    {
      question: "Do you deduct openings in masonry takeoffs?",
      answer:
        "Yes. Doors, windows and louvers are deducted from wall areas, and lintels or bond beams at each opening are counted separately.",
    },
    {
      question: "Can you count brick by bond pattern?",
      answer:
        "Yes. We use the bond pattern and unit size on the drawings, or the ones you specify, and adjust unit counts and header courses to match.",
    },
    {
      question: "Do you include grout and reinforcing?",
      answer:
        "Yes. Grout volumes are calculated for filled cells and bond beams based on the structural notes, and reinforcing is listed by size and length.",
    },
    {
      question: "Can you split quantities by building or phase?",
      answer: "Yes. We can group counts by building, elevation, floor or phase to match how you plan and bill the work.",
    },
  ],
  cta: {
    title: "Need Masonry Counts for Your Next Bid?",
    text: "Upload your drawings and get a fixed quote for a complete block, brick and stone takeoff.",
  },
};
