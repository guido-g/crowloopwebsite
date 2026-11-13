export type ProjectType = "crowloop" | "reference";
export type ProjectColorway = "orange" | "green" | "slate" | "navy";

export interface ProjectTags {
  genre: string;
  platform: string;
}

/** A captioned figure, usable standalone (in `storyGallery`) or inline (in a `CaseStudyBlock`):
 * one or more images shown in a row. `captionKeys` has either one entry (one caption shared
 * under the whole row, for a set of variants like the button-style drafts) or one entry per
 * image (each image gets its own caption, for a sequential pair like "my design" → "shipped"). */
export interface StoryGalleryGroup {
  images: string[];
  alt: string[];
  captionKeys: string[];
}

/** One block of an article-style case study (`CaseStudyContent.blocks`): a sub-heading, a text
 * block (supports "\n\n"-separated paragraphs, "- "/"1. " lists, and inline **bold** / *italic* /
 * [link](url) markdown — see `renderInline`/`Paragraphs` in CaseStudy.tsx), an inline figure, or
 * an inline video. Used instead of the plain challenge/decision/outcome triad when the source
 * text has media placed at specific points in its own narrative, rather than a short summary. */
export type CaseStudyBlock =
  | { kind: "heading"; textKey: string }
  | { kind: "text"; textKey: string }
  | { kind: "figure"; group: StoryGalleryGroup }
  /** Renders the project's `beforeAfter` slider at this point in the article. */
  | { kind: "beforeAfter" }
  /** Inline YouTube embed (gated on cookie consent, see YouTubeEmbed), for a teaser clip placed
   * at a specific point in the article rather than in the sticky sidebar (`Project.youtubeId`). */
  | { kind: "video"; videoId: string };

export interface CaseStudyContent {
  /** Simple mode: three short sections, each under a fixed site-wide heading (Section 4.2). */
  challengeKey?: string;
  decisionKey?: string;
  outcomeKey?: string;
  /** Article mode: renders these blocks in order instead of the simple mode above. */
  blocks?: CaseStudyBlock[];
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
  /** CSS object-position for coverImage, for crops where the interesting part isn't centered. */
  coverPosition?: string;
  /** Extra screenshots shown on the dedicated case-study page only (Section 4.2) — not used
   * for reference tiles, which link out instead of getting an on-site page. */
  gallery?: string[];
  /** YouTube video ID (not a full URL) shown alongside the case-study body, gated on cookie
   * consent — see YouTubeEmbed and Datenschutz §5 "YouTube with extended data protection". */
  youtubeId?: string;
  /** Interactive before/after comparison shown on the case-study page, above the gallery.
   * Paths point at the "-full" gallery derivatives so dragging stays crisp. */
  beforeAfter?: { before: string; after: string };
  /** Captioned narrative figures, rendered in order instead of the plain `gallery` grid when
   * present (Section 4.2 addendum) — for a case study whose images only make sense with the
   * story text next to them, e.g. "three drafts we considered" or "delivered vs. shipped". */
  storyGallery?: StoryGalleryGroup[];
  /** Suppresses the standard "a note on the numbers" framing note (Section 4.2), which talks
   * about kids'-audience rankings — wrong framing for a non-Toggo project with no such claim. */
  hideFramingNote?: boolean;
}

/**
 * v1 had no Crow Loop Studio-branded projects (studio launched 2026-09-01) — every tile was
 * "reference" work: three flagship case studies with dedicated on-site pages, plus five external
 * reference tiles (Section 7/8). Lucky Punk was the first genuine `type: "crowloop"` entry; the
 * grid and filters already key off `type`/`isCaseStudy`, so no restructuring was needed as more
 * were added.
 */
