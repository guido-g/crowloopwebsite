const STORAGE_KEY = "cls_cookie_consent";
export type CookieConsentValue = "all" | "necessary";

export function getStoredCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "all" || value === "necessary" ? value : null;
}

export function storeCookieConsent(value: CookieConsentValue) {
  window.localStorage.setItem(STORAGE_KEY, value);
}
