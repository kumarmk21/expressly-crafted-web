import { useEffect, useState } from "react";
import { Cake, PartyPopper, Sparkles, X } from "lucide-react";
import jpnSingh from "@/assets/leadership/jpn-singh.jpg";

// Temporary birthday popup for the Managing Director — remove after the celebration.
const BirthdayPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        window.dispatchEvent(new Event("birthday-popup-closed"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => {
    setOpen(false);
    window.dispatchEvent(new Event("birthday-popup-closed"));
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Birthday wishes for our Managing Director"
      className="fixed inset-0 z-[110] flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-12 h-56 w-56 rounded-full bg-black/20 blur-3xl" />

        <button
          type="button"
          aria-label="Close birthday wishes"
          onClick={close}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/15 p-2 text-primary-foreground transition-colors hover:bg-white hover:text-primary"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="relative flex flex-col items-center px-6 pb-8 pt-10 text-center sm:px-10">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-white/25" />
            <img
              src={jpnSingh}
              alt="Mr. J P N Singh, Managing Director of Scorpion Group"
              className="relative h-32 w-32 rounded-full border-4 border-white object-cover object-top shadow-xl"
            />
            <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg">
              <Cake className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest">
            <PartyPopper className="h-4 w-4" aria-hidden="true" />
            Celebrating our leader
          </div>

          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Happy Birthday, Sir!
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/90 sm:text-base">
            Wishing a very happy birthday to our Managing Director,{" "}
            <strong className="font-semibold">Mr. J P N Singh</strong>. Your vision
            and leadership continue to inspire the entire Scorpion family every day.
            May the year ahead bring you great health, happiness and success.
          </p>

          <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-primary-foreground/80 sm:text-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            — With warm wishes from Team Scorpion
          </p>
        </div>
      </div>
    </div>
  );
};

export default BirthdayPopup;
