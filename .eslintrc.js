module.exports = {
    root: true,
    env: {
      node: true,
      es6: true,
      jest: true,
    },
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "prettier"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
    ],
    parserOptions: {
      ecmaVersion: 2019,
      sourceType: "module",
      project: "./tsconfig.json",
    },
    rules: {},
  };
  