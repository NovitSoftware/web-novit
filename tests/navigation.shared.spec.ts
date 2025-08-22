import { test, expect } from '@playwright/test';

test.describe('Navigation Tests - Cross Environment', () => {
  
  test('should navigate through main sections successfully', async ({ page, baseURL }) => {
    const isStatic = baseURL?.includes(':8000');
    const basePath = isStatic ? '/web-novit' : '';
    
    const failedRequests: string[] = [];
    page.on('response', response => {
      if (response.status() >= 400) {
        failedRequests.push(`${response.url()} (${response.status()})`);
      }
    });

    // Start at homepage
    await page.goto(`${basePath}/es/`);
    await page.waitForLoadState('networkidle');
    
    // Verify page loads
    await expect(page).toHaveTitle(/Novit/);
    
    // Test navigation sequence: Cases → Academia → Careers → Home
    const navigationSequence = [
      { 
        selector: 'a[href*="casos-exito"], a:has-text("Casos de éxito")', 
        expectedUrl: 'casos-exito',
        name: 'Cases'
      },
      { 
        selector: 'a[href*="academia"], a:has-text("Academia")', 
        expectedUrl: 'academia',
        name: 'Academia'
      },
      { 
        selector: 'a[href*="carreras"], a:has-text("Carreras")', 
        expectedUrl: 'carreras',
        name: 'Careers'
      }
    ];

    for (const nav of navigationSequence) {
      const navLink = page.locator(nav.selector).first();
      
      if (await navLink.count() > 0) {
        await navLink.click();
        await page.waitForTimeout(1000); // Wait for navigation/scroll
        
        // Verify we're on the right page/section
        const currentUrl = page.url();
        expect(currentUrl, `Should navigate to ${nav.name} section`).toContain(nav.expectedUrl);
        
        // Verify content loads
        const main = page.locator('main, [role="main"], body');
        await expect(main).toBeVisible();
      }
    }

    // Test logo click to return home
    const logoLink = page.locator('a[href*="/"], img[alt*="Novit"]').first();
    if (await logoLink.count() > 0) {
      await logoLink.click();
      await page.waitForTimeout(1000);
      
      // Should be back at homepage
      const homeUrl = page.url();
      expect(homeUrl, 'Logo click should return to homepage').toMatch(new RegExp(`${basePath}/(es/)?$`));
    }

    // Check for critical navigation errors
    const criticalErrors = failedRequests.filter(req => 
      req.includes('/images/') || 
      req.includes('/video/') || 
      req.includes('novit-logo') ||
      req.includes('novit-icon') ||
      (req.includes('404') && !req.includes('_next/'))
    );
    
    if (criticalErrors.length > 0) {
      console.log(`Navigation errors in ${isStatic ? 'static' : 'dev'} environment:`, criticalErrors);
    }
  });

  test('should handle language switching correctly', async ({ page, baseURL }) => {
    const isStatic = baseURL?.includes(':8000');
    const basePath = isStatic ? '/web-novit' : '';
    
    const failedRequests: string[] = [];
    page.on('response', response => {
      if (response.status() >= 400) {
        failedRequests.push(`${response.url()} (${response.status()})`);
      }
    });

    // Start with Spanish
    await page.goto(`${basePath}/es/`);
    await page.waitForLoadState('networkidle');
    
    // Test language switching
    const languages = [
      { code: 'en', flag: '🇺🇸', text: 'software factory you need' },
      { code: 'pt', flag: '🇵🇹', text: 'software' },
      { code: 'es', flag: '🇪🇸', text: 'software factory que necesitás' }
    ];

    for (const lang of languages) {
      // Look for language switcher
      const langSwitcher = page.locator(`button:has-text("${lang.flag}"), a[href*="/${lang.code}/"]`).first();
      
      if (await langSwitcher.count() > 0) {
        await langSwitcher.click();
        await page.waitForTimeout(1000);
        
        // Verify we're on the correct language page
        const currentUrl = page.url();
        expect(currentUrl, `Should switch to ${lang.code} locale`).toContain(`/${lang.code}/`);
        
        // Verify content is in the correct language (if text is unique enough)
        const content = await page.textContent('body');
        if (lang.text.length > 10) { // Only check for specific enough text
          expect(content?.toLowerCase(), `Content should be in ${lang.code}`).toContain(lang.text.toLowerCase());
        }
      }
    }

    // Check for language switching errors
    const criticalErrors = failedRequests.filter(req => 
      req.includes('/images/') || 
      req.includes('/video/') || 
      req.includes('novit-logo') ||
      req.includes('404')
    );
    
    if (criticalErrors.length > 0) {
      console.log(`Language switching errors in ${isStatic ? 'static' : 'dev'} environment:`, criticalErrors);
    }
  });

  test('should verify smooth scroll animations work', async ({ page, baseURL }) => {
    const isStatic = baseURL?.includes(':8000');
    const basePath = isStatic ? '/web-novit' : '';
    
    await page.goto(`${basePath}/es/`);
    await page.waitForLoadState('networkidle');
    
    // Test smooth scroll to different sections
    const scrollTargets = [
      'a[href*="#que-hacemos"], a:has-text("Qué hacemos")',
      'a[href*="#casos-exito"], a:has-text("Casos de éxito")',
      'a[href*="#home"], a:has-text("Inicio")'
    ];

    for (const selector of scrollTargets) {
      const link = page.locator(selector).first();
      
      if (await link.count() > 0) {
        // Get initial scroll position
        const initialY = await page.evaluate(() => window.scrollY);
        
        await link.click();
        await page.waitForTimeout(1500); // Wait for smooth scroll animation
        
        // Get final scroll position
        const finalY = await page.evaluate(() => window.scrollY);
        
        // Verify scroll position changed (animation occurred)
        expect(Math.abs(finalY - initialY), 'Smooth scroll should change scroll position').toBeGreaterThan(50);
      }
    }
  });

  test('should verify page structure and SEO elements', async ({ page, baseURL }) => {
    const isStatic = baseURL?.includes(':8000');
    const basePath = isStatic ? '/web-novit' : '';
    
    await page.goto(`${basePath}/es/`);
    await page.waitForLoadState('networkidle');
    
    // Check page title
    const title = await page.title();
    expect(title, 'Should have proper title').toBeTruthy();
    expect(title, 'Title should contain Novit').toContain('Novit');
    
    // Check meta description
    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description, 'Should have meta description').toBeTruthy();
    
    // Check main navigation structure
    const nav = page.locator('nav, header');
    await expect(nav).toBeVisible();
    
    // Check main content area
    const main = page.locator('main, [role="main"], body');
    await expect(main).toBeVisible();
    
    // Check for essential links
    const essentialLinks = [
      'a[href*="casos-exito"]',
      'a[href*="academia"]',
      'a[href*="carreras"]'
    ];

    for (const selector of essentialLinks) {
      const link = page.locator(selector).first();
      if (await link.count() > 0) {
        await expect(link).toBeVisible();
      }
    }
    
    // Check Open Graph tags
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
    
    expect(ogTitle, 'Should have OpenGraph title').toBeTruthy();
    expect(ogDescription, 'Should have OpenGraph description').toBeTruthy();
  });
});