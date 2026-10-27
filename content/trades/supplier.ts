import { Factory, Truck, Warehouse, Zap } from "lucide-react";
import type { Trade } from "./types";

export const supplier: Trade = {
  slug: "supplier",
  name: "Supplier & Manufacturer Takeoffs",
  shortName: "Suppliers",
  label: "Supplier",
  summary: "Bills of materials and product takeoffs so your sales team can quote faster.",
  icon: Truck,
  group: "client",

  seo: {
    title: "Material Takeoffs for Suppliers & Manufacturers",
    description:
      "Bills of materials and product takeoffs for building material suppliers and manufacturers, so your sales team can quote contractors faster.",
  },
  hero: {
    tag: "For suppliers & manufacturers",
    title: "Material Takeoffs for Suppliers & Manufacturers",
    intro:
      "Product takeoffs and bills of materials from drawings and specs, so your sales team can quote contractors faster and win more specified projects.",
    badges: ["Bills of materials", "Your product names & units", "Fast quote turnaround"],
  },
  heroCard: {
    sheet: "BOM · Lumber & framing package",
    project: "Townhome project, 18 units",
    code: "Bill of materials",
    lines: [
      { label: "2×6 studs, 9'", value: "14,200 PCS", note: "+5% waste" },
      { label: "Floor trusses, 14\"", value: "486 EA" },
      { label: '7/16" OSB sheathing', value: "3,940 SHT" },
      { label: "LVL headers", value: "1,180 LF" },
    ],
  },
  // TODO: confirm turnaround
  facts: [
    { label: "Turnaround", value: "24–72 hr", text: "Matched to your quote deadlines" },
    { label: "Units", value: "Your units", text: "Quantities in the units you sell" },
    { label: "Format", value: "Your template", text: "Ready for your quoting system" },
    { label: "Coverage", value: "Any product line", text: "From lumber to light fixtures" },
  ],
  segments: {
    title: "Takeoffs for Every Supply Line",
    intro: "We work with distributors and manufacturers across the building products market.",
    items: [
      {
        id: "lumber",
        icon: Warehouse,
        title: "Lumber & building materials",
        text: "Framing packages, trusses, sheathing, siding and millwork for residential and light commercial work.",
        points: ["Framing and truss counts", "Sheathing and siding lists", "Door and window schedules"],
      },
      {
        id: "rebar-steel",
        icon: Factory,
        title: "Rebar, steel & concrete",
        text: "Reinforcing, structural shapes, deck and concrete accessories for fabricators and service centers.",
        points: ["Rebar by size and length", "Steel shapes and deck", "Accessories and embeds"],
      },
      {
        id: "mep",
        icon: Zap,
        title: "MEP & specialty distributors",
        text: "Pipe, conduit, wire, fixtures and equipment for plumbing, electrical and mechanical supply houses.",
        points: ["Fixture and device schedules", "Pipe and conduit runs", "Equipment lists"],
      },
    ],
  },
  scope: {
    title: "What We Take Off for Suppliers",
    intro: "Quantities your team can quote from without reading every sheet.",
    items: [
      { title: "Framing packages", text: "Studs, plates, headers, trusses and engineered lumber by size and length." },
      { title: "Sheathing & siding", text: "Wall and roof sheathing, house wrap, siding and trim by product." },
      { title: "Doors, windows & hardware", text: "Openings from the schedules, with hardware sets." },
      { title: "Rebar & accessories", text: "Bar lists by size, plus chairs, ties and mesh." },
      { title: "Steel & deck", text: "Shapes, plate and deck for service-center quotes." },
      { title: "Pipe & fittings", text: "Pipe by material and size with fitting counts." },
      { title: "Conduit, wire & devices", text: "Raceway, conductors, devices and fixtures by type." },
      { title: "Finishes", text: "Tile, flooring, ceilings and paint by product and color." },
      { title: "Spec compliance notes", text: "Specified products, approved equals and substitution notes." },
    ],
  },
  package: {
    title: "What You Receive",
    intro: "A bill of materials in your units, with marked-up drawings your sales team can reference.",
    zones: [
      { label: "Wall framing, level 1", detail: '2×6 @ 16" O.C.' },
      { label: "Floor system", detail: 'Trusses @ 24" O.C.' },
      { label: "Roof sheathing", detail: '7/16" OSB · 1,240 SHT' },
      { label: "Headers & beams", detail: "LVL & LSL by size" },
    ],
    rows: [
      { item: "2×6 studs, 9'", code: "06 11 00", net: 13500, unit: "PCS", waste: 0.05 },
      { item: "2×6 plates, 16'", code: "06 11 00", net: 2860, unit: "PCS", waste: 0.05 },
      { item: 'Floor trusses, 14"', code: "06 17 53", net: 486, unit: "EA", waste: 0 },
      { item: '7/16" OSB sheathing, 4×8', code: "06 16 23", net: 3750, unit: "SHT", waste: 0.05 },
      { item: "LVL headers", code: "06 17 13", net: 1120, unit: "LF", waste: 0.05 },
      { item: "House wrap", code: "07 25 00", net: 41200, unit: "SF", waste: 0.1 },
    ],
    note: "We report quantities only. Your team applies your own pricing, so your margins stay private.",
  },
  workflows: {
    title: "Built for Supplier Sales Teams",
    intro: "Takeoffs that fit into the way your team already quotes.",
    items: [
      {
        title: "Inside sales & estimating",
        text: "Quote more bid requests without your counter staff reading full plan sets.",
        points: ["BOMs in your units", "Faster quote turnaround"],
      },
      {
        title: "Outside sales",
        text: "Get product counts on specified projects early, while contractors are still choosing suppliers.",
        points: ["Early project quantities", "Specified product notes"],
      },
      {
        title: "Manufacturers",
        text: "Quantities of your products on target projects to support reps and specification efforts.",
        points: ["Product-specific takeoffs", "Project pipeline support"],
      },
    ],
  },
  why: {
    title: "Why Suppliers Choose Bidnora",
    points: [
      { title: "Your units, your products", text: "Quantities come in the units and lengths you stock and sell." },
      { title: "Quote before competitors", text: "Fast turnaround helps you respond while contractors are still collecting prices." },
      { title: "Specs read for you", text: "Specified products and approved equals are noted on the bill of materials." },
      { title: "Marked-up drawings", text: "Your team can see exactly what was counted if a contractor asks." },
      { title: "Repeatable format", text: "Every takeoff follows the same template, so quotes are quick to build." },
    ],
    tip: "Ask contractors for the window and door schedules up front; they often drive the biggest line items in a building materials quote.",
    testimonialIndex: 1,
  },
  faqs: [
    {
      question: "Can you use our product catalog or SKUs?",
      answer:
        "Yes. Send your catalog or a sample quote and we'll report quantities using your product names, units and stock lengths.",
    },
    {
      question: "Do you work with manufacturers as well as distributors?",
      answer: "Yes. Manufacturers use our takeoffs to quantify their products on target projects and support their sales reps.",
    },
    {
      question: "How fast can you turn around a supplier takeoff?",
      answer:
        "Most single-package takeoffs are delivered in one to three days, depending on project size. Rush delivery is available for tight quote deadlines.",
    },
    {
      question: "Do you price the materials?",
      answer: "No. We provide quantities in your units, and your team applies your own pricing, so your margins stay private.",
    },
  ],
  cta: {
    title: "Quote More Projects, Faster",
    text: "Send a plan set and your product list, and we'll reply with a fixed quote for your first takeoff.",
  },
};
