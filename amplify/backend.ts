import { defineBackend } from "@aws-amplify/backend";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { FunctionUrlAuthType, HttpMethod } from "aws-cdk-lib/aws-lambda";
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

const contactFormUrl = contactFormLambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
  cors: {
    allowedOrigins: ["https://crowloop.studio", "https://www.crowloop.studio"],
    allowedMethods: [HttpMethod.POST],
    allowedHeaders: ["content-type"],
  },
});

backend.addOutput({
  custom: {
    contactFormEndpoint: contactFormUrl.url,
  },
});
