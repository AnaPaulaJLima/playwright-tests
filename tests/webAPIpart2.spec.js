const {test, expect} =  require('@playwright/test'); 

let webContext;
test.beforeAll(async ({browser}) =>{

    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "paulinhasjlima+tests@gmail.com";
     
    await page.goto("https://rahulshettyacademy.com/client"); 
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Testsplay24*");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');    //dosent work, learn another option for the call request, possibility - products.first().waitFor();
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
})


test('Client App Login', async ()=>
{
    const email = "paulinhasjlima+tests@gmail.com";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client"); 
    const products = await page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    const countryName = 'Brazil';
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
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("bra");
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount= await dropdown.locator("button").count();
    for(let i =0; i < optionsCount; ++i){
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text.trim() === countryName){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i =0; i < await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent(); 
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("[class*='btn-primary']").click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

test('Test case 2 ', async ()=>
    {
        const email = "paulinhasjlima+tests@gmail.com";
        const page = await webContext.newPage();
        await page.goto("https://rahulshettyacademy.com/client"); 
        const products = await page.locator(".card-body");
        const productName = 'ZARA COAT 3';
        const countryName = 'Brazil';
        const titiles = await products.locator("b").allTextContents();
        console.log(titiles);
    });