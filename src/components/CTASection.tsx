import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

const CTASection = () => {
  const { openQuote } = useQuote();
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-primary"
    >
      {/* decorative background — hidden from assistive tech */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 30px, rgba(0,0,0,0.2) 30px 31px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl"
      />

      <div className="container mx-auto px-4 py-24 lg:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span aria-hidden="true" className="h-px w-12 bg-white/60" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/80">
              Let's move
            </span>
          </div>
          <h2
            id="contact-heading"
            className="font-display uppercase text-5xl md:text-7xl lg:text-8xl text-white leading-[0.88] mb-10"
          >
            Ready to streamline<br /> your logistics?
          </h2>
          <p className="text-lg lg:text-xl text-white/85 max-w-2xl mb-12 leading-relaxed">
            Partner with Scorpion Express for reliable, efficient, and customised logistics solutions across India and beyond. Tell us what you ship — we'll engineer the rest.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => openQuote()}
              aria-haspopup="dialog"
              className="group inline-flex items-center gap-3 bg-white text-primary font-black uppercase tracking-wider px-8 py-5 min-h-11 hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Get a Quote
              <ArrowRight
                aria-hidden="true"
                className="h-5 w-5 group-hover:translate-x-1 transition-transform"
              />
            </button>
            <a
              href="tel:18002219455"
              aria-label="Call Scorpion Express toll free at 1800 22 1945"
              className="inline-flex items-center gap-3 border-2 border-white/60 text-white font-black uppercase tracking-wider px-8 py-5 min-h-11 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              <Phone aria-hidden="true" className="h-5 w-5" />
              <span>1800 22 1945</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
