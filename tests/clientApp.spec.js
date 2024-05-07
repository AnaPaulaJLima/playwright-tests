const {test, expect} =  require('@playwright/test'); 



test('Client App Login', async ({page})=>
{
    const email = "paulinhasjlima+tests@gmail.com";
    const products = page.locator(".card-body b");
    

    await page.goto("https://rahulshettyacademy.com/client"); 
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Testsplay24*");
    await page.locator("[value='Login']").click();
    //await page.waitForLoadState('networkidle');    dosent work, learn another option for the call request 
    await products.first().waitFor();
    
});