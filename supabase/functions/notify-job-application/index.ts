// Sends a notification email (with resume attached) to HR when an application is submitted.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";
import { sendSmtpMail, escapeHtml, type MailAttachment } from "../_shared/mail.ts";
import { RESUME_RECIPIENTS } from "../_shared/recipients.ts";
const RequestSchema = z.object({ application_id: z.string().uuid().optional(), resume_url: z.string().min(1).max(255).regex(/^[a-zA-Z0-9._-]+$/).optional() }).refine(value => value.application_id || value.resume_url);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const parsed = RequestSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "application_id or resume_url required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { application_id, resume_url } = parsed.data;
    const url = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !key) throw new Error("Email service unavailable");
    const supabase = createClient(url, key);

    const query = supabase.from("job_applications").select("*");
    const { data: app, error } = application_id
      ? await query.eq("id", application_id).maybeSingle()
      : await query.eq("resume_url", resume_url).order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (error || !app) {
      return new Response(JSON.stringify({ error: "Application not found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const smtpPassword = Deno.env.get("SMTP_PASSWORD");
    if (!smtpPassword) {
      console.error("SMTP_PASSWORD missing");
      return new Response(JSON.stringify({ ok: false, error: "Email service not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: signed } = await supabase.storage
      .from("resumes").createSignedUrl(app.resume_url, 60 * 60 * 24 * 7);
    const resumeLink = signed?.signedUrl ?? "(unavailable)";

    const { data: fileBlob } = await supabase.storage.from("resumes").download(app.resume_url);
    let attachment: MailAttachment | null = null;
    if (fileBlob) {
      attachment = {
        filename: app.resume_file_name || "resume",
        contentType: fileBlob.type || "application/octet-stream",
        content: btoa(Array.from(new Uint8Array(await fileBlob.arrayBuffer()), byte => String.fromCharCode(byte)).join("")),
      };
    }

    const rows: [string, string][] = [
      ["Role", app.role], ["Name", app.name], ["Email", app.email], ["Phone", app.phone],
      ["Experience", app.experience ?? "—"], ["Message", app.message ?? "—"],
      ["Submitted", new Date(app.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
    ];
    const html = `<div style="font-family:Arial,sans-serif;max-width:640px">
      <div style="background:#C8102E;color:#fff;padding:14px 18px;font-size:18px;font-weight:bold">New Job Application</div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${rows.map(([k, v]) => `<tr><td style="border:1px solid #ddd;padding:8px 12px;background:#f6f6f6;font-weight:bold;width:160px">${k}</td><td style="border:1px solid #ddd;padding:8px 12px">${escapeHtml(String(v)).replace(/\n/g, "<br/>")}</td></tr>`).join("")}
      <tr><td style="border:1px solid #ddd;padding:8px 12px;background:#f6f6f6;font-weight:bold">Resume</td><td style="border:1px solid #ddd;padding:8px 12px"><a href="${resumeLink}">${escapeHtml(app.resume_file_name || "Download resume")}</a> (also attached)</td></tr>
      </table><p style="font-size:12px;color:#777">Scorpion Express Pvt. Ltd. — website careers form</p></div>`;

    await sendSmtpMail({
      password: smtpPassword,
      to: RESUME_RECIPIENTS,
      replyTo: app.email,
      subject: `New Application: ${app.role} — ${app.name}`,
      html,
      attachment,
    });

    return new Response(JSON.stringify({ ok: true, emailed: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("notify-job-application error:", e);
    return new Response(JSON.stringify({ error: "Email notification could not be sent" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

