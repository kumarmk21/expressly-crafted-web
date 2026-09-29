// Sends a notification email (with resume attached) to HR when an application is submitted.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const HR_EMAILS = ["anil.mishra@scorpiongroup.in", "dhanushedge17@gmail.com"];
const SMTP_HOST = "in-mum-m314.icewarpcloud.in";
const SMTP_PORT = 587;
const SMTP_USER = "info@scorpiongroup.in";
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
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
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
        content: base64Encode(new Uint8Array(await fileBlob.arrayBuffer())),
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
      to: HR_EMAILS,
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
    return new Response(JSON.stringify({ error: String(e?.message ?? e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

type MailAttachment = {
  filename: string;
  contentType: string;
  content: string;
};

async function sendSmtpMail({
  password,
  to,
  replyTo,
  subject,
  html,
  attachment,
}: {
  password: string;
  to: string[];
  replyTo: string;
  subject: string;
  html: string;
  attachment: MailAttachment | null;
}) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let conn: Deno.Conn = await Deno.connect({ hostname: SMTP_HOST, port: SMTP_PORT });

  const writeLine = async (line: string) => {
    await conn.write(encoder.encode(`${line}\r\n`));
  };

  const readResponse = async () => {
    let response = "";
    const buffer = new Uint8Array(4096);
    while (true) {
      const n = await conn.read(buffer);
      if (n === null) throw new Error("SMTP connection closed unexpectedly");
      response += decoder.decode(buffer.subarray(0, n));
      const lines = response.split(/\r?\n/).filter(Boolean);
      const last = lines[lines.length - 1] ?? "";
      if (/^\d{3} /.test(last)) {
        const code = Number(last.slice(0, 3));
        return { code, response };
      }
    }
  };

  const expect = async (allowed: number[], command?: string) => {
    if (command) await writeLine(command);
    const result = await readResponse();
    if (!allowed.includes(result.code)) {
      throw new Error(`SMTP command failed (${result.code}): ${result.response}`);
    }
    return result.response;
  };

  try {
    await expect([220]);
    const ehlo = await expect([250], `EHLO ${SMTP_HOST}`);
    if (/STARTTLS/im.test(ehlo)) {
      await expect([220], "STARTTLS");
      conn = await Deno.startTls(conn, { hostname: SMTP_HOST });
      await expect([250], `EHLO ${SMTP_HOST}`);
    }

    await expect([334], "AUTH LOGIN");
    await expect([334], base64EncodeUtf8(SMTP_USER));
    await expect([235], base64EncodeUtf8(password));
    await expect([250], `MAIL FROM:<${SMTP_USER}>`);
    for (const r of to) await expect([250, 251], `RCPT TO:<${r}>`);
    await expect([354], "DATA");
    await writeLine(buildMimeMessage({ to, replyTo, subject, html, attachment }));
    await expect([250], ".");
    await writeLine("QUIT");
  } finally {
    try {
      conn.close();
    } catch (_) {
      // Ignore close errors.
    }
  }
}

function buildMimeMessage({
  to,
  replyTo,
  subject,
  html,
  attachment,
}: {
  to: string[];
  replyTo: string;
  subject: string;
  html: string;
  attachment: MailAttachment | null;
}) {
  const boundary = `scorpion-${crypto.randomUUID()}`;
  const safeFilename = attachment?.filename.replace(/[\r\n"]/g, "_") ?? "resume";
  const lines = [
    `From: ${FROM_NAME} <${SMTP_USER}>`,
    `To: ${to.join(", ")}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${encodeHeader(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(base64EncodeUtf8(html)),
  ];

  if (attachment) {
    lines.push(
      `--${boundary}`,
      `Content-Type: ${attachment.contentType}; name="${safeFilename}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="${safeFilename}"`,
      "",
      wrapBase64(attachment.content),
    );
  }

  lines.push(`--${boundary}--`, "");
  return lines.join("\r\n");
}

function escapeHtml(s: string) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } as any)[c]);
}

function encodeHeader(value: string) {
  return `=?UTF-8?B?${base64EncodeUtf8(value)}?=`;
}

function base64EncodeUtf8(value: string) {
  return base64Encode(new TextEncoder().encode(value));
}

function base64Encode(bytes: Uint8Array) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function wrapBase64(value: string) {
  return value.replace(/.{1,76}/g, "$&\r\n").trimEnd();
}
