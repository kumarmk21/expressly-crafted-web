import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ContactForms from "./ContactForms";

const mocks = vi.hoisted(() => ({ insert: vi.fn().mockResolvedValue({ error: null }), from: vi.fn(), invoke: vi.fn().mockResolvedValue({ data: { saved: true, emailed: true }, error: null }) }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke: mocks.invoke }, from: (table: string) => { mocks.from(table); return { insert: mocks.insert }; } } }));
vi.mock("sonner", () => ({ toast: { error: vi.fn(), success: vi.fn(), warning: vi.fn() } }));

describe("Contact enquiry storage", () => {
  it("submits franchise details through the save-and-email endpoint", async () => {
    const { container, unmount } = render(<MemoryRouter><ContactForms /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: "Franchisee" }));
    const inputs = container.querySelectorAll("input");
    fireEvent.change(inputs[0], { target: { value: "Example" } });
    fireEvent.change(inputs[1], { target: { value: "Partner" } });
    fireEvent.change(inputs[2], { target: { value: "9876543210" } });
    fireEvent.change(inputs[3], { target: { value: "partner@example.com" } });
    fireEvent.change(inputs[4], { target: { value: "Mumbai" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    await waitFor(() => expect(mocks.invoke).toHaveBeenCalledWith("submit-franchise-enquiry", {
      body: { first_name: "Example", last_name: "Partner", phone: "9876543210", email: "partner@example.com", location: "Mumbai", worked_as_franchisee: false, owns_vehicle: false, privacy_consent: true },
    }));
    unmount();
  });
  it("stores the selected service and all supplied business details for Admin", async () => {
    const { container } = render(<MemoryRouter><ContactForms /></MemoryRouter>);
    const inputs = container.querySelectorAll("input");
    fireEvent.change(inputs[0], { target: { value: "Example" } });
    fireEvent.change(inputs[1], { target: { value: "Customer" } });
    fireEvent.change(inputs[2], { target: { value: "example@example.com" } });
    fireEvent.change(inputs[3], { target: { value: "9876543210" } });
    fireEvent.change(inputs[4], { target: { value: "Example Company" } });
    fireEvent.change(container.querySelector("select") as HTMLSelectElement, { target: { value: "Manufacturer" } });
    fireEvent.click(screen.getByRole("button", { name: "Part Load (LTL)" }));
    fireEvent.change(container.querySelector("textarea") as HTMLTextAreaElement, { target: { value: "Please arrange Mumbai to Pune delivery." } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    await waitFor(() => expect(mocks.insert).toHaveBeenCalledWith({
      form_type: "business", first_name: "Example", last_name: "Customer", email: "example@example.com",
      phone: "9876543210", company_name: "Example Company", business_type: "Manufacturer",
      service_interested: "Part Load (LTL)", message: "Please arrange Mumbai to Pune delivery.", privacy_consent: true,
    }));
    expect(mocks.from).toHaveBeenCalledWith("contact_submissions");
  });
});