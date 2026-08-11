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

import deCommon from "./locales/de/common.json";
import deHome from "./locales/de/home.json";
import dePortfolio from "./locales/de/portfolio.json";
import deAbout from "./locales/de/about.json";
import deServices from "./locales/de/services.json";
import deProcess from "./locales/de/process.json";
import deTestimonials from "./locales/de/testimonials.json";
import deContact from "./locales/de/contact.json";
import deLegal from "./locales/de/legal.json";

export const SUPPORTED_LANGS = ["en", "de"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: SupportedLang = "en";

export function isSupportedLang(value: string | undefined): value is SupportedLang {
  return !!value && (SUPPORTED_LANGS as readonly string[]).includes(value);
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
    },
  },
  lng: DEFAULT_LANG,
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
  ],
  interpolation: { escapeValue: false },
  returnEmptyString: false,
});

export default i18n;
