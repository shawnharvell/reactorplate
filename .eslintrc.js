module.exports = {
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: [
    "@typescript-eslint",
    "eslint-comments",
    //"jest",
    "promise",
    "unicorn",
  ],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
    //"plugin:jest/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "prettier",
    //"prettier/react",
    //"prettier/@typescript-eslint",
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  rules: {
    // too restrictive for an edge case anyway https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "off",
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    // too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    "react/destructuring-assignment": "off",
    // no jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    "react/jsx-filename-extension": "off",
    // there is a bug in this when used with React/TS and the TS version covers it anyway
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error", { functions: false, classes: true, variables: true }],
    // makes no sense to allow type inferrence for expression parameters, but require typing the response
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    // abbreviations are known and readable
    "unicorn/prevent-abbreviations": "off",
    // TypeScript largely obviates prop-types for standard projects, the exception (reason to turn this
    // back on) would be if you're authoring a library that might be imported by a non-TypeScript project
    "react/prop-types": "off",
    // note you must disable the base rule as it can report incorrect errors
    quotes: "off",
    "@typescript-eslint/quotes": ["error", "double", { allowTemplateLiterals: true }],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.test.*", "**/*.spec.*", "**/*.stories.*"] },
    ],
  },
};
