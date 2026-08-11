export interface ProfessionalReference {
  id: string;
  name: string;
  roleKey: string;
  quoteKey: string;
}

/**
 * Professional references/endorsements (Section 4.3) — distinct from client Testimonials.
 * Sign-off from both is an open item (Section 7): plan is to show the finished site to Thomas
 * and Robert and confirm before public launch, not to block the build on it.
 */
export const PROFESSIONAL_REFERENCES: ProfessionalReference[] = [
  {
    id: "thomas-roessig",
    name: "Thomas Rössig",
    roleKey: "references.thomasRoessig.role",
    quoteKey: "references.thomasRoessig.quote",
  },
  {
    id: "robert-heil",
    name: "Robert Heil",
    roleKey: "references.robertHeil.role",
    quoteKey: "references.robertHeil.quote",
  },
];

export interface BrandChip {
  id: string;
  name: string;
}

/**
 * "Brands worked with" strip (Section 4.1). Permission to display the real trademarked logos
 * hasn't been confirmed yet (Section 7 checklist), so per the doc's own fallback, this renders
 * as styled text-only chips rather than logo files until that's cleared.
 */
export const BRAND_CHIPS: BrandChip[] = [
  { id: "lego-ninjago", name: "LEGO Ninjago" },
  { id: "dragons", name: "Dragons (DreamWorks)" },
  { id: "ghostbusters", name: "Ghostbusters × Playmobil" },
  { id: "idefix", name: "Idefix (Asterix / Toggo)" },
];
