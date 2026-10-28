import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SubmissionsPanel from "./SubmissionsPanel";

const row = { id: "example", created_at: "2026-10-28T06:00:00Z", first_name: "Example", form_type: "business", email: "example@example.com", service_interested: "Part Load (LTL)", message: "Mumbai to Pune delivery" };
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from: () => ({ select: () => ({ order: async () => ({ data: [row], error: null }) }) }) } }));
vi.mock("sonner", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));

describe("Admin enquiry viewing and sharing", () => {
  it("makes stored service and message details available in email and WhatsApp drafts", async () => {
    render(<SubmissionsPanel />);
    fireEvent.click(screen.getByRole("button", { name: "Business & Franchisee" }));
    await waitFor(() => expect(screen.getByText("Mumbai to Pune delivery")).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "View and share entry" }));
    const email = screen.getByRole("link", { name: "Email", exact: true });
    const whatsapp = screen.getByRole("link", { name: "WhatsApp", exact: true });
    expect(new URL(email.getAttribute("href") ?? "").searchParams.get("body")).toContain("Service: Part Load (LTL)");
    expect(new URL(whatsapp.getAttribute("href") ?? "").searchParams.get("text")).toContain("Message: Mumbai to Pune delivery");
  });
});