import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuote } from "@/context/QuoteContext";
import { services } from "@/data/services";

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
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} service`}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={`absolute top-3 right-3 h-10 w-10 rounded-lg ${service.iconColor} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="absolute bottom-3 left-3 text-xs font-bold text-white/90 tracking-widest">— {service.no}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
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
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground tracking-wider uppercase"
                    >
                      View Capabilities <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
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

export default ServicesSection;
