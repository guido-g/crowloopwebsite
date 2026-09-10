import { describe, expect, it } from "vitest";
import { SEO_ROUTES, SUPPORTED_LANGS } from "../seo/routes";
import { renderRoute } from "../test/renderRoute";

/**
 * Smoke coverage for every indexable route in both languages — the same (lang, route) set
 * the prerenderer and the sitemap are built from, so a new page is covered here the moment
 * it is added to SEO_ROUTES.
 *
 * `npm run build` already proves these routes render server-side. What it cannot see is the
 * client tree: hooks, effects and browser APIs only run here.
 */
const ROUTE_CASES = SEO_ROUTES.map((route) => ({
  path: route.path,
  label: route.path === "" ? "(home)" : route.path,
}));

describe.each(SUPPORTED_LANGS)("routes render in %s", (lang) => {
  it.each(ROUTE_CASES)("/$label", async ({ path }) => {
    const { getAllByRole } = await renderRoute(lang, path);

    const headings = getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent?.trim()).not.toBe("");
  });
});

describe("routing edge cases", () => {
  it("renders the 404 page for an unknown path under a valid language", async () => {
    const { getByRole } = await renderRoute("en", "no-such-page");

    // Raw key text would mean the notFound namespace never resolved.
    const heading = getByRole("heading", { level: 1 });
    expect(heading.textContent?.trim()).not.toBe("");
    expect(heading.textContent).not.toContain("notFound.title");
  });

  it("redirects an unknown case-study slug back to the portfolio index", async () => {
    const { getAllByRole } = await renderRoute("en", "portfolio/not-a-real-project");

    // <Navigate> to /en/portfolio, so we should land on the portfolio page, not a blank tree.
    expect(getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
