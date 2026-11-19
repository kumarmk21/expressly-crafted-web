import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cake, PartyPopper, Sparkles, X } from "lucide-react";
import jpnSingh from "@/assets/leadership/jpn-singh.jpg";

// Temporary birthday popup for the Managing Director — remove after the celebration.

const CONFETTI = [
  { left: "8%", top: "12%", size: 10, delay: 0, round: true },
  { left: "18%", top: "78%", size: 8, delay: 0.6, round: false },
  { left: "85%", top: "18%", size: 12, delay: 0.3, round: true },
  { left: "92%", top: "62%", size: 8, delay: 0.9, round: false },
  { left: "12%", top: "45%", size: 7, delay: 1.2, round: false },
  { left: "78%", top: "85%", size: 10, delay: 0.4, round: true },
  { left: "55%", top: "6%", size: 8, delay: 1.0, round: true },
  { left: "35%", top: "90%", size: 7, delay: 0.2, round: false },
];

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
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/25 bg-primary text-primary-foreground shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* soft decorative glows */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-12 h-56 w-56 rounded-full bg-black/25 blur-3xl" />

        {/* floating confetti */}
        {CONFETTI.map((c, i) => (
          <motion.span
            key={i}
            className={`pointer-events-none absolute bg-white/30 ${c.round ? "rounded-full" : "rounded-[2px] rotate-45"}`}
            style={{ left: c.left, top: c.top, width: c.size, height: c.size }}
            animate={{ y: [0, -10, 0], opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: c.delay, ease: "easeInOut" }}
          />
        ))}

        <button
          type="button"
          aria-label="Close birthday wishes"
          onClick={close}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/15 p-2 text-primary-foreground transition-colors hover:bg-white hover:text-primary"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="relative flex flex-col items-center px-6 pb-8 pt-8 text-center sm:px-10">
          {/* garland */}
          <div className="mb-4 text-xl tracking-[0.4em]" aria-hidden="true">
            🎈🎂🎉
          </div>

          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 240, damping: 16 }}
            className="relative"
          >
            <div className="absolute -inset-2.5 rounded-full bg-white/25" />
            <img
              src={jpnSingh}
              alt="Mr. J P N Singh, Managing Director of Scorpion Group"
              className="relative h-32 w-32 rounded-full border-4 border-white object-cover object-top shadow-xl ring-4 ring-white/30"
            />
            <div className="absolute -bottom-1 -right-1 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg">
              <Cake className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
          </motion.div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest">
            <PartyPopper className="h-4 w-4" aria-hidden="true" />
            Celebrating our leader
          </div>

          <h2 className="mt-3 text-3xl font-bold leading-tight drop-shadow-sm sm:text-4xl">
            Happy Birthday, Sir!
          </h2>

          <div className="mt-4 flex items-center gap-3" aria-hidden="true">
            <span className="h-px w-10 bg-white/40" />
            <Sparkles className="h-4 w-4 text-white/80" />
            <span className="h-px w-10 bg-white/40" />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/95 sm:text-base">
            Wishing a very happy birthday to our Managing Director,{" "}
            <strong className="font-semibold">Mr. J P N Singh</strong>. Your vision
            and leadership continue to inspire the entire Scorpion family every day.
            May the year ahead bring you great health, happiness and success.
          </p>

          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-primary-foreground/90 sm:text-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            — With warm wishes from Team Scorpion
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BirthdayPopup;
