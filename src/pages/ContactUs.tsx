import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Loader2, Building2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const ContactUs = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [zone, setZone] = useState("East");

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

  const filtered = locations.filter((l) => l.zone === zone);

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
            70+ branch offices across 5 zones. Pick a zone below to see all branch addresses, phone numbers and emails.
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

      {/* Zone selector */}
      <section className="container mx-auto px-4 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-primary" />
          <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Branch Network</h2>
        </div>
        <h3 className="font-display uppercase text-3xl md:text-4xl text-foreground mb-6">
          Choose your zone
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ZONES.map((z) => {
            const active = zone === z.id;
            return (
              <button
                key={z.id}
                onClick={() => setZone(z.id)}
                className={`relative group p-5 border text-left transition-all overflow-hidden ${
                  active
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                    : "bg-card border-border hover:border-primary hover:shadow-md"
                }`}
              >
                <div className={`absolute top-0 left-0 h-1 w-full ${active ? "bg-white" : "bg-primary"}`} />
                <div className="text-[10px] uppercase tracking-[0.25em] opacity-70 mb-2">Zone</div>
                <div className="font-display text-2xl md:text-3xl tracking-wide">{z.label}</div>
                <div className={`text-xs mt-2 font-bold uppercase tracking-wider ${active ? "text-white/90" : "text-muted-foreground"}`}>
                  {counts[z.id] ?? 0} {counts[z.id] === 1 ? "branch" : "branches"}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Branch boxes */}
      <section className="container mx-auto px-4 py-10 flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border bg-card">
            <p className="text-muted-foreground">No branches available in this zone yet.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-foreground/70">
                <span className="text-primary">{zone}</span> Zone — {filtered.length} {filtered.length === 1 ? "branch" : "branches"}
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((b) => (
                <article
                  key={b.id}
                  className="bg-card border border-border p-5 hover:border-primary hover:shadow-lg transition-all relative group"
                >
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300" />
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="font-display uppercase text-lg leading-tight text-foreground group-hover:text-primary transition-colors">
                      {b.location_name}
                    </h4>
                    <span className="text-[10px] font-mono font-bold px-2 py-1 bg-muted text-muted-foreground tracking-wider">
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
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
