# Automated UI Tests

This directory contains Playwright-based automated UI tests for the Novit Software website.

## Test Coverage

### Asset Loading Tests (`assets.spec.ts`)
- ✅ Case study images load without 404 errors
- ✅ Novit official logos load correctly  
- ✅ Hero academia video loads in academia section
- ✅ Images display properly on pages
- ✅ Asset paths work with GitHub Pages base path

### Navigation Tests (`navigation.spec.ts`)
- ✅ Complete navigation flow without 404 errors
- ✅ Smooth scroll animation verification (first click)
- ✅ All navigation links are accessible
- ✅ Multi-locale navigation (Spanish, English, Portuguese)
- ✅ Logo click returns to home

### Environment Tests (`environments.spec.ts`)
- ✅ Static build verification
- ✅ Production asset loading
- ✅ CSS and JS asset verification
- ✅ Base path configuration for GitHub Pages
- ✅ Cross-environment consistency
- ✅ SEO structure validation

## Required Navigation Flow Tested

The tests verify the exact navigation sequence specified in the requirements:
1. Click "Casos de éxito" (with smooth scroll animation)
2. Click "Home" 
3. Click "Academia"
4. Click "Carreras"
5. Click "Volver a Home"
6. Click "Qué hacemos"
7. Click "Casos de Éxito" again
8. Click Novit logo (top left)

## Running Tests

### Prerequisites
```bash
npm install
npx playwright install
```

### Available Commands
```bash
# Run all tests
npm run test

# Run tests with visible browser (for debugging)
npm run test:headed

# Open interactive test UI
npm run test:ui

# Run specific test file
npm run test tests/assets.spec.ts

# Run tests matching a pattern
npm run test -g "navigation"
```

### GitHub Actions
Tests run automatically on every pull request via `.github/workflows/ui-tests.yml`.

## Test Environment

- **Base URL**: http://localhost:3000 (automatically started)
- **Browser**: Chromium headless
- **Timeout**: 2 minutes for test setup
- **Retries**: 2 retries on CI

## What Tests Verify

### Asset Loading
- All case study images return HTTP 200
- Novit logos have proper content-types
- Hero academia video exists and loads
- No 404 errors for critical assets

### Navigation
- URL changes correctly on navigation
- Smooth scroll behavior is enabled
- Navigation works across all locales
- No 404 errors during navigation flow

### 404 Error Detection
The tests specifically monitor for and fail on any 404 errors during:
- Asset loading requests
- Navigation between pages
- Cross-locale navigation

This ensures the GitHub Pages deployment and localhost environments both serve all assets correctly.