# Project Rules

- Public enquiry consent is persisted in Supabase and enforced by database triggers, so consent cannot be bypassed from the browser.
- Home-page shipment tracking lives in a dedicated top-of-page component because tracking is the primary customer task.
- Pages other than Home load on demand (React.lazy) to keep the mobile first load small.
- Shared typography rules live in the global stylesheet and Tailwind font aliases so static pages, dialogs, and admin-managed content use the same presentation.
