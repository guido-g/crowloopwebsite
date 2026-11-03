import { Fragment, useState, type ReactNode } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProjectBySlug, type Project, type StoryGalleryGroup } from "../data/portfolio";
import { LocalizedLink } from "../components/common/LocalizedLink";
import { BeforeAfterSlider } from "../components/media/BeforeAfterSlider";
import { Lightbox } from "../components/media/Lightbox";
import { YouTubeEmbed } from "../components/media/YouTubeEmbed";
import { useLangPath } from "../hooks/useLangPath";

/** Gallery thumbs are capped at 800px; the lightbox opens the "-full" derivative generated
 * alongside it (native resolution, see scripts/optimize-images.mjs) for the highest-res view. */
const toFullRes = (src: string) => src.replace(/\.webp$/, "-full.webp");

/** Minimal inline markdown for case-study body text: **bold** and [label](url). Just enough to
 * reproduce source articles (Section 4.2 addendum) without pulling in a full markdown renderer. */
const INLINE_MARKDOWN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text: string): ReactNode[] {
  return text.split(INLINE_MARKDOWN).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer">
          {link[1]}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

const ORDERED_ITEM = /^\d+\.\s+/;
const UNORDERED_ITEM = /^-\s+/;

/** Case-study body text is a single i18n string holding one or more "\n\n"-separated blocks.
 * A block whose every line starts with "- " or "1. " renders as a list; otherwise it's a
 * paragraph. Both support inline **bold** and [link](url) (see `renderInline`). */
function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((block, index) => {
        const lines = block.split("\n").filter(Boolean);
        const ordered = lines.length > 0 && lines.every((l) => ORDERED_ITEM.test(l));
        const unordered = lines.length > 0 && lines.every((l) => UNORDERED_ITEM.test(l));
        if (ordered || unordered) {
          const ListTag = ordered ? "ol" : "ul";
          return (
            <ListTag key={index}>
              {lines.map((line, i) => (
                <li key={i}>{renderInline(line.replace(ordered ? ORDERED_ITEM : UNORDERED_ITEM, ""))}</li>
              ))}
            </ListTag>
          );
        }
        return <p key={index}>{renderInline(block)}</p>;
      })}
    </>
  );
}

/** One or more images shown in a row with a caption (shared, or one per image — see
 * `StoryGalleryGroup`). Used both for the plain `storyGallery` and for inline figure blocks. */
function FigureGroup({
  group,
  t,
  onExpand,
}: {
  group: StoryGalleryGroup;
  t: (key: string) => string;
  onExpand: (src: string) => void;
}) {
  const sharedCaption = group.captionKeys.length === 1;
  return (
    <figure className="case-study-story-group">
      <div
        className={`case-study-story-group__images${group.images.length > 1 ? " case-study-story-group__images--row" : ""}`}
      >
        {group.images.map((src, i) => (
          <div className="case-study-story-group__item" key={src}>
            <button
              type="button"
              className="case-study-gallery__item"
              onClick={() => onExpand(toFullRes(src))}
              aria-label={t("caseStudy.expandImage")}
            >
              <img src={src} alt={group.alt[i] ?? ""} loading="lazy" />
            </button>
            {!sharedCaption && <figcaption>{t(group.captionKeys[i])}</figcaption>}
          </div>
        ))}
      </div>
      {sharedCaption && <figcaption>{t(group.captionKeys[0])}</figcaption>}
    </figure>
  );
}

/** Thin wrapper around BeforeAfterSlider that fills in alt/label text from the project and the
 * shared "before"/"after" i18n strings — lets both the article blocks and the simple-mode
 * layout place the same slider without repeating this plumbing. */
function BeforeAfterComparison({ project, t }: { project: Project; t: (key: string) => string }) {
  if (!project.beforeAfter) return null;
  return (
    <BeforeAfterSlider
      beforeSrc={project.beforeAfter.before}
      afterSrc={project.beforeAfter.after}
      beforeAlt={`${t(project.nameKey)} — ${t("caseStudy.before")}`}
      afterAlt={`${t(project.nameKey)} — ${t("caseStudy.after")}`}
      beforeLabel={t("caseStudy.before")}
      afterLabel={t("caseStudy.after")}
    />
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
            {caseStudy.blocks && caseStudy.blocks.length > 0 ? (
              <article>
                {caseStudy.blocks.map((block, index) => {
                  if (block.kind === "heading") return <h2 key={index}>{t(block.textKey)}</h2>;
                  if (block.kind === "text") return <Paragraphs key={index} text={t(block.textKey)} />;
                  if (block.kind === "beforeAfter")
                    return <BeforeAfterComparison key={index} project={project} t={t} />;
                  return (
                    <FigureGroup key={index} group={block.group} t={t} onExpand={setLightboxSrc} />
                  );
                })}
              </article>
            ) : (
              <>
                <article>
                  <h2>{t("caseStudy.challenge")}</h2>
                  <Paragraphs text={t(caseStudy.challengeKey!)} />
                </article>
                <article>
                  <h2>{t("caseStudy.decision")}</h2>
                  <Paragraphs text={t(caseStudy.decisionKey!)} />
                </article>
                <article>
                  <h2>{t("caseStudy.outcome")}</h2>
                  <Paragraphs text={t(caseStudy.outcomeKey!)} />
                </article>
              </>
            )}
          </div>

          {project.youtubeId && (
            <aside className="case-study-video">
              <YouTubeEmbed videoId={project.youtubeId} title={t(project.nameKey)} />
            </aside>
          )}
        </div>

        <div className="container case-study-body">
          {/* Article mode (caseStudy.blocks) places its own "beforeAfter" block where it wants
           * the slider; simple mode has no such placement, so it always goes here. */}
          {!caseStudy.blocks && project.beforeAfter && (
            <BeforeAfterComparison project={project} t={t} />
          )}

          {project.storyGallery && project.storyGallery.length > 0 ? (
            <div className="case-study-story-gallery">
              {project.storyGallery.map((group, groupIndex) => (
                <FigureGroup key={groupIndex} group={group} t={t} onExpand={setLightboxSrc} />
              ))}
            </div>
          ) : (
            project.gallery &&
            project.gallery.length > 0 && (
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
            )
          )}

          {!project.hideFramingNote && (
            <p className="case-study-framing-note">{t("caseStudy.framingNote")}</p>
          )}

          <div className="case-study-actions">
            <LocalizedLink to="/portfolio" className="btn btn--ghost-dark">
              {t("caseStudy.backToPortfolio")}
            </LocalizedLink>
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                {t("caseStudy.playLink")} ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {lightboxSrc && (
        <Lightbox src={lightboxSrc} alt={t(project.nameKey)} onClose={() => setLightboxSrc(null)} />
      )}
    </>
  );
}
