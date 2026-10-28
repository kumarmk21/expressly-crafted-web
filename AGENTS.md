# Project Rules

- Public enquiry consent is persisted in Supabase and enforced by database triggers, so consent cannot be bypassed from the browser.
- Home-page shipment tracking lives in a dedicated top-of-page component because tracking is the primary customer task.
- Pages other than Home load on demand (React.lazy) to keep the mobile first load small.
- Shared typography rules live in the global stylesheet and Tailwind font aliases so static pages, dialogs, and admin-managed content use the same presentation; every heading resolves to the single shared heading font through those rules rather than per-component font styling.
- The header's desktop menu and its size steps use the custom `nav`/`navmd` breakpoints in tailwind.config.ts instead of lg/xl, because the menu row only fits without overlapping above those widths; keep new header controls on those breakpoints and re-check collisions at 1080/1202/1280/1440 when labels change.
- Wider home-page and footer content tracks are scoped through `.home-page` and `.compact-footer` in the shared stylesheet so compact gutters do not alter other pages or the header's fit rules.
- About-page leadership portrait framing is scoped per seeded local photo in shared CSS; preserve original images and let admin-uploaded replacements use neutral framing.
- Careers uses the shared resume form for both general applications and job-specific dialogs, so uploads, admin records and HR notifications follow the same path.
- Careers and Contact use the shared semantic photo-overlay treatment to keep headings readable without obscuring desktop subjects; Contact retains its existing enquiry forms and branch map.
- Admin submission sharing formats only the source's displayed fields and opens copy/email/WhatsApp drafts; never publish submission data or private resume paths as public links.
