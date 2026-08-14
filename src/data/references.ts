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

export interface BrandLogo {
  id: string;
  name: string;
  src: string;
}

/**
 * "Brands worked with" strip (Section 4.1). Rendered as real trademarked logo files.
 */
export const BRAND_LOGOS: BrandLogo[] = [
  { id: "lego", name: "LEGO", src: "/brand/brands/lego.webp" },
  { id: "dreamworks", name: "DreamWorks", src: "/brand/brands/dreamworks.webp" },
  { id: "playmobil", name: "Playmobil", src: "/brand/brands/playmobil.webp" },
  { id: "toggo", name: "Toggo", src: "/brand/brands/toggo.webp" },
  { id: "mattel", name: "Mattel", src: "/brand/brands/mattel.webp" },
  { id: "nestle", name: "Nestlé", src: "/brand/brands/nestle.webp" },
];
