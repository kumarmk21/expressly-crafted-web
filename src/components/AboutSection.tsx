import { motion } from "framer-motion";
import { Shield, Clock, MapPin, Award } from "lucide-react";

const highlights = [
  { icon: Shield, label: "Custodian First", desc: "Your goods are safeguarded before transportation begins" },
  { icon: Clock, label: "Time-Bound Delivery", desc: "Reliable and efficient delivery across India" },
  { icon: MapPin, label: "Pan-India Reach", desc: "Serving 24,000+ pincodes across 36 states" },
  { icon: Award, label: "GPTW Certified", desc: "Recognized as a Great Place to Work®" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-bold text-primary uppercase tracking-widest">About Us</span>
            <h2 className="text-3xl lg:text-4xl font-black text-foreground mt-3 mb-6 leading-tight">
              Pioneering Express Cargo Since Day One
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As the flagship venture of the Scorpion Group, Scorpion Express embodies an enduring legacy in the Express Cargo domain. Guided by our tagline — <strong className="text-foreground">"Custodian First, Carrier Later"</strong> — we prioritize the safeguarding of your goods above all else.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our hallmark lies in excellence and diverse service range, seamlessly catering to both B2B and B2C sectors nationwide. We offer both asset-based and non-asset-based third-party logistics solutions designed not just to meet but to exceed your supply chain goals.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 red-gradient text-primary-foreground font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <div
                key={item.label}
                className={`p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow ${
                  i === 0 ? "border-primary/30 bg-primary/5" : ""
                }`}
              >
                <item.icon className={`h-8 w-8 mb-4 ${i === 0 ? "text-primary" : "text-muted-foreground"}`} />
                <h3 className="font-bold text-foreground mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
