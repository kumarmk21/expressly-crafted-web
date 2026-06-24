import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Loader2, Building2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForms from "@/components/ContactForms";
import BranchMap, { type BranchLocation } from "@/components/BranchMap";

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
  const [locations, setLocations] = useState<BranchLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("locations" as any)
        .select("id,location_code,location_name,zone,address,contact_number,email")
        .eq("is_active", true)
        .order("display_order")
        .order("location_name");
      if (!error) setLocations((data as any[]) ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Page header */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 grain" />
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="container mx-auto px-4 py-12 md:py-20 relative">
          <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70 hover:text-white mb-5">
            <ArrowLeft className="h-3 w-3" /> Back to home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Contact Us</span>
          </div>
          <h1 className="font-display uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] max-w-3xl">
            We're across India. <span className="text-primary">Find your nearest branch.</span>
          </h1>
          <p className="mt-4 md:mt-5 text-sm md:text-base text-white/80 max-w-2xl leading-relaxed">
            70+ branch offices across 5 zones. Click any pin on the map below to see that branch's address, phone and email.
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

      {/* Interactive Branch Map */}
      <section className="container mx-auto px-4 pb-20 flex-1">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-primary" />
          <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Branch Network</h2>
        </div>
        <h3 className="font-display uppercase text-3xl md:text-4xl text-foreground mb-6">
          Our pan-India presence
        </h3>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <BranchMap branches={locations} />
        )}
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
