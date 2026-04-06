import { NextRequest, NextResponse } from 'next/server';
import { getCustomerByResetToken, resetCustomerPassword } from '@/lib/db';
import { hashPassword } from '@/lib/customer-auth';
import { checkRateLimit } from '@/lib/rate-limit';
import { validateOrigin } from '@/lib/csrf';
import { log } from '@/lib/logger';

export async function POST(request: NextRequest) {
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  if (!await checkRateLimit(ip, 'reset-password', 5, 'minute')) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const customer = await getCustomerByResetToken(token);
    if (!customer) {
      return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    await resetCustomerPassword(customer.id, passwordHash);

    log('info', 'Password reset successful', { customerId: customer.id, route: '/api/customer/reset-password' });

    return NextResponse.json({ message: 'Password reset successful' });
  } catch (error) {
    log('error', 'Reset password error', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/customer/reset-password' });
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
