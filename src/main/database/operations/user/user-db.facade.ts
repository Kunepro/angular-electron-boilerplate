import { getIsDebuggingEnabled } from "./config/debugging";
import { getIsDevModeEnabled } from "./config/dev-mode";
import {
	getWindowBounds,
	setWindowBounds,
} from "./config/window-bounds";

export class UserDbFacade {
	public static config = {
		isDevModeEnabled: (): boolean => {
			return getIsDevModeEnabled();
		},
		
		isDebuggingModeEnabled: (): boolean => {
			return getIsDebuggingEnabled();
		},
		
		setWindowBounds: (bounds: string): void => {
			setWindowBounds(bounds);
		},
		
		getWindowsBounds: (): string | null | undefined => {
			return getWindowBounds();
		}
	};
}
