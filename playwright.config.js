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
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium', 
    headless: false,
    screenshot : 'on', 
    trace: 'retrain-on-failure', //off,on

  },


};
 
module.exports = config