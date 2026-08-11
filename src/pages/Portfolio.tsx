import { useMemo, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "../components/common/SectionHeading";
import { ProjectCard } from "../components/cards/ProjectCard";
import { RusselGuide } from "../components/russel/RusselGuide";
import { PROJECTS } from "../data/portfolio";

type TypeFilter = "all" | "case-study" | "reference";

export function Portfolio() {
  const { t } = useTranslation(["portfolio", "common"]);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [audienceFilter, setAudienceFilter] = useState<string>("all");

  const audiences = useMemo(
    () => Array.from(new Set(PROJECTS.map((project) => project.tags.audience))).sort(),
    [],
  );

  const filtered = PROJECTS.filter((project) => {
    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "case-study" && project.isCaseStudy) ||
      (typeFilter === "reference" && project.type === "reference" && !project.isCaseStudy);
    const matchesAudience = audienceFilter === "all" || project.tags.audience === audienceFilter;
    return matchesType && matchesAudience;
  });

  return (
    <>
      <section className="section section--slate">
        <div className="container">
          <SectionHeading as="h1" eyebrow={t("eyebrow")} title={t("title")} lede={t("lede")} />
          <RusselGuide pose="normal" message={t("inProductionNote")} className="portfolio-note" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="portfolio-filters">
            <div className="portfolio-filters__group" role="group" aria-label={t("filters.typeLabel")}>
              <FilterButton active={typeFilter === "all"} onClick={() => setTypeFilter("all")}>
                {t("filters.all")}
              </FilterButton>
              <FilterButton active={typeFilter === "case-study"} onClick={() => setTypeFilter("case-study")}>
                {t("filters.caseStudies")}
              </FilterButton>
              <FilterButton active={typeFilter === "reference"} onClick={() => setTypeFilter("reference")}>
                {t("filters.reference")}
              </FilterButton>
            </div>

            <label className="portfolio-filters__select">
              <span>{t("filters.audienceLabel")}</span>
              <select value={audienceFilter} onChange={(event) => setAudienceFilter(event.target.value)}>
                <option value="all">{t("filters.allAudiences")}</option>
                {audiences.map((audience) => (
                  <option key={audience} value={audience}>
                    {audience}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filtered.length > 0 ? (
            <div className="card-grid card-grid--3">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <p className="portfolio-empty">{t("filters.empty")}</p>
          )}
        </div>
      </section>
    </>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" className={`filter-btn${active ? " is-active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}
