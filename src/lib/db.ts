import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL!);

let dbInitialized = false;

async function ensureDbInitialized() {
  if (dbInitialized) return;
  await initializeDatabase();
  dbInitialized = true;
}

export async function initializeDatabase() {
  try {
    // Create inquiries table
    await sql`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        company_name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        project_type VARCHAR(100),
        budget VARCHAR(100),
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create projects table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        outcome TEXT,
        is_visible BOOLEAN DEFAULT true,
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create admin_users table
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create bookings table
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        company_name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        project_type VARCHAR(100),
        preferred_date DATE,
        preferred_time VARCHAR(10),
        description TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create posts table
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        cover_image_url TEXT,
        author VARCHAR(255) DEFAULT 'Zyphon Systems',
        tags TEXT[] DEFAULT '{}',
        is_published BOOLEAN DEFAULT false,
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create customers table
    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        company_name VARCHAR(255),
        password_hash VARCHAR(255) NOT NULL,
        is_verified BOOLEAN DEFAULT false,
        verification_token VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Add new columns to projects table if they don't exist
    await sql`
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE
    `;
    await sql`
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenge TEXT
    `;
    await sql`
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS approach TEXT
    `;
    await sql`
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS technologies TEXT[]
    `;
    await sql`
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS results TEXT[]
    `;
    await sql`
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS testimonial_quote TEXT
    `;
    await sql`
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS testimonial_author TEXT
    `;

    // Add reset token columns to customers
    await sql`ALTER TABLE customers ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255)`;
    await sql`ALTER TABLE customers ADD COLUMN IF NOT EXISTS reset_token_expires TIMESTAMP`;

    // Create activity_log table
    await sql`
      CREATE TABLE IF NOT EXISTS activity_log (
        id SERIAL PRIMARY KEY,
        actor VARCHAR(50) NOT NULL,
        action VARCHAR(100) NOT NULL,
        entity_type VARCHAR(50) NOT NULL,
        entity_id VARCHAR(50),
        details JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    console.log('Database tables initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error };
  }
}

// Inquiry operations
export async function createInquiry(data: {
  fullName: string;
  companyName?: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message: string;
}) {
  await ensureDbInitialized();
  const result = await sql`
    INSERT INTO inquiries (full_name, company_name, email, phone, project_type, budget, message)
    VALUES (${data.fullName}, ${data.companyName || null}, ${data.email}, ${data.phone || null}, ${data.projectType || null}, ${data.budget || null}, ${data.message})
    RETURNING *
  `;
  return result[0];
}

export async function getInquiries() {
  await ensureDbInitialized();
  return await sql`
    SELECT * FROM inquiries ORDER BY created_at DESC
  `;
}

export async function updateInquiryStatus(id: number, status: string) {
  await ensureDbInitialized();
  const result = await sql`
    UPDATE inquiries SET status = ${status} WHERE id = ${id} RETURNING *
  `;
  return result[0];
}

// Project operations
export async function getProjects(visibleOnly = false) {
  await ensureDbInitialized();
  if (visibleOnly) {
    return await sql`
      SELECT * FROM projects WHERE is_visible = true ORDER BY display_order ASC
    `;
  }
  return await sql`
    SELECT * FROM projects ORDER BY display_order ASC
  `;
}

export async function createProject(data: {
  title: string;
  type: string;
  description: string;
  outcome?: string;
  isVisible?: boolean;
  displayOrder?: number;
}) {
  await ensureDbInitialized();
  const result = await sql`
    INSERT INTO projects (title, type, description, outcome, is_visible, display_order)
    VALUES (${data.title}, ${data.type}, ${data.description}, ${data.outcome || null}, ${data.isVisible ?? true}, ${data.displayOrder ?? 0})
    RETURNING *
  `;
  return result[0];
}

export async function updateProject(id: number, data: {
  title?: string;
  type?: string;
  description?: string;
  outcome?: string;
  isVisible?: boolean;
  displayOrder?: number;
}) {
  await ensureDbInitialized();
  const result = await sql`
    UPDATE projects SET
      title = COALESCE(${data.title}, title),
      type = COALESCE(${data.type}, type),
      description = COALESCE(${data.description}, description),
      outcome = COALESCE(${data.outcome}, outcome),
      is_visible = COALESCE(${data.isVisible}, is_visible),
      display_order = COALESCE(${data.displayOrder}, display_order)
    WHERE id = ${id}
    RETURNING *
  `;
  return result[0];
}

export async function deleteProject(id: number) {
  await ensureDbInitialized();
  await sql`DELETE FROM projects WHERE id = ${id}`;
  return { success: true };
}

// Stats operations
export async function getStats() {
  await ensureDbInitialized();
  const totalInquiries = await sql`SELECT COUNT(*) as count FROM inquiries`;
  const newInquiries = await sql`SELECT COUNT(*) as count FROM inquiries WHERE status = 'new'`;
  const publishedProjects = await sql`SELECT COUNT(*) as count FROM projects WHERE is_visible = true`;
  const pendingBookings = await sql`SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'`;
  
  return {
    totalInquiries: Number(totalInquiries[0].count),
    newInquiries: Number(newInquiries[0].count),
    publishedProjects: Number(publishedProjects[0].count),
    pendingBookings: Number(pendingBookings[0].count),
  };
}

// Booking operations
export async function createBooking(data: {
  fullName: string;
  companyName?: string;
  email: string;
  phone?: string;
  projectType?: string;
  preferredDate?: string;
  preferredTime?: string;
  description: string;
}) {
  await ensureDbInitialized();
  const result = await sql`
    INSERT INTO bookings (full_name, company_name, email, phone, project_type, preferred_date, preferred_time, description)
    VALUES (${data.fullName}, ${data.companyName || null}, ${data.email}, ${data.phone || null}, ${data.projectType || null}, ${data.preferredDate || null}, ${data.preferredTime || null}, ${data.description})
    RETURNING *
  `;
  return result[0];
}

export async function getBookings() {
  await ensureDbInitialized();
  return await sql`
    SELECT * FROM bookings ORDER BY preferred_date ASC, created_at DESC
  `;
}

export async function updateBookingStatus(id: number, status: string) {
  await ensureDbInitialized();
  const result = await sql`
    UPDATE bookings SET status = ${status} WHERE id = ${id} RETURNING *
  `;
  return result[0];
}

export async function getBookingById(id: number) {
  await ensureDbInitialized();
  const result = await sql`SELECT * FROM bookings WHERE id = ${id}`;
  return result[0];
}

// Post operations
export async function createPost(data: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  author?: string;
  tags?: string[];
  isPublished?: boolean;
}) {
  await ensureDbInitialized();
  const publishedAt = data.isPublished ? new Date().toISOString() : null;
  const result = await sql`
    INSERT INTO posts (slug, title, excerpt, content, cover_image_url, author, tags, is_published, published_at)
    VALUES (${data.slug}, ${data.title}, ${data.excerpt}, ${data.content}, ${data.coverImageUrl || null}, ${data.author || 'Zyphon Systems'}, ${data.tags || []}, ${data.isPublished ?? false}, ${publishedAt})
    RETURNING *
  `;
  return result[0];
}

