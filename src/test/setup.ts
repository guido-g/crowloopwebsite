import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

/**
 * jsdom implements no media queries at all, and `useReducedMotion` calls `matchMedia`
 * during render — without this every page smoke test would throw before asserting
 * anything. Reports "no preference", which is the branch real visitors mostly get.
 */
if (typeof window.matchMedia !== "function") {
  window.matchMedia = (query: string): MediaQueryList => ({
    media: query,
    matches: false,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

// We do not enable Vitest `globals`, so RTL's own auto-cleanup never registers.
afterEach(cleanup);
