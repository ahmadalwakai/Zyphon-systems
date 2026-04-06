import { NextRequest, NextResponse } from 'next/server';
import { createInquiry } from '@/lib/db';
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
    if (!await checkRateLimit(ip, 'contact', 5, 'minute')) {
      return NextResponse.json({ success: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { fullName, companyName, email, phone, projectType, budget, message } = body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and message are required' },
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
      budget: budget ? sanitizeString(budget).slice(0, 100) : undefined,
      message: sanitizeString(message).slice(0, 5000),
    };

    // Create inquiry in database
    const inquiry = await createInquiry(sanitizedData);

    // Send email notification (non-blocking)
    let emailSent = false;
    try {
      const { sendInquiryNotification } = await import('@/lib/email');
      emailSent = await sendInquiryNotification({
        full_name: sanitizedData.fullName,
        email: sanitizedData.email,
        project_type: sanitizedData.projectType || '',
        message: sanitizedData.message,
      });
    } catch (emailError) {
      log('error', 'Email notification error', { error: emailError instanceof Error ? emailError.message : 'Unknown', route: '/api/contact' });
    }

    log('info', 'New inquiry received', { id: inquiry.id, email: sanitizedData.email, emailSent, route: '/api/contact' });
    await logActivity('system', 'inquiry_received', 'inquiry', inquiry.id, { from: sanitizedData.email });

    return NextResponse.json(
      { success: true, data: { id: inquiry.id }, emailSent },
      { status: 201 }
    );
  } catch (error) {
    log('error', 'Contact form error', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/contact' });
    return NextResponse.json(
      { success: false, error: 'Failed to submit inquiry. Please try again later.' },
      { status: 500 }
    );
  }
}
