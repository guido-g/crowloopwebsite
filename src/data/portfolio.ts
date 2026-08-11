export type ProjectType = "crowloop" | "reference";
export type ProjectColorway = "orange" | "green" | "slate" | "navy";

export interface ProjectTags {
  audience: string;
  genre: string;
  platform: string;
}

export interface CaseStudyContent {
  challengeKey: string;
  decisionKey: string;
  outcomeKey: string;
}

export interface Project {
  slug: string;
  /** i18n key holding the display name (brand-specific, so kept per-locale for correct casing). */
  nameKey: string;
  brand: string;
  type: ProjectType;
  /** ISO date. Crow Loop Studio launches 2026-09-01 — projects delivered from that date on are
   * genuine studio output, not reference work (Section 8). */
  date: string;
  tags: ProjectTags;
  descriptionKey: string;
  isCaseStudy: boolean;
  externalUrl?: string;
  colorway: ProjectColorway;
  caseStudy?: CaseStudyContent;
  /** Local path under /public — screenshots pulled from the original guido.graphics posts
   * (Section 7's reference-project links), self-hosted so the site doesn't depend on that
   * blog staying up. Falls back to the colorway gradient in ProjectCard when absent. */
  coverImage?: string;
  /** Extra screenshots shown on the dedicated case-study page only (Section 4.2) — not used
   * for reference tiles, which link out instead of getting an on-site page. */
  gallery?: string[];
}

/**
 * v1 has no Crow Loop Studio-branded projects yet (studio launches 2026-09-01) — every tile is
 * "reference" work: three flagship case studies with dedicated on-site pages, plus five external
 * reference tiles (Section 7/8). As real Crow Loop projects ship, add `type: "crowloop"` entries;
 * the grid and filters already key off `type`/`isCaseStudy`, so no restructuring is needed.
 */
