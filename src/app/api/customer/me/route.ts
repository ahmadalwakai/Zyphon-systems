import { NextRequest, NextResponse } from 'next/server';
import { getCustomerById, updateCustomerProfile, updateCustomerPassword, getCustomerFullById } from '@/lib/db';
import { verifyCustomerSession } from '@/lib/customer-auth';
import { hashPassword, verifyCustomerPassword } from '@/lib/customer-auth';
import { validateOrigin } from '@/lib/csrf';
import { sanitizeString } from '@/lib/sanitize';
import { log } from '@/lib/logger';

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
    log('error', 'Error fetching customer', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/customer/me' });
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }

  const session = verifyCustomerSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { fullName, companyName, currentPassword, newPassword } = body;

    // Password change
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: 'Current password is required' }, { status: 400 });
      }
      if (newPassword.length < 8) {
        return NextResponse.json({ error: 'New password must be at least 8 characters' }, { status: 400 });
      }

      const customer = await getCustomerFullById(session.id);
      if (!customer) {
        return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
      }

      const isValid = await verifyCustomerPassword(currentPassword, customer.password_hash);
      if (!isValid) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
      }

      const hash = await hashPassword(newPassword);
      await updateCustomerPassword(session.id, hash);
    }

    // Profile update
    if (fullName || companyName) {
      const updated = await updateCustomerProfile(session.id, {
        fullName: fullName ? sanitizeString(fullName) : undefined,
        companyName: companyName ? sanitizeString(companyName) : undefined,
      });
      return NextResponse.json({ customer: updated });
    }

    if (newPassword) {
      return NextResponse.json({ message: 'Password updated successfully' });
    }

    return NextResponse.json({ message: 'No changes' });
  } catch (error) {
    log('error', 'Error updating customer profile', { error: error instanceof Error ? error.message : 'Unknown' });
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
