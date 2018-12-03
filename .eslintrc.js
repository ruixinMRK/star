module.exports = {
    parser: "babel-eslint",
    extends: "airbnb",
	env: {
      "browser": true,
      "node": true,
      "mocha": true,
      "es6": true
    },
    plugins: [
      "redux-saga",
      "react",
      "jsx-a11y"
    ],
    parserOptions: {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
	globals: {
        "require": true,
		"module": true,
		"process": true,
		"httpDomain": true,
		"__webpack_public_path__":true
    },
    rules: {
        "indent": ["error", "tab",{"SwitchCase": 1}],
        "quotes": ["error", "single", { "allowTemplateLiterals": true }],
        "semi": ["error", "always",{ "omitLastInOneLineBlock": true }],
        "no-console": ["error",{allow:["log","warn"]}],
        "arrow-parens": 0,
        "no-news":0,
        "no-case-declarations":0,
        "no-var":2,
        "no-empty-function":2,
		"import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        // "max-depth": ["error", 4],
        "max-params": ["error", 3]

    }
        
}