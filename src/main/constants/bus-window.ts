import { BrowserWindow } from "electron";
import { BehaviorSubject } from "rxjs";

export const BUS_Window = new BehaviorSubject<BrowserWindow | null>(null);
