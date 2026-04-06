import { NextRequest, NextResponse } from 'next/server';
import { createBooking } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';
import { sanitizeString, sanitizeEmail, validateEmail } from '@/lib/sanitize';
import { validateOrigin } from '@/lib/csrf';
import { log } from '@/lib/logger';
import { logActivity } from '@/lib/activity';

export async function POST(request: NextRequest) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

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

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Sanitize input
    const sanitizedData = {
      fullName: sanitizeString(fullName).slice(0, 255),
      companyName: companyName ? sanitizeString(companyName).slice(0, 255) : undefined,
      email: sanitizeEmail(email).slice(0, 255),
      phone: phone ? sanitizeString(phone).slice(0, 50) : undefined,
      projectType: projectType ? sanitizeString(projectType).slice(0, 100) : undefined,
      preferredDate: preferredDate || undefined,
      preferredTime: preferredTime ? sanitizeString(preferredTime).slice(0, 10) : undefined,
      description: sanitizeString(description).slice(0, 5000),
    };

    // Create booking in database
    const booking = await createBooking(sanitizedData);

    // Send email notifications (non-blocking)
    let notificationSent = false;
    let confirmationSent = false;
    try {
      const { sendBookingNotification, sendBookingConfirmation } = await import('@/lib/email');
      const [notifResult, confResult] = await Promise.all([
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
      notificationSent = notifResult;
      confirmationSent = confResult;
    } catch (emailError) {
      log('error', 'Email notification error', { error: emailError instanceof Error ? emailError.message : 'Unknown', route: '/api/book' });
    }

    log('info', 'New booking received', { id: booking.id, email: sanitizedData.email, notificationSent, confirmationSent, route: '/api/book' });
    await logActivity('system', 'booking_received', 'booking', booking.id, { from: sanitizedData.email });

    return NextResponse.json(
      { success: true, data: { id: booking.id }, notificationSent, confirmationSent },
      { status: 201 }
    );
  } catch (error) {
    log('error', 'Booking form error', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/book' });
    return NextResponse.json(
      { success: false, error: 'Failed to submit booking request. Please try again later.' },
      { status: 500 }
    );
  }
}
