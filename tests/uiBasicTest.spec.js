const {test, expect} =  require('@playwright/test'); 



test.only('Browser context Playwright test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTittles =  page.locator(".card-body a");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await page.title();
   await userName.fill("learning");
   await page.locator("[type='password']").fill("learning");
   await signIn.click();
   await page.locator("[style*='block']").textContent();
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');

   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   await signIn.click();
   await cardTittles.first().textContent();
   console.log(await cardTittles.nth(2).textContent());
   const allTittles = await cardTittles.allTextContents();
   console.log(allTittles);

});

test('Page Playwright test', async ({page})=>
{
   await page.goto("https://google.com");
   await expect(page).toHaveTitle("Google");
});