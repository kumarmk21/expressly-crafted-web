const SMTP_HOST = "in-mum-m314.icewarpcloud.in";
const SMTP_PORT = 587;
const SMTP_USER = "info@scorpiongroup.in";
const FROM_NAME = "Scorpion Express";

export type MailAttachment = {
  filename: string;
  contentType: string;
  content: string;
};

export async function sendSmtpMail({
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
    if (!/STARTTLS/im.test(ehlo)) throw new Error("Secure email connection unavailable");
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

export function escapeHtml(s: string) {
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
