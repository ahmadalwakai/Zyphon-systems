import { NextRequest, NextResponse } from 'next/server';
import { getCustomerByEmail, setResetToken } from '@/lib/db';
import { sendPasswordResetEmail } from '@/lib/email';
import { checkRateLimit } from '@/lib/rate-limit';
import { sanitizeEmail, validateEmail } from '@/lib/sanitize';
import { validateOrigin } from '@/lib/csrf';
import { log } from '@/lib/logger';

export async function POST(request: NextRequest) {
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  if (!await checkRateLimit(ip, 'forgot-password', 3, 'minute')) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const { email } = await request.json();

    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const cleanEmail = sanitizeEmail(email);
    const customer = await getCustomerByEmail(cleanEmail);

    if (customer) {
      const token = crypto.randomUUID();
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      await setResetToken(cleanEmail, token, expires);

      try {
        await sendPasswordResetEmail(cleanEmail, token, customer.full_name);
      } catch {
        // Email failure shouldn't reveal account existence
      }
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({
      message: 'If an account with that email exists, a reset link has been sent.',
    });
  } catch (error) {
    log('error', 'Forgot password error', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/customer/forgot-password' });
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
