import { useTranslation } from "react-i18next";
import { SectionHeading } from "../components/common/SectionHeading";
import { ServiceCard } from "../components/cards/ServiceCard";
import { RusselGuide } from "../components/russel/RusselGuide";
import { SERVICES } from "../data/services";

export function Services() {
  const { t } = useTranslation(["services", "common"]);

  return (
    <>
      <section className="section section--slate">
        <div className="container">
          <SectionHeading as="h1" eyebrow={t("eyebrow")} title={t("title")} lede={t("lede")} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card-grid card-grid--3">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container capacity-model">
          <div>
            <h2>{t("capacity.title")}</h2>
            <p>{t("capacity.body")}</p>
          </div>
          <RusselGuide pose="pointing" message={t("capacity.russel")} side="right" />
        </div>
      </section>
    </>
  );
}
