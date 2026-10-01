import nodemailer from 'nodemailer';

export interface BookingEmailPayload {
  bookingId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomType: string;
  numberOfRooms?: number;
  numberOfGuests: number;
  checkInDate: string;
  checkOutDate: string;
  nights?: number;
  specialRequests?: string;
  totalAmount?: string;
  bookingDateTime?: string;
  addOns?: {
    breakfast?: boolean;
    airportPickup?: boolean;
    flightNumber?: string;
  };
}

// Create reusable Nodemailer transporter using environment variables
function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn('[Mailer Warning] SMTP_USER or SMTP_PASS environment variables are not set.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports (587 uses STARTTLS)
    auth: {
      user,
      pass,
    },
  });
}

// Generate HTML email for the Hotel Team
function generateHotelEmailHtml(data: BookingEmailPayload): string {
  const {
    bookingId,
    guestName,
    guestEmail,
    guestPhone,
    roomType,
    numberOfRooms = 1,
    numberOfGuests,
    checkInDate,
    checkOutDate,
    nights = 1,
    specialRequests = 'None',
    totalAmount = 'N/A',
    bookingDateTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    addOns,
  } = data;

  const addOnsList: string[] = [];
  if (addOns?.breakfast) addOnsList.push('Daily Buffet Breakfast Included');
  if (addOns?.airportPickup) {
    addOnsList.push(`Airport Chauffeur Transfer Requested ${addOns.flightNumber ? `(Flight: ${addOns.flightNumber})` : ''}`);
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Room Booking - ${bookingId}</title>
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
    .footer { padding: 16px 24px; background: #fafaf9; border-top: 1px solid #e7e5e4; font-size: 12px; color: #78716c; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Regency Hotel Mumbai</h1>
      <p>Santacruz East, Mumbai · Front Desk & Reservations</p>
      <div class="badge">New Room Booking Received</div>
    </div>
    <div class="content">
      <p style="font-size: 14px; margin-top: 0; line-height: 1.5;">
        A new guest booking has been confirmed via the website. Below are the complete reservation details:
      </p>

      <table class="table-details">
        <tr>
          <th>Booking ID</th>
          <td style="color: #b45309; font-size: 15px; font-family: monospace;">${bookingId}</td>
        </tr>
        <tr>
          <th>Guest Full Name</th>
          <td>${guestName}</td>
        </tr>
        <tr>
          <th>Guest Email</th>
          <td><a href="mailto:${guestEmail}" style="color: #2563eb; text-decoration: none;">${guestEmail}</a></td>
        </tr>
        <tr>
          <th>Guest Phone Number</th>
          <td><a href="tel:${guestPhone}" style="color: #1c1917; text-decoration: none;">${guestPhone}</a></td>
        </tr>
        <tr>
          <th>Selected Room Type</th>
          <td>${roomType}</td>
        </tr>
        <tr>
          <th>Number of Rooms</th>
          <td>${numberOfRooms} Room(s)</td>
        </tr>
        <tr>
          <th>Number of Guests</th>
          <td>${numberOfGuests} Guest(s)</td>
        </tr>
        <tr>
          <th>Check-in Date</th>
          <td>${checkInDate} (Check-in from 14:00)</td>
        </tr>
        <tr>
          <th>Check-out Date</th>
          <td>${checkOutDate} (Check-out by 11:00)</td>
        </tr>
        <tr>
          <th>Duration of Stay</th>
          <td>${nights} Night(s)</td>
        </tr>
        <tr>
          <th>Special Requests</th>
          <td style="font-weight: 400; color: #44403c;">${specialRequests || 'None'}</td>
        </tr>
        ${addOnsList.length > 0 ? `
        <tr>
          <th>Selected Add-ons</th>
          <td style="color: #047857;">${addOnsList.join('<br>')}</td>
        </tr>
        ` : ''}
        <tr>
          <th>Total Amount</th>
          <td style="font-size: 15px; color: #1c1917;">${totalAmount} <span style="font-size: 11px; font-weight: normal; color: #78716c;">(Pay at Hotel)</span></td>
        </tr>
        <tr>
          <th>Booking Date and Time</th>
          <td style="font-size: 12px; color: #78716c;">${bookingDateTime}</td>
        </tr>
      </table>
    </div>
    <div class="footer">
      Regency Hotel Mumbai · Santacruz East, Mumbai, Maharashtra 400055 · +91 22 2618 3000
    </div>
  </div>
</body>
</html>
  `;
}

// Generate HTML email for the Customer Confirmation
function generateCustomerEmailHtml(data: BookingEmailPayload): string {
  const {
    bookingId,
    guestName,
    roomType,
    numberOfGuests,
    checkInDate,
    checkOutDate,
    nights = 1,
    specialRequests = 'None',
    totalAmount = 'N/A',
    bookingDateTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  } = data;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Booking Confirmation - ${bookingId}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f9f8; color: #1c1917; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e7e5e4; border-radius: 8px; overflow: hidden; }
    .header { background: #1c1917; color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #d6d3d1; }
    .content { padding: 24px; }
    .greeting { font-size: 15px; line-height: 1.6; margin-bottom: 20px; }
    .booking-box { background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 6px; padding: 18px; margin: 20px 0; }
    .booking-id-row { display: flex; justify-content: space-between; border-bottom: 1px solid #e7e5e4; padding-bottom: 10px; margin-bottom: 12px; font-size: 13px; }
    .table-summary { width: 100%; border-collapse: collapse; font-size: 13px; }
    .table-summary td { padding: 8px 0; border-bottom: 1px solid #f5f5f4; }
    .table-summary td.label { color: #78716c; width: 40%; }
    .table-summary td.val { font-weight: 600; color: #1c1917; text-align: right; }
    .policy-box { background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 14px; margin-top: 20px; font-size: 12px; color: #92400e; }
    .footer { padding: 16px 24px; background: #fafaf9; border-top: 1px solid #e7e5e4; font-size: 12px; color: #78716c; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Regency Hotel Mumbai</h1>
      <p>Comfortable Stay. Conveniently Located · Santacruz East</p>
    </div>
    <div class="content">
      <div class="greeting">
        Dear <strong>${guestName}</strong>,<br><br>
        Thank you for choosing Regency Hotel Mumbai. We are pleased to confirm your room reservation. We look forward to welcoming you to our hotel!
      </div>

      <div class="booking-box">
        <div style="font-size: 11px; text-transform: uppercase; color: #78716c; letter-spacing: 0.5px; margin-bottom: 4px;">Reservation Details</div>
        <div style="font-size: 16px; font-weight: bold; color: #b45309; margin-bottom: 12px; font-family: monospace;">Booking ID: ${bookingId}</div>
        
        <table class="table-summary">
          <tr>
            <td class="label">Room Type</td>
            <td class="val">${roomType}</td>
          </tr>
          <tr>
            <td class="label">Check-in Date</td>
            <td class="val">${checkInDate} (From 14:00)</td>
          </tr>
          <tr>
            <td class="label">Check-out Date</td>
            <td class="val">${checkOutDate} (Until 11:00)</td>
          </tr>
          <tr>
            <td class="label">Duration / Guests</td>
            <td class="val">${nights} Night(s) · ${numberOfGuests} Guest(s)</td>
          </tr>
          <tr>
            <td class="label">Special Requests</td>
            <td class="val" style="font-weight: normal; color: #44403c;">${specialRequests || 'None'}</td>
          </tr>
          <tr>
            <td class="label">Total Amount</td>
            <td class="val" style="font-size: 15px; color: #1c1917;">${totalAmount}</td>
          </tr>
          <tr>
            <td class="label">Payment Status</td>
            <td class="val" style="color: #047857;">Pay at Hotel upon Check-in</td>
          </tr>
        </table>
      </div>

      <div class="policy-box">
        <strong>Important Information:</strong><br>
        • Please present a government-issued photo ID (Passport / Aadhaar / Driving License) upon check-in.<br>
        • Check-in time is 2:00 PM and check-out time is 11:00 AM.<br>
        • Free cancellation up to 24 hours prior to check-in.<br>
        • Need airport transfer assistance? Call us or message on WhatsApp at +91 98200 45678.
      </div>

      <p style="font-size: 13px; color: #57534e; margin-top: 20px;">
        If you have any questions or need to modify your reservation, please contact our 24/7 Front Desk at <strong>+91 22 2618 3000</strong> or reply directly to this email.
      </p>
    </div>

    <div class="footer">
      Regency Hotel Mumbai · Santacruz East, Mumbai 400055, Maharashtra, India<br>
      Minutes from Mumbai Airport (T1 & T2) & Bandra Kurla Complex (BKC)
    </div>
  </div>
</body>
</html>
  `;
}

// Vercel Serverless Function & Express compatible request handler
export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method Not Allowed. Please use POST.' });
    return;
  }

  try {
    const data: BookingEmailPayload = req.body;

    if (!data || !data.bookingId || !data.guestName || !data.guestEmail) {
      res.status(400).json({
        success: false,
        error: 'Missing required booking information (bookingId, guestName, guestEmail).',
      });
      return;
    }

    const hotelEmail = process.env.HOTEL_EMAIL || 'regencyhotel@gmail.com';
    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER || 'ajaysaa150@gmail.com';

    const transporter = createTransporter();

    // 1. Prepare Email to the Hotel
    const hotelSubject = `New Room Booking - Regency Hotel Mumbai - [${data.bookingId}]`;
    const hotelMailOptions = {
      from: `"Regency Hotel Booking System" <${fromAddress}>`,
      to: hotelEmail,
      replyTo: data.guestEmail,
      subject: hotelSubject,
      text: `
New Room Booking Received - Regency Hotel Mumbai

Booking ID: ${data.bookingId}
Guest Full Name: ${data.guestName}
Guest Email: ${data.guestEmail}
Guest Phone Number: ${data.guestPhone}
Selected Room Type: ${data.roomType}
Number of Rooms: ${data.numberOfRooms || 1}
Number of Guests: ${data.numberOfGuests}
Check-in Date: ${data.checkInDate}
Check-out Date: ${data.checkOutDate}
Special Requests: ${data.specialRequests || 'None'}
Total Amount: ${data.totalAmount || 'N/A'}
Booking Date and Time: ${data.bookingDateTime || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      `.trim(),
      html: generateHotelEmailHtml(data),
    };

    // 2. Prepare Confirmation Email to the Customer
    const customerSubject = `Booking Confirmation - Regency Hotel Mumbai - [${data.bookingId}]`;
    const customerMailOptions = {
      from: `"Regency Hotel Mumbai" <${fromAddress}>`,
      to: data.guestEmail,
      subject: customerSubject,
      text: `
Dear ${data.guestName},

Thank you for choosing Regency Hotel Mumbai. Your booking has been confirmed!

Booking ID: ${data.bookingId}
Room Type: ${data.roomType}
Check-in Date: ${data.checkInDate} (From 14:00)
Check-out Date: ${data.checkOutDate} (Until 11:00)
Number of Guests: ${data.numberOfGuests}
Special Requests: ${data.specialRequests || 'None'}
Total Amount: ${data.totalAmount || 'N/A'} (Pay at Hotel)

Hotel Address: Santacruz East, Mumbai, Maharashtra 400055, India
Phone: +91 22 2618 3000 / WhatsApp: +91 98200 45678

We look forward to welcoming you!
      `.trim(),
      html: generateCustomerEmailHtml(data),
    };

    // Send both emails in parallel
    const [hotelResult, customerResult] = await Promise.allSettled([
      transporter.sendMail(hotelMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

    let hotelSuccess = hotelResult.status === 'fulfilled';
    let customerSuccess = customerResult.status === 'fulfilled';

    if (!hotelSuccess) {
      console.error(
        '[Mailer Error] Failed to send email to hotel address:',
        hotelResult.status === 'rejected' ? hotelResult.reason?.message : 'Unknown error'
      );
    } else {
      console.log(`[Mailer Success] Booking email delivered to hotel (${hotelEmail}) for ${data.bookingId}`);
    }

    if (!customerSuccess) {
      console.error(
        '[Mailer Error] Failed to send confirmation email to guest:',
        customerResult.status === 'rejected' ? customerResult.reason?.message : 'Unknown error'
      );
    } else {
      console.log(`[Mailer Success] Confirmation email delivered to guest (${data.guestEmail}) for ${data.bookingId}`);
    }

    // Return clean response without exposing SMTP details
    res.status(200).json({
      success: true,
      message: 'Booking registered and notifications dispatched.',
      bookingId: data.bookingId,
      hotelNotified: hotelSuccess,
      customerNotified: customerSuccess,
    });
  } catch (error: any) {
    // Log error securely server-side without exposing credentials
    console.error('[Booking Mailer Error]', error?.message || error);
    res.status(500).json({
      success: false,
      error: 'Failed to process booking notification emails. Our front desk has recorded your booking details.',
    });
  }
}
