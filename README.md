# Aashirwad Website

Production-ready `Next.js` website scaffold for Aashirwad, a trusted family textile store in Bihar Sharif.

## Stack

- `Next.js` App Router
- `Tailwind CSS`
- `Supabase` for content and inquiry storage
- `Cloudinary` for image uploads
- `Vercel` for deployment

## Features

- Responsive premium local-business website
- Local SEO pages for nearby areas
- Category landing pages
- Blog and offers sections
- Sitemap and robots setup
- LocalBusiness and FAQ schema
- Secure password-based owner login
- Owner photo upload flow ready for Cloudinary

## Setup

1. Copy `.env.example` to `.env.local`
2. Fill in admin password and session secret
3. Add Cloudinary cloud name and unsigned upload preset
4. Add Supabase keys
5. Run the SQL in `supabase/schema.sql`
6. Install dependencies with `npm install`
7. Run `npm run dev`

## Notes

- The public site works immediately with built-in seed content.
- Once Supabase is connected, offers, reviews, blog items, inquiries, and media metadata can be stored there.
- The site is designed around one store in Bihar Sharif while targeting surrounding areas through localized landing pages.
