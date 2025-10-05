import {test} from '@playwright/test';

// ❌ This test will likely FAIL - no await
test('without await - BROKEN', async ({page}) => {
    console.log('1. Starting navigation...');
    page.goto('http://localhost:4200/');           // Doesn't wait!
    
    console.log('2. Trying to click Forms...');
    page.getByText('Forms').click();               // Page might not be loaded yet!
    
    console.log('3. Trying to click Form Layouts...');
    page.getByText('Form Layouts').click();        // Previous click might not be done!
    
    console.log('4. Done! (but probably failed)');
});

// ✅ This test will work correctly - with await
test('with await - WORKING', async ({page}) => {
    console.log('1. Starting navigation...');
    await page.goto('http://localhost:4200/');    // Waits for page to load
    
    console.log('2. Page loaded! Clicking Forms...');
    await page.getByText('Forms').click();        // Waits for click to complete
    
    console.log('3. Forms clicked! Clicking Form Layouts...');
    await page.getByText('Form Layouts').click(); // Waits for click to complete
    
    console.log('4. All done successfully!');
});

// 🔍 Advanced example showing timing
test('timing demonstration', async ({page}) => {
    const start = Date.now();
    
    console.log('Starting...');
    await page.goto('http://localhost:4200/');
    console.log(`Page loaded after ${Date.now() - start}ms`);
    
    await page.getByText('Forms').click();
    console.log(`Forms clicked after ${Date.now() - start}ms`);
    
    await page.getByText('Form Layouts').click();
    console.log(`Form Layouts clicked after ${Date.now() - start}ms`);
});