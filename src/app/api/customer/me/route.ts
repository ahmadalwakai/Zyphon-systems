import { NextRequest, NextResponse } from 'next/server';
import { getCustomerById } from '@/lib/db';
import { verifyCustomerSession } from '@/lib/customer-auth';

export async function GET(request: NextRequest) {
  const session = verifyCustomerSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const customer = await getCustomerById(session.id);
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json({ customer });
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 });
  }
}
