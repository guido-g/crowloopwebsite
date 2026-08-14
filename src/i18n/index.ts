import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enPortfolio from "./locales/en/portfolio.json";
import enAbout from "./locales/en/about.json";
import enServices from "./locales/en/services.json";
import enProcess from "./locales/en/process.json";
import enTestimonials from "./locales/en/testimonials.json";
import enContact from "./locales/en/contact.json";
import enLegal from "./locales/en/legal.json";
import enSeo from "./locales/en/seo.json";

import deCommon from "./locales/de/common.json";
import deHome from "./locales/de/home.json";
import dePortfolio from "./locales/de/portfolio.json";
import deAbout from "./locales/de/about.json";
import deServices from "./locales/de/services.json";
import deProcess from "./locales/de/process.json";
import deTestimonials from "./locales/de/testimonials.json";
import deContact from "./locales/de/contact.json";
import deLegal from "./locales/de/legal.json";
import deSeo from "./locales/de/seo.json";

export const SUPPORTED_LANGS = ["en", "de"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: SupportedLang = "en";

export function isSupportedLang(value: string | undefined): value is SupportedLang {
  return !!value && (SUPPORTED_LANGS as readonly string[]).includes(value);
}

/**
 * The URL's `:lang` segment is the source of truth for language, so it has to be read here at
 * init rather than corrected later in an effect: initialising with a fixed `"en"` made
 * `/de/portfolio` paint English for one frame, and left the served `<html lang>` wrong until
 * JS ran. Returns the default under SSR/prerender, where the renderer sets the language
 * explicitly per route.
 */
function langFromPathname(): SupportedLang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const [, segment] = window.location.pathname.split("/");
  return isSupportedLang(segment) ? segment : DEFAULT_LANG;
}

/** Browser-locale detection for the bare "/" entry route only — all other
 * navigation is driven by the URL's :lang segment (Section 6: path-based
 * routing for SEO, English fallback/default). */
export function detectPreferredLang(): SupportedLang {
  if (typeof navigator === "undefined") return DEFAULT_LANG;
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  const hasGerman = candidates.some((locale) => locale?.toLowerCase().startsWith("de"));
  return hasGerman ? "de" : DEFAULT_LANG;
}

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      home: enHome,
      portfolio: enPortfolio,
      about: enAbout,
      services: enServices,
      process: enProcess,
      testimonials: enTestimonials,
      contact: enContact,
      legal: enLegal,
      seo: enSeo,
    },
    de: {
      common: deCommon,
      home: deHome,
      portfolio: dePortfolio,
      about: deAbout,
      services: deServices,
      process: deProcess,
      testimonials: deTestimonials,
      contact: deContact,
      legal: deLegal,
      seo: deSeo,
    },
  },
  lng: langFromPathname(),
  fallbackLng: DEFAULT_LANG,
  defaultNS: "common",
  ns: [
    "common",
    "home",
    "portfolio",
    "about",
    "services",
    "process",
    "testimonials",
    "contact",
    "legal",
    "seo",
  ],
  interpolation: { escapeValue: false },
  returnEmptyString: false,
});

/** Matches `<html lang>` to the language the URL asked for before React's first paint.
 * `Layout` keeps it in sync afterwards, when the visitor uses the language switcher. */
if (typeof document !== "undefined") {
  document.documentElement.lang = i18n.language;
}

export default i18n;
