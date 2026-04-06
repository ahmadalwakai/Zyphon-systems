import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as crypto from 'crypto';
import {
  verifyPassword,
  generateSessionToken,
  addSession,
  removeSession,
  ADMIN_COOKIE_NAME,
  verifyAdminSessionFromCookies,
} from '@/lib/auth';
import { sql } from '@/lib/db';

// Verify password hash (PBKDF2)
function verifyPasswordHash(inputPassword: string, storedHash: string): boolean {
  try {
    const [salt, hash] = storedHash.split(':');
    if (!salt || !hash) return false;
    const inputHash = crypto.pbkdf2Sync(inputPassword, salt, 100000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(inputHash));
  } catch {
    return false;
  }
}

// Check admin in database
async function verifyAdminFromDb(email: string, password: string): Promise<boolean> {
  try {
    const result = await sql`
      SELECT password_hash FROM admin_users WHERE email = ${email}
    `;
    if (!result || result.length === 0) return false;
    return verifyPasswordHash(password, result[0].password_hash);
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const isValid = await verifyAdminSessionFromCookies();
    
    if (isValid) {
      return NextResponse.json({ success: true, authenticated: true });
    }
    
    return NextResponse.json(
      { success: false, authenticated: false },
      { status: 401 }
    );
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { success: false, error: 'Auth check failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      );
    }

    let authenticated = false;

    // Try database auth first if email provided
    if (email) {
      authenticated = await verifyAdminFromDb(email, password);
    }

    // Fall back to env var password (backward compatibility)
    if (!authenticated) {
      authenticated = verifyPassword(password);
    }

    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate session token
    const sessionToken = generateSessionToken();
    addSession(sessionToken);

    // Set httpOnly cookie with session token
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    
    if (sessionCookie?.value) {
      removeSession(sessionCookie.value);
    }
    
    cookieStore.delete(ADMIN_COOKIE_NAME);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}
