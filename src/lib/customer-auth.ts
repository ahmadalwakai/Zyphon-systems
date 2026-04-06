import { pbkdf2, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const pbkdf2Async = promisify(pbkdf2);

const CUSTOMER_ITERATIONS = 100000;
const CUSTOMER_KEY_LENGTH = 64;
const CUSTOMER_DIGEST = 'sha512';

export const CUSTOMER_COOKIE_NAME = 'zyphon_customer_session';

// In-memory session store (production would use Redis/DB)
const customerSessions = new Map<string, { id: number; email: string }>();

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(32).toString('hex');
  const hash = await pbkdf2Async(password, salt, CUSTOMER_ITERATIONS, CUSTOMER_KEY_LENGTH, CUSTOMER_DIGEST);
  return `${salt}:${hash.toString('hex')}`;
}

export async function verifyCustomerPassword(password: string, stored: string): Promise<boolean> {
  const [salt, storedHash] = stored.split(':');
  if (!salt || !storedHash) return false;
  const hash = await pbkdf2Async(password, salt, CUSTOMER_ITERATIONS, CUSTOMER_KEY_LENGTH, CUSTOMER_DIGEST);
  const hashBuffer = Buffer.from(hash.toString('hex'));
  const storedBuffer = Buffer.from(storedHash);
  if (hashBuffer.length !== storedBuffer.length) return false;
  return timingSafeEqual(hashBuffer, storedBuffer);
}

export function createCustomerSession(customerId: number, email: string): string {
  const token = crypto.randomUUID();
  customerSessions.set(token, { id: customerId, email });
  return token;
}

export function verifyCustomerSession(request: Request): { id: number; email: string } | null {
  try {
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) return null;

    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    const sessionToken = cookies[CUSTOMER_COOKIE_NAME];
    if (!sessionToken) return null;

    return customerSessions.get(sessionToken) || null;
  } catch {
    return null;
  }
}

export function removeCustomerSession(request: Request): void {
  try {
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) return;

    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    const sessionToken = cookies[CUSTOMER_COOKIE_NAME];
    if (sessionToken) {
      customerSessions.delete(sessionToken);
    }
  } catch {
    // silently fail
  }
}
