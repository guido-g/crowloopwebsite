/* eslint-disable react/only-export-components -- Build-time entry, never hot-reloaded: the
   prerender and sitemap scripts import `render` and the route helpers from this bundle. */
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import i18n from "./i18n";
import { AppRoutes } from "./App";
import { buildHeadTags, renderHeadTags } from "./seo/meta";
import {
  allRoutePairs,
  urlFor,
  SITE_URL,
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  type SupportedLang,
} from "./seo/routes";
import "./styles/global.css";

/**
 * Server entry used only at build time by `scripts/prerender.mjs` and
 * `scripts/generate-sitemap.mjs`. Bundled by `npm run build:ssr`.
 *
 * Nothing here runs in the browser — the client still boots from `main.tsx`.
 */

export interface RenderResult {
  /** Markup for `<div id="root">`. */
  html: string;
  /** Serialised `<head>` tags for this route. */
  head: string;
}

/** Renders one route as it will be served. The language is set before rendering rather than
 * derived in a component, because under prerender there is no URL for i18n to read. */
export async function render(lang: SupportedLang, routePath: string): Promise<RenderResult> {
  await i18n.changeLanguage(lang);

  const location = routePath ? `/${lang}/${routePath}` : `/${lang}`;
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={location}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );

  const head = renderHeadTags(buildHeadTags(lang, routePath, i18n.getFixedT(lang)));

  return { html, head };
}

export { allRoutePairs, urlFor, SITE_URL, SUPPORTED_LANGS, DEFAULT_LANG };
export type { SupportedLang };
