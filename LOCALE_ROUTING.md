# Locale Routing Development Guide

## Issue with Development Server (404 Errors)

When using `output: 'export'` in Next.js 15 with App Router, the development server (`npm run dev`) doesn't properly handle dynamic routes like `[locale]`. This results in 404 errors for all locale routes during development.

**This is expected behavior and not a bug.** The production build works correctly.

## Solution: Use Static Server for Testing

To test locale routing during development, use the provided static server script:

```bash
npm run serve
```

This will:
1. Build the static export
2. Start a local server on http://localhost:8000
3. Allow you to test all locale routes properly

## Available Routes

- **Root (auto-detect)**: http://localhost:8000
- **Spanish**: http://localhost:8000/es/
- **English**: http://localhost:8000/en/
- **Catalan**: http://localhost:8000/ca/

## How Locale Detection Works

1. **First visit to root**: Detects browser language and redirects to appropriate locale
2. **Manual language switch**: Saves preference in localStorage 
3. **Future visits**: Uses saved preference or falls back to browser detection
4. **Default fallback**: Spanish (es) if no preference or unsupported language

## Production Deployment

The static export works perfectly for production deployment to platforms like:
- GitHub Pages
- Netlify
- Vercel (static)
- Any static hosting provider

All locale routes will be available at:
- `yourdomain.com/es/`
- `yourdomain.com/en/`  
- `yourdomain.com/ca/`