export interface Service {
  id: string;
  titleKey: string;
  summaryKey: string;
  forKey: string;
  doneKey: string;
}

/** Structure confirmed from the business plan (Section 4.4) — five offerings in priority order. */
export const SERVICES: Service[] = [
  {
    id: "full-production",
    titleKey: "services.fullProduction.title",
    summaryKey: "services.fullProduction.summary",
    forKey: "services.fullProduction.for",
    doneKey: "services.fullProduction.done",
  },
  {
    id: "design-art-uiux",
    titleKey: "services.designArtUiux.title",
    summaryKey: "services.designArtUiux.summary",
    forKey: "services.designArtUiux.for",
    doneKey: "services.designArtUiux.done",
  },
  {
    id: "concept-feedback",
    titleKey: "services.conceptFeedback.title",
    summaryKey: "services.conceptFeedback.summary",
    forKey: "services.conceptFeedback.for",
    doneKey: "services.conceptFeedback.done",
  },
  {
    id: "updating-rebranding",
    titleKey: "services.updatingRebranding.title",
    summaryKey: "services.updatingRebranding.summary",
    forKey: "services.updatingRebranding.for",
    doneKey: "services.updatingRebranding.done",
  },
  {
    id: "embedded-team",
    titleKey: "services.embeddedTeam.title",
    summaryKey: "services.embeddedTeam.summary",
    forKey: "services.embeddedTeam.for",
    doneKey: "services.embeddedTeam.done",
  },
];
