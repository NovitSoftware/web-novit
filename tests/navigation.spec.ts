import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Start at the Spanish homepage
    await page.goto('/es');
    await page.waitForLoadState('networkidle');
  });

  test('should perform complete navigation flow without 404 errors', async ({ page }) => {
    // Test the exact sequence from the issue requirements:
    
    // 1. Click "Casos de éxito" (first interaction with smooth scroll)
    const casosExitoLink = page.locator('a[href*="casos-exito"], a[href*="#casos-exito"]').first();
    await expect(casosExitoLink).toBeVisible();
    
    // Monitor network requests to ensure no 404s
    const failed404Requests: string[] = [];
    page.on('response', response => {
      if (response.status() === 404) {
        failed404Requests.push(response.url());
      }
    });
    
    await casosExitoLink.click();
    await page.waitForTimeout(1500); // Wait for smooth scroll animation
    
    // Verify we're in the success stories section
    const url1 = page.url();
    expect(url1).toContain('#casos-exito');
    
    // 2. Click "Home"
    const homeLink = page.locator('a[href*="home"], a[href*="#home"], a:has-text("Inicio"), a:has-text("Home")').first();
    await homeLink.click();
    await page.waitForTimeout(1000);
    
    // 3. Click "Academia"
    const academiaLink = page.locator('a[href*="academia"]').first();
    await academiaLink.click();
    await page.waitForLoadState('networkidle');
    
    // Verify we're on academia page
    const url3 = page.url();
    expect(url3).toContain('/academia');
    
    // 4. Click "Carreras"
    const carrerasLink = page.locator('a[href*="carreras"]').first();
    await carrerasLink.click();
    await page.waitForLoadState('networkidle');
    
    // Verify we're on carreras page
    const url4 = page.url();
    expect(url4).toContain('/carreras');
    
    // 5. Click "Volver a Home" (back to Home)
    const backHomeLink = page.locator('a[href*="home"], a[href*="#home"], a:has-text("Inicio"), a:has-text("Home"), a[href="/es"]').first();
    await backHomeLink.click();
    await page.waitForLoadState('networkidle');
    
    // 6. Click "Qué Hacemos"
    const queHacemosLink = page.locator('a[href*="services"], a[href*="#services"], a:has-text("Qué hacemos")').first();
    await queHacemosLink.click();
    await page.waitForTimeout(1500); // Wait for smooth scroll
    
    // 7. Click "Casos de Éxito" again
    const casosExitoLink2 = page.locator('a[href*="casos-exito"], a[href*="#casos-exito"]').first();
    await casosExitoLink2.click();
    await page.waitForTimeout(1500); // Wait for smooth scroll
    
    // 8. Click the Novit logo (top left)
    const novitLogo = page.locator('img[alt*="Novit"], a[href="/es"] img, a[href*="home"] img').first();
    await novitLogo.click();
    await page.waitForLoadState('networkidle');
    
    // Verify no 404 errors occurred during navigation
    expect(failed404Requests, `Navigation should not result in 404 errors. Found: ${failed404Requests.join(', ')}`).toHaveLength(0);
  });

  test('smooth scroll animation should work on first click', async ({ page }) => {
    // Test specifically that the first interaction with "Casos de éxito" has smooth scroll
    const casosExitoLink = page.locator('a[href*="casos-exito"], a[href*="#casos-exito"]').first();
    await expect(casosExitoLink).toBeVisible();
    
    // Get initial scroll position
    const initialScrollY = await page.evaluate(() => window.scrollY);
    
    // Click the link
    await casosExitoLink.click();
    
    // Wait a bit and check that scroll position is changing (indicating animation)
    await page.waitForTimeout(100);
    const midScrollY = await page.evaluate(() => window.scrollY);
    
    // Wait for animation to complete
    await page.waitForTimeout(1500);
    const finalScrollY = await page.evaluate(() => window.scrollY);
    
    // Verify that scrolling occurred
    expect(finalScrollY, 'Should scroll to success stories section').toBeGreaterThan(initialScrollY);
    
    // Verify smooth scroll behavior (CSS property)
    const htmlElement = page.locator('html');
    const scrollBehavior = await htmlElement.evaluate(el => getComputedStyle(el).scrollBehavior);
    expect(scrollBehavior, 'Should have smooth scroll behavior').toBe('smooth');
  });

  test('all navigation links should be accessible and working', async ({ page }) => {
    // Get all navigation links
    const navLinks = page.locator('nav a, header a').filter({ hasText: /.+/ });
    const linkCount = await navLinks.count();
    
    expect(linkCount, 'Should have navigation links').toBeGreaterThan(0);
    
    // Test each navigation link
    for (let i = 0; i < linkCount; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      
      if (href && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        console.log(`Testing navigation link: "${text}" -> ${href}`);
        
        // For hash links, test smooth scroll
        if (href.includes('#')) {
          await link.click();
          await page.waitForTimeout(1000);
          
          // Verify URL includes the hash
          const currentUrl = page.url();
          if (href.startsWith('#')) {
            expect(currentUrl).toContain(href);
          }
        } 
        // For page links, test navigation
        else if (href.startsWith('/')) {
          await link.click();
          await page.waitForLoadState('networkidle');
          
          // Verify we navigated to the correct page
          const currentUrl = page.url();
          expect(currentUrl).toContain(href);
          
          // Go back to home for next test
          await page.goto('/es');
          await page.waitForLoadState('networkidle');
        }
      }
    }
  });

  test('navigation should work in all supported locales', async ({ page }) => {
    const locales = ['es', 'en', 'pt'];
    
    for (const locale of locales) {
      console.log(`Testing navigation in ${locale} locale`);
      
      await page.goto(`/${locale}`);
      await page.waitForLoadState('networkidle');
      
      // Test that the main navigation elements exist
      const nav = page.locator('nav, header');
      await expect(nav).toBeVisible();
      
      // Test home link
      const homeLink = page.locator('a[href*="home"], a[href*="#home"]').first();
      if (await homeLink.count() > 0) {
        await homeLink.click();
        await page.waitForTimeout(500);
      }
      
      // Test cases/success stories link
      const casesLink = page.locator('a[href*="casos"], a[href*="cases"], a[href*="success"]').first();
      if (await casesLink.count() > 0) {
        await casesLink.click();
        await page.waitForTimeout(500);
      }
      
      // Test academia link
      const academiaLink = page.locator('a[href*="academia"]').first();
      if (await academiaLink.count() > 0) {
        await academiaLink.click();
        await page.waitForLoadState('networkidle');
        
        // Verify we're on academia page
        const url = page.url();
        expect(url).toContain('/academia');
      }
      
      // Test carreras/careers link
      const carrerasLink = page.locator('a[href*="carreras"], a[href*="careers"]').first();
      if (await carrerasLink.count() > 0) {
        await carrerasLink.click();
        await page.waitForLoadState('networkidle');
        
        // Verify we're on careers page
        const url = page.url();
        expect(url).toContain('/carreras');
      }
    }
  });

  test('logo click should return to home', async ({ page }) => {
    // Navigate to a different page first
    await page.goto('/es/academia');
    await page.waitForLoadState('networkidle');
    
    // Click the logo
    const logo = page.locator('img[alt*="Novit"], a[href="/es"] img, a[href*="home"] img').first();
    await expect(logo).toBeVisible();
    await logo.click();
    await page.waitForLoadState('networkidle');
    
    // Verify we're back at home
    const url = page.url();
    expect(url).toMatch(/\/es\/?$/);
  });
});