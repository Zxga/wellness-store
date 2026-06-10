import { Resend } from 'resend';
import { OrderItem } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(
  customerEmail: string,
  customerName: string,
  orderId: string,
  items: OrderItem[],
  total: number
) {
  const itemsHtml = items
    .map(
      (item) => `
    <tr>
      <td style="padding:12px;border-bottom:1px solid #f0f0f0;">
        <strong>${item.name}</strong><br/>
        <span style="color:#6B7280;">Qty: ${item.quantity}</span>
      </td>
      <td style="padding:12px;border-bottom:1px solid #f0f0f0;text-align:right;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `
    )
    .join('');

  await resend.emails.send({
    from: 'WellnessHub <orders@wellnesshub.com>',
    to: customerEmail,
    subject: 'Your WellnessHub order is confirmed! 🌿',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family:Inter,sans-serif;background:#FAFAF9;margin:0;padding:20px;">
          <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
            <div style="background:#16A34A;padding:32px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:28px;">🌿 WellnessHub</h1>
            </div>
            <div style="padding:32px;">
              <h2 style="color:#111827;margin-top:0;">Order Confirmed! ✅</h2>
              <p style="color:#6B7280;">Hi ${customerName}, thank you for your order. We're getting it ready!</p>
              <p style="color:#6B7280;"><strong>Order #${orderId.slice(0, 8).toUpperCase()}</strong></p>

              <table style="width:100%;border-collapse:collapse;margin:24px 0;">
                ${itemsHtml}
                <tr>
                  <td style="padding:12px;font-weight:700;">Total</td>
                  <td style="padding:12px;font-weight:700;text-align:right;color:#16A34A;">$${total.toFixed(2)}</td>
                </tr>
              </table>

              <div style="background:#F0FDF4;border-radius:8px;padding:16px;margin:24px 0;">
                <p style="margin:0;color:#16A34A;font-weight:600;">📦 Estimated Delivery: 7-14 business days</p>
                <p style="margin:4px 0 0;color:#6B7280;font-size:14px;">Express shipping: 3-5 business days</p>
              </div>

              <p style="color:#6B7280;">Need help? Reply to this email or visit our <a href="${process.env.NEXT_PUBLIC_URL}/contact" style="color:#16A34A;">support page</a>.</p>
            </div>
            <div style="background:#f9f9f9;padding:16px;text-align:center;">
              <p style="color:#6B7280;font-size:12px;margin:0;">© 2024 WellnessHub. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}

export async function sendWelcomeEmail(email: string, discountCode: string) {
  await resend.emails.send({
    from: 'WellnessHub <hello@wellnesshub.com>',
    to: email,
    subject: "Here's your 10% off code 🎁",
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family:Inter,sans-serif;background:#FAFAF9;margin:0;padding:20px;">
          <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
            <div style="background:#16A34A;padding:32px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:28px;">🌿 WellnessHub</h1>
            </div>
            <div style="padding:32px;text-align:center;">
              <h2 style="color:#111827;">Welcome to Your Wellness Journey! 🎉</h2>
              <p style="color:#6B7280;">Here's your exclusive discount code:</p>
              <div style="background:#F0FDF4;border:2px dashed #16A34A;border-radius:8px;padding:20px;margin:24px 0;">
                <p style="font-size:32px;font-weight:700;color:#16A34A;margin:0;letter-spacing:4px;">${discountCode}</p>
                <p style="color:#6B7280;margin:8px 0 0;font-size:14px;">10% off your first order</p>
              </div>
              <a href="${process.env.NEXT_PUBLIC_URL}/shop" style="display:inline-block;background:#16A34A;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;">Shop Now →</a>
              <p style="color:#6B7280;font-size:14px;margin-top:24px;">Discover our wellness collection — from infrared sauna blankets to red light therapy wands, everything you need to feel your best.</p>
            </div>
            <div style="background:#f9f9f9;padding:16px;text-align:center;">
              <p style="color:#6B7280;font-size:12px;margin:0;">© 2024 WellnessHub. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}

export async function sendContactEmail(
  name: string,
  email: string,
  message: string
) {
  await resend.emails.send({
    from: 'WellnessHub Contact <contact@wellnesshub.com>',
    to: process.env.ADMIN_EMAIL!,
    subject: `New contact message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `,
  });
}
