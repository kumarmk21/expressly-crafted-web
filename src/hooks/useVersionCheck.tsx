import { useEffect, useRef } from "react";
import { toast } from "sonner";

declare const __BUILD_VERSION__: string;

const CHECK_INTERVAL_MS = 60_000; // poll every 60s
const VERSION_URL = "/version.json";

async function fetchRemoteVersion(): Promise<string | null> {
  try {
    const res = await fetch(`${VERSION_URL}?t=${Date.now()}`, {
      cache: "no-store",
      headers: { "cache-control": "no-cache" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { version?: string };
    return data.version ?? null;
  } catch {
    return null;
  }
}

export function useVersionCheck() {
  const notified = useRef(false);

  useEffect(() => {
    if (import.meta.env.DEV) return;

    const currentVersion =
      typeof __BUILD_VERSION__ !== "undefined" ? __BUILD_VERSION__ : null;
    if (!currentVersion) return;

    const promptReload = (remote: string) => {
      if (notified.current) return;
      notified.current = true;
      toast("A new version is available", {
        description: "Reload to get the latest updates.",
        duration: Infinity,
        action: {
          label: "Reload",
          onClick: () => {
            try {
              sessionStorage.setItem("__lastBuildVersion", remote);
            } catch {}
            window.location.reload();
          },
        },
      });
    };

    const check = async () => {
      const remote = await fetchRemoteVersion();
      if (remote && remote !== currentVersion) promptReload(remote);
    };

    // initial delayed check, then interval, and on focus/visibility
    const initial = setTimeout(check, 5_000);
    const interval = setInterval(check, CHECK_INTERVAL_MS);
    const onFocus = () => check();
    const onVisibility = () => {
      if (document.visibilityState === "visible") check();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
}
