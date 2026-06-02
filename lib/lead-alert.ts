export type LeadAlertPayload = {
  name: string;
  phone: string;
  experience: string;
  visit_date: string;
  visit_time: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function siteOrigin(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "";
}

function buildAlertHtml(lead: LeadAlertPayload): string {
  const name = escapeHtml(lead.name);
  const phone = escapeHtml(lead.phone);
  const experience = escapeHtml(lead.experience);
  const visitDate = escapeHtml(lead.visit_date);
  const visitTime = escapeHtml(lead.visit_time);
  const tel = lead.phone.replace(/\D/g, "");
  const adminLink = siteOrigin() ? `${siteOrigin()}/admin` : "";

  return `
    <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; background: #0a0a12; color: #f0f0f4; padding: 32px; border-radius: 16px;">
      <p style="margin: 0 0 8px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #e0b84e;">Hot lead alert</p>
      <h1 style="margin: 0 0 24px; font-size: 22px; font-weight: 600;">New booking — ${experience}</h1>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 10px 0; color: #8898c0; width: 120px;">Name</td><td style="padding: 10px 0; font-weight: 600;">${name}</td></tr>
        <tr><td style="padding: 10px 0; color: #8898c0;">Phone</td><td style="padding: 10px 0;"><a href="tel:${tel}" style="color: #60a5fa; text-decoration: none;">${phone}</a></td></tr>
        <tr><td style="padding: 10px 0; color: #8898c0;">Experience</td><td style="padding: 10px 0;">${experience}</td></tr>
        <tr><td style="padding: 10px 0; color: #8898c0;">Visit date</td><td style="padding: 10px 0;">${visitDate}</td></tr>
        <tr><td style="padding: 10px 0; color: #8898c0;">Visit time</td><td style="padding: 10px 0; color: #e0b84e; font-weight: 600;">${visitTime}</td></tr>
      </table>
      ${adminLink ? `<p style="margin: 28px 0 0; font-size: 12px; color: #5c5c6e;">Reply within 2 hours — <a href="${adminLink}" style="color: #8898c0;">Open lead dashboard</a></p>` : `<p style="margin: 28px 0 0; font-size: 12px; color: #5c5c6e;">Reply within 2 hours.</p>`}
    </div>
  `.trim();
}

/** Sends an instant email when lead alert env vars are configured. Never throws. */
export async function sendLeadAlert(lead: LeadAlertPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_ALERT_EMAIL;
  if (!apiKey || !to) return;

  const from = process.env.RESEND_FROM ?? "Aryan Abode <onboarding@resend.dev>";
  const subject = `Hot lead: ${lead.name} — ${lead.experience} on ${lead.visit_date}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html: buildAlertHtml(lead),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[lead-alert] Resend error:", res.status, body);
    }
  } catch (err) {
    console.error("[lead-alert] Failed to send:", err);
  }
}
