# Specialist Heat Exchangers

Marketing site for Specialist Heat Exchangers Ltd. Static Next.js export, deployed to GitHub Pages from `main`.

English is the default and lives on the root routes (`/`, `/products/`, …). German is the same twelve pages under `/de/`.

## Edit the copy

All visible copy is in two files:

- `content/en.json` — English
- `content/de.json` — German

The two files use the same keys. Change a string in the file for the language you are editing, then rebuild. Do not rename keys: pages and metadata read them by name.

`[[CLIENT TO CONFIRM]]` is a placeholder, not a translation. Leave that token exactly as it is in both files. The site renders it as a highlighted amber mark. Translate the words around it.

A few long German compounds get a soft hyphen when the catalogue loads (`lib/hyphenate.ts`), so a narrow heading breaks at the compound boundary (`Wärme-übertrager`, `Präzisions-fertigung`). The JSON itself stays plain. Add a word there only if a new heading overflows on a phone.

### The German needs a native-speaker review

The German was machine-written in an industrial register (`Wärmeübertrager`, `Eigenfertigung`, `Instandsetzung`, `Fachbeiträge`). It has not been reviewed by a native speaker. Please have one read `content/de.json` before this copy is treated as final. Standards and the company name (API, ASME, ISO, PED, ATEX, HTRI, SolidWorks, PV Elite, Specialist Heat Exchangers, Tube Fins) are left as published.

### Add a language

1. Copy `content/en.json` to `content/<locale>.json` and translate the values. Keep every key, and keep `[[CLIENT TO CONFIRM]]` unchanged.
2. Register the locale in `lib/i18n.ts` (`LOCALES`, the catalogue, `localeFromPath`, `localePath`).
3. Add a `app/<locale>/` route tree that mirrors `app/de/` (see `scripts/write-routes.mjs`).
4. Add a row to the language menu in `components/Chrome.tsx` and a flag in `components/Flags.tsx`.
5. Teach `scripts/set-html-lang.mjs` to set `<html lang>` for the new prefix, and add the locale to the `hreflang` map in `lib/metadata.ts`.

English stays at the root. Other languages stay under `/<locale>/`, which is what a static export can do without a server.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000/she-site/`. The dev server uses the same `/she-site` base path as GitHub Pages unless you set the variables below.

```bash
npm run build   # writes the static site to out/
npm run lint    # tsc --noEmit
```

## Environment

Copy `.env.example` to `.env.local`. Values are inlined at build time.

| Variable | Pages project site | Custom domain |
| --- | --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | `/she-site` (also the default when unset) | empty |
| `NEXT_PUBLIC_SITE_URL` | `https://specialist-heat-exchangers.github.io` | `https://your-domain` |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Formspree form URL, or empty | same |

An empty `NEXT_PUBLIC_BASE_PATH` serves the site from the domain root and drops the prefix from asset and canonical URLs. Do not add a `CNAME` file until the domain is ready to serve this site. Open Graph URLs are absolute and include the base path, so set `NEXT_PUBLIC_SITE_URL` to the origin you actually publish.

The GitHub Actions workflow (`.github/workflows/pages.yml`) builds with the project-site values. The form endpoint is read from the repository variable `NEXT_PUBLIC_FORM_ENDPOINT`.

## Contact form

The quote form posts `multipart/form-data` to `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree, or HubSpot later). A drawing upload is optional.

While that variable is empty, submit opens a `mailto:info@she-uk.com` draft and says so. It does not claim the enquiry reached the team. The reCAPTCHA line from the design is omitted on purpose: there is no widget.

Formspree’s free plan is about 50 submissions a month and does not accept file uploads. On that plan an attachment can be rejected; the note on the form tells people to email the drawing to info@she-uk.com. A paid Formspree form, or another endpoint, is required before uploads and higher volume will work.

## Language switcher

The header control is a real English / German switch. It shows the language name and flag (English with the UK flag, Deutsch with the German flag) and keeps the visitor on the same page, including the query string. It is in the header bar on mobile as well as desktop, not only inside the menu.

`<html lang>` is `en` or `de`. Each page emits `hreflang` alternates for `en`, `de`, and `x-default`. `og:title` and `og:description` are localised. Every page shares the homepage preview image `public/og-image.png` (1200×630, a screenshot of the built English homepage).

## Routes worth knowing

- Servicing in the navigation is the refurbishment page: `/refurbishment/` and `/de/refurbishment/`. `/servicing/` and `/de/servicing/` refresh to those URLs. Static export cannot send an HTTP redirect.
- The manufacturing list is the seven unique items M.01–M.07. M.02 links to the fin-tube page. The duplicated M.05/M.06 lines in the source text were dropped.
- Unknown URLs use `404.html`. GitHub Pages has one 404 for the whole site, so that file contains both languages and shows the one that matches the URL.
- Footer cookie settings store a preference in this browser only. No analytics script is loaded.

## GitHub Pages

The workflow deploys on a push to `main` (and builds on pull requests without deploying). This repository is private. GitHub Pages is free only for public repositories; a private repository needs a paid plan. After that, in **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**.

This project could not confirm that Pages is enabled: the Pages API returned `403 Resource not accessible by integration`.

## Still to confirm

Each of these is a `[[CLIENT TO CONFIRM]]` mark on the site:

- Companies House company number (footer, and privacy section “Who we are”)
- VAT number (footer)
- Privacy “last updated” date
- How many years enquiry records are kept
- Homepage sector list
- Photograph of the Lincoln site (the page uses the industrial-cooling picture and says the site photo is unconfirmed; the unused low-resolution building picture is not used)
- Fin-tube descriptions for T.02 L-fin, T.03 LL-fin, T.04 KL-fin, T.05 wire fin, T.06 crinkle fin, T.07 turbulator
- LinkedIn profile URL (the company name is shown; no URL was invented)
- PDF for the ISO 9001 / ISO 14001 / ASME U certificate pack
- PDF for the ethical procurement policy
- PDF for the sustainability policy
- Whitepaper WP.01
- Whitepaper WP.02

There is no Google Maps API key. The contact page shows an empty map area labelled with the Freeman Road address, and “Open in Maps” searches for that address.
