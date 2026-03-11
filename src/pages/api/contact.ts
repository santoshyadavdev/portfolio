import type { APIRoute } from "astro";

// This endpoint must be server-rendered to handle POST requests
export const prerender = false;

// Define the Cloudflare runtime environment type
interface CloudflareEnv {
  AUTOSEND_API_KEY?: string;
  AUTOSEND_FROM_EMAIL?: string;
  CONTACT_EMAIL?: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data = await request.json();
    const { name, email, message, website } = data;

    // Honeypot check - if filled, it's likely a bot
    if (website) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Get environment variables from Cloudflare runtime or import.meta.env (for local dev)
    const runtime = (locals as { runtime?: { env?: CloudflareEnv } }).runtime;
    const env = runtime?.env || {};

    const apiKey = env.AUTOSEND_API_KEY || import.meta.env.AUTOSEND_API_KEY;
    const recipientEmail =
      env.CONTACT_EMAIL ||
      import.meta.env.CONTACT_EMAIL ||
      "santosh.yadav198613@gmail.com";
    const senderEmail =
      env.AUTOSEND_FROM_EMAIL || import.meta.env.AUTOSEND_FROM_EMAIL;

    if (!apiKey || !senderEmail) {
      console.error(
        "Missing environment variables: AUTOSEND_API_KEY and AUTOSEND_FROM_EMAIL are required"
      );
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Send email via Autosend API
    // Docs: https://docs.autosend.com/quickstart/email-using-api
    const response = await fetch("https://api.autosend.com/v1/mails/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        to: {
          email: recipientEmail,
          name: "Santosh Yadav",
        },
        from: {
          email: senderEmail,
          name: "Contact Form",
        },
        subject: `Contact Form: Message from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
        replyTo: email,
      }),
    });

    if (response.ok) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const errorData = await response.text();
      console.error("Autosend API error:", errorData);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
