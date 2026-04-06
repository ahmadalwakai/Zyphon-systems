# Zyphon Systems

**Product Engineering for Modern Businesses**

Production-ready website and platform for Zyphon Systems — a software studio that builds mobile apps, admin panels, backend systems, and full digital platforms.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 6
- **UI:** Chakra UI v3 + Framer Motion
- **Database:** Neon (Serverless PostgreSQL)
- **AI:** Groq (LLaMA 3.3 70B)
- **Email:** Resend
- **Deployment:** Vercel
- **CI/CD:** GitHub Actions

## Features

### Public Website
- Home, About, Services, Solutions, Process, Projects, Blog, FAQ
- Contact form with email notifications
- Book a Meeting scheduling
- Dark/light mode toggle
- Global search (⌘K)
- SEO optimised (sitemap, robots, JSON-LD, OG images)
- GDPR cookie consent
- Company profile PDF download
- Animated SVG logo + smart gradient backgrounds
- Fully responsive (mobile-first)

### Customer Portal
- Registration with email verification
- Login / logout with secure sessions
- Password reset flow
- View own inquiries and booking statuses
- Profile management

### Admin Dashboard
- Analytics overview with charts
- Inquiry management with AI-generated responses (Groq)
- Booking management with status workflow
- Blog CMS (create, edit, publish, delete posts)
- Project/case study management
- Email composer with AI assist
- Activity log
- CSV data export (inquiries, bookings, customers)
- Image upload for blog posts

### Security
- Content Security Policy + security headers (middleware)
- Input sanitisation on all endpoints
- CSRF protection on mutations
- Rate limiting on public endpoints
- Timing-safe password comparison
- HttpOnly secure session cookies
- Admin and customer auth with session management

## Getting Started

### Prerequisites

- Node.js 22+
- npm
- Neon database account
- Groq API key
- Resend API key

### Environment Variables

Create `.env.local`:

```env
DATABASE_URL=postgresql://...@...neon.tech/...?sslmode=require
GROQ_API_KEY=gsk_...
ADMIN_PASSWORD=your-secure-admin-password
RESEND_API_KEY=re_...
ADMIN_EMAIL=hello@zyphon.systems
FROM_EMAIL=Zyphon Systems <notifications@zyphon.systems>
NEXT_PUBLIC_SITE_URL=https://zyphon.systems
```

### Install & Run

```bash
npm install
npm run dev
```

### Database Setup

The database tables are automatically created on first API call via the `initDb()` function in `src/lib/db.ts`.

To manually initialise:

```bash
npm run db:init
```

### Generate Company Profile PDF

```bash
npm run generate-profile
```

### Build

```bash
npm run build
npm start
```

## Deployment

### Vercel

1. Connect the GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy — Vercel auto-detects Next.js

### CI/CD

GitHub Actions runs on push to `main`:
- Linting (`npm run lint`)
- Type checking (`npx tsc --noEmit`)
- Build (`npm run build`)

## Project Structure

```
src/
├── app/           # Next.js App Router pages & API routes
│   ├── admin/     # Admin dashboard pages
│   ├── api/       # REST API endpoints
│   ├── blog/      # Blog pages
│   ├── portal/    # Customer portal pages
│   └── ...        # Public pages
├── components/    # React components by feature
├── data/          # Static data (navigation, services, projects, searchable)
├── lib/           # Utilities (db, auth, email, rate-limit, logger, etc.)
├── theme/         # Chakra UI v3 theme (tokens, recipes)
└── types/         # TypeScript interfaces
```

## Admin Access

Navigate to `/admin` and enter the admin password set in `ADMIN_PASSWORD`.

## Customer Portal

Navigate to `/portal/register` to create an account.

## Licence

Private — All rights reserved.
