import { sql } from './db';

export async function logActivity(
  actor: 'admin' | 'customer' | 'system',
  action: string,
  entityType: string,
  entityId?: string | number,
  details?: Record<string, unknown>
): Promise<void> {
  try {
    await sql`
      INSERT INTO activity_log (actor, action, entity_type, entity_id, details)
      VALUES (${actor}, ${action}, ${entityType}, ${String(entityId || '')}, ${JSON.stringify(details || {})})
    `;
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}
