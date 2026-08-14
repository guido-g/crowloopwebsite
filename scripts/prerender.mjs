/**
 * Renders every route to static HTML after `vite build`, so the served response already
 * contains the page's content and metadata.
 *
 * This exists because link-preview scrapers — Slack, WhatsApp, LinkedIn, iMessage — do not
 * run JavaScript. They read the raw HTML response. With a single `index.html` served for all
 * 28 URLs, per-route metadata rendered by React is invisible to them no matter how correct it
 * is. Search crawlers do run JS, but get the content sooner this way.
 *
 * Output goes to `dist/<lang>/<path>.html`, matched by `try_files $uri $uri.html` in nginx.
 * The flat `.html` shape rather than `<path>/index.html` is deliberate: directory-index
 * resolution makes nginx 301 `/de/portfolio` to `/de/portfolio/`, which would put a redirect
 * behind every canonical URL, every sitemap entry, and every link the site emits — the app's
 * own links have no trailing slash. Serving the file directly keeps those URLs 200s.
 *
 * `dist/index.html` stays in place as the SPA fallback for `/` and unknown paths.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST = path.join(ROOT, "dist");

const { render, allRoutePairs } = await import(
  path.join(ROOT, "dist-ssr", "entry-server.js")
);

/**
 * React 19 emits hoistable elements — `<title>`, `<meta>`, `<link>`, and the preloads it
 * derives from `<img>` — as a run at the very start of `renderToString` output rather than
 * into `<head>`, which `renderToString` has no access to.
 *
 * They have to come out of the markup: on the client these elements never occupy a position
 * inside the root container (React puts them in `<head>`), so leaving them in the container's
 * server HTML is a hydration mismatch, and a `<title>` inside `<body>` is invalid besides.
 */
function splitHoistables(html) {
  const HOISTABLE = /^(?:<link\b[^>]*>|<meta\b[^>]*>|<title\b[^>]*>[\s\S]*?<\/title>)/;

  let rest = html;
  const hoisted = [];
  for (let match = rest.match(HOISTABLE); match; match = rest.match(HOISTABLE)) {
    hoisted.push(match[0]);
    rest = rest.slice(match[0].length);
  }
  return { hoisted, html: rest };
}

/** The template ships a default title and description for the SPA fallback. Per-route tags
 * replace them rather than joining them, or every page would carry two of each. */
function stripDefaultMetadata(template) {
  return template
    .replace(/^\s*<title>[\s\S]*?<\/title>\n/m, "")
    .replace(/^\s*<meta\s+\n?\s*name="description"[\s\S]*?\/>\n/m, "");
}

const template = stripDefaultMetadata(await readFile(path.join(DIST, "index.html"), "utf8"));

if (!template.includes('<div id="root"></div>')) {
  throw new Error("dist/index.html has no empty #root to render into — did the build change?");
}

let count = 0;

for (const { lang, route } of allRoutePairs()) {
  const { html, head } = await render(lang, route.path);
  const { hoisted, html: markup } = splitHoistables(html);

  if (!head.includes("<title>")) {
    throw new Error(`No <title> generated for /${lang}/${route.path} — metadata layer broke.`);
  }

  // Preload hints are the one hoistable worth keeping: React would regenerate them on the
  // client anyway, but in the served HTML they start the image fetch before hydration.
  const preloads = hoisted
    .filter((tag) => tag.startsWith('<link rel="preload"'))
    .map((tag) => `    ${tag}`)
    .join("\n");

  const page = template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace("  </head>", `${[head, preloads].filter(Boolean).join("\n")}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);

  // `/de` -> dist/de.html, `/de/portfolio` -> dist/de/portfolio.html.
  const outFile = path.join(DIST, route.path ? `${lang}/${route.path}.html` : `${lang}.html`);
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, page, "utf8");
  count += 1;
}

console.log(`prerendered ${count} pages`);