export const PROJECTS: Project[] = [
  {
    slug: "kombi-chaos",
    nameKey: "projects.kombiChaos.name",
    brand: "Weihnachtsmann & Co. KG × TOGGO",
    type: "crowloop",
    date: "2026-11-10",
    tags: { genre: "Merge puzzle", platform: "HTML5 (TOGGO)" },
    descriptionKey: "projects.kombiChaos.description",
    isCaseStudy: true,
    externalUrl: "https://www.toggo.de/games/weihnachtsmann--co-kg-games-gmc33/spiel/kombi-chaos-gam345",
    colorway: "green",
    caseStudy: {
      blocks: [
        { kind: "text", textKey: "projects.kombiChaos.article.intro" },
        {
          kind: "figure",
          group: {
            images: ["/portfolio/kombi-chaos/gallery-1.webp"],
            alt: [""],
            captionKeys: [],
          },
        },
        { kind: "heading", textKey: "projects.kombiChaos.article.gameHeading" },
        { kind: "text", textKey: "projects.kombiChaos.article.gameText" },
        {
          kind: "figure",
          group: {
            images: ["/portfolio/kombi-chaos/gallery-2.webp"],
            alt: [""],
            captionKeys: ["projects.kombiChaos.gallery.screens"],
          },
        },
        { kind: "video", videoId: "DunPSeXu2lw" },
        { kind: "heading", textKey: "projects.kombiChaos.article.madeHeading" },
        { kind: "text", textKey: "projects.kombiChaos.article.madeText" },
        { kind: "heading", textKey: "projects.kombiChaos.article.playHeading" },
        { kind: "text", textKey: "projects.kombiChaos.article.playText" },
      ],
    },
    coverImage: "/portfolio/kombi-chaos/gallery-1.webp",
    hideFramingNote: true,
  },
  {
    slug: "lucky-punk",
    nameKey: "projects.luckyPunk.name",
    brand: "Green Parrot Games",
    type: "crowloop",
    date: "2026-11-04",
    tags: { genre: "Push-your-luck deckbuilder", platform: "PC (Steam)" },
    descriptionKey: "projects.luckyPunk.description",
    isCaseStudy: true,
    externalUrl: "https://store.steampowered.com/app/4508290",
    colorway: "orange",
    caseStudy: {
      blocks: [
        { kind: "text", textKey: "projects.luckyPunk.article.intro" },
        { kind: "beforeAfter" },
        { kind: "heading", textKey: "projects.luckyPunk.article.problemHeading" },
        { kind: "text", textKey: "projects.luckyPunk.article.problemText" },
        { kind: "heading", textKey: "projects.luckyPunk.article.step1Heading" },
        { kind: "text", textKey: "projects.luckyPunk.article.step1Text" },
        {
          kind: "figure",
          group: {
            images: [
              "/portfolio/lucky-punk/gallery-4.webp",
              "/portfolio/lucky-punk/gallery-5.webp",
              "/portfolio/lucky-punk/gallery-7.webp",
            ],
            alt: ["", "", ""],
            captionKeys: ["projects.luckyPunk.gallery.buttonDrafts"],
          },
        },
        { kind: "text", textKey: "projects.luckyPunk.article.step1Rules" },
        { kind: "heading", textKey: "projects.luckyPunk.article.step2Heading" },
        { kind: "text", textKey: "projects.luckyPunk.article.step2Text" },
        {
          kind: "figure",
          group: {
            images: ["/portfolio/lucky-punk/gallery-3.webp"],
            alt: [""],
            captionKeys: ["projects.luckyPunk.gallery.wireframe"],
          },
        },
        { kind: "text", textKey: "projects.luckyPunk.article.step2Changes" },
        {
          kind: "figure",
          group: {
            images: ["/portfolio/lucky-punk/gallery-6.webp", "/portfolio/lucky-punk/gallery-2.webp"],
            alt: ["", ""],
            captionKeys: ["projects.luckyPunk.gallery.delivered", "projects.luckyPunk.gallery.shipped"],
          },
        },
        { kind: "heading", textKey: "projects.luckyPunk.article.takeawayHeading" },
        { kind: "text", textKey: "projects.luckyPunk.article.takeawayText" },
      ],
    },
    coverImage: "/portfolio/lucky-punk/cover.webp",
    beforeAfter: {
      before: "/portfolio/lucky-punk/gallery-1-full.webp",
      after: "/portfolio/lucky-punk/gallery-2-full.webp",
    },
    hideFramingNote: true,
  },
  {
    slug: "ghostbusters-haunted-mansion",
    nameKey: "projects.ghostbusters.name",
    brand: "Ghostbusters × Playmobil",
    type: "reference",
    date: "2024-11-19",
    tags: { genre: "Action / Co-op", platform: "HTML5" },
    descriptionKey: "projects.ghostbusters.description",
    isCaseStudy: true,
    externalUrl: "https://guido.graphics/2024/11/19/ghostbusters-haunted-mansion-playmobil/",
    colorway: "navy",
    caseStudy: {
      challengeKey: "projects.ghostbusters.challenge",
      decisionKey: "projects.ghostbusters.decision",
      outcomeKey: "projects.ghostbusters.outcome",
    },
    coverImage: "/portfolio/ghostbusters-haunted-mansion/gallery-1.webp",
    coverPosition: "top",
    gallery: [
      "/portfolio/ghostbusters-haunted-mansion/gallery-2.webp",
      "/portfolio/ghostbusters-haunted-mansion/gallery-3.webp",
      "/portfolio/ghostbusters-haunted-mansion/gallery-4.webp",
    ],
    youtubeId: "3WVgShIMLYQ",
  },
  {
    slug: "cini-mini-pyramide",
    nameKey: "projects.ciniMini.name",
    brand: "Cini Mini",
    type: "reference",
    date: "2024-05-21",
    tags: { genre: "Stacking / Skill", platform: "HTML5 microsite" },
    descriptionKey: "projects.ciniMini.description",
    isCaseStudy: true,
    externalUrl: "https://guido.graphics/2024/05/21/cini-mini-pyramide/",
    colorway: "green",
    caseStudy: {
      challengeKey: "projects.ciniMini.challenge",
      decisionKey: "projects.ciniMini.decision",
      outcomeKey: "projects.ciniMini.outcome",
    },
    coverImage: "/portfolio/cini-mini-pyramide/cover.webp",
    gallery: [
      "/portfolio/cini-mini-pyramide/gallery-1.webp",
      "/portfolio/cini-mini-pyramide/gallery-2.webp",
      "/portfolio/cini-mini-pyramide/gallery-3.webp",
    ],
  },
  {
    slug: "idefix-vorsicht-roemer",
    nameKey: "projects.idefix.name",
    brand: "Toggo",
    type: "reference",
    date: "2025-02-18",
    tags: { genre: "Stealth / Evade", platform: "HTML5" },
    descriptionKey: "projects.idefix.description",
    isCaseStudy: true,
    externalUrl: "https://guido.graphics/2025/02/18/idefix-vorsicht-romer/",
    colorway: "orange",
    caseStudy: {
      challengeKey: "projects.idefix.challenge",
      decisionKey: "projects.idefix.decision",
      outcomeKey: "projects.idefix.outcome",
    },
    coverImage: "/portfolio/idefix-vorsicht-roemer/cover.webp",
    youtubeId: "GWRl4CNRqP4",
    gallery: [
      "/portfolio/idefix-vorsicht-roemer/gallery-1.webp",
      "/portfolio/idefix-vorsicht-roemer/gallery-2.webp",
      "/portfolio/idefix-vorsicht-roemer/gallery-3.webp",
    ],
  },
  {
    slug: "knights-of-fortune",
    nameKey: "projects.knightsOfFortune.name",
    brand: "Original IP",
    type: "reference",
    date: "2024-06-15",
    tags: { genre: "Roguelite prototype", platform: "HTML5" },
    descriptionKey: "projects.knightsOfFortune.description",
    isCaseStudy: false,
    externalUrl: "https://guido.graphics/2024/06/15/knights-of-fortune-prototype/",
    colorway: "slate",
    coverImage: "/portfolio/knights-of-fortune/cover.webp",
  },
  {
    slug: "life-3-0-star-life",
    nameKey: "projects.life30.name",
    brand: "iCandy Interactive",
    type: "reference",
    date: "2025-03-25",
    tags: { genre: "Life sim", platform: "HTML5" },
    descriptionKey: "projects.life30.description",
    isCaseStudy: false,
    externalUrl: "https://guido.graphics/2025/03/25/life-3-0-later-star-life-demo/",
    colorway: "green",
    coverImage: "/portfolio/life-3-0-star-life/cover.webp",
  },
  {
    slug: "sunrise-roots",
    nameKey: "projects.sunriseRoots.name",
    brand: "Original / team IP",
    type: "reference",
    date: "2025-01-28",
    tags: { genre: "Farming / Cozy", platform: "HTML5" },
    descriptionKey: "projects.sunriseRoots.description",
    isCaseStudy: false,
    externalUrl: "https://guido.graphics/2025/01/28/sunrise-roots/",
    colorway: "orange",
    coverImage: "/portfolio/sunrise-roots/cover.webp",
  },
  {
    slug: "ninjago-turnier-der-tapferen",
    nameKey: "projects.ninjago.name",
    brand: "LEGO Ninjago × Toggo",
    type: "reference",
    date: "2024-06-09",
    tags: { genre: "Tournament / Action", platform: "HTML5" },
    descriptionKey: "projects.ninjago.description",
    isCaseStudy: false,
    externalUrl: "https://guido.graphics/2024/06/09/ninjago-turnier-der-tapferen/",
    colorway: "navy",
    coverImage: "/portfolio/ninjago-turnier-der-tapferen/cover.webp",
  },
  {
    slug: "dragons-das-grosse-drachenrennen",
    nameKey: "projects.dragons.name",
    brand: "DreamWorks Dragons × Toggo",
    type: "reference",
    date: "2024-05-31",
    tags: { genre: "Racing", platform: "HTML5" },
    descriptionKey: "projects.dragons.description",
    isCaseStudy: false,
    externalUrl: "https://guido.graphics/2024/05/31/dragons-das-grose-drachenrennen/",
    colorway: "slate",
    coverImage: "/portfolio/dragons-das-grosse-drachenrennen/cover.webp",
  },
];

export const CROW_LOOP_LAUNCH_DATE = "2026-09-01";

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getFeaturedProjects(count: number): Project[] {
  return [...PROJECTS].filter((p) => p.isCaseStudy).slice(0, count);
}
