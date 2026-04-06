import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { log } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    // Verify admin access
    if (!await verifyAdminSession(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { to } = body;

    if (!to || typeof to !== 'string') {
      return NextResponse.json({ success: false, error: 'Email address required' }, { status: 400 });
    }

    // Check configuration
    const diagnostics = {
      hasResendKey: !!process.env.RESEND_API_KEY,
      fromEmail: process.env.FROM_EMAIL || 'Zyphon Systems <hello@zyphonsystems.com>',
      adminEmail: process.env.ADMIN_EMAIL || 'hello@zyphonsystems.com',
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://zyphonsystems.com',
    };

    if (!diagnostics.hasResendKey) {
      return NextResponse.json({
        success: false,
        error: 'RESEND_API_KEY not configured',
        diagnostics,
      }, { status: 500 });
    }

    // Attempt to send test email
    const { sendCustomEmail } = await import('@/lib/email');
    const sent = await sendCustomEmail(
      to,
      'Zyphon Systems - Email Test',
      `<h2 style="color: #0d9488;">Email Test Successful</h2>
      <p>This is a test email from the Zyphon Systems admin panel.</p>
      <p>If you received this email, your email configuration is working correctly.</p>
      <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
        Sent at: ${new Date().toISOString()}<br/>
        From: ${diagnostics.fromEmail}
      </p>`
    );

    log('info', 'Email test performed', { to, sent, route: '/api/admin/email-test' });

    return NextResponse.json({
      success: true,
      sent,
      diagnostics,
      message: sent ? 'Test email sent successfully' : 'Email send returned false - check Resend dashboard',
    });
  } catch (error) {
    log('error', 'Email test failed', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/admin/email-test' });
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin access
    if (!await verifyAdminSession(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Return email configuration diagnostics (no actual send)
    const diagnostics = {
      hasResendKey: !!process.env.RESEND_API_KEY,
      resendKeyPrefix: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.slice(0, 10) + '...' : null,
      fromEmail: process.env.FROM_EMAIL || 'Zyphon Systems <hello@zyphonsystems.com>',
      adminEmail: process.env.ADMIN_EMAIL || 'hello@zyphonsystems.com',
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://zyphonsystems.com',
      nodeEnv: process.env.NODE_ENV,
    };

    return NextResponse.json({ success: true, diagnostics });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
