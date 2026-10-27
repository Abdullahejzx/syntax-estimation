import type { LucideIcon } from "lucide-react";
import { Building2, Hammer, Landmark, Truck } from "lucide-react";
import type { AccordionItem } from "@/components/ui/Accordion";

/** Copy and options for /get-a-quote. The services and trades lists come from their data files. */
export const quotePage = {
  seo: {
    title: "Get a Free Construction Estimate Quote",
    description:
      "Upload your plans for a free, fixed-price quote on construction cost estimating, quantity takeoffs, drafting or detailing. Contact Arvex Designs in Newark, NJ.",
  },
  hero: {
    tag: "Estimating desk open",
    title: "Get Your Free Estimate Quote",
    intro:
      "Upload your plans in four quick steps and we'll reply with a fixed price and delivery date for your takeoff or estimate.",
    // TODO: confirm these promises
    badges: ["Free, no-obligation quote", "NDA on request", "24–72 hr typical turnaround"],
  },
};

export const quoteRoles: { value: string; title: string; text: string; icon: LucideIcon }[] = [
  { value: "General Contractor", title: "General Contractor", text: "Prime bidder / CM", icon: Building2 },
  { value: "Subcontractor", title: "Subcontractor", text: "Specific trade scope", icon: Hammer },
  { value: "Supplier / Vendor", title: "Supplier / Vendor", text: "Material takeoffs", icon: Truck },
  { value: "Developer / Owner", title: "Developer / Owner", text: "Budgets & feasibility", icon: Landmark },
];

export const projectTypes = [
  "Commercial (retail / office)",
  "Residential (custom / single-family)",
  "Multi-family / mixed use",
  "Industrial / warehouse",
  "Healthcare",
  "Education",
  "Public / municipal",
  "Other",
];

export const turnaroundOptions = [
  { value: "Standard", title: "Standard", text: "Typically 24–72 hours" },
  { value: "Rush", title: "Rush", text: "Bid due within 48 hours" },
];

export const usStates = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
  "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
  "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

// TODO: confirm response times
export const nextSteps = [
  { title: "We review your plans", text: "An estimator checks your drawings for scope and completeness, usually the same business day." },
  { title: "You get a fixed quote", text: "A clear price and delivery date by email, with no hidden fees and no obligation." },
  { title: "Takeoff delivered", text: "Once you approve, your Excel workbook and marked-up PDFs arrive on the agreed date." },
];

export const quoteFaqs: AccordionItem[] = [
  {
    question: "What plan formats can I upload?",
    answer:
      "PDF drawings, DWG and DXF files, ZIP archives and images, up to 100 MB in total. For larger sets, paste a Dropbox, Google Drive or plan-room link instead.",
  },
  {
    question: "Is the quote really free?",
    answer: "Yes. Reviewing your plans and sending a fixed quote is free, and there's no obligation to go ahead.",
  },
  {
    question: "How fast will I hear back?",
    answer:
      "We usually reply with a quote the same business day. If your bid is due soon, choose Rush in step 2 or call us directly.",
  },
  {
    question: "Do you sign NDAs?",
    answer: "Yes. Your drawings and pricing stay confidential, and we're happy to sign your non-disclosure agreement.",
  },
  {
    question: "Which states do you cover?",
    answer: "All 50 states. Labor and material pricing is adjusted to your project's location.",
  },
];
