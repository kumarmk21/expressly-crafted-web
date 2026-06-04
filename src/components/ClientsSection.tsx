import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Building2 } from "lucide-react";

type Client = {
  id: string;
  name: string;
  industry: string | null;
  logo_url: string | null;
  display_order: number;
};

const ClientsSection = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("clients")
      .select("id,name,industry,logo_url,display_order")
      .order("display_order")
      .order("name")
      .then(({ data }) => {
        setClients((data as Client[]) ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Our Clients</span>
          </div>
          <h2 className="font-display uppercase text-4xl lg:text-5xl text-foreground leading-[0.95] mb-5">
            Trusted by India's <span className="text-primary">leading brands.</span>
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            We believe every client is a valuable long-term partner.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-border border border-border">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-[3/2] bg-card animate-pulse" />
            ))}
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border">
            <Building2 className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground text-sm">Client logos will appear here once added from admin.</p>
          </div>
        ) : (
          <div className="relative overflow-hidden border border-border bg-card">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {[...clients, ...clients].map((c, i) => (
                <div
                  key={`${c.id}-${i}`}
                  className="shrink-0 w-[200px] md:w-[240px] aspect-[3/2] flex flex-col items-center justify-center gap-2 p-5 border-r border-border group"
                  title={c.industry ? `${c.name} — ${c.industry}` : c.name}
                >
                  {c.logo_url && (
                    <img
                      src={c.logo_url}
                      alt={`${c.name} logo`}
                      loading="lazy"
                      className="max-h-12 max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                  <span className="font-display uppercase text-sm text-foreground/70 group-hover:text-primary transition-colors text-center leading-tight tracking-wide">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        )}
      </div>
    </section>
  );
};

export default ClientsSection;
