# Bidnora Engineering website

Marketing site for Bidnora Engineering, a construction cost estimating company based in New Jersey that serves contractors in all 50 states.

Built with Next.js (App Router, static export), TypeScript, Tailwind CSS v4 and Framer Motion. `npm run build` produces plain HTML, CSS and JavaScript in `out/`, which runs on Hostinger shared hosting with no Node server. Every form posts to a small PHP script that ships in the same folder.

Before launch, work through [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md): every placeholder that needs the client's real information is listed there.

## Contents

- [Requirements and commands](#requirements-and-commands)
- [Where things live](#where-things-live)
- [Change contact info](#change-contact-info)
- [Add a blog post](#add-a-blog-post)
- [Add a service or trade](#add-a-service-or-trade)
- [Photos](#photos)
- [Social share images](#social-share-images)
- [Set up email (SMTP)](#set-up-email-smtp)
- [Deploy to Hostinger](#deploy-to-hostinger)
- [After launch: SEO and performance](#after-launch-seo-and-performance)
- [Client preview on GitHub Pages](#client-preview-on-github-pages)

## Requirements and commands

Node.js 20 or newer.

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:3100 (hot reload)
npm run build      # production build into ./out
npm run preview    # serve ./out at http://localhost:3200, like the live server
npm run typecheck  # TypeScript check
```

`npm run build` also runs `scripts/flatten-segments.mjs` automatically afterwards. It copies Next's link-prefetch files to the names the browser asks for; without it, every link on the live site would log a 404 in the console.

The PHP form backend does not run locally (neither `dev` nor `preview` executes PHP). Test the forms on Hostinger.

## Where things live

| What | Where |
| --- | --- |
| Company name, phone, email, address, hours, social links, domain | `config/site.ts` |
| Design tokens (colors, type scale, shadows) | `app/globals.css` (`@theme` block) |
| Main navigation, footer and legal links | `content/navigation.ts` |
| Services: menu, hub page and the 5 service pages | `content/services.ts`, `content/servicesHub.ts` |
| Trades: menu, hub page and the 11 trade pages (one file each) | `content/trades/`, `content/tradesHub.ts` |
| Stats and testimonials (used on every page) | `content/proof.ts` |
| Home page copy, hero stats, pricing, FAQs | `content/home.ts` |
| About page (story, milestones, team) | `content/about.ts` |
| Quote page copy and form options | `content/quote.ts`, `content/forms.ts` |
| Privacy policy, SMS terms, fulfilment policy | `content/legal.ts` |
| Blog posts and authors | `content/blog/*.mdx`, `content/authors.ts` |
| Blog cover images | `public/blog/` |
| Page templates | `app/` |
| Components | `components/` (`layout`, `ui`, `motion`, `sections`, `home`, `trades`, `about`, `quote`, `forms`, `blog`, `seo`) |
| SEO helpers (metadata, JSON-LD, share images) | `lib/metadata.ts`, `lib/schema.ts`, `lib/og.ts` |
| Form backend (PHP) | `public/api/` |
| Apache rules (HTTPS, caching, compression, 404) | `public/.htaccess` |

## Change contact info

1. **Website:** edit `config/site.ts`. The phone number, email, address, hours and social links update everywhere: header, footer, mobile call bar, contact page, map, legal pages and the LocalBusiness schema. Set a social link to `""` to hide its icon.
2. **Emails:** update the `company` block in `public/api/config.php` on the server. Those details appear in the confirmation emails visitors receive.
3. **New domain?** Change `url` in `config/site.ts`. It drives canonical links, the sitemap, robots.txt and share-image URLs. Also update the www redirect in `public/.htaccess`, plus `base_url` and `allowed_origins` in `config.php`.
4. Rebuild and redeploy (see [Deploy to Hostinger](#deploy-to-hostinger)).

## Add a blog post

1. Create `content/blog/your-post-slug.mdx`. The file name becomes the URL: `/blog/your-post-slug/`.
2. Start it with this frontmatter (copy from an existing post):

   ```yaml
   ---
   title: "Concrete Takeoff Checklist: 12 Items Contractors Miss"
   description: "One or two sentences for Google and the post card (about 150 characters)."
   date: "2026-11-02"            # YYYY-MM-DD; posts are sorted newest first
   updated: "2026-11-10"         # optional, when you revise a post
   category: "Concrete"          # a new category gets its own page automatically
   author: "Daniel Brooks"       # must match a key in content/authors.ts
   image: "/blog/your-post-slug.svg"
   imageAlt: "Describe the cover image for screen readers"
   readTime: "7 min read"
   tags: ["Concrete estimating", "Rebar"]
   featured: true                # optional: shows as the large post on /blog/
   faqs:                         # optional: adds an FAQ section and FAQ schema
     - question: "A question readers ask?"
       answer: "The answer."
   ---
   ```

3. Write the article in Markdown. Use `##` for main sections: each one appears in the contents list. Tables, lists, links and bold all work.
4. Optional building blocks (props must be plain text in quotes):

   ```mdx
   <ProTip title="Read the geotech report first">Body text with **markdown**.</ProTip>
   <CommonMistake title="Assuming stock lengths produce no scrap">Body text.</CommonMistake>
   <ChecklistItem number="03" title="Bulkheads and chamfers">Body text.</ChecklistItem>
   <PullQuote by="Daniel Brooks, Chief Estimator">Quote text.</PullQuote>
   <MidArticleCta title="Bidding a concrete job?" text="We'll run the takeoff." />
   ```

5. Add the cover image to `public/blog/` at 1200 × 675 (16:9) as SVG, WebP or JPG.
6. Run `npm run dev` and check the post at `/blog/your-post-slug/`, then build and deploy.

The blog list, category pages, pagination (9 posts per page), related posts, the Home page's latest posts, the sitemap and the post's share image all update automatically.

New author? Add them to `content/authors.ts` with a name, role and short bio.

## Add a service or trade

- **Service:** add an entry to the `services` array in `content/services.ts` by copying an existing one and changing the slug and copy.
- **Trade:** copy a file in `content/trades/` (for example `concrete.ts`), change the slug and copy, then add it to the list in `content/trades/index.ts`. The order there is the menu order.

Menus, hub pages, the footer, the sitemap and share images pick up new entries automatically.

## Photos

The construction photos (hero backgrounds, the Home slider, service and trade cards, the CTA banner) are free stock photos from [Unsplash](https://unsplash.com/license), which allows commercial use without attribution. They live in `public/images/` in two sizes: `<key>-lg.webp` (1600px, backgrounds) and `<key>-sm.webp` (800px, cards).

- **Which photo goes where:** `content/images.json` maps each key to an Unsplash photo id and alt text. Service pages use `service-<slug>`, trade pages `trade-<slug>`, and the hubs, About, Quote and banners use `bg-*`. The Home slider uses `hero-*`, and its slides are listed in `content/home.ts` (`heroSlides`).
- **Swap a stock photo:** find one on unsplash.com, copy the `photo-…` id from its image URL into `content/images.json`, then run `npm run images -- --force` to download and resize it.
- **Use the client's own photo:** save it as a WebP in `public/images/` under the same two names (for example `trade-concrete-lg.webp` at 1600 × 900 and `trade-concrete-sm.webp` at 800 × 520) and update the alt text in `content/images.json`.

## Social share images

Every page has a 1200 × 630 PNG for link previews on LinkedIn, Facebook, X, iMessage, Slack and so on. The images are drawn at build time from the site's own content by `app/og/[...image]/route.tsx`, using the layout in `components/seo/OgImage.tsx` (navy background, blueprint grid, orange accent, logo and page title). The build writes them to:

| Image | Used by |
| --- | --- |
| `/og/default.png` | Home, hubs, About, Quote, blog list, legal pages |
| `/og/services/<slug>.png` | Each service page |
| `/og/trades/<slug>.png` | Each trade page |
| `/og/blog/<slug>.png` | Each blog post |

To change the wording, edit `lib/og.ts`; to change the design, edit `OgImage.tsx`. Preview any image while `npm run dev` is running, for example `http://localhost:3100/og/default.png`.

After launch, you can check how a link will look with LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/). The same tool clears LinkedIn's cached preview after you change an image.

## Set up email (SMTP)

The forms (quote wizard, quick quote, sample request, newsletter) post to `/api/quote.php`. That script emails the team a summary with secure download links for uploaded plans, and sends the visitor a confirmation. It sends mail through PHPMailer over SMTP.

1. **Create the mailbox.** In Hostinger hPanel, go to **Emails** and create the address that will send mail, for example `info@arvexdesigns.net`. Under that mailbox's **Configuration** (or "Connect apps & devices"), note the SMTP host, port and encryption. For Hostinger these are usually `smtp.hostinger.com`, port `465`, SSL.
2. **Create `config.php`.** Copy `public/api/config.example.php` to `config.php` and fill in:
   - `smtp.username` and `smtp.password`: the mailbox login.
   - `from_email` and `from_name`: normally the same mailbox.
   - `notify_to`: everyone who should receive new requests.
   - `company`: the details shown in visitor emails.
   - `base_url` and `allowed_origins`: the live domain.
   - `download_secret`: 64 or more random characters. Changing it later breaks old download links.
   - `sample_attachment` (optional): an absolute server path to a sample estimate PDF, attached to sample-request confirmations.
3. **Keep the file private.** `config.php` is git-ignored and blocked from the web by `api/.htaccess`. Upload it directly to the server (step 6 of the deployment) and never commit it.
4. **Check deliverability.** In hPanel under **Emails > Domain settings** (or the DNS zone), make sure SPF, DKIM and DMARC are set up so the emails don't land in spam.
5. **Test.** Submit each form on the live site. If something fails, temporarily set `'debug' => true` in `config.php` to see the technical error in the form response, then set it back to `false`.

Uploaded plans are stored in `bidnora-uploads/`, one level above `public_html`, so they can never be opened directly. The PHP limits for 100 MB uploads are in `public/api/.user.ini`. If large uploads still fail, set the same values in hPanel under **Advanced > PHP Configuration**.

## Deploy to Hostinger

### First deployment

1. **PHP version:** in hPanel, go to **Advanced > PHP Configuration** and select PHP 8.2 or newer (the code needs at least 7.4).
2. **SSL:** under **Security > SSL**, install the free SSL certificate for the domain (and the www subdomain).
3. **Build locally:**

   ```bash
   npm install
   npm run build
   ```

4. **Check it:** optionally run `npm run preview` and click through `http://localhost:3200`.
5. **Upload:** in hPanel's **File Manager**, open `public_html`, then upload the *contents* of `out/` (not the `out` folder itself). The easiest way is to zip the contents of `out/`, upload the zip and use **Extract**. Make sure the hidden `.htaccess` file is included. FTP works too (hPanel > **Files > FTP Accounts**).
6. **Add the email settings:** upload your filled-in `config.php` to `public_html/api/`.
7. **Check the live site:**
   - `http://` and the bare domain redirect to `https://www.`
   - A made-up URL shows the custom 404 page.
   - `/sitemap.xml` and `/robots.txt` load.
   - Every form sends both emails, and download links in the team email work.
8. **HSTS:** once HTTPS has worked for a few days, uncomment the `Strict-Transport-Security` line in `public/.htaccess`, then rebuild and upload `.htaccess` again.

### Updating the site

1. Run `npm run build`.
2. Upload the new contents of `out/` over the old ones. Overwriting is fine.
3. Leave `public_html/api/config.php` alone: it isn't in `out/`, so uploading never replaces it.
4. It's safe to delete old files in `public_html/_next/` first; their names change with every build.

## After launch: SEO and performance

- **Google Search Console:** add the domain, verify it (DNS record in hPanel) and submit `https://www.arvexdesigns.net/sitemap.xml`. Bing Webmaster Tools can import the same settings.
- **Google Business Profile:** use exactly the same name, address and phone as `config/site.ts`.
- **Structured data:** check a few pages in Google's [Rich Results Test](https://search.google.com/test/rich-results). The site includes LocalBusiness, Service, FAQPage, BlogPosting and BreadcrumbList schema.
- **Performance:** measure the live site with [PageSpeed Insights](https://pagespeed.web.dev/). Lighthouse on a slow or busy laptop under-reports mobile scores (it says so in a warning at the top of the report), so trust PageSpeed's numbers. What's already in place:
  - Pages are pre-rendered HTML.
  - Fonts are self-hosted and preloaded.
  - The Framer Motion animation engine loads after the page is interactive.
  - The map only loads when clicked.
  - Hashed assets are cached for a year, and text files are compressed.

## Client preview on GitHub Pages

Every push to `master` publishes a preview to `https://<github-user>.github.io/<repo>/` via `.github/workflows/preview.yml`. The preview build:

- serves the site from the repo's subfolder (`NEXT_PUBLIC_BASE_PATH`)
- points share images and canonical links at the preview address (`NEXT_PUBLIC_SITE_URL`)
- is hidden from search engines and has the forms switched off (`NEXT_PUBLIC_PREVIEW`), since GitHub Pages can't run PHP

One-time setup: in the GitHub repo, go to **Settings > Pages** and set **Source** to **GitHub Actions**. Progress shows under the repo's **Actions** tab.

To try the preview build locally:

```bash
NEXT_PUBLIC_BASE_PATH=/syntax-estimation NEXT_PUBLIC_PREVIEW=true npm run build
node scripts/serve-out.mjs /syntax-estimation   # then open http://localhost:3200/syntax-estimation/
```

The real site for Hostinger is still built with a plain `npm run build`; none of the preview settings apply to it.

## Design reference

The Google Stitch exports used as the visual source of truth go in `design-reference/`. That folder is git-ignored and never part of the build.
