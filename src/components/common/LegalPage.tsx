import { useTranslation } from "react-i18next";

interface LegalSubsection {
  heading: string;
  body: string[];
}

interface LegalSection {
  heading: string;
  body?: string;
  subsections?: LegalSubsection[];
}

interface LegalPageProps {
  pageKey: "impressum" | "datenschutz" | "haftungsausschluss" | "agb";
}

const REAL_CONTENT_PAGES: LegalPageProps["pageKey"][] = ["impressum", "datenschutz"];

/**
 * Shared shell for the four footer-only legal pages (Section 9) — plain, compliant copy, no
 * Russel voice. Haftungsausschluss/AGB are still placeholder/blindtext until real legal text is
 * organized separately; Impressum and Datenschutzerklärung have real content (a few fields —
 * VAT ID/email/site URL/third-party services — still pending final setup, tracked in README),
 * so they skip the placeholder banner. A section is either flat (`body`) or grouped into named
 * `subsections` (used by Datenschutzerklärung's numbered structure); each subsection's `body` is
 * one or more paragraphs.
 */
export function LegalPage({ pageKey }: LegalPageProps) {
  const { t } = useTranslation("legal");
  const sections = t(`${pageKey}.sections`, { returnObjects: true }) as LegalSection[];

  return (
    <section className="section legal-page">
      <div className="container legal-page__inner">
        <h1>{t(`${pageKey}.title`)}</h1>
        {!REAL_CONTENT_PAGES.includes(pageKey) && (
          <p className="legal-page__placeholder-note">{t("placeholderNote")}</p>
        )}
        {sections.map((section) => (
          <article key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body && <p>{section.body}</p>}
            {section.subsections?.map((sub) => (
              <div className="legal-page__subsection" key={sub.heading}>
                <h3>{sub.heading}</h3>
                {sub.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
