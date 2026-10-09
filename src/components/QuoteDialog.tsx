import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/context/QuoteContext";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { z } from "zod";

const SERVICES = [
  "Part Load (LTL)",
  "Express",
  "Air Express",
  "Cold Chain",
  "Warehousing",
  "Cleantech Solutions",
  "Full Truck Load (FTL)",
];

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().max(120),
  email: z.union([z.string().trim().email("Enter a valid email address").max(255), z.literal("")]),
  phone: z.string().trim().min(5, "Phone is required").max(30),
  service: z.string().trim().min(1, "Select a service").max(100),
  origin: z.string().trim().max(120),
  destination: z.string().trim().max(120),
  message: z.string().trim().max(2000),
  privacy_consent: z.literal(true, { errorMap: () => ({ message: "Please accept the Privacy Policy to continue" }) }),
});

const QuoteDialog = () => {
  const { open, service, closeQuote } = useQuote();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    origin: "",
    destination: "",
    message: "",
    privacy_consent: false,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) setForm((f) => ({ ...f, service: service || f.service }));
  }, [open, service]);

  const update = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = quoteSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSubmitting(true);
    
    try {
      const { error } = await supabase.from('quote_requests').insert([
        {
          name: parsed.data.name,
          company: parsed.data.company || null,
          email: parsed.data.email || null,
          phone: parsed.data.phone,
          service: parsed.data.service,
          origin: parsed.data.origin || null,
          destination: parsed.data.destination || null,
          message: parsed.data.message || null,
          privacy_consent: parsed.data.privacy_consent,
        }
      ]);

      if (error) throw error;

      toast.success("Quote request received. Our team will reach out shortly.");
       setForm({ name: "", company: "", email: "", phone: "", service: "", origin: "", destination: "", message: "", privacy_consent: false });
      closeQuote();
    } catch (error: any) {
      console.error("Error submitting quote request:", error);
      toast.error(error.message || "Failed to submit quote request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeQuote()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">Get a Quote</DialogTitle>
          <DialogDescription>
            Tell us about your shipment and our team will get back to you.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4 mt-2">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="q-name">Full Name *</Label>
              <Input id="q-name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-company">Company</Label>
              <Input id="q-company" value={form.company} onChange={(e) => update("company", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-email">Email</Label>
              <Input id="q-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-phone">Phone *</Label>
              <Input id="q-phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="q-service">Service Required *</Label>
              <select
                id="q-service"
                value={form.service}
                onChange={(e) => update("service", e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select a service…</option>
                {(SERVICES.includes(form.service) || !form.service
                  ? SERVICES
                  : [form.service, ...SERVICES]
                ).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-origin">Origin City</Label>
              <Input id="q-origin" value={form.origin} onChange={(e) => update("origin", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-dest">Destination City</Label>
              <Input id="q-dest" value={form.destination} onChange={(e) => update("destination", e.target.value)} />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="q-msg">Shipment Details</Label>
              <Textarea
                id="q-msg"
                rows={3}
                placeholder="Weight, dimensions, frequency, special handling…"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
              />
            </div>
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
              I consent to having this website store my submitted information so Scorpion Express can respond to my
              enquiry. Read more in the <Link to="/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">Privacy Policy</Link>. *
            </span>
          </label>
          <Button type="submit" disabled={submitting} className="w-full red-gradient text-primary-foreground font-bold">
            <Send className="h-4 w-4 mr-2" />
            {submitting ? "Sending…" : "Submit Enquiry"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;
