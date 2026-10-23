/** Top-level navigation. Services and Trades get mega menus built from their data files. */
export type NavItem =
  | { label: string; href: string; menu?: undefined }
  | { label: string; href: string; menu: "services" | "trades" };

export const mainNav: NavItem[] = [
  { label: "Services", href: "/services/", menu: "services" },
  { label: "Trades", href: "/trades/", menu: "trades" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/get-a-quote/" },
];

export const quoteHref = "/get-a-quote/";

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "SMS Terms", href: "/sms-terms/" },
  { label: "Fulfilment Policy", href: "/fulfilment-policy/" },
];
