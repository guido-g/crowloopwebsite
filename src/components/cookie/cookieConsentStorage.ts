const STORAGE_KEY = "cls_cookie_consent";
const CHANGE_EVENT = "cls-cookie-consent-change";
export type CookieConsentValue = "all" | "necessary";

export function getStoredCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "all" || value === "necessary" ? value : null;
}

export function storeCookieConsent(value: CookieConsentValue) {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent<CookieConsentValue>(CHANGE_EVENT, { detail: value }));
}

/** Lets a gated embed (e.g. YouTubeEmbed) react immediately when consent is granted elsewhere
 * on the page, without both components needing to share state. Returns an unsubscribe function. */
export function onCookieConsentChange(handler: (value: CookieConsentValue) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<CookieConsentValue>).detail);
  window.addEventListener(CHANGE_EVENT, listener);
  return () => window.removeEventListener(CHANGE_EVENT, listener);
}
