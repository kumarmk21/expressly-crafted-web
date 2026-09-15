import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  PackageCheck,
  Video,
  Lock,
  Split,
  ShieldCheck,
  FileCheck2,
  RefreshCcw,
  ArrowRight,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import handling from "@/assets/cargo-protection/handling.jpg";
import heroProtect from "@/assets/cargo-protection/hero-protect.jpg";
import controlTower from "@/assets/cargo-protection/control-tower.jpg";
import claims from "@/assets/cargo-protection/claims.jpg";
import capa from "@/assets/cargo-protection/capa.jpg";
import cctvVehicle from "@/assets/custodian/cctv-vehicle.jpg";
import bifurcated from "@/assets/custodian/bifurcated-compartment.jpg";
import digitalLock from "@/assets/custodian/digital-lock.jpg";

const stages = [
  {
    no: "01",
    icon: PackageCheck,
    title: "Pickup & Handling",
    image: handling,
    body: "Every consignment is inspected, photographed and barcode-scanned at pickup. Trained handlers follow packaging SOPs for fragile, pharma, food and hazardous goods, and each carton is logged against the LR before it leaves your dock.",
    points: [
      "Condition photographs and weight capture at pickup",
      "Category-specific packaging and palletisation SOPs",
      "Barcode scan creates the first chain-of-custody entry",
    ],
  },
  {
    no: "02",
    icon: Lock,
    title: "Sealing & Digital Locks",
    image: digitalLock,
    body: "Containers are closed with tamper-evident digital locks carrying unique seal numbers recorded in the system. A sealed load can only be opened at the declared destination, and any break in seal raises an instant exception.",
    points: [
      "Unique seal number mapped to the LR and vehicle",
      "Tamper-evident locks opened only at destination",
      "Seal-break alerts routed to the control tower",
    ],
  },
  {
    no: "03",
    icon: Split,
    title: "Segregated Loading",
    image: bifurcated,
    body: "Bifurcated compartments keep incompatible goods apart — pharma away from chemicals, food away from industrial cargo — eliminating cross-contamination, odour transfer and crush damage on shared vehicles.",
    points: [
      "Separate zones for incompatible commodity groups",
      "Load plans that protect fragile and light cartons",
      "Temperature zones maintained for cold-chain cargo",
    ],
  },
  {
    no: "04",
    icon: Video,
    title: "In-Transit Surveillance",
    image: cctvVehicle,
    body: "Cabin and cargo-bay cameras record every trip while GPS and IoT sensors stream location, door-open events and temperature. Footage is retained and reviewable, so nothing that happens on the road is unaccounted for.",
    points: [
      "Live CCTV in cabin and cargo bay",
      "GPS route, halt and door-open monitoring",
      "Temperature and humidity logging for reefer loads",
    ],
  },
  {
    no: "05",
    icon: ShieldCheck,
    title: "Control Tower Oversight",
    image: controlTower,
    body: "A 24x7 control tower watches every active trip. Deviations — unscheduled halts, route changes, temperature excursions or delays — are escalated in real time to the operations team and, where needed, to you.",
    points: [
      "24x7 monitoring of active shipments",
      "Exception escalation with defined response times",
      "Proactive customer alerts before an SLA is missed",
    ],
  },
  {
    no: "06",
    icon: FileCheck2,
    title: "Delivery & Digital PoD",
    image: handling,
    body: "At delivery the seal is verified, cartons are counted and the consignee signs a digital Proof of Delivery with time stamp and photographs. The chain of custody closes only when the receiver confirms condition and quantity.",
    points: [
      "Seal verification and piece count at unloading",
      "Digital PoD with signature, photos and time stamp",
      "Instant PoD availability in the customer portal",
    ],
  },
];

const claimSteps = [
  {
    step: "Report",
    text: "Raise the claim within the agreed window through your account manager or the customer portal, with LR number and delivery remarks.",
  },
  {
    step: "Evidence",
    text: "We pull pickup photographs, seal records, CCTV footage, GPS and temperature logs and PoD remarks into a single case file.",
  },
  {
    step: "Assessment",
    text: "A surveyor and our claims desk assess liability jointly with the insurer against the documented chain of custody.",
  },
  {
    step: "Settlement",
    text: "Approved claims are settled per the insured value and agreed terms, with a written closure note issued to the customer.",
  },
];

const capaSteps = [
  {
    title: "Log the exception",
    text: "Every damage, delay, mis-route or seal break is logged in the DEPS module as a formal exception — not a phone call that disappears.",
  },
  {
    title: "Find the root cause",
    text: "Operations, quality and the depot team run a structured root-cause review covering handling, packaging, lane and vehicle history.",
  },
  {
    title: "Corrective action",
    text: "A fix is assigned with an owner and a due date — retraining, packaging change, vehicle repair or lane re-planning.",
  },
  {
    title: "Preventive action",
    text: "Controls are updated across similar lanes and depots so the same exception cannot repeat, and closure is verified before the case is shut.",
  },
];

