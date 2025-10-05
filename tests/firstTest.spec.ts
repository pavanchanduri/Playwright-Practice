import {test} from '@playwright/test';

test.beforeEach(async({page})=> {
    await page.goto('http://localhost:4200')
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

test('User facing locators', async({page})=> {
    await page.getByRole('textbox', {name: 'Email'}).first().click()
    await page.getByRole('button', {name: 'Sign in'}).first().click()
    await page.getByPlaceholder('Jane Doe').click();
    await page.getByText('Sign in').first().click();
    await page.getByTitle('IoT Dashboard').click();
});