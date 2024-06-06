const {test, expect} =  require('@playwright/test'); 
const {customtest} = require ('../utils/test-base');
const {POManager} = require('../pageObjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require ('../utils/placeOrderTestData.json')));

for(const data of dataSet){
test(`Client App Login for ${data.productName}`, async ({page})=>
{
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const ordersReviewPage = poManager.getOrdersReviewPage();
   
    await loginPage.goTo();
    await loginPage.validLogin(data.userEmail,data.passaword);

    await dashboardPage.searchProductAddCard (data.productName);
    await dashboardPage.navegateToCart();

    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    await ordersReviewPage.searchCountryAndSelect(data.countryCode,data.countryName);
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    await dashboardPage.navigateToOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
}

customtest.only(`Client App Login for`, async ({page,testDataForOrder})=>
    {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const ordersReviewPage = poManager.getOrdersReviewPage();
       
        await loginPage.goTo();
        await loginPage.validLogin(testDataForOrder.userEmail,testDataForOrder.passaword);
    
        await dashboardPage.searchProductAddCard (testDataForOrder.productName);
        await dashboardPage.navegateToCart();
    
        await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
        await cartPage.Checkout();
});
