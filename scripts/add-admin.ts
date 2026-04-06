import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';

dotenv.config({ path: '.env.local' });

// Hash password using PBKDF2 (same as used in customer-auth)
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

async function addAdmin() {
  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL not set');
    process.exit(1);
  }

  // Get email and password from command line args
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error('Usage: npx tsx scripts/add-admin.ts <email> <password>');
    process.exit(1);
  }

  const passwordHash = hashPassword(password);

  const sql = neon(process.env.DATABASE_URL);
  console.log('Adding admin user...');

  try {
    await sql`
      INSERT INTO admin_users (email, password_hash)
      VALUES (${email}, ${passwordHash})
      ON CONFLICT (email) DO UPDATE SET password_hash = ${passwordHash}
    `;
    console.log(`✅ Admin user added: ${email}`);
  } catch (error) {
    console.error('Failed to add admin:', error);
    process.exit(1);
  }
}

addAdmin();
