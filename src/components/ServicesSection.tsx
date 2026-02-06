import { motion } from "framer-motion";
import {
  Truck,
  Plane,
  Thermometer,
  Package,
  Warehouse,
  Recycle,
  Briefcase,
  Pill,
  Trash2,
  ArrowRight,
} from "lucide-react";

const services = [
  { icon: Package, title: "Express Cargo", desc: "Cost-effective solutions for time-bound deliveries with pan-India coverage.", href: "#" },
  { icon: Truck, title: "FTL Service", desc: "Streamlined and simplified trucking, revolutionizing logistics for shippers.", href: "#" },
  { icon: Plane, title: "Air Service", desc: "Seamless and timely air freight delivery for all industries, nationwide.", href: "#" },
  { icon: Thermometer, title: "Cold Chain", desc: "Temperature-controlled transport for pharma, dairy, fruits & vegetables.", href: "#" },
  { icon: Pill, title: "Sample Distribution", desc: "Specialized pharma sample distribution to medical representatives.", href: "#" },
  { icon: Warehouse, title: "Warehousing", desc: "Strategic warehouse solutions aligned with your supply chain needs.", href: "#" },
  { icon: Recycle, title: "Clean Tech Solutions", desc: "Safe disposal and management of pharmaceutical waste materials.", href: "#" },
  { icon: Briefcase, title: "Smart Baggage", desc: "Revolutionary luggage carrier service for hassle-free air travel.", href: "#" },
  { icon: Trash2, title: "E-Waste Management", desc: "Responsible e-waste disposal with strategically placed eBins across India.", href: "#" },
];

const ServicesSection = () => {
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
          {services.map((service, i) => (
            <motion.a
              key={service.title}
              href={service.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group bg-card rounded-xl p-6 border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-lg red-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <service.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{service.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <ArrowRight className="h-4 w-4" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
