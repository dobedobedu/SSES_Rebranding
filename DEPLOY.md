# Deployment Guide

## Quick Deploy Options

### 1. Local Testing (Quickest)
```bash
npm run build
npm run serve
```
Open http://localhost:8080

### 2. Netlify (Drag & Drop)
1. Run `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder onto the page
4. Done! URL provided instantly

### 3. Vercel
```bash
npm i -g vercel
npm run build
vercel --prod dist
```

### 4. GitHub Pages
```bash
npm run build
npm i -g gh-pages
gh-pages -d dist
```

### 5. Any Static Host
Simply upload the contents of the `dist` folder to:
- AWS S3
- Azure Static Web Apps
- Google Cloud Storage
- Any web server (Apache, Nginx, etc.)

## What Gets Built

The `dist` folder contains:
- `index.html` — Entry point
- `assets/` — JavaScript bundles and CSS
- All files are minified and optimized for production

## Browser Testing

After building, test in:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile (iOS Safari)
- [ ] Mobile (Android Chrome)

## Troubleshooting

### Blank Page?
- Check browser console for errors
- Ensure all files uploaded to server
- Verify paths are correct (relative vs absolute)

### Styles Not Loading?
- Check that CSS file is in `assets/` folder
- Verify `index.html` links to correct CSS path

### Interactive Features Broken?
- JavaScript may be blocked by CSP headers
- Check browser console for errors

## File Sizes

- Total: ~240KB (gzipped)
- Loads in < 1 second on fast connections
- Mobile-friendly bundle size

## Production Checklist

Before deploying:
- [ ] Build completes without errors
- [ ] Test locally with `npm run serve`
- [ ] All 5 personas display correctly
- [ ] Clicking cells opens detail panel
- [ ] Navigation arrows work
- [ ] Mobile responsive layout works
- [ ] All images/assets load properly

## Need Help?

View the matrix locally first:
```bash
cd /Users/tipsymonkey/sses-strategic-growth-matrix
npm install
npm run dev
```
