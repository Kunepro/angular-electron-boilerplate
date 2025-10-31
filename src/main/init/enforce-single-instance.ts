import { app } from "electron";

export function enforceSingleInstance(): boolean {
	const gotTheLock = app.requestSingleInstanceLock();
	if (!gotTheLock) {
		app.quit();
		return false;
	}
	return true;
}
