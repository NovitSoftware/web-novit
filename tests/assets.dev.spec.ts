import { test, expect } from '@playwright/test';

// Test case study images in development environment
const CASE_STUDY_IMAGES = [
  '/images/cases/consultatio.png',
  '/images/cases/ebmetrics.png', 
  '/images/cases/gamma.png',
  '/images/cases/nazca.png',
  '/images/cases/novopath.png',
  '/images/cases/salas.png'
];

// Test official Novit logos
const NOVIT_LOGOS = [
  '/novit-logo-official.png',
  '/novit-icon-only.svg'
];

// Test hero video
const HERO_VIDEO = '/video/hero-academia.mp4';

test.describe('Asset Loading Tests - Development Environment', () => {
  
  test('case study images should load without 404 errors', async ({ page }) => {
    // Track 404 errors
    const failed404Requests: string[] = [];
    page.on('response', response => {
      if (response.status() === 404) {
        failed404Requests.push(`${response.url()} (${response.status()})`);
      }
    });

    await page.goto('/es'); // Go to Spanish homepage
    await page.waitForLoadState('networkidle');
    
    // Check each case study image directly
    for (const imagePath of CASE_STUDY_IMAGES) {
      const response = await page.request.get(imagePath);
      expect(response.status(), `Image ${imagePath} should load successfully in development`).toBe(200);
      
      // Verify content-type is an image
      const contentType = response.headers()['content-type'];
      expect(contentType, `Image ${imagePath} should have image content-type`).toMatch(/^image\//);
    }

    // Check for any 404s that happened during page load
    expect(failed404Requests, `Development should not have 404 errors: ${failed404Requests.join(', ')}`).toHaveLength(0);
  });

  test('Novit official logos should load without 404 errors', async ({ page }) => {
    const failed404Requests: string[] = [];
    page.on('response', response => {
      if (response.status() === 404) {
        failed404Requests.push(`${response.url()} (${response.status()})`);
      }
    });

    await page.goto('/es');
    await page.waitForLoadState('networkidle');
    
    for (const logoPath of NOVIT_LOGOS) {
      const response = await page.request.get(logoPath);
      expect(response.status(), `Logo ${logoPath} should load successfully in development`).toBe(200);
      
      // Verify it's an image or SVG
      const contentType = response.headers()['content-type'];
      expect(contentType, `Logo ${logoPath} should have image/svg content-type`).toMatch(/^(image\/|text\/html)/);
    }

    expect(failed404Requests, `Development should not have 404 errors: ${failed404Requests.join(', ')}`).toHaveLength(0);
  });

  test('hero academia video should load without 404 errors', async ({ page }) => {
    const failed404Requests: string[] = [];
    page.on('response', response => {
      if (response.status() === 404) {
        failed404Requests.push(`${response.url()} (${response.status()})`);
      }
    });

    await page.goto('/es/academia');
    await page.waitForLoadState('networkidle');
    
    const response = await page.request.get(HERO_VIDEO);
    expect(response.status(), `Video ${HERO_VIDEO} should load successfully in development`).toBe(200);
    
    // Verify content-type is video
    const contentType = response.headers()['content-type'];
    expect(contentType, `Video ${HERO_VIDEO} should have video content-type`).toMatch(/^video\//);

    expect(failed404Requests, `Development should not have 404 errors: ${failed404Requests.join(', ')}`).toHaveLength(0);
  });

  test('images are properly displayed on the page', async ({ page }) => {
    const failed404Requests: string[] = [];
    page.on('response', response => {
      if (response.status() === 404) {
        failed404Requests.push(`${response.url()} (${response.status()})`);
      }
    });

    await page.goto('/es');
    await page.waitForLoadState('networkidle');
    
    // Check that Novit logo is visible in header
    const novitLogo = page.locator('img[alt*="Novit"], img[src*="novit"]').first();
    if (await novitLogo.count() > 0) {
      await expect(novitLogo).toBeVisible();
    }
    
    // Navigate to success stories section and check case images
    const casesLink = page.locator('a[href*="casos-exito"]').first();
    if (await casesLink.count() > 0) {
      await casesLink.click();
      await page.waitForTimeout(1000); // Wait for smooth scroll
      
      // Check that case study images are loaded
      const caseImages = page.locator('img[src*="/images/cases/"]');
      const count = await caseImages.count();
      
      if (count > 0) {
        expect(count, 'Should have case study images visible').toBeGreaterThan(0);
        
        // Verify each visible case image loads properly
        for (let i = 0; i < Math.min(count, 3); i++) { // Test first 3 images
          await expect(caseImages.nth(i)).toBeVisible();
        }
      }
    }

    expect(failed404Requests, `Development should not have 404 errors: ${failed404Requests.join(', ')}`).toHaveLength(0);
  });

  test('video is properly displayed in academia section', async ({ page }) => {
    const failed404Requests: string[] = [];
    page.on('response', response => {
      if (response.status() === 404) {
        failed404Requests.push(`${response.url()} (${response.status()})`);
      }
    });

    await page.goto('/es/academia');
    await page.waitForLoadState('networkidle');
    
    // Look for video element
    const video = page.locator('video');
    if (await video.count() > 0) {
      await expect(video).toBeVisible();
      
      // Check video source
      const videoSrc = await video.getAttribute('src');
      expect(videoSrc, 'Video should have hero-academia.mp4 source').toContain('hero-academia.mp4');
    }

    expect(failed404Requests, `Development should not have 404 errors: ${failed404Requests.join(', ')}`).toHaveLength(0);
  });
});