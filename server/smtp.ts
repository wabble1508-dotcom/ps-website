import { connect } from "cloudflare:sockets";

// Minimaler SMTP-Versand über ein normales Postfach (z. B. Strato: smtp.strato.de, Port 465, SSL).
// So kommen E-Mails direkt von mondjal@ps-professional-solutions.de – ohne Zusatzdienst.

export type SmtpConfig = { host: string; port: number; user: string; pass: string };
export type SmtpMail = {
  from: string; // "Name <adresse>"
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  attachments?: { filename: string; content: string }[]; // content = Base64
};

const enc = new TextEncoder();
const dec = new TextDecoder();
const b64 = (s: string) => btoa(String.fromCharCode(...enc.encode(s)));
const wrap = (s: string) => s.replace(/.{1,76}/g, "$&\r\n");
const encodeHeader = (s: string) => (/^[\x20-\x7e]*$/.test(s) ? s : `=?UTF-8?B?${b64(s)}?=`);
const encodeAddress = (s: string) => {
  const m = s.match(/^(.*)<([^>]+)>$/);
  return m ? `${encodeHeader(m[1].trim().replace(/^"|"$/g, ""))} <${m[2].trim()}>` : s;
};
const bare = (s: string) => s.match(/<([^>]+)>/)?.[1] || s.trim();

export const buildMessage = (m: SmtpMail) => {
  const boundary = `b${crypto.randomUUID().replace(/-/g, "")}`;
  const alt = `a${crypto.randomUUID().replace(/-/g, "")}`;
  const domain = bare(m.from).split("@")[1] || "localhost";
  const headers = [
    `From: ${encodeAddress(m.from)}`,
    `To: ${m.to}`,
    `Subject: ${encodeHeader(m.subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    "MIME-Version: 1.0",
    ...(m.replyTo ? [`Reply-To: ${m.replyTo}`] : []),
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
  ];
  const textPart = `Content-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n${wrap(b64(m.text))}`;
  const body = m.html
    ? `Content-Type: multipart/alternative; boundary="${alt}"\r\n\r\n--${alt}\r\n${textPart}\r\n--${alt}\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n${wrap(b64(m.html))}\r\n--${alt}--`
    : textPart;
  const parts = [
    body,
    ...(m.attachments || []).map(
      (a) =>
        `Content-Type: ${a.filename.endsWith(".ics") ? "text/calendar; charset=UTF-8; method=PUBLISH" : "application/octet-stream"}; name="${a.filename}"\r\nContent-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename="${a.filename}"\r\n\r\n${wrap(a.content)}`,
    ),
  ];
  return `${headers.join("\r\n")}\r\n\r\n${parts.map((p) => `--${boundary}\r\n${p}`).join("\r\n")}\r\n--${boundary}--\r\n`;
};

export const sendSmtp = async (cfg: SmtpConfig, mail: SmtpMail) => {
  const socket = connect({ hostname: cfg.host, port: cfg.port }, { secureTransport: cfg.port === 465 ? "on" : "starttls", allowHalfOpen: false });
  let active = socket;
  let reader = active.readable.getReader();
  let writer = active.writable.getWriter();
  let buffer = "";

  // Antwort lesen (mehrzeilig: „250-…“ bis „250 …“)
  const read = async (expect: number) => {
    for (;;) {
      const lines = buffer.split("\r\n");
      const done = lines.findIndex((l) => /^\d{3} /.test(l));
      if (done >= 0) {
        const reply = lines.slice(0, done + 1).join("\n");
        buffer = lines.slice(done + 1).join("\r\n");
        const code = Number(reply.split("\n").pop()!.slice(0, 3));
        if (code !== expect) throw new Error(`SMTP ${code}: ${reply.slice(0, 200)}`);
        return reply;
      }
      const { value, done: closed } = await reader.read();
      if (closed) throw new Error("SMTP-Verbindung geschlossen");
      buffer += dec.decode(value, { stream: true });
    }
  };
  const send = (line: string) => writer.write(enc.encode(`${line}\r\n`));

  try {
    await read(220);
    await send(`EHLO ${cfg.user.split("@")[1] || "localhost"}`);
    await read(250);
    if (cfg.port !== 465) {
      await send("STARTTLS");
      await read(220);
      reader.releaseLock();
      writer.releaseLock();
      active = socket.startTls();
      reader = active.readable.getReader();
      writer = active.writable.getWriter();
      await send(`EHLO ${cfg.user.split("@")[1] || "localhost"}`);
      await read(250);
    }
    await send("AUTH LOGIN");
    await read(334);
    await send(b64(cfg.user));
    await read(334);
    await send(b64(cfg.pass));
    await read(235);
    await send(`MAIL FROM:<${bare(mail.from)}>`);
    await read(250);
    await send(`RCPT TO:<${bare(mail.to)}>`);
    await read(250);
    await send("DATA");
    await read(354);
    // Zeilen, die mit „.“ beginnen, verdoppeln (SMTP-Regel)
    await writer.write(enc.encode(`${buildMessage(mail).replace(/\r\n\./g, "\r\n..")}\r\n.\r\n`));
    await read(250);
    await send("QUIT");
  } finally {
    try {
      await active.close();
    } catch {
      // schon geschlossen
    }
  }
};
