const base =  require('@playwright/test'); 

exports.customtest = base.test.extend({

    testDataForOrder : {
        userEmail : "paulinhasjlima+tests@gmail.com",
        passaword : "Testsplay24*",
        productName: "ZARA COAT 3",
        countryCode : "bra",
        countryName : "Brazil"
    }
})