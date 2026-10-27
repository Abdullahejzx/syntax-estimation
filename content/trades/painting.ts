import { PaintRoller } from "lucide-react";
import type { Trade } from "./types";

export const painting: Trade = {
  slug: "painting",
  name: "Painting Estimating",
  shortName: "Painting",
  summary: "Wall, ceiling, trim and specialty coating areas with coats and finishes.",
  icon: PaintRoller,
  group: "trade",

  seo: {
    title: "Painting Estimating & Takeoff Services",
    description:
      "Painting takeoffs with wall, ceiling, trim and specialty coating areas, coats and products measured room by room from your drawings.",
  },
  hero: {
    tag: "For painting contractors",
    title: "Painting Estimating & Takeoff Services",
    intro:
      "Wall, ceiling, door, trim and specialty coating areas measured room by room from the finish schedule, so your painting bid reflects every coat on the drawings.",
    badges: ["CSI Division 09 coverage", "Areas by finish & coat", "Doors & frames counted"],
  },
  heroCard: {
    sheet: "DWG A-601 · Finish plan, level 1",
    project: "Elementary school renovation",
    code: "CSI 09 91 00 Painting",
    lines: [
      { label: "Walls, eggshell, 2 coats", value: "64,200 SF" },
      { label: "Gypsum ceilings, flat", value: "18,400 SF" },
      { label: "Hollow-metal doors & frames", value: "148 EA" },
      { label: "Epoxy floor coating", value: "6,800 SF" },
    ],
  },
  // TODO: confirm turnaround
  facts: [
    { label: "Turnaround", value: "24–48 hr", text: "Typical for painting packages" },
    { label: "Units", value: "SF, LF & EA", text: "Areas, trim runs and doors" },
    { label: "Finishes", value: "By schedule", text: "Tied to the room finish schedule" },
    { label: "Coverage", value: "Division 09", text: "Interior and exterior coatings" },
  ],
  scope: {
    title: "Complete Painting & Coatings Quantities",
    intro: "Every surface on the finish schedule, measured with the right height, coats and product.",
    items: [
      { title: "Interior walls", text: "Wall areas by room and finish, with openings deducted and heights from sections." },
      { title: "Ceilings & soffits", text: "Gypsum ceilings and exposed structure, including open-deck painting." },
      { title: "Doors & frames", text: "Doors, frames and borrowed lites counted by type and side." },
      { title: "Trim & millwork", text: "Base, casing, chair rail and handrails by linear foot." },
      { title: "Exterior coatings", text: "Siding, stucco, masonry and metal surfaces by elevation." },
      { title: "Specialty coatings", text: "Epoxy floors, high-performance coatings, elastomerics and anti-graffiti finishes." },
      { title: "Steel & MEP painting", text: "Exposed steel, piping and ductwork where specified." },
      { title: "Wallcovering", text: "Vinyl wallcovering and wall protection by area and roll." },
      { title: "Prep & primers", text: "Primer, sealer and patching quantities based on the substrate." },
    ],
  },
  package: {
    zones: [
      { label: "Classrooms: eggshell", detail: "38,200 SF walls" },
      { label: "Corridors: semi-gloss", detail: "14,600 SF walls" },
      { label: "Gym: exposed deck", detail: "11,800 SF dryfall" },
      { label: "Doors & frames", detail: "148 EA" },
    ],
    rows: [
      { item: "Interior walls, eggshell, 2 coats", code: "09 91 23", net: 64200, unit: "SF", waste: 0.05 },
      { item: "Gypsum ceilings, flat, 2 coats", code: "09 91 23", net: 18400, unit: "SF", waste: 0.05 },
      { item: "Exposed deck & joists, dryfall", code: "09 91 23", net: 11800, unit: "SF", waste: 0.05 },
      { item: "Hollow-metal doors & frames", code: "09 91 23", net: 148, unit: "EA", waste: 0 },
      { item: "Wood base & trim", code: "09 91 23", net: 9640, unit: "LF", waste: 0.05 },
      { item: "Epoxy floor coating", code: "09 67 23", net: 6800, unit: "SF", waste: 0.05 },
    ],
    note: "Areas are converted into gallons per product using coverage rates and coat counts.",
  },
  pricing: {
    intro: "Surface, height and method drive painting costs. We price each one so nothing gets averaged away.",
    pillars: [
      { text: "Paint and coatings by product line, sheen and coverage, with primers and sundries.", chip: "Coverage-based gallons" },
      { text: "Hours by surface, height, coats and method: brush, roll or spray.", chip: "SF per painter-day" },
      { text: "Lifts, scaffolds, sprayers and masking for occupied or open spaces.", chip: "Lifts & sprayers" },
      { text: "Protection, cleanup, punch-list and the markup you set.", chip: "Your markup & contingency" },
    ],
  },
  workflows: {
    title: "Tailored Painting Estimating Workflows",
    intro: "Organized for painting contractors, GCs and paint suppliers.",
    items: [
      {
        title: "Painting contractors",
        text: "Price more painting packages with areas already split by finish, coat and height.",
        points: ["Areas by room & finish", "Gallons per product"],
      },
      {
        title: "General contractors",
        text: "Check painting bids for missed surfaces like exposed structure, doors or specialty coatings.",
        points: ["Finish schedule check", "Bid leveling support"],
      },
      {
        title: "Paint suppliers",
        text: "Product and gallon estimates to quote contractors quickly.",
        points: ["Gallons by product & sheen", "Sundries list"],
      },
    ],
  },
  why: {
    title: "Why Painting Contractors Choose Bidnora",
    points: [
      { title: "Driven by the finish schedule", text: "Every room's finishes come from the schedule, not assumptions." },
      { title: "Heights included", text: "Wall heights and exposed ceilings are measured from sections, where bids are often won or lost." },
      { title: "Doors and frames counted", text: "Each door and frame is counted by type and side." },
      { title: "Gallons, not guesses", text: "Coverage rates convert areas into gallons per product." },
      { title: "Revisions highlighted", text: "Changes to finishes or rooms are flagged on updated plans." },
    ],
    tip: "Price exposed ceilings and high walls separately: lift work can double the labor per square foot.",
    testimonialIndex: 2,
  },
  faqs: [
    {
      question: "Do you use the room finish schedule?",
      answer: "Yes. Each room's wall, ceiling and floor finishes come from the finish schedule and are matched to measured areas.",
    },
    {
      question: "Do you deduct openings from wall areas?",
      answer: "Yes, by default. If your company paints through small openings, tell us and we'll follow your method.",
    },
    {
      question: "Can you estimate gallons?",
      answer: "Yes. We convert areas into gallons using the specified products' coverage rates and the number of coats.",
    },
    {
      question: "Do you include exterior painting?",
      answer: "Yes. Exterior surfaces are measured by elevation and substrate when they're in your scope.",
    },
  ],
  cta: {
    title: "Pricing a Painting Job?",
    text: "Upload your plans and finish schedule for a fixed quote on a complete painting takeoff.",
  },
};
