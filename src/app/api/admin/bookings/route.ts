import { NextRequest, NextResponse } from 'next/server';
import { getBookings, updateBookingStatus, getBookingById } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';
import { sendBookingConfirmation } from '@/lib/email';

export async function GET(request: NextRequest) {
  if (!verifyAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const bookings = await getBookings();
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!verifyAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing id or status' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    await updateBookingStatus(id, status);

    // If confirming a booking, send confirmation email to customer
    if (status === 'confirmed') {
      const booking = await getBookingById(id);
      if (booking) {
        await sendBookingConfirmation({
          full_name: booking.name,
          email: booking.email,
          preferred_date: booking.preferred_date,
          preferred_time: booking.preferred_time
        });
      }
    }

    return NextResponse.json({ success: true, message: `Booking ${status}` });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}
