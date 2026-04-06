import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getInquiries } from '@/lib/db';
import { log } from '@/lib/logger';

export async function GET(request: NextRequest) {
  if (!await verifyAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const inquiries = await getInquiries();
    const date = new Date().toISOString().split('T')[0];

    const headers = ['ID', 'Full Name', 'Company', 'Email', 'Phone', 'Project Type', 'Budget', 'Message', 'Status', 'Created At'];
    const rows = inquiries.map((i: Record<string, unknown>) => [
      i.id,
      `"${String(i.full_name || '').replace(/"/g, '""')}"`,
      `"${String(i.company_name || '').replace(/"/g, '""')}"`,
      i.email,
      i.phone || '',
      i.project_type || '',
      i.budget || '',
      `"${String(i.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      i.status,
      i.created_at,
    ]);

    const csv = [headers.join(','), ...rows.map((r: unknown[]) => r.join(','))].join('\n');

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="inquiries-export-${date}.csv"`,
      },
    });
  } catch (error) {
    log('error', 'Export inquiries error', { error: error instanceof Error ? error.message : 'Unknown' });
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
