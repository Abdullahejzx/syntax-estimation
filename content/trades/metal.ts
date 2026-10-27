import { Wrench } from "lucide-react";
import type { Trade } from "./types";

export const metal: Trade = {
  slug: "metal",
  name: "Metal & Steel Estimating",
  shortName: "Metal",
  summary: "Structural and miscellaneous metals, decking, rails and stairs by weight.",
  icon: Wrench,
  group: "trade",

  seo: {
    title: "Metal & Steel Estimating Services",
    description:
      "Structural and miscellaneous metals takeoffs with steel weights, metal deck, stairs, rails and embeds measured from your drawings member by member.",
  },
  hero: {
    tag: "For steel & metals contractors",
    title: "Metal & Steel Estimating Services",
    intro:
      "Structural steel, metal deck and miscellaneous metals quantified member by member, with weights and pieces counted, so fabricators and erectors can bid with confidence.",
    badges: ["CSI Division 05 coverage", "Weights by member & mark", "Misc. metals included"],
  },
  heroCard: {
    sheet: "DWG S-301 · Second floor framing",
    project: "Three-story office building",
    code: "CSI 05 12 00 Structural steel framing",
    lines: [
      { label: "Wide-flange beams & girders", value: "186.4 TON", note: "+8% conn." },
      { label: "HSS columns", value: "42.8 TON" },
      { label: '1.5" 20 GA roof deck', value: "52,000 SF" },
      { label: "Stairs & railings", value: "4 flights · 380 LF" },
    ],
  },
  // TODO: confirm turnaround
  facts: [
    { label: "Turnaround", value: "48–72 hr", text: "Typical for structural packages" },
    { label: "Units", value: "TON, SF & LF", text: "Weights, deck area and rail runs" },
    { label: "Connections", value: "Allowance", text: "Shown as a percentage you control" },
    { label: "Coverage", value: "Division 05", text: "Structural & miscellaneous metals" },
  ],
  scope: {
    title: "Complete Division 05 Metals Quantities",
    intro: "Every member, deck panel and miscellaneous item pulled from the structural and architectural sheets.",
    items: [
      { title: "Structural framing", text: "Beams, girders and columns by shape and length, with weight per member." },
      { title: "Bracing & moment frames", text: "Braces, gussets and heavier members at lateral systems." },
      { title: "Joists & joist girders", text: "Open-web joist counts by designation, with bridging and bearing details." },
      { title: "Metal deck", text: "Roof and floor deck by gauge and profile, with closures and edge forms." },
      { title: "Stairs & railings", text: "Steel stairs by flight, plus guardrails and handrails by linear foot." },
      { title: "Lintels & loose steel", text: "Lintels, shelf angles and relieving angles at openings and veneer." },
      { title: "Embeds & anchor bolts", text: "Embed plates, anchor bolts and base plates counted by type." },
      { title: "Miscellaneous metals", text: "Ladders, bollards, pipe supports, frames and other Division 05 items." },
      { title: "Connection allowance", text: "Plates, bolts and welds carried as a weight allowance you can adjust." },
    ],
  },
  package: {
    zones: [
      { label: "Grid A–D: W-beams", detail: "98 pieces · 64.2 TON" },
      { label: "Moment frame, line 3", detail: "W24 & W14 · 21.6 TON" },
      { label: '1.5" 20 GA roof deck', detail: "52,000 SF" },
      { label: "Stair S-1 & rails", detail: "2 flights · 190 LF" },
    ],
    rows: [
      { item: "W-shape beams & girders", code: "05 12 00", net: 186.4, unit: "TON", waste: 0.08 },
      { item: "HSS columns", code: "05 12 00", net: 42.8, unit: "TON", waste: 0.08 },
      { item: "Steel stair stringers & pans", code: "05 51 00", net: 6.2, unit: "TON", waste: 0.05 },
      { item: '1.5" 20 GA roof deck', code: "05 31 23", net: 52000, unit: "SF", waste: 0.05 },
      { item: '2" composite floor deck', code: "05 31 13", net: 34600, unit: "SF", waste: 0.05 },
      { item: '1-1/2" pipe railings', code: "05 52 00", net: 380, unit: "LF", waste: 0.05 },
    ],
    total: { label: "Total steel weight", unit: "TON" },
    wasteLabel: "Allow.",
    note: "Connection material is carried as a visible allowance on member weight, not hidden in unit prices.",
  },
  pricing: {
    intro: "Steel pricing moves fast. We separate each cost group so you can update material without reworking labor.",
    pillars: [
      { text: "Steel by shape and weight, deck by gauge, and shop items priced for current mill and service-center pricing.", chip: "Current steel pricing" },
      { text: "Fabrication and erection hours by piece count, connection type and building height.", chip: "Pieces per crew-day" },
      { text: "Cranes, lifts, welders and rigging sized to the heaviest picks and the schedule.", chip: "Crane & rigging" },
      { text: "Shop drawings, inspections, coatings and the markup you set.", chip: "Your markup & contingency" },
    ],
  },
  workflows: {
    title: "Tailored Metals Estimating Workflows",
    intro: "Organized for fabricators, erectors, GCs and service centers.",
    items: [
      {
        title: "Fabricators & erectors",
        text: "Weights and piece counts organized for shop and field pricing, so you can bid more packages.",
        points: ["Piece counts by shape", "Erection areas & sequence"],
      },
      {
        title: "General contractors",
        text: "An independent steel quantity to compare fabricator bids and confirm misc. metals aren't missed.",
        points: ["Fabricator bid leveling", "Misc. metals scope check"],
      },
      {
        title: "Steel service centers",
        text: "Material lists by shape and size your sales team can quote fast.",
        points: ["Shapes & lengths list", "Deck and accessory totals"],
      },
    ],
  },
  why: {
    title: "Why Metals Contractors Choose Arvex",
    points: [
      { title: "Weights you can check", text: "Every member shows shape, length and weight per foot, so totals are easy to audit." },
      { title: "Misc. metals don't slip through", text: "Lintels, embeds, ladders and bollards are pulled from both architectural and structural sheets." },
      { title: "Connections in the open", text: "Connection weight is a visible percentage, not buried in unit prices." },
      { title: "Built for bid day", text: "Packages arrive with time to get mill and service-center pricing." },
      { title: "Revisions tracked", text: "Changed members are clouded on the updated markups." },
    ],
    tip: "Ask whether primer, galvanizing or fireproofing is in your scope; each one changes the price per ton.",
    testimonialIndex: 1,
  },
  faqs: [
    {
      question: "Do you calculate steel weights?",
      answer:
        "Yes. Every member is listed by shape and length with its weight, and totals are summarized by area, level and member type.",
    },
    {
      question: "How do you handle connections?",
      answer:
        "Connection material is carried as an adjustable allowance, usually a percentage of member weight, unless connections are fully detailed on the drawings.",
    },
    {
      question: "Do you include miscellaneous metals?",
      answer:
        "Yes, if they're in your scope: stairs, railings, ladders, lintels, embeds, bollards and similar Division 05 items.",
    },
    {
      question: "Can you provide steel shop drawings too?",
      answer:
        "Yes. Our structural detailing team prepares steel shop and erection drawings. See our structural detailing service for details.",
    },
  ],
  cta: {
    title: "Pricing a Steel Package?",
    text: "Send your structural and architectural drawings for a fixed quote on a complete metals takeoff.",
  },
};
