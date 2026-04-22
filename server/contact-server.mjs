import { createServer } from "node:http";
import { config } from "dotenv";

config();

const apiPort = Number(process.env.API_PORT ?? "8787");
const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM ?? "ASRV Tech <onboarding@resend.dev>";
const destinationEmail = process.env.CONTACT_TO_EMAIL ?? "singhshubham29392@gmail.com";

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const json = (statusCode, payload) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  },
  body: JSON.stringify(payload),
});

const readBody = async (req) => {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
};

const server = createServer(async (req, res) => {
  if (!req.url) {
    const response = json(404, { error: "Not found" });
    res.writeHead(response.statusCode, response.headers);
    res.end(response.body);
    return;
  }

  if (req.method === "OPTIONS" && req.url === "/api/contact") {
    const response = json(204, {});
    res.writeHead(response.statusCode, response.headers);
    res.end();
    return;
  }

  if (req.method !== "POST" || req.url !== "/api/contact") {
    const response = json(404, { error: "Not found" });
    res.writeHead(response.statusCode, response.headers);
    res.end(response.body);
    return;
  }

  if (!resendApiKey) {
    const response = json(500, { error: "RESEND_API_KEY is not configured on server." });
    res.writeHead(response.statusCode, response.headers);
    res.end(response.body);
    return;
  }

  try {
    const payload = await readBody(req);
    const name = String(payload.name ?? "").trim();
    const email = String(payload.email ?? "").trim();
    const phone = String(payload.phone ?? "").trim();
    const address = String(payload.address ?? "").trim();
    const message = String(payload.message ?? "").trim();

    if (!name || !email || !phone || !address || !message) {
      const response = json(400, { error: "Name, email, phone, address and message are required." });
      res.writeHead(response.statusCode, response.headers);
      res.end(response.body);
      return;
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeAddress = escapeHtml(address);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    const subject = `New website inquiry from ${name} - ${new Date().toISOString()}`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [destinationEmail],
        reply_to: email,
        subject,
        text: [
          "New Contact Form Message",
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Address: ${address}`,
          "Message:",
          message,
        ].join("\n"),
        html: `
          <h2>New Contact Form Message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Address:</strong> ${safeAddress}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
      }),
    });

    const resendPayload = await resendResponse.json().catch(() => null);

    if (!resendResponse.ok) {
      const response = json(502, {
        error: resendPayload?.message ?? "Failed to send email via Resend.",
      });
      res.writeHead(response.statusCode, response.headers);
      res.end(response.body);
      return;
    }

    const response = json(200, { success: true, id: resendPayload?.id ?? null, to: destinationEmail, subject });
    res.writeHead(response.statusCode, response.headers);
    res.end(response.body);
  } catch {
    const response = json(500, { error: "Unexpected error while sending message." });
    res.writeHead(response.statusCode, response.headers);
    res.end(response.body);
  }
});

server.listen(apiPort, "0.0.0.0", () => {
  console.log(`Contact API server running on http://localhost:${apiPort}`);
});
