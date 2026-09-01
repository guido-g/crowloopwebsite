import { defineFunction } from "@aws-amplify/backend";

/** Handles POSTs from the contact form (src/pages/Contact.tsx) and relays them via SES. */
export const contactForm = defineFunction({
  name: "contact-form",
  entry: "./handler.ts",
  timeoutSeconds: 15,
  environment: {
    CONTACT_FORM_TO_ADDRESS: "project@crowloop.studio",
    // Must be an SES-verified identity on the crowloop.studio domain (SES verification is
    // separate from the Google Workspace MX/DKIM setup used for receiving mail).
    CONTACT_FORM_FROM_ADDRESS: "noreply@crowloop.studio",
    CONTACT_FORM_ALLOWED_ORIGIN: "https://crowloop.studio",
  },
});
