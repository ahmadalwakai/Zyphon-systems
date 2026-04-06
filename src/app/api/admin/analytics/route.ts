import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getAnalytics } from '@/lib/db';
import { log } from '@/lib/logger';

export async function GET(request: NextRequest) {
  if (!await verifyAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const analytics = await getAnalytics();
    return NextResponse.json({ success: true, data: analytics });
  } catch (error) {
    log('error', 'Analytics error', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/admin/analytics' });
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
