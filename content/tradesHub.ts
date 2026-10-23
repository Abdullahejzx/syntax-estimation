import { ClipboardCheck, PencilRuler, ScanSearch, Upload } from "lucide-react";
import type { AccordionItem } from "@/components/ui/Accordion";

/** Copy for the /trades hub page. Individual trades live in content/trades/. */
export const tradesHub = {
  seo: {
    title: "Trade Estimating & Takeoff Services",
    description:
      "Trade-specific takeoffs and estimates for concrete, masonry, metals, drywall, insulation, painting, flooring, electrical and plumbing, plus full-scope GC estimates.",
  },
  hero: {
    tag: "Trade takeoffs",
    title: "Trade Estimating & Takeoff Services",
    intro:
      "Quantities and estimates organized the way each trade prices its work, for specialty subcontractors, general contractors and the suppliers who serve them.",
    // TODO: confirm turnaround claim
    badges: ["Single-trade or full scope", "24–72 hr typical turnaround", "Editable Excel & marked-up PDFs"],
  },
  specialty: {
    title: "Specialty Trade Takeoffs",
    intro: "Pick your trade to see what's included, a sample takeoff and how we price it.",
  },
  clients: {
    title: "Full-Scope & Supplier Services",
    intro: "Estimates for the whole job, and bills of materials for the companies that supply it.",
  },
  steps: [
    { title: "Send your plans", text: "Upload drawings and specs, or share a plan-room link, and tell us your trade and bid date.", icon: Upload },
    { title: "Scope confirmation", text: "We confirm what's included and send a fixed quote and delivery date.", icon: ScanSearch },
    { title: "Measure & mark up", text: "Every item is measured and color-coded on the drawings, by trade and division.", icon: PencilRuler },
    { title: "Delivery", text: "You receive the Excel takeoff and marked-up PDFs, checked by a second estimator.", icon: ClipboardCheck },
  ],
  faqs: [
    {
      question: "Can I order a takeoff for just one trade?",
      answer:
        "Yes. Single-trade takeoffs are our most common request. You can also combine related trades, such as drywall, insulation and ceilings, in one package.",
    },
    {
      question: "Do you price the takeoff or just measure it?",
      answer:
        "Either. A takeoff gives you quantities to price yourself; a full estimate adds labor, material and equipment pricing for your project's location.",
    },
    {
      question: "My trade isn't listed. Can you still help?",
      answer:
        "Probably. We estimate every CSI division, including roofing, HVAC, fire protection and sitework. Send your plans and tell us the scope.",
    },
    {
      question: "Can you match how my company organizes takeoffs?",
      answer:
        "Yes. Send a past takeoff or template and we'll follow the same items, units and groupings.",
    },
  ] satisfies AccordionItem[],
  cta: {
    eyebrow: "Trade takeoffs",
    title: "Get Quantities for Your Trade",
    text: "Upload your plans and tell us your scope. You'll get a fixed quote and delivery date before any work starts.",
  },
};
