import { useTranslation } from "react-i18next";
import { RusselGuide } from "../components/russel/RusselGuide";
import { LocalizedLink } from "../components/common/LocalizedLink";

export function NotFound() {
  const { t } = useTranslation("common");

  return (
    <section className="section text-center">
      <div className="container">
        <RusselGuide pose="normal" message={t("notFound.russel")} className="not-found-russel" />
        <h1>{t("notFound.title")}</h1>
        <LocalizedLink to="/" className="btn btn--primary">
          {t("notFound.cta")}
        </LocalizedLink>
      </div>
    </section>
  );
}
