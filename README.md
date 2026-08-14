# Crow Loop Studio — website

Marketing site for Crow Loop Studio, built from `docs/crow-loop-studios-website-design-doc.md`. React + TypeScript + Vite, bilingual EN/DE via `react-i18next` with path-based routing (`/en/...`, `/de/...`).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # typecheck, bundle, prerender every route, emit sitemap.xml
npm run preview
```

`npm run build` ends by rendering all 28 routes to `dist/<lang>/<path>/index.html`
(`scripts/prerender.mjs`) and writing `dist/sitemap.xml`. That is what makes per-page titles
and link previews work: scrapers like Slack and WhatsApp don't run JavaScript, so metadata
only React can produce is invisible to them.

The Open Graph card is generated separately and committed, since it changes about as often as
the logo:

```bash
npm run og      # composes public/brand/og/og-default.png
```

## Images

`assets/` holds the full-size source originals and is never served. `public/` holds only
web-sized WebP derivatives, sized to how each image is actually laid out (doubled for 2x
displays, never upscaled). After adding or replacing a source image:

```bash
npm run images  # regenerates every derivative in public/ from assets/ (scripts/optimize-images.mjs)
```

This does not run as part of `npm run build` — output is committed, so the size win is visible
in the PR diff and the build itself stays fast. The hero image additionally ships three widths
(768/1280/1920) with a `srcset` so the browser picks the right one for the viewport.

## Structure

- `src/pages/` — one file per route (Home, Portfolio, CaseStudy, About, Services, Process, Testimonials, Contact, `legal/*`, NotFound)
- `src/components/` — `layout/` (Header, Footer, Layout), `russel/` (mascot components), `cards/` (ProjectCard, ServiceCard, StatStrip, ProcessStep, TestimonialCard), `common/`, `cookie/`
- `src/data/` — typed content (`portfolio.ts`, `services.ts`, `process.ts`, `references.ts`) that pages render; portfolio entries are tagged `crowloop` vs `reference` per Section 4.2 of the design doc
- `src/i18n/locales/{en,de}/*.json` — all copy, one namespace per page/section
- `src/styles/tokens.css` — the confirmed design-token palette/type as CSS variables; `global.css` for shared layout/components
- `src/seo/` — `routes.ts` is the one list of indexable routes (case studies derived from `PROJECTS`), `meta.ts` turns a route into head tags, `Seo.tsx` renders them in the app
- `src/entry-server.tsx` + `scripts/` — build-time only: the SSR entry the prerenderer and sitemap generator import

## Known gaps before public launch

Carried over from the design doc's Section 7 checklist — the site is fully built and functional with placeholders for these:

- **Contact form** submits client-side only (mocked, see the `TODO(backend)` in `src/pages/Contact.tsx`) until a business email + AWS Amplify/SES backend exist.
- **Legal pages** (Impressum, Datenschutzerklärung, Haftungsausschluss, AGB) use clearly marked placeholder text — must not go live publicly until real, lawyer-reviewed copy replaces it.
- **German copy** is a first-pass draft, not a professionally reviewed translation.
- **`game e.V.` footer badge** is inert/unlinked — activate only once membership is confirmed.
- **Professional references on About** (Thomas Rössig, Robert Heil) are shown per plan, pending their sign-off before public launch.
