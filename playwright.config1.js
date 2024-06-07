// @ts-check
const { devices } = require('@playwright/test');
// const { config } = require('process');


//module.exports = defineConfig({
  const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  reporter: 'html',
  projects:[
    {
      name: 'safari', 
      use: {
        browserName: 'webkit', 
        headless: false,
        screenshot : 'off', 
        trace: 'retrain-on-failure', //off,on
        ...devices['iPhone 14 Pro Max'],
      }
    }, 
    {
      name: 'chrome', 
      use: {
        browserName: 'chromium', 
        headless: false,
        screenshot : 'on', 
        ignoreHttpsErrors: true,
        permissions:['geolocation'],
        video: 'retain-on-failure',
        trace: 'on', //off,on
        viewport : {width:720,height:720} //for example --> mobile view 
      }
    }
    

  ]
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
 


};
 
module.exports = config