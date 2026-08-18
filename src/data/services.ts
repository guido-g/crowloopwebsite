export interface Service {
  id: string;
  titleKey: string;
  summaryKey: string;
  forKey: string;
  doneKey: string;
  /** Filename (no extension) under /brand/icons/, from the Figma Icon component's variant name. */
  icon: string;
}

/** Structure confirmed from the business plan (Section 4.4) — five offerings in priority order. */
export const SERVICES: Service[] = [
  {
    id: "full-production",
    titleKey: "services.fullProduction.title",
    summaryKey: "services.fullProduction.summary",
    forKey: "services.fullProduction.for",
    doneKey: "services.fullProduction.done",
    icon: "games",
  },
  {
    id: "design-art-uiux",
    titleKey: "services.designArtUiux.title",
    summaryKey: "services.designArtUiux.summary",
    forKey: "services.designArtUiux.for",
    doneKey: "services.designArtUiux.done",
    icon: "modules",
  },
  {
    id: "concept-feedback",
    titleKey: "services.conceptFeedback.title",
    summaryKey: "services.conceptFeedback.summary",
    forKey: "services.conceptFeedback.for",
    doneKey: "services.conceptFeedback.done",
    icon: "feedback",
  },
  {
    id: "updating-rebranding",
    titleKey: "services.updatingRebranding.title",
    summaryKey: "services.updatingRebranding.summary",
    forKey: "services.updatingRebranding.for",
    doneKey: "services.updatingRebranding.done",
    icon: "update",
  },
  {
    id: "embedded-team",
    titleKey: "services.embeddedTeam.title",
    summaryKey: "services.embeddedTeam.summary",
    forKey: "services.embeddedTeam.for",
    doneKey: "services.embeddedTeam.done",
    icon: "support",
  },
];
