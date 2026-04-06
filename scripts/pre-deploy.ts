import * as fs from 'fs';
import * as path from 'path';

const checks: { name: string; check: () => boolean }[] = [
  {
    name: '.env.local exists',
    check: () => fs.existsSync(path.join(process.cwd(), '.env.local')),
  },
  {
    name: 'public/zyphon-profile.pdf exists',
    check: () => fs.existsSync(path.join(process.cwd(), 'public', 'zyphon-profile.pdf')),
  },
  {
    name: 'public/favicon.svg exists',
    check: () => fs.existsSync(path.join(process.cwd(), 'public', 'favicon.svg')),
  },
  {
    name: 'vercel.json exists',
    check: () => fs.existsSync(path.join(process.cwd(), 'vercel.json')),
  },
  {
    name: '.github/workflows/ci.yml exists',
    check: () => fs.existsSync(path.join(process.cwd(), '.github', 'workflows', 'ci.yml')),
  },
  {
    name: 'No useColorModeValue in src/',
    check: () => {
      const result = findInFiles('src', 'useColorModeValue');
      return result.length === 0;
    },
  },
  {
    name: 'No tailwindcss in package.json',
    check: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
      return !allDeps['tailwindcss'];
    },
  },
  {
    name: 'No @chakra-ui/icons imports',
    check: () => {
      const result = findInFiles('src', '@chakra-ui/icons');
      return result.length === 0;
    },
  },
];

function findInFiles(dir: string, searchStr: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.next') {
      results.push(...findInFiles(fullPath, searchStr));
    } else if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes(searchStr)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

console.log('Running pre-deployment checks...\n');
let allPassed = true;

for (const { name, check } of checks) {
  try {
    const passed = check();
    console.log(`  ${passed ? '✓' : '✗'} ${name}`);
    if (!passed) allPassed = false;
  } catch {
    console.log(`  ✗ ${name} (error)`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('\n✅ All pre-deployment checks passed.');
} else {
  console.error('\n✗ Some checks failed. Fix before deploying.');
  process.exit(1);
}
