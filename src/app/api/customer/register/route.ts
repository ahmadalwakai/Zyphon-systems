import { NextRequest, NextResponse } from 'next/server';
import { createCustomer, getCustomerByEmail } from '@/lib/db';
import { hashPassword } from '@/lib/customer-auth';
import { sendVerificationEmail } from '@/lib/email';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const allowed = await checkRateLimit(ip, 'customer-register', 3, 'minute');
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { fullName, email, companyName, password } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: 'Full name, email, and password are required' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const existing = await getCustomerByEmail(email.toLowerCase());
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const verificationToken = crypto.randomUUID();

    const customer = await createCustomer({
      email: email.toLowerCase().trim(),
      fullName: fullName.trim().slice(0, 255),
      companyName: companyName?.trim().slice(0, 255),
      passwordHash,
      verificationToken,
    });

    try {
      await sendVerificationEmail(email, verificationToken, fullName);
    } catch {
      // Email send failure shouldn't block registration
    }

    return NextResponse.json({ success: true, customer }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
