# SSES Strategic Growth Matrix - Setup Checklist

## ✅ COMPLETED - Code Changes

### Executive Dashboard Updates
- [x] Reduced from 4 cards to 3 strategic KPI cards
- [x] Card 1: Total Relocating Families (1,080-1,670/year)
  - Breakdown: PGT (300-500), Sarasota Memorial (400-600), LWR Medical (100-150), etc.
- [x] Card 2: Healthcare Hiring (1,250+ openings)
  - Breakdown: Sarasota Memorial (1,000+), LWR (150+), HCA (113+)
- [x] Card 3: Major Expansions ($597M investment)
  - Breakdown: North Port Hospital ($507M), Venice ER ($90M)
- [x] Made all cards expandable with full-width detailed breakdowns
- [x] Increased Executive Summary height (min-h-[600px]) and padding
- [x] Added icons (Users, Heart, Construction) for visual distinction

### Voting System Implementation
- [x] Created Supabase client (`lib/supabase.ts`)
- [x] Created database schema (`supabase/schema.sql`)
- [x] Created voting hook (`hooks/useVoting.ts`)
- [x] Created auth hook (`hooks/useAuth.ts`)
- [x] Created VotingSection component with:
  - Google OAuth login
  - Manual name entry fallback
  - Segment selection UI
  - Vote submission/change capability
- [x] Created VotingResults component (admin-only view)
- [x] Integrated voting into Executive Dashboard
- [x] Security: RLS policies, admin-only results

### Recommended Actions Updates
- [x] Updated corp-t1 (Relocation Leaders) with new priorities:
  - Urgent: PGT Innovations HR outreach
  - Partner with Sarasota Memorial
  - Target remote-friendly tech companies
  - Monitor North Port Hospital construction
  - Healthcare-specific marketing
- [x] Updated corp-t2 (Relocation Partners) with sector focus
- [x] Updated corp-t3 (Digital Research) with intelligence-based actions

### Domain & Deployment Setup
- [x] Installed @supabase/supabase-js
- [x] Installed react-router-dom
- [x] Created environment configuration files
- [x] Created comprehensive DEPLOYMENT.md guide
- [x] Updated .gitignore for environment files
- [x] Verified build compiles successfully

## ⏳ PENDING - Your Action Required

### 1. Supabase Project Setup (15 min)
- [ ] Create project at https://supabase.com/dashboard
- [ ] Name: `sses-growth-matrix`
- [ ] Region: US East
- [ ] Save:
  - Project URL: `https://[PROJECT_ID].supabase.co`
  - Anon Key: Available in Project Settings → API

### 2. Database Schema (5 min)
- [ ] Go to Supabase Dashboard → SQL Editor
- [ ] New Query → Paste contents of `/supabase/schema.sql`
- [ ] Click Run
- [ ] Verify tables created: `votes`, `admin_users`

### 3. Google OAuth Setup (20 min)
- [ ] Go to https://console.cloud.google.com
- [ ] Create/select project
- [ ] APIs & Services → Credentials → OAuth 2.0 Client ID
- [ ] Configure OAuth consent screen
- [ ] Add redirect URIs:
  - `http://localhost:3000/auth/callback`
  - `https://saintstephens.digital/auth/callback`
- [ ] Copy Client ID and Client Secret
- [ ] Paste in Supabase Dashboard → Auth → Providers → Google

### 4. Environment Variables
Create `.env.local`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_SITE_URL=http://localhost:3000
```

### 5. Local Testing (10 min)
```bash
npm run dev
```
- [ ] Test Google OAuth login
- [ ] Test name-based login
- [ ] Cast a test vote
- [ ] Check admin results view

### 6. Vercel Deployment (10 min)
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add domain
vercel domains add saintstephens.digital
```

### 7. Production Environment (5 min)
In Vercel Dashboard → Project Settings → Environment Variables:
- [ ] `VITE_SUPABASE_URL`
- [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] `VITE_SITE_URL=https://saintstephens.digital`

### 8. DNS Configuration (10 min)
At your domain registrar:
- [ ] A Record: `@` → `76.76.21.21`
- [ ] CNAME: `www` → `cname.vercel-dns.com`

### 9. Set Admin User (5 min)
After first sign-in:
```sql
-- In Supabase SQL Editor
INSERT INTO admin_users (user_id, email) 
SELECT id, email 
FROM auth.users 
WHERE email = 'your-email@example.com';
```

### 10. CORS Configuration (5 min)
In Supabase Dashboard → API Settings:
- [ ] Add CORS origin: `https://saintstephens.digital`

## 📁 Files Created/Modified

### New Files
- `/lib/supabase.ts` - Supabase client configuration
- `/supabase/schema.sql` - Database schema
- `/hooks/useVoting.ts` - Voting state management
- `/hooks/useAuth.ts` - Authentication logic
- `/components/VotingSection.tsx` - Voting UI
- `/components/VotingResults.tsx` - Admin results
- `DEPLOYMENT.md` - Comprehensive deployment guide
- `SETUP_CHECKLIST.md` - This file

### Modified Files
- `/components/ExecutiveDashboard.tsx` - Updated KPI cards, added voting
- `/data.ts` - Updated recommended actions, company intelligence
- `/types.ts` - Added voting-related types
- `.env.example` - Environment variable template
- `.gitignore` - Added env files
- `package.json` - Added @supabase/supabase-js, react-router-dom

## 🚀 Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 3. Run locally
npm run dev

# 4. Deploy to Vercel
vercel
vercel domains add saintstephens.digital
```

## 📝 Notes

- Build size increased to ~500KB due to Supabase client (expected)
- OAuth callback handled automatically by Supabase (no custom route needed)
- Voting is one-per-user using upsert (user can change vote)
- Admin results refresh every 30 seconds
- All data is real-time as of February 2026

## 🔐 Security Features

- Row Level Security (RLS) enabled on votes table
- Users can only see/modify their own vote
- Admin results view restricted to admin_users table
- Secure OAuth flow via Google
- Environment variables protected in Vercel

## 🎯 Success Criteria

✅ https://saintstephens.digital loads successfully
✅ 3 expandable KPI cards showing real-time data
✅ Stakeholders can sign in and vote
✅ Admin can see live vote results
✅ All actions work smoothly
✅ Site is responsive on mobile/desktop

---

**Ready to deploy!** Follow the checklist above to go live.
