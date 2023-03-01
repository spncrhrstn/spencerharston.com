const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,njk}"],
  darkMode: "class",
  theme: {
    extend: {
      aria: {
        current: "current=page"
      },
      fontFamily: {
        "sans":["\"Public Sans\"", ...defaultTheme.fontFamily.sans],
        "mono":["\"JetBrains Mono\"", ...defaultTheme.fontFamily.mono]
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.zinc.800"),
            a: {
              color: theme("colors.sky.900"),
              textDecoration: "none",
              "&:hover" : {
                textDecoration: theme("underline")
              }
            },
            "ul ul, ul ol, ol ul, ol ol": {
              marginTop: "0",
              marginBottom: "0"
            }
          }
        },
        invert: {
          css: {
            color: theme("colors.zinc.200"),
            a: {
              color: theme("colors.blue.400"),
            }
          }
        }
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
};
