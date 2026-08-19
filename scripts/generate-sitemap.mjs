/**
 * Emits `dist/sitemap.xml` from the same route table the app and the prerenderer read, so the
 * three can never list different URLs.
 *
 * Each `<url>` carries `xhtml:link` alternates for every language plus `x-default`. Search
 * engines require those to be reciprocal — every URL in a set names the whole set, itself
 * included — which is why the alternates are emitted per entry rather than once.
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");

// pathToFileURL is required on Windows: dynamic import() rejects a raw absolute path like
// "C:\...\entry-server.js" (parsed as an unsupported "c:" URL scheme) unless it's a file:// URL.
const { allRoutePairs, urlFor, SUPPORTED_LANGS, DEFAULT_LANG } = await import(
  pathToFileURL(path.join(ROOT, "dist-ssr", "entry-server.js")).href
);

const escapeXml = (value) =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&apos;";
    }
  });

const pairs = allRoutePairs();

const entries = pairs.map(({ lang, route }) => {
  const alternates = [
    ...SUPPORTED_LANGS.map((alternate) => ({
      hreflang: alternate,
      href: urlFor(alternate, route.path),
    })),
    { hreflang: "x-default", href: urlFor(DEFAULT_LANG, route.path) },
  ]
    .map(
      ({ hreflang, href }) =>
        `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(href)}" />`,
    )
    .join("\n");

  return [
    "  <url>",
    `    <loc>${escapeXml(urlFor(lang, route.path))}</loc>`,
    alternates,
    `    <priority>${route.priority.toFixed(1)}</priority>`,
    "  </url>",
  ].join("\n");
});

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...entries,
  "</urlset>",
  "",
].join("\n");

await writeFile(path.join(ROOT, "dist", "sitemap.xml"), sitemap, "utf8");

console.log(`sitemap.xml: ${pairs.length} URLs`);
