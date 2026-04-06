import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { sendCustomEmail } from '@/lib/email';
import { checkRateLimit } from '@/lib/rate-limit';
import { validateOrigin } from '@/lib/csrf';
import { log } from '@/lib/logger';
import { logActivity } from '@/lib/activity';

export async function POST(request: NextRequest) {
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!await verifyAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  if (!await checkRateLimit(ip, 'send-email', 20, 'hour')) {
    return NextResponse.json({ error: 'Rate limit exceeded (20/hour)' }, { status: 429 });
  }

  try {
    const { to, subject, body } = await request.json();

    if (!to || !subject || !body) {
      return NextResponse.json({ error: 'To, subject, and body are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    await sendCustomEmail(to, subject.slice(0, 200), body.slice(0, 10000));
    log('info', 'Email sent', { to, subject: subject.slice(0, 50), route: '/api/admin/send-email' });
    await logActivity('admin', 'email_sent', 'email', undefined, { to, subject });

    return NextResponse.json({ success: true });
  } catch (error) {
    log('error', 'Send email error', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/admin/send-email' });
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
