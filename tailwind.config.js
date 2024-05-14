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
        "sans":["'Atkinson Hyperlegible'", ...defaultTheme.fontFamily.sans],
        "mono":["'Cousine'", ...defaultTheme.fontFamily.mono]
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.zinc.800"),
            a: {
              color: theme("colors.blue.600"),
              textDecoration: "none",
              "&:hover" : {
                textDecoration: theme("underline")
              }
            },
            "ul ul, ul ol, ol ul, ol ol": {
              marginTop: "0",
              marginBottom: "0"
            },
            "section.footnotes": {
              fontSize: theme("fontSize.sm")
            }
          }
        },
        invert: {
          css: {
            color: theme("colors.zinc.200"),
            a: {
              color: theme("colors.sky.500"),
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
