const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

describe('Snapshot Test', () => {
	let browser;
	let page;

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: true
		});
		page = await browser.newPage();
	});

	afterAll(async () => {
		await browser.close();
	});

	test('Homepage snapshot', async () => {
        await page.goto('https://www.staging.apotheka.ee');
        const logo = await page.waitForSelector('.content [alt="Apotheka Netiapteek"]');
		const image = await logo.screenshot();
		expect(image).toMatchImageSnapshot({
			//move to config
			failureThreshold: '0.15',
			failureThresholdType: 'percent'
		});
	});
	test('should test homepage header ', async () => {
		await page.goto('https://www.staging.apotheka.ee');
		const header = await page.waitForSelector('.header.content');
		const image = await header.screenshot();
		expect(image).toMatchImageSnapshot({
			//move to config
			failureThreshold: '0.01',
			failureThresholdType: 'percent'
		});
    });
    test('should test homepage navigation ', async () => {
		await page.goto('https://www.staging.apotheka.ee');
		const navigation= await page.waitForSelector('.nav-sections');
		const image = await navigation.screenshot();
		expect(image).toMatchImageSnapshot({
			//move to config
			failureThreshold: '0.01',
			failureThresholdType: 'percent'
		});
	});
});
