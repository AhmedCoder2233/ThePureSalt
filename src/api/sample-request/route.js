import { NextResponse } from "next/server";
import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const OWNER_EMAIL = "ahmedmemon3344@gmail.com";
const FROM_ADDRESS = "onboarding@resend.dev";

const PRODUCT_OPTIONS = [
  "Edible Salt",
  "Salt Lamps",
  "Bath Salt & Wellness",
  "Kitchen & Culinary",
  "Construction",
  "Animal Lick Salt",
  "Multiple Products",
  "Private Label / OEM",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_LIMITS = {
  fullName: 120,
  email: 254,
  company: 150,
  phone: 40,
  country: 80,
  message: 2000,
};

// ---------------------------------------------------------------------------
// Best-effort in-memory throttle.
// Note: this resets per server instance/cold start and will not coordinate
// across multiple serverless instances. It only exists to slow down naive
// automated abuse; for real production spam protection, back this with a
// durable store (e.g. Upstash Redis) or a provider like Cloudflare Turnstile.
// ---------------------------------------------------------------------------

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map();

function isRateLimited(ip) {
  if (!ip || ip === "Unavailable") return false;
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function clean(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

/**
 * Resolves the visitor's public IP address from standard proxy headers.
 * Never trusts a client-submitted value. Falls back to "Unavailable".
 */
function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain a comma-separated list:
    // "client, proxy1, proxy2" — the first entry is the original client.
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "Unavailable";
}

function validate(payload) {
  const errors = {};

  const fullName = clean(payload.fullName, FIELD_LIMITS.fullName);
  const email = clean(payload.email, FIELD_LIMITS.email);
  const company = clean(payload.company, FIELD_LIMITS.company);
  const phone = clean(payload.phone, FIELD_LIMITS.phone);
  const country = clean(payload.country, FIELD_LIMITS.country);
  const productInterest = clean(payload.productInterest, 60);
  const message = clean(payload.message, FIELD_LIMITS.message);

  if (!fullName) errors.fullName = "Full name is required.";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!phone) errors.phone = "Phone / WhatsApp number is required.";
  if (!country) errors.country = "Country is required.";
  if (!productInterest || !PRODUCT_OPTIONS.includes(productInterest)) {
    errors.productInterest = "Select a valid product interest.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: { fullName, email, company, phone, country, productInterest, message },
  };
}

function buildOwnerEmailHtml({ data, ip, submittedAt }) {
  const row = (label, value) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eee2d8;width:180px;color:#8a7a6d;font-size:13px;font-family:Arial,Helvetica,sans-serif;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #eee2d8;color:#2b1a14;font-size:14px;font-family:Arial,Helvetica,sans-serif;vertical-align:top;">${value || "—"}</td>
    </tr>`;

  return `
  <div style="background:#f7f1ea;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #eee2d8;">
      <div style="background:#6b1420;padding:24px 28px;">
        <p style="margin:0;color:#e9c9a4;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Website Lead</p>
        <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;font-family:Georgia,'Times New Roman',serif;">New Sample Request</h1>
      </div>

      <div style="padding:28px;">
        <h2 style="margin:0 0 12px;font-size:14px;letter-spacing:1px;text-transform:uppercase;color:#6b1420;font-family:Arial,Helvetica,sans-serif;">Customer Details</h2>
        <table style="width:100%;border-collapse:collapse;">
          ${row("Full Name", escapeHtml(data.fullName))}
          ${row("Email", `<a href="mailto:${escapeHtml(data.email)}" style="color:#6b1420;text-decoration:none;">${escapeHtml(data.email)}</a>`)}
          ${row("Company", escapeHtml(data.company))}
          ${row("Phone / WhatsApp", escapeHtml(data.phone))}
          ${row("Country", escapeHtml(data.country))}
          ${row("Product Interest", escapeHtml(data.productInterest))}
          ${row("Message", data.message ? escapeHtml(data.message).replace(/\n/g, "<br/>") : "—")}
        </table>

        <h2 style="margin:28px 0 12px;font-size:14px;letter-spacing:1px;text-transform:uppercase;color:#6b1420;font-family:Arial,Helvetica,sans-serif;">Request Information</h2>
        <table style="width:100%;border-collapse:collapse;">
          ${row("IP Address", escapeHtml(ip))}
          ${row("Submitted At", escapeHtml(submittedAt))}
        </table>
      </div>

      <div style="background:#f7f1ea;padding:16px 28px;text-align:center;">
        <p style="margin:0;color:#8a7a6d;font-size:12px;font-family:Arial,Helvetica,sans-serif;">This request was submitted through the "Request a Free Sample" form on your website.</p>
      </div>
    </div>
  </div>`;
}

function buildCustomerEmailHtml({ data }) {
  return `
  <div style="background:#f7f1ea;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #eee2d8;">
      <div style="background:#6b1420;padding:24px 28px;">
        <h1 style="margin:0;color:#ffffff;font-size:20px;font-family:Georgia,'Times New Roman',serif;">Thank You For Your Request</h1>
      </div>
      <div style="padding:28px;color:#2b1a14;font-size:14px;line-height:1.6;">
        <p>Hi ${escapeHtml(data.fullName)},</p>
        <p>Thank you for requesting a free sample kit for <strong>${escapeHtml(data.productInterest)}</strong>. Our export team has received your request and will contact you shortly at ${escapeHtml(data.phone)} or ${escapeHtml(data.email)}.</p>
        <p>If your inquiry is urgent, feel free to reach us directly on WhatsApp.</p>
        <p style="margin-top:24px;">Best regards,<br/>Himalayan Pink Salt Export Team</p>
      </div>
    </div>
  </div>`;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request." },
        { status: 400 }
      );
    }

    // Honeypot: a hidden field that only bots typically fill in.
    if (typeof payload?.website === "string" && payload.website.trim() !== "") {
      // Silently pretend success so bots don't learn the honeypot worked.
      return NextResponse.json({ success: true });
    }

    const { isValid, errors, data } = validate(payload || {});
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Please check the highlighted fields.", errors },
        { status: 400 }
      );
    }

    const apiKey = "re_KXsVk4PZ_4Rjd4pcQgaZQBTiKYTSaF1dy";

    if (!apiKey) {
      console.error(
        "Sample request email not sent: RESEND_API_KEY is not configured."
      );
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong. Please try again or contact us on WhatsApp.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const submittedAt = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const ownerResult = await resend.emails.send({
      from: FROM_ADDRESS,
      to: OWNER_EMAIL,
      replyTo: data.email,
      subject: `New Free Sample Request — ${data.productInterest}`,
      html: buildOwnerEmailHtml({ data, ip, submittedAt }),
    });

    if (ownerResult?.error) {
      console.error("Resend error (owner email):", ownerResult.error);
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong. Please try again or contact us on WhatsApp.",
        },
        { status: 502 }
      );
    }

    // Optional customer confirmation — best-effort, never blocks the response
    // or exposes failures to the visitor.
    // Note: onboarding@resend.dev is Resend's shared testing address — it can
    // only send confirmation emails to the address you signed up with on
    // Resend until you verify your own domain. This will silently fail
    // otherwise, which is fine since it's wrapped in try/catch.
    try {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: data.email,
        subject: "We've received your sample request",
        html: buildCustomerEmailHtml({ data }),
      });
    } catch (confirmationError) {
      console.error("Resend error (customer confirmation):", confirmationError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unexpected error in /api/sample-request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again or contact us on WhatsApp.",
      },
      { status: 500 }
    );
  }
}