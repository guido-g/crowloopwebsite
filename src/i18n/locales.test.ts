import { describe, expect, it } from "vitest";
import { SUPPORTED_LANGS } from "./index";

/**
 * A key present in EN but missing in DE does not fail the build and does not throw at
 * runtime — i18next just renders the raw key string to the visitor. That is invisible to
 * `npm run build`, so it is checked here instead.
 */
const modules = import.meta.glob<Record<string, unknown>>("./locales/*/*.json", {
  eager: true,
  import: "default",
});

/** "./locales/de/about.json" -> { lang: "de", namespace: "about" } */
function parsePath(path: string) {
  const [, , lang, file] = path.split("/");
  return { lang, namespace: file.replace(/\.json$/, "") };
}

/** Flattens to dotted leaf paths, so a key that changed from string to object is caught too. */
function leafKeys(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => leafKeys(item, `${prefix}[${index}]`));
  }
  if (typeof value === "object" && value !== null) {
    return Object.entries(value).flatMap(([key, child]) =>
      leafKeys(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

const byLang = new Map<string, Map<string, Record<string, unknown>>>();
for (const [path, content] of Object.entries(modules)) {
  const { lang, namespace } = parsePath(path);
  const namespaces = byLang.get(lang) ?? new Map<string, Record<string, unknown>>();
  namespaces.set(namespace, content);
  byLang.set(lang, namespaces);
}

const [BASE_LANG, ...OTHER_LANGS] = SUPPORTED_LANGS;
const baseNamespaces = byLang.get(BASE_LANG);

describe("locale files", () => {
  it("found locale files for every supported language", () => {
    expect(baseNamespaces?.size ?? 0).toBeGreaterThan(0);
    for (const lang of SUPPORTED_LANGS) {
      expect(byLang.has(lang), `no locale files for "${lang}"`).toBe(true);
    }
  });

  describe.each(OTHER_LANGS)(`%s matches ${BASE_LANG}`, (lang) => {
    const namespaces = byLang.get(lang);

    it("has the same namespace files", () => {
      expect([...(namespaces?.keys() ?? [])].sort()).toEqual(
        [...(baseNamespaces?.keys() ?? [])].sort(),
      );
    });

    it.each([...(baseNamespaces?.keys() ?? [])])("%s.json has the same keys", (namespace) => {
      const baseKeys = leafKeys(baseNamespaces?.get(namespace)).sort();
      const langKeys = leafKeys(namespaces?.get(namespace)).sort();

      expect(langKeys.filter((key) => !baseKeys.includes(key))).toEqual([]);
      expect(baseKeys.filter((key) => !langKeys.includes(key))).toEqual([]);
    });
  });

  it.each(Object.keys(modules))("%s has no empty translation values", (path) => {
    const empties = collectEmpty(modules[path]);
    expect(empties).toEqual([]);
  });
});

/** An empty string renders as nothing at all — same visible symptom as a missing key. */
function collectEmpty(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") return value.trim() === "" ? [prefix] : [];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectEmpty(item, `${prefix}[${index}]`));
  }
  if (typeof value === "object" && value !== null) {
    return Object.entries(value).flatMap(([key, child]) =>
      collectEmpty(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [];
}
