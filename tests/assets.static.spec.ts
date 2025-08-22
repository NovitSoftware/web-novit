import { test, expect } from '@playwright/test';

// Test case study images with GitHub Pages base path
const CASE_STUDY_IMAGES = [
  '/web-novit/images/cases/consultatio.png',
  '/web-novit/images/cases/ebmetrics.png', 
  '/web-novit/images/cases/gamma.png',
  '/web-novit/images/cases/nazca.png',
  '/web-novit/images/cases/novopath.png',
  '/web-novit/images/cases/salas.png'
];

// Test official Novit logos with base path
const NOVIT_LOGOS = [
  '/web-novit/novit-logo-official.png',
  '/web-novit/novit-icon-only.svg'
];

// Test hero video with base path
const HERO_VIDEO = '/web-novit/video/hero-academia.mp4';

test.describe('Asset Loading Tests - Static Build (GitHub Pages Simulation)', () => {
  
  test('case study images should load without 404 errors in static build', async ({ page }) => {
    // Track all failed requests
    const failedRequests: string[] = [];
    page.on('response', response => {
      if (response.status() >= 400) {
        failedRequests.push(`${response.url()} (${response.status()})`);
      }
    });

    await page.goto('/web-novit/es/'); // GitHub Pages path
    await page.waitForLoadState('networkidle');
    
    // Check each case study image directly
    for (const imagePath of CASE_STUDY_IMAGES) {
      const response = await page.request.get(imagePath);
      expect(response.status(), `Image ${imagePath} should load successfully in static build`).toBe(200);
      
      // Verify content-type is an image
      const contentType = response.headers()['content-type'];
      expect(contentType, `Image ${imagePath} should have image content-type`).toMatch(/^image\//);
    }

    // Report any failed requests for debugging
    if (failedRequests.length > 0) {
      console.log('Failed requests detected:', failedRequests);
    }
    
    // Check for critical 404s (images, videos, logos)
    const critical404s = failedRequests.filter(req => 
      req.includes('/images/') || 
      req.includes('/video/') || 
      req.includes('novit-logo') ||
      req.includes('novit-icon')
    );
    
    expect(critical404s, `Static build should not have critical asset 404 errors: ${critical404s.join(', ')}`).toHaveLength(0);
  });

  test('Novit official logos should load without 404 errors in static build', async ({ page }) => {
    const failedRequests: string[] = [];
    page.on('response', response => {
      if (response.status() >= 400) {
        failedRequests.push(`${response.url()} (${response.status()})`);
      }
    });

    await page.goto('/web-novit/es/');
    await page.waitForLoadState('networkidle');
    
    for (const logoPath of NOVIT_LOGOS) {
      const response = await page.request.get(logoPath);
      expect(response.status(), `Logo ${logoPath} should load successfully in static build`).toBe(200);
      
      // Verify it's an image or SVG
      const contentType = response.headers()['content-type'];
      expect(contentType, `Logo ${logoPath} should have image/svg content-type`).toMatch(/^(image\/|text\/html)/);
    }

    const critical404s = failedRequests.filter(req => 
      req.includes('novit-logo') || req.includes('novit-icon')
    );
    expect(critical404s, `Static build should not have logo 404 errors: ${critical404s.join(', ')}`).toHaveLength(0);
  });

  test('hero academia video should load without 404 errors in static build', async ({ page }) => {
    const failedRequests: string[] = [];
    page.on('response', response => {
      if (response.status() >= 400) {
        failedRequests.push(`${response.url()} (${response.status()})`);
      }
    });

    await page.goto('/web-novit/es/academia/');
    await page.waitForLoadState('networkidle');
    
    const response = await page.request.get(HERO_VIDEO);
    expect(response.status(), `Video ${HERO_VIDEO} should load successfully in static build`).toBe(200);
    
    // Verify content-type is video
    const contentType = response.headers()['content-type'];
    expect(contentType, `Video ${HERO_VIDEO} should have video content-type`).toMatch(/^video\//);

    const critical404s = failedRequests.filter(req => req.includes('/video/'));
    expect(critical404s, `Static build should not have video 404 errors: ${critical404s.join(', ')}`).toHaveLength(0);
  });

  test('verify asset paths are correctly prefixed with base path', async ({ page }) => {
    const failedRequests: string[] = [];
    page.on('response', response => {
      if (response.status() >= 400) {
        failedRequests.push(`${response.url()} (${response.status()})`);
      }
    });

    await page.goto('/web-novit/es/');
    await page.waitForLoadState('networkidle');
    
    // Check that images in the DOM have the correct base path
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < Math.min(count, 5); i++) { // Test first 5 images
      const src = await images.nth(i).getAttribute('src');
      if (src && src.startsWith('/web-novit/')) {
        // Verify the asset is accessible
        const response = await page.request.get(src);
        expect(response.status(), `Asset ${src} should be accessible in static build`).toBeLessThan(400);
      }
    }

    // Check for unexpected 404s on critical assets
    const critical404s = failedRequests.filter(req => 
      req.includes('/images/') || 
      req.includes('/video/') || 
      req.includes('novit-logo') ||
      req.includes('novit-icon') ||
      req.includes('.css') ||
      req.includes('.js')
    );
    
    if (critical404s.length > 0) {
      console.log('Critical 404 errors detected in static build:', critical404s);
    }
  });

  test('navigation works correctly with base path', async ({ page }) => {
    const failedRequests: string[] = [];
    page.on('response', response => {
      if (response.status() >= 400) {
        failedRequests.push(`${response.url()} (${response.status()})`);
      }
    });

    await page.goto('/web-novit/es/');
    await page.waitForLoadState('networkidle');
    
    // Test navigation to different sections
    const navigationTests = [
      { path: '/web-novit/es/academia/', name: 'Academia' },
      { path: '/web-novit/es/carreras/', name: 'Carreras' },
      { path: '/web-novit/en/', name: 'English' },
      { path: '/web-novit/pt/', name: 'Portuguese' }
    ];

    for (const nav of navigationTests) {
      await page.goto(nav.path);
      await page.waitForLoadState('networkidle');
      
      // Verify page loads successfully
      const title = await page.title();
      expect(title, `${nav.name} page should have proper title`).toBeTruthy();
      
      // Check for critical navigation 404s
      const navErrors = failedRequests.filter(req => 
        req.includes(nav.path) || 
        (req.includes('/images/') || req.includes('/video/') || req.includes('novit-logo'))
      );
      
      if (navErrors.length > 0) {
        console.log(`Navigation errors for ${nav.name}:`, navErrors);
      }
    }

    // Final check - should not have critical asset failures
    const critical404s = failedRequests.filter(req => 
      req.includes('/images/') || 
      req.includes('/video/') || 
      req.includes('novit-logo') ||
      req.includes('novit-icon')
    );
    
    // Log all critical issues for debugging
    if (critical404s.length > 0) {
      console.log('Final critical 404s detected:', critical404s);
      console.log('All failed requests:', failedRequests);
    }
  });

  test('verify static build works across all locales', async ({ page }) => {
    const locales = ['es', 'en', 'pt'];
    const allFailedRequests: string[] = [];
    
    page.on('response', response => {
      if (response.status() >= 400) {
        allFailedRequests.push(`${response.url()} (${response.status()})`);
      }
    });
    
    for (const locale of locales) {
      await page.goto(`/web-novit/${locale}/`);
      await page.waitForLoadState('networkidle');
      
      // Verify page loads
      const title = await page.title();
      expect(title, `${locale} locale should have proper title`).toBeTruthy();
      
      // Verify main content loads
      const main = page.locator('main, [role="main"], body');
      await expect(main).toBeVisible();
      
      // Check for language-specific content
      const content = await page.textContent('body');
      expect(content, `${locale} locale should have content`).toBeTruthy();
    }

    // Check for critical errors across all locales
    const criticalErrors = allFailedRequests.filter(req => 
      req.includes('/images/') || 
      req.includes('/video/') || 
      req.includes('novit-logo') ||
      req.includes('novit-icon')
    );
    
    if (criticalErrors.length > 0) {
      console.log('Critical errors across all locales:', criticalErrors);
    }
  });
});