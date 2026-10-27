import { Snowflake } from "lucide-react";
import type { Trade } from "./types";

export const insulation: Trade = {
  slug: "insulation",
  name: "Insulation Estimating",
  shortName: "Insulation",
  summary: "Batt, blown, rigid and spray foam takeoffs with R-values and assemblies.",
  icon: Snowflake,
  group: "trade",

  seo: {
    title: "Insulation Estimating & Takeoff Services",
    description:
      "Insulation takeoffs for batt, blown, rigid and spray foam, with areas, R-values and assemblies measured from your drawings.",
  },
  hero: {
    tag: "For insulation contractors",
    title: "Insulation Estimating & Takeoff Services",
    intro:
      "Batt, blown, rigid board and spray foam measured by assembly and R-value, so your insulation bid covers every wall, roof and slab edge on the drawings.",
    badges: ["CSI Division 07 coverage", "Areas by R-value", "Air barrier options"],
  },
  heroCard: {
    sheet: "DWG A-501 · Wall & roof sections",
    project: "Multi-family building, 4 stories",
    code: "CSI 07 21 00 Thermal insulation",
    lines: [
      { label: "R-21 batts, exterior walls", value: "48,600 SF", note: "net" },
      { label: "R-38 blown, attic", value: "22,400 SF" },
      { label: '2" XPS, slab edge', value: "1,860 LF" },
      { label: "Closed-cell spray foam", value: "6,200 BF" },
    ],
  },
  // TODO: confirm turnaround
  facts: [
    { label: "Turnaround", value: "24–48 hr", text: "Typical for building envelope packages" },
    { label: "Units", value: "SF, BF & LF", text: "Area, board feet and perimeters" },
    { label: "R-values", value: "By assembly", text: "Matched to wall and roof types" },
    { label: "Coverage", value: "Division 07", text: "Thermal, acoustic and air barrier" },
  ],
  scope: {
    title: "Complete Insulation & Air Barrier Quantities",
    intro: "Every assembly in the building envelope and interior partitions, measured from sections and details.",
    items: [
      { title: "Wall batts", text: "Exterior and interior wall batts by stud depth and R-value, with openings deducted." },
      { title: "Attic & roof", text: "Blown and batt attic insulation, plus rigid roof insulation by thickness and taper." },
      { title: "Rigid board", text: "Continuous insulation, foundation walls and slab edges by board type and thickness." },
      { title: "Spray foam", text: "Open- and closed-cell spray foam by area and depth, converted to board feet." },
      { title: "Sound batts", text: "Acoustic insulation in partitions and floor-ceiling assemblies." },
      { title: "Air & vapor barriers", text: "Building wrap, fluid-applied barriers and vapor retarders by area." },
      { title: "Firestopping & safing", text: "Perimeter safing, curtain wall firestop and penetration counts where in scope." },
      { title: "Pipe & duct insulation", text: "Mechanical insulation by pipe size or duct area when included." },
      { title: "Crawlspaces & rim joists", text: "Rim joist and crawlspace insulation, often missed on the first pass." },
    ],
  },
  package: {
    zones: [
      { label: "Exterior walls: R-21", detail: "48,600 SF net" },
      { label: "Attic: R-38 blown", detail: "22,400 SF" },
      { label: 'Slab edge: 2" XPS', detail: "1,860 LF × 2' deep" },
      { label: "Rim joists: spray foam", detail: "1,240 LF" },
    ],
    rows: [
      { item: "R-21 fiberglass batts, 2×6 walls", code: "07 21 16", net: 48600, unit: "SF", waste: 0.05 },
      { item: "R-38 blown cellulose, attic", code: "07 21 26", net: 22400, unit: "SF", waste: 0.05 },
      { item: '2" XPS rigid board, slab edge', code: "07 21 13", net: 3720, unit: "SF", waste: 0.08 },
      { item: "Closed-cell spray foam, rim joists", code: "07 21 19", net: 6200, unit: "BF", waste: 0.1 },
      { item: "R-11 sound batts, partitions", code: "07 21 16", net: 31800, unit: "SF", waste: 0.05 },
      { item: "Weather-resistive barrier", code: "07 25 00", net: 52400, unit: "SF", waste: 0.1 },
    ],
    note: "Areas are tied to the assembly that calls for them, then converted into bags, bundles and boards.",
  },
  pricing: {
    intro: "Each product is priced on its own, so a change in one assembly doesn't throw off the whole bid.",
    pillars: [
      { text: "Batts, loose fill, board and foam priced by R-value and coverage from suppliers near the job.", chip: "Local supplier pricing" },
      { text: "Install hours by assembly, height and access, from open walls to tight attics.", chip: "SF per crew-day" },
      { text: "Blowing machines, spray rigs, lifts and protection for the work.", chip: "Rigs & access" },
      { text: "Inspections, cleanup, disposal and the markup you set.", chip: "Your markup & contingency" },
    ],
  },
  workflows: {
    title: "Tailored Insulation Estimating Workflows",
    intro: "Organized for installers, GCs and distributors.",
    items: [
      {
        title: "Insulation contractors",
        text: "Bid more thermal and acoustic packages with areas already split by product and R-value.",
        points: ["Areas by product & R-value", "Bag and bundle counts"],
      },
      {
        title: "General contractors",
        text: "Confirm the insulation and air barrier scope is complete before you award.",
        points: ["Envelope scope check", "Bid leveling support"],
      },
      {
        title: "Insulation distributors",
        text: "Product lists by type, thickness and coverage for quick quoting.",
        points: ["Bundles, bags & boards", "Accessory totals"],
      },
    ],
  },
  why: {
    title: "Why Insulation Contractors Choose Arvex",
    points: [
      { title: "Every assembly covered", text: "Walls, roofs, floors, slab edges and rim joists are measured from sections and details." },
      { title: "Right R-value, right place", text: "Areas follow the assembly that calls for them instead of being averaged across the building." },
      { title: "Order-ready units", text: "Areas are converted into bags, bundles and boards based on coverage." },
      { title: "Energy code changes caught", text: "Addenda that change R-values are flagged and updated." },
      { title: "Clear scope lines", text: "We note where firestopping, air barrier or mechanical insulation sits with another trade." },
    ],
    tip: "Check the energy code compliance sheet: it often calls for continuous insulation that isn't obvious on the wall sections.",
    testimonialIndex: 2,
  },
  faqs: [
    {
      question: "Do you measure insulation by R-value?",
      answer:
        "Yes. Areas are grouped by assembly and R-value so each product is priced correctly, with openings deducted from wall areas.",
    },
    {
      question: "Can you convert areas into bags or bundles?",
      answer: "Yes. Using manufacturer coverage, we convert areas into bundles, bags or boards with waste applied.",
    },
    {
      question: "Do you include air barriers and firestopping?",
      answer:
        "If they're in your scope, yes. We also note where those items are typically carried by another trade, so nothing is double-counted or missed.",
    },
    {
      question: "How do you measure spray foam?",
      answer: "Spray foam is measured by area and specified thickness and reported in board feet, the unit most installers price by.",
    },
  ],
  cta: {
    title: "Need an Insulation Takeoff?",
    text: "Send your drawings and get a fixed quote for a complete thermal, acoustic and air barrier takeoff.",
  },
};
