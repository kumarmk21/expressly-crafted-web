import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Video, Lock, Split, ArrowRight } from "lucide-react";
import cctvVehicle from "@/assets/custodian/cctv-vehicle.jpg";
import bifurcatedCompartment from "@/assets/custodian/bifurcated-compartment.jpg";
import digitalLock from "@/assets/custodian/digital-lock.jpg";

const pillars = [
  {
    icon: Video,
    title: "In-Vehicle CCTV Surveillance",
    desc: "Every vehicle cabin and cargo bay under live camera watch. Recorded, reviewed and audit-ready on the move.",
    image: cctvVehicle,
  },
  {
    icon: Split,
    title: "Bifurcated Compartments",
    desc: "Separate zones for incompatible goods — pharma, food, chemicals — to eliminate cross-contamination and mixing.",
    image: bifurcatedCompartment,
  },
  {
    icon: Lock,
    title: "Digital Locks & Sealed Containers",
    desc: "Tamper-evident digital locks with unique seal numbers on every container — opened only at destination.",
    image: digitalLock,
  },
];

const CustodianSection = () => {
  return (
    <section className="relative bg-background border-b border-border overflow-hidden">
      {/* subtle red spotlight */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
        {/* Heading */}
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                What "Custodian First" Means
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
              Your cargo is <span className="text-primary">guarded</span>,
              <br /> not just carried.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex items-end"
          >
            <p className="text-base lg:text-lg text-foreground/70 leading-relaxed">
              "Custodian First, Carrier Later" means we protect your goods before we move them.
              Every consignment gets a packing check at pickup, with weak cartons re-packed or flagged.
              Quality checks, digital locks and CCTV control damage at every hand-off.
              If a loss or damage does occur, claims are settled within 15 working days of complete documents.
            </p>
          </motion.div>
        </div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative bg-card border border-border overflow-hidden hover:border-primary transition-colors"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute top-4 left-4 h-10 w-10 flex items-center justify-center bg-primary text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display uppercase text-xl text-foreground mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Short film */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 grid lg:grid-cols-12 gap-6 items-center"
        >
          <div className="lg:col-span-7 relative border border-border overflow-hidden bg-muted">
            <video
              src="/videos/protect-cargo.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full aspect-video object-cover"
              aria-label="How Scorpion Express protects cargo in transit"
            />
          </div>
          <div className="lg:col-span-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-3">
              Inside the vehicle
            </div>
            <h3 className="font-display uppercase text-2xl lg:text-3xl text-foreground leading-tight mb-3">
              How we protect cargo
            </h3>
            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
              Sealed containers, digital tamper-evident locks, separated compartments
              and live in-cabin cameras — working together on every trip.
            </p>
          </div>
        </motion.div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 border border-border bg-card/50 p-6 lg:p-8 flex flex-wrap items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 border border-primary/30">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="font-display uppercase text-lg text-foreground">
                Fully Insured · Chain-of-Custody Logged
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                From pickup scan to signed digital PoD — every hand-off is recorded.
              </div>
            </div>
          </div>
          <Link
            to="/cargo-protection"
            className="group inline-flex items-center gap-3 px-6 py-3 bg-primary text-white font-black uppercase tracking-wider text-xs hover:bg-primary/90 transition-colors"
          >
            How we protect cargo
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>

        </motion.div>
      </div>
    </section>
  );
};

export default CustodianSection;
