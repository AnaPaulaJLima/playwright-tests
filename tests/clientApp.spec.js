const {test, expect} =  require('@playwright/test'); 



test('Client App Login', async ({page})=>
{
    const email = "paulinhasjlima+tests@gmail.com";
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    

    await page.goto("https://rahulshettyacademy.com/client"); 
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Testsplay24*");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');    //dosent work, learn another option for the call request, possibility - products.first().waitFor();
    const titiles = await products.locator("b").allTextContents();
    const count = await products.count();
    for (let i=0; i < count; ++i)
    {
      if (await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("[class='btn w-10 rounded']").click();
            break;
      }  
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
});