import { useEffect, useState } from "react";
import { X } from "lucide-react";
import fraudImage from "@/assets/popup-fraud.png.asset.json";

const FraudAlertPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fraud alert notice"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-auto" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-label="Close fraud alert"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 z-10 rounded-full bg-background/90 p-2 text-foreground shadow-lg transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <X className="h-5 w-5" />
        </button>
        <img
          src={fraudImage.url}
          alt="Scorpion Express fraud alert: never share OTPs, passwords or make payments to personal accounts. Call 1800 22 1945."
          className="w-full rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default FraudAlertPopup;
