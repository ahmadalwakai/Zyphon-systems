import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getActivityLog } from '@/lib/db';
import { log } from '@/lib/logger';

export async function GET(request: NextRequest) {
  if (!await verifyAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const actor = searchParams.get('actor') || undefined;

    const logs = await getActivityLog(page, actor);
    return NextResponse.json(logs);
  } catch (error) {
    log('error', 'Failed to fetch activity log', { error: String(error) });
    return NextResponse.json({ error: 'Failed to fetch activity log' }, { status: 500 });
  }
}
