import { Navigate } from "react-router-dom";
import { detectPreferredLang } from "../../i18n";

/** "/" (and any unrecognized top-level path) redirects to the browser-locale-detected
 * /en/ or /de/ entry, per Section 6's fallback/default-language rule. */
export function RootRedirect() {
  return <Navigate to={`/${detectPreferredLang()}`} replace />;
}
