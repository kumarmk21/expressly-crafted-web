import { motion } from "framer-motion";
import {
  Thermometer,
  Activity,
  ShieldCheck,
  BellRing,
  ClipboardCheck,
  FileCheck2,
  Truck,
  Syringe,
  Pill,
  Milk,
  FlaskConical,
  Leaf,
  Clock,
  BadgeCheck,
  AlertTriangle,
} from "lucide-react";

const metrics = [
  { value: "<0.2%", label: "Spoilage claim rate", icon: ShieldCheck },
  { value: "99.6%", label: "OTIF on cold lanes", icon: BadgeCheck },
  { value: "60s", label: "IoT telemetry interval", icon: Activity },
  { value: "90s", label: "Excursion alert time", icon: BellRing },
  { value: "24×7", label: "Cold-chain control tower", icon: Clock },
  { value: "1.2M+", label: "Cold shipments (24 mo.)", icon: Truck },
];

const bands = [
  { range: "+15°C to +25°C", label: "CRT — Controlled Room Temp", use: "Tablets, capsules, OTC pharma" },
  { range: "+2°C to +8°C", label: "Chilled", use: "Vaccines, biologics, insulin, dairy" },
  { range: "-20°C", label: "Frozen", use: "Frozen foods, mRNA payloads, reagents" },
  { range: "-25°C", label: "Deep Frozen", use: "Specialty biologics, ice-cream, seafood" },
];

const workflow = [
  { icon: Thermometer, title: "Pre-cool & Lock", desc: "Reefer pre-cooled to profile. Set-point locked at origin under supervisor seal." },
  { icon: Activity, title: "Stream", desc: "IoT loggers push temperature, humidity, door & GPS every 60 seconds." },
  { icon: BellRing, title: "Alert", desc: "Any excursion beyond band triggers SMS + email to you and our tower within 90s." },
  { icon: ShieldCheck, title: "Act", desc: "Control tower dispatches nearest reefer / re-icing / route swap before spoilage." },
  { icon: FileCheck2, title: "Prove", desc: "Signed temperature report + deviation log delivered with every consignment." },
];

const compliance = ["GDP", "WHO PQS", "FSSAI", "CDSCO", "ISO 9001:2015", "GxP audit-ready"];

const useCases = [
  { icon: Syringe, title: "Vaccines & Biologics", desc: "+2°C to +8°C with excursion-free lanes for national immunisation & specialty distribution." },
  { icon: Pill, title: "Pharma & Clinical Trials", desc: "CRT and chilled movements with GDP-compliant documentation for IP samples & investigational products." },
  { icon: Milk, title: "Dairy & Perishable Foods", desc: "Farm-to-shelf chilled and frozen lanes with FSSAI-aligned handling and hygiene SOPs." },
  { icon: FlaskConical, title: "Specialty Chemicals", desc: "Temperature-sensitive reagents, diagnostics and lab consumables under controlled ambient." },
  { icon: Leaf, title: "Nutraceuticals & F&B", desc: "Shelf-life-critical SKUs moved on scheduled cold lanes with lot-level traceability." },
  { icon: AlertTriangle, title: "Emergency & Recall", desc: "Rapid mobilisation for cold-chain recalls, quarantine pickups and short-notice specialty runs." },
];

const guarantees = [
  { title: "Contractual Temperature Band", desc: "Written per-lane band. Deviations are our liability — not a debate." },
  { title: "Excursion Response SLA", desc: "≤ 90 seconds to alert, ≤ 60 minutes to on-ground corrective action." },
  { title: "Audit Trail by Default", desc: "Signed temperature report + deviation log with every POD — no separate request." },
  { title: "Cargo Insurance", desc: "All-risk cold-chain cover with dedicated claims desk and 7-day settlement target." },
];

const faqs = [
  {
    q: "How do you actually guarantee the temperature band?",
    a: "Set-points are locked at origin under supervisor seal. Any change in transit needs a supervisor override that is logged and auto-notified to the customer. Combined with 60-second IoT telemetry and a 24×7 control tower, we contain 98%+ excursions before product risk.",
  },
  {
    q: "What happens if there's a temperature excursion?",
    a: "You get an SMS + email within 90 seconds. Our cold-chain tower dispatches the nearest reefer, re-ice pack or route swap. Every event, action and resolution is captured on the deviation log delivered with the POD.",
  },
  {
    q: "Are you compliant with GDP / WHO / FSSAI / CDSCO?",
    a: "Yes. Our SOPs, vehicle qualification records, driver training and IoT calibration certificates are audit-ready. We support customer, regulator and third-party audits with 100% document availability.",
  },
  {
    q: "What kind of cargo insurance is included?",
    a: "All-risk cold-chain cover including temperature deviation, transit damage and theft, with a dedicated claims desk. Standard settlement target is 7 working days from documentation.",
  },
];

