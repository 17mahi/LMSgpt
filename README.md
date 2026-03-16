# LumiLearn – YouTube-powered LMS

Premium LMS built with Next.js 14 (App Router), TailwindCSS, shadcn-style UI, Supabase (Auth + Postgres), Recharts, Framer Motion, and YouTube embeds.

## Tech stack

- Next.js 14 (App Router)
- TailwindCSS + glassmorphism UI
- Supabase Auth + PostgreSQL
- Recharts for progress analytics
- YouTube iframe embeds for lessons
- Deployed on Vercel

## Setup with Supabase

1. Create a new Supabase project.
2. In SQL editor, run the schema from the project instructions (users, courses, sections, lessons, enrollments, progress, RLS policies).
3. Enable email/password auth in Supabase.
4. Copy your project URL and anon key.

Set the env vars (in Vercel or locally):

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Running (optional local dev)

```bash
npm install
npm run dev
```

## Deploy

1. Push this folder to a GitHub repo.
2. In Vercel, import the repo and set the Supabase env vars.
3. Deploy – Vercel will give you a global URL.