export async function getPosts(publishedOnly = false) {
  await ensureDbInitialized();
  if (publishedOnly) {
    return await sql`
      SELECT * FROM posts WHERE is_published = true ORDER BY published_at DESC
    `;
  }
  return await sql`
    SELECT * FROM posts ORDER BY created_at DESC
  `;
}

export async function getPostBySlug(slug: string, publishedOnly = false) {
  await ensureDbInitialized();
  if (publishedOnly) {
    const result = await sql`
      SELECT * FROM posts WHERE slug = ${slug} AND is_published = true
    `;
    return result[0];
  }
  const result = await sql`
    SELECT * FROM posts WHERE slug = ${slug}
  `;
  return result[0];
}

export async function getPostById(id: number) {
  await ensureDbInitialized();
  const result = await sql`SELECT * FROM posts WHERE id = ${id}`;
  return result[0];
}

export async function updatePost(id: number, data: {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  coverImageUrl?: string;
  author?: string;
  tags?: string[];
  isPublished?: boolean;
}) {
  await ensureDbInitialized();
  // If publishing for first time, set published_at
  const existing = await getPostById(id);
  let publishedAt = existing?.published_at;
  if (data.isPublished && !existing?.is_published) {
    publishedAt = new Date().toISOString();
  }
  const result = await sql`
    UPDATE posts SET
      slug = COALESCE(${data.slug ?? null}, slug),
      title = COALESCE(${data.title ?? null}, title),
      excerpt = COALESCE(${data.excerpt ?? null}, excerpt),
      content = COALESCE(${data.content ?? null}, content),
      cover_image_url = COALESCE(${data.coverImageUrl ?? null}, cover_image_url),
      author = COALESCE(${data.author ?? null}, author),
      tags = COALESCE(${data.tags ?? null}, tags),
      is_published = COALESCE(${data.isPublished ?? null}, is_published),
      published_at = COALESCE(${publishedAt ?? null}, published_at),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return result[0];
}

export async function deletePost(id: number) {
  await ensureDbInitialized();
  await sql`DELETE FROM posts WHERE id = ${id}`;
  return { success: true };
}

export async function searchPosts(query: string) {
  await ensureDbInitialized();
  const searchPattern = `%${query}%`;
  return await sql`
    SELECT * FROM posts 
    WHERE is_published = true 
      AND (title ILIKE ${searchPattern} OR excerpt ILIKE ${searchPattern} OR ${query} = ANY(tags))
    ORDER BY published_at DESC
  `;
}

export async function getPostsByTag(tag: string) {
  await ensureDbInitialized();
  return await sql`
    SELECT * FROM posts WHERE is_published = true AND ${tag} = ANY(tags) ORDER BY published_at DESC
  `;
}

export async function getRelatedPosts(currentSlug: string, tags: string[], limit = 3) {
  await ensureDbInitialized();
  return await sql`
    SELECT * FROM posts 
    WHERE is_published = true AND slug != ${currentSlug} AND tags && ${tags}
    ORDER BY published_at DESC
    LIMIT ${limit}
  `;
}

// Customer operations
export async function createCustomer(data: {
  email: string;
  fullName: string;
  companyName?: string;
  passwordHash: string;
  verificationToken: string;
}) {
  await ensureDbInitialized();
  const result = await sql`
    INSERT INTO customers (email, full_name, company_name, password_hash, verification_token)
    VALUES (${data.email}, ${data.fullName}, ${data.companyName || null}, ${data.passwordHash}, ${data.verificationToken})
    RETURNING id, email, full_name, company_name, is_verified, created_at
  `;
  return result[0];
}

export async function getCustomerByEmail(email: string) {
  await ensureDbInitialized();
  const result = await sql`SELECT * FROM customers WHERE email = ${email}`;
  return result[0];
}

export async function getCustomerById(id: number) {
  await ensureDbInitialized();
  const result = await sql`SELECT id, email, full_name, company_name, is_verified, created_at FROM customers WHERE id = ${id}`;
  return result[0];
}

export async function verifyCustomerByToken(token: string) {
  await ensureDbInitialized();
  const result = await sql`
    UPDATE customers SET is_verified = true, verification_token = null
    WHERE verification_token = ${token}
    RETURNING id, email, full_name
  `;
  return result[0];
}

export async function getInquiriesByEmail(email: string) {
  await ensureDbInitialized();
  return await sql`
    SELECT * FROM inquiries WHERE email = ${email} ORDER BY created_at DESC
  `;
}

export async function getBookingsByEmail(email: string) {
  await ensureDbInitialized();
  return await sql`
    SELECT * FROM bookings WHERE email = ${email} ORDER BY created_at DESC
  `;
}

// Extended project operations
export async function getProjectBySlug(slug: string) {
  await ensureDbInitialized();
  const result = await sql`
    SELECT * FROM projects WHERE slug = ${slug} AND is_visible = true
  `;
  return result[0];
}

export async function getPublishedPostSlugs() {
  await ensureDbInitialized();
  return await sql`SELECT slug FROM posts WHERE is_published = true`;
}

// Analytics operations
export async function getAnalytics() {
  await ensureDbInitialized();
  const totalInquiries = await sql`SELECT COUNT(*) as count FROM inquiries`;
  const pendingBookings = await sql`SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'`;
  const publishedPosts = await sql`SELECT COUNT(*) as count FROM posts WHERE is_published = true`;
  const draftPosts = await sql`SELECT COUNT(*) as count FROM posts WHERE is_published = false`;
  const respondedInquiries = await sql`SELECT COUNT(*) as count FROM inquiries WHERE status = 'responded'`;
  
  const total = Number(totalInquiries[0].count);
  const responded = Number(respondedInquiries[0].count);
  const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;

  const inquiriesByMonth = await sql`
    SELECT TO_CHAR(created_at, 'Mon') as month, COUNT(*) as count
    FROM inquiries
    WHERE created_at >= NOW() - INTERVAL '6 months'
    GROUP BY TO_CHAR(created_at, 'Mon'), DATE_TRUNC('month', created_at)
    ORDER BY DATE_TRUNC('month', created_at) ASC
  `;

  const recentInquiries = await sql`
    SELECT 'inquiry' as type, full_name as name, created_at FROM inquiries ORDER BY created_at DESC LIMIT 5
  `;
  const recentBookings = await sql`
    SELECT 'booking' as type, full_name as name, created_at FROM bookings ORDER BY created_at DESC LIMIT 5
  `;
  const recentActivity = [...recentInquiries, ...recentBookings]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10);

  return {
    totalInquiries: total,
    pendingBookings: Number(pendingBookings[0].count),
    publishedPosts: Number(publishedPosts[0].count),
    draftPosts: Number(draftPosts[0].count),
    responseRate,
    inquiriesByMonth,
    recentActivity,
  };
}

