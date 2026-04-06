import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { log } from '@/lib/logger';
import sharp from 'sharp';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  if (!await verifyAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Allowed: PNG, JPEG, WebP, GIF' }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum 5MB' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Resize and convert to webp
    const processed = await sharp(buffer)
      .resize(1200, undefined, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const hex = crypto.randomBytes(8).toString('hex');
    const filename = `${Date.now()}-${hex}.webp`;

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, filename), processed);

    log('info', 'Image uploaded', { filename, originalSize: file.size, processedSize: processed.length });

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    log('error', 'Upload error', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/upload' });
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
