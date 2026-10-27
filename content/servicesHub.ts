import type { AccordionItem } from "@/components/ui/Accordion";
import type { ComparisonRow } from "@/components/sections/ComparisonTable";
import type { Stage } from "@/components/sections/StageCards";

/** Copy for the /services hub page. Individual services live in content/services.ts. */
export const servicesHub = {
  seo: {
    title: "Construction Estimating & Preconstruction Services",
    description:
      "Cost estimates, quantity takeoffs, design-build budgets, drafting and structural shop drawings for contractors in all 50 states. Fixed quotes, 24–72 hour turnaround.",
  },
  hero: {
    tag: "Preconstruction services",
    title: "Construction Estimating & Preconstruction Services",
    intro:
      "Estimates, takeoffs, drafting and detailing for general contractors, subcontractors and developers in all 50 states, from early budgets to bid-day numbers.",
    // TODO: confirm turnaround claim
    badges: ["24–72 hr typical turnaround", "Organized by CSI MasterFormat", "Pricing for your ZIP code"],
  },
  cards: {
    title: "Our Core Estimating Services",
    intro: "Trade-specific quantities and budgets, built to be checked and built to win bids.",
  },
  stages: {
    eyebrow: "Project lifecycle",
    title: "Estimating for Every Stage of the Construction Lifecycle",
    intro: "From early feasibility budgets through addenda and change orders.",
    // TODO: confirm accuracy ranges and turnaround
    items: [
      {
        badge: "Stage 01",
        title: "Feasibility / Conceptual",
        text: "Early budgets and square-foot models that help owners and lenders decide whether to move forward.",
        metricLabel: "Typical accuracy",
        metricValue: "±20–30%",
        progress: 25,
      },
      {
        badge: "Stage 02",
        title: "Design Development",
        text: "Reviews of 50–70% drawings with value-engineering options and trade package scope checks.",
        metricLabel: "Typical accuracy",
        metricValue: "±10–15%",
        progress: 55,
      },
      {
        badge: "Stage 03",
        title: "Bid / Tender",
        text: "Hard-dollar pricing from complete documents, with line items that make sub bid leveling straightforward.",
        metricLabel: "Typical accuracy",
        metricValue: "±5%",
        progress: 90,
        featured: "Most requested",
      },
      {
        badge: "Stage 04",
        title: "Change Orders & Revisions",
        text: "Addenda updates, change order pricing and schedule-of-values checks during construction.",
        metricLabel: "Typical turnaround",
        metricValue: "24–48 hrs",
        progress: 100,
      },
    ] satisfies Stage[],
  },
  audiences: {
    title: "Tailored to Your Role in the Build",
    intro: "We set up quantities and sheet layouts to match how each type of contractor prices and builds.",
  },
  comparison: {
    title: "In-House Estimating vs. Arvex Designs",
    intro: "How outsourcing compares with adding another full-time estimator to your payroll.",
    themLabel: "In-house estimator",
    usLabel: "Arvex Designs",
    // TODO: confirm comparison claims, especially turnaround and capacity
    rows: [
      {
        feature: "Cost",
        them: "A full-time salary, benefits and training, whether you're bidding or not.",
        us: "Pay per project, with a fixed quote before any work starts.",
      },
      {
        feature: "Turnaround",
        them: "Depends on everything else already on their desk.",
        us: "24–72 hours for most projects, with rush delivery available.",
      },
      {
        feature: "Software & cost data",
        them: "Annual licenses for takeoff software and cost databases.",
        us: "Included. There's nothing extra for you to buy.",
      },
      {
        feature: "Local pricing",
        them: "Strongest in the markets your company already knows.",
        us: "Pricing adjusted for project locations in all 50 states.",
      },
      {
        feature: "Capacity",
        them: "Limited by headcount, so busy weeks mean passing on bids.",
        us: "Scales with your bid volume, including several bids at once.",
      },
      {
        feature: "Revisions",
        them: "Addenda pull your estimator off other active bids.",
        us: "The same estimator updates the file, with changes highlighted.",
      },
    ] satisfies ComparisonRow[],
  },
  deliverables: {
    title: "Audit-Ready Deliverables with Every Project",
    intro: "Here's what arrives in your project package.",
    fileName: "Project_7421_Takeoff_Div03-09.xlsx",
    previewRows: [
      ["03 30 00", 'Slab on grade, 4,000 PSI, 4"', "1,240", "CY", "$198,400"],
      ["03 20 00", "#4 Grade 60 rebar", "18.6", "TON", "$42,780"],
      ["09 22 00", '3-5/8" 20 GA metal studs', "8,450", "LF", "$59,150"],
      ["09 29 00", '5/8" Type X gypsum board', "34,800", "SF", "$73,080"],
    ] as [string, string, string, string, string][],
    items: [
      {
        title: "Unlocked Excel workbook (.xlsx)",
        text: "Organized by CSI division, with live formulas and editable labor, material and equipment rates.",
      },
      {
        title: "Marked-up PDF drawings",
        text: "Color-coded by trade and division, with areas and lengths called out on every sheet.",
      },
      {
        title: "Material takeoff & bill of materials",
        text: "Order quantities with waste factors applied, in the units your suppliers sell.",
      },
      {
        title: "Bid summary",
        text: "A clean summary of totals, inclusions and exclusions you can drop into your proposal.",
      },
      {
        title: "Sub bid comparison sheet",
        text: "A standard layout for leveling subcontractor bids and spotting scope gaps or overlaps.",
      },
    ],
    // TODO: confirm the file formats you deliver
    formats: [".PDF (vector)", ".XLSX (unlocked)", ".DWG / .DXF", "PlanSwift", "Bluebeam markups"],
  },
  faqs: [
    {
      question: "How do I choose between a quantity takeoff and a full cost estimate?",
      answer:
        "A quantity takeoff gives you measured quantities (square feet, linear feet, counts, cubic yards) in Excel with marked-up drawings. A full cost estimate adds local labor rates, material and equipment pricing, overhead, profit and contingency to give you a complete bid price. If you already have your own pricing, a takeoff is usually enough.",
    },
    {
      question: "What plan and drawing formats do you accept?",
      answer:
        "PDFs (vector or scanned), CAD drawings (DWG, DXF), images and ZIP archives. You can also share a Dropbox, Google Drive or plan-room link instead of uploading files.",
    },
    {
      question: "How fast will I receive my estimate?",
      answer:
        "Most single-trade and standard commercial projects are delivered in 24 to 72 hours. If your bid is due sooner, ask about rush delivery when you request a quote.",
    },
    {
      question: "What happens if there are revisions or addenda before bid day?",
      answer:
        "Send the new drawings and we'll compare them with the original set, cloud the changes and send an updated workbook, usually within a day.",
    },
    {
      question: "Is our company and project data kept confidential?",
      answer:
        "Yes. Your plans and pricing are only seen by the people working on your project and are never shared with other bidders. We're happy to sign your NDA.",
    },
  ] satisfies AccordionItem[],
  cta: {
    eyebrow: "Talk to an estimator",
    title: "Not Sure Which Service You Need?",
    text: "Send us your drawings or call an estimator. We'll review your scope and recommend the right service, with a fixed quote.",
  },
};
