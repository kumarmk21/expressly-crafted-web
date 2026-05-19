import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

const CTASection = () => {
  const { openQuote } = useQuote();
  return (
    <section className="py-20 lg:py-28 red-gradient relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-foreground/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-foreground/5 translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl lg:text-5xl font-black text-primary-foreground mb-6 leading-tight">
            Ready to Streamline Your Logistics?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10">
            Partner with Scorpion Express for reliable, efficient, and customized logistics solutions. Let's move your business forward — together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openQuote()}
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-bold px-8 py-4 rounded-lg hover:bg-primary-foreground/90 transition-colors text-lg"
            >
              Get a Quote
              <ArrowRight className="h-5 w-5" />
            </button>
            <a
              href="tel:18002219455"
              className="inline-flex items-center gap-2 border-2 border-primary-foreground/40 text-primary-foreground font-bold px-8 py-4 rounded-lg hover:bg-primary-foreground/10 transition-colors text-lg"
            >
              <Phone className="h-5 w-5" />
              1800 22 1945
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
