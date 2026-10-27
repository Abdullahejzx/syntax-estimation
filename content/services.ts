import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Building2,
  Calculator,
  ClipboardList,
  Clock,
  Cuboid,
  DraftingCompass,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Grid3x3,
  Hammer,
  HardHat,
  Layers,
  Lightbulb,
  ListChecks,
  MapPin,
  PencilRuler,
  Percent,
  PiggyBank,
  RefreshCw,
  Ruler,
  Scale,
  ShieldCheck,
  Stamp,
  Target,
  TrendingUp,
  Waypoints,
  Wrench,
} from "lucide-react";
import type { AccordionItem } from "@/components/ui/Accordion";
import type { FeatureItem } from "@/components/sections/FeatureGrid";
import type { MarkupZone } from "@/components/sections/ProcessTimeline";
import type { SheetData } from "@/components/sections/EstimateSheet";
import type { Stage } from "@/components/sections/StageCards";

/**
 * One entry per service. The header menu, footer, home page, /services hub and
 * every /services/[slug] page are generated from this list, so adding a service
 * means adding one entry here.
 */
export type Service = {
  slug: string;
  /** Full name, used for the H1 area and page titles */
  name: string;
  /** Short name for menus and chips */
  shortName: string;
  /** One or two sentences for cards and menus */
  summary: string;
  /** Three bullet points for the /services hub cards */
  highlights: [string, string, string];
  icon: LucideIcon;
  seo: { title: string; description: string };
  hero: {
    tag: string;
    title: string;
    intro: string;
    highlights: { icon: LucideIcon; title: string; text: string }[];
  };
  /** "Service overview" section under the hero: two paragraphs plus three short lists */
  overview: {
    title: string;
    paragraphs: [string, string];
    audiences: string[];
    deliverables: string[];
    software: string[];
  };
  included: { title: string; intro: string; items: FeatureItem[] };
  stages: { eyebrow: string; title: string; intro: string; items: Stage[] };
  process: { title: string; intro: string; steps: { title: string; text: string }[]; zones: [MarkupZone, MarkupZone, MarkupZone] };
  sheet: { title: string; intro: string; data: SheetData };
  advantages: { title: string; intro: string; points: { title: string; text: string }[]; testimonialIndex: number };
  faqs: AccordionItem[];
  cta: { title: string; text: string };
};

// NOTE: accuracy ranges, turnaround times and software names below are typical
// figures. TODO: confirm each one matches how the business actually works.

