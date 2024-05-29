const {test, expect} = require('@playwright/test')

test ('Security test request interception', async({page}) =>{

    const email = "paulinhasjlima+tests@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client"); 
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Testsplay24*");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle'); 
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", 
        route=>route.continue({
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=b1885d2e-14ff-42c4-96d7-17df8e523619'
        })
    )
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})