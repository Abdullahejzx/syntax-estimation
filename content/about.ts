import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  Calculator,
  Cuboid,
  Eye,
  FileSpreadsheet,
  GraduationCap,
  Handshake,
  Layers,
  MapPin,
  Monitor,
  PencilRuler,
  ScanSearch,
  ShieldCheck,
  Target,
  Timer,
  Zap,
} from "lucide-react";

/** Copy for the /about page. Stats and testimonials come from content/proof.ts. */
export const about = {
  seo: {
    title: "About Bidnora Engineering",
    description:
      "Bidnora Engineering is a New Jersey construction estimating firm founded in 2026 by estimators with 60+ years of combined field and preconstruction experience.",
  },
  hero: {
    tag: "About Bidnora Engineering",
    titleStart: "Estimators Who Think",
    titleEnd: "Like Contractors",
    intro:
      "A New Jersey estimating firm founded in 2026 by estimators with 60+ years of combined field and preconstruction experience.",
    // TODO: confirm turnaround claim
    badges: ["Turnaround: 24–72 hrs", "Local pricing by ZIP code", "All 50 states"],
  },
  story: {
    eyebrow: "Our story",
    title: "Built From Frustration on the Job Site",
    // TODO: replace with the founders' real story
    paragraphs: [
      "Our founders spent years as estimators and project managers on commercial job sites, watching capable contractors lose bids because the numbers were slow, padded or simply wrong. Outside estimating services were either too far removed from field conditions or took weeks to return basic quantities.",
      "In 2026 we started Bidnora Engineering to close that gap: fast, transparent estimates built on local pricing, delivered in unlocked spreadsheets with marked-up plans, so builders can submit bids with confidence.",
    ],
    badges: [
      { icon: ShieldCheck, text: "US-based team" },
      { icon: FileSpreadsheet, text: "Unlocked formulas" },
    ],
    card: {
      title: "Why We Started Bidnora",
      items: [
        { icon: Zap, title: "Faster turnaround", text: "Delivery in 24 to 72 hours, so you don't miss a bid deadline or an addendum." },
        { icon: Eye, title: "Transparent assumptions", text: "Unlocked Excel workbooks with visible formulas. No black-box pricing." },
        { icon: MapPin, title: "Real local pricing", text: "Labor and material rates adjusted to the project's location, union or open shop." },
      ],
      note: "Every estimate is checked by a second senior estimator before it's delivered.",
    },
  },
  timeline: {
    eyebrow: "2026 at a glance",
    title: "Building Momentum, Trade by Trade",
    intro: "From a New Jersey office to takeoffs delivered coast to coast in our first year.",
    // TODO: placeholder milestones. Replace with real dates and figures.
    items: [
      { badge: "Q1", label: "Founded", title: "Founded in New Jersey", text: "Started by senior estimators with 60+ combined years in construction and preconstruction.", foot: "Office in Newark, NJ" },
      { badge: "Q2", label: "First projects", title: "First 50 Projects Delivered", text: "Commercial and trade takeoffs delivered for contractors across multiple states.", foot: "Repeat clients from day one" },
      { badge: "Q3", label: "New capability", title: "Drafting & Detailing Team", text: "Added CAD drafters and rebar and steel detailers to support shop drawing work.", foot: "Shop drawings & BIM" },
      { badge: "Now", label: "Today", title: "120+ Projects Estimated", text: "Contractor clients across the country, with work in every CSI division.", foot: "Nationwide coverage" },
    ],
  },
  values: {
    eyebrow: "What we stand for",
    title: "How We Measure Our Success",
    intro: "We treat every estimate as if our own money and reputation were on the line.",
    items: [
      { icon: Target, title: "Accuracy", text: "Every pound of steel, cubic yard of concrete and square foot of drywall counted as if we were installing it ourselves." },
      { icon: Timer, title: "Speed", text: "Bid clocks don't wait. We commit to a delivery date before we start and we hit it." },
      { icon: Eye, title: "Transparency", text: "Unlocked formulas, clear exclusions and itemized pricing, with nothing hidden in the numbers." },
      { icon: Handshake, title: "Partnership", text: "We work as an extension of your preconstruction team, from the first question to bid day." },
    ] as { icon: LucideIcon; title: string; text: string }[],
  },
  statsNote: "Based in New Jersey · Serving commercial, residential and civil contractors nationwide.",
  team: {
    eyebrow: "Meet the team",
    title: "The Preconstruction Experts Behind Every Bid",
    intro: "Senior estimators, quantity surveyors and CAD detailers dedicated to your project.",
    // TODO: placeholder team members. Replace with real people, roles and bios (and add photos if you like).
    members: [
      { name: "Daniel Brooks", role: "Founder & Chief Estimator", years: 16, bio: "Commercial shell, concrete and multi-story framing. Former GC preconstruction director.", focus: "CSI Div 03 / 05 / 06" },
      { name: "Maria Santos", role: "Senior Commercial Estimator", years: 12, bio: "Healthcare and education projects, with deep experience pricing union and open-shop work.", focus: "Healthcare & institutional" },
      { name: "Kevin Patel", role: "Lead MEP Estimator", years: 10, bio: "Electrical, HVAC and plumbing takeoffs, backed by years working in the field.", focus: "Divisions 22, 23 & 26" },
      { name: "Ryan Mitchell", role: "Structural Detailer", years: 8, bio: "Rebar cut lists, steel erection packages, connection details and bar schedules.", focus: "Rebar & steel detailing" },
      { name: "Aisha Khan", role: "Drafting Lead", years: 8, bio: "AutoCAD and Revit drafting, permit sets and coordination drawings.", focus: "AutoCAD / Revit" },
      { name: "Chris Lopez", role: "Client Success Manager", years: 6, bio: "Handles file intake, RFIs, bid-day revisions and addenda so deadlines are met.", focus: "Quotes & scheduling" },
    ],
  },
  tools: {
    eyebrow: "Tools & methods",
    title: "Calibrated With Industry-Standard Software",
    intro: "Widely used estimating software paired with standard preconstruction methods.",
    // TODO: confirm the software and credentials below
    software: [
      { icon: PencilRuler, name: "PlanSwift", text: "Digital takeoff" },
      { icon: ScanSearch, name: "Bluebeam Revu", text: "PDF markups" },
      { icon: Monitor, name: "On-Screen Takeoff", text: "Takeoff" },
      { icon: MapPin, name: "RSMeans Data", text: "Location cost data" },
      { icon: Layers, name: "AutoCAD", text: "2D drafting" },
      { icon: Cuboid, name: "Autodesk Revit", text: "3D / BIM models" },
      { icon: FileSpreadsheet, name: "Microsoft Excel", text: "Live formulas" },
    ],
    methods: [
      { icon: GraduationCap, name: "Engineering backgrounds", text: "Degreed estimators" },
      { icon: Calculator, name: "Quantity surveying", text: "Standard measurement" },
      { icon: Award, name: "AACE estimate classes", text: "Accuracy by design stage" },
      { icon: ShieldCheck, name: "Jobsite experience", text: "Field-tested assumptions" },
      { icon: BookOpen, name: "CSI MasterFormat", text: "Divisions 01 to 49" },
    ],
  },
  coverage: {
    eyebrow: "Nationwide coverage",
    title: "Local Pricing for Projects Nationwide",
    intro:
      "Based in New Jersey, with labor and material pricing adjusted for the county and ZIP code of every project in the United States.",
    // TODO: confirm the markets you want to highlight
    markets: [
      { city: "New York Metro", note: "Home region" },
      { city: "Philadelphia, PA", note: "Home region" },
      { city: "Dallas–Fort Worth, TX", note: "Commercial & industrial" },
      { city: "Atlanta, GA", note: "Southeast" },
      { city: "Chicago, IL", note: "Midwest" },
      { city: "Los Angeles, CA", note: "West Coast" },
    ],
    note: "Every estimate can use union, prevailing-wage or open-shop labor rates.",
  },
  cta: {
    eyebrow: "Ready for your next bid",
    title: "Let's Estimate Your Next Project Together",
    text: "Send us your drawings and our estimators in New Jersey will review your scope and reply with a fixed quote.",
  },
};
