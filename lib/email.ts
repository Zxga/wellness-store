import { Resend } from 'resend';
import { OrderItem } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);

const BASE_STYLE = `
  font-family: 'Inter', Arial, sans-serif;
  background: #120308;
  margin: 0;
  padding: 20px;
  color: #ffffff;
`;
const HEADER_STYLE = `
  background: linear-gradient(135deg, #C2185B, #A01548);
  padding: 32px;
  text-align: center;
  border-radius: 16px 16px 0 0;
`;
const CARD_STYLE = `
  max-width: 600px;
  margin: 0 auto;
  background: #1F0810;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(240,98,146,0.2);
  box-shadow: 0 0 60px rgba(194,24,91,0.3);
`;

export async function sendOrderConfirmation(
  customerEmail: string,
  customerName: string,
  orderId: string,
  items: OrderItem[],
  total: number
) {
  const itemsHtml = items.map((item) => `
    <tr>
      <td style="padding:12px;border-bottom:1px solid rgba(255,255,255,0.08);color:#fff;">
        <strong>${item.name}</strong><br/>
        <span style="color:rgba(255,255,255,0.5);font-size:13px;">Qty: ${item.quantity}</span>
      </td>
      <td style="padding:12px;border-bottom:1px solid rgba(255,255,255,0.08);text-align:right;color:#F06292;font-weight:700;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join('');

  await resend.emails.send({
    from: 'RAYLUNE <orders@raylune.com>',
    to: customerEmail,
    subject: 'Your RAYLUNE order is confirmed ✨',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="${BASE_STYLE}">
          <div style="${CARD_STYLE}">
            <div style="${HEADER_STYLE}">
              <h1 style="color:#fff;margin:0;font-size:28px;letter-spacing:0.15em;font-weight:800;">✦ RAYLUNE</h1>
              <p style="color:rgba(255,255,255,0.75);margin:6px 0 0;font-size:13px;">Light. Recovery. Glow.</p>
            </div>
            <div style="padding:32px;">
              <h2 style="color:#F06292;margin-top:0;">Order Confirmed ✨</h2>
              <p style="color:rgba(255,255,255,0.65);">Hi ${customerName}, your glow ritual is on its way!</p>
              <p style="color:rgba(255,255,255,0.5);font-size:13px;">Order #${orderId.slice(0, 8).toUpperCase()}</p>
              <table style="width:100%;border-collapse:collapse;margin:20px 0;">
                ${itemsHtml}
                <tr>
                  <td style="padding:14px;font-weight:700;color:#fff;">Total</td>
                  <td style="padding:14px;font-weight:800;text-align:right;color:#F06292;font-size:18px;">$${total.toFixed(2)}</td>
                </tr>
              </table>
              <div style="background:rgba(194,24,91,0.1);border:1px solid rgba(240,98,146,0.25);border-radius:10px;padding:16px;margin:20px 0;">
                <p style="margin:0;color:#F06292;font-weight:600;">📦 Estimated Delivery: 7–14 business days</p>
                <p style="margin:6px 0 0;color:rgba(255,255,255,0.5);font-size:13px;">Express shipping: 3–5 business days</p>
              </div>
              <p style="color:rgba(255,255,255,0.5);font-size:13px;">Questions? Reply to this email or visit <a href="${process.env.NEXT_PUBLIC_URL}/contact" style="color:#F06292;">support</a>.</p>
            </div>
            <div style="padding:16px;text-align:center;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0;">© 2026 RAYLUNE. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}

export async function sendWelcomeEmail(email: string, discountCode: string) {
  await resend.emails.send({
    from: 'RAYLUNE <hello@raylune.com>',
    to: email,
    subject: "Here's your 15% off glow ritual code ✨",
    html: `
      <!DOCTYPE html>
      <html>
        <body style="${BASE_STYLE}">
          <div style="${CARD_STYLE}">
            <div style="${HEADER_STYLE}">
              <h1 style="color:#fff;margin:0;font-size:28px;letter-spacing:0.15em;font-weight:800;">✦ RAYLUNE</h1>
            </div>
            <div style="padding:32px;text-align:center;">
              <h2 style="color:#fff;margin-top:0;">Welcome to Your Glow Ritual 🌟</h2>
              <p style="color:rgba(255,255,255,0.65);">Here's your exclusive welcome discount:</p>
              <div style="background:rgba(194,24,91,0.12);border:2px dashed rgba(240,98,146,0.4);border-radius:12px;padding:24px;margin:24px 0;">
                <p style="font-size:36px;font-weight:800;color:#F06292;margin:0;letter-spacing:6px;">${discountCode}</p>
                <p style="color:rgba(255,255,255,0.5);margin:8px 0 0;font-size:13px;">15% off your first order</p>
              </div>
              <a href="${process.env.NEXT_PUBLIC_URL}/shop"
                style="display:inline-block;background:linear-gradient(135deg,#C2185B,#A01548);color:#fff;padding:14px 36px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 0 24px rgba(194,24,91,0.45);">
                Shop the Collection →
              </a>
              <p style="color:rgba(255,255,255,0.4);font-size:13px;margin-top:20px;">Red light therapy · Recovery · Sleep rituals</p>
            </div>
            <div style="padding:16px;text-align:center;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0;">© 2026 RAYLUNE. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}

export async function sendContactEmail(name: string, email: string, message: string) {
  await resend.emails.send({
    from: 'RAYLUNE Contact <contact@raylune.com>',
    to: process.env.ADMIN_EMAIL!,
    subject: `New RAYLUNE contact from ${name}`,
    html: `
      <h2>New Contact Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `,
  });
}
