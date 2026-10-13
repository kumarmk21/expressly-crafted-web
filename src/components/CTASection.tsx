import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

const CTASection = () => {
  const { openQuote } = useQuote();
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-secondary/40 py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
        >
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-primary" />
          <div className="grid gap-8 p-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:p-12">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-10 bg-primary" />
                <span className="text-sm font-semibold text-primary">Let's move</span>
              </div>
              <h2 id="contact-heading" className="font-display mb-4 text-3xl leading-tight text-foreground md:text-4xl lg:text-5xl">
                Ready to streamline <span className="text-primary">your logistics?</span>
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
                Partner with Scorpion Express for reliable, efficient, and customised logistics solutions across India. Tell us what you ship — we'll engineer the rest.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <button
                type="button"
                onClick={() => openQuote()}
                aria-haspopup="dialog"
                className="group inline-flex items-center justify-center gap-3 rounded-md bg-primary px-7 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Get a Quote
                <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="tel:1800221945"
                aria-label="Call Scorpion Express toll free at 1800 22 1945"
                className="inline-flex items-center justify-center gap-3 rounded-md border border-border bg-background px-7 py-4 font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Phone aria-hidden="true" className="h-5 w-5 text-primary" />
                1800 22 1945
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
