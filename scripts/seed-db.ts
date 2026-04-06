import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL not set');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  console.log('Seeding database...');

  try {
    // Seed projects
    const projects = [
      {
        title: 'Hospitality Booking Platform',
        slug: 'hospitality-booking-platform',
        type: 'Mobile App + Admin Panel + Backend',
        description: 'A digital platform designed to support hotel operations through customer booking flows, room management, availability logic, and administrative control.',
        challenge: 'The client operated across multiple properties with disconnected booking systems, manual availability tracking, and no centralised reporting. Staff relied on spreadsheets and phone calls to manage reservations.',
        approach: 'We built a unified platform with a customer-facing booking app, a multi-property admin panel with real-time availability, and a backend system that synchronised data across all branches. The architecture was designed for scalability from day one.',
        technologies: ['Next.js', 'React Native', 'Node.js', 'PostgreSQL', 'TypeScript', 'Redis'],
        results: ['60% reduction in booking errors', 'Real-time availability across all properties', 'Centralised reporting dashboard', 'Customer self-service booking reduced phone inquiries by 45%'],
        outcome: 'The system was planned to support customer-facing booking experiences while enabling internal staff to manage rooms, bookings, statuses, content, and operational workflows through a dedicated admin platform.',
        display_order: 1,
      },
      {
        title: 'Operational Admin Dashboard',
        slug: 'operational-admin-dashboard',
        type: 'Admin Panel + Backend',
        description: 'An internal platform built to manage workflows, users, content, operational data, and reporting through a structured admin experience.',
        challenge: 'The business managed all internal operations through a combination of email threads, shared documents, and basic spreadsheets. There was no single source of truth for operational data.',
        approach: 'We designed a role-based admin dashboard with workflow automation, task management, and real-time reporting. The system replaced fragmented tools with a single, structured platform.',
        technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Chakra UI', 'Node.js'],
        results: ['Eliminated 5+ disconnected tools', 'Role-based access for 3 team tiers', 'Automated weekly reporting', 'Reduced manual data entry by 70%'],
        outcome: 'A central admin platform giving internal teams control over users, workflows, content, data management, and reporting.',
        display_order: 2,
      },
      {
        title: 'Customer Booking Application',
        slug: 'customer-booking-application',
        type: 'Mobile App + Backend',
        description: 'A mobile-first booking product focused on customer experience, account management, service access, and operational workflow integration.',
        challenge: 'Customers had to phone in or email to make bookings. There was no digital self-service option, leading to long wait times and frequent double-bookings.',
        approach: 'We built a cross-platform mobile app with intuitive booking flows, real-time availability checking, push notifications, and account management. The backend integrated with the existing admin system.',
        technologies: ['React Native', 'Node.js', 'PostgreSQL', 'TypeScript', 'Firebase'],
        results: ['85% of bookings now made through the app', 'Customer satisfaction increased by 40%', 'Zero double-bookings since launch', 'Push notification engagement rate of 35%'],
        outcome: 'A production-ready mobile application that transformed the customer booking experience.',
        display_order: 3,
      },
      {
        title: 'Multi-Branch Business Platform',
        slug: 'multi-branch-business-platform',
        type: 'Full Platform',
        description: 'A scalable platform designed to support centralised control and branch-level management across operations, users, data, and customer services.',
        challenge: 'Each branch operated independently with its own tools, pricing, and processes. Head office had no real-time visibility into branch performance or customer data.',
        approach: 'We built a full platform with centralised admin controls, branch-level dashboards, unified customer database, and cross-branch reporting. Each branch could manage their own operations while head office maintained oversight.',
        technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Redis', 'Docker'],
        results: ['Unified 12 branches under one platform', 'Real-time performance dashboards for management', 'Consistent pricing and service standards', 'Reduced operational overhead by 50%'],
        outcome: 'A scalable multi-tenant platform supporting both centralised governance and branch autonomy.',
        display_order: 4,
      },
    ];

    for (const p of projects) {
      await sql`
        INSERT INTO projects (title, slug, type, description, challenge, approach, technologies, results, outcome, display_order, is_visible)
        VALUES (${p.title}, ${p.slug}, ${p.type}, ${p.description}, ${p.challenge}, ${p.approach}, ${p.technologies}, ${p.results}, ${p.outcome}, ${p.display_order}, true)
        ON CONFLICT (slug) DO NOTHING
      `;
    }
    console.log('✓ 4 projects seeded');

    // Seed blog posts
    const posts = [
      {
        slug: 'why-businesses-need-more-than-websites',
        title: 'Why Modern Businesses Need More Than a Website',
        excerpt: 'Most businesses today need operational systems, not just online presence. Here is why a website alone is not enough and what to build instead.',
        content: `<h2>The Problem with Website-Only Thinking</h2>
<p>Many businesses approach digital transformation by building a website. While a web presence is important, it rarely solves the operational challenges that actually slow a business down.</p>
<p>Booking management, customer communication, internal workflows, reporting, and team coordination — these are the areas where real efficiency gains happen. A marketing website does not address any of them.</p>

<h2>What Businesses Actually Need</h2>
<p>The businesses we work with typically need a combination of:</p>
<p><strong>Customer-facing applications</strong> — booking systems, service portals, account management tools that let customers self-serve rather than calling or emailing.</p>
<p><strong>Admin and internal systems</strong> — dashboards that give teams visibility into operations, bookings, customer data, and business performance.</p>
<p><strong>Backend infrastructure</strong> — APIs, databases, and business logic that connect everything together reliably.</p>

<h2>The Right Approach</h2>
<p>Instead of starting with design and aesthetics, we start with understanding the business workflow. What happens when a customer makes a booking? How does the team process it? Where are the bottlenecks?</p>
<p>Once we understand the workflow, we can design a system that actually supports it — not just a pretty interface that sits on top of manual processes.</p>

<h2>Start with Clarity</h2>
<p>If you are considering a digital product for your business, start by mapping your current workflow. Identify where time is wasted, where errors occur, and where customers experience friction. That is where the real value of software lies.</p>`,
        tags: ['strategy', 'digital-transformation', 'business'],
        author: 'Zyphon Systems',
      },
      {
        slug: 'structured-development-process',
        title: 'Why a Structured Development Process Matters',
        excerpt: 'Jumping straight into code is tempting but costly. A structured process from discovery to launch saves time, reduces risk, and produces better products.',
        content: `<h2>The Cost of Skipping Planning</h2>
<p>We have seen it repeatedly: projects that start with excitement and momentum, jump straight into development, and then stall halfway through because the scope was never properly defined.</p>
<p>Requirements change weekly. Features get built that nobody uses. The budget runs out before the core functionality is complete. This is not a development problem — it is a planning problem.</p>

<h2>Our Eight-Step Process</h2>
<p>Every project we take on follows a structured workflow:</p>
<p><strong>1. Discovery</strong> — We learn the business, the users, the current process, and the problems to solve.</p>
<p><strong>2. Scope Definition</strong> — We turn ideas into a structured scope with clear modules, features, and priorities.</p>
<p><strong>3. Architecture</strong> — We plan the technical foundation: database, APIs, roles, integrations.</p>
<p><strong>4. UX/UI Direction</strong> — We design the interface with a focus on usability and business goals.</p>
<p><strong>5. Development</strong> — We build in controlled modules with regular milestones.</p>
<p><strong>6. Testing</strong> — We verify everything works correctly before launch.</p>
<p><strong>7. Deployment</strong> — We prepare and execute the launch.</p>
<p><strong>8. Support</strong> — We continue with improvements and maintenance.</p>

<h2>Why This Works</h2>
<p>Each step reduces risk for the next. By the time we write code, we know exactly what we are building and why. Changes are cheaper to make in a planning document than in production code.</p>`,
        tags: ['process', 'project-management', 'engineering'],
        author: 'Zyphon Systems',
      },
      {
        slug: 'choosing-the-right-tech-stack',
        title: 'How We Choose the Right Tech Stack for Each Project',
        excerpt: 'Technology choices should be driven by project requirements, not trends. Here is how we evaluate and select the right tools for each build.',
        content: `<h2>Technology Serves the Product</h2>
<p>We do not pick technologies because they are trendy or because we are familiar with them. Every project has different requirements, and the tech stack should be chosen based on what the project actually needs.</p>

<h2>Our Default Stack</h2>
<p>That said, we have a battle-tested default stack that works well for most projects:</p>
<p><strong>Next.js</strong> — for web applications and admin panels. Server-side rendering, API routes, and excellent developer experience.</p>
<p><strong>React Native</strong> — for mobile apps that need to work on both iOS and Android from a single codebase.</p>
<p><strong>Node.js + TypeScript</strong> — for backend services. Type safety reduces bugs and improves maintainability.</p>
<p><strong>PostgreSQL</strong> — for databases. Reliable, scalable, and well-suited for complex business data.</p>

<h2>When We Deviate</h2>
<p>Sometimes a project requires something different. Real-time features might need WebSockets or Redis. Heavy computation might benefit from a different runtime. Legacy integrations might require specific protocols.</p>
<p>The key is making these decisions deliberately, based on requirements, not assumptions.</p>

<h2>Long-Term Thinking</h2>
<p>We always consider maintainability. A technology choice made today will be lived with for years. We favour mature, well-documented tools with strong communities over cutting-edge experiments.</p>`,
        tags: ['technology', 'engineering', 'architecture'],
        author: 'Zyphon Systems',
      },
    ];

    for (const p of posts) {
      await sql`
        INSERT INTO posts (slug, title, excerpt, content, tags, author, is_published, published_at, created_at)
        VALUES (${p.slug}, ${p.title}, ${p.excerpt}, ${p.content}, ${p.tags}, ${p.author}, true, NOW(), NOW())
        ON CONFLICT (slug) DO NOTHING
      `;
    }
    console.log('✓ 3 blog posts seeded');

    console.log('\n✅ Database seeded successfully.');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
