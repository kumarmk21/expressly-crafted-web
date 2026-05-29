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

const SERVICES = [
  "Express",
  "Air",
  "Cold Chain",
  "Warehousing",
  "Cleantech Solutions",
  "FTL",
];

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
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) setForm((f) => ({ ...f, service: service || f.service }));
  }, [open, service]);

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) {
      toast.error("Please fill name, phone and service.");
      return;
    }
    setSubmitting(true);
    // Note: Persisting to a dedicated enquiry table requires Lovable Cloud.
    // For now, we capture locally and notify the user.
    try {
      const existing = JSON.parse(localStorage.getItem("scorpion_quotes") || "[]");
      existing.push({ ...form, createdAt: new Date().toISOString() });
      localStorage.setItem("scorpion_quotes", JSON.stringify(existing));
      toast.success("Quote request received. Our team will reach out shortly.");
      setForm({ name: "", company: "", email: "", phone: "", service: "", origin: "", destination: "", message: "" });
      closeQuote();
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
            Tell us about your shipment. Our logistics expert will respond within 1 business hour.
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
