import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { removeCustomerSession, CUSTOMER_COOKIE_NAME } from '@/lib/customer-auth';

export async function POST(request: NextRequest) {
  try {
    removeCustomerSession(request);
    const cookieStore = await cookies();
    cookieStore.delete(CUSTOMER_COOKIE_NAME);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
