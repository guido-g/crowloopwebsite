export interface ProcessStepData {
  step: number;
  titleKey: string;
  descriptionKey: string;
}

/** The real, confirmed sequence (Section 4.5) — numbered because it's genuinely step-by-step. */
export const PROCESS_STEPS: ProcessStepData[] = [
  { step: 1, titleKey: "steps.inquiry.title", descriptionKey: "steps.inquiry.description" },
  { step: 2, titleKey: "steps.discoveryCall.title", descriptionKey: "steps.discoveryCall.description" },
  { step: 3, titleKey: "steps.briefQuote.title", descriptionKey: "steps.briefQuote.description" },
  { step: 4, titleKey: "steps.deposit.title", descriptionKey: "steps.deposit.description" },
  { step: 5, titleKey: "steps.concept.title", descriptionKey: "steps.concept.description" },
  { step: 6, titleKey: "steps.gameplay.title", descriptionKey: "steps.gameplay.description" },
  { step: 7, titleKey: "steps.polish.title", descriptionKey: "steps.polish.description" },
  { step: 8, titleKey: "steps.qaDelivery.title", descriptionKey: "steps.qaDelivery.description" },
  { step: 9, titleKey: "steps.finalInvoice.title", descriptionKey: "steps.finalInvoice.description" },
];

export const PROCESS_TOOLS = {
  production: ["Godot", "Figma", "Affinity", "Blender", "Claude Code", "ComfyUI"],
};
