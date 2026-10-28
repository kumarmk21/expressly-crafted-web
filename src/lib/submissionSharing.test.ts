import { describe, expect, it } from "vitest";
import { submissionDetails, submissionShareLinks } from "./submissionSharing";

describe("Admin enquiry sharing", () => {
  it("includes the submitted service, customer and message, not hidden storage paths", () => {
    const text = submissionDetails("Business & Franchisee", [
      { key: "first_name", label: "First Name" }, { key: "email", label: "Email" },
      { key: "service_interested", label: "Service" }, { key: "message", label: "Message" },
      { key: "owns_vehicle", label: "Owns Vehicle" },
    ], { first_name: "Example", email: "example@example.com", service_interested: "Part Load (LTL)", message: "Need delivery from Mumbai to Pune", owns_vehicle: false, resume_url: "private/path" });
    expect(text).toContain("Service: Part Load (LTL)");
    expect(text).toContain("Email: example@example.com");
    expect(text).toContain("Message: Need delivery from Mumbai to Pune");
    expect(text).toContain("Owns Vehicle: No");
    expect(text).not.toContain("private/path");
  });
  it("preserves all enquiry details in email and WhatsApp drafts", () => {
    const text = "Service: Air Express\nMessage: A&B + shipment?";
    const links = submissionShareLinks("Business & Franchisee", text);
    expect(new URL(links.email).searchParams.get("body")).toBe(text);
    expect(new URL(links.whatsapp).searchParams.get("text")).toBe(text);
  });
});