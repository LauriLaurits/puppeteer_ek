const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const config = require('../lib/config')
const click = require('../lib/helpers').click
const typeText = require('../lib/helpers').typeText
const loadUrl = require('../lib/helpers').loadUrl
const waitForText = require('../lib/helpers').waitForText
const pressKey = require('../lib/helpers').pressKey
const shouldExist = require('../lib/helpers').shouldExist

const generateID = require("../lib/utils").generateID
const generateEmail = require("../lib/utils").generateEmail
const generateNumbers = require("../lib/utils").generateNumbers

describe('My first puppeteer test', () => {
	let browser;
	let page;

	beforeAll(async () => {
		jest.setTimeout(20000);
		browser = await puppeteer.launch({
			headless: config.isHeadless,
			slowMo: config.sloMo,
			devtools: config.isDevtools,
			timeout: config.launchTimeout
		});
        page = await browser.newPage();
        //Set Default Timeout
        await page.setDefaultTimeout(config.waitingTimeout)
        // Set Viewport
        await page.setViewport({
			width: config.viewportWidth,
			height: config.viewportHeight,
		});
	});

	afterAll(async () => {
		console.log('Close Browser');
		await browser.close();
	});

	it('My first test step', async () => {
        //await page.goto(config.baseUrl);
        await loadUrl(page, config.baseUrl)
        //await page.waitForSelector('#search');
        await shouldExist(page, "#search")
		const url = await page.url();
		const title = await page.title();
        console.log('Url: ' + url + 'Title: ' + title);
        await page.screenshot({path: 'example2.png'})
		expect(url).to.contain('staging');
		expect(title).to.contains('e-apteek');
	});
	it('Browser reload', async () => {
		await page.reload();
        //await page.waitForSelector('#maincontent');
        await shouldExist(page, "#maincontent")
        await waitForText(page, '.columns .block-title > strong', 'Populaarsed tooted')
		const url = await page.url();
		const title = await page.title();
		// await page.waitFor(3000) Bad preactice only for debug
		expect(url).to.contain('staging');
		expect(title).to.contains('e-apteek');
	});

	it('Click Method with Helpers', async () => {
		/* await page.waitForSelector('#registration_link');
		await page.click(
			'#registration_link' /* {
            button: "left",
            clickCount: 5,
        }
		); */
		/*   await page.waitForSelector('.form-customer-login cols tablet-noflex separated')
        const url = await page.url()
        expect(url).to.contain('staging') */
	});

	it('submit smartID', async () => {
        await loadUrl(page, config.baseUrl)
        await click(page, '#registration_link')
        await click(page, '[href="#login-smartid"]')
       // await typeText(page, '38610102716', '#smart-id-input')
        await typeText(page, generateNumbers(15), '#smart-id-input')
        await pressKey(page, "Enter")
		await page.waitFor(5000);
	});
});
