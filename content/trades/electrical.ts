import { Zap } from "lucide-react";
import type { Trade } from "./types";

export const electrical: Trade = {
  slug: "electrical",
  name: "Electrical Estimating",
  shortName: "Electrical",
  summary: "Devices, fixtures, conduit, wire and gear counted from the E-sheets.",
  icon: Zap,
  group: "trade",

  seo: {
    title: "Electrical Estimating & Takeoff Services",
    description:
      "Electrical takeoffs with device and fixture counts, conduit and wire runs, gear and low-voltage systems measured from your E-sheets.",
  },
  hero: {
    tag: "For electrical contractors",
    title: "Electrical Estimating & Takeoff Services",
    intro:
      "Devices, fixtures, conduit, wire and gear counted from your E-sheets and panel schedules, so your electrical bid covers every circuit on the drawings.",
    badges: ["CSI Division 26 coverage", "Counts by panel & circuit", "Low-voltage options"],
  },
  heroCard: {
    sheet: "DWG E-201 · Power plan, level 2",
    project: "Office building fit-out",
    code: "CSI 26 05 00 Common work results",
    lines: [
      { label: "Receptacles & devices", value: "1,284 EA" },
      { label: "Light fixtures by type", value: "642 EA" },
      { label: '3/4" EMT conduit', value: "18,400 LF", note: "+10% waste" },
      { label: "#12 THHN copper", value: "61,200 LF" },
    ],
  },
  // TODO: confirm turnaround
  facts: [
    { label: "Turnaround", value: "48–72 hr", text: "Typical for commercial electrical" },
    { label: "Units", value: "EA & LF", text: "Devices, fixtures, conduit and wire" },
    { label: "Gear", value: "From schedules", text: "Panels, transformers and switchgear" },
    { label: "Coverage", value: "Division 26", text: "Plus 27 & 28 low voltage" },
  ],
  scope: {
    title: "Complete Electrical Quantities",
    intro: "Every symbol, run and schedule on the E-sheets, counted and grouped the way you price.",
    items: [
      { title: "Devices", text: "Receptacles, switches, data outlets and floor boxes counted by type." },
      { title: "Lighting", text: "Fixtures by type from the lighting schedule, with controls and sensors." },
      { title: "Conduit & raceway", text: "Branch and feeder conduit by size and type, with fittings and supports." },
      { title: "Wire & cable", text: "Conductors by size from homeruns and circuit lengths, plus MC cable." },
      { title: "Distribution gear", text: "Switchgear, panels, transformers and disconnects from the one-line." },
      { title: "Feeders", text: "Feeder runs by size between gear, with pull boxes and terminations." },
      { title: "Grounding & bonding", text: "Grounding electrodes, conductors and bonding jumpers." },
      { title: "Low voltage", text: "Data, fire alarm, security and AV rough-in when in your scope." },
      { title: "Site electrical", text: "Site lighting, underground duct banks and service entrance work." },
    ],
  },
  package: {
    zones: [
      { label: "Open office: devices", detail: "412 EA" },
      { label: "Lighting: types A & B", detail: "286 fixtures" },
      { label: '3/4" EMT branch conduit', detail: "18,400 LF" },
      { label: "Panels LP-2A & LP-2B", detail: "2 × 42-circuit" },
    ],
    rows: [
      { item: "Duplex receptacles, 20A", code: "26 27 26", net: 846, unit: "EA", waste: 0 },
      { item: "2×4 LED troffers", code: "26 51 00", net: 412, unit: "EA", waste: 0 },
      { item: '3/4" EMT conduit', code: "26 05 33", net: 18400, unit: "LF", waste: 0.1 },
      { item: "#12 THHN copper", code: "26 05 19", net: 61200, unit: "LF", waste: 0.1 },
      { item: "MC cable, 12/2", code: "26 05 19", net: 9800, unit: "LF", waste: 0.1 },
      { item: "Panelboards, 42-circuit", code: "26 24 16", net: 6, unit: "EA", waste: 0 },
    ],
    note: "Counts are grouped by floor and panel and organized for easy import into estimating software.",
  },
  pricing: {
    intro: "Copper and gear prices change weekly. Keeping cost groups separate makes updates painless.",
    pillars: [
      { text: "Devices, fixtures, conduit, wire and gear priced with current copper and distributor pricing.", chip: "Current copper pricing" },
      { text: "Hours per device, fixture and foot of conduit, adjusted for height and building type.", chip: "Labor units per item" },
      { text: "Lifts, wire pullers, benders and trenching for the job.", chip: "Lifts & pulling" },
      { text: "Permits, inspections, temporary power and the markup you set.", chip: "Your markup & contingency" },
    ],
  },
  workflows: {
    title: "Tailored Electrical Estimating Workflows",
    intro: "Organized for electrical contractors, GCs and distributors.",
    items: [
      {
        title: "Electrical contractors",
        text: "Bid more projects with device, fixture and conduit counts ready for your pricing software.",
        points: ["Counts by panel & floor", "Import-friendly quantities"],
      },
      {
        title: "General contractors",
        text: "An independent electrical count to level sub bids and check gear and low-voltage scope.",
        points: ["Gear & feeder check", "Bid leveling support"],
      },
      {
        title: "Electrical distributors",
        text: "Fixture and material lists to quote contractors quickly.",
        points: ["Fixture schedule totals", "Conduit & wire lists"],
      },
    ],
  },
  why: {
    title: "Why Electrical Contractors Choose Syntax",
    points: [
      { title: "Every device counted", text: "Symbols are counted sheet by sheet and tied to their panel." },
      { title: "Wire from real runs", text: "Conductor lengths come from homerun distances and circuit layouts, not rules of thumb." },
      { title: "Gear from the one-line", text: "Panels, transformers and switchgear come from the schedules and riser." },
      { title: "Low voltage optional", text: "Add fire alarm, data and security rough-in when they're in your scope." },
      { title: "Revisions tracked", text: "Changed circuits and fixtures are clouded on the updated sheets." },
    ],
    tip: "Compare the lighting schedule with the fixture counts on the plans; types added in addenda often show up on one and not the other.",
    testimonialIndex: 2,
  },
  faqs: [
    {
      question: "Do you count devices and fixtures by type?",
      answer:
        "Yes. Every device and fixture symbol is counted by type and grouped by floor, area or panel, matching the lighting and panel schedules.",
    },
    {
      question: "How do you estimate wire quantities?",
      answer:
        "We measure conduit runs from the plans, add drops and homeruns, and calculate conductor lengths by size, including the equipment ground.",
    },
    {
      question: "Do you include low-voltage systems?",
      answer: "If they're in your scope, yes: data, fire alarm, security and AV rough-in can be measured in the same takeoff.",
    },
    {
      question: "Can you format quantities for my estimating software?",
      answer:
        "We deliver Excel files organized so quantities are easy to import into common electrical estimating programs. Tell us which one you use.",
    },
  ],
  cta: {
    title: "Bidding an Electrical Job?",
    text: "Upload your E-sheets and get a fixed quote for a complete electrical takeoff.",
  },
};
