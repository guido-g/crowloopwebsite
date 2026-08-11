import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProjectBySlug } from "../data/portfolio";
import { LocalizedLink } from "../components/common/LocalizedLink";
import { useLangPath } from "../hooks/useLangPath";

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation(["portfolio", "common"]);
  const langPath = useLangPath();
  const project = getProjectBySlug(slug);

  if (!project || !project.caseStudy) {
    return <Navigate to={langPath("/portfolio")} replace />;
  }

  const { caseStudy } = project;

  return (
    <>
      <section
        className={`section section--navy case-study-header case-study-header--${project.colorway}`}
      >
        <div className="container">
          <LocalizedLink to="/portfolio" className="case-study-back">
            ← {t("caseStudy.back")}
          </LocalizedLink>
          <p className="eyebrow">{project.brand}</p>
          <h1>{t(project.nameKey)}</h1>
          <p className="case-study-header__description">{t(project.descriptionKey)}</p>
        </div>
      </section>

      <section className="section">
        <div className="container case-study-body">
          <article>
            <h2>{t("caseStudy.challenge")}</h2>
            <p>{t(caseStudy.challengeKey)}</p>
          </article>
          <article>
            <h2>{t("caseStudy.decision")}</h2>
            <p>{t(caseStudy.decisionKey)}</p>
          </article>
          <article>
            <h2>{t("caseStudy.outcome")}</h2>
            <p>{t(caseStudy.outcomeKey)}</p>
          </article>

          <p className="case-study-framing-note">{t("caseStudy.framingNote")}</p>

          <LocalizedLink to="/portfolio" className="btn btn--ghost-dark">
            {t("caseStudy.backToPortfolio")}
          </LocalizedLink>
        </div>
      </section>
    </>
  );
}
