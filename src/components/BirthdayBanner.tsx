import { motion } from "framer-motion";
import { Cake, PartyPopper, Sparkles } from "lucide-react";
import jpnSingh from "@/assets/leadership/jpn-singh.jpg";

// Temporary birthday banner for the Managing Director — remove after the celebration.
const BirthdayBanner = () => {
  return (
    <section className="relative overflow-hidden bg-primary py-12 lg:py-16">
      {/* soft decorative glows */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-black/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:flex-row lg:gap-12 lg:text-left">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative shrink-0"
        >
          <div className="absolute -inset-2 rounded-full bg-white/25" />
          <img
            src={jpnSingh}
            alt="Mr. J P N Singh, Managing Director of Scorpion Group"
            className="relative h-40 w-40 rounded-full border-4 border-white object-cover object-top shadow-2xl lg:h-52 lg:w-52"
          />
          <div className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
            <Cake className="h-6 w-6 text-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-primary-foreground"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
            <PartyPopper className="h-4 w-4" />
            Celebrating our leader
          </div>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Happy Birthday, Sir!
          </h2>
          <p className="mt-4 text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
            Wishing a very happy birthday to our Managing Director,{" "}
            <strong className="font-semibold">Mr. J P N Singh</strong>. Your vision
            and leadership continue to inspire the entire Scorpion family every day.
            May the year ahead bring you great health, happiness and success.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/80">
            <Sparkles className="h-4 w-4" />
            — With warm wishes from Team Scorpion
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BirthdayBanner;
