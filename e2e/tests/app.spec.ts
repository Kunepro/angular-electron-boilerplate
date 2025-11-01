import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';

test('Renderer loads with app title', async () => {
	const app = await electron.launch({
		args: ['.'],
		env: {
			...process.env,
			WEBPACK_DEV_SERVER_URL: 'http://localhost:4200'
		},
		timeout: 60000,
	});
	
	const window = await app.firstWindow();
	
	await window.waitForSelector('body', { state: 'visible', timeout: 30000 });
	
	const titleElement = await window.locator('h1.example-app-name');
	await expect(titleElement).toBeVisible();
	await expect(titleElement).toHaveText('angular-electron-sqlite-boilerplate');
	
	await app.close();
});