// Password reset operations
export async function setResetToken(email: string, token: string, expires: Date) {
  await ensureDbInitialized();
  const result = await sql`
    UPDATE customers SET reset_token = ${token}, reset_token_expires = ${expires.toISOString()}
    WHERE email = ${email}
    RETURNING id
  `;
  return result[0];
}

export async function getCustomerByResetToken(token: string) {
  await ensureDbInitialized();
  const result = await sql`
    SELECT * FROM customers WHERE reset_token = ${token} AND reset_token_expires > NOW()
  `;
  return result[0];
}

export async function resetCustomerPassword(customerId: number, passwordHash: string) {
  await ensureDbInitialized();
  await sql`
    UPDATE customers SET password_hash = ${passwordHash}, reset_token = NULL, reset_token_expires = NULL
    WHERE id = ${customerId}
  `;
}

export async function updateCustomerProfile(id: number, data: { fullName?: string; companyName?: string }) {
  await ensureDbInitialized();
  const result = await sql`
    UPDATE customers SET
      full_name = COALESCE(${data.fullName ?? null}, full_name),
      company_name = COALESCE(${data.companyName ?? null}, company_name)
    WHERE id = ${id}
    RETURNING id, email, full_name, company_name, is_verified, created_at
  `;
  return result[0];
}

