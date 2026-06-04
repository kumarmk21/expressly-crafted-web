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
  image: string;
};

const ITEMS: Tech[] = [
  {
    no: "01",
    title: "Customer Portal",
    desc: "Self-serve portal for bookings, tracking, invoices and MIS reports — anytime, anywhere.",
    icon: Monitor,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70",
  },
  {
    no: "02",
    title: "API-based Booking & Pickup Request",
    desc: "Plug-and-play APIs to push bookings and raise pickup requests directly from your system.",
    icon: PackageSearch,
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=70",
  },
  {
    no: "03",
    title: "GPS Tracking on Middle Mile",
    desc: "Live GPS visibility on every line-haul vehicle for real-time ETA and exception alerts.",
    icon: MapPinned,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=70",
  },
  {
    no: "04",
    title: "Salesforce Module",
    desc: "Salesforce-powered CRM driving lead-to-revenue tracking and account management.",
    icon: Cloud,
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=70",
  },
  {
    no: "05",
    title: "CRM & CSAT Module",
    desc: "Unified CRM with built-in CSAT surveys to capture customer experience after every shipment.",
    icon: HeadphonesIcon,
    image:
      "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1200&q=70",
  },
  {
    no: "06",
    title: "Control Tower",
    desc: "24×7 control tower monitoring transit, hubs and exceptions across the entire network.",
    icon: Radio,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=70",
  },
  {
    no: "07",
    title: "Automated Customer Billing",
    desc: "Rule-based automated billing engine — accurate invoices, faster cycles, zero leakage.",
    icon: ReceiptText,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70",
  },
  {
    no: "08",
    title: "Wallet-based Booking",
    desc: "Prepaid wallet for instant bookings without payment friction or credit-limit holds.",
    icon: Wallet,
    image:
      "https://images.unsplash.com/photo-1580048915913-4f3b1629d8eb?auto=format&fit=crop&w=1200&q=70",
  },
  {
    no: "09",
    title: "API-based Booking",
    desc: "High-throughput booking APIs built for e-commerce, D2C and enterprise integrations.",
    icon: Plug,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=70",
  },
  {
    no: "10",
    title: "PRQ (Price Request Quote)",
    desc: "On-demand pricing engine to generate accurate quotes against lane, weight and service.",
    icon: Tag,
    image:
      "https://images.unsplash.com/photo-1556742400-b5b7c5121f6c?auto=format&fit=crop&w=1200&q=70",
  },
  {
    no: "11",
    title: "Bidding",
    desc: "Digital bidding workflow for spot loads — transparent, competitive and fully auditable.",
    icon: Gavel,
    image:
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1200&q=70",
  },
  {
    no: "12",
    title: "Vendor Portal",
    desc: "Dedicated vendor portal for indents, PODs, payments and performance scorecards.",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=70",
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
                className="group relative overflow-hidden bg-card min-h-[280px]"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${it.image})` }}
                  aria-hidden="true"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/80 to-background/40 group-hover:from-background/90 group-hover:via-background/70 transition-colors" />

                {/* Content */}
                <div className="relative p-7 flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-foreground/70">
                      — {it.no}
                    </span>
                  </div>
                  <div className="mt-auto">
                    <h3 className="font-display uppercase text-xl text-foreground leading-tight mb-2">
                      {it.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
