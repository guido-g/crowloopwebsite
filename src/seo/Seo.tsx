import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { buildHeadTags } from "./meta";
import { toRoutePath, type SupportedLang } from "./routes";

interface SeoProps {
  lang: SupportedLang;
}

/**
 * Keeps the head metadata in sync with the current route in the running app.
 *
 * React 19 hoists `<title>`, `<meta>`, and `<link>` into `<head>` from anywhere in the tree,
 * so this needs no `react-helmet`. It matters mainly for client-side navigation: crawlers and
 * link-preview scrapers read the prerendered HTML instead (`scripts/prerender.mjs`), which
 * serialises the same tag list from `buildHeadTags`.
 */
export function Seo({ lang }: SeoProps) {
  const { t } = useTranslation(["seo", "portfolio"]);
  const { pathname } = useLocation();

  const tags = buildHeadTags(lang, toRoutePath(pathname), t);

  return (
    <>
      {tags.map((tag, index) => {
        switch (tag.kind) {
          case "title":
            return <title key="title">{tag.content}</title>;
          case "meta":
            return <meta key={tag.name} name={tag.name} content={tag.content} />;
          case "og":
            // og:locale:alternate can repeat, so the property alone is not a unique key.
            return (
              <meta key={`${tag.property}:${index}`} property={tag.property} content={tag.content} />
            );
          case "link":
            return (
              <link
                key={`${tag.rel}:${tag.hrefLang ?? ""}`}
                rel={tag.rel}
                hrefLang={tag.hrefLang}
                href={tag.href}
              />
            );
        }
      })}
    </>
  );
}
