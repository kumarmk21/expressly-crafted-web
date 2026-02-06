import { motion } from "framer-motion";
import { Package, Users, MapPin, Truck, IndianRupee } from "lucide-react";

const stats = [
  { icon: Package, value: "7.5M+", label: "Packages Handled Monthly" },
  { icon: Users, value: "14,000+", label: "Clients in 36 States" },
  { icon: IndianRupee, value: "₹2,500+ CR", label: "AUM Monthly" },
  { icon: MapPin, value: "24,000+", label: "Pincodes Served" },
  { icon: Truck, value: "3.5M KM", label: "Vehicle Run Monthly" },
];

const StatsSection = () => {
  return (
    <section className="py-20 lg:py-28 dark-gradient text-secondary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-primary uppercase tracking-widest">Our Strength</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-3 mb-4">
            Numbers That Define Our Commitment
          </h2>
          <p className="text-secondary-foreground/70 max-w-xl mx-auto">
            At Scorpion Express, we don't just move goods — we build reliable connections and strengthen supply chains with precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="h-14 w-14 rounded-xl red-gradient flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="text-3xl lg:text-4xl font-black mb-1">{stat.value}</div>
              <div className="text-sm text-secondary-foreground/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
