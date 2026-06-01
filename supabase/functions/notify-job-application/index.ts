// Sends a notification email (with resume attached) to HR via SMTP when an application is submitted.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const HR_EMAIL = "dhanushedge17@gmail.com";
const SMTP_HOST = "smtp.scorpiongroup.in";
const SMTP_PORT = 587;
const SMTP_USER = "info@scorpiongroup.in";
const FROM_NAME = "Scorpion Careers";

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

    // Signed URL for the resume (7 days) as a backup link
    const { data: signed } = await supabase.storage
      .from("resumes").createSignedUrl(app.resume_url, 60 * 60 * 24 * 7);
    const resumeLink = signed?.signedUrl ?? "(unavailable)";

    const SMTP_PASSWORD = Deno.env.get("SMTP_PASSWORD");
    if (!SMTP_PASSWORD) {
      console.error("SMTP_PASSWORD missing");
      return new Response(JSON.stringify({ ok: false, error: "SMTP_PASSWORD not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Download resume to attach
    const { data: fileBlob } = await supabase.storage.from("resumes").download(app.resume_url);
    let attachment: { filename: string; content: Uint8Array; contentType: string } | null = null;
    if (fileBlob) {
      const buf = new Uint8Array(await fileBlob.arrayBuffer());
      attachment = {
        filename: app.resume_file_name || "resume",
        content: buf,
        contentType: fileBlob.type || "application/octet-stream",
      };
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

    const client = new SMTPClient({
      connection: {
        hostname: SMTP_HOST,
        port: SMTP_PORT,
        tls: false,
        auth: { username: SMTP_USER, password: SMTP_PASSWORD },
      },
    });

    try {
      await client.send({
        from: `${FROM_NAME} <${SMTP_USER}>`,
        to: HR_EMAIL,
        replyTo: app.email,
        subject: `New Application: ${app.role} — ${app.name}`,
        html,
        content: "auto",
        attachments: attachment
          ? [{
              filename: attachment.filename,
              content: attachment.content,
              contentType: attachment.contentType,
              encoding: "binary",
            }]
          : undefined,
      });
    } finally {
      await client.close();
    }

    return new Response(JSON.stringify({ ok: true, emailed: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("notify-job-application error:", e);
    return new Response(JSON.stringify({ error: String(e?.message ?? e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function escapeHtml(s: string) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } as any)[c]);
}
