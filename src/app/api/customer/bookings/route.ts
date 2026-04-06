import { NextRequest, NextResponse } from 'next/server';
import { getBookingsByEmail } from '@/lib/db';
import { verifyCustomerSession } from '@/lib/customer-auth';

export async function GET(request: NextRequest) {
  const session = verifyCustomerSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const bookings = await getBookingsByEmail(session.email);
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
