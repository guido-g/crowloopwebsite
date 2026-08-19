import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center" | "crow";
  as?: "h1" | "h2";
  /** Only used when align="crow" — rendered beside the text on desktop, below it on mobile.
   * Pass a <RusselGuide position="below" .../>. */
  russel?: ReactNode;
}

export function SectionHeading({ eyebrow, title, lede, align = "left", as = "h2", russel }: SectionHeadingProps) {
  const Heading = as;
  return (
    <div className={`section-heading section-heading--${align}`}>
      <div className="section-heading__text">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <Heading>{title}</Heading>
        {lede && <p className="section-heading__lede">{lede}</p>}
      </div>
      {align === "crow" && russel}
    </div>
  );
}
