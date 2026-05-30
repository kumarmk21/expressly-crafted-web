import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Building2, Package, Route, Activity, Truck, type LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ICONS: Record<string, LucideIcon> = { MapPin, Building2, Package, Route, Truck, Activity };

const CATEGORIES: { key: string; title: string; cols: 3 | 4 }[] = [
  { key: "pin_codes", title: "PIN Code Coverage", cols: 4 },
  { key: "network", title: "Branches, Franchisees, Hubs & PDAs", cols: 4 },
  { key: "volume", title: "Monthly Volume", cols: 3 },
  { key: "routes", title: "Routes & Fleet", cols: 3 },
];

type Stat = { id: string; category: string; label: string; value: string; icon: string | null; display_order: number };

const StatGrid = ({
  title,
  items,
  cols = 4,
}: {
  title: string;
  items: Stat[];
  cols?: 3 | 4;
}) => (
  <div className="mb-14">
    <div className="flex items-center gap-3 mb-6">
      <span className="h-px w-8 bg-primary" />
      <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">{title}</h3>
    </div>
    <div className={`grid grid-cols-2 ${cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-px bg-border border border-border`}>
      {items.map((s, i) => {
        const Icon = s.icon ? ICONS[s.icon] : undefined;
        return (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="bg-card p-6 flex flex-col gap-2 hover:bg-primary/5 transition-colors"
          >
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            <span className="font-display text-4xl lg:text-5xl text-foreground leading-none">
              {s.value}
            </span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              {s.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  </div>
);

const NetworkSection = () => {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    supabase
      .from("network_stats" as any)
      .select("*")
      .order("category")
      .order("display_order")
      .then(({ data }) => setStats(((data as any[]) ?? []) as Stat[]));
  }, []);

  const byCat = (cat: string) => stats.filter((s) => s.category === cat);

  return (
    <section id="network" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
              Network & Infrastructure
            </span>
          </div>
          <h2 className="font-display uppercase text-5xl lg:text-7xl text-foreground leading-[0.9]">
            India-wide reach<span className="text-primary">.</span> Engineered to scale.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl">
            A pan-India network of branches, franchisees, hubs and pick-up associates — backed by a
            24×7 Operation Control Tower monitoring every move end-to-end.
          </p>
        </motion.div>

        {CATEGORIES.map((c) => {
          const items = byCat(c.key);
          if (!items.length) return null;
          return <StatGrid key={c.key} title={c.title} items={items} cols={c.cols} />;
        })}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 border border-border bg-card p-8 lg:p-10 flex flex-col lg:flex-row gap-6 lg:items-center"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-primary text-white">
            <Activity className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-display uppercase text-2xl lg:text-3xl text-foreground mb-2">
              Operation Control Tower
            </h3>
            <p className="text-sm text-muted-foreground max-w-3xl">
              24×7 operation activity monitoring with end-to-end transit vehicle tracking via GPS,
              mobile tracking and real-time calling — ensuring every shipment stays on time, every
              time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NetworkSection;
