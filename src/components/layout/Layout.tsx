import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { detectPreferredLang, isSupportedLang } from "../../i18n";
import { Seo } from "../../seo/Seo";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieConsent } from "../cookie/CookieConsent";

export function Layout() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n, t } = useTranslation("common");
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (isSupportedLang(lang)) {
      void i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
    }
  }, [lang, i18n]);

  if (!isSupportedLang(lang)) {
    // `:lang` only exists as a route param because something — an ad's lang-less landing
    // URL ("/contact"), a stray link — matched this route without a real language segment.
    // The rest of `pathname` is that intended page, so it carries over instead of being
    // dropped on the floor along with the query string (UTM params, etc.).
    return <Navigate to={`/${detectPreferredLang()}${pathname}${search}${hash}`} replace />;
  }

  return (
    <>
      <Seo lang={lang} />
      <a className="skip-link" href="#main-content">
        {t("skipToContent")}
      </a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
