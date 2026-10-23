/**
 * Every trade and client page. The header menu, footer, home page, /trades hub and
 * each /trades/[slug] page are generated from this list.
 *
 * To add a trade: copy one of the files in this folder (e.g. concrete.ts), change the
 * slug and copy, then add it to the array below. The order here is the menu order.
 */
import { concrete } from "./concrete";
import { drywall } from "./drywall";
import { electrical } from "./electrical";
import { flooring } from "./flooring";
import { generalContractor } from "./general-contractor";
import { insulation } from "./insulation";
import { masonry } from "./masonry";
import { metal } from "./metal";
import { painting } from "./painting";
import { plumbing } from "./plumbing";
import { supplier } from "./supplier";
import type { Trade } from "./types";

export type { Trade, TakeoffRow } from "./types";

export const trades: Trade[] = [
  concrete,
  masonry,
  metal,
  drywall,
  insulation,
  painting,
  flooring,
  electrical,
  plumbing,
  generalContractor,
  supplier,
];

export const specialtyTrades = trades.filter((t) => t.group === "trade");
export const clientTypes = trades.filter((t) => t.group === "client");
export const tradeHref = (slug: string) => `/trades/${slug}/`;
export const getTrade = (slug: string) => trades.find((t) => t.slug === slug);
