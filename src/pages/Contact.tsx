import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "../components/common/SectionHeading";
import { RUSSEL_POSES } from "../components/russel/poses";
import { SERVICES } from "../data/services";

type SubmitStatus = "idle" | "submitting" | "confirmed";

interface ContactPayload {
  name: string;
  company: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

const BUDGET_KEYS = ["underFive", "fiveToFifteen", "fifteenToForty", "fortyPlus", "notSure"];
const TIMELINE_KEYS = ["asap", "oneToThree", "threePlus", "flexible"];

/**
 * v1 backend behavior (per project decision): submission is validated and mocked client-side —
 * no business email/Amplify backend exists yet (Section 7 checklist). Wire handleSubmit to a real
 * endpoint (AWS Amplify function + SES) once the business email is live; the confirmation UX
 * below is already the real, final UX either way.
 */
export function Contact() {
  const { t } = useTranslation(["contact", "services", "common"]);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [searchParams] = useSearchParams();

  // Service cards link here with ?projectType=<id> pre-filled; only trust it if it matches a
  // real option, so an unrecognized value falls back to the normal empty placeholder.
  const requestedProjectType = searchParams.get("projectType");
  const initialProjectType =
    requestedProjectType && SERVICES.some((service) => service.id === requestedProjectType)
      ? requestedProjectType
      : "";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    // Honeypot: real users never see or fill this field, so a non-empty value means a bot.
    // Pretend to succeed instead of erroring, so the bot doesn't learn it was caught.
    if (String(form.get("website") ?? "") !== "") {
      setStatus("submitting");
      window.setTimeout(() => setStatus("confirmed"), 700);
      return;
    }

    const payload: ContactPayload = {
      name: String(form.get("name") ?? ""),
      company: String(form.get("company") ?? ""),
      email: String(form.get("email") ?? ""),
      projectType: String(form.get("projectType") ?? ""),
      budget: String(form.get("budget") ?? ""),
      timeline: String(form.get("timeline") ?? ""),
      message: String(form.get("message") ?? ""),
    };

    setStatus("submitting");
    // TODO(backend): replace with a real submission (AWS Amplify function -> SES) delivering
    // to project@crowloop.studio. For now this is a mocked delay.
    console.info("[contact-form] mock submission payload", payload);
    window.setTimeout(() => setStatus("confirmed"), 700);
  };

  if (status === "confirmed") {
    return <ContactConfirmation />;
  }

  return (
    <>
      <section className="section section--slate">
        <div className="container">
          <SectionHeading as="h1" eyebrow={t("eyebrow")} title={t("title")} lede={t("lede")} />
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__hp" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="contact-form__row">
              <label>
                <span>{t("fields.name")}</span>
                <input type="text" name="name" required autoComplete="name" />
              </label>
              <label>
                <span>{t("fields.company")}</span>
                <input type="text" name="company" autoComplete="organization" />
              </label>
            </div>

            <label>
              <span>
                {t("fields.email")} <em>{t("fields.emailNote")}</em>
              </span>
              <input type="email" name="email" required autoComplete="email" />
            </label>

            <div className="contact-form__row">
              <label>
                <span>{t("fields.projectType")}</span>
                <select name="projectType" required defaultValue={initialProjectType}>
                  <option value="" disabled>
                    {t("fields.selectPlaceholder")}
                  </option>
                  {SERVICES.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.id === "other" ? t("fields.projectTypeOther") : t(service.titleKey, { ns: "services" })}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>{t("fields.budget")}</span>
                <select name="budget" required defaultValue="">
                  <option value="" disabled>
                    {t("fields.selectPlaceholder")}
                  </option>
                  {BUDGET_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {t(`fields.budgetOptions.${key}`)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              <span>{t("fields.timeline")}</span>
              <select name="timeline" required defaultValue="">
                <option value="" disabled>
                  {t("fields.selectPlaceholder")}
                </option>
                {TIMELINE_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {t(`fields.timelineOptions.${key}`)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>{t("fields.message")}</span>
              <textarea name="message" rows={6} required />
            </label>

            <button type="submit" className="btn btn--primary" disabled={status === "submitting"}>
              {status === "submitting" ? t("fields.submitting") : t("fields.submit")}
            </button>

            <p className="contact-form__response-time">{t("responseTime")}</p>
          </form>

          <aside className="contact-fallback">
            <h2>{t("fallback.title")}</h2>
            <p>{t("fallback.body")}</p>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactConfirmation() {
  const { t } = useTranslation(["contact", "common"]);

  return (
    <section className="section section--navy contact-confirmation">
      <div className="container contact-confirmation__inner">
        <img
          src={RUSSEL_POSES.computer}
          alt="Russel the crow at a computer, giving a thumbs up"
          width={140}
          height={140}
          className="contact-confirmation__portrait"
        />
        <h1>{t("confirmation.title")}</h1>
        <ul className="contact-confirmation__points">
          <li>{t("confirmation.responseTime")}</li>
          <li>{t("confirmation.emailSent")}</li>
          <li>{t("confirmation.troubleshooting")}</li>
        </ul>
      </div>
    </section>
  );
}
