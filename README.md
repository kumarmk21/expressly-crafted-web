# Scorpion Express

Freight and logistics website for Scorpion Express Pvt Ltd.

Built with Vite, React, TypeScript, Tailwind CSS, shadcn-ui, and Supabase (Lovable Cloud).

## Local Development

Requires Node.js & npm ([install via nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

The dev server runs at `http://localhost:8080`.

## Environment Variables

Create a `.env` file in the project root with:

```
VITE_SUPABASE_URL=https://fvsxligdazghqsxmsbsp.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon-key>
VITE_SUPABASE_PROJECT_ID=fvsxligdazghqsxmsbsp
```

These are the public/publishable Supabase keys — safe to commit, but Cloudflare needs them set explicitly.

## Editing the Code

- **Lovable**: open the [Lovable project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and prompt. Changes auto-commit to GitHub.
- **Your IDE**: clone, edit, push — changes sync back to Lovable.
- **GitHub web editor / Codespaces**: edit directly in the browser.

## Deployment

### Option 1 — Lovable (default)

Click **Publish** (top right) in the Lovable editor. App goes live at `*.lovable.app`. Custom domains via **Project Settings → Domains**.

### Option 2 — Cloudflare Pages

1. **Connect GitHub repo**
   Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → select this repo.

2. **Build settings**
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`

3. **Environment variables** (set for both Production and Preview)
   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_PUBLISHABLE_KEY
   VITE_SUPABASE_PROJECT_ID
   ```

4. **SPA routing**
   `public/_redirects` already contains `/* /index.html 200` so client-side routes work on refresh.

5. **Custom domain** (optional)
   Pages project → **Custom domains** → **Set up a domain**.

Every push to the main branch triggers an automatic Cloudflare build. Supabase (database, edge functions, storage) keeps running on Supabase — nothing to migrate.

## Tech Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn-ui
- Framer Motion
- Supabase (Lovable Cloud) — database, auth, edge functions
