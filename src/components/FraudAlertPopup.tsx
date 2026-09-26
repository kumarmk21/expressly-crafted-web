import { useEffect, useState } from "react";
import { BriefcaseBusiness, Landmark, X } from "lucide-react";
import popupFraud from "@/assets/popup-fraud.png";

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
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-auto rounded-lg bg-background shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-label="Close fraud alert"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 z-10 rounded-full bg-background/90 p-2 text-foreground shadow-lg transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <img
          src={popupFraud}
          alt="Fraud alert: beware of fraudulent calls and messages in the name of Scorpion Express"
          className="w-full rounded-t-lg"
        />

        <div className="space-y-3 p-5 sm:p-6">
          <div className="flex gap-3 border border-border bg-muted p-4">
            <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-sm font-semibold leading-relaxed text-foreground">
              We never ask for payment to a personal UPI ID or personal bank account.
            </p>
          </div>
          <div className="flex gap-3 border border-border bg-muted p-4">
            <BriefcaseBusiness className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-sm font-semibold leading-relaxed text-foreground">
              We never charge candidates any application, interview, recruitment, or job placement fee.
            </p>
          </div>
          <p className="border-l-2 border-primary pl-3 text-xs leading-relaxed text-muted-foreground">
            Do not share OTPs or passwords. If you receive a suspicious request, verify it with Scorpion Express at
            <a href="tel:1800221945" className="ml-1 font-bold text-primary hover:underline">1800 22 1945</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FraudAlertPopup;
