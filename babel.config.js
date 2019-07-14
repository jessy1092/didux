const babelPlugins = [
	[
		'@babel/transform-runtime',
		{
			corejs: 3,
		},
	],
	['@babel/plugin-proposal-decorators', { legacy: true }],
	['@babel/plugin-proposal-class-properties', { loose: true }],
	'@babel/plugin-proposal-json-strings',
];

const babelConfigForCommonJSBuild = {
	presets: [
		[
			'@babel/preset-env',
			{
				loose: true,
				useBuiltIns: 'usage',
				corejs: 3,
				modules: 'commonjs',
			},
		],
		'@babel/preset-typescript',
	],
	plugins: babelPlugins,
};

const babelConfigForESModuleBuild = {
	presets: [
		[
			'@babel/preset-env',
			{
				loose: true,
				useBuiltIns: 'usage',
				corejs: 3,
				modules: false,
			},
		],
		'@babel/preset-typescript',
	],
	plugins: babelPlugins,
};

const babelConfigForJest = {
	presets: [
		[
			'@babel/preset-env',
			{
				loose: true,
				useBuiltIns: 'usage',
				corejs: 3,
				targets: {
					node: 'current',
				},
			},
		],
		'@babel/preset-typescript',
	],
	plugins: babelPlugins,
};

module.exports = api => {
	const isTest = api.env('test');
	const isESModule = api.env('esmodule');

	if (isTest) {
		return babelConfigForJest;
	}

	if (isESModule) {
		return babelConfigForESModuleBuild;
	}

	return babelConfigForCommonJSBuild;
};
