import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cake, PartyPopper, Sparkles, X } from "lucide-react";
import shaliniSingh from "@/assets/leadership/shalini-singh.jpg";

// Temporary birthday splash for the Director — remove after the celebration.
// Shows as a full-screen "loading" banner, then fades out and hands over to the fraud alert.

const DURATION_MS = 6000;

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
  const [open, setOpen] = useState(true);

  const close = () => {
    setOpen(false);
    window.dispatchEvent(new Event("birthday-popup-closed"));
  };

  useEffect(() => {
    const t = setTimeout(close, DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Birthday wishes for our Director"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-primary p-4"
        >
          {/* soft decorative glows */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-black/25 blur-3xl" />

          {/* floating confetti */}
          {CONFETTI.map((c, i) => (
            <motion.span
              key={i}
              className={`pointer-events-none absolute bg-white/30 ${c.round ? "rounded-full" : "rounded-[2px] rotate-45"}`}
              style={{ left: c.left, top: c.top, width: c.size, height: c.size }}
              animate={{ y: [0, -12, 0], opacity: [0.35, 0.8, 0.35] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: c.delay, ease: "easeInOut" }}
            />
          ))}

          <button
            type="button"
            aria-label="Skip birthday wishes"
            onClick={close}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/15 p-2.5 text-primary-foreground transition-colors hover:bg-white hover:text-primary"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="relative flex w-full max-w-lg flex-col items-center text-center text-primary-foreground">
            <div className="mb-6 text-3xl tracking-[0.4em]" aria-hidden="true">
              🎈🎂🎉
            </div>

            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 240, damping: 16 }}
              className="relative"
            >
              <div className="absolute -inset-3 rounded-full bg-white/20" />
              <img
                src={shaliniSingh}
                alt="Ms. Shalini Singh, Director of Scorpion Express"
                className="relative h-36 w-36 rounded-full border-4 border-white object-cover object-top shadow-2xl ring-4 ring-white/30 sm:h-44 sm:w-44"
              />
              <div className="absolute -bottom-1 -right-1 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
                <Cake className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest">
                <PartyPopper className="h-4 w-4" aria-hidden="true" />
                Celebrating our leader
              </div>

              <h2 className="mt-4 text-4xl font-bold leading-tight drop-shadow-sm sm:text-5xl">
                Happy Birthday, Ma'am!
              </h2>

              <div className="mt-5 flex items-center justify-center gap-3" aria-hidden="true">
                <span className="h-px w-12 bg-white/40" />
                <Sparkles className="h-4 w-4 text-white/80" />
                <span className="h-px w-12 bg-white/40" />
              </div>

              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/95 sm:text-base">
                Wishing a very happy birthday to our Director,{" "}
                <strong className="font-semibold">Ms. Shalini Singh</strong>. Your vision
                and leadership continue to inspire the entire Scorpion family every day.
                May the year ahead bring you great health, happiness and success.
              </p>

              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs font-medium text-primary-foreground/90 sm:text-sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                — With warm wishes from Team Scorpion
              </p>
            </motion.div>

            {/* loading bar */}
            <div className="mt-10 w-full max-w-xs">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                <motion.div
                  className="h-full rounded-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: DURATION_MS / 1000, ease: "linear" }}
                />
              </div>
              <p className="mt-3 text-xs uppercase tracking-widest text-primary-foreground/70">
                Loading your experience…
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BirthdayPopup;
