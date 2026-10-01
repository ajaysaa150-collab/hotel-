import 'dotenv/config';
import nodemailer from 'nodemailer';

export interface InquiryEmailPayload {
  inquiryId?: string;
  name: string;
  email: string;
  phone: string;
  inquiryType?: string;
  travelDates?: string;
  guestsOrRooms?: string;
  message?: string;
  inquiryDateTime?: string;
}

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  hotelEmail: string;
}

// Read and sanitize SMTP environment variables safely
function getSmtpConfig(): SmtpConfig {
  const host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim().replace(/^["']|["']$/g, '');
  const port = parseInt((process.env.SMTP_PORT || '587').trim().replace(/^["']|["']$/g, ''), 10) || 587;
  const user = (process.env.SMTP_USER || '').trim().replace(/^["']|["']$/g, '');
  
  const rawPass = (process.env.SMTP_PASS || '').trim().replace(/^["']|["']$/g, '');
  const pass = host.toLowerCase().includes('gmail') ? rawPass.replace(/\s+/g, '') : rawPass;
  
  const from = (process.env.SMTP_FROM || user || 'ajaysaa150@gmail.com').trim().replace(/^["']|["']$/g, '');
  
  const hotelEmail = (
    process.env.HOTEL_BOOKING_EMAIL ||
    process.env.HOTEL_EMAIL ||
    'ajaysaa150@gmail.com'
  ).trim().replace(/^["']|["']$/g, '');

  return { host, port, user, pass, from, hotelEmail };
}

// Safe server-side error logging without credential leakage
function safeLogError(prefix: string, err: any, passToRedact?: string) {
  if (!err) {
    console.error(prefix, 'Unknown error');
    return;
  }
  
  let message = typeof err.message === 'string' ? err.message : String(err);
  
  if (passToRedact && passToRedact.length > 3) {
    message = message.replaceAll(passToRedact, '[REDACTED_SECRET]');
  }
  const rawPass = process.env.SMTP_PASS;
  if (rawPass && rawPass.length > 3) {
    message = message.replaceAll(rawPass, '[REDACTED_SECRET]');
  }

  console.error(`${prefix}: ${message}`);
  
  if (err.code || err.command || err.responseCode) {
    console.error(`[SMTP Diagnostic] Code: ${err.code || 'N/A'}, Command: ${err.command || 'N/A'}, ResponseCode: ${err.responseCode || 'N/A'}`);
  }
}

// Create Nodemailer transporter with STARTTLS on port 587
function createTransporter(config: SmtpConfig) {
  const isSecure = config.port === 465;

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: isSecure,
    requireTLS: !isSecure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

// Generate HTML email for Hotel reservations team
function generateHotelInquiryHtml(data: InquiryEmailPayload, inquiryId: string): string {
  const {
    name,
    email,
    phone,
    inquiryType = 'General Reservation Inquiry',
    travelDates = 'Not specified',
    guestsOrRooms = 'Not specified',
    message = 'None',
    inquiryDateTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  } = data;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Guest Inquiry - ${inquiryId}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f9f8; color: #1c1917; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e7e5e4; border-radius: 8px; overflow: hidden; }
    .header { background: #1c1917; color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 600; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #d6d3d1; }
    .badge { display: inline-block; background: #d97706; color: #ffffff; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 4px; margin-top: 12px; }
    .content { padding: 24px; }
    .table-details { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
    .table-details th, .table-details td { padding: 10px 12px; border-bottom: 1px solid #f5f5f4; text-align: left; }
    .table-details th { width: 38%; color: #78716c; font-weight: 500; background: #fafaf9; }
    .table-details td { color: #1c1917; font-weight: 600; }
    .message-box { background: #fafaf9; border-left: 3px solid #d97706; padding: 12px 16px; margin-top: 16px; font-size: 13px; line-height: 1.5; color: #44403c; }
    .footer { padding: 16px 24px; background: #fafaf9; border-top: 1px solid #e7e5e4; font-size: 12px; color: #78716c; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Regency Hotel Mumbai</h1>
      <p>Santacruz East, Mumbai · Direct Guest Inquiry</p>
      <div class="badge">New Guest Inquiry Received</div>
    </div>
    <div class="content">
      <p style="font-size: 14px; margin-top: 0; line-height: 1.5;">
        A new inquiry has been submitted through the hotel website:
      </p>

      <table class="table-details">
        <tr>
          <th>Inquiry Reference</th>
          <td style="color: #b45309; font-size: 14px; font-family: monospace;">${inquiryId}</td>
        </tr>
        <tr>
          <th>Guest Name</th>
          <td>${name}</td>
        </tr>
        <tr>
          <th>Email Address</th>
          <td><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <th>Phone / Mobile</th>
          <td><a href="tel:${phone}" style="color: #1c1917; text-decoration: none;">${phone}</a></td>
        </tr>
        <tr>
          <th>Inquiry Category</th>
          <td style="color: #d97706;">${inquiryType}</td>
        </tr>
        <tr>
          <th>Expected Dates</th>
          <td>${travelDates || 'Flexible / Not specified'}</td>
        </tr>
        <tr>
          <th>Guests / Rooms</th>
          <td>${guestsOrRooms || 'Not specified'}</td>
        </tr>
        <tr>
          <th>Submission Time</th>
          <td style="font-size: 12px; color: #78716c;">${inquiryDateTime}</td>
        </tr>
      </table>

      <div style="margin-top: 18px; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #78716c; letter-spacing: 0.5px;">
        Inquiry Message / Special Requests:
      </div>
      <div class="message-box">
        ${message ? message.replace(/\n/g, '<br>') : 'No extra comments provided.'}
      </div>
    </div>
    <div class="footer">
      Regency Hotel Mumbai · Santacruz East, Mumbai, Maharashtra 400055 · +91 22 2618 3000
    </div>
  </div>
</body>
</html>
  `;
}

// Generate HTML email acknowledgment for Guest
function generateCustomerInquiryHtml(data: InquiryEmailPayload, inquiryId: string): string {
  const { name, inquiryType = 'Reservation Inquiry', travelDates, message } = data;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Inquiry Received - Regency Hotel Mumbai</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f9f8; color: #1c1917; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e7e5e4; border-radius: 8px; overflow: hidden; }
    .header { background: #1c1917; color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 600; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #d6d3d1; }
    .content { padding: 24px; font-size: 14px; line-height: 1.6; }
    .card { background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 6px; padding: 16px; margin: 18px 0; font-size: 13px; }
    .footer { padding: 16px 24px; background: #fafaf9; border-top: 1px solid #e7e5e4; font-size: 12px; color: #78716c; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Regency Hotel Mumbai</h1>
      <p>Santacruz East, Mumbai · Near Airport & BKC</p>
    </div>
    <div class="content">
      <p>Dear <strong>${name}</strong>,</p>
      <p>
        Thank you for contacting <strong>Regency Hotel Mumbai</strong>. We have received your inquiry (Ref: <code>${inquiryId}</code>) regarding <em>${inquiryType}</em>.
      </p>

      <div class="card">
        <strong>Inquiry Summary:</strong><br>
        • Category: ${inquiryType}<br>
        ${travelDates ? `• Expected Dates: ${travelDates}<br>` : ''}
        ${message ? `• Note: ${message}<br>` : ''}
        • Status: Under review by Reservations Desk
      </div>

      <p>
        Our reservations manager will review your request and get back to you within 2 hours with availability, corporate tariffs, or special quotes.
      </p>

      <p>
        For urgent assistance or immediate bookings, please call our 24/7 Front Desk at <strong>+91 22 2618 3000</strong> or WhatsApp us at <strong>+91 98200 45678</strong>.
      </p>
    </div>
    <div class="footer">
      Regency Hotel Mumbai · Santacruz East, Mumbai, Maharashtra 400055, India
    </div>
  </div>
</body>
</html>
  `;
}

// Vercel Serverless Function & Express compatible request handler
export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method Not Allowed. Please use POST.' });
    return;
  }

  const config = getSmtpConfig();

  if (!config.user || !config.pass) {
    console.error('[Mailer Error] Missing SMTP configuration in environment variables.');
    return res.status(500).json({
      success: false,
      error: 'SMTP configuration is incomplete on server (missing SMTP_USER or SMTP_PASS).',
    });
  }

  try {
    const data: InquiryEmailPayload = req.body;

    if (!data || !data.name || !data.email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required inquiry information (name, email).',
      });
    }

    const inquiryId = data.inquiryId || `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const transporter = createTransporter(config);

    // 1. Hotel Notification Email
    const hotelSubject = `New Guest Inquiry - Regency Hotel Mumbai - [${inquiryId}] - ${data.name}`;
    const hotelMailOptions = {
      from: `"Regency Hotel Inquiry Desk" <${config.from}>`,
      to: config.hotelEmail,
      replyTo: data.email,
      subject: hotelSubject,
      text: `
New Guest Inquiry Received - Regency Hotel Mumbai

Inquiry ID: ${inquiryId}
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'N/A'}
Category: ${data.inquiryType || 'General Inquiry'}
Dates: ${data.travelDates || 'Flexible'}
Guests/Rooms: ${data.guestsOrRooms || 'Not specified'}
Message: ${data.message || 'No additional comments.'}
Submission Time: ${data.inquiryDateTime || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      `.trim(),
      html: generateHotelInquiryHtml(data, inquiryId),
    };

    // 2. Customer Confirmation Email
    const customerSubject = `Inquiry Received - Regency Hotel Mumbai - [${inquiryId}]`;
    const customerMailOptions = {
      from: `"Regency Hotel Mumbai" <${config.from}>`,
      to: data.email,
      subject: customerSubject,
      text: `
Dear ${data.name},

Thank you for contacting Regency Hotel Mumbai. We have received your inquiry (Ref: ${inquiryId}).

Our front desk and reservations manager will review your request and get back to you shortly.

If you require urgent assistance, please contact us at +91 22 2618 3000 or WhatsApp +91 98200 45678.

Best regards,
Regency Hotel Mumbai
      `.trim(),
      html: generateCustomerInquiryHtml(data, inquiryId),
    };

    const [hotelResult, customerResult] = await Promise.allSettled([
      transporter.sendMail(hotelMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

    const hotelSuccess = hotelResult.status === 'fulfilled';
    const customerSuccess = customerResult.status === 'fulfilled';

    if (!hotelSuccess) {
      const hotelReason = hotelResult.status === 'rejected' ? hotelResult.reason : null;
      safeLogError(`[Mailer Error] Failed to deliver inquiry email to hotel address (${config.hotelEmail})`, hotelReason, config.pass);

      return res.status(502).json({
        success: false,
        error: 'Failed to deliver inquiry email to hotel address. Please check SMTP configuration.',
        inquiryId,
        details: {
          hotelNotified: false,
          customerNotified: customerSuccess,
        },
      });
    }

    console.log(`[Mailer Success] Inquiry email delivered to hotel (${config.hotelEmail}) for ${inquiryId}`);

    if (!customerSuccess) {
      const customerReason = customerResult.status === 'rejected' ? customerResult.reason : null;
      safeLogError(`[Mailer Warning] Failed to deliver inquiry confirmation to guest (${data.email})`, customerReason, config.pass);
    } else {
      console.log(`[Mailer Success] Inquiry confirmation delivered to guest (${data.email}) for ${inquiryId}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry email sent successfully.',
      inquiryId,
      hotelNotified: true,
      customerNotified: customerSuccess,
    });
  } catch (error: any) {
    safeLogError('[Inquiry Mailer Error] Unexpected exception in inquiry email handler', error, config.pass);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing inquiry emails.',
    });
  }
}
