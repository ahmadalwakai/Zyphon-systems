import { NextRequest, NextResponse } from 'next/server';
import { createInquiry } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, companyName, email, phone, projectType, budget, message } = body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and message are required' },
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

    // Sanitize input (basic)
    const sanitizedData = {
      fullName: fullName.trim().slice(0, 255),
      companyName: companyName?.trim().slice(0, 255),
      email: email.trim().toLowerCase().slice(0, 255),
      phone: phone?.trim().slice(0, 50),
      projectType: projectType?.trim().slice(0, 100),
      budget: budget?.trim().slice(0, 100),
      message: message.trim().slice(0, 5000),
    };

    // Create inquiry in database
    const inquiry = await createInquiry(sanitizedData);

    return NextResponse.json(
      { success: true, data: { id: inquiry.id } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit inquiry. Please try again later.' },
      { status: 500 }
    );
  }
}
