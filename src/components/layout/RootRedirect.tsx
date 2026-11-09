import { Navigate, useLocation } from "react-router-dom";
import { detectPreferredLang } from "../../i18n";

/** "/" (and any lang-less path, e.g. an ad landing URL set to "/contact") redirects to the
 * browser-locale-detected /en/ or /de/ entry, per Section 6's fallback/default-language rule.
 * The path after "/" and the query string both carry over, so a lang-less deep link lands on
 * the matching page instead of the homepage, and UTM/tracking params survive the hop. */
export function RootRedirect() {
  const { pathname, search, hash } = useLocation();
  const suffix = pathname === "/" ? "" : pathname;
  return <Navigate to={`/${detectPreferredLang()}${suffix}${search}${hash}`} replace />;
}
