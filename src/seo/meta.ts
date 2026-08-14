import {
  NOT_FOUND_ROUTE,
  OG_IMAGE,
  OG_LOCALES,
  SITE_URL,
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  findRoute,
  urlFor,
  type SupportedLang,
} from "./routes";

/**
 * One head tag, described as data rather than markup.
 *
 * Both consumers build from this list: `Seo.tsx` maps it to JSX for the running app, and
 * `scripts/prerender.mjs` serialises it into the `<head>` of the static HTML crawlers get.
 * Keeping it data means the two can't drift — a tag added here appears in both, and neither
 * side owns a second copy of the values.
 */
export type HeadTag =
  | { kind: "title"; content: string }
  | { kind: "meta"; name: string; content: string }
  | { kind: "og"; property: string; content: string }
  | { kind: "link"; rel: string; href: string; hrefLang?: string };

/** Minimal shape of i18next's `t`, so this module works with a fixed-language `t` under
 * prerender just as well as the hook-bound one in the component. */
export type Translate = (key: string) => string;

export function buildHeadTags(lang: SupportedLang, routePath: string, t: Translate): HeadTag[] {
  const route = findRoute(routePath);
  const isNotFound = route === undefined;
  const { titleKey, descriptionKey, ogType } = route ?? NOT_FOUND_ROUTE;

  const pageTitle = t(titleKey);
  const description = t(descriptionKey);
  const siteName = t("seo:titleSuffix");
  // The home page leads with the brand; every other page leads with the page and trails it.
  const title =
    routePath === "" && !isNotFound ? `${siteName} — ${pageTitle}` : `${pageTitle} — ${siteName}`;

  const canonical = urlFor(lang, routePath);
  const imageUrl = `${SITE_URL}${OG_IMAGE.path}`;

  const tags: HeadTag[] = [
    { kind: "title", content: title },
    { kind: "meta", name: "description", content: description },
    { kind: "link", rel: "canonical", href: canonical },
  ];

  if (isNotFound) {
    // A 404 is reachable at unlimited URLs — none of them belong in an index.
    tags.push({ kind: "meta", name: "robots", content: "noindex, follow" });
  } else {
    // hreflang must be reciprocal and self-referential, so every language gets a tag —
    // including the current one — plus x-default pointing at the English fallback.
    for (const alternate of SUPPORTED_LANGS) {
      tags.push({
        kind: "link",
        rel: "alternate",
        hrefLang: alternate,
        href: urlFor(alternate, routePath),
      });
    }
    tags.push({
      kind: "link",
      rel: "alternate",
      hrefLang: "x-default",
      href: urlFor(DEFAULT_LANG, routePath),
    });
  }

  tags.push(
    { kind: "og", property: "og:type", content: ogType },
    { kind: "og", property: "og:site_name", content: siteName },
    { kind: "og", property: "og:title", content: title },
    { kind: "og", property: "og:description", content: description },
    { kind: "og", property: "og:url", content: canonical },
    { kind: "og", property: "og:locale", content: OG_LOCALES[lang] },
  );
  for (const alternate of SUPPORTED_LANGS.filter((candidate) => candidate !== lang)) {
    tags.push({ kind: "og", property: "og:locale:alternate", content: OG_LOCALES[alternate] });
  }
  tags.push(
    { kind: "og", property: "og:image", content: imageUrl },
    { kind: "og", property: "og:image:width", content: String(OG_IMAGE.width) },
    { kind: "og", property: "og:image:height", content: String(OG_IMAGE.height) },
    { kind: "og", property: "og:image:alt", content: siteName },
    { kind: "meta", name: "twitter:card", content: "summary_large_image" },
    { kind: "meta", name: "twitter:title", content: title },
    { kind: "meta", name: "twitter:description", content: description },
    { kind: "meta", name: "twitter:image", content: imageUrl },
  );

  return tags;
}

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
};

/** Escapes a value for use in HTML text or a double-quoted attribute. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"]/g, (char) => ESCAPES[char]);
}

/** Serialises head tags to HTML. Used by the prerenderer; kept next to `buildHeadTags` so
 * adding a tag kind forces a decision about how it is written out. */
export function renderHeadTags(tags: HeadTag[], indent = "    "): string {
  return tags
    .map((tag) => {
      switch (tag.kind) {
        case "title":
          return `${indent}<title>${escapeHtml(tag.content)}</title>`;
        case "meta":
          return `${indent}<meta name="${tag.name}" content="${escapeHtml(tag.content)}" />`;
        case "og":
          return `${indent}<meta property="${tag.property}" content="${escapeHtml(tag.content)}" />`;
        case "link": {
          const hrefLang = tag.hrefLang ? ` hreflang="${tag.hrefLang}"` : "";
          return `${indent}<link rel="${tag.rel}"${hrefLang} href="${escapeHtml(tag.href)}" />`;
        }
      }
    })
    .join("\n");
}
