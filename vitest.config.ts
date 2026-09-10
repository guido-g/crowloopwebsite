import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

/**
 * Kept separate from vite.config.ts on purpose: the production build (Amplify, Docker,
 * `npm run build`) must never have to resolve `vitest/config`, so the test config extends
 * the real Vite config instead of the other way round. Plugins stay defined once.
 */
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],
      include: ["src/**/*.test.{ts,tsx}", "amplify/**/*.test.ts"],
      restoreMocks: true,
    },
  }),
);
