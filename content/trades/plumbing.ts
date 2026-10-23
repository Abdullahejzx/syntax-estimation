import { Droplets } from "lucide-react";
import type { Trade } from "./types";

export const plumbing: Trade = {
  slug: "plumbing",
  name: "Plumbing Estimating",
  shortName: "Plumbing",
  summary: "Fixtures, piping runs and fittings by system and material.",
  icon: Droplets,
  group: "trade",

  seo: {
    title: "Plumbing Estimating & Takeoff Services",
    description:
      "Plumbing takeoffs with fixtures, piping by system and size, fittings, valves and equipment measured from your P-sheets.",
  },
  hero: {
    tag: "For plumbing contractors",
    title: "Plumbing Estimating & Takeoff Services",
    intro:
      "Fixtures, piping, fittings and equipment measured by system and pipe size from your P-sheets, so your plumbing bid covers every run from the main to the last trap.",
    badges: ["CSI Division 22 coverage", "Pipe by system & size", "Fixtures from schedules"],
  },
  heroCard: {
    sheet: "DWG P-201 · Plumbing plan, level 2",
    project: "Multi-family building, 64 units",
    code: "CSI 22 11 00 Facility water distribution",
    lines: [
      { label: "Fixtures by type", value: "412 EA" },
      { label: "PEX domestic water", value: "14,800 LF", note: "+10% waste" },
      { label: "PVC sanitary & vent", value: "9,640 LF" },
      { label: "Water heaters", value: "64 EA" },
    ],
  },
  // TODO: confirm turnaround
  facts: [
    { label: "Turnaround", value: "48–72 hr", text: "Typical for commercial plumbing" },
    { label: "Units", value: "EA & LF", text: "Fixtures, piping and fittings" },
    { label: "Systems", value: "Separated", text: "Domestic, sanitary, vent and storm" },
    { label: "Coverage", value: "Division 22", text: "Plus gas and site utilities" },
  ],
  scope: {
    title: "Complete Plumbing Quantities by System",
    intro: "Every fixture, pipe run and piece of equipment, kept separate by system the way you price it.",
    items: [
      { title: "Fixtures", text: "Toilets, lavatories, sinks, showers and drains counted from the fixture schedule." },
      { title: "Domestic water", text: "Hot and cold water piping by material and size, with valves and hangers." },
      { title: "Sanitary & vent", text: "Waste and vent piping by size, with cleanouts and fittings." },
      { title: "Storm drainage", text: "Roof drains, overflow drains and storm piping to the building exit." },
      { title: "Gas piping", text: "Natural gas piping by size to each appliance, with regulators and valves." },
      { title: "Equipment", text: "Water heaters, pumps, backflow preventers and expansion tanks." },
      { title: "Fittings & valves", text: "Fitting counts or allowances by type, plus isolation and balancing valves." },
      { title: "Pipe insulation", text: "Insulation by pipe size and thickness where specified." },
      { title: "Underground & site", text: "Under-slab piping, trenching and site utility connections." },
    ],
  },
  package: {
    zones: [
      { label: "Unit type A: fixtures", detail: "6 per unit × 40 units" },
      { label: "Domestic water risers", detail: 'PEX 3/4"–2"' },
      { label: "Sanitary stack S-3", detail: '4" PVC · 6 floors' },
      { label: "Roof drains RD-1 to RD-8", detail: '8 EA · 4" storm' },
    ],
    rows: [
      { item: "Plumbing fixtures, per schedule", code: "22 40 00", net: 412, unit: "EA", waste: 0 },
      { item: 'PEX domestic water, 1/2"–1"', code: "22 11 16", net: 14800, unit: "LF", waste: 0.1 },
      { item: 'Copper Type L, 1-1/4"–2"', code: "22 11 16", net: 1260, unit: "LF", waste: 0.05 },
      { item: 'PVC sanitary & vent, 1-1/2"–4"', code: "22 13 16", net: 9640, unit: "LF", waste: 0.1 },
      { item: 'Cast iron storm, 4"', code: "22 14 13", net: 860, unit: "LF", waste: 0.05 },
      { item: 'Pipe insulation, 1"', code: "22 07 19", net: 6420, unit: "LF", waste: 0.05 },
    ],
    note: "Vertical runs are measured from the riser diagrams, not just plan views.",
  },
  pricing: {
    intro: "Each system and material is priced on its own, so substitutions and changes are easy to re-price.",
    pillars: [
      { text: "Fixtures, pipe, fittings, valves and equipment at current distributor pricing for your area.", chip: "Distributor pricing" },
      { text: "Hours by fixture, pipe size and material, adjusted for height and building type.", chip: "Labor units per item" },
      { text: "Lifts, threading machines, press tools and excavation for the job.", chip: "Lifts & press tools" },
      { text: "Permits, testing, disinfection and the markup you set.", chip: "Your markup & contingency" },
    ],
  },
  workflows: {
    title: "Tailored Plumbing Estimating Workflows",
    intro: "Organized for plumbing contractors, GCs and supply houses.",
    items: [
      {
        title: "Plumbing contractors",
        text: "Bid more jobs with fixtures and piping already broken out by system and size.",
        points: ["Pipe by system & size", "Fixture counts by unit type"],
      },
      {
        title: "General contractors",
        text: "Independent plumbing quantities to compare subs and confirm storm and gas aren't missed.",
        points: ["System-by-system check", "Bid leveling support"],
      },
      {
        title: "Plumbing suppliers",
        text: "Fixture and pipe lists your sales team can quote quickly.",
        points: ["Fixture schedule totals", "Pipe & fitting lists"],
      },
    ],
  },
  why: {
    title: "Why Plumbing Contractors Choose Syntax",
    points: [
      { title: "Organized by system", text: "Domestic, sanitary, vent, storm and gas are kept separate, the way you price them." },
      { title: "Fixtures from the schedule", text: "Every fixture tag is counted and checked against the schedule." },
      { title: "Risers and drops included", text: "Vertical runs come from riser diagrams, not just plan views." },
      { title: "Fittings your way", text: "Count fittings individually or carry an allowance; you choose." },
      { title: "Revisions tracked", text: "Changed runs and fixtures are clouded on updated sheets." },
    ],
    tip: "Check the riser diagrams against the floor plans: vertical pipe is easy to under-count from plan views alone.",
    testimonialIndex: 1,
  },
  faqs: [
    {
      question: "Do you separate piping by system?",
      answer: "Yes. Domestic water, sanitary, vent, storm and gas piping are measured and reported separately, by material and size.",
    },
    {
      question: "Do you count fittings?",
      answer: "We can count fittings by type and size or carry them as an allowance per foot of pipe, depending on how you price.",
    },
    {
      question: "Are fixtures counted from the schedule?",
      answer:
        "Yes. Fixture tags are counted on the plans and checked against the fixture schedule, including carriers and trim when specified.",
    },
    {
      question: "Do you include site utilities?",
      answer: "If site water, sewer or storm connections are in your scope, we include them from the civil sheets.",
    },
  ],
  cta: {
    title: "Pricing a Plumbing Job?",
    text: "Upload your P-sheets and get a fixed quote for a complete plumbing takeoff.",
  },
};
