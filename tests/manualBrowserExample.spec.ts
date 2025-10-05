import { test, expect } from '@playwright/test';

// Example: Manual browser management (rarely needed)
test('manual browser control example', async ({ browser }) => {
    // Create context manually
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
        await page.goto('http://localhost:4200/');
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
        
        // Your test assertions here
        
    } finally {
        // Manual cleanup (though Playwright will still clean up automatically)
        await context.close();
    }
});

// Example: Multiple pages in one test
test('multiple pages example', async ({ browser }) => {
    const context = await browser.newContext();
    
    // Create multiple pages
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    
    try {
        // Use both pages
        await page1.goto('http://localhost:4200/');
        await page2.goto('http://localhost:4200/');
        
        // Do something with both pages
        await page1.getByText('Forms').click();
        await page2.getByText('Dashboard').click();
        
    } finally {
        // Close context (closes all pages)
        await context.close();
    }
});