import { ipcMain } from "electron";
import * as os from "os";
import { DtoSystemInfo } from "../../ipc-dtos/dtosysteminfo";

export function registerSystemInfoHandlers() {
	ipcMain.on(
		'request-systeminfo',
		(event) => {
			const systemInfo       = new DtoSystemInfo();
			systemInfo.Arch        = os.arch();
			systemInfo.Hostname    = os.hostname();
			systemInfo.Platform    = os.platform();
			systemInfo.Release     = os.release();
			
			event.reply('systeminfo', systemInfo.serialize());
		},
	);
}
