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
  const resendApiKey = env.RESEND_API_KEY;
  const fromEmail = env.RESEND_FROM ?? env.CONTACT_FROM_EMAIL ?? "ASRV Tech <customers@asrvtech.in>";
  const fromName = env.CONTACT_FROM_NAME ?? "ASRV Tech";

  if (!destinationEmail) {
    return json(500, { error: "CONTACT_TO_EMAIL is not configured." });
  }

  if (!resendApiKey) {
    return json(500, { error: "RESEND_API_KEY is not configured." });
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

    const replyTo = `${name} <${email}>`;
    const normalizedFrom =
      fromEmail.includes("<") || !fromEmail.includes("@")
        ? fromEmail
        : `${fromName} <${fromEmail}>`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: normalizedFrom,
        to: [destinationEmail],
        reply_to: replyTo,
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
      return json(502, {
        error:
          resendPayload?.message ??
          resendPayload?.error ??
          "Failed to send email via Resend.",
      });
    }

    return json(200, {
      success: true,
      to: destinationEmail,
      subject,
      id: resendPayload?.id ?? null,
    });
  } catch (error) {
    return json(502, {
      error:
        (error && typeof error === "object" && "message" in error && error.message) ||
        "Unexpected error while sending message.",
    });
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
