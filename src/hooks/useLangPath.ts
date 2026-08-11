import { useParams } from "react-router-dom";
import { DEFAULT_LANG, isSupportedLang } from "../i18n";

/** Builds an internal href that keeps the current /en|de/ prefix, e.g. useLangPath()("/contact"). */
export function useLangPath() {
  const { lang } = useParams<{ lang: string }>();
  const current = isSupportedLang(lang) ? lang : DEFAULT_LANG;
  return (path: string) => `/${current}${path.startsWith("/") ? path : `/${path}`}`;
}
