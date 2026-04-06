import { Resend } from 'resend';

// Guard: during CI builds RESEND_API_KEY may not exist.
// Lazy init to avoid crash at module import time.
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

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
    await getResend().emails.send({
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
    await getResend().emails.send({
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
    await getResend().emails.send({
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

export async function sendVerificationEmail(email: string, token: string, fullName: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY not set, skipping verification email');
    return;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zyphon.systems';
  const verifyUrl = `${siteUrl}/api/customer/verify?token=${encodeURIComponent(token)}`;

  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Verify your Zyphon Systems account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0d9488;">Verify Your Account</h2>
          <p>Hi ${fullName},</p>
          <p>Thank you for creating an account with Zyphon Systems. Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verifyUrl}" style="background: #0d9488; color: white; padding: 12px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Verify Email</a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">Or copy and paste this link into your browser:</p>
          <p style="color: #6b7280; font-size: 14px; word-break: break-all;">${verifyUrl}</p>
          <p style="color: #6b7280; font-size: 14px;">If you didn't create this account, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">Zyphon Systems - Product Engineering for Modern Businesses</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw error;
  }
}

export async function sendCustomEmail(to: string, subject: string, body: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY not set, skipping email');
    return;
  }

  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          ${body.replace(/\n/g, '<br />')}
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0 20px;" />
          <p style="color: #9ca3af; font-size: 12px;">Zyphon Systems - Product Engineering for Modern Businesses</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send custom email:', error);
    throw error;
  }
}

export async function sendPasswordResetEmail(email: string, token: string, fullName: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY not set, skipping password reset email');
    return;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zyphon.systems';
  const resetUrl = `${siteUrl}/portal/reset-password?token=${encodeURIComponent(token)}`;

  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Reset your Zyphon Systems password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0d9488;">Reset Your Password</h2>
          <p>Hi ${fullName},</p>
          <p>We received a request to reset your password. Click the button below to choose a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background: #0d9488; color: white; padding: 12px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Reset Password</a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">Or copy and paste this link into your browser:</p>
          <p style="color: #6b7280; font-size: 14px; word-break: break-all;">${resetUrl}</p>
          <p style="color: #6b7280; font-size: 14px;">This link expires in 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">Zyphon Systems - Product Engineering for Modern Businesses</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw error;
  }
}
