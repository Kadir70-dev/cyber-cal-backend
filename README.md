# Cybersecurity Calendar - Express Backend (Scaffold)

This scaffold provides a ready-to-run Express + Mongoose backend for the "Cybersecurity Calendar" frontend.

## Features
- Sessions CRUD (public read, admin CRUD)
- Admin JWT auth (login)
- Email notification utility (nodemailer)
- Example `create-admin.js` script to bootstrap an admin user

## Setup
1. Copy `.env.example` to `.env` and fill the values.
2. `npm install`
3. `npm run create-admin` (to create initial admin; ensure MONGO_URI and JWT_SECRET set)
4. `npm run dev`

## Notes
- Update `FRONTEND_ORIGIN` to your Next.js frontend.
- Email sending uses SMTP via nodemailer. Replace with SendGrid/EmailJS as needed.
