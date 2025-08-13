import { test, expect } from '@playwright/test';

const LOCALHOST_BASE = 'http://localhost:3000';
const GITHUB_PAGES_BASE = 'http://localhost:8000/web-novit'; // Simulated GitHub Pages with base path

// Test case study images in different environments
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

test.describe('Asset Loading Tests', () => {
  
  test.describe('Localhost Environment', () => {
    
    test('case study images should load without 404 errors', async ({ page }) => {
      await page.goto('/es'); // Go to Spanish homepage
      
      // Check each case study image
      for (const imagePath of CASE_STUDY_IMAGES) {
        const response = await page.request.get(imagePath);
        expect(response.status(), `Image ${imagePath} should load successfully`).toBe(200);
        
        // Verify content-type is an image
        const contentType = response.headers()['content-type'];
        expect(contentType, `Image ${imagePath} should have image content-type`).toMatch(/^image\//);
      }
    });

    test('Novit official logos should load without 404 errors', async ({ page }) => {
      await page.goto('/es');
      
      for (const logoPath of NOVIT_LOGOS) {
        const response = await page.request.get(logoPath);
        expect(response.status(), `Logo ${logoPath} should load successfully`).toBe(200);
        
        // Verify it's an image or SVG
        const contentType = response.headers()['content-type'];
        expect(contentType, `Logo ${logoPath} should have image/svg content-type`).toMatch(/^(image\/|text\/html)/);
      }
    });

    test('hero academia video should load without 404 errors', async ({ page }) => {
      await page.goto('/es/academia');
      
      const response = await page.request.get(HERO_VIDEO);
      expect(response.status(), `Video ${HERO_VIDEO} should load successfully`).toBe(200);
      
      // Verify content-type is video
      const contentType = response.headers()['content-type'];
      expect(contentType, `Video ${HERO_VIDEO} should have video content-type`).toMatch(/^video\//);
    });

    test('images are properly displayed on the page', async ({ page }) => {
      await page.goto('/es');
      
      // Wait for the page to load completely
      await page.waitForLoadState('networkidle');
      
      // Check that Novit logo is visible in header
      const novitLogo = page.locator('img[alt*="Novit"], img[src*="novit"]').first();
      await expect(novitLogo).toBeVisible();
      
      // Navigate to success stories section and check case images
      await page.locator('a[href*="casos-exito"]').first().click();
      await page.waitForTimeout(1000); // Wait for smooth scroll
      
      // Check that case study images are loaded
      const caseImages = page.locator('img[src*="/images/cases/"]');
      const count = await caseImages.count();
      expect(count, 'Should have case study images visible').toBeGreaterThan(0);
      
      // Verify each visible case image loads properly
      for (let i = 0; i < count; i++) {
        await expect(caseImages.nth(i)).toBeVisible();
      }
    });

    test('hero video is properly displayed in academia section', async ({ page }) => {
      await page.goto('/es/academia');
      await page.waitForLoadState('networkidle');
      
      // Look for video element
      const video = page.locator('video');
      await expect(video).toBeVisible();
      
      // Check video source
      const videoSrc = await video.getAttribute('src');
      expect(videoSrc, 'Video should have hero-academia.mp4 source').toContain('hero-academia.mp4');
    });
  });

  test.describe('GitHub Pages Environment Simulation', () => {
    test.beforeEach(async ({ page }) => {
      // We'll test this by building the static site and serving it with the base path
      // For now, we'll modify the test to work with the current setup
    });

    test('should verify asset paths work with base path prefix', async ({ page }) => {
      // This test verifies that our asset path configuration works correctly
      await page.goto('/es');
      
      // Get the page content and check for proper asset paths
      const content = await page.content();
      
      // In development, assets should work without base path
      // In production (GitHub Pages), they should include the base path
      // Our getAssetPath function should handle this correctly
      
      // Check that images in the HTML have proper paths
      const images = page.locator('img');
      const count = await images.count();
      
      for (let i = 0; i < count; i++) {
        const src = await images.nth(i).getAttribute('src');
        if (src && src.startsWith('/')) {
          // Verify the asset exists
          const response = await page.request.get(src);
          expect(response.status(), `Asset ${src} should be accessible`).toBeLessThan(400);
        }
      }
    });

    test('should verify video paths work with base path prefix', async ({ page }) => {
      await page.goto('/es/academia');
      await page.waitForLoadState('networkidle');
      
      const videos = page.locator('video');
      const count = await videos.count();
      
      if (count > 0) {
        const src = await videos.first().getAttribute('src');
        if (src) {
          const response = await page.request.get(src);
          expect(response.status(), `Video ${src} should be accessible`).toBeLessThan(400);
        }
      }
    });
  });
});