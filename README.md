# Syntax Estimation website

Marketing site for Syntax Estimation, a construction cost estimating company based in New Jersey that serves contractors in all 50 states.

Built with Next.js (App Router, static export), TypeScript, Tailwind CSS v4 and Framer Motion. The build output is plain HTML/CSS/JS, so it runs on Hostinger shared hosting. The quote form posts to a small PHP script.

> This README is a starting point. Full guides (adding a blog post, changing contact info, SMTP setup and deploying to Hostinger) arrive in Phase 7.

## Requirements

- Node.js 20 or newer

## Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:3100
npm run build      # static export into ./out
npm run typecheck  # TypeScript check
```

## Where things live

| What | Where |
| --- | --- |
| Phone, email, address, hours, social links | `config/site.ts` |
| Design tokens (colors, type scale, shadows) | `app/globals.css` (`@theme` block) |
| Main navigation and legal links | `content/navigation.ts` |
| Services (menu, footer, pages) | `content/services.ts` |
| Trades (menu, footer, pages) | `content/trades.ts` |
| Home page copy, stats, pricing, testimonials, FAQs | `content/home.ts` |
| Pages | `app/` |
| Components | `components/` (`layout`, `ui`, `motion`, `sections`, `home`) |

## Placeholders to replace before launch

Search the code for `TODO`. That covers the stats, testimonials, prices, contact details, social links, the logo and any claims that still need confirming.

## Design reference

The Google Stitch exports used as the visual source of truth go in `design-reference/`. That folder is git-ignored and never part of the build.
