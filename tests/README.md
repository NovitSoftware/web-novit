# UI Testing Documentation

This directory contains comprehensive UI tests for the Novit Software website using Playwright. The tests verify asset loading, navigation functionality, and cross-environment compatibility between development and production (GitHub Pages) builds.

## Test Architecture

### Dual Environment Testing
The test suite runs against **two separate environments** to catch environment-specific issues:

1. **Development Environment** (`localhost:3000`)
   - Tests against the Next.js development server
   - Uses direct asset paths (no base path)
   - Validates development-specific functionality

2. **Static Build Environment** (`localhost:8000`)
   - Tests against the built static export with GitHub Pages configuration
   - Uses `/web-novit` base path prefix
   - Validates production deployment scenarios

### Test File Structure

#### Environment-Specific Tests
- **`assets.dev.spec.ts`** - Asset loading tests for development environment
- **`assets.static.spec.ts`** - Asset loading tests for static build with base path
- **`navigation.shared.spec.ts`** - Navigation tests that run on both environments

#### Test Categories
1. **Asset Loading Tests**
   - Case study images (`consultatio.png`, `ebmetrics.png`, etc.)
   - Official Novit logos (`novit-logo-official.png`, `novit-icon-only.svg`)
   - Hero academia video (`hero-academia.mp4`)
   - 404 error detection and reporting

2. **Navigation Tests**
   - Main navigation flow (Cases → Academia → Careers → Home)
   - Language switching (Spanish, English, Portuguese)
   - Smooth scroll animations
   - Logo click functionality

3. **Cross-Environment Tests**
   - SEO structure validation
   - Page structure consistency
   - Base path handling verification

## Running Tests

### All Tests (Recommended)
```bash
npm run test
```
Runs both development and static build tests automatically.

### Development Only
```bash
npx playwright test --project=localhost-dev
```

### Static Build Only  
```bash
npx playwright test --project=static-build
```

### Interactive Mode
```bash
npm run test:ui
```

### Headed Mode (Visible Browser)
```bash
npm run test:headed
```

## Test Configuration

### Playwright Projects
The tests are configured with two projects in `playwright.config.ts`:

1. **localhost-dev**: Tests development server functionality
2. **static-build**: Tests production build with GitHub Pages simulation

### Web Servers
Two web servers are automatically started:
1. Development server: `npm run dev` on port 3000
2. Static server: Built with `DEPLOY_TARGET=github-pages` and served on port 8000

### Test Matching
- Development tests: `*.dev.spec.ts`
- Static build tests: `*.static.spec.ts`  
- Shared tests: `*.shared.spec.ts` (run on both environments)

## Key Features

### 404 Error Detection
All tests monitor network responses and report any 404 errors:
```typescript
const failedRequests: string[] = [];
page.on('response', response => {
  if (response.status() >= 400) {
    failedRequests.push(`${response.url()} (${response.status()})`);
  }
});
```

### Base Path Verification
Static build tests verify assets work with the GitHub Pages base path:
```typescript
const CASE_STUDY_IMAGES = [
  '/web-novit/images/cases/consultatio.png',
  '/web-novit/images/cases/ebmetrics.png',
  // ...
];
```

### Environment Detection
Shared tests adapt behavior based on the environment:
```typescript
const isStatic = baseURL?.includes(':8000');
const basePath = isStatic ? '/web-novit' : '';
```

## Continuous Integration

Tests run automatically on:
- Pull requests to `master`
- Pushes to `master`

GitHub Actions workflow: `.github/workflows/ui-tests.yml`

## Debugging Failed Tests

### View Test Report
After test failures, check the HTML report:
```bash
npx playwright show-report
```

### Debug Mode
Run tests in debug mode to step through:
```bash
npx playwright test --debug
```

### Console Logs
Failed tests log detailed information about 404 errors and failed requests for easier debugging.

## Expected Behavior

### Development Environment
- All assets should load without 404 errors
- Navigation should work smoothly
- Asset paths should not include base path

### Static Build Environment  
- All assets should load with `/web-novit` prefix
- Navigation should work with base path
- Should simulate real GitHub Pages deployment

## Adding New Tests

### Asset Tests
Add new assets to the respective constant arrays:
```typescript
const NEW_ASSETS = [
  '/path/to/new/asset.png'
];
```

### Navigation Tests
Add new navigation scenarios to the shared tests:
```typescript
const navigationSequence = [
  { 
    selector: 'a[href*="new-section"]', 
    expectedUrl: 'new-section',
    name: 'New Section'
  }
];
```

This testing architecture ensures that both development and production environments work correctly, catching GitHub Pages specific issues that would otherwise only be discovered after deployment.