import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useJobAccess } from "./useJobAccess";
const mocks = vi.hoisted(() => ({ getUser: vi.fn(), rpc: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { auth: { getUser: mocks.getUser, onAuthStateChange: () => ({ data: { subscription: { unsubscribe: vi.fn() } } }) }, rpc: mocks.rpc } }));
beforeEach(() => { mocks.getUser.mockResolvedValue({ data: { user: { id: 'verified-user' } }, error: null }); mocks.rpc.mockReset(); });
describe('Vacancy management access', () => {
  it('allows a verified HR role', async () => {
    mocks.rpc.mockImplementation((_name, args) => Promise.resolve({ data: args._role === 'hr', error: null }));
    const { result } = renderHook(useJobAccess);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.allowed).toBe(true);
  });
  it('denies signed-in users without an HR or admin role', async () => {
    mocks.rpc.mockResolvedValue({ data: false, error: null });
    const { result } = renderHook(useJobAccess);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.allowed).toBe(false);
  });
  it('denies unauthenticated users without querying roles', async () => {
    mocks.getUser.mockResolvedValue({ data: { user: null }, error: null });
    const { result } = renderHook(useJobAccess);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.allowed).toBe(false);
    expect(mocks.rpc).not.toHaveBeenCalled();
  });
});