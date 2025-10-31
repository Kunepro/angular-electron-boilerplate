import { mkdirSync } from "fs";
import {
	PATH_DATA,
	PATH_LOGS,
} from "../constants/system-folders";

// Ensure the data folder exists
mkdirSync(
	PATH_DATA,
	{ recursive: true },
);
// Ensure the logs directory exists
mkdirSync(
	PATH_LOGS,
	{ recursive: true },
);
