import { registerDevToolsHandlers } from "./dev-tools";
import { registerSystemInfoHandlers } from "./system-info";

/**
 * Registers all IPC main handlers by delegating to domain-specific handler registrations
 */
export function registerIpcMainHandlers(): void {
	registerSystemInfoHandlers();
	registerDevToolsHandlers();
}
