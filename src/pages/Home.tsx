import { useTranslation } from "react-i18next";
import { RusselHero } from "../components/russel/RusselHero";
import { RusselGuide } from "../components/russel/RusselGuide";
import { StatStrip } from "../components/cards/StatStrip";
import { ServiceCard } from "../components/cards/ServiceCard";
import { ProjectCard } from "../components/cards/ProjectCard";
import { SectionHeading } from "../components/common/SectionHeading";
import { LocalizedLink } from "../components/common/LocalizedLink";
import { SERVICES } from "../data/services";
import { getFeaturedProjects } from "../data/portfolio";
import { BRAND_LOGOS } from "../data/references";

export function Home() {
  const { t } = useTranslation(["home", "common"]);
  const featuredProjects = getFeaturedProjects(3);

  const stats = [
    { value: t("proof.years"), label: t("proof.yearsLabel") },
    { value: t("proof.games"), label: t("proof.gamesLabel") },
    { value: t("proof.brands"), label: t("proof.brandsLabel") },
    { value: t("proof.team"), label: t("proof.teamLabel") },
  ];

  return (
    <>
      <section className="section section--navy hero">
        <img className="hero__backdrop" src="/brand/hero/HeroImage.png" alt="" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__row">
            <h1 className="hero__headline">{t("hero.headline")}</h1>
            <RusselHero />
          </div>
          <LocalizedLink to="/contact" className="btn btn--primary">
            {t("nav.startProject", { ns: "common" })}
          </LocalizedLink>
          <p className="hero__subhead">{t("hero.subhead")}</p>
        </div>
      </section>

      <section className="section brands-strip">
        <div className="container">
          <p className="eyebrow">{t("brands.eyebrow")}</p>
          <ul className="brands-strip__list">
            {BRAND_LOGOS.map((brand) => (
              <li key={brand.id}>
                <img src={brand.src} alt={brand.name} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--navy proof-strip">
        <div className="container">
          <StatStrip stats={stats} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={t("services.eyebrow")} title={t("services.title")} lede={t("services.lede")} />
          <div className="card-grid card-grid--4">
            {SERVICES.slice(0, 4).map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} compact />
            ))}
          </div>
          <div className="section__cta">
            <LocalizedLink to="/services" className="btn btn--ghost-dark">
              {t("services.cta")}
            </LocalizedLink>
          </div>
        </div>
      </section>

      <section className="section section--slate">
        <div className="container">
          <SectionHeading
            eyebrow={t("portfolio.eyebrow")}
            title={t("portfolio.title")}
            lede={t("portfolio.lede")}
          />
          <div className="card-grid card-grid--3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="section__cta">
            <LocalizedLink to="/portfolio" className="btn btn--ghost-light">
              {t("portfolio.cta")}
            </LocalizedLink>
          </div>
        </div>
      </section>

      <section className="section section--navy-deep closing-cta">
        <div className="container closing-cta__inner">
          <RusselGuide pose="pointing" message={t("closingCta.russel")} size="lg" />
          <LocalizedLink to="/contact" className="btn btn--primary">
            {t("nav.startProject", { ns: "common" })}
          </LocalizedLink>
        </div>
      </section>
    </>
  );
}
