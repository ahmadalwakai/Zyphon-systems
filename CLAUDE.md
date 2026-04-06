# Zyphon Systems — Project Context

## Overview
Zyphon Systems is a software studio website and platform. Built with Next.js 16, TypeScript, Chakra UI v3, Neon DB.

## Key Architecture Decisions
- Chakra UI v3 ONLY — no v2 patterns, no `useColorModeValue`, no `extendTheme`
- `motion.create(Box)` for framer-motion + Chakra integration
- Lazy SDK initialisation for Resend and Groq (CI build safety)
- Cookie-based auth for both admin and customer sessions
- Rate limiting via `limiter` on public endpoints
- Input sanitisation via `src/lib/sanitize.ts`
- CSRF via origin validation on all mutations

## Database
- Neon serverless PostgreSQL
- Tables: inquiries, bookings, projects, posts, admin_users, customers, activity_log
- Schema managed via `scripts/init-db.ts`

## API Auth
- Admin: password-based, httpOnly cookie `zyphon_admin_session`
- Customer: email/password with verification, cookie `zyphon_customer_session`
- All admin API routes verify session via `src/lib/auth.ts`
- All customer API routes verify session via `src/lib/customer-auth.ts`

## File Structure
- `src/app/` — Pages + API routes (App Router)
- `src/components/` — Components organised by feature
- `src/lib/` — Utilities (db, auth, email, rate-limit, sanitize, logger, csrf, activity)
- `src/theme/` — Chakra v3 theme system
- `src/data/` — Static data files
- `src/types/` — TypeScript interfaces
- `scripts/` — DB init, seed, env check, PDF generation

## Commands
- `npm run dev` — Development server
- `npm run build` — Production build
- `npm run db:init` — Create database tables
- `npm run db:seed` — Seed with sample data
- `npm run db:setup` — Init + seed
- `npm run check-env` — Validate environment variables
- `npm run generate-profile` — Generate company PDF

## Critical Rules
- Never use Tailwind
- Never use Chakra v2 patterns
- Never use `useColorModeValue` — use `_dark` prop
- Never import from `@chakra-ui/icons` — use lucide-react
- All API mutations must check CSRF origin
- All public submission endpoints must be rate-limited
- Email sending must be non-blocking (try/catch, don't fail the response)
