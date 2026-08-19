import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProjectBySlug } from "../data/portfolio";
import { LocalizedLink } from "../components/common/LocalizedLink";
import { Lightbox } from "../components/media/Lightbox";
import { YouTubeEmbed } from "../components/media/YouTubeEmbed";
import { useLangPath } from "../hooks/useLangPath";

/** Gallery thumbs are capped at 800px; the lightbox opens the "-full" derivative generated
 * alongside it (native resolution, see scripts/optimize-images.mjs) for the highest-res view. */
const toFullRes = (src: string) => src.replace(/\.webp$/, "-full.webp");

/** Case-study body text is a single i18n string that may hold multiple paragraphs separated by
 * a blank line — rendered as one <p> each rather than one <p> holding everything. */
function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </>
  );
}

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation(["portfolio", "common"]);
  const langPath = useLangPath();
  const project = getProjectBySlug(slug);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

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
              <Paragraphs text={t(caseStudy.challengeKey)} />
            </article>
            <article>
              <h2>{t("caseStudy.decision")}</h2>
              <Paragraphs text={t(caseStudy.decisionKey)} />
            </article>
            <article>
              <h2>{t("caseStudy.outcome")}</h2>
              <Paragraphs text={t(caseStudy.outcomeKey)} />
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
                <button
                  key={src}
                  type="button"
                  className="case-study-gallery__item"
                  onClick={() => setLightboxSrc(toFullRes(src))}
                  aria-label={t("caseStudy.expandImage")}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}

          <p className="case-study-framing-note">{t("caseStudy.framingNote")}</p>

          <LocalizedLink to="/portfolio" className="btn btn--ghost-dark">
            {t("caseStudy.backToPortfolio")}
          </LocalizedLink>
        </div>
      </section>

      {lightboxSrc && (
        <Lightbox src={lightboxSrc} alt={t(project.nameKey)} onClose={() => setLightboxSrc(null)} />
      )}
    </>
  );
}
