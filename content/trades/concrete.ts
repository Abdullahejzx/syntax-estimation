import { Layers } from "lucide-react";
import type { Trade } from "./types";

export const concrete: Trade = {
  slug: "concrete",
  name: "Concrete Estimating",
  shortName: "Concrete",
  summary: "Footings, slabs, walls, rebar and formwork quantified to the cubic yard.",
  icon: Layers,
  group: "trade",

  seo: {
    title: "Concrete Estimating & Takeoff Services",
    description:
      "Concrete takeoffs and estimates with yardage, rebar tonnage and formwork contact area measured from your drawings. Bid-ready in 24–48 hours.",
  },
  hero: {
    tag: "For concrete contractors",
    title: "Concrete Estimating & Takeoff Services",
    intro:
      "Concrete yardage, rebar tonnage and formwork contact area measured straight from your drawings, so you can bid with confidence, avoid over-ordering and turn commercial bids around in 24–48 hours.",
    badges: ["CSI Division 03 coverage", "Local ready-mix & rebar pricing", "Cut lists & deductions shown"],
  },
  heroCard: {
    sheet: "DWG S-101 · Foundation layout",
    project: "Commercial slab & footings",
    code: "CSI 03 30 00 Cast-in-place",
    lines: [
      { label: "Slab on grade (4,000 PSI)", value: "4,820 CY", note: "+5% waste" },
      { label: "Continuous & spread footings", value: "1,640 CY" },
      { label: "#4 & #5 Grade 60 rebar", value: "74.2 TON" },
      { label: "Formwork contact area", value: "28,450 SFCA" },
    ],
  },
  // TODO: confirm turnaround
  facts: [
    { label: "Turnaround", value: "24–48 hr", text: "Typical for commercial concrete bids" },
    { label: "Units", value: "CY, SF & TON", text: "Every scope in the units you price" },
    { label: "Rebar", value: "Itemized", text: "Weights, laps and cut lists included" },
    { label: "Coverage", value: "Division 03", text: "Plus site concrete and paving" },
  ],
  scope: {
    title: "Complete Division 03 Scope Quantification",
    intro:
      "We measure every cubic yard, square foot and linear foot so nothing is left off your bid, from mud mats to tie wire.",
    items: [
      { title: "Footings & foundations", text: "Spread, continuous and stepped footings with volumes, edge forms and dowel counts." },
      { title: "Slabs on grade", text: "Slab areas by thickness, thickened edges, depressions, joints and vapor barrier." },
      { title: "Elevated slabs & decks", text: "Slab-on-metal-deck pours, post-tensioned slabs, shoring and edge forms." },
      { title: "Walls & retaining walls", text: "Foundation, stem and retaining walls with two-sided form area and wall ties." },
      { title: "Columns, piers & grade beams", text: "Round and square columns, drilled piers and grade beams with cage steel." },
      { title: "Rebar & mesh", text: "Bar lists by size with laps, hooks and chairs, plus welded wire mesh by roll or sheet." },
      { title: "Embeds & anchor bolts", text: "Anchor bolts, embed plates, dowels and sleeves counted by type." },
      { title: "Site concrete & paving", text: "Sidewalks, curbs, gutters, aprons, ADA ramps and heavy-duty paving." },
      { title: "Base & prep", text: "Crushed stone base, sand cushion, fine grading and compaction quantities." },
    ],
  },
  package: {
    title: "See What You Receive in Your Concrete Package",
    intro: "Color-coded plan markups paired with an unlocked takeoff sheet you can load straight into your bid.",
    zones: [
      { label: 'Zone 1: 6" SOG (4,000 PSI)', detail: "Net 28,400 SF · 526 CY" },
      { label: 'FTG-1: 36"×12" continuous', detail: "640 LF · 71.1 CY" },
      { label: '8" stem wall (4,500 PSI)', detail: "3,420 SFCA · 84.4 CY" },
      { label: '24" drilled piers (32 EA)', detail: "Cage steel 14.8 TON" },
    ],
    rows: [
      { item: '4,000 PSI slab on grade, 6"', code: "03 30 00", net: 526, unit: "CY", waste: 0.05 },
      { item: 'Continuous footings, 36"×12"', code: "03 30 00", net: 71.1, unit: "CY", waste: 0.08 },
      { item: 'Stem walls, 8" (4,500 PSI)', code: "03 30 00", net: 84.4, unit: "CY", waste: 0.05 },
      { item: "#5 Grade 60 rebar, footings & slab", code: "03 21 00", net: 18240, unit: "LF", waste: 0.1 },
      { item: 'Edge formwork, up to 12"', code: "03 11 00", net: 1840, unit: "LF", waste: 0 },
      { item: "15-mil under-slab vapor retarder", code: "07 26 00", net: 28400, unit: "SF", waste: 0.1 },
    ],
    total: { label: "Total concrete placement", unit: "CY" },
    note: "Quantities are measured net and shown gross with waste, so you can see exactly what was added.",
  },
  pricing: {
    intro: "We don't guess at unit rates. Every concrete bid is built from four cost groups, each shown separately.",
    pillars: [
      {
        text: "Ready-mix by PSI and mix design, rebar by the ton, vapor barrier, curing compound and accessories priced for your area.",
        chip: "Local supplier pricing",
      },
      {
        text: "Crew hours per yard and per square foot based on pour type, placement method and finish, at union or open-shop rates.",
        chip: "Production rates (MH/CY)",
      },
      {
        text: "Pump trucks, buggies, power trowels, screeds, vibrators and form rentals for the duration of the work.",
        chip: "Rental & pump minimums",
      },
      {
        text: "General conditions, mobilization, testing allowances and the markup you set for this bid.",
        chip: "Your markup & contingency",
      },
    ],
  },
  workflows: {
    title: "Tailored Concrete Estimating Workflows",
    intro: "Set up for each role in the concrete supply chain.",
    items: [
      {
        title: "Concrete subcontractors",
        text: "Respond to more bid invitations without late nights on takeoffs, and add capacity during busy bid weeks without hiring.",
        points: ["Formwork and rebar cut lists", "Pour breakdowns by area"],
      },
      {
        title: "General contractors",
        text: "Independent quantities to level concrete sub bids, check scope coverage and sanity-check budgets before awarding.",
        points: ["Sub bid leveling sheets", "Scope gap checks by area"],
      },
      {
        title: "Ready-mix & rebar suppliers",
        text: "Fast bills of materials so your sales team can quote mix designs and reinforcing soon after drawings are released.",
        points: ["Yardage by mix design", "Rebar tonnage by bar size"],
      },
    ],
  },
  why: {
    title: "Why Concrete Bidders Choose Bidnora",
    points: [
      { title: "Avoid over-ordering", text: "Waste factors set by element type prevent short loads without paying for extra yards." },
      { title: "Every bar counted", text: "Laps, hooks, dowels and chairs are included, so the fabricator's bill doesn't surprise you." },
      { title: "Fast enough for bid day", text: "Your takeoff arrives with time left to adjust labor and pricing before the bid closes." },
      { title: "Addenda handled", text: "When the structural engineer issues changes, we update quantities and highlight what moved." },
      { title: "Clear scope sheets", text: "Written inclusions and exclusions help you defend your number with the GC." },
    ],
    tip: "Check whether your ready-mix supplier charges for washout and short loads, and carry those costs in your general conditions.",
    testimonialIndex: 1,
  },
  faqs: [
    {
      question: "Do your concrete takeoffs include rebar?",
      answer:
        "Yes. Reinforcing is broken out by bar size with total length and weight, lap splices based on the structural notes, and welded wire mesh by roll or sheet. Dowels, corner bars and chairs are listed too.",
    },
    {
      question: "How do you handle waste factors for concrete?",
      answer:
        "We show net and gross quantities side by side. Typical defaults are around 5% for slabs and formed walls and higher for trench footings, but every factor is editable in the Excel file.",
    },
    {
      question: "What drawings do you need for a concrete takeoff?",
      answer:
        "Structural foundation and framing plans, sections and schedules, plus the architectural floor plans. Include civil site sheets if sidewalks, curbs or paving are in your scope.",
    },
    {
      question: "How fast can I get a concrete takeoff?",
      answer:
        "Most small and mid-size commercial projects are delivered in 24 to 48 hours. Large or multi-story projects take longer; we confirm the delivery date with your quote.",
    },
  ],
  cta: {
    title: "Bidding a Concrete Job This Week?",
    text: "Upload your structural drawings and get a fixed quote and delivery date for your concrete takeoff.",
  },
};
