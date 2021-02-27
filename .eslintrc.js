module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    //"plugin:jsx-a11y/recommended",
  ],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "eslint-comments", "jest", "jsx-a11y"],
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  rules: {
    // there is a bug in this when used with React/TS and the TS version covers it anyway
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error", { functions: false, classes: true, variables: true }],
    // TypeScript largely obviates prop-types for standard projects, the exception (reason to turn this
    // back on) would be if you're authoring a library that might be imported by a non-TypeScript project
    "react/prop-types": "off",
  },
};
