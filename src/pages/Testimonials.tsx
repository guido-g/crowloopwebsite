import { useTranslation } from "react-i18next";
import { SectionHeading } from "../components/common/SectionHeading";
import { StatStrip } from "../components/cards/StatStrip";
import { RusselGuide } from "../components/russel/RusselGuide";
import { BRAND_LOGOS } from "../data/references";

/**
 * v1 has no client testimonials yet (Section 4.6) — rather than an apologetic empty state, this
 * leads with founder-attributed brand credibility (same stats/brand strip as Home) and frames
 * testimonials as "coming soon" honestly. Swap in a card-grid of TestimonialCard once quotes
 * start arriving.
 */
export function Testimonials() {
  const { t } = useTranslation(["testimonials", "common"]);

  const stats = [
    { value: t("stats.years"), label: t("stats.yearsLabel") },
    { value: t("stats.games"), label: t("stats.gamesLabel") },
    { value: t("stats.brands"), label: t("stats.brandsLabel") },
  ];

  return (
    <>
      <section className="section section--slate">
        <div className="container">
          <SectionHeading as="h1" eyebrow={t("eyebrow")} title={t("title")} lede={t("lede")} />
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <div className="proof-strip">
            <StatStrip stats={stats} />
          </div>
          <div className="brands-strip">
            <p className="eyebrow mt-lg">{t("brandsEyebrow")}</p>
            <ul className="brands-strip__list">
              {BRAND_LOGOS.map((brand) => (
                <li key={brand.id}>
                  <img src={brand.src} alt={brand.name} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container text-center">
          <RusselGuide pose="normal" message={t("comingSoon")} className="testimonials-russel" />
        </div>
      </section>
    </>
  );
}
