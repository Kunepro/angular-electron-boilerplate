import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./e2e",
	testMatch: "**/*.spec.ts",
	fullyParallel: false,
	forbidOnly: !!process.env.CI,
	retries: 0,
	workers: 1,
	timeout: 60000,
	
	// Global setup - runs once before all tests
	globalSetup: './e2e/global-setup.ts',
	
	use: {
		trace: "on-first-retry",
		// Set base URL for all tests
		baseURL: 'http://localhost:4200',
	},
	
	reporter: [
		["html", { open: "always" }],
	],
});
