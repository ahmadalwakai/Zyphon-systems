import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getAllCustomers } from '@/lib/db';
import { log } from '@/lib/logger';

export async function GET(request: NextRequest) {
  if (!await verifyAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const customers = await getAllCustomers();
    const date = new Date().toISOString().split('T')[0];

    const headers = ['ID', 'Full Name', 'Company', 'Email', 'Verified', 'Created At'];
    const rows = customers.map((c: Record<string, unknown>) => [
      c.id,
      `"${String(c.full_name || '').replace(/"/g, '""')}"`,
      `"${String(c.company_name || '').replace(/"/g, '""')}"`,
      c.email,
      c.is_verified ? 'Yes' : 'No',
      c.created_at,
    ]);

    const csv = [headers.join(','), ...rows.map((r: unknown[]) => r.join(','))].join('\n');

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="customers-export-${date}.csv"`,
      },
    });
  } catch (error) {
    log('error', 'Export customers error', { error: error instanceof Error ? error.message : 'Unknown' });
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
