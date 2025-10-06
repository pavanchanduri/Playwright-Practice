import {test, expect} from '@playwright/test';

test.beforeEach(async({page})=> {
    await page.goto('http://localhost:4200')
    await page.getByTitle('IoT Dashboard').click();
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();

});

test.skip('Locator Syntax Rules', async ({page}) => {
    
    // tagname
    page.locator('input')

    // #id
    await page.locator('#inputEmail1').click()

    // .classname
    page.locator('.shape-rectangle')

    // [attribute="value"]
    page.locator('[placeholder="Email"]')

    // tagname[attribute="value"]
    page.locator('input[placeholder="Email"]')

    //xpath
    page.locator('//input[@placeholder="Email"]')

    // text=content
    page.locator(':text-is("Using the Grid")')

    //partial text
    page.locator(':text("Using")')
});

test.skip('User facing locators', async({page})=> {
    await page.getByRole('textbox', {name: 'Email'}).first().click()
    await page.getByRole('button', {name: 'Sign in'}).first().click()
    await page.getByPlaceholder('Jane Doe').click();
    await page.getByText('Sign in').first().click();
    await page.getByTestId('SignIn').click();
});

test.skip('Locating child elements', async({page})=> {
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click();
    await page.locator('nb-card').nth(3).getByRole('button').click();
})

test('Locating Parent elements', async({page})=> {
    /**
     * 1. Locates element based on text and then locates child element
     * 2. Locates element based on child element
     * 3. Locates element based on filter and then locates child element
     * 4. a. Locate all nb-card elements
     *    b. Filter nb-card elements that have checkboxes in them
     *    c. Filter nb-card elements that have Sign in button in them
     *    d. Get and set the password field from the filtered nb-card elements
     */
    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'}).fill('test@gmail.com');
    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name: 'Email'}).fill('test123@gmail.com');
    await page.locator('nb-card').filter({has: page.locator('.checkbox')})
            .filter({hasText: 'Sign in'}).getByRole('textbox', {name: 'Password'}).fill('test123');
})

test.skip('Reusing Locators', async({page})=> {
    const form = page.locator('nb-card').filter({hasText: 'Basic form'})
    await form.getByRole('textbox', {name: 'Email'}).fill('test123@gmail.com');
    await form.getByRole('textbox', {name: 'Password'}).fill('test123');
    await form.locator('nb-checkbox').click();
    await form.getByRole('button').click();

    // Assertions using expect
    await expect(form.getByRole('textbox', {name: 'Email'})).toHaveValue('test123@gmail.com');
    await expect(form.getByRole('textbox', {name: 'Password'})).toHaveValue('test123');
})

/**
 * 1. Locate and filter the basic form nb-card
 * 2. Locate the Submit button
 * 3. Get the text content and assert
 */
test('Extracting text', async({page})=> {
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const email = await basicForm.locator('button').textContent();
    expect(email).toEqual('Submit');

    const allRadioButtons = await page.locator('nb-radio').allTextContents();
    expect(allRadioButtons).toContain('Option 1');
})