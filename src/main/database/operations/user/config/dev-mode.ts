import { KEY_USER_DB_DEV_MODE } from "../../../../constants/database-user-keys";
import { getDatabase } from "../../../utils/get-db";

interface BooleanSettingValue {
	settingValue: "true" | "false" | null | undefined;
}

// Note: No setter function is provided as devMode is read-only from the application
// It can only be modified by directly accessing the database
export function getIsDevModeEnabled(): boolean {
	const db = getDatabase();
	
	const result = db
		.prepare(
			`SELECT settingValue FROM config WHERE settingKey = ?;`,
		)
		.get(KEY_USER_DB_DEV_MODE) as BooleanSettingValue;
	
	return result?.settingValue === "true";
}
