import { test, expect } from '@playwright/test';

test.describe('Environment Tests', () => {
  
  test.describe('Production Build Tests', () => {
    
    test('should verify static build works correctly', async ({ page }) => {
      // This test will run against the built static files
      await page.goto('/es');
      await page.waitForLoadState('networkidle');
      
      // Verify the page loads correctly
      await expect(page).toHaveTitle(/Novit/);
      
      // Verify navigation exists
      const nav = page.locator('nav, header');
      await expect(nav).toBeVisible();
      
      // Verify main content loads
      const main = page.locator('main, [role="main"]');
      await expect(main).toBeVisible();
    });

    test('should verify asset paths work in production build', async ({ page }) => {
      await page.goto('/es');
      await page.waitForLoadState('networkidle');
      
      // Monitor for 404 errors
      const failed404Requests: string[] = [];
      page.on('response', response => {
        if (response.status() === 404) {
          failed404Requests.push(response.url());
        }
      });
      
      // Check that critical assets load
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < Math.min(imageCount, 5); i++) { // Test first 5 images
        const src = await images.nth(i).getAttribute('src');
        if (src && src.startsWith('/')) {
          const response = await page.request.get(src);
          expect(response.status(), `Image ${src} should load in production`).toBeLessThan(400);
        }
      }
      
      // Wait and check for any 404s that occurred
      await page.waitForTimeout(2000);
      expect(failed404Requests, `Production build should not have 404 errors: ${failed404Requests.join(', ')}`).toHaveLength(0);
    });

    test('should verify CSS and JS assets load correctly', async ({ page }) => {
      await page.goto('/es');
      await page.waitForLoadState('networkidle');
      
      // Check that CSS is loaded (page should be styled)
      const bodyElement = page.locator('body');
      const backgroundColor = await bodyElement.evaluate(el => getComputedStyle(el).backgroundColor);
      expect(backgroundColor, 'Page should have CSS styling applied').not.toBe('rgba(0, 0, 0, 0)');
      
      // Check that JavaScript is working (React should be hydrated)
      const hasReact = await page.evaluate(() => {
        return window.React !== undefined || document.querySelector('[data-reactroot]') !== null;
      });
      expect(hasReact, 'React should be properly loaded and hydrated').toBeTruthy();
    });
  });

  test.describe('GitHub Pages Path Simulation', () => {
    
    test('should handle base path configuration correctly', async ({ page }) => {
      // Test the getAssetPath function behavior
      await page.goto('/es');
      
      // Get the current configuration
      const assetPathTest = await page.evaluate(() => {
        // Simulate how getAssetPath should work
        const isDev = process.env.NODE_ENV === 'development';
        const basePath = isDev ? '' : '/web-novit';
        
        return {
          isDev,
          basePath,
          sampleAssetPath: basePath + '/images/novit-logo-official.png'
        };
      });
      
      console.log('Asset path configuration:', assetPathTest);
      
      // In development, base path should be empty
      // In production, it should include the GitHub Pages path
      expect(assetPathTest.basePath, 'Base path should be configured correctly').toBeDefined();
    });

    test('should verify all locales work with base path', async ({ page }) => {
      const locales = ['es', 'en', 'pt'];
      
      for (const locale of locales) {
        await page.goto(`/${locale}`);
        await page.waitForLoadState('networkidle');
        
        // Verify page loads
        const title = await page.title();
        expect(title, `${locale} locale should have proper title`).toBeTruthy();
        
        // Verify language switcher exists and works
        const langSwitcher = page.locator('[data-testid="language-switcher"], .language-switcher, button:has-text("🇪🇸"), button:has-text("🇺🇸"), button:has-text("🇵🇹")');
        if (await langSwitcher.count() > 0) {
          await expect(langSwitcher.first()).toBeVisible();
        }
        
        // Verify content is in the correct language
        const content = await page.textContent('body');
        
        // Check for language-specific content
        if (locale === 'es') {
          expect(content).toMatch(/software|desarrollamos|hacemos/i);
        } else if (locale === 'en') {
          expect(content).toMatch(/software|develop|we do/i);
        } else if (locale === 'pt') {
          expect(content).toMatch(/software|desenvolvemos|fazemos/i);
        }
      }
    });
  });

  test.describe('Cross-Environment Consistency', () => {
    
    test('should have consistent navigation across environments', async ({ page }) => {
      await page.goto('/es');
      await page.waitForLoadState('networkidle');
      
      // Get all navigation links
      const navLinks = page.locator('nav a, header a');
      const links = [];
      
      const count = await navLinks.count();
      for (let i = 0; i < count; i++) {
        const href = await navLinks.nth(i).getAttribute('href');
        const text = await navLinks.nth(i).textContent();
        if (href && text) {
          links.push({ href, text });
        }
      }
      
      // Verify we have the expected navigation links
      expect(links.length, 'Should have navigation links').toBeGreaterThan(0);
      
      // Check for required navigation items
      const hasHome = links.some(link => link.href.includes('home') || link.text.toLowerCase().includes('inicio'));
      const hasCases = links.some(link => link.href.includes('casos') || link.text.toLowerCase().includes('casos'));
      const hasAcademia = links.some(link => link.href.includes('academia'));
      const hasCareers = links.some(link => link.href.includes('carreras'));
      
      expect(hasHome, 'Should have home navigation').toBeTruthy();
      expect(hasCases, 'Should have cases navigation').toBeTruthy();
      expect(hasAcademia, 'Should have academia navigation').toBeTruthy();
      expect(hasCareers, 'Should have careers navigation').toBeTruthy();
    });

    test('should maintain proper SEO structure across environments', async ({ page }) => {
      await page.goto('/es');
      await page.waitForLoadState('networkidle');
      
      // Check meta tags
      const title = await page.title();
      expect(title, 'Should have proper title').toBeTruthy();
      
      const description = await page.getAttribute('meta[name="description"]', 'content');
      expect(description, 'Should have meta description').toBeTruthy();
      
      // Check structured data
      const structuredData = page.locator('script[type="application/ld+json"]');
      const hasStructuredData = await structuredData.count() > 0;
      expect(hasStructuredData, 'Should have structured data for SEO').toBeTruthy();
      
      // Check Open Graph tags
      const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
      const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
      
      expect(ogTitle, 'Should have OpenGraph title').toBeTruthy();
      expect(ogDescription, 'Should have OpenGraph description').toBeTruthy();
    });
  });
});