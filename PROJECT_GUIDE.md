# SSES Strategic Matrix - File Guide

## 📁 Project Structure

### Core Application Files
| File | Purpose |
|------|---------|
| `index.html` | Entry point - loads the React app |
| `App.tsx` | Main app component with header, grid, and panel |
| `index.tsx` | React application bootstrap |
| `index.css` | Tailwind CSS styles |

### Data & Types
| File | Purpose |
|------|---------|
| `data.ts` | **All 5 personas with research data** |
| `types.ts` | TypeScript interfaces and enums |

### Components
| File | Purpose |
|------|---------|
| `components/MatrixGrid.tsx` | 5x5 interactive grid UI |
| `components/DetailPanel.tsx` | Slide-out detail panel with all data |

### Configuration
| File | Purpose |
|------|---------|
| `vite.config.ts` | Build configuration |
| `tsconfig.json` | TypeScript configuration |
| `package.json` | Dependencies and scripts |
| `tailwind.config.js` | Tailwind CSS configuration |

### Documentation
| File | Purpose |
|------|---------|
| `README.md` | Quick start and overview |
| `DEPLOY.md` | Deployment instructions |
| `PROJECT_GUIDE.md` | This file - complete file reference |

### Build Output
| Folder | Contents |
|--------|----------|
| `dist/` | **Production build** - upload these files |
| `dist/index.html` | Built entry point |
| `dist/assets/` | JS bundles and CSS (minified) |

## 🎯 What Each Column Shows

### Column 1: Segment
- Campaign steps (Awareness → Consideration)
- Target companies (Tier 1 & 2)
- Real success stories
- Click to activate tactics

### Column 2: Current Location
- Origin regions (NY/NJ/IL/CA %)
- Expectations vs. cultural baseline
- Emotional drivers
- Golden nuggets
- Key partners & ecosystem

### Column 3: Spending Pattern
- Budget ranges
- Price sensitivity
- Ticket items with prices

### Column 4: Competition
- Benchmark schools
- Referral ecosystems
- Competitive positioning

### Column 5: Strategic Value
- Core blueprints
- 12-hour response guarantee
- Strategic objectives

## 🚀 Quick Commands

```bash
# Install dependencies
npm install

# Development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Serve static files (localhost:8080)
npm run serve

# Or use the script
./serve.sh
```

## 📊 Data Updates Made

### Corporate Relocator
- ✅ Updated regions: NY/NJ 30%, IL 15%, CA 12%, OH 10%
- ✅ Corrected tuition: $24,745 (not $32k-$36k)
- ✅ Added 10 target companies (Tier 1 & 2)
- ✅ Removed "Decision" stage - now TOFU only
- ✅ Added partner ecosystem (Cartus, Sirva, etc.)
- ✅ 12-hour response guarantee in strategy

### Lifestyle Entrepreneur
- ✅ Added real success stories (Petrone, Atwood, Lola)
- ✅ Updated income brackets ($75k-$150k = 45%)
- ✅ Added partner networks (Mote Marine, Tampa Bay Wave)

### All Segments
- ✅ Research-backed data from Tampa Bay dashboard
- ✅ 29+ companies analyzed
- ✅ 700-800 families with children annually
- ✅ Competition benchmarking with real schools

## 🌐 Deployment Ready

The `dist/` folder is ready to deploy to:
- Netlify (drag & drop)
- Vercel
- GitHub Pages
- AWS S3
- Any static host

## 📱 Browser Support

✅ Chrome/Edge  
✅ Firefox  
✅ Safari  
✅ Mobile (iOS/Android)  

## 🎨 Design System

- **Primary**: Emerald-600 (#059669)
- **Background**: Slate-50 (#f8fafc)
- **Text**: Slate-900 (#0f172a)
- **Font**: Inter (Google Fonts)
- **Grid**: 5 columns, responsive

---

**Last Updated**: February 6, 2026  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
