// Sends a notification email (with resume attached) to HR when an application is submitted.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const HR_EMAIL = "dhanushedge17@gmail.com";
const FROM_EMAIL = "info@scorpiongroup.in";
const FROM_NAME = "Scorpion Careers";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { application_id, resume_url } = await req.json();
    if (!application_id && !resume_url) {
      return new Response(JSON.stringify({ error: "application_id or resume_url required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const query = supabase.from("job_applications").select("*");
    const { data: app, error } = application_id
      ? await query.eq("id", application_id).maybeSingle()
      : await query.eq("resume_url", resume_url).order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (error || !app) {
      return new Response(JSON.stringify({ error: "Application not found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Signed URL for the resume (7 days) as a backup link
    const { data: signed } = await supabase.storage
      .from("resumes").createSignedUrl(app.resume_url, 60 * 60 * 24 * 7);
    const resumeLink = signed?.signedUrl ?? "(unavailable)";

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY missing");
      return new Response(JSON.stringify({ ok: false, error: "Email service not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Download resume to attach
    const { data: fileBlob } = await supabase.storage.from("resumes").download(app.resume_url);
    let attachment: { filename: string; content: string; content_type: string } | null = null;
    if (fileBlob) {
      const buf = new Uint8Array(await fileBlob.arrayBuffer());
      attachment = {
        filename: app.resume_file_name || "resume",
        content: base64Encode(buf),
        content_type: fileBlob.type || "application/octet-stream",
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

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [HR_EMAIL],
        reply_to: app.email,
        subject: `New Application: ${app.role} — ${app.name}`,
        html,
        attachments: attachment ? [attachment] : undefined,
      }),
    });

    const emailResult = await emailResponse.json().catch(() => ({}));
    if (!emailResponse.ok) {
      console.error("Resend email error:", emailResult);
      return new Response(JSON.stringify({ ok: false, error: "Email notification failed" }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, emailed: true, id: emailResult.id }), {
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

function base64Encode(bytes: Uint8Array) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}
