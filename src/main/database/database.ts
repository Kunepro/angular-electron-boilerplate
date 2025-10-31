import { Database } from "better-sqlite3";
import { BehaviorSubject } from "rxjs";

export const BUS_Database = new BehaviorSubject<Database | null>(null);
