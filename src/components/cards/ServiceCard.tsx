import { useTranslation } from "react-i18next";
import type { Service } from "../../data/services";
import { LocalizedLink } from "../common/LocalizedLink";
import "./ServiceCard.css";

interface ServiceCardProps {
  service: Service;
  index: number;
  /** Home teaser cards are shorter (title + summary only); Services page shows the full spec. */
  compact?: boolean;
}

export function ServiceCard({ service, index, compact = false }: ServiceCardProps) {
  const { t } = useTranslation(["services", "common"]);

  return (
    <article className="service-card">
      <span className="service-card__index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3>{t(service.titleKey)}</h3>
      <p className="service-card__summary">{t(service.summaryKey)}</p>

      {!compact && (
        <dl className="service-card__meta">
          <div>
            <dt>{t("labels.whoFor")}</dt>
            <dd>{t(service.forKey)}</dd>
          </div>
          <div>
            <dt>{t("labels.whatDoneLooksLike")}</dt>
            <dd>{t(service.doneKey)}</dd>
          </div>
        </dl>
      )}

      <LocalizedLink to="/contact" className="service-card__cta">
        {t("nav.startProject", { ns: "common" })} →
      </LocalizedLink>
    </article>
  );
}
