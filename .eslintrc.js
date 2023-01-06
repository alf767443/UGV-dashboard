module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks"
    ],
    "rules": {
        "indent": "off",
		"linebreak-style": "off",
		"quotes": "off",
		"semi": "off",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "react/display-name": "off" 
    }
}
