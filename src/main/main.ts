import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
} from 'electron';
import * as os from 'os';
import * as path from 'path';
import { DtoSystemInfo } from '../ipc-dtos/dtosysteminfo';

const BRING_WINDOW_TO_FRONT_ON_START = true;

let win: BrowserWindow | null = null;

app.on(
  'ready',
  createWindow,
);

app.on(
  'activate',
  () => {
    if (win === null) {
      createWindow();
    }
  },
);

async function createWindow(): Promise<void> {
  win = new BrowserWindow({
    width:          1680,
    height:         900,
    resizable:      true,
    webPreferences: {
      // Disabled Node integration
      nodeIntegration: false, // defaults to false, left here for sanity
      // protect against prototype pollution
      contextIsolation: true, // defaults to true, left here for sanity
      // Preload script
      preload: path.join(
        app.getAppPath(),
        'dist/preload',
        'preload.js',
      ),
      // TODO optional: adding `devTools: false` for production if prod build
    },
    show:           false, // Will be made visible after page has been fully loaded for the first ime
  });
  
  hideTopbarMenu();
  
  openDevToolsIfDevModeIsEnabled(win);
  
  win.once(
    'ready-to-show',
    () => {
      if (win) {
        win.show();
        if (BRING_WINDOW_TO_FRONT_ON_START) {
          // Prevent ugly flickering
          setTimeout(
            () => {
              win?.minimize();
              win?.restore();
            },
            10,
          );
        }
      }
    },
  );
  
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL.trim());
  } else {
    await win.loadFile(
      path.join(
        app.getAppPath(),
        'dist/renderer',
        'index.html',
      ),
    );
  }
  
  win.on(
    'closed',
    () => {
      win = null;
    },
  );
}

function hideTopbarMenu(): void {
  // https://stackoverflow.com/a/58548866/600559
  Menu.setApplicationMenu(null);
}

function openDevToolsIfDevModeIsEnabled(win: BrowserWindow): void {
  win.webContents.openDevTools();
}

ipcMain.on(
  'dev-tools',
  () => {
    if (win) {
      win.webContents.toggleDevTools();
    }
  },
);

ipcMain.on(
  'request-systeminfo',
  () => {
    const systemInfo       = new DtoSystemInfo();
    systemInfo.Arch        = os.arch();
    systemInfo.Hostname    = os.hostname();
    systemInfo.Platform    = os.platform();
    systemInfo.Release     = os.release();
    const serializedString = systemInfo.serialize();
    if (win) {
      win.webContents.send(
        'systeminfo',
        serializedString,
      );
    }
  },
);
