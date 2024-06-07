const {test, expect, request} =  require('@playwright/test'); 
const {APIUtils} = require('../utils/APiUtils');

const loginPayload = {userEmail:"paulinhasjlima+tests@gmail.com",userPassword:"Testsplay24*"};
const orderPayload = {orders:[{country:"Peru", productOrderedId:"6581ca399fd99c85e8ee7f45"}]};
const fakePayloadOrders = {data:[],message:"No Orders"};
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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
        async route =>{
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders); 
            route.fulfill({
                response,
                body,
            });
        });
    
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent());
    
});