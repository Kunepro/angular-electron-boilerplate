import {
	BrowserWindow,
	ipcMain,
} from "electron";

export function registerDevToolsHandlers() {
	ipcMain.on(
		"dev-tools",
		(event) => {
			const senderWindow = BrowserWindow.fromWebContents(event.sender);
			
			if (senderWindow) {
				senderWindow.webContents.toggleDevTools();
			}
		},
	);
}
