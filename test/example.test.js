// Core Packages
const puppeteer = require('puppeteer');
const expect = require('chai').expect;
// Helper Functions
const config = require('../lib/config');
const click = require('../lib/helpers').click;
const typeText = require('../lib/helpers').typeText;
const loadUrl = require('../lib/helpers').loadUrl;
const waitForText = require('../lib/helpers').waitForText;
const pressKey = require('../lib/helpers').pressKey;
const shouldExist = require('../lib/helpers').shouldExist;
// Util functions
const generateID = require('../lib/utils').generateID;
const generateEmail = require('../lib/utils').generateEmail;
const generateNumbers = require('../lib/utils').generateNumbers;

describe('Login Tests', () => {
	let browser;
	let page;

	beforeAll(async () => {
		jest.setTimeout(40000);
		browser = await puppeteer.launch({
			headless: config.isHeadless,
			slowMo: config.sloMo,
			devtools: config.isDevtools,
			timeout: config.launchTimeout
		});
		page = await browser.newPage();
		//Set Default Timeout
		page.setDefaultTimeout(config.waitingTimeout);
		// Set Viewport
		await page.setViewport({
			width: config.viewportWidth,
			height: config.viewportHeight
		});
	});

	afterAll(async () => {
		console.log('Close Browser');
		await browser.close();
	});
	beforeEach(async () => {
		console.log("Before each");
	})

	const REGISTRATION_LINK = '#registration_link';
	describe('Feedback', () => {
		it('should navigate to register/login page for feedback ', async () => {
			await loadUrl(page, config.baseUrl);
			await shouldExist(page, '#contact-form-trigger');
			await click(page, '#contact-form-trigger');
			await shouldExist(page, '#contact-form');
		});
		it('should fill out Feedback form and submit with correct data ', async () => {
			await typeText(page, 'Lauri', '#name');
			await typeText(page, 'lauri@upitech.ee', '#email');
			await typeText(page, generateNumbers(9), '#telephone');
			await typeText(page, generateID(100), '#comment');
			await page.select('select[name="age"]', '23');
			await page.select('select[name="gender"]', 'Mees');
			await shouldExist(page, '.contact-form-popup .actions-toolbar span');
			await page.screenshot({ path: 'example2.png' });
			await click(page, '.contact-form-popup .actions-toolbar span');
			await waitForText(
				page,
				'body',
				'Täname Sind pöördumise eest! Vastame Sulle esimesel võimalusel, kuid mitte hiljem kui 24h jooksul.'
			);
		});
	});

	describe('Login Test for Mobile ID', () => {
		it('should navigate to register/login page ', async () => {
			await loadUrl(page, config.baseUrl);
			await shouldExist(page, REGISTRATION_LINK);
		});
		it('should click on the register/login button ', async () => {
			await click(page, REGISTRATION_LINK);
			await shouldExist(page, '.form-customer-login');
		});
		it('should enter credentials for Mobile-ID', async () => {
			await typeText(page, '37200007', '#mobile-id-input');
			await shouldExist(page, '#mobileid-submit');
			await click(page, '#mobileid-submit');
			await shouldExist(page, '#mobileid-verification');
		});
	});
	describe('Login Test for SMART-ID', () => {
		it('should navigate to register/login page ', async () => {
			await loadUrl(page, config.baseUrl);
			await shouldExist(page, REGISTRATION_LINK);
		});
		it('should click on the register/login button ', async () => {
			await click(page, REGISTRATION_LINK);
			await shouldExist(page, '.form-customer-login');
			await click(page, '[href="#login-smartid"]');
			await shouldExist(page, '#smart-id-input');
		});
		it('should enter credentials for ID-Card', async () => {
			await typeText(page, '38610102716', '#smart-id-input');
			await shouldExist(page, '#smartid-submit');
			await click(page, '#smartid-submit');
			await shouldExist(page, '#smartid-verification');
		});
	});
});

/* 	it('My first test step', async () => {
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
        expect(url).to.contain('staging') 
	});

	it('submit smartID', async () => {
        await loadUrl(page, config.baseUrl)
        await click(page, '#registration_link')
        await click(page, '[href="#login-smartid"]')
       // await typeText(page, '38610102716', '#smart-id-input')
        await typeText(page, generateNumbers(15), '#smart-id-input')
        await pressKey(page, "Enter")
		await page.waitFor(5000);
    }); */

/* describe('Feedback test', () => {
    it('should navigate to homepage and open Feedback', async () => {
        await loadUrl(page, config.baseUrl);
        await shouldExist(page, REGISTRATION_LINK);
        /*  await click(page, '#contact-form-trigger')
        await shouldExist(page, '#contact-form') 
    });
});
 */
