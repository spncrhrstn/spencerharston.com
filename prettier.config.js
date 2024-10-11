/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ["prettier-plugin-jinja-template", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.njk",
      options: {
        parser: "jinja-template"
      }
    }
  ],
  semi: true,
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  printWidth: 120,
  trailingComma: "none",
  bracketSpacing: true
};

export default config;
