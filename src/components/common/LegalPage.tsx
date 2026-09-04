import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { LocalizedLink } from "./LocalizedLink";

interface LegalSubsection {
  heading: string;
  body: string[];
}

interface LegalSection {
  heading: string;
  body?: string | string[];
  subsections?: LegalSubsection[];
}

interface LegalPageProps {
  pageKey: "impressum" | "datenschutz" | "haftungsausschluss" | "agb";
}

const REAL_CONTENT_PAGES: LegalPageProps["pageKey"][] = ["impressum", "datenschutz", "agb"];

/** Matches Markdown-style [text](/path) so a paragraph can link out (e.g. an AGB clause pointing
 * to the Datenschutzerklärung) without needing react-i18next's Trans component for one link. */
const INLINE_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderParagraph(text: string, key: number): ReactNode {
  if (!text.includes("](")) return <p key={key}>{text}</p>;

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let linkIndex = 0;
  for (const match of text.matchAll(INLINE_LINK)) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    nodes.push(
      <LocalizedLink key={linkIndex++} to={match[2]}>
        {match[1]}
      </LocalizedLink>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return <p key={key}>{nodes}</p>;
}

function renderBody(body: string | string[] | undefined): ReactNode {
  if (!body) return null;
  const paragraphs = Array.isArray(body) ? body : [body];
  return paragraphs.map((paragraph, index) => renderParagraph(paragraph, index));
}

/**
 * Shared shell for the four footer-only legal pages (Section 9) — plain, compliant copy, no
 * Russell voice. Haftungsausschluss is still placeholder/blindtext until real legal text is
 * organized separately, so it keeps the placeholder banner. Impressum, Datenschutzerklärung, and
 * AGB have real content (a few Impressum fields — VAT ID — still pending final setup, tracked in
 * README), so they skip the placeholder banner.
 * A section is either flat (`body`, string or string[]) or grouped into named `subsections`
 * (used by Datenschutzerklärung's numbered structure); each subsection's `body` is one or more
 * paragraphs.
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
            {renderBody(section.body)}
            {section.subsections?.map((sub) => (
              <div className="legal-page__subsection" key={sub.heading}>
                <h3>{sub.heading}</h3>
                {sub.body.map((paragraph, index) => renderParagraph(paragraph, index))}
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
