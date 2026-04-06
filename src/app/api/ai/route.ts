import { NextRequest, NextResponse } from 'next/server';
import { askGroq } from '@/lib/groq';
import { verifyAdminSession } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rate-limit';
import { validateOrigin } from '@/lib/csrf';
import { log } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!await checkRateLimit(ip, 'ai', 5, 'minute')) {
      return NextResponse.json({ success: false, error: 'Too many requests.' }, { status: 429 });
    }

    // Check authentication
    if (!await verifyAdminSession(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Limit prompt length
    const sanitizedPrompt = prompt.trim().slice(0, 5000);

    const response = await askGroq(sanitizedPrompt);

    return NextResponse.json({
      success: true,
      data: { response },
    });
  } catch (error) {
    log('error', 'AI API error', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/ai' });
    return NextResponse.json(
      { success: false, error: 'Failed to generate AI response' },
      { status: 500 }
    );
  }
}
