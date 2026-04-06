import { cookies } from 'next/headers';
import { timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE_NAME = 'zyphon_admin_session';

// In production, this should be stored in a database or Redis
// For now, we store active sessions in memory (will reset on server restart)
const activeSessions = new Set<string>();

export function generateSessionToken(): string {
  return crypto.randomUUID();
}

export function addSession(token: string): void {
  activeSessions.add(token);
}

export function removeSession(token: string): void {
  activeSessions.delete(token);
}

export function isValidSession(token: string): boolean {
  return activeSessions.has(token);
}

export async function verifyAdminSession(request: Request): Promise<boolean> {
  try {
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) return false;

    // Parse cookies manually from header
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    const sessionToken = cookies[ADMIN_COOKIE_NAME];
    if (!sessionToken) return false;

    return isValidSession(sessionToken);
  } catch {
    return false;
  }
}

export async function verifyAdminSessionFromCookies(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    if (!sessionCookie?.value) return false;
    
    return isValidSession(sessionCookie.value);
  } catch {
    return false;
  }
}

export function verifyPassword(inputPassword: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD not set');
    return false;
  }

  // Use timing-safe comparison to prevent timing attacks
  const inputBuffer = Buffer.from(inputPassword);
  const adminBuffer = Buffer.from(adminPassword);

  if (inputBuffer.length !== adminBuffer.length) {
    return false;
  }

  return timingSafeEqual(inputBuffer, adminBuffer);
}
