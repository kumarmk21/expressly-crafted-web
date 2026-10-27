import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Activity,
  Award,
  CalendarClock,
  MapPin,
  ShieldCheck,
  Timer,
  Trophy,
} from "lucide-react";

type Cert = {
  id: string;
  title: string;
  issuer: string | null;
  year: string | null;
  kind: string;
  logo_url: string | null;
};

const STATS = [
  { value: "25+", label: "Years in Business", Icon: CalendarClock },
  { value: "94%", label: "On-Time Delivery", Icon: Timer },
  { value: "25,000+", label: "Pincodes Served", Icon: MapPin },
  { value: "99.9%", label: "System Uptime", Icon: Activity },
];

const splitValue = (value: string) => {
  const suffix = value.match(/[+%]$/)?.[0] ?? "";
  const digits = value.replace(/[+%]$/, "").replace(/,/g, "");
  return { suffix, digits };
};

const formatNumber = (n: number, decimals: number) =>
  n.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const StatValue = ({ value, active }: { value: string; active: boolean }) => {
  const { suffix, digits } = splitValue(value);
  const target = Number(digits);
  const decimals = (digits.split(".")[1] ?? "").length;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active || !Number.isFinite(target)) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCurrent(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
      else setCurrent(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);

  return (
    <span className="font-mono-tab font-heavy leading-none whitespace-nowrap text-foreground text-4xl sm:text-[40px] lg:text-[46px]">
      {formatNumber(current, decimals)}
      {suffix && <span className="text-primary">{suffix}</span>}
    </span>
  );
};

const ProofStrip = () => {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase
      .from("certifications" as any)
      .select("id,title,issuer,year,kind,logo_url")
      .eq("active", true)
      .order("display_order")
      .then(({ data }) => setCerts(((data as unknown) as Cert[]) ?? []));
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label="Certifications, awards and proof points"
      className="relative z-10 border-t border-border bg-card/70 backdrop-blur"
    >
      <div className="container mx-auto px-4 py-8 lg:py-10">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
          <span className="text-xs font-heavy uppercase text-primary">
            Why Businesses Trust Us to Keep Their Shipments Moving
          </span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        {/* Stats row */}
        <div
          ref={ref}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map(({ value, label, Icon }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-sm border border-border bg-background p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/[0.04] hover:shadow-lg hover:shadow-primary/10 lg:p-7"
            >
              <span
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <StatValue value={value} active={active} />
              <div className="mt-3 text-sm font-bold text-muted-foreground">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications & awards */}
        {certs.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-[11px] font-heavy uppercase text-primary">
              <ShieldCheck className="h-4 w-4" />
              Certified &amp; Awarded
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {certs.map((c) => {
                const Icon = c.kind === "award" ? Trophy : Award;
                return (
                  <div
                    key={c.id}
                    title={[c.title, c.issuer, c.year].filter(Boolean).join(" · ")}
                    className="inline-flex items-center gap-2 rounded-sm border border-border bg-background px-3 py-2 text-xs text-foreground/80 transition-colors hover:border-primary hover:text-primary"
                  >
                    {c.logo_url ? (
                      <img src={c.logo_url} alt="" className="h-4 w-4 object-contain" />
                    ) : (
                      <Icon
                        className={`h-4 w-4 ${
                          c.kind === "award" ? "text-primary" : "text-foreground/60"
                        }`}
                        aria-hidden="true"
                      />
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
