module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:jsdoc/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript'
	],
	plugins: ['@typescript-eslint', 'import', 'jsdoc'],
	env: {
		node: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.eslint.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	}
};