export const services: Service[] = [
  // -------------------------------------------------------------------------
  {
    slug: "cost-estimating",
    name: "Construction Cost Estimating",
    shortName: "Cost Estimating",
    summary:
      "Line-item material, labor and equipment pricing organized by CSI division and adjusted to your project's location.",
    highlights: ["Itemized by CSI division", "Labor and material priced for your ZIP code", "Overhead, profit and contingency shown"],
    icon: Calculator,
    seo: {
      title: "Construction Cost Estimating Services",
      description:
        "Bid-ready construction cost estimates with material, labor and equipment priced for your project's location. Delivered in 24–72 hours for contractors in all 50 states.",
    },
    hero: {
      tag: "CSI division pricing",
      title: "Construction Cost Estimating Services",
      intro:
        "Bid-ready cost estimates built line by line from your drawings, with material, labor and equipment priced for the project's ZIP code, so your number holds up on bid day.",
      highlights: [
        { icon: Clock, title: "24–72 hr", text: "Typical turnaround" },
        { icon: MapPin, title: "Local pricing", text: "Adjusted to your ZIP code" },
        { icon: RefreshCw, title: "Addenda included", text: "Updates until bid day" },
      ],
    },
    overview: {
      title: "Detailed Cost Estimates You Can Bid With",
      paragraphs: [
        "A construction cost estimate is only useful if you can trust every line. Our estimators build each estimate from a full quantity takeoff of your drawings and specifications, then price materials, labor, equipment and subcontracted work using current costs for your project's location.",
        "Estimates are organized by CSI MasterFormat division, so they drop straight into your bid forms, budgets or schedule of values. Every assumption, allowance and exclusion is written down, so your team knows exactly what is and isn't included before bid day.",
      ],
      audiences: ["General contractors", "Subcontractors", "Developers & owners", "Architects & engineers"],
      deliverables: [
        "Itemized estimate in unlocked Excel",
        "Marked-up takeoff PDFs",
        "Material, labor and equipment breakdown",
        "Assumptions, allowances and exclusions",
        "Bid summary by CSI division",
      ],
      software: ["Bluebeam Revu", "PlanSwift", "On-Screen Takeoff", "RSMeans data", "Microsoft Excel"],
    },
    included: {
      title: "What's Included in Every Cost Estimate",
      intro: "Every estimate is itemized, so your team, the owner or a lender can follow how each number was built.",
      items: [
        {
          icon: Ruler,
          title: "Quantity takeoff",
          text: "Counts, lengths, areas and volumes measured from every sheet, with waste factors and net-to-gross conversions shown.",
          metaLabel: "Bluebeam & PlanSwift",
          metaValue: "Divisions 01–49",
        },
        {
          icon: HardHat,
          title: "Labor costing",
          text: "Crew rates for union, open-shop or prevailing-wage work, including burden, taxes and productivity for each task.",
          metaLabel: "Local wage data",
          metaValue: "By ZIP code",
        },
        {
          icon: Wrench,
          title: "Equipment & general conditions",
          text: "Lifts, cranes, scaffolding, dumpsters, temporary facilities and supervision, sized to the project schedule.",
          metaLabel: "Division 01",
          metaValue: "Schedule-based",
        },
        {
          icon: ShieldCheck,
          title: "Contingency allowance",
          text: "Design, escalation and site-condition allowances listed separately so you can defend them or adjust them.",
          metaLabel: "Risk register",
          metaValue: "Escalation-ready",
        },
        {
          icon: TrendingUp,
          title: "Phase-by-phase budget",
          text: "Costs split by phase or building area to support cash-flow planning, lender draws and the schedule of values.",
          metaLabel: "Cash-flow view",
          metaValue: "SOV-ready",
        },
        {
          icon: PiggyBank,
          title: "Value engineering",
          text: "Alternate materials and methods priced side by side, with the savings each option would bring.",
          metaLabel: "Alternates list",
          metaValue: "Priced options",
        },
      ],
    },
    stages: {
      eyebrow: "Estimate types",
      title: "Estimate Types for Every Project Milestone",
      intro: "Choose the level of detail that matches where your design and procurement stand.",
      items: [
        {
          badge: "Stage 01",
          title: "Feasibility / ROM",
          subtitle: "Concept & site studies",
          text: "Order-of-magnitude budgets from sketches, site plans or square-footage targets to test whether a project pencils out.",
          metricLabel: "Typical accuracy",
          metricValue: "±20–30%",
          progress: 25,
        },
        {
          badge: "Stage 02",
          title: "Schematic & DD",
          subtitle: "30–70% drawings",
          text: "Trade-by-trade budgets as the design develops, flagging scope growth early and comparing system options.",
          metricLabel: "Typical accuracy",
          metricValue: "±10–15%",
          progress: 55,
        },
        {
          badge: "Stage 03",
          title: "Bid & Tender",
          subtitle: "Construction documents",
          text: "Hard-dollar pricing from complete drawings and specs, organized to compare against sub bids line by line.",
          metricLabel: "Typical accuracy",
          metricValue: "±5%",
          progress: 90,
          featured: "Most requested",
        },
        {
          badge: "Stage 04",
          title: "Construction Control",
          subtitle: "After award",
          text: "Change order pricing, addenda updates and schedule-of-values checks while the job is underway.",
          metricLabel: "Typical turnaround",
          metricValue: "24–48 hrs",
          progress: 100,
        },
      ],
    },
    process: {
      title: "Our 5-Step Estimating Process",
      intro: "A repeatable workflow that takes your plans from upload to a checked, editable estimate.",
      steps: [
        {
          title: "Share plans & specs",
          text: "Upload drawings, specifications and addenda, or send a plan-room link. Tell us your bid date and any scope to exclude.",
        },
        {
          title: "Scope review & questions",
          text: "An estimator reviews every sheet, flags missing details or conflicts and sends questions you can turn into RFIs.",
        },
        {
          title: "Quantity takeoff",
          text: "Each item is measured and color-coded by CSI division, so any quantity can be traced back to the sheet it came from.",
        },
        {
          title: "Local labor & material pricing",
          text: "Quantities are priced with labor and material rates for the project's location, then checked against current supplier pricing.",
        },
        {
          title: "Peer review & delivery",
          text: "A second estimator checks the file before you receive the unlocked Excel workbook and marked-up PDFs.",
        },
      ],
      zones: [
        { label: "Zone A: Slab on grade", detail: "2,140 SF · 26.4 CY" },
        { label: "Zone B: 1-hr rated walls", detail: "480 LF · 4,320 SF" },
        { label: "Zone C: MEP rough-in", detail: "Div 22 / 23 / 26 runs" },
      ],
    },
    sheet: {
      title: "Audit-Ready MasterFormat Estimate Sheet",
      intro: "The same format you'll receive: grouped by division, with material, labor and equipment broken out on every line.",
      data: {
        title: "Commercial shell & core · division breakdown",
        meta: "Location factor: Dallas, TX",
        sheets: ["00 Summary", "03 Concrete", "05 Metals", "09 Finishes", "General conditions"],
        note: "Labor burden included · Unit rates set for current market",
        columns: [
          { label: "CSI code" },
          { label: "Description" },
          { label: "Qty", numeric: true },
          { label: "Unit" },
          { label: "Material", numeric: true },
          { label: "Labor", numeric: true },
          { label: "Equip.", numeric: true },
          { label: "Total", numeric: true },
        ],
        groups: [
          {
            name: "Division 03 — Concrete",
            rows: [
              ["03 30 00", '4,000 PSI slab on grade, 6" with vapor barrier', "48,500", "SF", "$4.85", "$3.10", "$0.65", "$417,100.00"],
              ["03 21 00", '#4 Grade 60 rebar, 16" O.C. each way', "54.2", "TON", "$1,620.00", "$980.00", "$140.00", "$148,508.00"],
              ["03 11 00", "Slab edge formwork", "1,240", "LF", "$5.20", "$11.40", "$1.10", "$21,948.00"],
            ],
          },
          {
            name: "Division 05 — Metals",
            rows: [
              ["05 12 00", "Structural steel framing, W-shapes & HSS", "186.4", "TON", "$2,450.00", "$1,280.00", "$420.00", "$773,560.00"],
              ["05 31 00", '1.5" 20 GA galvanized roof deck', "52,000", "SF", "$2.65", "$1.15", "$0.25", "$210,600.00"],
            ],
          },
          {
            name: "Division 09 — Finishes",
            rows: [
              ["09 22 16", '3-5/8" 20 GA metal studs, 16" O.C.', "18,200", "SF", "$1.45", "$2.20", "$0.10", "$68,250.00"],
              ["09 29 00", '5/8" Type X gypsum board, Level 4 finish', "36,400", "SF", "$0.85", "$1.40", "$0.05", "$83,720.00"],
            ],
          },
        ],
        summary: [
          { label: "Direct cost subtotal", value: "$1,723,686.00" },
          { label: "General conditions, overhead & profit (12%)", value: "$206,842.32" },
          { label: "Design & escalation contingency (3%)", value: "$51,710.58" },
        ],
        total: { label: "Estimated bid value", value: "$1,982,238.90" },
      },
    },
    advantages: {
      title: "Engineered for Bid Accuracy & Win Rates",
      intro:
        "Losing a bid by a small margin hurts; winning one you underpriced hurts more. Our estimates are built to be competitive and defensible.",
      points: [
        { title: "On-time delivery", text: "You get a committed delivery date before work starts, set ahead of your bid deadline." },
        { title: "Unlocked, native files", text: "Adjust margins, labor multipliers or tax rates yourself in the Excel workbook." },
        { title: "One estimator per project", text: "A named estimator is available by phone and email for pre-bid questions." },
        { title: "Addenda updates", text: "When an addendum lands before bid day, we update the takeoff and pricing to match." },
      ],
      testimonialIndex: 1,
    },
    faqs: [
      {
        question: "How accurate are your cost estimates?",
        answer:
          "Accuracy depends on how complete the drawings are. Estimates from full construction documents typically land within a few percent of awarded subcontractor pricing, while conceptual budgets carry wider ranges. Every estimate lists its assumptions and exclusions so you know exactly what's included.",
      },
      {
        question: "What is the typical turnaround for a full cost estimate?",
        answer:
          "Most estimates are delivered in 24 to 72 hours, depending on project size and the number of trades. Large multi-trade projects can take longer; we confirm the delivery date before we start.",
      },
      {
        question: "What do I need to send to get started?",
        answer:
          "Drawings (PDF or CAD), specifications if available, any addenda, your bid date and a note on scope you want included or excluded. A plan-room or cloud folder link works too.",
      },
      {
        question: "How is the estimate itself priced?",
        answer:
          "Each project is priced on the number of sheets, the trades involved and the level of detail needed. You receive a fixed quote before any work begins, with no subscription or retainer.",
      },
      {
        question: "How do you handle addenda and plan revisions?",
        answer:
          "Send the addendum and we compare it against the original set, update the affected quantities and costs, and highlight what changed so you can review it quickly.",
      },
    ],
    cta: {
      title: "Get Your Construction Cost Estimate Started Today",
      text: "Send us your drawings and get a fixed quote and delivery date. Win more bids with numbers you can stand behind.",
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: "quantity-takeoffs",
    name: "Quantity Takeoff Services",
    shortName: "Quantity Takeoffs",
    summary:
      "Counts, lengths, areas and volumes measured from your drawings, with color-coded markups and an editable Excel workbook.",
    highlights: ["Color-coded plan markups", "Order-ready material lists", "Waste factors you can edit"],
    icon: Ruler,
    seo: {
      title: "Quantity Takeoff Services for Contractors",
      description:
        "Accurate material quantity takeoffs with color-coded plan markups and editable Excel workbooks. Trade-specific counts for subcontractors, GCs and suppliers.",
    },
    hero: {
      tag: "Measured from your drawings",
      title: "Quantity Takeoff Services",
      intro:
        "Precise counts, lengths, areas and volumes for every trade, measured from your drawings and delivered with color-coded markups so you can check any quantity in seconds.",
      highlights: [
        { icon: Clock, title: "24–48 hr", text: "Typical single-trade turnaround" },
        { icon: Layers, title: "Color-coded", text: "Markups tied to sheet numbers" },
        { icon: FileSpreadsheet, title: "Editable Excel", text: "Live formulas, no locked cells" },
      ],
    },
    overview: {
      title: "Accurate Quantities for Every Trade",
      paragraphs: [
        "A quantity takeoff is the foundation of every bid. We measure your plans sheet by sheet (counts, lengths, areas and volumes) and organize the results by trade, system and location so you can price them your way.",
        "Each takeoff comes with color-coded markups that show exactly what was counted, plus waste factors and net-to-gross conversions, so your estimators can check quantities in minutes instead of re-measuring.",
      ],
      audiences: ["Subcontractors", "General contractors", "Material suppliers", "In-house estimating teams"],
      deliverables: [
        "Quantity workbook in Excel",
        "Color-coded marked-up PDFs",
        "Waste factors and net-to-gross conversions",
        "Quantities by floor, area or phase",
        "Scope notes and questions on unclear items",
      ],
      software: ["Bluebeam Revu", "PlanSwift", "On-Screen Takeoff", "Microsoft Excel"],
    },
    included: {
      title: "What's Included in Every Takeoff",
      intro: "Quantities you can price right away, organized the way your crews build.",
      items: [
        {
          icon: Ruler,
          title: "Measured quantities",
          text: "Areas, linear footage, volumes and item counts for each scope, broken out by floor, area or phase.",
          metaLabel: "By level & area",
          metaValue: "Net & gross",
        },
        {
          icon: Layers,
          title: "Color-coded markups",
          text: "Every measurement drawn on the plans in a consistent color per item, so reviewers see exactly what was counted.",
          metaLabel: "Vector PDF",
          metaValue: "Bluebeam-ready",
        },
        {
          icon: Percent,
          title: "Waste & lap factors",
          text: "Waste, overlap and cut-off allowances applied per material and shown in their own column so you can change them.",
          metaLabel: "Material-specific",
          metaValue: "Editable",
        },
        {
          icon: Boxes,
          title: "Order-ready material lists",
          text: "Quantities converted into purchasable units such as sheets, bags, sticks, rolls and cartons for supplier quotes.",
          metaLabel: "Bill of materials",
          metaValue: "Supplier-ready",
        },
        {
          icon: ClipboardList,
          title: "Scope notes & exclusions",
          text: "A written summary of what was included, what was left out and any assumptions made where drawings were unclear.",
          metaLabel: "Scope sheet",
          metaValue: "RFI list",
        },
        {
          icon: FileSpreadsheet,
          title: "Editable Excel workbook",
          text: "An unlocked workbook with formulas intact, ready to drop into your pricing templates or estimating software.",
          metaLabel: "Live formulas",
          metaValue: ".xlsx",
        },
      ],
    },
    stages: {
      eyebrow: "Takeoff packages",
      title: "Takeoff Packages for Every Bid",
      intro: "From a single trade to a full multi-trade quantity survey.",
      items: [
        {
          badge: "Package 01",
          title: "Single-Trade Takeoff",
          subtitle: "One scope, fully detailed",
          text: "For subcontractors bidding one trade, such as drywall, concrete, painting or electrical.",
          metricLabel: "Typical turnaround",
          metricValue: "24–48 hrs",
          progress: 30,
        },
        {
          badge: "Package 02",
          title: "Multi-Trade Takeoff",
          subtitle: "Related scopes together",
          text: "Coordinated quantities for trades that interact, such as framing, drywall, insulation and ceilings.",
          metricLabel: "Typical turnaround",
          metricValue: "48–72 hrs",
          progress: 60,
          featured: "Most requested",
        },
        {
          badge: "Package 03",
          title: "Full Quantity Survey",
          subtitle: "All CSI divisions",
          text: "Complete quantities for the whole building, used by GCs to check sub coverage and build a master budget.",
          metricLabel: "Typical turnaround",
          metricValue: "3–5 days",
          progress: 85,
        },
        {
          badge: "Package 04",
          title: "Revisions & Addenda",
          subtitle: "After the first takeoff",
          text: "Updated quantities when drawings change, with revised items clouded so you can see the difference.",
          metricLabel: "Typical turnaround",
          metricValue: "24 hrs",
          progress: 100,
        },
      ],
    },
    process: {
      title: "Our 5-Step Takeoff Process",
      intro: "Built to give you quantities you can trust without re-checking every sheet.",
      steps: [
        { title: "Send your plans", text: "Upload the drawing set and tell us which trades and scope items you need measured." },
        { title: "Scope confirmation", text: "We confirm what's in and out of scope and list any missing information before measuring." },
        { title: "Measure & mark up", text: "Estimators measure every item in Bluebeam or PlanSwift, color-coding each one on the drawings." },
        { title: "Apply waste & convert units", text: "Waste factors are applied and quantities converted into the units your suppliers sell." },
        { title: "QA check & delivery", text: "A second estimator spot-checks quantities before you receive the workbook and marked-up PDFs." },
      ],
      zones: [
        { label: "Area A: Level 1 ceilings", detail: "6,820 SF · 2×2 ACT" },
        { label: "Area B: Partition type P3", detail: "1,140 LF · 10' high" },
        { label: "Area C: Corridor flooring", detail: "2,960 SF LVT · 1,320 LF base" },
      ],
    },
    sheet: {
      title: "What a Finished Takeoff Looks Like",
      intro: "Measured quantities, waste and order units side by side, so you can price or order straight from the sheet.",
      data: {
        title: "Medical office fit-out · drywall, ceilings & flooring",
        meta: "Quantities only",
        sheets: ["Summary", "09 21 Drywall", "09 51 Ceilings", "09 65 Flooring"],
        note: "Pricing can be added with a full cost estimate",
        columns: [
          { label: "CSI code" },
          { label: "Item" },
          { label: "Measured", numeric: true },
          { label: "Unit" },
          { label: "Waste", numeric: true },
          { label: "Order qty", numeric: true },
          { label: "Order unit" },
        ],
        groups: [
          {
            name: "Division 09 — Drywall & framing",
            rows: [
              ["09 22 16", '3-5/8" 20 GA studs @ 16" O.C., 10\' walls', "1,140", "LF", "5%", "898", "studs (10')"],
              ["09 29 00", '5/8" Type X gypsum board, both sides', "22,800", "SF", "10%", "784", "sheets (4×8)"],
              ["09 29 00", "All-purpose joint compound", "22,800", "SF", "—", "46", "boxes (4.5 gal)"],
            ],
          },
          {
            name: "Division 09 — Ceilings",
            rows: [
              ["09 51 13", "2×2 acoustical ceiling tile", "6,820", "SF", "5%", "112", "cartons (16 pcs)"],
              ["09 51 13", "Main runners, 12'", "6,820", "SF", "5%", "149", "pieces"],
            ],
          },
          {
            name: "Division 09 — Flooring",
            rows: [
              ["09 65 19", "Luxury vinyl plank, 6×48", "2,960", "SF", "8%", "89", "cartons (36 SF)"],
              ["09 65 13", '4" rubber wall base', "1,320", "LF", "5%", "24", "rolls (60')"],
            ],
          },
        ],
      },
    },
    advantages: {
      title: "Quantities You Don't Have to Re-Check",
      intro: "A takeoff is only useful if you trust it. Ours are built so you can verify any line quickly and move on to pricing.",
      points: [
        { title: "Traceable to the sheet", text: "Every line in the workbook references the drawing it came from." },
        { title: "Organized your way", text: "Group quantities by floor, area, phase or system to match how you price and schedule." },
        { title: "Supplier-ready units", text: "Order quantities come in the units your suppliers sell, so material quotes come back faster." },
        { title: "Revisions handled", text: "Drawing changes before bid day are measured and highlighted on the updated sheets." },
      ],
      testimonialIndex: 0,
    },
    faqs: [
      {
        question: "What's the difference between a quantity takeoff and a cost estimate?",
        answer:
          "A takeoff gives you measured quantities and materials. A cost estimate adds labor, material and equipment pricing, overhead and profit to produce a complete bid price. Many subcontractors order takeoffs and apply their own pricing.",
      },
      {
        question: "Which software do you use for takeoffs?",
        answer:
          "We measure in Bluebeam Revu and PlanSwift and deliver in Excel with marked-up PDFs. If you need a specific format, tell us when you request a quote.",
      },
      {
        question: "Can you match my company's takeoff template?",
        answer:
          "Yes. Share a past takeoff or your template and we'll organize items, units and groupings the same way.",
      },
      {
        question: "How are waste factors handled?",
        answer:
          "We apply standard waste factors per material and show them in a separate column. Change any factor and the order quantities update automatically.",
      },
      {
        question: "Do you provide takeoffs for a single trade?",
        answer:
          "Yes. Single-trade takeoffs are the most common request from subcontractors, and they usually have the fastest turnaround.",
      },
    ],
    cta: {
      title: "Get Accurate Quantities for Your Next Bid",
      text: "Upload your plans and tell us the trades you need. You'll get a fixed quote and delivery date before we start.",
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: "design-build",
    name: "Design-Build Estimating",
    shortName: "Design-Build",
    summary:
      "Early budgets and value-engineering input while the design is still moving, so the project lands inside its target cost.",
    highlights: ["Concept and schematic budgets", "Priced value-engineering options", "GMP estimate support"],
    icon: DraftingCompass,
    seo: {
      title: "Design-Build Estimating & Preconstruction Budgets",
      description:
        "Conceptual budgets, priced design options and GMP estimates for design-build teams. Keep your project on budget from concept through construction documents.",
    },
    hero: {
      tag: "Preconstruction budgeting",
      title: "Design-Build Estimating Services",
      intro:
        "Budgets that keep pace with the design. We price concepts, compare system options and track cost as drawings develop, so your team hits its target without last-minute redesign.",
      highlights: [
        { icon: Target, title: "Target-value design", text: "Cost checks at each milestone" },
        { icon: Scale, title: "Priced options", text: "Systems compared before you choose" },
        { icon: TrendingUp, title: "GMP support", text: "Budgets that roll into your GMP" },
      ],
    },
    overview: {
      title: "Cost Guidance From Concept to GMP",
      paragraphs: [
        "In design-build, the budget has to move with the design. We estimate at every milestone (concept, schematic design, design development and construction documents) so owners and project teams can make decisions while changes are still inexpensive.",
        "We price system and material options side by side, track cost against the target budget, and reconcile each estimate with the last one so everyone can see what changed and why. The final estimate supports your guaranteed maximum price (GMP) proposal.",
      ],
      audiences: ["Design-build contractors", "Developers & owners", "Architects", "Construction managers"],
      deliverables: [
        "Milestone estimates from concept to CDs",
        "Target-value budget tracking",
        "Priced alternates and value engineering options",
        "Estimate-to-estimate reconciliation",
        "GMP support documents",
      ],
      software: ["Microsoft Excel", "Bluebeam Revu", "Autodesk Revit (model quantities)", "RSMeans data"],
    },
    included: {
      title: "What's Included in Design-Build Estimating",
      intro: "Cost information your designers and owner can act on while choices are still open.",
      items: [
        {
          icon: Lightbulb,
          title: "Conceptual budgets",
          text: "Square-foot and assembly-based budgets from early sketches, programs or comparable projects.",
          metaLabel: "Program-based",
          metaValue: "Early stage",
        },
        {
          icon: Scale,
          title: "Systems comparisons",
          text: "Structure, envelope and MEP options priced side by side, with notes on first cost and long-term cost.",
          metaLabel: "Option matrix",
          metaValue: "Priced alternates",
        },
        {
          icon: Target,
          title: "Target-value tracking",
          text: "A running budget compared against the owner's target at every design milestone.",
          metaLabel: "Milestone reports",
          metaValue: "Variance shown",
        },
        {
          icon: PiggyBank,
          title: "Value engineering",
          text: "Practical cost-saving ideas, each priced with its effect on schedule and design intent.",
          metaLabel: "VE log",
          metaValue: "Savings itemized",
        },
        {
          icon: ShieldCheck,
          title: "Risk & contingency planning",
          text: "Design, escalation and market contingencies sized to how complete the drawings are.",
          metaLabel: "Risk register",
          metaValue: "Stage-based",
        },
        {
          icon: FileCheck2,
          title: "GMP estimate",
          text: "A detailed estimate at the GMP stage, with clarifications and allowances clearly listed.",
          metaLabel: "GMP-ready",
          metaValue: "Clarifications list",
        },
      ],
    },
    stages: {
      eyebrow: "Design milestones",
      title: "Cost Checks at Every Design Milestone",
      intro: "We re-price the project as it moves from concept to construction documents.",
      items: [
        {
          badge: "Milestone 01",
          title: "Concept",
          subtitle: "Program & massing",
          text: "Budget ranges from the program, site and building type to confirm the project is feasible.",
          metricLabel: "Typical accuracy",
          metricValue: "±20–30%",
          progress: 25,
        },
        {
          badge: "Milestone 02",
          title: "Schematic Design",
          subtitle: "System choices",
          text: "Assembly-level pricing to compare structural, envelope and MEP options before they're locked in.",
          metricLabel: "Typical accuracy",
          metricValue: "±15%",
          progress: 50,
        },
        {
          badge: "Milestone 03",
          title: "Design Development",
          subtitle: "Coordinated drawings",
          text: "Detailed quantities for major systems, with value-engineering options before documents are finalized.",
          metricLabel: "Typical accuracy",
          metricValue: "±10%",
          progress: 75,
          featured: "Key checkpoint",
        },
        {
          badge: "Milestone 04",
          title: "GMP / Final Documents",
          subtitle: "Final pricing",
          text: "A full estimate to support the guaranteed maximum price and subcontractor buyout.",
          metricLabel: "Typical accuracy",
          metricValue: "±5%",
          progress: 100,
        },
      ],
    },
    process: {
      title: "Our 5-Step Design-Build Process",
      intro: "We join your team early and stay with the budget as the design develops.",
      steps: [
        { title: "Kickoff & target budget", text: "We review the program, site and owner budget, then agree on milestones for cost checks." },
        { title: "Concept estimate", text: "An early budget sets the baseline and shows where the money goes, system by system." },
        { title: "Option pricing", text: "Competing systems and materials are priced side by side, so decisions are made with real numbers." },
        { title: "Milestone updates", text: "At each design milestone we re-price the drawings and report the variance against the target." },
        { title: "GMP estimate", text: "A detailed final estimate with allowances and clarifications supports your GMP and buyout." },
      ],
      zones: [
        { label: "Option A: Steel frame", detail: "$38.40 / SF structure" },
        { label: "Option B: Wood podium", detail: "$29.10 / SF structure" },
        { label: "Site & utilities", detail: "Allowance $412k" },
      ],
    },
    sheet: {
      title: "Budget Reports Your Whole Team Can Read",
      intro: "Organized by building system, with cost per square foot and share of total, so design choices are easy to compare.",
      data: {
        title: "4-story mixed-use building · schematic budget",
        meta: "62,000 SF",
        sheets: ["Summary", "Option A: steel", "Option B: wood", "VE log"],
        note: "Uniformat II system breakdown",
        columns: [
          { label: "Code" },
          { label: "System" },
          { label: "Budget", numeric: true },
          { label: "$ / SF", numeric: true },
          { label: "% of total", numeric: true },
        ],
        groups: [
          {
            name: "Shell",
            rows: [
              ["A10", "Foundations", "$1,054,000", "$17.00", "8.9%"],
              ["B10", "Superstructure", "$2,604,000", "$42.00", "22.1%"],
              ["B20", "Exterior enclosure", "$2,170,000", "$35.00", "18.4%"],
              ["B30", "Roofing", "$372,000", "$6.00", "3.2%"],
            ],
          },
          {
            name: "Interiors & services",
            rows: [
              ["C10", "Interior construction", "$1,736,000", "$28.00", "14.7%"],
              ["D20", "Plumbing", "$930,000", "$15.00", "7.9%"],
              ["D30", "HVAC", "$1,550,000", "$25.00", "13.2%"],
              ["D50", "Electrical", "$1,364,000", "$22.00", "11.6%"],
            ],
          },
        ],
        summary: [
          { label: "Building subtotal ($190.00 / SF)", value: "$11,780,000" },
          { label: "Design contingency (7%)", value: "$824,600" },
          { label: "Escalation to construction midpoint (4%)", value: "$471,200" },
        ],
        total: { label: "Target budget", value: "$13,075,800" },
      },
    },
    advantages: {
      title: "Budgets That Keep the Design on Track",
      intro: "The cheapest time to fix a cost problem is before it's drawn. Regular cost checks keep everyone aligned with the owner's budget.",
      points: [
        { title: "Early warnings", text: "Overruns are flagged at each milestone, while they're still cheap to fix." },
        { title: "Decisions with numbers", text: "Owners and designers see priced options instead of opinions." },
        { title: "Smooth hand-off to buyout", text: "The GMP estimate is organized to compare directly against subcontractor bids." },
        { title: "Independent pricing", text: "We aren't tied to any supplier or subcontractor, so the numbers stay objective." },
      ],
      testimonialIndex: 1,
    },
    faqs: [
      {
        question: "When should we bring in a design-build estimator?",
        answer:
          "As early as possible, ideally at concept or programming. The biggest cost decisions are made early, and pricing them then avoids redesign later.",
      },
      {
        question: "Can you work alongside our architect and engineers?",
        answer:
          "Yes. We review drawings at agreed milestones, join coordination calls when needed and deliver reports the whole team can use.",
      },
      {
        question: "Do you help set the GMP?",
        answer:
          "We prepare a detailed estimate at the GMP stage, including allowances, contingencies and clarifications, which your team uses to set and negotiate the GMP.",
      },
      {
        question: "How do you price options that aren't fully designed?",
        answer:
          "We use assembly-level pricing, comparable projects and current market data, and we state the assumptions behind each option so they can be revisited as the design firms up.",
      },
      {
        question: "How is design-build estimating priced?",
        answer:
          "It's usually priced per milestone, since we re-estimate as the design develops. You'll receive a fixed quote for the agreed milestones up front.",
      },
    ],
    cta: {
      title: "Keep Your Design-Build Project on Budget",
      text: "Share your program or early drawings and we'll propose a milestone budget plan with fixed pricing.",
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: "drafting",
    name: "Drafting Services",
    shortName: "Drafting",
    summary:
      "AutoCAD, Revit and BIM drafting, as-built drawings, redline updates and permit sets prepared to your office standards.",
    highlights: ["AutoCAD, Revit and BIM modeling", "PDF and scan to CAD conversion", "As-built, redline and permit sets"],
    icon: PencilRuler,
    seo: {
      title: "Construction Drafting, CAD, Revit & BIM Services",
      description:
        "AutoCAD and Revit drafting, BIM modeling, PDF-to-CAD conversion, as-built drawings and permit sets for contractors, architects and developers.",
    },
    hero: {
      tag: "CAD, Revit & BIM drafting",
      title: "Drafting Services for Construction",
      intro:
        "Clean, accurate drawings and models when you need them: AutoCAD and Revit drafting, BIM models, CAD conversions, as-builts, redline updates and permit-ready sets prepared to your layer, title-block and sheet standards.",
      highlights: [
        { icon: PencilRuler, title: "AutoCAD, Revit & BIM", text: "Native DWG and RVT files" },
        { icon: Stamp, title: "Permit-ready sets", text: "Formatted for plan review" },
        { icon: RefreshCw, title: "Fast redlines", text: "Markups turned into clean sheets" },
      ],
    },
    overview: {
      title: "Drawings and BIM Models Prepared to Your Standards",
      paragraphs: [
        "Our drafting team prepares 2D drawings in AutoCAD and 3D models in Autodesk Revit for contractors, architects, engineers and developers. We convert PDFs and scans to CAD, turn field markups into clean as-builts, and assemble permit sets that are ready for plan review.",
        "For BIM projects we build Revit models at the level of development your project needs, for clash coordination, quantity extraction, visualization or facility management, and deliver native files your team can keep working in.",
      ],
      audiences: ["Architects & engineers", "General contractors", "Developers & owners", "Facility managers"],
      deliverables: [
        "Native DWG and RVT files",
        "PDF sheets of every drawing",
        "Revit / BIM models (LOD 100–400)",
        "As-built and redline-updated sets",
        "Drawing list and revision log",
      ],
      software: ["AutoCAD", "Autodesk Revit", "Navisworks", "Autodesk Construction Cloud", "Bluebeam Revu"],
    },
    included: {
      title: "What's Included in Our Drafting Services",
      intro: "Drawings that are easy to read, easy to edit and ready for the next step.",
      items: [
        {
          icon: FileText,
          title: "PDF & paper to CAD",
          text: "Scanned or PDF drawings redrawn as layered, dimensioned CAD files you can edit.",
          metaLabel: "DWG / DXF",
          metaValue: "Layered",
        },
        {
          icon: Building2,
          title: "As-built drawings",
          text: "Field measurements and markups turned into accurate as-built plans, elevations and sections.",
          metaLabel: "Field to CAD",
          metaValue: "Close-out ready",
        },
        {
          icon: PencilRuler,
          title: "Redline updates",
          text: "Hand or PDF markups applied to the drawing set, with revision clouds and a revision log.",
          metaLabel: "Revision control",
          metaValue: "Clouded changes",
        },
        {
          icon: Stamp,
          title: "Permit drawing sets",
          text: "Plans, elevations, sections and details assembled to meet your jurisdiction's submission requirements.",
          metaLabel: "Code notes",
          metaValue: "Submission-ready",
        },
        {
          icon: Cuboid,
          title: "Revit & BIM models",
          text: "Revit models built from 2D drawings or point clouds for clash coordination, visualization, quantity extraction and as-built records.",
          metaLabel: "Revit RVT",
          metaValue: "Coordination-ready",
        },
        {
          icon: Grid3x3,
          title: "Your CAD standards",
          text: "Your layers, text styles, title blocks and sheet numbering followed from the first sheet to the last.",
          metaLabel: "Template-matched",
          metaValue: "Consistent",
        },
      ],
    },
    stages: {
      eyebrow: "Drawing types",
      title: "Drafting for Every Stage of a Project",
      intro: "From existing-conditions drawings to close-out documents.",
      items: [
        {
          badge: "Type 01",
          title: "Existing Conditions",
          subtitle: "Before design",
          text: "Measured plans of existing buildings, so renovations and additions start from accurate base drawings.",
          metricLabel: "Deliverable",
          metricValue: "Base plans",
        },
        {
          badge: "Type 02",
          title: "Design & Permit Sets",
          subtitle: "Before construction",
          text: "Construction drawings and permit packages prepared from sketches, markups or design intent.",
          metricLabel: "Deliverable",
          metricValue: "Permit set",
          featured: "Most requested",
        },
        {
          badge: "Type 03",
          title: "Shop & Coordination",
          subtitle: "During construction",
          text: "Coordination drawings and layouts that help trades avoid clashes in the field.",
          metricLabel: "Deliverable",
          metricValue: "Coordination sheets",
        },
        {
          badge: "Type 04",
          title: "As-Builts & Close-Out",
          subtitle: "After construction",
          text: "Final drawings showing what was actually built, for owners, facility teams and future work.",
          metricLabel: "Deliverable",
          metricValue: "As-built set",
        },
      ],
    },
    process: {
      title: "Our 5-Step Drafting Process",
      intro: "Clear communication and quality checks at every stage.",
      steps: [
        { title: "Send source files", text: "Share PDFs, scans, sketches, photos, field notes or existing CAD files, plus your standards." },
        { title: "Scope & standards check", text: "We confirm sheet count, scales, layers, title block and deadline before drafting begins." },
        { title: "Drafting", text: "Drawings are prepared in AutoCAD or Revit, following your standards from the first sheet." },
        { title: "Internal QA", text: "A senior drafter checks dimensions, annotations and sheet coordination before anything is sent." },
        { title: "Review & revisions", text: "You review the set and send comments; we revise until the drawings are right." },
      ],
      zones: [
        { label: "Level 1 floor plan", detail: '1/4" = 1\'-0"' },
        { label: "Wall section W-3", detail: '1" = 1\'-0"' },
        { label: "Reflected ceiling plan", detail: "Revision 2 clouded" },
      ],
    },
    sheet: {
      title: "Organized Drawing Sets, Sheet by Sheet",
      intro: "Every project includes a drawing list, so you always know what's issued, what's revised and what's still in progress.",
      data: {
        title: "Retail tenant improvement · permit set",
        meta: "14 sheets",
        sheets: ["Drawing list", "Revision log", "CAD standards"],
        note: "Native files plus PDFs for every sheet",
        columns: [{ label: "Sheet" }, { label: "Title" }, { label: "Scale" }, { label: "Format" }, { label: "Status" }],
        groups: [
          {
            name: "Architectural",
            rows: [
              ["A-001", "Cover sheet, code summary & sheet index", "NTS", "DWG + PDF", "Issued"],
              ["A-101", "Demolition plan", '1/4" = 1\'-0"', "DWG + PDF", "Issued"],
              ["A-102", "Floor plan", '1/4" = 1\'-0"', "DWG + PDF", "Revision 2"],
              ["A-201", "Reflected ceiling plan", '1/4" = 1\'-0"', "DWG + PDF", "Revision 1"],
              ["A-501", "Wall sections & details", "Varies", "DWG + PDF", "Issued"],
            ],
          },
          {
            name: "Structural & MEP backgrounds",
            rows: [
              ["S-101", "Foundation & framing plan", '1/8" = 1\'-0"', "DWG", "Background"],
              ["E-101", "Power & lighting background", '1/4" = 1\'-0"', "DWG", "Background"],
            ],
          },
        ],
      },
    },
    advantages: {
      title: "Drawings You Can Build From",
      intro: "Good drafting saves time for everyone downstream, from plan reviewers to the crew in the field.",
      points: [
        { title: "Checked dimensions", text: "Dimensions are verified against source documents and field data before delivery." },
        { title: "Fully editable files", text: "You receive native, layered CAD or Revit files, not flattened PDFs." },
        { title: "Standards followed", text: "Your title blocks, layers and naming conventions are used throughout." },
        { title: "Quick revisions", text: "Comment rounds are handled fast so permit submissions stay on schedule." },
      ],
      testimonialIndex: 2,
    },
    faqs: [
      {
        question: "What file formats do you deliver?",
        answer:
          "We deliver native AutoCAD (DWG/DXF) or Revit (RVT) files plus PDFs of every sheet. Other formats are available on request.",
      },
      {
        question: "Do you provide Revit and BIM modeling?",
        answer:
          "Yes. We build architectural, structural and MEP Revit models from 2D drawings, sketches or scans, at the level of development (LOD 100–400) your project needs. Models can be used for clash coordination in Navisworks, quantity extraction, renderings or as-built records, and are delivered as native RVT files plus IFC on request.",
      },
      {
        question: "Can you convert scanned or hand-drawn plans to CAD?",
        answer:
          "Yes. We redraw scans, PDFs and hand sketches as clean, layered CAD drawings, checking dimensions as we go and flagging anything that's unclear.",
      },
      {
        question: "Do your drawings get stamped?",
        answer:
          "We prepare drawings for submission, but sealing is done by the licensed architect or engineer of record for your project. We work directly with them when needed.",
      },
      {
        question: "Can you follow our CAD standards and title block?",
        answer:
          "Yes. Send your template or a sample set and we'll match layers, text styles, dimension styles and sheet numbering.",
      },
      {
        question: "How long does a drafting project take?",
        answer:
          "Small redline updates can often be turned around in a day or two. Full permit sets or as-built packages depend on the sheet count; we confirm the schedule before we start.",
      },
    ],
    cta: {
      title: "Need Drawings Drafted or Updated?",
      text: "Send your files and requirements, and we'll reply with a fixed quote and schedule.",
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: "structural-detailing-shop-drawings",
    name: "Structural Detailing & Shop Drawings",
    shortName: "Structural Detailing & Shop Drawings",
    summary:
      "Rebar and steel shop drawings, connection details and fabrication-ready schedules your shop can build from.",
    highlights: ["Rebar placing drawings & bar schedules", "Steel shop & erection drawings", "Connection details for review"],
    icon: Waypoints,
    seo: {
      title: "Structural Detailing & Shop Drawing Services",
      description:
        "Rebar detailing, structural steel shop drawings, connection details and bar bending schedules prepared for fabrication and field installation.",
    },
    hero: {
      tag: "Fabrication-ready detailing",
      title: "Structural Detailing & Shop Drawing Services",
      intro:
        "Rebar and steel shop drawings your fabricator can cut from and your crew can place from, with schedules, connection details and erection drawings coordinated to the contract documents.",
      highlights: [
        { icon: Waypoints, title: "Rebar & steel", text: "Placing and erection drawings" },
        { icon: ListChecks, title: "Bar schedules", text: "Bending and cut lists" },
        { icon: FileCheck2, title: "Submittal-ready", text: "Formatted for EOR review" },
      ],
    },
    overview: {
      title: "Shop Drawings Ready for the Fabrication Floor",
      paragraphs: [
        "We prepare reinforcing steel and structural steel shop drawings that fabricators can cut from and crews can install from: placing and erection drawings, assembly and piece drawings, bar bending schedules and connection details, all coordinated with the contract documents.",
        "Every set is checked by a senior detailer before it goes out for approval, and engineer-of-record comments are turned around quickly so fabrication and deliveries stay on schedule.",
      ],
      audiences: ["Rebar fabricators", "Steel fabricators", "Erectors & installers", "General contractors"],
      deliverables: [
        "Rebar placing and steel erection drawings",
        "Assembly and piece drawings",
        "Bar bending schedules and bills of materials",
        "NC/DXF files for fabrication on request",
        "Approval and revision tracking",
      ],
      software: ["Tekla Structures", "AutoCAD", "Autodesk Revit", "RebarCAD", "Bluebeam Revu"],
    },
    included: {
      title: "What's Included in Our Detailing Services",
      intro: "Drawings and schedules prepared to the project specifications and standard detailing practice.",
      items: [
        {
          icon: Waypoints,
          title: "Rebar placing drawings",
          text: "Plans, elevations and sections showing bar marks, sizes, spacing, laps and placement for every element.",
          metaLabel: "Placing drawings",
          metaValue: "Bar marks",
        },
        {
          icon: ListChecks,
          title: "Bar bending schedules",
          text: "Cut lengths, bend shapes and quantities by bar mark, organized for fabrication and delivery.",
          metaLabel: "Bending schedules",
          metaValue: "By release",
        },
        {
          icon: Hammer,
          title: "Steel shop drawings",
          text: "Fabrication drawings for beams, columns, braces and miscellaneous steel, with piece marks and dimensions.",
          metaLabel: "Shop drawings",
          metaValue: "Piece marks",
        },
        {
          icon: Wrench,
          title: "Connection details",
          text: "Bolted and welded connections drawn clearly for fabrication and engineer review.",
          metaLabel: "Connections",
          metaValue: "Weld & bolt",
        },
        {
          icon: Building2,
          title: "Erection drawings",
          text: "Anchor bolt plans, framing plans and erection sequences for the field crew.",
          metaLabel: "Erection set",
          metaValue: "Anchor bolts",
        },
        {
          icon: FileSpreadsheet,
          title: "Material lists & weights",
          text: "Bills of materials with weights by member or bar mark, for ordering and progress billing.",
          metaLabel: "Bill of materials",
          metaValue: "Weights by mark",
        },
      ],
    },
    stages: {
      eyebrow: "Detailing scopes",
      title: "Detailing for Every Structural Package",
      intro: "From foundations to the roof, and from rebar to miscellaneous metals.",
      items: [
        {
          badge: "Scope 01",
          title: "Rebar Detailing",
          subtitle: "Cast-in-place concrete",
          text: "Footings, walls, slabs, columns, beams and stairs detailed for placement and fabrication.",
          metricLabel: "Deliverable",
          metricValue: "Placing + BBS",
        },
        {
          badge: "Scope 02",
          title: "Structural Steel",
          subtitle: "Framing & connections",
          text: "Beams, columns, bracing and connections detailed for fabrication and erection.",
          metricLabel: "Deliverable",
          metricValue: "Shop + erection",
          featured: "Most requested",
        },
        {
          badge: "Scope 03",
          title: "Miscellaneous Metals",
          subtitle: "Stairs, rails & embeds",
          text: "Stairs, railings, lintels, embeds and support steel detailed to fit the architectural drawings.",
          metricLabel: "Deliverable",
          metricValue: "Shop drawings",
        },
        {
          badge: "Scope 04",
          title: "Precast & Tilt-Up",
          subtitle: "Panel detailing",
          text: "Panel layouts, reinforcement, embeds and lifting inserts for precast and tilt-up elements.",
          metricLabel: "Deliverable",
          metricValue: "Panel drawings",
        },
      ],
    },
    process: {
      title: "Our 5-Step Detailing Process",
      intro: "Coordinated with your engineer of record and fabricator from start to finish.",
      steps: [
        { title: "Contract documents", text: "Send structural and architectural drawings, specifications and any answered RFIs." },
        { title: "Model & coordinate", text: "We build the detailing model and raise conflicts or missing information as RFIs." },
        { title: "Detail & schedule", text: "Placing drawings, shop drawings and schedules are produced with consistent marks and callouts." },
        { title: "Independent check", text: "A separate detailer checks every sheet against the contract documents before submittal." },
        { title: "Submittal & release", text: "Drawings go out for approval; we incorporate comments and issue fabrication releases." },
      ],
      zones: [
        { label: "Footing F-2: 4 #6 E.W.", detail: "Mark 6F2 · 8'-6\"" },
        { label: "Wall W-1: #5 @ 12\" O.C.", detail: "Mark 5W1 · 10'-0\"" },
        { label: "Grade beam GB-3", detail: "#4 stirrups @ 8\" O.C." },
      ],
    },
    sheet: {
      title: "Bar Schedules Ready for the Shop",
      intro: "Every release comes with a bar list your fabricator can load directly, with weights for ordering and billing.",
      data: {
        title: "Bar bending schedule · foundation release 1",
        meta: "Grade 60 · ASTM A615",
        sheets: ["Bar list", "Placing drawings", "Release log"],
        note: "Weights calculated from standard bar weights",
        columns: [
          { label: "Mark" },
          { label: "Size" },
          { label: "Qty", numeric: true },
          { label: "Length", numeric: true },
          { label: "Shape" },
          { label: "Weight (lb)", numeric: true },
        ],
        groups: [
          {
            name: "Footings",
            rows: [
              ["6F2", "#6", "96", "8'-6\"", "Straight", "1,226"],
              ["5F4", "#5", "64", "5'-0\"", "Straight", "334"],
            ],
          },
          {
            name: "Walls & grade beams",
            rows: [
              ["5W1", "#5", "210", "10'-0\"", "Straight", "2,190"],
              ["4GB3", "#4", "180", "6'-8\"", "Stirrup (T1)", "802"],
              ["5D1", "#5", "48", "3'-0\"", "90° hook (T2)", "150"],
            ],
          },
        ],
        total: { label: "Release 1 total weight", value: "4,702 lb" },
      },
    },
    advantages: {
      title: "Shop Drawings That Get Approved",
      intro: "Every review cycle costs schedule. Our detailers aim to get it right on the first submittal.",
      points: [
        { title: "Fewer review cycles", text: "Drawings are checked against the contract documents before they reach the engineer." },
        { title: "RFIs raised early", text: "Conflicts and missing details come up before fabrication, not after." },
        { title: "Field-friendly sheets", text: "Layouts are arranged so crews find what they need quickly on site." },
        { title: "Fabrication-ready data", text: "Schedules and material lists export cleanly for your shop's software." },
      ],
      testimonialIndex: 0,
    },
    faqs: [
      {
        question: "Which detailing standards do you follow?",
        answer:
          "We follow the project specifications and standard industry practice for concrete reinforcing and structural steel detailing. If your project or fabricator has specific requirements, we'll match them.",
      },
      {
        question: "Do you work with our engineer of record?",
        answer: "Yes. We submit drawings for EOR review, respond to comments and track RFIs through to approval.",
      },
      {
        question: "Can you start detailing from incomplete drawings?",
        answer:
          "We can start with the information available and raise RFIs for anything missing. Areas waiting on answers are clearly marked as on hold.",
      },
      {
        question: "What files do you deliver?",
        answer:
          "Shop and placing drawings as PDF and DWG, plus bar lists and material lists in Excel or the format your fabrication software uses. Tell us your shop's preferred format when you request a quote.",
      },
      {
        question: "How are detailing projects priced?",
        answer:
          "Pricing depends on tonnage or bar count, the number of elements and the review schedule. You'll receive a fixed quote after we review the drawings.",
      },
    ],
    cta: {
      title: "Need Shop Drawings for Your Next Package?",
      text: "Send the structural drawings and your schedule, and we'll reply with a fixed quote and release plan.",
    },
  },
];

export const serviceHref = (slug: string) => `/services/${slug}/`;
export const getService = (slug: string) => services.find((s) => s.slug === slug);
