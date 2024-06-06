const {test, expect} =  require('@playwright/test'); 
const {POManager} = require('../pageObjects/POManager');


test('Client App Login', async ({page})=>
{
    const poManager = new POManager(page);
    const userEmail = "paulinhasjlima+tests@gmail.com";
    const productName = 'ZARA COAT 3';
    const countryCode = 'bra';
    const countryName = 'Brazil';
    const passaword = "Testsplay24*";
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const ordersReviewPage = poManager.getOrdersReviewPage();
   
    await loginPage.goTo();
    await loginPage.validLogin(userEmail,passaword);

    await dashboardPage.searchProductAddCard (productName);
    await dashboardPage.navegateToCart();

    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    await ordersReviewPage.searchCountryAndSelect(countryCode,countryName);
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    await dashboardPage.navigateToOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});