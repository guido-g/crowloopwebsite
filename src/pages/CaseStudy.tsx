import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProjectBySlug } from "../data/portfolio";
import { LocalizedLink } from "../components/common/LocalizedLink";
import { YouTubeEmbed } from "../components/media/YouTubeEmbed";
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
        {project.coverImage && (
          <div className="container">
            <img
              className="case-study-header__cover"
              src={project.coverImage}
              alt={t(project.nameKey)}
              loading="eager"
              style={project.coverPosition ? { objectPosition: project.coverPosition } : undefined}
            />
          </div>
        )}
      </section>

      <section className="section">
        <div className={`container case-study-layout${project.youtubeId ? " case-study-layout--with-video" : ""}`}>
          <div className="case-study-body">
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
          </div>

          {project.youtubeId && (
            <aside className="case-study-video">
              <YouTubeEmbed videoId={project.youtubeId} title={t(project.nameKey)} />
            </aside>
          )}
        </div>

        <div className="container case-study-body">
          {project.gallery && project.gallery.length > 0 && (
            <div className="case-study-gallery">
              {project.gallery.map((src) => (
                <img key={src} src={src} alt="" loading="lazy" />
              ))}
            </div>
          )}

          <p className="case-study-framing-note">{t("caseStudy.framingNote")}</p>

          <LocalizedLink to="/portfolio" className="btn btn--ghost-dark">
            {t("caseStudy.backToPortfolio")}
          </LocalizedLink>
        </div>
      </section>
    </>
  );
}
