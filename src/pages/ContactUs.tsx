import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, Mail, Loader2, Building2, MapPin, ArrowDown, ArrowUpRight, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForms from "@/components/ContactForms";
import BranchMap, { type BranchLocation } from "@/components/BranchMap";
import Seo from "@/components/Seo";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import supportTeam from "@/assets/contact-support-team.jpg";

const HQ = [
  {
    title: "Registered Office",
    lines: ["Ashok Cinema Bldg., Buddha Marg,", "Patna - 800 001, India"],
    email: "pat@scorpiongroup.in",
    phone: null as string | null,
  },
  {
    title: "Head Office",
    lines: [
      "610, Shah & Nahar Industrial Estate,",
      "Dr. E. Moses Road, Worli, Mumbai,",
      "India – 400 018",
    ],
    email: "info@scorpiongroup.in",
    phone: "+91 22 2497 8815/16/17 · Toll Free 1800 22 1945",
  },
];

const ContactUs = () => {
  const [locations, setLocations] = useState<BranchLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const reducedMotion = useReducedMotion();
  const reveal = { initial: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: reducedMotion ? 0 : 0.45 } };

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
      <Seo
        title="Contact Scorpion Express | Pan-India Branch Network"
        description="Reach our HQ in Mumbai or any of 70+ branches across India. Phone, email and addresses for every Scorpion Express location."
        path="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Scorpion Express Pvt. Ltd.",
          telephone: "+91-22-2497-8815",
          email: "info@scorpiongroup.in",
          url: "https://expressly-crafted-web.lovable.app/contact",
          address: {
            "@type": "PostalAddress",
            streetAddress: "610, Shah & Nahar Industrial Estate, Dr. E. Moses Road, Worli",
            addressLocality: "Mumbai",
            postalCode: "25000",
            addressCountry: "IN",
          },
        }}
      />
      <TopBar /><Navbar />
      <main>

      {/* Page header */}
      <section className="relative overflow-hidden">
        <img src={supportTeam} alt="Illustrative customer support professionals ready to assist" width={1536} height={1024} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 people-page-overlay" />
        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          <motion.div {...reveal} className="max-w-lg">
            <p className="text-sm font-semibold text-primary mb-3">Contact Scorpion Express</p>
            <h1 className="text-3xl md:text-5xl leading-tight">Let’s move your<br className="hidden sm:block" /> business forward.</h1>
            <p className="mt-4 text-base text-muted-foreground max-w-md leading-relaxed">A shipment question, a business requirement or a new partnership — connect with the people behind our network.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Button asChild><a href="#enquiry"><MessageSquare /> Send an enquiry</a></Button>
              <Button variant="outline" asChild><a href="#branches"><MapPin /> Find a branch <ArrowDown /></a></Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="container mx-auto px-4 grid md:grid-cols-3">
          {[
            { icon: Phone, title: "Call our team", detail: "1800 22 1945", href: "tel:1800221945" },
            { icon: Mail, title: "Write to us", detail: "info@scorpiongroup.in", href: "mailto:info@scorpiongroup.in" },
            { icon: MapPin, title: "Connect locally", detail: "Explore our branch network", href: "#branches" },
          ].map((item, i) => <motion.a key={item.title} {...reveal} transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : i * 0.08 }} href={item.href} className="group flex items-center gap-4 py-5 md:px-5 border-b last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 border-border hover:bg-primary/5 transition-colors">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><item.icon className="h-5 w-5" /></span>
            <div className="min-w-0 flex-1"><h2 className="text-base font-semibold">{item.title}</h2><p className="text-sm text-muted-foreground break-words">{item.detail}</p></div><ArrowUpRight className="h-4 w-4 shrink-0 text-primary group-hover:translate-x-0.5 transition-transform" />
          </motion.a>)}
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-24 border-b border-border pt-9 md:pt-12">
        <ContactForms />
      </section>

      {/* HQ blocks */}
      <section className="container mx-auto px-4 py-9 md:py-10 grid md:grid-cols-2 gap-4 md:gap-5">
        {HQ.map((h) => (
          <motion.div {...reveal} key={h.title} className="bg-card border border-border p-5 relative overflow-hidden rounded-md">
            <span className="absolute top-0 left-0 h-1 w-20 bg-primary" />
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Building2 className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">{h.title}</h2>
            </div>
            <div className="space-y-1 text-sm md:text-base text-foreground/90">
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
          </motion.div>
        ))}
      </section>

      {/* Interactive Branch Map */}
      <section id="branches" className="scroll-mt-24 container mx-auto px-4 pb-9 md:pb-12">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <span className="h-px w-10 bg-primary" />
          <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Branch Network</h2>
        </div>
        <h3 className="text-2xl md:text-3xl text-foreground mb-5 md:mb-6">
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

      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
