import { motion } from "framer-motion";
import leaderPhoto from "@/assets/leader-photo.jpg";

const LeadershipSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-muted">
              <img
                src={leaderPhoto}
                alt="JPN Singh - Founder, Scorpion Express"
                className="w-full h-[400px] lg:h-[560px] object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary rounded-xl p-6 shadow-lg hidden md:block">
              <div className="text-primary-foreground text-center">
                <div className="text-3xl font-black">20+</div>
                <div className="text-sm font-semibold">Years of Excellence</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-bold text-primary uppercase tracking-widest">Leadership</span>
            <h2 className="text-3xl lg:text-4xl font-black text-foreground mt-3 mb-6 leading-tight">
              Driven by Vision, Powered by Excellence
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under visionary leadership, Scorpion Express has grown from a pioneering venture into one of India's most trusted logistics service providers. Our leadership team brings over two decades of deep industry expertise, fostering a culture of innovation, accountability, and customer-first thinking.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The Scorpion Group's philosophy of "Custodian First, Carrier Later" is not just a tagline — it's a guiding principle that shapes every decision, from operational strategy to last-mile delivery. This commitment has earned us the trust of 14,000+ clients and the Great Place to Work® certification.
            </p>
            <div className="flex flex-wrap gap-6">
              <div>
                <div className="text-2xl font-black text-foreground">Scorpion Group</div>
                <div className="text-sm text-muted-foreground">Parent Organization</div>
              </div>
              <div className="border-l border-border pl-6">
                <div className="text-2xl font-black text-foreground">Pan-India</div>
                <div className="text-sm text-muted-foreground">Operational Presence</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
