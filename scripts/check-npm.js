// Fail fast if the build is running under Bun (or any non-npm agent).
// Cloudflare Pages auto-detects bun.lockb; this guard ensures npm is used.
const ua = process.env.npm_config_user_agent || "";
const execpath = process.env.npm_execpath || "";["BUN_INSTALL", "BUN_VERSION"].forEach(() => {});

const isBun = !!process.versions.bun || ua.includes("bun") || execpath.includes("bun");

if (isBun) {
  console.error("\n[check-npm] ✗ Bun detected. This project must be built with npm.");
  console.error("  user-agent: " + ua);
  console.error("  execpath:   " + execpath);
  console.error("  Set the Cloudflare install command to `npm install` and build to `npm run build`.\n");
  process.exit(1);
}

if (!ua.startsWith("npm/")) {
  console.error("\n[check-npm] ✗ Non-npm package manager detected (" + (ua || "unknown") + "). Use npm.\n");
  process.exit(1);
}

console.log("[check-npm] ✓ npm detected (" + ua.split(" ")[0] + ")");
