class LoginPage {

constructor(page){
    this.page = page;
    this.signInButton = page.locator("[value='Login']");
    this.userEmail = page.locator("#userEmail");
    this.passaword = page.locator("#userPassword");

    
}

async goTo(){
    await this.page.goto("https://rahulshettyacademy.com/client");
}

async validLogin(userEmail, passaword){

    await this.userEmail.fill(userEmail);
    await this.passaword.fill(passaword);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');    //dosent work, learn another option for the call request, possibility - products.first().waitFor();
}
}
module.exports = {LoginPage};