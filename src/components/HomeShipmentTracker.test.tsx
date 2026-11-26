import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import HomeShipmentTracker from "./HomeShipmentTracker";

afterEach(() => vi.restoreAllMocks());

it("sends LR 63667763 as the docket parameter for automatic tracking", () => {
  const open = vi.spyOn(window, "open").mockReturnValue(null);
  render(<HomeShipmentTracker />);
  fireEvent.change(screen.getByRole("textbox", { name: "Shipment tracking number" }), {
    target: { value: " 63667763 " },
  });
  fireEvent.click(screen.getByRole("button", { name: "Track Now" }));
  expect(open).toHaveBeenCalledWith(
    "https://dtrack.scorpiongroup.in/?docket=63667763",
    "_blank",
    "noopener,noreferrer",
  );
});