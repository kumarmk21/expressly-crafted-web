import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import HomeNotices from "./HomeNotices";

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("Homepage notice sequence", () => {
  it.each(["button", "escape", "backdrop"])("opens privacy only after dismissing fraud via %s", (method) => {
    vi.useFakeTimers();
    render(<HomeNotices />);
    expect(screen.queryByRole("dialog")).toBeNull();
    act(() => { vi.advanceTimersByTime(600); });
    const fraud = screen.getByRole("dialog", { name: "Fraud alert notice" });
    expect(screen.getAllByRole("dialog")).toHaveLength(1);
    if (method === "button") fireEvent.click(screen.getByRole("button", { name: "Close fraud alert" }));
    else if (method === "escape") fireEvent.keyDown(window, { key: "Escape" });
    else fireEvent.click(fraud);
    expect(screen.queryByRole("dialog", { name: "Fraud alert notice" })).toBeNull();
    expect(screen.getByRole("dialog", { name: "DPDP Act, 2023 — Privacy Notice" })).toBeTruthy();
    expect(screen.getAllByRole("dialog")).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: "Close notice" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});