export async function updateCustomerPassword(id: number, passwordHash: string) {
  await ensureDbInitialized();
  await sql`UPDATE customers SET password_hash = ${passwordHash} WHERE id = ${id}`;
}

export async function getCustomerFullById(id: number) {
  await ensureDbInitialized();
  const result = await sql`SELECT * FROM customers WHERE id = ${id}`;
  return result[0];
}

// Customer export (no password_hash)
export async function getAllCustomers() {
  await ensureDbInitialized();
  return await sql`SELECT id, email, full_name, company_name, is_verified, created_at FROM customers ORDER BY created_at DESC`;
}

// Activity log queries
export async function getActivityLog(page: number = 1, actor?: string) {
  await ensureDbInitialized();
  const limit = 50;
  const offset = (page - 1) * limit;

  let items;
  let countResult;

  if (actor && actor !== 'all') {
    items = await sql`
      SELECT * FROM activity_log WHERE actor = ${actor} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}
    `;
    countResult = await sql`SELECT COUNT(*) as count FROM activity_log WHERE actor = ${actor}`;
  } else {
    items = await sql`
      SELECT * FROM activity_log ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}
    `;
    countResult = await sql`SELECT COUNT(*) as count FROM activity_log`;
  }

  return { items, total: Number(countResult[0].count) };
}
