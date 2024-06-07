const {test, expect, request} =  require('@playwright/test'); 
const {APIUtils} = require('../utils/APiUtils');

const loginPayload = {userEmail:"paulinhasjlima+tests@gmail.com",userPassword:"Testsplay24*"};
const orderPayload = {orders:[{country:"Peru", productOrderedId:"6581ca399fd99c85e8ee7f45"}]};

let response;

test.beforeAll( async ()=>{

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils (apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Place the order', async ({page})=>
{

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/"); 

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i =0; i < await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent(); 
        if(response.orderId.includes(rowOrderId)){
            await rows.nth(i).locator("[class*='btn-primary']").click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});