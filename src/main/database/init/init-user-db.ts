import { Database } from "better-sqlite3";
import {
	KEY_USER_DB_DEBUGGING_ENABLED,
	KEY_USER_DB_DEV_MODE,
	KEY_USER_DB_WINDOW_BOUNDS,
} from "../../constants/database-user-keys";

export function initUserDb(db: Database) {
	db.transaction(() => {
		// Create the key/value table
		db.exec(`
        CREATE TABLE IF NOT EXISTS config
        (
            settingKey   TEXT PRIMARY KEY, -- e.g. 'devMode', 'windowBounds'...
            settingValue TEXT              -- the user’s settings for that key
        );
		`);
		
		// Seed devMode setting with false by default
		db.exec(`
        INSERT OR IGNORE INTO config (settingKey, settingValue)
        VALUES ('${ KEY_USER_DB_DEV_MODE }', 'false');
		`);
		
		// Seed debuggingEnabled setting with false by default
		db.exec(`
        INSERT OR IGNORE INTO config (settingKey, settingValue)
        VALUES ('${ KEY_USER_DB_DEBUGGING_ENABLED }', 'false');
		`);
		
		// Seed windowBounds setting with null by default
		db.exec(`
        INSERT OR IGNORE INTO config (settingKey, settingValue)
        VALUES ('${ KEY_USER_DB_WINDOW_BOUNDS }', null);
		`);
	})();
}
