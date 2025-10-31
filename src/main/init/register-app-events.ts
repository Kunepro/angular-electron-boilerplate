import { app } from "electron";
import { BUS_Window } from "../constants/bus-window";
import { BUS_Database } from "../database/database";
import { AppWindow } from "./app-window";

export function registerAppEvents() {
	// Create window on app activation if none exist (macOS)
	app.on(
		"activate",
		(event, hasVisibleWindows) => {
			const win = BUS_Window.getValue();
			
			if (!hasVisibleWindows && win === null) {
				AppWindow.create();
			}
		},
	);

	// Close database connection on app exit
	app.on(
		"before-quit",
		() => {
			const db = BUS_Database.getValue();
			
			if (db) db.close();
		},
	);

	// Quit app on all windows closed
	app.on(
		"window-all-closed",
		() => {
			// On macOS, keep the app running until the user explicitly quits
			if (process.platform !== "darwin") {
				app.quit();
			}
		},
	);
}
