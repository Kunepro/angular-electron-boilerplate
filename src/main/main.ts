import { app } from "electron";
import { initDatabases } from "./database";
import { AppWindow } from "./init/app-window";
import { enforceSingleInstance } from "./init/enforce-single-instance";
import { registerAppEvents } from "./init/register-app-events";
import { registerIpcMainHandlers } from "./ipc-handlers";

/**
 * Executed immediately before app is ready
 * Ensure required folders and error handlers are registered before anything else
 */
// Ensure required folders exist
import "./init/create-folders";
// Register unhandled errors event handlers
import "./init/register-error-handlers";

/**
 * Sequential execution of app initialisation
 */
app.whenReady().then(() => {
	// Ensure only one instance of the app is running, quit if not
	if (!enforceSingleInstance()) return;
	
	initDatabases();
	registerIpcMainHandlers();
	AppWindow.create();
	registerAppEvents();
});
