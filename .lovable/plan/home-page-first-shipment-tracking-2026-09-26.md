# Home-page-first shipment tracking

## What will change
- Move the existing shipment tracking box to the very top of the home page content, immediately below the site navigation.
- Make it a wide, prominent tracking strip so customers can enter an LR / Docket number without scrolling.
- Keep the current tracking destination and new-tab behavior unchanged.
- Remove the duplicate tracking card from the lower hero area and rebalance the introduction content.

## Technical details
- Extract the tracker into a focused reusable component with its existing validation and `dtrack.scorpiongroup.in` link.
- Render it before the main home-page introduction, with mobile-friendly input and button stacking.
- Verify the top-of-page layout and tracking interaction on desktop and mobile.
