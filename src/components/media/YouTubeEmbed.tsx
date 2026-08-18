import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getStoredCookieConsent,
  onCookieConsentChange,
  storeCookieConsent,
  type CookieConsentValue,
} from "../cookie/cookieConsentStorage";
import "./YouTubeEmbed.css";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

/** Gated on cookie consent (Datenschutz §5 "YouTube with extended data protection") — the iframe
 * only loads once the visitor has accepted, and uses youtube-nocookie.com to match that section's
 * claim of extended data-protection mode. */
export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const { t } = useTranslation("common");
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);

  useEffect(() => {
    setConsent(getStoredCookieConsent());
    return onCookieConsentChange(setConsent);
  }, []);

  return (
    <div className="youtube-embed">
      {consent === "all" ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div className="youtube-embed__consent">
          <p>{t("cookies.videoBlocked")}</p>
          <button type="button" className="btn btn--primary" onClick={() => storeCookieConsent("all")}>
            {t("cookies.acceptAll")}
          </button>
        </div>
      )}
    </div>
  );
}