const CargoProtection = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo
        title="How We Protect Your Cargo | Scorpion Express"
        description="From handling and digital locks to CCTV surveillance, claim settlement and CAPA — see how Scorpion Express safeguards cargo at every stage."
        path="/cargo-protection"
      />
      <TopBar />
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-card border-b border-border overflow-hidden">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                  Custodian First, Carrier Later
                </span>
              </div>
              <h1 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-foreground">
                How we actually <span className="text-primary">protect</span> your cargo
              </h1>
              <p className="mt-6 max-w-2xl text-base lg:text-lg text-muted-foreground leading-relaxed">
                Protection is not a promise at the end of a contract — it is a
                sequence of controls that starts the moment we touch your goods
                and closes only after settlement and corrective action. Here is
                the full journey, stage by stage.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -top-3 -left-3 right-3 bottom-3 border border-primary/40" />
                <img
                  src={heroProtect}
                  alt="Scorpion Express handler scanning a sealed carton with a digital lock at a loading dock"
                  width={1280}
                  height={960}
                  className="relative w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stages */}
        <section className="container mx-auto px-4 py-16 lg:py-24">
          <div className="flex items-center gap-3 mb-10">
            <span className="h-px w-10 bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
              Stage by Stage
            </span>
          </div>

          <div className="space-y-12 lg:space-y-20">
            {stages.map((s, i) => {
              const Icon = s.icon;
              const flip = i % 2 === 1;
              return (
                <motion.article
                  key={s.no}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="grid lg:grid-cols-12 gap-8 items-center"
                >
                  <div className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
                    <div className="relative aspect-[16/9] w-full overflow-hidden border border-border bg-muted">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        width={1280}
                        height={720}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-4 left-4 h-10 w-10 flex items-center justify-center bg-primary text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                  <div className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
                    <div className="text-xs font-bold tracking-[0.3em] text-primary mb-3">
                      — {s.no}
                    </div>
                    <h2 className="font-display uppercase text-2xl lg:text-3xl text-foreground mb-3">
                      {s.title}
                    </h2>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed mb-5">
                      {s.body}
                    </p>
                    <ul className="space-y-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-sm text-foreground/80">
                          <span className="mt-2 h-1.5 w-1.5 flex-none bg-primary" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* Claims */}
        <section className="bg-card border-y border-border">
          <div className="container mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <FileCheck2 className="h-5 w-5 text-primary" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                  When Something Goes Wrong
                </span>
              </div>
              <h2 className="font-display uppercase text-3xl lg:text-4xl text-foreground leading-tight mb-4">
                Claim settlement without the run-around
              </h2>
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed mb-6">
                Cargo moves under insured coverage, and every stage of the
                journey is already documented. That evidence trail is what makes
                a claim quick to assess and fair to settle.
              </p>
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-border bg-muted">
                <img
                  src={claims}
                  alt="Claim assessment with documentation"
                  loading="lazy"
                  width={1280}
                  height={720}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
              {claimSteps.map((c, i) => (
                <motion.div
                  key={c.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="border border-border bg-background p-6 hover:border-primary transition-colors"
                >
                  <div className="text-xs font-bold tracking-[0.3em] text-primary mb-3">
                    STEP {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display uppercase text-lg text-foreground mb-2">
                    {c.step}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPA */}
        <section className="container mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-5">
              <RefreshCcw className="h-5 w-5 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                CAPA
              </span>
            </div>
            <h2 className="font-display uppercase text-3xl lg:text-4xl text-foreground leading-tight mb-4">
              Corrective &amp; preventive action
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed mb-6">
              A settled claim is not a closed case. Our Integrated DEPS
              Management Module turns every exception into a documented fix, so
              the same failure does not reach another shipment.
            </p>
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-border bg-muted">
              <img
                src={capa}
                alt="Root cause and corrective action review"
                loading="lazy"
                width={1280}
                height={720}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            {capaSteps.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex gap-5 border border-border bg-card p-6"
              >
                <div className="font-display text-3xl text-primary/40 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-display uppercase text-lg text-foreground mb-1">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-card border-t border-border">
          <div className="container mx-auto px-4 py-14 flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="font-display uppercase text-2xl lg:text-3xl text-foreground">
                Want this level of custody on your lanes?
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Talk to our team about insured, monitored and audited movements.
              </p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground font-black uppercase tracking-wider text-xs hover:bg-primary/90 transition-colors"
            >
              Contact Us
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CargoProtection;
