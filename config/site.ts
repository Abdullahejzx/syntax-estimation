/**
 * Business details used across the whole site (header, footer, schema, CTAs).
 * Change contact info here and it updates everywhere.
 * The quote form's email recipients live separately in public/api/config.php.
 */

// TODO: confirm production domain
export const productionUrl = "https://www.syntaxestimation.com";

// Set only by the GitHub Pages preview build (.github/workflows/preview.yml). The normal
// Hostinger build leaves them empty: site at the domain root, forms switched on.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "true";

export const siteConfig = {
  name: "Syntax Estimation",
  legalName: "Syntax Estimation LLC", // TODO: confirm registered business name
  tagline: "Construction cost estimating and quantity takeoffs for contractors in all 50 states.",
  /** Where the site is served from (the preview's GitHub Pages address, or the real domain) */
  url: process.env.NEXT_PUBLIC_SITE_URL || productionUrl,
  /** URL prefix when the site lives in a subfolder (e.g. "/syntax-estimation"), otherwise "" */
  basePath,

  // TODO: replace dummy contact details with real ones
  phone: "(201) 555-0148",
  phoneHref: "tel:+12015550148",
  email: "info@syntaxestimation.com",
  address: {
    street: "100 Example Street, Suite 200",
    city: "Newark",
    region: "NJ",
    postalCode: "07102",
    country: "US",
  },
  hours: "Mon–Sat, all US time zones",
  // TODO: confirm business hours
  hoursDetail: ["Mon–Fri: 8:00 AM – 6:00 PM ET", "Sat: 9:00 AM – 2:00 PM ET"],
  // Machine-readable hours for schema.org (TODO: confirm)
  openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-14:00"],

  // TODO: replace with real profile URLs, or set to "" to hide an icon
  social: {
    linkedin: "https://www.linkedin.com/",
    x: "https://x.com/",
    youtube: "https://www.youtube.com/",
  },

  // Endpoint every form on the site posts to (built in Phase 5)
  formEndpoint: `${basePath}/api/quote.php`,
} as const;

/** Prefixes a public file path for plain <img>/<a> tags (next/link adds the prefix itself). */
export const withBasePath = (path: string) => `${basePath}${path}`;

/** Full URL for a site path, e.g. absoluteUrl("/blog/") for schema, sitemap and share links. */
export const absoluteUrl = (path = "/") => `${siteConfig.url.replace(/\/$/, "")}${path}`;

export const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`;
