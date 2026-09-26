import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { MapPin, CheckCircle2, XCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// India Post zones by first pincode digit
const ZONES: Record<string, string> = {
  "1": "North", "2": "North", "3": "West", "4": "West",
  "5": "South", "6": "South", "7": "East", "8": "East",
};
const zoneOf = (pin: string) => (/^[1-8]\d{5}$/.test(pin) ? ZONES[pin[0]] : null);

const estimateDays = (from: string, to: string) => {
  if (from.slice(0, 3) === to.slice(0, 3)) return "1–2";
  if (from.slice(0, 2) === to.slice(0, 2)) return "2–3";
  if (zoneOf(from) === zoneOf(to)) return "3–4";
  return "4–7";
};

const inputCls =
  "h-11 w-full rounded-sm border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(100),
  phone: z.string().trim().regex(/^[0-9+\-\s]{10,15}$/, "Enter a valid phone number"),
  from: z.string().regex(/^[1-8]\d{5}$/, "Enter a valid From pincode"),
  to: z.string().regex(/^[1-8]\d{5}$/, "Enter a valid To pincode"),
  weight: z.coerce.number().positive("Enter weight").max(100000),
  boxes: z.coerce.number().int().positive("Enter number of boxes").max(100000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the Privacy Policy to continue" }) }),
});

const PincodeQuoteSection = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState<null | { ok: boolean; text: string }>(null);

  const [q, setQ] = useState({ name: "", phone: "", from: "", to: "", weight: "", boxes: "", consent: false });
  const [sending, setSending] = useState(false);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    const fz = zoneOf(from), tz = zoneOf(to);
    if (!fz || !tz) {
      setResult({ ok: false, text: "Please enter valid 6-digit pincodes. Call 1800 22 1945 for help." });
      return;
    }
    setResult({ ok: true, text: `Yes, we serve this route. Estimated delivery: ${estimateDays(from, to)} working days.` });
  };

  const submitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = quoteSchema.safeParse(q);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    const d = parsed.data;
    const zone = zoneOf(d.from)!;
    setSending(true);
    const { error } = await supabase.from("quote_requests").insert([{
      name: d.name,
      phone: d.phone,
      service: `Quick Quote — ${zone} Sales`,
      origin: d.from,
      destination: d.to,
      message: `Region: ${zone} | Weight: ${d.weight} kg | Boxes: ${d.boxes}`,
      privacy_consent: true,
    }]);
    setSending(false);
    if (error) {
      toast.error("Could not send your request. Please call 1800 22 1945.");
      return;
    }
    toast.success(`Thank you! Our ${zone} sales team will contact you shortly.`);
    setQ({ name: "", phone: "", from: "", to: "", weight: "", boxes: "", consent: false });
  };

  const set = (k: keyof typeof q) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setQ({ ...q, [k]: k === "consent" ? e.target.checked : e.target.value });

  return (
    <section className="border-b border-border bg-muted/40">
      <div className="container mx-auto grid gap-5 px-4 py-6 lg:grid-cols-2">
        <div className="rounded-sm border border-border bg-card p-5">
          <h2 className="font-display text-xl uppercase text-foreground">Check pincode service</h2>
          <p className="mb-3 text-xs text-muted-foreground">See if we deliver and how many days it takes.</p>
          <form onSubmit={check} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <input className={inputCls} inputMode="numeric" maxLength={6} placeholder="From pincode" aria-label="From pincode"
              value={from} onChange={(e) => { setFrom(e.target.value.replace(/\D/g, "")); setResult(null); }} />
            <input className={inputCls} inputMode="numeric" maxLength={6} placeholder="To pincode" aria-label="To pincode"
              value={to} onChange={(e) => { setTo(e.target.value.replace(/\D/g, "")); setResult(null); }} />
            <Button type="submit" className="h-11 rounded-sm font-bold uppercase"><MapPin className="mr-1 h-4 w-4" />Check</Button>
          </form>
          {result && (
            <p className={`mt-3 flex items-start gap-2 text-sm ${result.ok ? "text-foreground" : "text-destructive"}`}>
              {result.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0" />}
              {result.text}
            </p>
          )}
        </div>

        <div className="rounded-sm border border-border bg-card p-5">
          <h2 className="font-display text-xl uppercase text-foreground">Get a quote</h2>
          <p className="mb-3 text-xs text-muted-foreground">Your request goes straight to the regional sales team.</p>
          <form onSubmit={submitQuote} className="grid grid-cols-2 gap-2">
            <input className={inputCls} placeholder="Your name" aria-label="Name" value={q.name} onChange={set("name")} maxLength={100} />
            <input className={inputCls} inputMode="tel" placeholder="Phone" aria-label="Phone" value={q.phone} onChange={set("phone")} maxLength={15} />
            <input className={inputCls} inputMode="numeric" maxLength={6} placeholder="From pincode" aria-label="Quote from pincode" value={q.from} onChange={set("from")} />
            <input className={inputCls} inputMode="numeric" maxLength={6} placeholder="To pincode" aria-label="Quote to pincode" value={q.to} onChange={set("to")} />
            <input className={inputCls} type="number" min="0" step="any" placeholder="Weight (kg)" aria-label="Weight" value={q.weight} onChange={set("weight")} />
            <input className={inputCls} type="number" min="1" placeholder="No. of boxes" aria-label="Number of boxes" value={q.boxes} onChange={set("boxes")} />
            <label className="col-span-2 flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" className="mt-0.5" checked={q.consent} onChange={set("consent")} />
              <span>I consent to having this website store my submitted information so Scorpion Express can respond to my enquiry. Read more in the{" "}
                <Link to="/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Privacy Policy</Link>.<span className="text-primary">*</span></span>
            </label>
            <Button type="submit" disabled={sending} className="col-span-2 h-11 rounded-sm font-bold uppercase">
              <Send className="mr-1 h-4 w-4" />{sending ? "Sending..." : "Get Quote"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PincodeQuoteSection;
