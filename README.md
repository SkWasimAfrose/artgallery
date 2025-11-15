<div align="center">

# Lumina Atelier — Premium Wedding & Event Photography

Next.js • TypeScript • TailwindCSS • MongoDB • Cloudinary • Nodemailer • Framer Motion

</div>

## ✨ Overview

Lumina Atelier is a high-end photography experience designed for destination weddings and luxury events. The site showcases cinematic imagery, details signature services, and provides concierge booking via email/WhatsApp. An admin dashboard enables staff to manage enquiries and generate secure Cloudinary upload signatures.

## 📁 Project Structure

```
src/
  app/
    (pages, API routes, admin dashboard)
  components/
    cards/, cta/, layout/, ui/
  config/         // site copy, metadata, schema.org
  data/           // mock data + Mongo fallbacks
  lib/            // Cloudinary, email, validation, db helpers
  models/         // Mongoose schemas
  types/          // shared TypeScript interfaces
tests/            // Vitest suites
```

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy `.env.example` → `.env.local` and supply real credentials for:

   - MongoDB Atlas (`MONGODB_URI`)
   - Cloudinary (`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`)
   - Gmail OAuth2 (`GMAIL_*` secrets)
   - Admin secret token (`ADMIN_SECRET`)

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). Pages auto-refresh on save.

## 🔑 Admin Dashboard

- Navigate to `/admin`
- Enter the shared `ADMIN_SECRET`
- Features:
  - View enquiries (Mongo with mock fallback)
  - Update booking statuses
  - Copy Cloudinary upload signatures for secure client-side uploads
  - Quick links back to the marketing site

**API headers:** requests must include `x-admin-secret: <token>` or `Authorization: Bearer <token>`.

## 🧰 Available Scripts

```bash
npm run dev     # start development server
npm run build   # build for production
npm run start   # run production build
npm run lint    # lint project
npm run test    # run Vitest unit tests
```

### Vitest setup

- Configured via `vitest.config.ts`
- Tests reside in `tests/**/*.test.ts`
- TypeScript picks up Vitest globals (see `tsconfig.json`)

## 🧪 Tests

Initial unit tests cover form validation logic:

```bash
npm test
```

> **Note:** Prior to running tests ensure `npm install` has been executed to install `vitest` and associated type definitions.

## 🖼️ Assets & Performance

- Hero/gallery imagery sourced from Cloudinary demo assets; replace with branded uploads.
- Tailwind theme customized with Lumina palette, premium typography (Playfair Display + Inter), reusable spacing/typography utilities, and custom skeleton loaders.
- Framer Motion animations add subtle polish on navigation and galleries.

## 📬 Booking & Contact Flows

- `/booking`: concierge-focused multi-step form with client-side validation (Zod) and server submission to `/api/bookings` (MongoDB + fallback mock + Gmail notification + WhatsApp link).
- `/contact`: general enquiry form, reusing validation and email delivery.

## 🗄️ Data Layer

- MongoDB Atlas via Mongoose connection helper (`src/lib/mongodb.ts`).
- Models: `Gallery`, `Booking`, `Settings`.
- Mock data utilities provide graceful fallbacks while services are being configured locally.

## ☁️ Cloudinary Integration

- `src/lib/cloudinary.ts` handles optimized image URLs, upload signatures, and Next.js image loader.
- Admin endpoint `/api/cloudinary-sign` generates signed upload payloads (admin secret required).

## ✉️ Gmail Integration

- `src/lib/email.ts` sends concierge notifications using Nodemailer + Gmail SMTP.
- Generate a Gmail App Password and set `GMAIL_USER`, `GMAIL_APP_PASSWORD`, and optional `GMAIL_SMTP_HOST`/`GMAIL_SMTP_PORT` environment variables.

## 🔐 Admin Secret

- Store `ADMIN_SECRET` in environment variables.
- Admin page persists secret in `sessionStorage` so refreshes retain access.

## 📦 Deployment

1. Provision environment variables via Vercel dashboard (or preferred hosting provider).
2. Configure MongoDB Atlas IP allowlists & Cloudinary CORS settings for production domain.
3. Deploy with `npm run build && npm run start` or push to Vercel for CI/CD.

## ✅ Roadmap / Next Steps

- Add end-to-end tests (Playwright/Cypress) for booking + contact flows.
- Integrate real Cloudinary upload widget within admin dashboard.
- Implement analytics & SEO enhancements (structured data already scaffolded).

## 🤝 License

Internal project — adapt licensing as required.
