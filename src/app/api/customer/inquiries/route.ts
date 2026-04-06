import { NextRequest, NextResponse } from 'next/server';
import { getInquiriesByEmail } from '@/lib/db';
import { verifyCustomerSession } from '@/lib/customer-auth';

export async function GET(request: NextRequest) {
  const session = verifyCustomerSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const inquiries = await getInquiriesByEmail(session.email);
    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}
