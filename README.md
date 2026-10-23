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

## Quote form backend (PHP)

All forms post to `public/api/quote.php`, which the build copies to `out/api/`. It validates input, stores uploaded plans privately, emails the team a summary with signed download links (via PHPMailer over SMTP) and sends the visitor a confirmation.

| File | Purpose |
| --- | --- |
| `public/api/quote.php` | Form endpoint (JSON responses) |
| `public/api/download.php` | Serves uploaded files through signed, expiring links |
| `public/api/config.example.php` | Settings template. Copy to `config.php` (git-ignored) and fill in |
| `public/api/lib/` | Shared helpers, email templates and PHPMailer 7.1.1 (blocked from the web) |
| `public/api/.user.ini` | Raises PHP upload limits for the 100 MB maximum |

Setup: copy `config.example.php` to `config.php`, then enter your SMTP mailbox, the addresses that should receive requests and a long random `download_secret`. Uploaded files go to `syntax-uploads/`, one level above `public_html`, so they can never be opened directly. The PHP backend needs a PHP host; it does not run under `npm run dev`. Full deployment steps arrive in Phase 7.

## Placeholders to replace before launch

Search the code for `TODO`. That covers the stats, testimonials, prices, contact details, social links, the logo and any claims that still need confirming.

## Design reference

The Google Stitch exports used as the visual source of truth go in `design-reference/`. That folder is git-ignored and never part of the build.
