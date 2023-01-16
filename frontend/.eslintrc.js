module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "react-app",
    "airbnb",
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "jsx-a11y",
    "react-hooks",
    "prettier",
  ],
  rules: {
    "prettier/prettier": "error",
    "react/function-component-definition": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "react/jsx-no-useless-fragment": "warn",
    "react/require-default-props": "off",
  },
  globals: { process: true, __dirname: true },
};
