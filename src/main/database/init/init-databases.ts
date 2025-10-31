import Database from "better-sqlite3";
import { PATH_USER_DB } from "../../constants/system-folders";
import { BUS_Database } from "../database";
import { initUserDb } from "./init-user-db";

// Open (or create) user_data.db and attach anime_data.db and series_hydration.db
export function initDatabases() {
	const db = new Database(PATH_USER_DB);
	
	db.pragma("journal_mode = WAL");
	db.pragma("synchronous = NORMAL");
	db.pragma("temp_store = MEMORY");
	db.pragma("cache_size = -8192");
	db.pragma("locking_mode = NORMAL");
	db.pragma("foreign_keys = ON");
	db.pragma("mmap_size = 268435456");
	db.pragma("busy_timeout = 5000");
	
	initUserDb(db);
	
	BUS_Database.next(db);
	
	return db;
}
