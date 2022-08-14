module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:jest/all",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 12,
    requireConfigFile: false,
  },
  rules: {
    "array-callback-return": "warn",
    "block-scoped-var": "warn",
    complexity: ["warn", { max: 10 }],
    "consistent-return": "warn",
    curly: "error",
    "default-case": "warn",
    "default-param-last": "warn",
    "dot-location": ["warn", "property"],
    eqeqeq: ["warn", "always"],
    "no-eq-null": "error",
    "no-eval": ["error"],
    yoda: ["error", "never"],
    "jest/consistent-test-it": ["error", { fn: "it" }],
    "jest/no-hooks": [
      "error",
      {
        allow: ["afterEach", "afterAll", "beforeEach", "beforeAll"],
      },
    ],
  },
  overrides: [
    {
      files: "**/__tests__/*.(js|jsx|ts|tsx)",
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js"],
      },
    },
  },
};
