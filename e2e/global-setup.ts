import { spawn } from 'child_process';
import waitOn from 'wait-on';

export default async function globalSetup() {
	// Start Angular dev server
	const serverProcess = spawn('npx', ['ng', 'serve', '--no-hmr'], {
		stdio: 'inherit',
		shell: true,
	});
	
	// Wait for server to be ready
	await waitOn({
		resources: ['tcp:localhost:4200'],
		timeout: 30000,
	});
	
	console.log('Angular dev server ready');
	
	// Return teardown function
	return async () => {
		serverProcess.kill();
	};
}
