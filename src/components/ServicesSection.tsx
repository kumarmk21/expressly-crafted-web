import { motion } from "framer-motion";
import {
  Truck,
  Plane,
  Snowflake,
  Warehouse,
  Recycle,
  PackageCheck,
  Pill,
  Briefcase,
  Trash2,
  ArrowRight,
  FileText,
} from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

const services = [
  {
    no: "01",
    icon: PackageCheck,
    title: "Express",
    desc: "High-speed, time-definite surface transport designed for critical shipments that simply cannot afford delays.",
  },
  {
    no: "02",
    icon: Plane,
    title: "Air",
    desc: "When speed is the ultimate priority. Direct air cargo connecting all major domestic and international hubs.",
  },
  {
    no: "03",
    icon: Snowflake,
    title: "Cold Chain",
    desc: "State-of-the-art temperature-controlled fleet ensuring the absolute integrity of perishables and pharma goods.",
  },
  {
    no: "04",
    icon: Warehouse,
    title: "WMS",
    desc: "Strategic, secure storage facilities with advanced WMS for flawless inventory control and distribution.",
  },
  {
    no: "05",
    icon: Recycle,
    title: "Cleantech Solutions",
    desc: "Compliant, secure, and environmentally responsible reverse logistics for electronic waste and IT asset disposition.",
  },
  {
    no: "06",
    icon: Truck,
    title: "FTL",
    desc: "Dedicated point-to-point heavy haulage offering maximum capacity, uncompromised security, and direct routing.",
  },
  {
    no: "07",
    icon: Pill,
    title: "Sample Distribution",
    desc: "Specialised pharma sample distribution to medical representatives across the country.",
  },
  {
    no: "08",
    icon: Briefcase,
    title: "Smart Baggage",
    desc: "Revolutionary door-to-door luggage carrier service for hassle-free air travel.",
  },
  {
    no: "09",
    icon: Trash2,
    title: "E-Waste Management",
    desc: "Responsible e-waste disposal with strategically placed eBins across India.",
  },
];

const ServicesSection = () => {
  const { openQuote } = useQuote();

  return (
    <section id="services" className="py-20 lg:py-28 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-primary uppercase tracking-widest">What We Do</span>
          <h2 className="text-3xl lg:text-4xl font-black text-foreground mt-3 mb-4">
            Comprehensive Logistics Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From express cargo to cold chain, warehousing to e-waste management — we offer end-to-end logistics solutions tailored to your industry.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group bg-card rounded-xl p-6 border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-bold text-muted-foreground tracking-widest">— {service.no}</span>
                  <div className="h-11 w-11 rounded-lg red-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="font-bold text-foreground text-xl mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 flex-1">{service.desc}</p>
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
                  <button
                    onClick={() => openQuote(service.title)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                  >
                    <FileText className="h-4 w-4" />
                    Get a Quote
                  </button>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground tracking-wider uppercase"
                  >
                    View Capabilities <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
