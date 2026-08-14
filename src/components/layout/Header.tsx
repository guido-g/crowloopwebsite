import { useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LocalizedLink } from "../common/LocalizedLink";
import { DEFAULT_LANG, isSupportedLang, SUPPORTED_LANGS, type SupportedLang } from "../../i18n";
import "./Header.css";

const NAV_ITEMS: { to: string; key: string }[] = [
  { to: "/", key: "nav.home" },
  { to: "/portfolio", key: "nav.portfolio" },
  { to: "/services", key: "nav.services" },
  { to: "/process", key: "nav.process" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];

export function Header() {
  const { t } = useTranslation("common");
  const { lang } = useParams<{ lang: string }>();
  const currentLang = isSupportedLang(lang) ? lang : DEFAULT_LANG;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <LocalizedLink to="/" className="site-header__brand" onClick={() => setMenuOpen(false)}>
          <img src="/brand/logo/CLS_Logo_Main.webp" alt={t("brandName")} height={48} />
        </LocalizedLink>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="visually-hidden">{t("nav.toggleMenu")}</span>
          <span className="site-header__toggle-bars" aria-hidden="true" />
        </button>

        <nav
          id="primary-nav"
          className={`site-header__nav${menuOpen ? " is-open" : ""}`}
          aria-label={t("nav.primaryAriaLabel")}
        >
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={`/${currentLang}${item.to === "/" ? "" : item.to}`}
                  end={item.to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => (isActive ? "is-active" : undefined)}
                >
                  {t(item.key)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="site-header__lang" role="group" aria-label={t("nav.languageAriaLabel")}>
            {SUPPORTED_LANGS.map((code) => (
              <LocalizedLangLink key={code} code={code} current={currentLang} />
            ))}
          </div>

          <LocalizedLink to="/contact" className="btn btn--primary site-header__cta" onClick={() => setMenuOpen(false)}>
            {t("nav.startProject")}
          </LocalizedLink>
        </nav>
      </div>
    </header>
  );
}

function LocalizedLangLink({ code, current }: { code: SupportedLang; current: SupportedLang }) {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  segments[0] = code;
  const href = `/${segments.join("/")}${location.search}`;
  return (
    <Link
      to={href}
      aria-current={current === code ? "true" : undefined}
      className={current === code ? "is-active" : undefined}
    >
      {code.toUpperCase()}
    </Link>
  );
}
