import { render, type RenderResult } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "../App";
import i18n, { type SupportedLang } from "../i18n";

/**
 * Mounts the real route table at one URL, the same way `entry-server.tsx` does for the
 * prerender — one route definition, exercised by both. The language is switched before
 * rendering rather than left to `Layout`'s effect, so assertions never race the switch.
 */
export async function renderRoute(lang: SupportedLang, path: string): Promise<RenderResult> {
  await i18n.changeLanguage(lang);
  const location = path ? `/${lang}/${path}` : `/${lang}`;
  return render(
    <MemoryRouter initialEntries={[location]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}
