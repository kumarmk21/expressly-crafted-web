import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const SERVICES = [
  "Part Load (LTL)",
  "Express Cargo Services",
  "Coldchain",
  "Smart Baggage",
  "Air Express",
  "Sample",
  "Stockiest",
  "Warehousing",
  "E-waste",
  "Clean Tech Solution",
  "Full Truck Load (FTL)",
];

const BUSINESS_TYPES = [
  "Manufacturer",
  "Distributor",
  "Retailer",
  "E-commerce",
  "Pharma",
  "FMCG",
  "Other",
];

const businessSchema = z.object({
  first_name: z.string().trim().max(60).optional().or(z.literal("")),
  last_name: z.string().trim().max(60).optional().or(z.literal("")),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(5, "Phone is required").max(20),
  business_type: z.string().max(60).optional().or(z.literal("")),
  company_name: z.string().trim().max(120).optional().or(z.literal("")),
  service_interested: z.string().min(1, "Select a service"),
  message: z.string().trim().min(1, "Message is required").max(2000),
  privacy_consent: z.literal(true, { errorMap: () => ({ message: "Please accept the Privacy Policy to continue" }) }),
});

const franchiseeSchema = z.object({
  first_name: z.string().trim().max(60).optional().or(z.literal("")),
  last_name: z.string().trim().max(60).optional().or(z.literal("")),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(5, "Phone is required").max(20),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  worked_as_franchisee: z.boolean(),
  owns_vehicle: z.boolean(),
  privacy_consent: z.literal(true, { errorMap: () => ({ message: "Please accept the Privacy Policy to continue" }) }),
});

const inputCls =
  "w-full bg-white border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors rounded-sm";

const labelCls = "block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-1.5";

const BusinessForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    business_type: "",
    company_name: "",
    service_interested: "",
    message: "",
    privacy_consent: false,
  });

  const update = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = businessSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions" as any).insert({
      form_type: "business",
      ...parsed.data,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit. Please try again.");
      return;
    }
    toast.success("Thank you! We'll be in touch shortly.");
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      business_type: "",
      company_name: "",
      service_interested: "",
      message: "",
      privacy_consent: false,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>First name</label>
          <input className={inputCls} value={form.first_name} onChange={(e) => update("first_name", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Last name</label>
          <input className={inputCls} value={form.last_name} onChange={(e) => update("last_name", e.target.value)} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Email *</label>
          <input type="email" required className={inputCls} value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Phone *</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-muted border border-r-0 border-border text-sm rounded-l-sm">🇮🇳 +91</span>
            <input
              required
              type="tel"
              className={inputCls + " rounded-l-none"}
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Business type</label>
          <select className={inputCls} value={form.business_type} onChange={(e) => update("business_type", e.target.value)}>
            <option value="">Select…</option>
            {BUSINESS_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Company name</label>
          <input className={inputCls} value={form.company_name} onChange={(e) => update("company_name", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Service interested in *</label>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => update("service_interested", s)}
              className={`text-xs px-3 py-2 border transition-colors rounded-sm ${
                form.service_interested === s
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white border-border hover:border-primary text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>Message *</label>
        <textarea
          rows={4}
          required
          maxLength={2000}
          className={inputCls + " resize-none"}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          required
          checked={form.privacy_consent}
          onChange={(e) => update("privacy_consent", e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
        />
        <span>
          I consent to Scorpion Express collecting and using my personal data to respond to this enquiry, as described
          in the <Link to="/legal/privacy-policy" target="_blank" className="font-semibold text-primary hover:underline">Privacy Policy</Link>. *
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm px-7 py-3.5 hover:bg-primary/90 disabled:opacity-60 transition-colors rounded-sm"
      >
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {submitting ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
};

const FranchiseeForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    location: "",
    worked_as_franchisee: false,
    owns_vehicle: false,
    privacy_consent: false,
  });

  const update = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = franchiseeSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions" as any).insert({
      form_type: "franchisee",
      ...parsed.data,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit. Please try again.");
      return;
    }
    toast.success("Thank you! Our franchise team will reach out.");
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      location: "",
      worked_as_franchisee: false,
      owns_vehicle: false,
      privacy_consent: false,
    });
  };

  const YesNo = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <div className="flex gap-2">
      {[
        { l: "Yes", v: true },
        { l: "No", v: false },
      ].map((o) => (
        <button
          type="button"
          key={o.l}
          onClick={() => onChange(o.v)}
          className={`px-5 py-2 text-xs font-bold uppercase tracking-wider border rounded-sm transition-colors ${
            value === o.v
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-white border-border hover:border-primary text-foreground"
          }`}
        >
          {o.l}
        </button>
      ))}
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>First name</label>
          <input className={inputCls} value={form.first_name} onChange={(e) => update("first_name", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Last name</label>
          <input className={inputCls} value={form.last_name} onChange={(e) => update("last_name", e.target.value)} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Phone *</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-muted border border-r-0 border-border text-sm rounded-l-sm">🇮🇳 +91</span>
            <input
              required
              type="tel"
              className={inputCls + " rounded-l-none"}
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input type="email" required className={inputCls} value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Location</label>
        <input className={inputCls} placeholder="City / State" value={form.location} onChange={(e) => update("location", e.target.value)} />
      </div>

      <div>
        <label className={labelCls}>
          Have you worked before as a franchisee / PDA / BA for an express cargo company? *
        </label>
        <YesNo value={form.worked_as_franchisee} onChange={(v) => update("worked_as_franchisee", v)} />
      </div>

      <div>
        <label className={labelCls}>Do you own a vehicle? *</label>
        <YesNo value={form.owns_vehicle} onChange={(v) => update("owns_vehicle", v)} />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          required
          checked={form.privacy_consent}
          onChange={(e) => update("privacy_consent", e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
        />
        <span>
          I consent to Scorpion Express collecting and using my personal data to respond to this enquiry, as described
          in the <Link to="/legal/privacy-policy" target="_blank" className="font-semibold text-primary hover:underline">Privacy Policy</Link>. *
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm px-7 py-3.5 hover:bg-primary/90 disabled:opacity-60 transition-colors rounded-sm"
      >
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {submitting ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
};

const ContactForms = () => {
  const [tab, setTab] = useState<"business" | "franchisee">("business");

  return (
    <section className="container mx-auto px-4 pb-16">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left intro */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Get in touch</span>
          </div>
          <h2 className="font-display uppercase text-3xl md:text-4xl text-foreground leading-tight mb-4">
            Talk to our team
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Whether you have a business shipment requirement or want to become a franchise partner,
            fill in the form and our team will reach out within 24 hours.
          </p>
          <div className="border-l-2 border-primary pl-4 space-y-1 text-sm">
            <p className="font-bold uppercase tracking-wider text-xs text-primary">Quick contact</p>
            <p className="text-foreground">Toll Free: <a href="tel:18002219451" className="font-bold hover:text-primary">1800 22 1945</a></p>
            <p className="text-foreground">Email: <a href="mailto:info@scorpiongroup.in" className="font-bold hover:text-primary break-all">info@scorpiongroup.in</a></p>
          </div>
        </div>

        {/* Right form card */}
        <div className="lg:col-span-3">
          <div className="bg-primary p-1 rounded-sm shadow-xl">
            <div className="bg-card p-6 md:p-8 rounded-sm">
              <div className="flex gap-2 mb-6 border-b border-border">
                {[
                  { id: "business", label: "Business Inquiry" },
                  { id: "franchisee", label: "Franchisee" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id as any)}
                    className={`px-5 py-3 text-sm font-bold uppercase tracking-wider transition-colors -mb-px border-b-2 ${
                      tab === t.id
                        ? "text-primary border-primary"
                        : "text-muted-foreground border-transparent hover:text-foreground"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <h3 className="font-display uppercase text-2xl text-foreground mb-5">Contact us</h3>

              {tab === "business" ? <BusinessForm /> : <FranchiseeForm />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForms;
