import { useTranslation } from "react-i18next";
import { SectionHeading } from "../components/common/SectionHeading";
import { ProcessStep } from "../components/cards/ProcessStep";
import { RusselGuide } from "../components/russel/RusselGuide";
import { PROCESS_STEPS, PROCESS_TOOLS } from "../data/process";

export function Process() {
  const { t } = useTranslation(["process", "common"]);

  return (
    <>
      <section className="section section--slate">
        <div className="container">
          <SectionHeading
            as="h1"
            align="crow"
            eyebrow={t("eyebrow")}
            title={t("title")}
            lede={t("lede")}
            russel={<RusselGuide pose="pointing" message={t("timeline")} position="below" />}
          />
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <ol className="process-list">
            {PROCESS_STEPS.map((step) => (
              <ProcessStep
                key={step.step}
                number={step.step}
                title={t(step.titleKey)}
                description={t(step.descriptionKey)}
              />
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container process-topic">
          <div>
            <h2>{t("qa.title")}</h2>
            <p>{t("qa.body")}</p>
          </div>
          <RusselGuide pose="computer" message={t("qa.russel")} />
        </div>
      </section>

      <section className="section section--slate">
        <div className="container process-topic">
          <div>
            <h2>{t("ai.title")}</h2>
            <p>{t("ai.body")}</p>
          </div>
          <RusselGuide pose="computer" message={t("ai.russel")} side="right" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>{t("tools.title")}</h2>
          <ul className="tools-list">
            {PROCESS_TOOLS.production.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
          <p>{t("tools.communication")}</p>
        </div>
      </section>

      <section className="section section--navy-deep">
        <div className="container">
          <h2>{t("postDelivery.title")}</h2>
          <p>{t("postDelivery.body")}</p>
        </div>
      </section>
    </>
  );
}
