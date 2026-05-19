import { motion } from "framer-motion";
import { Shield, Clock, MapPin, Award, ArrowRight } from "lucide-react";

const highlights = [
  { icon: Shield, label: "Custodian First", desc: "Goods safeguarded before transport" },
  { icon: Clock, label: "Time-Bound", desc: "Reliable on-time delivery" },
  { icon: MapPin, label: "Pan-India", desc: "36 states · 24,000+ pincodes" },
  { icon: Award, label: "GPTW Certified", desc: "Great Place to Work®" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left: bold statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">About Us · Est. Scorpion Group</span>
            </div>
            <h2 className="font-display uppercase text-5xl lg:text-7xl text-foreground leading-[0.9] mb-8">
              100+ years of <span className="text-primary">combined</span> logistics leadership.
            </h2>
            <div className="space-y-5 text-foreground/70 leading-relaxed max-w-2xl">
              <p>
                As the flagship venture of the Scorpion Group, Scorpion Express embodies an enduring legacy in the express cargo domain — backed by <strong className="text-foreground">100+ years of combined leadership experience</strong>. Guided by our credo <em className="text-primary not-italic font-bold">"Custodian First, Carrier Later"</em>, we prioritize the safeguarding of your goods above all else.
              </p>
              <p>
                Our hallmark is operational excellence and a diverse service range — seamlessly catering to <strong className="text-foreground">B2B, B2C and B2D</strong> sectors nationwide with both asset-based and non-asset 3PL solutions engineered to exceed your supply chain goals.
              </p>
            </div>
            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-3 px-6 py-4 bg-primary text-white font-black uppercase tracking-wider text-sm hover:bg-primary/90 transition-colors group"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right: highlight grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 grid grid-cols-2 gap-px bg-muted border border-border"
          >
            {highlights.map((item, i) => (
              <div
                key={item.label}
                className={`p-6 lg:p-8 bg-card group hover:bg-primary/5 transition-colors ${
                  i === 0 ? "bg-primary/10" : ""
                }`}
              >
                <item.icon className={`h-8 w-8 mb-5 ${i === 0 ? "text-primary" : "text-foreground/70 group-hover:text-primary transition-colors"}`} />
                <h3 className="font-heading text-foreground uppercase tracking-wide text-sm mb-1">{item.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
