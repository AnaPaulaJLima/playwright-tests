const {test, expect} =  require('@playwright/test'); 



test('Browser context Playwright test', async ({browser})=>
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

test.only('UI Controls', async ({page})=>
{
   const userName = page.locator('#username');
   const signIn = page.locator('#signInBtn');
   const dropdown = page.locator("select.form-control");
   const documentsReq = page.locator("[href*='documents-request']");

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await dropdown.selectOption("stud");
   await page.locator(".radiotextsty").nth(1).click();
   await page.locator("#okayBtn").click();
   await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
   await page.locator("#terms").click(); 
   await expect(page.locator("#terms")).toBeChecked();
   await page.locator("#terms").uncheck();
   expect(await page.locator("#terms").isChecked()).toBeFalsy();
   await expect(documentsReq).toHaveAttribute('class', 'blinkingText'); 

});

test('Child windows hadl', async({browser})=> 
{
   const context = await browser.newContext(); 
   const page = await context.newPage();
   //const userName = page.locator('#username');
   const documentsReq = page.locator("[href*='documents-request']");

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   const [newPage] = await Promise.all([
      context.waitForEvent('page'), 
      documentsReq.click(),
   ]);

   const text = await newPage.locator(".red").textContent(); 
   const arrayText = text.split("@");
   const domain = arrayText[1].split(".")[0];
   await page.locator('#username').fill(domain);
});