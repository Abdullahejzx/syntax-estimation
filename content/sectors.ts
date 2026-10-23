import type { LucideIcon } from "lucide-react";
import { Building2, Factory, GraduationCap, House, Hospital, Hotel, Landmark, Warehouse } from "lucide-react";

/** Project types shown on service and trade pages. */
export type Sector = { title: string; text: string; note: string; icon: LucideIcon };

export const sectors: Sector[] = [
  {
    title: "Residential",
    text: "Custom homes, additions, remodels and production housing, from single plans to whole subdivisions.",
    note: "Custom to production",
    icon: House,
  },
  {
    title: "Commercial Office",
    text: "Core-and-shell buildings, tenant fit-outs, renovations and corporate interiors.",
    note: "Shell & interiors",
    icon: Building2,
  },
  {
    title: "Retail & Hospitality",
    text: "Restaurants, retail centers, hotels and multi-site rollouts that need consistent pricing.",
    note: "Single site or rollout",
    icon: Hotel,
  },
  {
    title: "Multi-Family",
    text: "Garden-style, podium and mid-rise apartments, senior living and student housing.",
    note: "Wood, podium & mid-rise",
    icon: Warehouse,
  },
  {
    title: "Industrial & Warehouse",
    text: "Distribution centers, manufacturing plants, cold storage and flex buildings.",
    note: "Tilt-up & pre-engineered",
    icon: Factory,
  },
  {
    title: "Healthcare",
    text: "Medical offices, clinics, surgical centers and hospital renovations with specialty systems.",
    note: "Specialty MEP",
    icon: Hospital,
  },
  {
    title: "Education",
    text: "K-12 schools, university buildings, labs and athletic facilities, including phased work.",
    note: "Prevailing wage ready",
    icon: GraduationCap,
  },
  {
    title: "Public Works & Civil",
    text: "Municipal buildings, fire and police stations, parks and site infrastructure.",
    note: "Public bid formats",
    icon: Landmark,
  },
];
