class DashboardPage{

constructor(page){
    this.page = page;
    this.products = page.locator(".card-body");
    this.productText = this.products.locator("b");
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
}

async searchProductAddCard (productName){
    const titiles = await this.productText.allTextContents();
    const count = await this.products.count();
    for (let i=0; i < count; ++i)
    {
      if (await this.products.nth(i).locator("b").textContent() === productName){
            await this.products.nth(i).locator("[class='btn w-10 rounded']").click();
            break;
      }  
    }
}

async navegateToCart(){
    await this.cart.click();
}

async navigateToOrders(){
    await this.orders.click();
}

}
module.exports = {DashboardPage};