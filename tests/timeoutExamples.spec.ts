import {test} from '@playwright/test';

test('timeout examples', async ({page}) => {
    // Use default timeout (30s)
    await page.goto('http://localhost:4200/');
    
    // Custom timeout for this specific action (10 seconds)
    await page.getByText('Forms').click({ timeout: 10000 });
    
    // Custom timeout for navigation (60 seconds for slow pages)
    await page.goto('http://localhost:4200/slow-page', { timeout: 60000 });
    
    // Quick timeout for fast actions (2 seconds)
    await page.getByText('Form Layouts').click({ timeout: 2000 });
    
    // Wait for element with custom timeout
    await page.waitForSelector('.loading-spinner', { timeout: 5000 });
});

test('what happens when timeout is exceeded', async ({page}) => {
    try {
        // This will fail if page takes more than 5 seconds to load
        await page.goto('http://localhost:4200/', { timeout: 5000 });
        
        // This will fail if element is not found within 2 seconds
        await page.getByText('NonExistentElement').click({ timeout: 2000 });
        
    } catch (error) {
        console.log('Timeout error caught:', error.message);
        // Test will fail with timeout error
    }
});