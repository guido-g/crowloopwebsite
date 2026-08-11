import { useTranslation } from "react-i18next";
import type { Project } from "../../data/portfolio";
import { LocalizedLink } from "../common/LocalizedLink";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
}

/** variant is derived from the project data itself (type / isCaseStudy) rather than passed in,
 * so the grid stays a pure data → UI mapping (Section 6: swapping reference → Crow Loop is a
 * data edit, not a rebuild). */
export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation(["portfolio", "common"]);

  return (
    <article className={`project-card project-card--${project.colorway}`}>
      <div className="project-card__thumb" aria-hidden="true">
        {project.coverImage ? (
          <img src={project.coverImage} alt="" loading="lazy" />
        ) : (
          <span>{project.brand}</span>
        )}
      </div>

      <div className="project-card__body">
        <div className="project-card__badges">
          {project.isCaseStudy && <span className="tag tag--case-study">{t("badges.caseStudy")}</span>}
          {project.type === "reference" ? (
            <span className="tag tag--reference">{t("badges.reference")}</span>
          ) : (
            <span className="tag tag--crowloop">{t("badges.crowloop")}</span>
          )}
        </div>

        <h3>{t(project.nameKey)}</h3>
        <p className="project-card__brand">{project.brand}</p>
        <p className="project-card__description">{t(project.descriptionKey)}</p>

        <ul className="project-card__tags">
          <li>{project.tags.audience}</li>
          <li>{project.tags.genre}</li>
          <li>{project.tags.platform}</li>
        </ul>

        {project.isCaseStudy ? (
          <LocalizedLink to={`/portfolio/${project.slug}`} className="project-card__cta">
            {t("readCaseStudy")} →
          </LocalizedLink>
        ) : (
          project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__cta"
            >
              {t("viewReference")} ↗
            </a>
          )
        )}
      </div>
    </article>
  );
}
