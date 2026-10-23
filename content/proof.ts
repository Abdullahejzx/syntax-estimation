/**
 * Social proof shared across pages: headline stats and client testimonials.
 */

export type Stat = { value: number; label: string; prefix?: string; suffix?: string; decimals?: number };

export type Testimonial = { quote: string; name: string; role: string; location: string };

// TODO: placeholder stats for a company founded in 2026. Replace with real numbers before launch.
// These are the only copies: the stats band on every page and the Home hero read from here.
export const stats: Stat[] = [
  { value: 120, suffix: "+", label: "Projects estimated" },
  { value: 45, suffix: "+", label: "Contractors served" },
  { value: 12, label: "Estimators & detailers" },
  { value: 60, suffix: "+", label: "Years combined experience" },
];

/** A stat as display text, e.g. "120+". */
export const formatStat = (s: Stat) =>
  `${s.prefix ?? ""}${s.value.toLocaleString("en-US", { maximumFractionDigits: s.decimals ?? 0 })}${s.suffix ?? ""}`;

// TODO: placeholder testimonials. Replace with real, approved client quotes before launch.
export const testimonials: Testimonial[] = [
  {
    quote:
      "The color-coded markups make checking quantities quick. We bid more drywall and framing work last quarter than ever, without adding an estimator.",
    name: "Marcus V.",
    role: "Preconstruction Manager, drywall contractor",
    location: "Dallas, TX",
  },
  {
    quote:
      "We use Syntax for overflow when we're bidding several jobs at once. Their numbers line up with the sub bids we get back, which is exactly what we need.",
    name: "Sarah J.",
    role: "Chief Estimator, general contractor",
    location: "Denver, CO",
  },
  {
    quote:
      "An addendum dropped two days before the bid and they turned the update around the next morning. The Excel files have live formulas, so we adjust margins ourselves.",
    name: "Dave K.",
    role: "Owner, electrical contractor",
    location: "Atlanta, GA",
  },
];
