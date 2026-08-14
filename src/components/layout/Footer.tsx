import { useTranslation } from "react-i18next";
import { LocalizedLink } from "../common/LocalizedLink";
import "./Footer.css";

const LEGAL_LINKS: { to: string; key: string }[] = [
  { to: "/impressum", key: "footer.impressum" },
  { to: "/datenschutz", key: "footer.datenschutz" },
  { to: "/haftungsausschluss", key: "footer.haftungsausschluss" },
  { to: "/agb", key: "footer.agb" },
];

export function Footer() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <img src="/brand/logo/CLS_Logo_white.webp" alt={t("brandName")} height={40} />
          <p>{t("footer.tagline")}</p>
          <p className="site-footer__est">
            {t("footer.est")} · © {year}
          </p>
        </div>

        <nav className="site-footer__legal" aria-label={t("footer.legalAriaLabel")}>
          <ul>
            {LEGAL_LINKS.map((link) => (
              <li key={link.to}>
                <LocalizedLink to={link.to}>{t(link.key)}</LocalizedLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__association">
          <span className="site-footer__association-badge" aria-hidden="true">
            game
          </span>
          <p>{t("footer.associationStatus")}</p>
        </div>
      </div>
    </footer>
  );
}
