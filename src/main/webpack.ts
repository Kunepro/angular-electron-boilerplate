import * as path from "path";
import nodeExternals from "webpack-node-externals";

export default async function getConfig(env: string = "development") {
	const plugins: any[] = [];
	
	if (process.env.WEBPACK_DEV_SERVER_URL) {
		const mod: unknown = await import("webpack-electron-reload");
		const factory      = ((mod as any).default ?? mod) as any;
		
		try {
			if (typeof factory === "function") {
				const maybePluginOrFactory = factory({ path: "." });
				const plugin               =
								typeof maybePluginOrFactory === "function"
									? maybePluginOrFactory()
									: maybePluginOrFactory;
				if (plugin) plugins.push(plugin);
			}
		} catch {
			/* ignore dev-only failures */
		}
	}
	
	return {
		entry:  {
			main: "./src/main/main.ts",
		},
		target: "electron-main",
		output: {
			// use process.cwd() instead of __dirname
			path:     path.resolve(
				process.cwd(),
				"dist/main",
			),
			filename: "electron-main.js",
		},
		// @ts-ignore
		externals: [ nodeExternals() ],
		devtool:   "source-map",
		module:    {
			rules: [
				{
					test:    /\.ts$/,
					loader:  "ts-loader",
					exclude: /node_modules/,
				},
			],
		},
		resolve:   {
			extensions: [
				".js",
				".ts",
				".tsx",
				".jsx",
				".json",
			],
		},
		node:      {
			__dirname:  true,
			__filename: true,
		},
		plugins,
	};
}
