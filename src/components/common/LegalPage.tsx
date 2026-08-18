import { useTranslation } from "react-i18next";

interface LegalSection {
  heading: string;
  body: string;
}

interface LegalPageProps {
  pageKey: "impressum" | "datenschutz" | "haftungsausschluss" | "agb";
}

/**
 * Shared shell for the four footer-only legal pages (Section 9) — plain, compliant copy, no
 * Russel voice. Datenschutz/Haftungsausschluss/AGB are still placeholder/blindtext until real
 * legal text is organized separately; Impressum has real content (VAT ID/email/site URL still
 * pending final setup — tracked in README), so it skips the placeholder banner.
 */
export function LegalPage({ pageKey }: LegalPageProps) {
  const { t } = useTranslation("legal");
  const sections = t(`${pageKey}.sections`, { returnObjects: true }) as LegalSection[];

  return (
    <section className="section legal-page">
      <div className="container legal-page__inner">
        <h1>{t(`${pageKey}.title`)}</h1>
        {pageKey !== "impressum" && (
          <p className="legal-page__placeholder-note">{t("placeholderNote")}</p>
        )}
        {sections.map((section) => (
          <article key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
