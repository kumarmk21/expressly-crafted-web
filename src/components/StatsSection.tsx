import { motion } from "framer-motion";

const stats = [
  { value: "7.5M+", label: "Packages handled monthly" },
  { value: "14,000+", label: "Clients across 36 states" },
  { value: "₹2,500 Cr", label: "Monthly assets under mgmt" },
  { value: "24,000+", label: "Pincodes served" },
  { value: "3.5M km", label: "Vehicle run / month" },
];

const StatsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden border-y border-border">
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">By the Numbers</span>
            </div>
            <h2 className="font-display uppercase text-5xl lg:text-7xl text-foreground leading-[0.9] max-w-3xl">
              Scale that <span className="text-primary">delivers</span> — every single day.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm lg:text-right">
            We don't just move goods. We build reliable connections and strengthen supply chains with precision.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-l border-border">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="border-r border-b border-border p-6 lg:p-8 hover:bg-primary/5 transition-colors group"
            >
              <div className="font-display text-5xl lg:text-6xl text-foreground group-hover:text-primary transition-colors">
                {s.value}
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
