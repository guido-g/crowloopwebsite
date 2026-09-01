/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Function URL of the amplify/functions/contact-form Lambda (amplify.yml sets this at build time). */
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
