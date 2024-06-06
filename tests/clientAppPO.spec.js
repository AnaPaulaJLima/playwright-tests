const {test, expect} =  require('@playwright/test'); 
const {POManager} = require('../pageObjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require ('../utils/placeOrderTestData.json')));


test('Client App Login', async ({page})=>
{
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const ordersReviewPage = poManager.getOrdersReviewPage();
   
    await loginPage.goTo();
    await loginPage.validLogin(dataSet.userEmail,dataSet.passaword);

    await dashboardPage.searchProductAddCard (dataSet.productName);
    await dashboardPage.navegateToCart();

    await cartPage.VerifyProductIsDisplayed(dataSet.productName);
    await cartPage.Checkout();

    await ordersReviewPage.searchCountryAndSelect(dataSet.countryCode,dataSet.countryName);
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    await dashboardPage.navigateToOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});