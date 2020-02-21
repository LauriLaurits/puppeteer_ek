const puppeteer = require('puppeteer');
const expect = require('chai').expect

(async () => {
  const browser = await puppeteer.launch({
      headless: false
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1200,
    deviceScaleFactor: 1,
  });

  await page.goto('https://staging.apotheka.ee');
  await page.waitForSelector('#registration_link')
  await page.click('#registration_link')
  await page.waitForSelector('#mobile-id-input')
  await page.click('[href="\#login-smartid"]')

  // Get the "viewport" of the page, as reported by the page.
  await page.type('#smart-id-input', '38610102716')
  /* const submitSmartId = await page.$('button') */
  await page.click('#smartid-submit')


 /*  await Promise.all([
    page.waitForNavigation(), // The promise resolves after navigation has finished
    page.click('#smartid-submit'), // Clicking the link will indirectly cause a navigation
  ]);
 */
  await page.screenshot({path: 'example2.png'})


  await browser.close();
});