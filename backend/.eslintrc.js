module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: [
    "standard-with-typescript",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "tsconfig.eslint.json",
    tsconfigRootDir: __dirname
  },
  rules: {
    "prettier/prettier": "error"
  },
  globals: { process: true, __dirname: true }
};