const ColdChainExtras = () => {
  return (
    <>
      {/* Metrics strip */}
      <section className="border-t border-border bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Performance</span>
            <h2 className="text-2xl lg:text-3xl font-black mt-2">Numbers we're accountable for</h2>
            <p className="text-muted-foreground mt-2">
              Every metric below is measured monthly, shared with customers, and forms part of our contractual SLA.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {metrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-border bg-background p-4 text-center"
                >
                  <Icon className="h-5 w-5 text-sky-600 dark:text-sky-400 mx-auto mb-2" />
                  <div className="text-2xl font-black text-foreground">{m.value}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-snug">{m.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Temperature bands */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-14 lg:py-16 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Temperature Bands</span>
            <h2 className="text-2xl lg:text-3xl font-black mt-2 mb-3">One network. Every profile.</h2>
            <p className="text-muted-foreground">
              We qualify every reefer, passive container and cold room to a specific product profile —
              so your consignment always moves in equipment purpose-built for its band.
            </p>
          </div>
          <div className="lg:col-span-2 rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left font-bold p-4">Range</th>
                  <th className="text-left font-bold p-4">Profile</th>
                  <th className="text-left font-bold p-4 hidden sm:table-cell">Typical Cargo</th>
                </tr>
              </thead>
              <tbody>
                {bands.map((b) => (
                  <tr key={b.range} className="border-t border-border bg-card">
                    <td className="p-4 font-bold text-sky-700 dark:text-sky-300 whitespace-nowrap">{b.range}</td>
                    <td className="p-4 font-semibold text-foreground">{b.label}</td>
                    <td className="p-4 text-muted-foreground hidden sm:table-cell">{b.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="border-t border-border bg-muted/40">
        <div className="container mx-auto px-4 py-14 lg:py-16">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">How it works</span>
            <h2 className="text-2xl lg:text-3xl font-black mt-2">A five-step chain, engineered to fail-safe.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {workflow.map((w, i) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="relative rounded-xl border border-border bg-background p-5">
                  <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full red-gradient text-primary-foreground text-xs font-black flex items-center justify-center shadow">
                    {i + 1}
                  </div>
                  <Icon className="h-6 w-6 text-sky-600 dark:text-sky-400 mb-3" />
                  <h4 className="font-bold text-foreground mb-1">{w.title}</h4>
                  <p className="text-sm text-muted-foreground leading-snug">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-14 lg:py-16">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Where we run</span>
            <h2 className="text-2xl lg:text-3xl font-black mt-2">Cold-chain built for real industries.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((u) => {
              const Icon = u.icon;
              return (
                <div key={u.title} className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h4 className="font-bold text-foreground mb-1">{u.title}</h4>
                  <p className="text-sm text-muted-foreground">{u.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guarantees + Compliance */}
      <section className="border-t border-border bg-muted/40">
        <div className="container mx-auto px-4 py-14 lg:py-16 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">SLA &amp; Guarantees</span>
            <h2 className="text-2xl lg:text-3xl font-black mt-2 mb-6">What we put in writing.</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {guarantees.map((g) => (
                <div key={g.title} className="p-5 rounded-xl border border-border bg-background">
                  <div className="flex items-start gap-3">
                    <ClipboardCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{g.title}</h4>
                      <p className="text-sm text-muted-foreground">{g.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Compliance</span>
            <h3 className="text-xl font-black mt-2 mb-4">Audit-ready by default</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {compliance.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-background border border-border text-foreground"
                >
                  <BadgeCheck className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                  {c}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Vehicle qualification, calibration certificates, driver training and deviation logs are always available for
              customer, regulator or third-party audits — with 100% document retention.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-14 lg:py-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">FAQ</span>
            <h2 className="text-2xl lg:text-3xl font-black mt-2">Straight answers, from the control tower.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((f) => (
              <div key={f.q} className="p-5 rounded-xl border border-border bg-card">
                <h4 className="font-bold text-foreground mb-2">{f.q}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ColdChainExtras;
