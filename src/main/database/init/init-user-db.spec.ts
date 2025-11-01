import { Database } from "better-sqlite3";
import { initUserDb } from "./init-user-db";
import { describe, expect, test, beforeEach, jest } from '@jest/globals';

// Mock better-sqlite3
jest.mock(
	"better-sqlite3",
	() => {
		return {
			Database: jest.fn().mockImplementation(() => ({
				transaction: jest.fn().mockReturnValue(() => ({})),
				exec:        jest.fn(),
			})),
		};
	},
);

// Mock the keys
jest.mock(
	"../../constants/database-user-keys",
	() => ({
		KEY_USER_DB_DEV_MODE:          "devMode",
		KEY_USER_DB_DEBUGGING_ENABLED: "debuggingEnabled",
		KEY_USER_DB_WINDOW_BOUNDS:     "windowBounds",
	}),
);

describe(
	"initUserDb",
	() => {
		let mockDb: jest.Mocked<Database>;
		let mockTransaction: jest.Mock;
		
		beforeEach(() => {
			jest.clearAllMocks();
			
			mockTransaction = jest.fn().mockImplementation((callback) => {
				return () => (callback as () => void)();
			});
			
			mockDb = {
				transaction: mockTransaction,
				exec:        jest.fn(),
			} as unknown as jest.Mocked<Database>;
		});
		
		test(
			"should execute transaction with config table creation",
			() => {
				initUserDb(mockDb);
				
				expect(mockTransaction).toHaveBeenCalledTimes(1);
				expect(mockDb.exec).toHaveBeenCalled();
			},
		);
		
		test(
			"should create config table with correct SQL",
			() => {
				initUserDb(mockDb);
				
				const execCalls = mockDb.exec.mock.calls;
				
				const createTableCall = execCalls.find(call =>
					call[ 0 ].includes(`CREATE TABLE IF NOT EXISTS config`),
				);
				
				expect(createTableCall).toBeDefined();
				
				const sql = createTableCall?.[ 0 ];
				expect(sql).toContain("CREATE TABLE IF NOT EXISTS config");
				expect(sql).toContain("settingKey");
				expect(sql).toContain("TEXT PRIMARY KEY");
				expect(sql).toContain("settingValue");
				expect(sql).toContain("TEXT");
			},
		);
		
		test(
			"should insert default values for devMode, debuggingEnabled, and windowBounds",
			() => {
				initUserDb(mockDb);
				
				const execCalls        = mockDb.exec.mock.calls;
				const insertStatements = execCalls.filter(call => call[ 0 ].includes("INSERT OR IGNORE INTO config"));
				
				expect(insertStatements.length).toBe(3);
				expect(insertStatements.some(call => call[ 0 ].includes("'devMode', 'false'"))).toBe(true);
				expect(insertStatements.some(call => call[ 0 ].includes("'debuggingEnabled', 'false'"))).toBe(true);
				expect(insertStatements.some(call => call[ 0 ].includes("'windowBounds', null"))).toBe(true);
			},
		);
		
		test(
			"should use transaction properly",
			() => {
				const mockCallback = jest.fn();
				mockTransaction.mockReturnValue(mockCallback);
				
				initUserDb(mockDb);
				
				expect(mockTransaction).toHaveBeenCalledWith(expect.any(Function));
				expect(mockCallback).toHaveBeenCalled();
			},
		);
	},
);
