import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ResumeUploadForm from "./ResumeUploadForm";

const mocks = vi.hoisted(() => ({ upload: vi.fn(), insert: vi.fn(), invoke: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: {
  storage: { from: () => ({ upload: mocks.upload }) },
  from: () => ({ insert: mocks.insert }),
  functions: { invoke: mocks.invoke },
} }));
vi.mock("sonner", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));

describe("general Careers resume application", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.upload.mockResolvedValue({ error: null });
    mocks.insert.mockResolvedValue({ error: null });
    mocks.invoke.mockResolvedValue({ error: null });
  });
  it("accepts a resume without selecting an open job and records it for HR", async () => {
    render(<ResumeUploadForm />);
    fireEvent.change(screen.getByLabelText("Full Name *"), { target: { value: "Applicant Example" } });
    fireEvent.change(screen.getByLabelText("Email *"), { target: { value: "applicant@example.com" } });
    fireEvent.change(screen.getByLabelText("Phone *"), { target: { value: "9876543210" } });
    fireEvent.change(screen.getByLabelText("Role Applied For *"), { target: { value: "Operations" } });
    const resume = new File(["%PDF-1.4"], "resume.pdf", { type: "application/pdf" });
    fireEvent.change(screen.getByLabelText("Upload resume"), { target: { files: [resume] } });
    fireEvent.click(screen.getByRole("button", { name: "Submit Application" }));
    await waitFor(() => expect(mocks.insert).toHaveBeenCalledTimes(1));
    const record = mocks.insert.mock.calls[0][0][0];
    expect(record.role).toBe("Operations");
    expect(record.resume_file_name).toBe("resume.pdf");
    expect(record).not.toHaveProperty("job_opening_id");
    expect(mocks.invoke).toHaveBeenCalledWith("notify-job-application", { body: { resume_url: record.resume_url } });
  });
});