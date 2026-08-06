import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Award, ShieldCheck, Trophy } from "lucide-react";

type Cert = {
  id: string;
  title: string;
  issuer: string | null;
  year: string | null;
  kind: string;
  logo_url: string | null;
};

const STATS = [
  { value: "25+", label: "Years in Business" },
  { value: "94%", label: "On-Time Delivery" },
  { value: "24,000+", label: "Pincodes Served" },
  { value: "99.9%", label: "System Uptime" },
];

const ProofStrip = () => {
  const [certs, setCerts] = useState<Cert[]>([]);

  useEffect(() => {
    supabase
      .from("certifications" as any)
      .select("id,title,issuer,year,kind,logo_url")
      .eq("active", true)
      .order("display_order")
      .then(({ data }) => setCerts(((data as unknown) as Cert[]) ?? []));
  }, []);

  return (
    <section aria-label="Certifications, awards and proof points" className="relative z-10 border-t border-border bg-card/70 backdrop-blur">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {STATS.map((s) => (
            <div key={s.label} className="bg-card px-4 py-4 lg:py-5 text-center">
              <div className="font-display uppercase text-2xl lg:text-3xl text-foreground leading-none">
                {s.value.includes("%") || s.value.includes("+") ? (
                  <>
                    <span>{s.value.replace(/[+%]/g, "")}</span>
                    <span className="text-primary">{s.value.match(/[+%]/)?.[0]}</span>
                  </>
                ) : s.value}
              </div>
              <div className="mt-1.5 text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications & awards */}
        {certs.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Certified & Awarded
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {certs.map((c) => {
                const Icon = c.kind === "award" ? Trophy : Award;
                return (
                  <div
                    key={c.id}
                    title={[c.title, c.issuer, c.year].filter(Boolean).join(" · ")}
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-background text-[11px] uppercase tracking-wider text-foreground/80 hover:border-primary hover:text-primary transition-colors"
                  >
                    {c.logo_url ? (
                      <img src={c.logo_url} alt="" className="h-4 w-4 object-contain" />
                    ) : (
                      <Icon className={`h-3.5 w-3.5 ${c.kind === "award" ? "text-primary" : "text-foreground/60"}`} />
                    )}
                    <span className="font-bold">{c.title}</span>
                    {c.year && <span className="text-muted-foreground">· {c.year}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProofStrip;
