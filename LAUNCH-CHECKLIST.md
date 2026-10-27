# Launch checklist

Everything on the site that still holds placeholder or unconfirmed information. Each item names the file to edit. After editing, run `npm run build` and redeploy (see README).

To find any that are left: search the project for `TODO`.

## 1. Business and contact details: `config/site.ts`

These appear in the header, footer, mobile call bar, contact page, map, legal pages and Google schema.

- [ ] Legal business name (currently "Bidnora Engineering LLC")
- [ ] Production domain (currently `https://www.arvexdesigns.net`). If it changes, also update `public/.htaccess` (www redirect) and `base_url` / `allowed_origins` in `public/api/config.php`.
- [ ] Phone number (dummy: `(201) 555-0148`) and its `phoneHref`
- [ ] Email address (`info@arvexdesigns.net` is assumed from the new domain; confirm the real mailbox)
- [ ] Office address (dummy: 100 Example Street, Suite 200, Newark, NJ 07102). It drives the map on the contact page.
- [ ] Business hours (`hours`, `hoursDetail`) and the matching `openingHours` for Google
- [ ] LinkedIn, Facebook and YouTube profile URLs (the client will share them; currently the bare sites). Set unused ones to `""`.

## 2. Email backend: `public/api/config.php` (on the server only)

- [ ] SMTP mailbox and password
- [ ] `notify_to`: who receives quote requests
- [ ] `company` block: name, phone, email and website shown in visitor emails
- [ ] `download_secret`: a long random string
- [ ] Optional `sample_attachment`: a sample estimate PDF for sample requests
- [ ] SPF, DKIM and DMARC records set for the domain

## 3. Brand

- [ ] Photos: the site uses free Unsplash stock photos (see `content/images.json`). Swap in the client's own project photos where they have them (README: "Photos").
- [ ] Real logo: `components/layout/Logo.tsx` (placeholder "B" mark plus the "Bidnora Engineering" wordmark). Also replace `app/icon.svg` (favicon) and the logo inside `components/seo/OgImage.tsx` (share images).

## 4. Proof: stats and testimonials

- [ ] Stats in `content/proof.ts`: 120+ projects, 45+ contractors, 12 estimators and detailers, 60+ years of experience. These are the only copies; every page reads them.
- [ ] Home hero stats in `content/home.ts` (`heroStats`): "24–72 hr" turnaround and "All 50" states
- [ ] Testimonials in `content/proof.ts`: replace with real, approved client quotes (name, role, city)

## 5. Pricing: `content/home.ts` (`pricingTiers`)

- [ ] Replace the placeholder prices from the design (for example "Trade Takeoff $150") with real pricing, or remove the section.

## 6. About page: `content/about.ts`

- [ ] Founders' story
- [ ] Company milestones (dates and figures)
- [ ] Team members: real names, roles and bios (photos optional)
- [ ] Software and credentials listed
- [ ] Markets to highlight
- [ ] Turnaround claim

## 7. Blog: `content/authors.ts` and `content/blog/`

- [ ] Author "Daniel Brooks, Founder & Chief Estimator" is a placeholder person with an invented bio. Replace him with the real author, or change the posts to "Bidnora Engineering Team".
- [ ] Read the 3 sample posts and confirm the client is happy to publish them under their name, including dates and claims.
- [ ] Blog post sidebar claim "24–72 hour typical turnaround": `app/blog/[slug]/page.tsx`

## 8. Sample files (download links)

- [ ] A real sample estimate PDF or Excel file. Then link it from:
  - `components/home/Hero.tsx` ("See a sample" link)
  - `app/services/[slug]/page.tsx` (sample download on service pages)
  - `components/sections/EstimateSheet.tsx` (sample sheet link)

## 9. Claims and promises to confirm

These are written as facts on the site, so the client should confirm each one is true.

- [ ] **Turnaround times ("24–72 hr")** in:
  - `content/servicesHub.ts`
  - `content/tradesHub.ts`
  - `content/about.ts`
  - `content/quote.ts`
  - all 11 trade files in `content/trades/` (the `facts` block, line ~35)
- [ ] **Accuracy ranges and comparison claims** in `content/servicesHub.ts` (accuracy table, "us vs in-house" comparison)
- [ ] **Delivered file formats** in `content/servicesHub.ts`
- [ ] **Per-service figures and claims** in `content/services.ts`: all 5 services (turnaround, accuracy, software, what's included)
- [ ] **Software the team uses** (Bluebeam, PlanSwift and others) in `content/home.ts` and `content/about.ts`
- [ ] **Home page "why us" claims** in `content/home.ts`
- [ ] **Quote response times** ("same business day") in `content/quote.ts` (`nextSteps`) and `content/home.ts` (process step 2)
- [ ] **Quote page promises** ("free, no-obligation", "NDA on request") in `content/quote.ts`
- [ ] **CTA band promises** ("100% confidential", "NDA on request", "fixed price before we start") in `components/sections/CtaBand.tsx`
- [ ] **Footer trust statements** (confidentiality, NDA, files only shared with the assigned estimator) in `components/layout/SiteFooter.tsx`

## 10. Legal pages: `content/legal.ts`

- [ ] Have a lawyer review all three policies; they are starting templates written around this site's real forms.
- [ ] Privacy policy: update if analytics, ads, chat or other tracking tools are added
- [ ] Fulfilment policy: payment terms (deposit, payment on delivery, net terms)
- [ ] Fulfilment policy: how addenda and scope changes are priced
- [ ] SMS consent wording (`components/forms/SmsConsent.tsx`) reviewed against the SMS provider's requirements (for example Twilio A2P 10DLC)

## 11. Go-live tasks

- [ ] SSL installed; HTTP and the bare domain redirect to `https://www.`
- [ ] Every form tested on the live server (quote wizard, quick quote, sample request, newsletter), with both emails received and download links working
- [ ] HSTS line enabled in `public/.htaccess` after HTTPS has been stable for a few days
- [ ] Sitemap submitted in Google Search Console and Bing Webmaster Tools
- [ ] Google Business Profile matches the name, address and phone in `config/site.ts`
- [ ] PageSpeed Insights run on the live Home, a service page and a blog post
