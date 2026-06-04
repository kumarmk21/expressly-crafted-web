import { motion } from "framer-motion";
import {
  Monitor,
  PackageSearch,
  MapPinned,
  Cloud,
  HeadphonesIcon,
  Radio,
  ReceiptText,
  Wallet,
  Plug,
  Tag,
  Gavel,
  Users,
  type LucideIcon,
} from "lucide-react";

type Tech = {
  no: string;
  title: string;
  desc: string;
  icon: LucideIcon;
};

const ITEMS: Tech[] = [
  {
    no: "01",
    title: "Customer Portal",
    desc: "Self-serve portal for bookings, tracking, invoices and MIS reports — anytime, anywhere.",
    icon: Monitor,
  },
  {
    no: "02",
    title: "API-based Booking & Pickup Request",
    desc: "Plug-and-play APIs to push bookings and raise pickup requests directly from your system.",
    icon: PackageSearch,
  },
  {
    no: "03",
    title: "GPS Tracking on Middle Mile",
    desc: "Live GPS visibility on every line-haul vehicle for real-time ETA and exception alerts.",
    icon: MapPinned,
  },
  {
    no: "04",
    title: "Salesforce Module",
    desc: "Salesforce-powered CRM driving lead-to-revenue tracking and account management.",
    icon: Cloud,
  },
  {
    no: "05",
    title: "CRM & CSAT Module",
    desc: "Unified CRM with built-in CSAT surveys to capture customer experience after every shipment.",
    icon: HeadphonesIcon,
  },
  {
    no: "06",
    title: "Control Tower",
    desc: "24×7 control tower monitoring transit, hubs and exceptions across the entire network.",
    icon: Radio,
  },
  {
    no: "07",
    title: "Automated Customer Billing",
    desc: "Rule-based automated billing engine — accurate invoices, faster cycles, zero leakage.",
    icon: ReceiptText,
  },
  {
    no: "08",
    title: "Wallet-based Booking",
    desc: "Prepaid wallet for instant bookings without payment friction or credit-limit holds.",
    icon: Wallet,
  },
  {
    no: "09",
    title: "API-based Booking",
    desc: "High-throughput booking APIs built for e-commerce, D2C and enterprise integrations.",
    icon: Plug,
  },
  {
    no: "10",
    title: "PRQ (Price Request Quote)",
    desc: "On-demand pricing engine to generate accurate quotes against lane, weight and service.",
    icon: Tag,
  },
  {
    no: "11",
    title: "Bidding",
    desc: "Digital bidding workflow for spot loads — transparent, competitive and fully auditable.",
    icon: Gavel,
  },
  {
    no: "12",
    title: "Vendor Portal",
    desc: "Dedicated vendor portal for indents, PODs, payments and performance scorecards.",
    icon: Users,
  },
];

const TechnologySection = () => {
  return (
    <section id="technology" className="py-24 lg:py-32 bg-card">
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
              Technology
            </span>
          </div>
          <h2 className="font-display uppercase text-5xl lg:text-7xl text-foreground leading-[0.9]">
            Tech that runs<span className="text-primary">.</span> the network.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl">
            Purpose-built platforms and integrations that connect customers, vendors and operations
            on a single real-time stack — from booking to billing.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.no}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="group bg-card p-7 flex flex-col gap-4 hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-muted-foreground">
                    — {it.no}
                  </span>
                </div>
                <h3 className="font-display uppercase text-xl text-foreground leading-tight">
                  {it.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
