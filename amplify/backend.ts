import { defineBackend } from "@aws-amplify/backend";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda";
import { contactForm } from "./functions/contact-form/resource";

const backend = defineBackend({
  contactForm,
});

const contactFormLambda = backend.contactForm.resources.lambda;

// SES has no resource-level ARNs to scope this to until the sending identity
// (crowloop.studio) is verified in SES; narrow `resources` to that identity's ARN once it is.
contactFormLambda.addToRolePolicy(
  new PolicyStatement({
    sid: "AllowContactFormSendEmail",
    actions: ["ses:SendEmail"],
    resources: ["*"],
  }),
);

// CORS is handled inside the handler itself (see handler.ts) rather than here: a Lambda
// Function URL's built-in `cors` option can't do per-request origin reflection — with two
// allowedOrigins it concatenates them into one comma-separated header, which every browser
// rejects since crowloop.studio and www.crowloop.studio both serve traffic directly.
const contactFormUrl = contactFormLambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
});

backend.addOutput({
  custom: {
    contactFormEndpoint: contactFormUrl.url,
  },
});
