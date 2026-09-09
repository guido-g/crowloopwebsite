/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Function URL of the amplify/functions/contact-form Lambda (amplify.yml sets this at build time). */
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  /** Defined unconditionally by the Plausible snippet in index.html — safe to call anywhere,
   * but still optional-chained since it wouldn't exist if that script were ever removed. */
  plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;
}
