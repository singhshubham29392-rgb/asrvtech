const CONTACT_ENDPOINT = "/api/contact";

const json = (status, payload) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const handleContact = async (request, env) => {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  const destinationEmail = env.CONTACT_TO_EMAIL;
  const fromEmail = env.CONTACT_FROM_EMAIL ?? "customers@asrvtech.in";
  const fromName = env.CONTACT_FROM_NAME ?? "ASRV Tech";

  if (!destinationEmail) {
    return json(500, { error: "CONTACT_TO_EMAIL is not configured." });
  }

  try {
    const payload = await request.json();
    const name = String(payload?.name ?? "").trim();
    const email = String(payload?.email ?? "").trim();
    const phone = String(payload?.phone ?? "").trim();
    const address = String(payload?.address ?? "").trim();
    const message = String(payload?.message ?? "").trim();

    if (!name || !email || !phone || !address || !message) {
      return json(400, {
        error: "Name, email, phone, address and message are required.",
      });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeAddress = escapeHtml(address);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
    const subject = `New website inquiry from ${name} - ${new Date().toISOString()}`;

    const mailPayload = {
      personalizations: [
        {
          to: [{ email: destinationEmail }],
        },
      ],
      from: { email: fromEmail, name: fromName },
      reply_to: { email, name },
      subject,
      content: [
        {
          type: "text/plain",
          value: [
            "New Contact Form Message",
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Address: ${address}`,
            "Message:",
            message,
          ].join("\n"),
        },
        {
          type: "text/html",
          value: `
            <h2>New Contact Form Message</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <p><strong>Address:</strong> ${safeAddress}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
          `,
        },
      ],
    };

    const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mailPayload),
    });

    if (!response.ok) {
      const errorPayload = await response.text().catch(() => "");
      return json(502, {
        error: errorPayload || "Failed to send email via Cloudflare transport.",
      });
    }

    return json(200, { success: true, to: destinationEmail, subject });
  } catch {
    return json(500, { error: "Unexpected error while sending message." });
  }
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === CONTACT_ENDPOINT) {
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
