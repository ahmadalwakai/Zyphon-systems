import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || 'Zyphon Systems <notifications@zyphon.systems>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'hello@zyphon.systems';

export async function sendInquiryNotification(inquiry: {
  full_name: string;
  email: string;
  project_type: string;
  message: string;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY not set, skipping email notification');
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Inquiry: ${inquiry.project_type || 'General'} from ${inquiry.full_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0d9488;">New Contact Form Submission</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${inquiry.full_name}</p>
            <p><strong>Email:</strong> ${inquiry.email}</p>
            <p><strong>Project Type:</strong> ${inquiry.project_type || 'Not specified'}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Message:</h3>
            <p style="white-space: pre-wrap; color: #4b5563;">${inquiry.message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">
            This email was sent from the Zyphon Systems contact form.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send inquiry notification:', error);
    throw error;
  }
}

export async function sendBookingNotification(booking: {
  full_name: string;
  email: string;
  preferred_date: string;
  preferred_time: string;
  description: string;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY not set, skipping email notification');
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Meeting Request from ${booking.full_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0d9488;">New Meeting Request</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${booking.full_name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Preferred Date:</strong> ${booking.preferred_date}</p>
            <p><strong>Preferred Time:</strong> ${booking.preferred_time} GMT</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Project Description:</h3>
            <p style="white-space: pre-wrap; color: #4b5563;">${booking.description}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">
            This email was sent from the Zyphon Systems booking form.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send booking notification:', error);
    throw error;
  }
}

export async function sendBookingConfirmation(booking: {
  full_name: string;
  email: string;
  preferred_date: string;
  preferred_time: string;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY not set, skipping email confirmation');
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: booking.email,
      subject: 'Meeting Request Received - Zyphon Systems',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0d9488;">Meeting Request Received</h2>
          <p>Hi ${booking.full_name},</p>
          <p>Thank you for your interest in working with Zyphon Systems. We've received your meeting request with the following details:</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Requested Date:</strong> ${booking.preferred_date}</p>
            <p><strong>Requested Time:</strong> ${booking.preferred_time} GMT</p>
          </div>
          <p>We'll review your request and confirm the meeting within 24 hours. If we need to suggest an alternative time, we'll be in touch.</p>
          <p>In the meantime, feel free to reply to this email if you have any questions.</p>
          <p style="margin-top: 30px;">Best regards,<br/>The Zyphon Systems Team</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">
            Zyphon Systems - Product Engineering for Modern Businesses
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send booking confirmation:', error);
    throw error;
  }
}
