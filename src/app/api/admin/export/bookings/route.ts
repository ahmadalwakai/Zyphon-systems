import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getBookings } from '@/lib/db';
import { log } from '@/lib/logger';

export async function GET(request: NextRequest) {
  if (!await verifyAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const bookings = await getBookings();
    const date = new Date().toISOString().split('T')[0];

    const headers = ['ID', 'Full Name', 'Company', 'Email', 'Phone', 'Project Type', 'Preferred Date', 'Preferred Time', 'Description', 'Status', 'Created At'];
    const rows = bookings.map((b: Record<string, unknown>) => [
      b.id,
      `"${String(b.full_name || '').replace(/"/g, '""')}"`,
      `"${String(b.company_name || '').replace(/"/g, '""')}"`,
      b.email,
      b.phone || '',
      b.project_type || '',
      b.preferred_date || '',
      b.preferred_time || '',
      `"${String(b.description || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      b.status,
      b.created_at,
    ]);

    const csv = [headers.join(','), ...rows.map((r: unknown[]) => r.join(','))].join('\n');

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="bookings-export-${date}.csv"`,
      },
    });
  } catch (error) {
    log('error', 'Export bookings error', { error: error instanceof Error ? error.message : 'Unknown' });
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
