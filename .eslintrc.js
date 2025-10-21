const path = require('path');

module.exports = {
	root: true,
	ignorePatterns: ['dist/**', 'node_modules/**'],
	overrides: [
		{
			files: ['*.ts'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: [
					'src/renderer/tsconfig.app.json',
					'src/renderer/tsconfig.spec.json'
				],
				sourceType: 'module',
				tsconfigRootDir: path.resolve(__dirname)
			},
			extends: [
				'plugin:@angular-eslint/recommended',
				'plugin:@typescript-eslint/recommended'
			],
			rules: {
				'@angular-eslint/no-empty-lifecycle-method': 'off',
				'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
				'format-message/no-invalid-icu': 'off',
				'@angular-eslint/prefer-standalone': 'off',
				'@angular-eslint/prefer-inject': 'off'
			}
		},
		{
			files: ['*.html'],
			extends: ['plugin:@angular-eslint/template/recommended'],
			rules: {
				'@angular-eslint/template/no-closing-tag': 'off',
				'html/void-elements': 'off'
			}
    },
    {
      files: ['*.js'], // Add JS file parsing
      parserOptions: {
        sourceType: 'module' // Treat JS files as ES modules
      },
      env: {
        node: true,
        es2020: true
      }
		}
	]
};
