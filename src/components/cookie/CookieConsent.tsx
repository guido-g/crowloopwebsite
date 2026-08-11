import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LocalizedLink } from "../common/LocalizedLink";
import { getStoredCookieConsent, storeCookieConsent, type CookieConsentValue } from "./cookieConsentStorage";
import "./CookieConsent.css";

/** TTDSG §25 opt-in banner (Section 9) — nothing non-essential loads until the visitor accepts.
 * No analytics/tracking is wired up yet, so "necessary only" and "accept all" behave the same
 * today; the storage hook is real so a future analytics/scheduling embed can gate on it. */
export function CookieConsent() {
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredCookieConsent() === null);
  }, []);

  const choose = (value: CookieConsentValue) => {
    storeCookieConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label={t("cookies.ariaLabel")}>
      <div className="cookie-consent__inner">
        <p>
          {t("cookies.message")}{" "}
          <LocalizedLink to="/datenschutz">{t("cookies.learnMore")}</LocalizedLink>
        </p>
        <div className="cookie-consent__actions">
          <button type="button" className="btn btn--ghost-light" onClick={() => choose("necessary")}>
            {t("cookies.necessaryOnly")}
          </button>
          <button type="button" className="btn btn--primary" onClick={() => choose("all")}>
            {t("cookies.acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
