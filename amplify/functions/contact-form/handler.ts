import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const sesClient = new SESv2Client();

const TO_ADDRESS = process.env.CONTACT_FORM_TO_ADDRESS ?? "project@crowloop.studio";
const FROM_ADDRESS = process.env.CONTACT_FORM_FROM_ADDRESS ?? "noreply@crowloop.studio";
const ALLOWED_ORIGINS = (
  process.env.CONTACT_FORM_ALLOWED_ORIGINS ?? "https://crowloop.studio,https://www.crowloop.studio"
).split(",");

/**
 * A Lambda Function URL's own `cors` config can't reflect one origin out of several — with
 * multiple allowedOrigins it sends them all in one comma-separated header, which browsers
 * reject. So CORS is handled here instead: echo back the request's Origin only if it's on
 * the allow-list.
 */
function corsHeaders(event: Parameters<APIGatewayProxyHandlerV2>[0]) {
  const requestOrigin = event.headers.origin ?? event.headers.Origin;
  const origin = requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin) ? requestOrigin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

interface ContactPayload {
  name: string;
  company: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

function isValidPayload(value: unknown): value is ContactPayload {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p.name === "string" &&
    p.name.trim() !== "" &&
    typeof p.company === "string" &&
    typeof p.email === "string" &&
    p.email.includes("@") &&
    typeof p.projectType === "string" &&
    p.projectType.trim() !== "" &&
    typeof p.budget === "string" &&
    p.budget.trim() !== "" &&
    typeof p.timeline === "string" &&
    p.timeline.trim() !== "" &&
    typeof p.message === "string" &&
    p.message.trim() !== ""
  );
}

function jsonResponse(headers: Record<string, string>, statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const headers = corsHeaders(event);

  if (event.requestContext.http.method === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  let payload: unknown;
  try {
    payload = JSON.parse(event.body ?? "{}");
  } catch {
    return jsonResponse(headers, 400, { error: "Invalid JSON body" });
  }

  if (!isValidPayload(payload)) {
    return jsonResponse(headers, 400, { error: "Missing or invalid required fields" });
  }

  const { name, company, email, projectType, budget, timeline, message } = payload;

  const textBody = [
    `Name: ${name}`,
    `Company: ${company || "—"}`,
    `Email: ${email}`,
    `Project type: ${projectType}`,
    `Budget: ${budget}`,
    `Timeline: ${timeline}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    await sesClient.send(
      new SendEmailCommand({
        FromEmailAddress: FROM_ADDRESS,
        Destination: { ToAddresses: [TO_ADDRESS] },
        ReplyToAddresses: [email],
        Content: {
          Simple: {
            Subject: { Data: `New project inquiry from ${name}` },
            Body: { Text: { Data: textBody } },
          },
        },
      }),
    );
  } catch (error) {
    console.error("[contact-form] SES send failed", error);
    return jsonResponse(headers, 502, { error: "Could not send message" });
  }

  return jsonResponse(headers, 200, { ok: true });
};
