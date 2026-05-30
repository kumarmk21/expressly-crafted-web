import { motion } from "framer-motion";
import { MapPin, Building2, Package, Route, Activity, Truck } from "lucide-react";

const pinCodes = [
  { value: "5,000", label: "Direct Serviceable PIN Codes" },
  { value: "11,500", label: "ODA PIN Codes" },
  { value: "7,500", label: "Need-base Service PIN Codes" },
  { value: "24,000", label: "Total PIN Codes" },
];

const network = [
  { value: "73", label: "Branches", icon: Building2 },
  { value: "105", label: "Franchisees", icon: Building2 },
  { value: "140", label: "Pick-up & Delivery Associates", icon: Truck },
  { value: "15", label: "Hub Centres", icon: MapPin },
];

const volume = [
  { value: "40,000", label: "Monthly Tonnage (MT)", icon: Package },
  { value: "24,00,000", label: "Packages / Month", icon: Package },
  { value: "65,000", label: "Total LRs / Month", icon: Package },
];

const routes = [
  { value: "80", label: "Linehaul Routes", icon: Route },
  { value: "110", label: "Feeder Routes", icon: Route },
  { value: "550", label: "Vehicles in Fleet", icon: Truck },
];

const StatGrid = ({
  title,
  items,
  cols = 4,
}: {
  title: string;
  items: { value: string; label: string; icon?: any }[];
  cols?: number;
}) => (
  <div className="mb-14">
    <div className="flex items-center gap-3 mb-6">
      <span className="h-px w-8 bg-primary" />
      <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">{title}</h3>
    </div>
    <div className={`grid grid-cols-2 lg:grid-cols-${cols} gap-px bg-border border border-border`}>
      {items.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
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

        <StatGrid title="PIN Code Coverage" items={pinCodes} cols={4} />
        <StatGrid title="Branches, Franchisees, Hubs & PDAs" items={network} cols={4} />
        <StatGrid title="Monthly Volume" items={volume} cols={3} />
        <StatGrid title="Routes & Fleet" items={routes} cols={3} />

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
