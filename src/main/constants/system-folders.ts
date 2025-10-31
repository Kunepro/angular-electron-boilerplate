import { app } from "electron";
import { join } from "path";

export const PATH_USER_DATA  = app.getPath("userData");
export const PATH_USER_DB    = join(
	PATH_USER_DATA,
	"data",
	"user_data.db",
);
export const PATH_PRELOAD_JS = join(
	app.getAppPath(),
	"dist/preload",
	"preload.js",
);
export const PATH_DATA       = join(
	PATH_USER_DATA,
	"data",
);
export const PATH_LOGS          = join(
	PATH_USER_DATA,
	"logs",
);
export const PATH_ASAR_RENDERER = join(
	process.resourcesPath,
	"app.asar",
	"dist/renderer/browser",
	"index.html",
);
