import { useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isSupportedLang } from "../../i18n";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieConsent } from "../cookie/CookieConsent";

export function Layout() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n, t } = useTranslation("common");

  useEffect(() => {
    if (isSupportedLang(lang)) {
      void i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
    }
  }, [lang, i18n]);

  if (!isSupportedLang(lang)) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
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
