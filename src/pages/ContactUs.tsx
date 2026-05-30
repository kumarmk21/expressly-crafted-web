import { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Loader2, Building2, ArrowLeft, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForms from "@/components/ContactForms";

type Location = {
  id: string;
  location_code: string;
  location_name: string;
  hierarchy: string;
  zone: string;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  contact_number: string | null;
  email: string | null;
  is_active: boolean;
};

const ZONES = [
  { id: "East", label: "EAST" },
  { id: "West", label: "WEST" },
  { id: "North", label: "NORTH" },
  { id: "South", label: "SOUTH" },
  { id: "Central", label: "CENTRAL" },
];

const HQ = [
  {
    title: "Registered Office",
    lines: ["Ashok Cinema Bldg., Buddha Marg,", "Patna - 800 001, INDIA"],
    email: "pat@scorpiongroup.in",
    phone: null as string | null,
  },
  {
    title: "Head Office",
    lines: [
      "610, Shah & Nahar Industrial Estate,",
      "Dr. E. Moses Road, Worli, Mumbai,",
      "INDIA – 400 018",
    ],
    email: "info@scorpiongroup.in",
    phone: "+91 22 2497 8815/16/17 · Toll Free 1800 22 1945",
  },
];

const ZoneModal = ({
  zone,
  branches,
  onClose,
}: {
  zone: string;
  branches: Location[];
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" />

      {/* Glass panel */}
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl max-h-[85vh] mt-8 sm:mt-12 rounded-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col"
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(24px) saturate(140%)",
          WebkitBackdropFilter: "blur(24px) saturate(140%)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/30 bg-white/40 shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
              Zone
            </span>
            <h2 className="font-display uppercase text-2xl md:text-3xl text-foreground leading-none mt-1">
              {zone}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              {branches.length} {branches.length === 1 ? "branch" : "branches"} found
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full border border-white/40 bg-white/50 hover:bg-white/80 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-foreground" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6">
          {branches.length === 0 ? (
            <div className="text-center py-14 border border-dashed border-border/50 rounded-lg bg-white/30">
              <p className="text-muted-foreground">No branches available in this zone.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {branches.map((b) => (
                <article
                  key={b.id}
                  className="bg-white/60 border border-white/40 rounded-lg p-5 hover:bg-white/80 hover:shadow-lg transition-all relative group"
                >
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300 rounded-tl-lg" />
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="font-display uppercase text-lg leading-tight text-foreground group-hover:text-primary transition-colors">
                      {b.location_name}
                    </h4>
                    <span className="text-[10px] font-mono font-bold px-2 py-1 bg-white/70 text-muted-foreground tracking-wider rounded border border-white/40">
                      {b.location_code}
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    Scorpion Express Pvt. Ltd.
                  </p>
                  {b.address && (
                    <p className="flex items-start gap-2 text-sm text-foreground/85 mb-3 leading-relaxed">
                      <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{b.address}</span>
                    </p>
                  )}
                  {b.contact_number && (
                    <p className="flex items-start gap-2 text-sm mb-1.5">
                      <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <a href={`tel:${b.contact_number.split("/")[0].trim()}`} className="hover:text-primary">
                        {b.contact_number}
                      </a>
                    </p>
                  )}
                  {b.email && (
                    <p className="flex items-start gap-2 text-sm">
                      <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <a href={`mailto:${b.email}`} className="hover:text-primary break-all">
                        {b.email}
                      </a>
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ContactUs = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalZone, setModalZone] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("locations" as any)
        .select("*")
        .eq("is_active", true)
        .order("display_order")
        .order("location_name");
      if (!error) setLocations((data as any[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    ZONES.forEach((z) => (m[z.id] = 0));
    locations.forEach((l) => {
      if (m[l.zone] !== undefined) m[l.zone]++;
    });
    return m;
  }, [locations]);

  const modalBranches = useMemo(
    () => (modalZone ? locations.filter((l) => l.zone === modalZone) : []),
    [modalZone, locations]
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Page header */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 grain" />
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="container mx-auto px-4 py-16 md:py-20 relative">
          <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70 hover:text-white mb-6">
            <ArrowLeft className="h-3 w-3" /> Back to home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Contact Us</span>
          </div>
          <h1 className="font-display uppercase text-5xl md:text-6xl lg:text-7xl leading-[0.95] max-w-3xl">
            We're across India. <span className="text-primary">Find your nearest branch.</span>
          </h1>
          <p className="mt-5 text-white/80 max-w-2xl leading-relaxed">
            70+ branch offices across 5 zones. Click a zone below to see all branch addresses, phone numbers and emails.
          </p>
        </div>
      </section>

      {/* HQ blocks */}
      <section className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-5">
        {HQ.map((h) => (
          <div key={h.title} className="bg-card border border-border p-6 md:p-8 relative overflow-hidden">
            <span className="absolute top-0 left-0 h-1 w-20 bg-primary" />
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-4 w-4 text-primary" />
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-primary">{h.title}</h2>
            </div>
            <div className="space-y-1 text-foreground/90">
              {h.lines.map((l, i) => <p key={i}>{l}</p>)}
            </div>
            {h.phone && (
              <p className="mt-4 flex items-start gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{h.phone}</span>
              </p>
            )}
            <p className="mt-2 flex items-start gap-2 text-sm">
              <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <a href={`mailto:${h.email}`} className="hover:text-primary underline-offset-4 hover:underline break-all">{h.email}</a>
            </p>
          </div>
        ))}
      </section>

      {/* Contact forms (Business / Franchisee) */}
      <ContactForms />

      {/* Zone selector */}
      <section className="container mx-auto px-4 pb-20 flex-1">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-primary" />
          <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Branch Network</h2>
        </div>
        <h3 className="font-display uppercase text-3xl md:text-4xl text-foreground mb-6">
          Choose your zone
        </h3>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {ZONES.map((z) => (
              <button
                key={z.id}
                onClick={() => setModalZone(z.id)}
                className="relative group p-5 border text-left transition-all overflow-hidden bg-card border-border hover:border-primary hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="absolute top-0 left-0 h-1 w-full bg-primary" />
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Zone</div>
                <div className="font-display text-2xl md:text-3xl tracking-wide text-foreground">{z.label}</div>
                <div className="text-xs mt-2 font-bold uppercase tracking-wider text-muted-foreground">
                  {counts[z.id] ?? 0} {counts[z.id] === 1 ? "branch" : "branches"}
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <Footer />

      {/* Glassmorphism modal */}
      {modalZone && (
        <ZoneModal
          zone={modalZone}
          branches={modalBranches}
          onClose={() => setModalZone(null)}
        />
      )}
    </div>
  );
};

export default ContactUs;
