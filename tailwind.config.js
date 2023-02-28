const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,njk}"],
  theme: {
    extend: {
      aria: {
        current: 'current=page'
      },
      fontFamily: {
        'sans':['"Public Sans"', ...defaultTheme.fontFamily.sans],
        'mono':['"JetBrains Mono"', ...defaultTheme.fontFamily.mono]
      },
      typography: {
        DEFAULT: {
          css: {
            'ul ul, ul ol, ol ul, ol ol': {
              marginTop: '0',
              marginBottom: '0'
            }
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
