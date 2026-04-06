import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL!);

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
  const result = await sql`
    INSERT INTO inquiries (full_name, company_name, email, phone, project_type, budget, message)
    VALUES (${data.fullName}, ${data.companyName || null}, ${data.email}, ${data.phone || null}, ${data.projectType || null}, ${data.budget || null}, ${data.message})
    RETURNING *
  `;
  return result[0];
}

export async function getInquiries() {
  return await sql`
    SELECT * FROM inquiries ORDER BY created_at DESC
  `;
}

export async function updateInquiryStatus(id: number, status: string) {
  const result = await sql`
    UPDATE inquiries SET status = ${status} WHERE id = ${id} RETURNING *
  `;
  return result[0];
}

// Project operations
export async function getProjects(visibleOnly = false) {
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
  await sql`DELETE FROM projects WHERE id = ${id}`;
  return { success: true };
}

// Stats operations
export async function getStats() {
  const totalInquiries = await sql`SELECT COUNT(*) as count FROM inquiries`;
  const newInquiries = await sql`SELECT COUNT(*) as count FROM inquiries WHERE status = 'new'`;
  const publishedProjects = await sql`SELECT COUNT(*) as count FROM projects WHERE is_visible = true`;
  
  return {
    totalInquiries: Number(totalInquiries[0].count),
    newInquiries: Number(newInquiries[0].count),
    publishedProjects: Number(publishedProjects[0].count),
  };
}
