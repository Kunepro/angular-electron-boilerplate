# angular-electron-boilerplate

This template provides a starting point for a modern and secure Electron app with Angular, enhanced features, updated dependencies, and SQLite integration using better-sqlite3.

## Screenshots
![Screenshots](/images/modern-electron-screenshots.png)

## Project Goals

Use [Angular](https://angular.io/) (v20.3) for the Electron renderer process, leveraging a modern frontend framework to organize complex codebases. The [Angular CLI](https://cli.angular.io/) is used to generate components, routes, services, and pipes. For a modern look-and-feel, [Angular Material](https://material.angular.io/) is included, which can be removed if not needed. The app now uses SCSS instead of CSS for improved styling capabilities.

Use [TypeScript](https://www.typescriptlang.org/) for strongly-typed JavaScript, with components migrated to standalone architecture (no modules) and Angular configured to be zone-less for improved performance.

Use [webpack](https://webpack.js.org/) to bundle *main*, *preload*, and *renderer* processes, producing small, fast build outputs. The */node_modules* folder is excluded from builds to optimize size and speed.

Implement **Hot Module Reload (HMR)** for faster development, enabling real-time updates during local development.

Use secure Electron settings: `contextIsolation`, disabled `nodeIntegration`, and disabled `enableRemoteModule`. The preload script uses `contextBridge` for secure communication.

Switch from TSLint to ESLint for linting, with fixed test and linting suites to ensure code quality.

Integrated SQLite support using [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) for efficient local database operations.

## License
This project is licensed under the [MIT License](https://github.com/frederiksen/angular-electron-boilerplate/blob/master/LICENSE).

## CI
![CI](https://github.com/frederiksen/angular-electron-boilerplate/workflows/CI/badge.svg)

[Builds](https://github.com/frederiksen/angular-electron-boilerplate/actions)

## Getting Started

Clone your forked repository and try out this template:

```bash
$ git clone <your-repository-url>
$ cd angular-electron-boilerplate
$ npm install
$ npm start
```

The `npm start` command now builds and runs the app locally with **Hot Module Reload (HMR)** enabled for rapid development.

### Prerequisites for Building Native Modules
This project integrates SQLite via better-sqlite3, a native module. If you encounter build errors after `npm install` or if `npm start` fails with issues related to better-sqlite3, ensure the following build tools are installed and then run `npm run rebuild-sqlite`.

**Windows:**
- Python (version 3.x)
- Visual Studio Build Tools (with the "Desktop development with C++" workload)

**macOS:**
- Python (version 3.x)
- Xcode Command Line Tools (install via `xcode-select --install`)

**Linux:**
- Python (version 3.x)
- Build essentials (e.g., `sudo apt install build-essential` on Ubuntu/Debian, which includes gcc, g++, make)

After installing these dependencies, run:
```bash
npm run rebuild-sqlite
```
Then try `npm start` again.

## NPM Scripts

### Builds

Builds output to the */dist* folder.

| Command | Description |
| --- | --- |
| `npm run build:dev:all` | Developer builds of all projects |
| `npm run build:prod:all` | Production builds of all projects |
| `npm run build:dev:main` | Developer build of the *Electron main* project |
| `npm run build:prod:main` | Production build of the *Electron main* project |
| `npm run build:dev:renderer` | Developer build of the *Electron renderer* project |
| `npm run build:prod:renderer` | Production build of the *Electron renderer* project |
| `npm run build:dev:preload` | Developer build of the *Electron preload* project |
| `npm run build:prod:preload` | Production build of the *Electron preload* project |

### Watch

Watch for source code changes and rebuild automatically.

| Command | Description |
| --- | --- |
| `npm run build:watch:all` | Watch all projects |
| `npm run build:watch:main` | Watch the *Electron main* project |
| `npm run build:watch:renderer` | Watch the *Electron renderer* project |
| `npm run build:watch:preload` | Watch the *Electron preload* project |

### Tests

Test and linting commands, updated to use ESLint and resolve prior issues.

| Command | Description |
| --- | --- |
| `npm run test:test` | Executes all Angular unit tests |
| `npm run test:e2e` | Executes Angular end-to-end tests |
| `npm run test:lint` | Runs ESLint for code linting |

### Updates

Commands for updating dependencies.

| Command | Description |
| --- | --- |
| `npm run update:angular` | Update to the latest stable Angular (currently v20.3) |
| `npm run update:electron` | Update to the latest stable Electron |
| `npm run update:webpack` | Update to the latest stable Webpack |

### Packaging

| Command | Description |
| --- | --- |
| `npm run package` | Package the */dist* folder into an app in the */release-builds* folder |
| `npm run release` | Build a production build and package it into an app in the */release-builds* folder |

## Debugging

![Screenshots](/images/debug-electron-main-renderer.PNG)

Use [Visual Studio Code](https://code.visualstudio.com/) for an enhanced debugging experience. Install the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension.

Build the project first:

```bash
$ npm run build:dev:all
```

Set breakpoints in the main and renderer source code. In VS Code, press **Ctrl+Shift+D**, select **Main + Renderer**, and press **F5** to start debugging.

## Packaging into an App

To create a packaged app for Windows, macOS, or Linux:

```bash
$ npm run release
```

The app will be output to the */release-builds* folder.
