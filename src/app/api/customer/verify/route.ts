import { NextRequest, NextResponse } from 'next/server';
import { verifyCustomerByToken } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/portal/login?error=invalid-token', request.url));
    }

    const customer = await verifyCustomerByToken(token);

    if (!customer) {
      return NextResponse.redirect(new URL('/portal/login?error=invalid-token', request.url));
    }

    return NextResponse.redirect(new URL('/portal/login?verified=true', request.url));
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.redirect(new URL('/portal/login?error=verification-failed', request.url));
  }
}
