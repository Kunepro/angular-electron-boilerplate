import {
	BrowserWindow,
	Menu,
} from "electron";
import { BUS_Window } from "../constants/bus-window";
import {
	PATH_ASAR_RENDERER,
	PATH_PRELOAD_JS,
} from "../constants/system-folders";
import { UserDbFacade } from "../database/operations/user/user-db.facade";
import Rectangle = Electron.Rectangle;

const BRING_WINDOW_TO_FRONT_ON_START = true;

export class AppWindow {
	private static instance: AppWindow | null = null;
	
	// Prevent external instantiation
	private constructor() {}
	
	// Normally a Singleton would return a reference to the created instance
	// but in this case we are just managing the window lifecycle and the
	// window instance is already exposed via the BUS_Window
	public static create(): void {
		if (!this.instance) {
			this.instance = new AppWindow();
		}
		
		// Initialise the window if it is closed or not yet created
		if (!BUS_Window.getValue()) {
			this.instance.initialize();
		}
	}
	
	private initialize(): void {
		const savedBounds = this.getWindowBounds();
		
		const win = new BrowserWindow({
			width:          savedBounds?.width || 800,
			height:         savedBounds?.height || 600,
			x:              savedBounds?.x,
			y:              savedBounds?.y,
			resizable:      true,
			webPreferences: {
				nodeIntegration:  false,
				contextIsolation: true,
				preload:          PATH_PRELOAD_JS,
			},
			show:           false,
			center:         !savedBounds,
		});
		BUS_Window.next(win);
		
		this.setupWindowEvents(win);
		this.hideTopbarMenu();
		this.openDevToolsIfDevModeIsEnabled(win);
		this.loadRenderer(win);
	}
	
	/**
	 * Encapsulates the window event handlers.
	 */
	private setupWindowEvents(win: BrowserWindow): void {
		win.on(
			"closed",
			() => {
				BUS_Window.next(null);
			},
		);
		
		win.once(
			"ready-to-show",
			() => {
				win.show();
				
				if (BRING_WINDOW_TO_FRONT_ON_START) {
					// Prevent ugly flickering
					setTimeout(
						() => {
							win.minimize();
							win.restore();
						},
						10,
					);
					
					// TODO Possibly better alternatives to test
					// 1) Just focus
					// win.focus();
					// 2) Set always on top
					// win.setAlwaysOnTop(true);
					// win.setAlwaysOnTop(false);
				}
			},
		);
		
		win.on(
			"close",
			() => {
				// Save window size/position for next launch
				this.saveWindowBounds();
			},
		);
	}
	
	private getWindowBounds(): Rectangle | null {
		const bounds = UserDbFacade.config.getWindowsBounds();
		
		return bounds ? this.validatedBounds(bounds) : null;
	}
	
	private validatedBounds(bounds: string): Rectangle | null {
		try {
			const parsedBounds = JSON.parse(bounds);
			if (this.isValidBounds(parsedBounds)) {
				return parsedBounds;
			}
		} catch (error) {
			console.warn(
				"Failed to parse saved window bounds:",
				error,
			);
			UserDbFacade.config.setWindowBounds("");
		}
		
		return null;
	}
	
	private isValidBounds(bounds: Rectangle): boolean {
		return bounds.width > 100 && bounds.height > 100 &&
			bounds.x > -bounds.width && bounds.y > -bounds.height;
	}
	
	private saveWindowBounds(): void {
		const win = BUS_Window.getValue();
		
		if (win) {
			const bounds = win.getBounds();
			
			UserDbFacade.config.setWindowBounds(JSON.stringify(bounds));
		}
	}
	
	// Loads the appropriate renderer (production or dev server).
	private loadRenderer(win: BrowserWindow): void {
		if (process.env.WEBPACK_DEV_SERVER_URL) {
			// Development with hot reload
			win.loadURL(process.env.WEBPACK_DEV_SERVER_URL.trim());
		} else {
			// Production - packaged app
			win.loadFile(PATH_ASAR_RENDERER);
		}
	}
	
	private openDevToolsIfDevModeIsEnabled(win: BrowserWindow): void {
		const isDevModeEnabled = UserDbFacade.config.isDevModeEnabled();
		
		if (isDevModeEnabled) {
			win.webContents.openDevTools();
		}
	}
	
	private hideTopbarMenu(): void {
		// https://stackoverflow.com/a/58548866/600559
		Menu.setApplicationMenu(null);
	}
}
