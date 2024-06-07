// @ts-check
const { devices } = require('@playwright/test');
// const { config } = require('process');


//module.exports = defineConfig({
  const config = {
  testDir: './tests',
  retries: 1,
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
        headless: true,
        screenshot : 'off', 
        trace: 'retrain-on-failure', //off,on
        ...devices['iPhone 14 Pro Max'],
      }
    }, 
    {
      name: 'chrome', 
      use: {
        browserName: 'chromium', 
        headless: true,
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