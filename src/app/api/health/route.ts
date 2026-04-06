import { NextResponse } from 'next/server';
import { initializeDatabase, sql } from '@/lib/db';
import { log } from '@/lib/logger';

export async function GET() {
  const start = Date.now();

  try {
    await initializeDatabase();
    await sql`SELECT 1`;

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      db: 'connected',
      responseTime: `${Date.now() - start}ms`,
    });
  } catch (error) {
    log('error', 'Health check failed', { error: String(error) });
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        db: 'disconnected',
        responseTime: `${Date.now() - start}ms`,
      },
      { status: 503 }
    );
  }
}
