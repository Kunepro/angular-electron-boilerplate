import * as path from 'path';

export default (env: string = 'development') => ({
  entry:     {
    main: './src/preload/preload.ts',
  },
  target:    'electron-preload',
  output:    {
    path:     path.resolve(
      process.cwd(), // or use a relative path
      '../../dist/preload',
    ),
    filename: 'preload.js',
  },
  externals: [],
  devtool:   'source-map',
  module:    {
    rules: [
      {
        test:    /\.ts?$/,
        loader:  'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve:   {
    extensions: [
      '.js',
      '.ts',
      '.tsx',
      '.jsx',
      '.json',
    ],
    alias:      {
      // TODO
    },
  },
  node:      {
    __dirname:  true,
    __filename: true,
  },
  plugins:   [],
});
