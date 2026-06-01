// Sends a notification email (with resume link) to the HR inbox when an application is submitted.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const HR_EMAIL = "dhanushedge17@gmail.com";
const FROM_EMAIL = "Scorpion Careers <onboarding@resend.dev>";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { application_id } = await req.json();
    if (!application_id) {
      return new Response(JSON.stringify({ error: "application_id required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: app, error } = await supabase
      .from("job_applications").select("*").eq("id", application_id).maybeSingle();
    if (error || !app) {
      return new Response(JSON.stringify({ error: "Application not found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Signed URL for the resume (7 days)
    const { data: signed } = await supabase.storage
      .from("resumes").createSignedUrl(app.resume_url, 60 * 60 * 24 * 7);
    const resumeLink = signed?.signedUrl ?? "(unavailable)";

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY missing — skipping email send");
      return new Response(JSON.stringify({ ok: true, emailed: false, reason: "RESEND_API_KEY not configured" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Download resume to attach
    const { data: fileBlob } = await supabase.storage.from("resumes").download(app.resume_url);
    let attachment: { filename: string; content: string } | null = null;
    if (fileBlob) {
      const buf = new Uint8Array(await fileBlob.arrayBuffer());
      let bin = ""; for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i]);
      attachment = { filename: app.resume_file_name || "resume", content: btoa(bin) };
    }

    const html = `
      <h2>New Job Application</h2>
      <p><strong>Role:</strong> ${escapeHtml(app.role)}</p>
      <p><strong>Name:</strong> ${escapeHtml(app.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(app.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(app.phone)}</p>
      <p><strong>Experience:</strong> ${escapeHtml(app.experience ?? "—")}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(app.message ?? "—").replace(/\n/g, "<br/>")}</p>
      <p><strong>Resume:</strong> <a href="${resumeLink}">${escapeHtml(app.resume_file_name)}</a></p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [HR_EMAIL],
        reply_to: app.email,
        subject: `New Application: ${app.role} — ${app.name}`,
        html,
        attachments: attachment ? [attachment] : undefined,
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      console.error("Resend error", res.status, t);
      return new Response(JSON.stringify({ ok: false, error: t }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, emailed: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function escapeHtml(s: string) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } as any)[c]);
}
