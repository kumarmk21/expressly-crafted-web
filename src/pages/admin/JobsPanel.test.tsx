import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import JobsPanel from "./JobsPanel";
const mocks = vi.hoisted(() => ({ update: vi.fn(), eq: vi.fn().mockResolvedValue({ error: null }) }));
const row = { id: 'job-1', title: 'Area Sales Manager', department: 'Sales', location: 'Guwahati', job_type: 'Full-time', experience: '5+ years', description: 'Existing description', is_active: true, display_order: 1 };
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from: () => ({ select: () => ({ order: () => ({ order: async () => ({ data: [row], error: null }) }) }), update: mocks.update }) } }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
describe('HR vacancy editing', () => {
  it('persists description changes and closes the vacancy', async () => {
    mocks.update.mockReturnValue({ eq: mocks.eq });
    render(<JobsPanel />);
    fireEvent.click(await screen.findByRole('button', { name: 'Edit', exact: true }));
    fireEvent.change(screen.getByLabelText('Job description'), { target: { value: 'Updated vacancy details' } });
    fireEvent.click(screen.getByRole('switch', { name: 'Published on Careers' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    await waitFor(() => expect(mocks.update).toHaveBeenCalledWith(expect.objectContaining({ description: 'Updated vacancy details', is_active: false })));
    expect(mocks.eq).toHaveBeenCalledWith('id', 'job-1');
  });
});