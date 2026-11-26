import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { FranchiseSchema } from "./schema.ts";
import { FRANCHISE_RECIPIENTS } from "../_shared/recipients.ts";
import { escapeHtml, sendSmtpMail } from "../_shared/mail.ts";

const respond = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { ...corsHeaders, "Content-Type": "application/json" },
});

// Public enquiry endpoint: no login required; validated data is saved before email.
// Recipients are server-controlled; clients cannot read submissions or choose recipients.
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return respond({ error: "Method not allowed" }, 405);
  try {
    const parsed = FranchiseSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return respond({ error: "Please provide valid contact details and privacy consent." }, 400);
    const url = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const password = Deno.env.get("SMTP_PASSWORD");
    if (!url || !key) return respond({ error: "Submission service unavailable" }, 503);
    const supabase = createClient(url, key);
    const { error } = await supabase.from("contact_submissions").insert({ form_type: "franchisee", ...parsed.data });
    if (error) return respond({ error: "Could not save submission. Please try again." }, 500);
    try {
      if (!password) throw new Error("Email service unavailable");
      const enquiry = parsed.data;
      const rows = [
        ["Name", `${enquiry.first_name} ${enquiry.last_name}`.trim() || "Not provided"],
        ["Email", enquiry.email], ["Phone", enquiry.phone],
        ["Location", enquiry.location || "Not provided"],
        ["Previous franchise experience", enquiry.worked_as_franchisee ? "Yes" : "No"],
        ["Owns a vehicle", enquiry.owns_vehicle ? "Yes" : "No"],
        ["Privacy consent", "Yes"],
      ];
      await sendSmtpMail({ password, to: FRANCHISE_RECIPIENTS, replyTo: enquiry.email,
        subject: `New Franchise Enquiry — ${rows[0][1]}`,
        html: `<h2>New Franchise Enquiry</h2><table>${rows.map(([label, value]) => `<tr><th align="left">${label}</th><td>${escapeHtml(value)}</td></tr>`).join("")}</table><p>This submission is also available in Admin under Business &amp; Franchisee.</p>`,
        attachment: null,
      });
      return respond({ saved: true, emailed: true });
    } catch {
      console.error("Franchise saved; email delivery failed");
      return respond({ saved: true, emailed: false });
    }
  } catch {
    return respond({ error: "Could not process submission. Please try again." }, 500);
  }
});