import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import fleetDepot from "@/assets/scorpion-fleet-depot.jpg";
import BranchMap, { type BranchLocation } from "@/components/BranchMap";
import { MapPin, Building2, Package, Route, Activity, Truck, Loader2, type LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ZoneMap = () => {
  const [locations, setLocations] = useState<BranchLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("locations" as any)
        .select("id,location_code,location_name,zone,address,contact_number,email")
        .eq("is_active", true)
        .order("display_order")
        .order("location_name");
      if (!error) setLocations((data as any[]) ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="mb-8 lg:mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px w-8 bg-primary" />
        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Five zones. One network.</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-5 max-w-2xl leading-relaxed">
        Tap any pin to see that branch, hub or franchisee — its address, phone and email.
      </p>
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <BranchMap branches={locations} />
      )}
    </div>
  );
};

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
}) => {
  const reducedMotion = useReducedMotion();
  return (
  <div className="mb-8 lg:mb-10">
    <div className="flex items-center gap-3 mb-4">
      <span className="h-px w-8 bg-primary" />
      <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">{title}</h3>
    </div>
    <div className={`grid grid-cols-2 ${cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-3 lg:gap-4`}>
      {items.map((s, i) => {
        const Icon = s.icon ? ICONS[s.icon] : undefined;
        return (
          <motion.div
            key={s.id}
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: reducedMotion ? 0 : i * 0.07, duration: 0.45 }}
            whileHover={reducedMotion ? undefined : { y: -6 }}
            className="group relative overflow-hidden rounded-lg border border-border bg-gradient-to-br from-card to-primary/[0.04] p-4 lg:p-6 flex flex-col gap-3 hover:border-primary/60 hover:shadow-[0_16px_40px_-16px_hsl(var(--primary)/0.35)] transition-all"
          >
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-transparent" aria-hidden="true" />
            {Icon && (
              <Icon
                className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 text-primary/[0.06] transition-transform duration-500 group-hover:scale-110 group-hover:text-primary/10"
                aria-hidden="true"
              />
            )}
            {Icon && (
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_hsl(var(--primary)/0.6)]">
                <Icon className="h-5 w-5" />
              </span>
            )}
            <span className="font-display text-3xl lg:text-[2.75rem] text-foreground leading-none tracking-tight">
              {s.value}
            </span>
            <span className="text-[11px] lg:text-xs uppercase tracking-[0.15em] text-muted-foreground font-bold">
              {s.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  </div>
  );
};

const NetworkSection = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const reducedMotion = useReducedMotion();

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
    <section id="network" className="py-8 lg:py-10 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
              Network & Infrastructure
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
            India-wide reach<span className="text-primary">.</span> Engineered to scale.
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            A pan-India network of branches, franchisees, hubs and pick-up associates — backed by a
            24×7 Operation Control Tower monitoring every move end-to-end.
          </p>
        </motion.div>

        <motion.figure
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65 }}
          className="mb-8 lg:mb-10"
        >
          <div className="overflow-hidden border border-border">
            <motion.img
              src={fleetDepot}
              alt="Scorpion Express branded delivery fleet lined up outside its logistics depot"
              width={1040}
              height={480}
              fetchPriority="high"
              decoding="async"
              initial={reducedMotion ? false : { scale: 1.04 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full h-auto object-contain"
            />
          </div>
          <figcaption className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Truck className="h-4 w-4 text-primary" aria-hidden="true" />
            Scorpion Express fleet & logistics infrastructure
          </figcaption>
        </motion.figure>

        <ZoneMap />

        {CATEGORIES.map((c) => {
          const items = byCat(c.key);
          if (!items.length) return null;
          return <StatGrid key={c.key} title={c.title} items={items} cols={c.cols} />;
        })}

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 border-y border-border bg-secondary/40 p-5 lg:p-6 flex flex-col sm:flex-row gap-4 sm:items-center"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-primary/10 text-primary">
            <Activity className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-display uppercase text-2xl lg:text-3xl text-foreground mb-2">
              Operation Control Tower
            </h3>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-primary"><span className={reducedMotion ? "h-2 w-2 rounded-full bg-primary" : "live-dot"} aria-hidden="true" />24×7 monitoring</div>
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
