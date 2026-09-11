import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calculator,
  LogIn,
  ClipboardList,
  ArrowUpRight,
  Search,
  HeadphonesIcon,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImg from "@/assets/customer-portal-hero.jpg";
import supportImg from "@/assets/customer-portal-support.jpg";
import { useQuote } from "@/context/QuoteContext";

const primaryActions = [
  {
    title: "Freight Calculator",
    desc: "Get instant rates for your shipment lanes.",
    href: "https://ratefinder.scorpiongroup.in/",
    icon: Calculator,
  },
  {
    title: "Customer Login",
    desc: "Access your dashboard, invoices and reports.",
    href: "https://sepltms.scorpiongroup.in/",
    icon: LogIn,
  },
  {
    title: "Business Enquiry",
    desc: "Talk to our team about a custom requirement.",
    icon: ClipboardList,
    action: "quote" as const,
  },
];

const tools = [
  {
    title: "Complaint Management",
    desc: "Raise and track service tickets with full resolution history.",
    href: "https://cms.scorpiongroup.in/",
    icon: HeadphonesIcon,
  },
];

const highlights = [
  { value: "25,000+", label: "Pincodes served" },
  { value: "94%", label: "On-time delivery" },
  { value: "24x7", label: "Control tower" },
  { value: "75+", label: "Branches" },
];

const CustomerPortal = () => {
  const { openQuote } = useQuote();
  const [lr, setLr] = useState("");

  const trackShipment = (e: React.FormEvent) => {
    e.preventDefault();
    const id = lr.trim();
    if (!id) return;
    window.open(`https://dtrack.scorpiongroup.in/?lr=${encodeURIComponent(id)}`, "_blank", "noopener");
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section
        aria-labelledby="portal-heading"
        className="relative bg-primary text-white overflow-hidden"
      >
        <img
          src={heroImg}
          alt="Loading dock with Scorpion Express fleet ready for dispatch"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-primary/85" />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent 0 28px, rgba(255,255,255,0.25) 28px 29px)",
          }}
        />
        <div className="container mx-auto px-4 py-16 lg:py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] mb-4">
              <span aria-hidden="true" className="h-px w-10 bg-white" /> Customer Portal
            </div>
            <h1 id="portal-heading" className="font-display text-4xl md:text-6xl leading-tight">
              Everything you need, in one place.
            </h1>
            <p className="mt-4 text-white/85 text-lg max-w-2xl">
              Track shipments, calculate freight, raise enquiries and access reports — built for our customers.
            </p>

            {/* Quick track */}
            <form
              onSubmit={trackShipment}
              className="mt-7 flex flex-col sm:flex-row gap-2 max-w-xl"
              aria-label="Track a shipment"
            >
              <div className="relative flex-1">
                <Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={lr}
                  onChange={(e) => setLr(e.target.value)}
                  placeholder="Enter LR / AWB number"
                  aria-label="LR or AWB number"
                  className="w-full pl-10 pr-3 py-3 bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 text-xs font-black uppercase tracking-wider bg-foreground text-white hover:bg-foreground/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                Track Now
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-foreground text-white">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/15">
          {highlights.map((h) => (
            <div key={h.label} className="py-6 px-4 text-center">
              <div className="font-display text-2xl md:text-3xl">{h.value}</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/70 mt-1">{h.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Primary actions */}
      <section className="container mx-auto px-4 py-14 lg:py-16">
        <div className="grid md:grid-cols-3 gap-4">
          {primaryActions.map((a) => {
            const Icon = a.icon;
            const inner = (
              <>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </div>
                <div className="mt-6">
                  <div className="font-display text-2xl text-foreground">{a.title}</div>
                  <p className="text-sm text-foreground/70 mt-1">{a.desc}</p>
                </div>
              </>
            );
            const className =
              "group block bg-card border border-border p-6 hover:border-primary hover:shadow-lg transition-all";

            if ("action" in a && a.action === "quote") {
              return (
                <button
                  key={a.title}
                  type="button"
                  onClick={() => openQuote()}
                  aria-haspopup="dialog"
                  className={`${className} text-left w-full`}
                >
                  {inner}
                </button>
              );
            }
            return (
              <a
                key={a.title}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {inner}
              </a>
            );
          })}
        </div>
      </section>

      {/* Support + Complaint Management */}
      <section className="bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 py-14 lg:py-16 grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative overflow-hidden">
            <img
              src={supportImg}
              alt="Scorpion Express control tower team supporting customers round the clock"
              loading="lazy"
              width={1200}
              height={900}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">
              Service Support
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              Every issue tracked to closure
            </h2>
            <p className="text-sm text-foreground/70 mt-3 max-w-md">
              Raise a service ticket and follow it from first alert to final resolution, with clear ownership at every step.
            </p>

            <div className="mt-6 grid gap-3">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <a
                  key={t.title}
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 bg-card border border-border p-5 hover:border-primary transition-colors"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-foreground">{t.title}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 text-muted-foreground group-hover:text-primary"
                      />
                    </div>
                    <p className="text-xs text-foreground/70 mt-0.5">{t.desc}</p>
                  </div>
                </a>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Help */}
      <section className="container mx-auto px-4 py-14 lg:py-16">
        <div className="bg-card border border-border p-8 md:p-10 grid md:grid-cols-[1.4fr_1fr] gap-6 items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">
              Need help?
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-foreground leading-tight">
              Our customer success team is one call away.
            </h2>
            <p className="mt-2 text-foreground/70 text-sm">
              For login issues, onboarding or escalations — we'll get you sorted quickly.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="tel:18002219455"
              className="flex items-center justify-between gap-3 px-5 py-4 bg-primary text-white font-bold uppercase tracking-wider text-sm hover:bg-primary/90"
            >
              <span>1800 22 1945</span>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <Link
              to="/employee-login"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary text-center"
            >
              Are you an employee? Go to Employee Portal →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomerPortal;