export const PROJECTS: Project[] = [
  {
    slug: "ghostbusters-haunted-mansion",
    nameKey: "projects.ghostbusters.name",
    brand: "Ghostbusters × Playmobil",
    type: "reference",
    date: "2024-11-19",
    tags: { audience: "Kids ~8-12", genre: "Action / Co-op", platform: "HTML5" },
    descriptionKey: "projects.ghostbusters.description",
    isCaseStudy: true,
    externalUrl: "https://guido.graphics/2024/11/19/ghostbusters-haunted-mansion-playmobil/",
    colorway: "navy",
    caseStudy: {
      challengeKey: "projects.ghostbusters.challenge",
      decisionKey: "projects.ghostbusters.decision",
      outcomeKey: "projects.ghostbusters.outcome",
    },
    coverImage: "/portfolio/ghostbusters-haunted-mansion/cover.png",
    gallery: [
      "/portfolio/ghostbusters-haunted-mansion/gallery-1.png",
      "/portfolio/ghostbusters-haunted-mansion/gallery-2.png",
      "/portfolio/ghostbusters-haunted-mansion/gallery-3.png",
      "/portfolio/ghostbusters-haunted-mansion/gallery-4.png",
    ],
  },
  {
    slug: "cini-mini-pyramide",
    nameKey: "projects.ciniMini.name",
    brand: "Cini Mini",
    type: "reference",
    date: "2024-05-21",
    tags: { audience: "Preschool", genre: "Stacking / Skill", platform: "HTML5 microsite" },
    descriptionKey: "projects.ciniMini.description",
    isCaseStudy: true,
    externalUrl: "https://guido.graphics/2024/05/21/cini-mini-pyramide/",
    colorway: "green",
    caseStudy: {
      challengeKey: "projects.ciniMini.challenge",
      decisionKey: "projects.ciniMini.decision",
      outcomeKey: "projects.ciniMini.outcome",
    },
    coverImage: "/portfolio/cini-mini-pyramide/cover.png",
    gallery: [
      "/portfolio/cini-mini-pyramide/gallery-1.png",
      "/portfolio/cini-mini-pyramide/gallery-2.png",
      "/portfolio/cini-mini-pyramide/gallery-3.png",
    ],
  },
  {
    slug: "idefix-vorsicht-roemer",
    nameKey: "projects.idefix.name",
    brand: "Idefix et les Romains (Toggo)",
    type: "reference",
    date: "2025-02-18",
    tags: { audience: "Kids ~6-10", genre: "Stealth / Evade", platform: "HTML5" },
    descriptionKey: "projects.idefix.description",
    isCaseStudy: true,
    externalUrl: "https://guido.graphics/2025/02/18/idefix-vorsicht-romer/",
    colorway: "orange",
    caseStudy: {
      challengeKey: "projects.idefix.challenge",
      decisionKey: "projects.idefix.decision",
      outcomeKey: "projects.idefix.outcome",
    },
    coverImage: "/portfolio/idefix-vorsicht-roemer/cover.jpg",
    gallery: [
      "/portfolio/idefix-vorsicht-roemer/gallery-1.png",
      "/portfolio/idefix-vorsicht-roemer/gallery-2.png",
      "/portfolio/idefix-vorsicht-roemer/gallery-3.png",
    ],
  },
  {
    slug: "knights-of-fortune",
    nameKey: "projects.knightsOfFortune.name",
    brand: "Original IP",
    type: "reference",
    date: "2024-06-15",
    tags: { audience: "All ages", genre: "Roguelite prototype", platform: "HTML5" },
    descriptionKey: "projects.knightsOfFortune.description",
    isCaseStudy: false,
    externalUrl: "https://guido.graphics/2024/06/15/knights-of-fortune-prototype/",
    colorway: "slate",
    coverImage: "/portfolio/knights-of-fortune/cover.jpg",
  },
  {
    slug: "life-3-0-star-life",
    nameKey: "projects.life30.name",
    brand: "iCandy Interactive",
    type: "reference",
    date: "2025-03-25",
    tags: { audience: "Teens / Young adult", genre: "Life sim", platform: "HTML5" },
    descriptionKey: "projects.life30.description",
    isCaseStudy: false,
    externalUrl: "https://guido.graphics/2025/03/25/life-3-0-later-star-life-demo/",
    colorway: "green",
    coverImage: "/portfolio/life-3-0-star-life/cover.jpg",
  },
  {
    slug: "sunrise-roots",
    nameKey: "projects.sunriseRoots.name",
    brand: "Original / team IP",
    type: "reference",
    date: "2025-01-28",
    tags: { audience: "All ages", genre: "Farming / Cozy", platform: "HTML5" },
    descriptionKey: "projects.sunriseRoots.description",
    isCaseStudy: false,
    externalUrl: "https://guido.graphics/2025/01/28/sunrise-roots/",
    colorway: "orange",
    coverImage: "/portfolio/sunrise-roots/cover.png",
  },
  {
    slug: "ninjago-turnier-der-tapferen",
    nameKey: "projects.ninjago.name",
    brand: "LEGO Ninjago × Toggo",
    type: "reference",
    date: "2024-06-09",
    tags: { audience: "Kids ~7-12", genre: "Tournament / Action", platform: "HTML5" },
    descriptionKey: "projects.ninjago.description",
    isCaseStudy: false,
    externalUrl: "https://guido.graphics/2024/06/09/ninjago-turnier-der-tapferen/",
    colorway: "navy",
    coverImage: "/portfolio/ninjago-turnier-der-tapferen/cover.png",
  },
  {
    slug: "dragons-das-grosse-drachenrennen",
    nameKey: "projects.dragons.name",
    brand: "DreamWorks Dragons × Toggo",
    type: "reference",
    date: "2024-05-31",
    tags: { audience: "Kids ~7-12", genre: "Racing", platform: "HTML5" },
    descriptionKey: "projects.dragons.description",
    isCaseStudy: false,
    externalUrl: "https://guido.graphics/2024/05/31/dragons-das-grose-drachenrennen/",
    colorway: "slate",
    coverImage: "/portfolio/dragons-das-grosse-drachenrennen/cover.png",
  },
];

export const CROW_LOOP_LAUNCH_DATE = "2026-09-01";

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getFeaturedProjects(count: number): Project[] {
  return [...PROJECTS].filter((p) => p.isCaseStudy).slice(0, count);
}
