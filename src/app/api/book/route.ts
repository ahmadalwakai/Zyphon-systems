import { NextRequest, NextResponse } from 'next/server';
import { createBooking } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!await checkRateLimit(ip, 'book', 5, 'minute')) {
      return NextResponse.json({ success: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { fullName, companyName, email, phone, projectType, preferredDate, preferredTime, description } = body;

    // Validate required fields
    if (!fullName || !email || !description) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and description are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Sanitize input
    const sanitizedData = {
      fullName: fullName.trim().slice(0, 255),
      companyName: companyName?.trim().slice(0, 255),
      email: email.trim().toLowerCase().slice(0, 255),
      phone: phone?.trim().slice(0, 50),
      projectType: projectType?.trim().slice(0, 100),
      preferredDate: preferredDate || undefined,
      preferredTime: preferredTime?.trim().slice(0, 10),
      description: description.trim().slice(0, 5000),
    };

    // Create booking in database
    const booking = await createBooking(sanitizedData);

    // Send email notifications (non-blocking)
    try {
      const { sendBookingNotification, sendBookingConfirmation } = await import('@/lib/email');
      await Promise.all([
        sendBookingNotification({
          full_name: sanitizedData.fullName,
          email: sanitizedData.email,
          preferred_date: sanitizedData.preferredDate || 'Not specified',
          preferred_time: sanitizedData.preferredTime || 'Not specified',
          description: sanitizedData.description,
        }),
        sendBookingConfirmation({
          full_name: sanitizedData.fullName,
          email: sanitizedData.email,
          preferred_date: sanitizedData.preferredDate || 'Not specified',
          preferred_time: sanitizedData.preferredTime || 'Not specified',
        }),
      ]);
    } catch (emailError) {
      console.error('Email notification error:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { success: true, data: { id: booking.id } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit booking request. Please try again later.' },
      { status: 500 }
    );
  }
}
