import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./i18n";
import "./styles/global.css";
import App from "./App.tsx";

const container = document.getElementById("root")!;

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

/**
 * Every route in the sitemap is prerendered (`scripts/prerender.mjs`), so the container
 * normally arrives with markup to hydrate. `dist/index.html` is still served empty as the SPA
 * fallback for `/` and unknown paths, and hydrating an empty container is an error — hence the
 * branch rather than an unconditional `hydrateRoot`.
 */
if (container.firstChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
