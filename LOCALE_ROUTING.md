# Locale Routing Development Guide

## Overview

This Next.js application supports three languages:
- **Spanish (es)** - Default language 
- **English (en)**
- **Catalan (ca)**

## SEO-Optimized Language Detection

The root page (`/`) immediately serves content with optimal SEO:

### How It Works
1. **Immediate Content**: Root page shows fallback content instantly (no loading screens)
2. **Meta Refresh**: HTML `<meta http-equiv="refresh">` redirects to `/es` for non-JS users
3. **JavaScript Enhancement**: Detects browser language and redirects to preferred locale
4. **Preference Storage**: Saves user language choice in localStorage for future visits

### Browser Language Detection
- Checks `navigator.languages` and `navigator.language`
- Automatically redirects to `/en` for English browsers
- Automatically redirects to `/ca` for Catalan browsers  
- Defaults to `/es` (Spanish) for all other languages

## Development Workflow

### Testing Locale Routes

Since Next.js 15 development server has issues with dynamic routes and static exports, use:

```bash
npm run serve
```

This command:
1. Builds the static export (`npm run build`)
2. Serves the `out/` directory on http://localhost:8000
3. Shows helpful URLs for testing all locales

### Available Test URLs
- **Root (auto-detect)**: http://localhost:8000
- **Spanish**: http://localhost:8000/es/
- **English**: http://localhost:8000/en/
- **Catalan**: http://localhost:8000/ca/

## Development vs Production

### Development Mode (`npm run dev`)
- ❌ Locale routes may show 404 errors
- ⚠️ This is expected behavior with Next.js 15 + static exports
- ✅ Use `npm run serve` to test language routing

### Production Build (`npm run build`)
- ✅ All locale routes generate correctly
- ✅ Static files are created for each language
- ✅ Deployed sites work perfectly

## Language Switching

The navigation includes a language switcher that:
- Updates the URL to the selected locale
- Saves the preference to localStorage
- Works consistently across all pages

## Production Deployment

The static export in `out/` folder is ready for:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

All language detection and routing works perfectly in production environments.

## Troubleshooting

### 404 Errors in Development
**Problem**: Visiting locale URLs shows 404 in `npm run dev`
**Solution**: Use `npm run serve` for testing locale functionality

### Language Not Detecting
**Problem**: Browser language not being detected
**Solution**: 
1. Clear localStorage: `localStorage.removeItem('preferred-locale')`
2. Refresh the page
3. Check browser language settings

### Windows Compatibility
**Problem**: Previous bash scripts didn't work on Windows
**Solution**: Now uses cross-platform `serve` package via npm scripts