#!/usr/bin/env node
// Cloudflare install wrapper: refuses to run under Bun and forces `npm ci`.
// Use as the Cloudflare Pages "Install command":
//     node scripts/cf-install.js
import { spawnSync } from "node:child_process";

const ua = process.env.npm_config_user_agent || "";
const execpath = process.env.npm_execpath || "";
const isBun =
  !!process.versions.bun || ua.includes("bun") || execpath.includes("bun");

function fail(msg) {
  console.error("\n[cf-install] ✗ " + msg);
  console.error("  user-agent: " + (ua || "(none)"));
  console.error("  execpath:   " + (execpath || "(none)"));
  console.error(
    "  Fix: in Cloudflare Pages → Settings → Build, set install command to" +
      " `node scripts/cf-install.js` and remove any Bun overrides.\n"
  );
  process.exit(1);
}

if (isBun) fail("Bun runtime detected. This project must be installed with npm.");

console.log("[cf-install] ✓ npm runtime detected — running `npm ci`");
const r = spawnSync("npm", ["ci", "--no-audit", "--no-fund", "--progress=false"], {
  stdio: "inherit",
  env: process.env,
});

if (r.status !== 0) {
  console.error("\n[cf-install] ✗ `npm ci` failed (exit " + r.status + ").");
  console.error(
    "  If the lockfile is out of sync, run `npm install` locally, commit" +
      " package-lock.json, and redeploy.\n"
  );
  process.exit(r.status || 1);
}

console.log("[cf-install] ✓ dependencies installed");
