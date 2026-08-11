import { useTranslation } from "react-i18next";
import { SectionHeading } from "../components/common/SectionHeading";
import { StatStrip } from "../components/cards/StatStrip";
import { RusselGuide } from "../components/russel/RusselGuide";
import { LocalizedLink } from "../components/common/LocalizedLink";
import { PROFESSIONAL_REFERENCES } from "../data/references";

export function About() {
  const { t } = useTranslation(["about", "common"]);

  const stats = [
    { value: t("stats.years"), label: t("stats.yearsLabel") },
    { value: t("stats.projects"), label: t("stats.projectsLabel") },
    { value: t("stats.games"), label: t("stats.gamesLabel") },
    { value: t("stats.team"), label: t("stats.teamLabel") },
  ];

  return (
    <>
      <section className="section section--slate">
        <div className="container">
          <SectionHeading as="h1" eyebrow={t("eyebrow")} title={t("title")} lede={t("intro")} />
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div>
            <h2>{t("story.title")}</h2>
            <p>{t("story.p1")}</p>
            <p>{t("story.p2")}</p>

            <h2>{t("flyingSheep.title")}</h2>
            <p>{t("flyingSheep.body")}</p>
            <p>{t("superRtl.body")}</p>

            <h2>{t("pov.title")}</h2>
            <p>{t("pov.body")}</p>

            <p className="about-in-production">{t("inProductionEcho")}</p>
          </div>

          <div className="about-sidebar">
            <StatStrip stats={stats} />
            <RusselGuide pose="excited" message={t("russelOrigin")} className="about-russel-aside" />
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <SectionHeading title={t("references.title")} lede={t("references.intro")} />
          <div className="card-grid card-grid--3">
            {PROFESSIONAL_REFERENCES.map((reference) => (
              <blockquote key={reference.id} className="reference-quote">
                <p>“{t(reference.quoteKey)}”</p>
                <footer>
                  <span className="reference-quote__name">{reference.name}</span>
                  <span className="reference-quote__role">{t(reference.roleKey)}</span>
                </footer>
              </blockquote>
            ))}
          </div>
          <p className="reference-quote__note">{t("references.signoffNote")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <LocalizedLink to="/contact" className="btn btn--primary">
            {t("nav.startProject", { ns: "common" })}
          </LocalizedLink>
        </div>
      </section>
    </>
  );
}
