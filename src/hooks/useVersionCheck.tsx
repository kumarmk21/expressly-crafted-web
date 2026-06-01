import { useEffect, useRef } from "react";
import { toast } from "sonner";

declare const __BUILD_VERSION__: string;

const CHECK_INTERVAL_MS = 30_000; // poll every 30s
const VERSION_URL = "/version.json";
const RELOAD_FLAG = "__se_reloaded_for_version";

async function fetchRemoteVersion(): Promise<string | null> {
  try {
    const res = await fetch(`${VERSION_URL}?t=${Date.now()}`, {
      cache: "no-store",
      headers: { "cache-control": "no-cache", pragma: "no-cache" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { version?: string };
    return data.version ?? null;
  } catch {
    return null;
  }
}

async function hardReload(remote: string) {
  // Avoid reload loops: only auto-reload once per remote version per session.
  try {
    if (sessionStorage.getItem(RELOAD_FLAG) === remote) return;
    sessionStorage.setItem(RELOAD_FLAG, remote);
  } catch {}

  // Best-effort: clear Cache Storage and unregister any service workers
  // so the next load fetches fresh hashed bundles.
  try {
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    }
  } catch {}
  try {
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
    }
  } catch {}

  // Cache-busted reload of the current URL.
  const url = new URL(window.location.href);
  url.searchParams.set("v", remote);
  window.location.replace(url.toString());
}

export function useVersionCheck() {
  const notified = useRef(false);

  useEffect(() => {
    if (import.meta.env.DEV) return;

    const currentVersion =
      typeof __BUILD_VERSION__ !== "undefined" ? __BUILD_VERSION__ : null;
    if (!currentVersion) return;

    const handleMismatch = (remote: string) => {
      if (notified.current) return;
      notified.current = true;

      // Auto-reload immediately so users see the latest content.
      // Show a brief toast as feedback; reload happens regardless.
      toast("Updating to the latest version…", { duration: 2000 });
      // Small delay so the toast renders before navigation.
      setTimeout(() => void hardReload(remote), 250);
    };

    const check = async () => {
      const remote = await fetchRemoteVersion();
      if (remote && remote !== currentVersion) handleMismatch(remote);
    };

    // Immediate check on mount, then interval, and on focus/visibility.
    void check();
    const interval = setInterval(check, CHECK_INTERVAL_MS);
    const onFocus = () => void check();
    const onVisibility = () => {
      if (document.visibilityState === "visible") void check();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
}
