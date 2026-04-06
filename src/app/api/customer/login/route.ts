import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getCustomerByEmail } from '@/lib/db';
import { verifyCustomerPassword, createCustomerSession, CUSTOMER_COOKIE_NAME } from '@/lib/customer-auth';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const allowed = await checkRateLimit(ip, 'customer-login', 10, 'minute');
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const customer = await getCustomerByEmail(email.toLowerCase());
    if (!customer) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isValid = await verifyCustomerPassword(password, customer.password_hash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (!customer.is_verified) {
      return NextResponse.json({ error: 'Please verify your email first.' }, { status: 403 });
    }

    const sessionToken = createCustomerSession(customer.id, customer.email);

    const cookieStore = await cookies();
    cookieStore.set(CUSTOMER_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({
      success: true,
      customer: {
        id: customer.id,
        email: customer.email,
        fullName: customer.full_name,
        companyName: customer.company_name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
