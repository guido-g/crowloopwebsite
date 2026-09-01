import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const sesClient = new SESv2Client();

const TO_ADDRESS = process.env.CONTACT_FORM_TO_ADDRESS ?? "project@crowloop.studio";
const FROM_ADDRESS = process.env.CONTACT_FORM_FROM_ADDRESS ?? "noreply@crowloop.studio";
const ALLOWED_ORIGIN = process.env.CONTACT_FORM_ALLOWED_ORIGIN ?? "https://crowloop.studio";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

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

function jsonResponse(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (event.requestContext.http.method === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  let payload: unknown;
  try {
    payload = JSON.parse(event.body ?? "{}");
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body" });
  }

  if (!isValidPayload(payload)) {
    return jsonResponse(400, { error: "Missing or invalid required fields" });
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
    return jsonResponse(502, { error: "Could not send message" });
  }

  return jsonResponse(200, { ok: true });
};
