import { beforeEach, describe, expect, it, vi } from "vitest";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

const send = vi.fn();

vi.mock("@aws-sdk/client-sesv2", () => ({
  SESv2Client: class {
    send = send;
  },
  SendEmailCommand: class {
    constructor(public input: Record<string, unknown>) {}
  },
}));

const { handler } = await import("./handler");

type Event = Parameters<APIGatewayProxyHandlerV2>[0];

const VALID_PAYLOAD = {
  name: "Ada Lovelace",
  company: "Analytical Engines",
  email: "ada@example.com",
  projectType: "game-art",
  budget: "fiveToFifteen",
  timeline: "asap",
  message: "We would like a trailer.",
  howHeard: "linkedin",
};

function makeEvent(
  body: unknown,
  { method = "POST", origin }: { method?: string; origin?: string } = {},
): Event {
  return {
    headers: origin ? { origin } : {},
    requestContext: { http: { method } },
    body: typeof body === "string" ? body : JSON.stringify(body),
  } as unknown as Event;
}

/** The handler is typed as possibly returning void; every path we test returns a response. */
async function invoke(event: Event) {
  const result = await handler(event, {} as never, () => {});
  if (!result || typeof result === "string") throw new Error("expected a structured response");
  return result;
}

beforeEach(() => {
  send.mockReset();
  send.mockResolvedValue({});
});

describe("contact-form handler", () => {
  it("answers the CORS preflight without sending mail", async () => {
    const result = await invoke(makeEvent("", { method: "OPTIONS" }));

    expect(result.statusCode).toBe(204);
    expect(send).not.toHaveBeenCalled();
  });

  it("echoes an allow-listed origin back", async () => {
    const result = await invoke(
      makeEvent(VALID_PAYLOAD, { origin: "https://www.crowloop.studio" }),
    );

    expect(result.headers?.["Access-Control-Allow-Origin"]).toBe("https://www.crowloop.studio");
    expect(result.headers?.Vary).toBe("Origin");
  });

  it("does not echo an origin that is not allow-listed", async () => {
    const result = await invoke(makeEvent(VALID_PAYLOAD, { origin: "https://evil.example" }));

    expect(result.headers?.["Access-Control-Allow-Origin"]).toBe("https://crowloop.studio");
  });

  it("rejects a body that is not JSON", async () => {
    const result = await invoke(makeEvent("not json at all"));

    expect(result.statusCode).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it.each([
    ["name is blank", { name: "  " }],
    ["email has no @", { email: "ada-at-example.com" }],
    ["projectType is missing", { projectType: undefined }],
    ["budget is blank", { budget: "" }],
    ["timeline is blank", { timeline: "" }],
    ["message is blank", { message: "   " }],
    ["howHeard is not a string", { howHeard: 42 }],
  ])("rejects the submission when %s", async (_label, override) => {
    const result = await invoke(makeEvent({ ...VALID_PAYLOAD, ...override }));

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(String(result.body)).error).toBe("Missing or invalid required fields");
    expect(send).not.toHaveBeenCalled();
  });

  it.each([
    ["company", { company: "" }],
    ["howHeard", { howHeard: "" }],
  ])("accepts the submission when the optional field %s is empty", async (_label, override) => {
    const result = await invoke(makeEvent({ ...VALID_PAYLOAD, ...override }));

    expect(result.statusCode).toBe(200);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("sends the enquiry to the studio inbox with the sender as reply-to", async () => {
    const result = await invoke(makeEvent(VALID_PAYLOAD));

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(String(result.body))).toEqual({ ok: true });
    expect(send).toHaveBeenCalledTimes(1);

    const { input } = send.mock.calls[0][0] as { input: Record<string, never> };
    expect(input.Destination).toEqual({ ToAddresses: ["project@crowloop.studio"] });
    // Reply-to must be the enquirer, or answering a lead means copying the address by hand.
    expect(input.ReplyToAddresses).toEqual([VALID_PAYLOAD.email]);
    expect(input.Content.Simple.Subject.Data).toContain(VALID_PAYLOAD.name);

    const text: string = input.Content.Simple.Body.Text.Data;
    expect(text).toContain(VALID_PAYLOAD.email);
    expect(text).toContain(VALID_PAYLOAD.message);
    expect(text).toContain(VALID_PAYLOAD.budget);
  });

  it("surfaces an SES failure as 502 instead of reporting success", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    send.mockRejectedValue(new Error("SES is down"));

    const result = await invoke(makeEvent(VALID_PAYLOAD));

    expect(result.statusCode).toBe(502);
    expect(JSON.parse(String(result.body)).error).toBe("Could not send message");
    expect(consoleError).toHaveBeenCalled();
  });
});
