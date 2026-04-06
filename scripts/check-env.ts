const REQUIRED_VARS = [
  'DATABASE_URL',
  'GROQ_API_KEY',
  'ADMIN_PASSWORD',
  'RESEND_API_KEY',
  'ADMIN_EMAIL',
  'NEXT_PUBLIC_SITE_URL',
];

const OPTIONAL_VARS = [
  'FROM_EMAIL',
];

function checkEnv() {
  console.log('Checking environment variables...\n');
  let hasErrors = false;

  for (const v of REQUIRED_VARS) {
    if (process.env[v]) {
      const masked = process.env[v]!.substring(0, 6) + '...';
      console.log(`  ✓ ${v} = ${masked}`);
    } else {
      console.error(`  ✗ ${v} — MISSING (required)`);
      hasErrors = true;
    }
  }

  console.log('');
  for (const v of OPTIONAL_VARS) {
    if (process.env[v]) {
      console.log(`  ✓ ${v} (optional, set)`);
    } else {
      console.log(`  ○ ${v} (optional, using default)`);
    }
  }

  if (hasErrors) {
    console.error('\n✗ Missing required environment variables. Check .env.local');
    process.exit(1);
  } else {
    console.log('\n✅ All required environment variables are set.');
  }
}

checkEnv();
