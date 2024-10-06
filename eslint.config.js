const globals = require("globals");
const js = require("@eslint/js");

const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  {
    ignores: ["!**/eleventy.config.js", "**/dist", "**/node_modules"],
  },
  ...compat.extends("eslint:recommended"),
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 2022,
      sourceType: "commonjs",
    },

    rules: {
      indent: ["warn", 2],
      semi: ["warn", "always"],
      quotes: ["warn", "double"],
      "no-unused-vars": ["warn"],
    },
  },
  {
    files: ["src/assets/scripts/*.js"],

    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
];
