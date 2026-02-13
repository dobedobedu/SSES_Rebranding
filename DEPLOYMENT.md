# SSES Strategic Growth Matrix - Deployment Guide

## Overview
This guide covers deploying the SSES Strategic Growth Matrix with Supabase backend and Vercel frontend.

## Prerequisites
- Node.js 18+
- Vercel CLI (`npm i -g vercel`)
- Supabase account (supabase.com)
- Google Cloud Console account (for OAuth)
- Domain: saintstephens.digital

## Phase 1: Supabase Setup

### 1. Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Name: `sses-growth-matrix`
4. Region: Choose closest to users (US East recommended)
5. Save the project URL and anon key

### 2. Configure Database Schema
1. Go to SQL Editor in Supabase Dashboard
2. Create New Query
3. Copy contents from `/supabase/schema.sql`
4. Run the SQL

### 3. Configure Google OAuth
1. Go to https://console.cloud.google.com
2. Create new project or select existing
3. APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
4. Configure OAuth consent screen:
   - App name: "SSES Strategic Growth Matrix"
   - User support email: your email
   - Developer contact: your email
5. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://saintstephens.digital/auth/callback` (production)
6. Copy Client ID and Client Secret

### 4. Add OAuth Provider in Supabase
1. Supabase Dashboard → Authentication → Providers
2. Enable Google
3. Paste Client ID and Client Secret
4. Save

### 5. Set Up Admin User
1. Deploy app first (see Phase 3)
2. Sign in with your email
3. In Supabase SQL Editor, run:
```sql
INSERT INTO admin_users (user_id, email) 
SELECT id, email 
FROM auth.users 
WHERE email = 'your-email@example.com';
```

## Phase 2: Environment Configuration

### 1. Create Environment Files

**`.env.local` (for local development):**
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SITE_URL=http://localhost:3000
```

**`.env.production` (for production):**
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SITE_URL=https://saintstephens.digital
```

### 2. Install Dependencies
```bash
npm install
```

## Phase 3: Deploy to Vercel

### 1. Login to Vercel
```bash
vercel login
```

### 2. Deploy Project
```bash
vercel
```
Follow prompts to link existing project or create new.

### 3. Add Domain
```bash
vercel domains add saintstephens.digital
```

### 4. Configure DNS
1. Go to your domain registrar (where you bought saintstephens.digital)
2. Add DNS records:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME Record**: `www` → `cname.vercel-dns.com`

### 5. Add Environment Variables in Vercel Dashboard
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SITE_URL=https://saintstephens.digital`
3. Redeploy if needed

## Phase 4: Testing

### 1. Local Testing
```bash
npm run dev
```
- Test Google OAuth login
- Test name-based login
- Test voting functionality
- Check admin results view

### 2. Production Testing
1. Visit `https://saintstephens.digital`
2. Test all functionality
3. Verify Supabase connection
4. Test voting persistence

## Phase 5: Troubleshooting

### Common Issues

**1. OAuth Redirect Errors**
- Verify redirect URLs match exactly in Google Cloud Console
- Check `VITE_SITE_URL` environment variable
- Ensure HTTPS in production

**2. CORS Errors**
- Add your domain to Supabase CORS origins:
  - Supabase Dashboard → API Settings → CORS
  - Add `https://saintstephens.digital`

**3. Database Connection Errors**
- Verify environment variables are set
- Check RLS policies are configured
- Ensure tables exist (run schema.sql)

**4. Build Errors**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Features Implemented

### Executive Summary
- ✅ 3 KPI cards with real-time hiring data
- ✅ Expandable cards showing detailed calculations
- ✅ Total Relocating Families: 1,080-1,670/year
- ✅ Healthcare Hiring: 1,250+ openings
- ✅ Major Expansions: $597M investment

### Voting System
- ✅ Google OAuth authentication
- ✅ Name-based authentication fallback
- ✅ One vote per user (upsert)
- ✅ Real-time vote results (admin only)
- ✅ Vote change capability
- ✅ Live updates every 30 seconds

### Security
- ✅ Row Level Security (RLS) on votes table
- ✅ Admin-only vote results view
- ✅ Users can only see/modify their own vote
- ✅ Secure OAuth flow

## Maintenance

### Updating Data
Edit `/data.ts` to update:
- KPI_DATA with new hiring intelligence
- Target companies and statistics
- AI assistant questions and answers

### Adding Admin Users
```sql
INSERT INTO admin_users (user_id, email) 
SELECT id, email 
FROM auth.users 
WHERE email = 'new-admin@example.com';
```

### Monitoring
- Check Supabase Dashboard for database usage
- Monitor Vercel Analytics for traffic
- Review voting trends in admin panel

## Support

For issues:
1. Check browser console for errors
2. Verify environment variables
3. Check Supabase logs
4. Review Vercel deployment logs

## Summary

**Total Estimated Time**: 2-3 hours
- Supabase setup: 30 min
- Google OAuth: 20 min
- Deployment: 30 min
- Testing: 30 min
- Domain/DNS: 20 min

**Live URL**: https://saintstephens.digital
